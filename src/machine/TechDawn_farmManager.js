//pragma js
//pragma module TechDawnMachineFarmManager

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件挖掘机模块
 */

/**
 * @description 耗电扩倍
 */
const RFPerRange = 2;

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
 * @description 放置农场管理机
 * @param {cn.nukkit.level.Position} pos
 * @param {cn.nukkit.Player} player 放置的玩家，如果非玩家放置传入null
 * @param {{x: number,y: number,z: number,level: string,yaw: number,pitch: number, dataStroage: Object}} data 非玩家放置时传入的还原信息
 */
export function place(pos, player, data) {
    pos.getLevel().loadChunk(pos.getChunkX(), pos.getChunkZ());
    let model = entity.buildModel(pos, "farmManager", 1, 1, 1, 1, F((self, tick) => {
        //每32刻检测一次作物生长情况
        if (!(tick & 31) && self.dataStorage.getItem("storage") >= 20) {
            //该世界没有开启科技黎明直接忽略
            if (!TechDawnConfig.isLevelEnabled(self.getLevel().getName())) return;
            //检测是否有足够的电
            let storage = self.dataStorage.getItem("storage");
            if (storage < getRFCost(self)) {
                return;
            }
            //减去本次工作耗电
            self.dataStorage.setItem("storage", storage - getRFCost(self));
            //检测作物生长情况
            const range = self.dataStorage.getItem("range");
            const start = self.getPosition().clone().floor();
            let tmpBlock;
            for(let i=-range; i<range+1; i++){
                for(let j=-range; j<range+1; j++){
                    tmpBlock = blockitem.getBlock(start.add(i, 0, j));
                    if(tmpBlock.getId() == 59 && tmpBlock.getDamage() == 7){ //小麦
                        tmpBlock.setDamage(2);
                        blockitem.makeDropItem(tmpBlock.add(0.5, 0.5, 0.5), blockitem.buildItem(296, 0, 1));
                        blockitem.setBlock(tmpBlock, tmpBlock, false);
                    }else if(tmpBlock.getId() == 141 && tmpBlock.getDamage() == 7){ //胡萝卜
                        tmpBlock.setDamage(2);
                        blockitem.makeDropItem(tmpBlock.add(0.5, 0.5, 0.5), blockitem.buildItem(391, 0, Math.round(Math.random() * 3) + 1));
                        blockitem.setBlock(tmpBlock, tmpBlock, false);
                    }else if(tmpBlock.getId() == 142 && tmpBlock.getDamage() == 7){ //马铃薯
                        tmpBlock.setDamage(2);
                        blockitem.makeDropItem(tmpBlock.add(0.5, 0.5, 0.5), blockitem.buildItem(392, 0, Math.round(Math.random() * 2) + 1));
                        if(Math.random() < 0.0201){
                            blockitem.makeDropItem(tmpBlock.add(0.5, 0.5, 0.5), blockitem.buildItem(394, 0, 1));
                        }
                        blockitem.setBlock(tmpBlock, tmpBlock, false);
                    }else if(tmpBlock.getId() ==244 && tmpBlock.getDamage() == 7){ //甜菜根
                        tmpBlock.setDamage(2);
                        blockitem.makeDropItem(tmpBlock.add(0.5, 0.5, 0.5), blockitem.buildItem(457, 0, 1));
                        blockitem.setBlock(tmpBlock, tmpBlock, false);
                    }else if(tmpBlock.getId() == 115 && tmpBlock.getDamage() == 3){ //下界疣
                        tmpBlock.setDamage(1);
                        blockitem.makeDropItem(tmpBlock.add(0.5, 0.5, 0.5), blockitem.buildItem(391, 0, Math.round(Math.random() * 2) + 1));
                        blockitem.setBlock(tmpBlock, tmpBlock, false);
                    }
                }
            }
        }
    }), 1, F((self, damageEvent) => {
        //如果被奇奇怪怪的东西伤害就爆炸
        if (!(damageEvent instanceof cn.nukkit.event.entity.EntityDamageByEntityEvent) || !entity.isPlayer(damageEvent.getDamager())) {
            particle.drawEmitter(self, "minecraft:huge_explosion_emitter");
            blockitem.makeSound(self, "RANDOM_EXPLODE");
            destroy(self);
            return;
        }
        let tmpItem = inventory.getEntityItemInHand(damageEvent.getDamager());
        //检测手里是不是锤子
        if (tmpItem.getId() >= 3404 && tmpItem.getId() <= 3408) {
            blockitem.makeDropItem(self, blockitem.buildItem(3355, 0, 1));
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
        window.getCustomWindowBuilder(TechDawnTranslate.translate("farm_manager_title"))
            .buildStepSlider(TechDawnTranslate.translate("farm_manager_slider_title"), "3x3;5x5;7x7;9x9", self.dataStorage.getItem("range") - 1)
            .action(F(event => {
                switch (event.getResult()) {
                    case "3x3":
                        self.dataStorage.setItem("range", 1); break;
                    case "5x5":
                        self.dataStorage.setItem("range", 2); break;
                    case "7x7":
                        self.dataStorage.setItem("range", 3); break;
                    case "9x9":
                        self.dataStorage.setItem("range", 4); break;
                }
                const range = self.dataStorage.getItem("range");
                particle.drawLine(self.add(-range, 0.5, range), self.add(range, 0.5, range), 1, 40);
                particle.drawLine(self.add(range, 0.5, range), self.add(range, 0.5, -range), 1, 40);
                particle.drawLine(self.add(range, 0.5, -range), self.add(-range, 0.5, -range), 1, 40);
                particle.drawLine(self.add(-range, 0.5, -range), self.add(-range, 0.5, range), 1, 40);
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
        model.dataStorage.setItem("name", "farmManager");
        model.dataStorage.setItem("storage", 0);
        model.dataStorage.setItem("maxStorage", 120);
        model.dataStorage.setItem("mode", "I");
        model.dataStorage.setItem("maxAccept", 20);
        model.dataStorage.setItem("range", 4);
    }
}

/**
 * @description 获取农场管理机单次消耗电量
 * @param {com.blocklynukkit.loader.other.Entities.BNModel} model
 */
function getRFCost(model) {
    return model.dataStorage.getItem("range") * RFPerRange;
}

/**
 * @description 销毁农场管理机
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
    //放置挖掘机
    let player = event.getPlayer();
    if (event.getItem().getId() != 3355) {
        return;
    }
    //放置挖掘机
    place((event.getBlock().getId() == 55 ? event.getBlock() : event.getBlock().add(event.getFace().getUnitVector()).getLevelBlock()).add(0.5, 0, 0.5), player);
    //去掉玩家的一个农场管理机物品
    let tmpitem = event.getItem().clone();
    tmpitem.setCount(1);
    blockitem.removeItemToPlayer(player, tmpitem);
    //记录玩家上次操作时间
    playerTouchedTime[event.getPlayer().getName()] = mills();
}