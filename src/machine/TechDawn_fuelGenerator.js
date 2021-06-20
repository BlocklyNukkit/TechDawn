//pragma js
//pragma module TechDawnMachineFuelGenerator

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
 * @description 记录玩家触摸时间，防止刷物品
 * @type {{[key: string]: long}}
 */
const playerTouchedTime = {};

function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/event){
    //玩家操作间隔太小直接忽略
    if(playerTouchedTime[event.getPlayer().getName()] != null &&  mills() - playerTouchedTime[event.getPlayer().getName()] < 200) return;
    //放置火力发电机
    let player = event.getPlayer();
    if(event.getItem().getId() != 3351){
        return;
    }
    let model = entity.buildModel((cn.nukkit.level.Position).fromObject(event.getTouchVector(), event.getPlayer().getLevel()), "fuelgenerator", 1, 1, 1, 1, F(self => {
        let workingTime = self.dataStorage.getItem("workingTime")
        if(workingTime > 0){
            self.dataStorage.setItem("workingTime", workingTime - 1);
            //播放工作声音，每16刻播放一次
            if(!(workingTime & 15)){
                blockitem.makeSound(self, "FIRE_FIRE");
            }
            //显示工作粒子，每32刻显示一次
            if(!(workingTime & 31)){
                particle.drawDot(self.add(0, 1, 0), 66);
            }
        }else if(workingTime == 0 && self.dataStorage.getItem("working") == true){
            self.dataStorage.setItem("working", false);
            self.resetModelSkin("fuelgenerator");
        }
    }), 1, F((self, damageEvent) => {

    }), F((self, player, item, pos) => {
        if(item.getId() == 3729){
            //是精煤，燃烧10s
            self.dataStorage.setItem("workingTime", self.dataStorage.getItem("workingTime") + 200);
            //如果之前没有工作就换成工作皮肤
            if(!self.dataStorage.getItem("working")){
                self.dataStorage.setItem("working", true);
                self.resetModelSkin("fuelgenerator_working");
            }
            let tmpitem = item.clone();
            tmpitem.setCount(1);
            blockitem.removeItemToPlayer(player, tmpitem);
        }else if(item.getId() == 263 && item.getDamage() == 1){
            //是木炭，燃烧6s
            self.dataStorage.setItem("workingTime", self.dataStorage.getItem("workingTime") + 120);
            //如果之前没有工作就换成工作皮肤
            if(!self.dataStorage.getItem("working")){
                self.dataStorage.setItem("working", true);
                self.resetModelSkin("fuelgenerator_working");
            }
            let tmpitem = item.clone();
            tmpitem.setCount(1);
            blockitem.removeItemToPlayer(player, tmpitem);
        }
    }));
    model.setYaw(player.getYaw());
    model.setPitch(0);
    model.dataStorage.setItem("name", "fuelGenerator");
    model.dataStorage.setItem("workingTime", 0);
    model.dataStorage.setItem("working", false);
    let tmpitem = event.getItem().clone();
    tmpitem.setCount(1);
    blockitem.removeItemToPlayer(player, tmpitem);
    //记录玩家上次操作时间
    playerTouchedTime[event.getPlayer().getName()] = mills();
}