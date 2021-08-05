//pragma js
//pragma module TechDawnElectromagnet

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件电磁铁模块
 */

/**
 * @description 耗电扩倍
 */
const RFPerRange = 0.5;

/**
 * @description 获取时间函数
 */
const mills = java.lang.System.currentTimeMillis;

/**
 * @description 能源模块
 */
const TechDawnMachinePower = require("TechDawnMachinePower");

/**
 * @description 配置文件模块
 */
const TechDawnConfig = require("TechDawnConfig");

/**
 * @description 翻译模块
 */
const TechDawnTranslate = require("TechDawnTranslate");

/**
 * @description 记录玩家触摸时间，防止刷物品
 * @type {{[key: string]: long}}
 */
const playerTouchedTime = {};

/**
 * @description 放置电磁铁
 * @param {cn.nukkit.level.Position} pos
 * @param {cn.nukkit.Player} player 放置的玩家，如果非玩家放置传入null
 * @param {{x: number,y: number,z: number,level: string,yaw: number,pitch: number, dataStroage: Object}} data 非玩家放置时传入的还原信息
 */
export function place(pos, player, data) {
    pos.getLevel().loadChunk(pos.getChunkX(), pos.getChunkZ());
    let model = entity.buildModel(pos, "electromagnet", 1, 1, 1, 1, F((self, tick) => {
        //每刻吸引一次附近物品
        //该世界没有开启科技黎明直接忽略
        if (!TechDawnConfig.isLevelEnabled(self.getLevel().getName())) return;
        //检测是否有足够的电
        let storage = self.dataStorage.getItem("storage");
        if (storage < getRFCost(self)) {
            return;
        }
        //减去本次工作耗电，4次工作扣一次电
        if (!(tick & 7)) {
            self.dataStorage.setItem("storage", storage - getRFCost(self));
        }
        manager.concurrentRun(F((self) => {
            //吸引周围物品
            const range = self.dataStorage.getItem("range");
            /** @type {cn.nukkit.entity.item.EntityItem[]} */
            const itemEntites = [];
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    for (let each of self.getPosition().add(i * 16, 0, j * 16).getChunk().getEntities().values()) {
                        if (each instanceof cn.nukkit.entity.item.EntityItem && each.distance(self) < range) {
                            itemEntites.push(each);
                        }
                    }
                }
            }
            let dtmp;
            let dlen;
            for (let ccc of itemEntites) {
                /** @type {cn.nukkit.entity.item.EntityItem} */
                let each = ccc;
                dtmp = each.getPosition().add(self.getPosition().multiply(-1));
                dlen = 1 / dtmp.length();
                if(dlen > 2.5){
                    continue;
                }
                dtmp = dtmp.multiply(dlen).multiply(dlen + 0.08).multiply(-0.2);
                each.move(dtmp.x, dtmp.y, dtmp.z);
            }
        }), self);
    }), 1, F((self, damageEvent) => {
        //如果被奇奇怪怪的东西伤害就爆炸
        if (!(damageEvent instanceof cn.nukkit.event.entity.EntityDamageByEntityEvent)) {
            particle.drawEmitter(self, "minecraft:huge_explosion_emitter");
            blockitem.makeSound(self, "RANDOM_EXPLODE");
            destroy(self);
            return;
        }
        let tmpItem = inventory.getEntityItemInHand(damageEvent.getDamager());
        //检测手里是不是锤子
        if (tmpItem.getId() >= 3404 && tmpItem.getId() <= 3408) {
            blockitem.makeDropItem(self, blockitem.buildItem(3356, 0, 1));
            destroy(self);
            //锤子掉耐久
            let hammer = tmpItem;
            hammer.setDamage(hammer.getDamage() + 2);
            if (hammer.getDamage() > hammer.getMaxDurability()) {
                inventory.setEntityItemInHand(damageEvent.getDamager(), blockitem.buildItem(0, 0, 1));
                blockitem.makeSound(self, "USE_STONE");
            } else {
                inventory.setEntityItemInHand(damageEvent.getDamager(), hammer);
            }
        }
    }), F((self, player, item, pos) => {
        window.getCustomWindowBuilder(TechDawnTranslate.translate("electromagnet_title"))
            .buildStepSlider(TechDawnTranslate.translate("electromagnet_slider_title"), "3r;5r;7r;9r;11r;13r", (self.dataStorage.getItem("range") - 1) / 2 - 1)
            .action(F(event => {
                switch (event.getResult()) {
                    case "3r":
                        self.dataStorage.setItem("range", 3); break;
                    case "5r":
                        self.dataStorage.setItem("range", 5); break;
                    case "7r":
                        self.dataStorage.setItem("range", 7); break;
                    case "9r":
                        self.dataStorage.setItem("range", 9); break;
                    case "11r":
                        self.dataStorage.setItem("range", 11); break;
                    case "13r":
                        self.dataStorage.setItem("range", 13); break;
                }
                const range = self.dataStorage.getItem("range");
                particle.drawCircle(self.add(0, 0.5, 0), range, 40, 2);
            }))
            .show(player);
    }));
    require("TechDawnSaver").addMachine(model);
    if (data) {
        model.setYaw(data.yaw);
        model.setPitch(data.pitch);
        for (let key in data.dataStorage) {
            model.dataStorage.setItem(key, data.dataStorage[key]);
        }
    } else {
        let yaw = player.getYaw() + 180;
        model.setYaw(yaw > 360 ? yaw - 360 : yaw);
        model.setPitch(0);
        model.dataStorage.setItem("techDawn", true);
        model.dataStorage.setItem("name", "electromagnet");
        model.dataStorage.setItem("storage", 0);
        model.dataStorage.setItem("maxStorage", 240);
        model.dataStorage.setItem("mode", "I");
        model.dataStorage.setItem("maxAccept", 20);
        model.dataStorage.setItem("range", 7);
    }
}

/**
 * @description 获取电磁铁单次消耗电量
 * @param {com.blocklynukkit.loader.other.Entities.BNModel} model
 */
function getRFCost(model) {
    return (model.dataStorage.getItem("range") - 1) * RFPerRange;
}

/**
 * @description 销毁电磁铁
 * @param {com.blocklynukkit.loader.other.Entities.BNModel} model
 */
export function destroy(model) {
    require("TechDawnSaver").removeMachine(model);
    model.close();
}

function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/event) {
    //玩家操作间隔太小直接忽略
    if (playerTouchedTime[event.getPlayer().getName()] != null && mills() - playerTouchedTime[event.getPlayer().getName()] < 200) return;
    //该世界没有开启科技黎明直接忽略
    if (!TechDawnConfig.isLevelEnabled(event.getPlayer().getLevel().getName())) return;
    //放置电磁铁
    let player = event.getPlayer();
    if (event.getItem().getId() != 3356) {
        return;
    }
    //放置电磁铁
    place((event.getBlock().getId() == 55 ? event.getBlock() : event.getBlock().add(event.getFace().getUnitVector()).getLevelBlock()).add(0.5, 0, 0.5), player);
    //去掉玩家的一个农场管理机物品
    let tmpitem = event.getItem().clone();
    tmpitem.setCount(1);
    blockitem.removeItemToPlayer(player, tmpitem);
    //记录玩家上次操作时间
    playerTouchedTime[event.getPlayer().getName()] = mills();
}