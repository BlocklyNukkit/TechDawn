//pragma js
//pragma module TechDawnMachineSolarGenerator

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件火力发电机模块
 */

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
 * @description 放置太阳能发电机
 * @param {cn.nukkit.level.Position} pos
 * @param {cn.nukkit.Player} player 放置的玩家，如果非玩家放置传入null
 * @param {{x: number,y: number,z: number,level: string,yaw: number,pitch: number, dataStroage: Object}} data 非玩家放置时传入的还原信息
 */
export function place(pos, player, data) {
    pos.getLevel().loadChunk(pos.getChunkX(), pos.getChunkZ());
    let model = entity.buildModel(pos, "solarGenerator", 1, 1, 1, 1, F((self, tick) => {
        if (self.dataStorage.getItem("working")) {
            //计算能源输出，每16刻输出一次能源，输出2RF
            if (!(tick & 15)) {
                manager.concurrentRun(F(() => {
                    TechDawnMachinePower.newPowerOutputProcess(self.getPosition().floor(), 2).startTransfer(false);
                }));
            }
            //显示工作粒子，每32刻显示一次
            if (!(tick & 31)) {
                particle.drawDot(self.add(-0.5+Math.random(), 1.05, -0.5+Math.random), 36);
            }
        }
        //每64tick计算一次是否能够工作
        if(!(tick & 63)){
            self.dataStorage.setItem("working", blockitem.isDay(self) && (getHeighestBlockAt(self.level, self.x, self.z) <= self.y));
        }
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
            blockitem.makeDropItem(self, blockitem.buildItem(3357, 0, 1));
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
        if(self.dataStorage.getItem("working")){
            player.sendMessage(TechDawnTranslate.translate("solar_generator_working"));
        }else{
            player.sendMessage(TechDawnTranslate.translate("solar_generator_not_working"));
        }
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
        model.dataStorage.setItem("name", "solarGenerator");
        model.dataStorage.setItem("working", false);
        model.dataStorage.setItem("mode", "O");
    }
}

/**
 * @description 检测指定位置最高方块
 * @param {cn.nukkit.level.Level} level
 * @param {int} x
 * @param {int} z
 */
function getHeighestBlockAt(level, x, z){
    for(let i=255; i>=0; i--){
        if(level.getBlockIdAt(x, i, z) != 0){
            return i;
        }
    }
    return 0;
}

/**
 * @description 销毁太阳能发电机
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
    //放置太阳能发电机
    let player = event.getPlayer();
    if (event.getItem().getId() != 3357) {
        return;
    }
    //如果点击红石线放置就不要抬高一格
    place((event.getBlock().getId() == 55 ? event.getBlock() : event.getBlock().add(event.getFace().getUnitVector()).getLevelBlock()).add(0.5, 0, 0.5), player);
    //去掉玩家的一个太阳能发电机物品
    let tmpitem = event.getItem().clone();
    tmpitem.setCount(1);
    blockitem.removeItemToPlayer(player, tmpitem);
    //记录玩家上次操作时间
    playerTouchedTime[event.getPlayer().getName()] = mills();
}
