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
     let model = entity.buildModel(event.getBlock().getId() == 55 ? event.getBlock() : event.getBlock().add(event.getFace().getUnitVector()).getLevelBlock(), "redStoneBatteryBox", 1, 1, 1, 1, F(self => {
         
     }), 1, F((self, damageEvent) => {
 
     }), F((self, player, item, pos) => {

     }));
     model.setYaw(player.getYaw());
     model.setPitch(0);
     model.dataStorage.setItem("name", "redStoneBatteryBox");
     let tmpitem = event.getItem().clone();
     tmpitem.setCount(1);
     blockitem.removeItemToPlayer(player, tmpitem);
     //记录玩家上次操作时间
     playerTouchedTime[event.getPlayer().getName()] = mills();
 }