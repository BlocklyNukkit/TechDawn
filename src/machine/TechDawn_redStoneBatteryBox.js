//pragma js
//pragma module TechDawnMachineRedStoneBatteryBox

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件红石电池箱模块
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
 * @description 翻译模块
 */
const TechDawnTranslate = require("TechDawnTranslate");

/**
 * @description 记录玩家触摸时间，防止刷物品
 * @type {{[key: string]: long}}
 */
const playerTouchedTime = {};

function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/event){
    //玩家操作间隔太小直接忽略
    if(playerTouchedTime[event.getPlayer().getName()] != null &&  mills() - playerTouchedTime[event.getPlayer().getName()] < 200) return;
    //放置红石电池箱
    let player = event.getPlayer();
    if(event.getItem().getId() != 3352){
        return;
    }
    //如果点击红石线放置就不要抬高一格
    let model = entity.buildModel((event.getBlock().getId() == 55 ? event.getBlock() : event.getBlock().add(event.getFace().getUnitVector()).getLevelBlock()).add(0.5, 0, 0.5), "redStoneBatteryBox", 1, 1, 0.1, 1, F((self, tick) => {
        //每15刻输出电力
        if(!(tick & 15) && self.dataStorage.getItem("storage") >= 60){
            self.dataStorage.setItem("storage", self.dataStorage.getItem("storage") - 60);
            TechDawnMachinePower.newPowerOutputProcess(self.getPosition().floor(), 60).startTransfer(false);
            cn.nukkit.level.Position
        }
    }), 1, F((self, damageEvent) => {
        let tmpItem = inventory.getEntityItemInHand(damageEvent.getEntity());
        //检测手里是不是锤子
        if(tmpItem.getId() >= 3404 && tmpItem.getId() <= 3408){
            blockitem.makeDropItem(self, blockitem.buildItem(3552, 0, 1));
            self.close();
            //锤子掉耐久
            let hammer = tmpItem;
            hammer.setDamage(hammer.getDamage() + 2);
            if(hammer.getDamage() > hammer.getMaxDurability()){
                inventory.setEntityItemInHand(damageEvent.getEntity(), blockitem.buildItem(0,0,1));
                blockitem.makeSound(self, "USE_STONE");
            }else{
                inventory.setEntityItemInHand(damageEvent.getEntity(), hammer);
            }
        }
    }), F((self, player, item, pos) => {
        window.getSimpleWindowBuilder("","")
            .setTitle(TechDawnTranslate.translate("redstone_battery_box_title"))
            .setContext(TechDawnTranslate.translateFormat("battery_box_content",[self.dataStorage.getItem("storage"), self.dataStorage.getItem("maxStorage")]))
            .show(player);
    }));
    let yaw = player.getYaw() + 180;
    model.setYaw(yaw > 360 ? yaw - 360 : yaw);
    model.setPitch(0);
    model.dataStorage.setItem("techDawn", true);
    model.dataStorage.setItem("name", "redStoneBatteryBox");
    model.dataStorage.setItem("storage", 0);
    model.dataStorage.setItem("maxStorage", 8000);
    model.dataStorage.setItem("mode", "IO");
    model.dataStorage.setItem("maxAccept", 60);
    let tmpitem = event.getItem().clone();
    tmpitem.setCount(1);
    blockitem.removeItemToPlayer(player, tmpitem);
    //记录玩家上次操作时间
    playerTouchedTime[event.getPlayer().getName()] = mills();
}