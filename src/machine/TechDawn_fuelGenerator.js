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
 * @description 能源模块
 */
const TechDawnMachinePower = require("TechDawnMachinePower");

/**
 * @description 配置文件模块
 */
const TechDawnConfig = require("TechDawnConfig");

/**
 * @description 记录玩家触摸时间，防止刷物品
 * @type {{[key: string]: long}}
 */
const playerTouchedTime = {};

/**
 * @description 添加火力发电机工作时间
 * @param {com.blocklynukkit.loader.other.Entities.BNModel} self
 * @param {int} time 时间(刻)
 */
function addWorkingTime(self, time){
    //添加燃烧时间
    self.dataStorage.setItem("workingTime", self.dataStorage.getItem("workingTime") + time);
    //如果之前没有工作就换成工作皮肤
    if(!self.dataStorage.getItem("working")){
        self.dataStorage.setItem("working", true);
        self.resetModelSkin("fuelgenerator_working");
    }
}

/**
 * @description 放置火力发电机
 * @param {cn.nukkit.level.Position} pos
 * @param {cn.nukkit.Player} player 放置的玩家，如果非玩家放置传入null
 * @param {{x: number,y: number,z: number,level: string,yaw: number,pitch: number, dataStroage: Object}} data 非玩家放置时传入的还原信息
 */
export function placeFuelGenerator(pos, player, data){
    let model = entity.buildModel(pos, "fuelgenerator", 1, 1, 1, 1, F(self => {
        let workingTime = self.dataStorage.getItem("workingTime")
        if(workingTime > 0){
            self.dataStorage.setItem("workingTime", workingTime - 1);
            //播放工作声音，每64刻播放一次
            if(!(workingTime & 63)){
                blockitem.makeSound(self, "FIRE_FIRE");
            }
            //计算能源输出，每16刻输出一次能源，输出20RF
            if(!(workingTime & 15)){
                TechDawnMachinePower.newPowerOutputProcess(self.getPosition().floor(), 20).startTransfer(false);
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
        let tmpItem = inventory.getEntityItemInHand(damageEvent.getDamager());
        //检测手里是不是锤子
        if(tmpItem.getId() >= 3404 && tmpItem.getId() <= 3408){
            blockitem.makeDropItem(self, blockitem.buildItem(3351, 0, 1));
            self.close();
            //锤子掉耐久
            let hammer = tmpItem;
            hammer.setDamage(hammer.getDamage() + 2);
            if(hammer.getDamage() > hammer.getMaxDurability()){
                inventory.setEntityItemInHand(damageEvent.getDamager(), blockitem.buildItem(0,0,1));
                blockitem.makeSound(self, "USE_STONE");
            }else{
                inventory.setEntityItemInHand(damageEvent.getDamager(), hammer);
            }
        }
    }), F((self, player, item, pos) => {
        if(item.getId() == 3729){
            addWorkingTime(self, 200);
            let tmpitem = item.clone();
            tmpitem.setCount(1);
            blockitem.removeItemToPlayer(player, tmpitem);
        }else if(item.getId() == 263 && item.getDamage() == 1){
            addWorkingTime(self, 120);
            let tmpitem = item.clone();
            tmpitem.setCount(1);
            blockitem.removeItemToPlayer(player, tmpitem);
        }
    }));
    if(data){
        model.setYaw(data.yaw);
        model.setPitch(data.pitch);
        for(let key in data.dataStorage){
            model.dataStorage.setItem(key, data.dataStorage[key]);
        }
        if(model.dataStorage.getItem("working")){
            model.resetModelSkin("fuelgenerator_working");
        }
    }else{
        let yaw = player.getYaw() + 180;
        model.setYaw(yaw > 360 ? yaw - 360 : yaw);
        model.setPitch(0);
        model.dataStorage.setItem("techDawn", true);
        model.dataStorage.setItem("name", "fuelGenerator");
        model.dataStorage.setItem("workingTime", 0);
        model.dataStorage.setItem("working", false);
        model.dataStorage.setItem("mode", "O");
    }
}

function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/event){
    //玩家操作间隔太小直接忽略
    if(playerTouchedTime[event.getPlayer().getName()] != null &&  mills() - playerTouchedTime[event.getPlayer().getName()] < 200) return;
    //该世界没有开启科技黎明直接忽略
    if(!TechDawnConfig.isLevelEnabled(event.getPlayer().getLevel().getName())) return;
    //放置火力发电机
    let player = event.getPlayer();
    if(event.getItem().getId() != 3351){
        return;
    }
    //如果点击红石线放置就不要抬高一格
    placeFuelGenerator((event.getBlock().getId() == 55 ? event.getBlock() : event.getBlock().add(event.getFace().getUnitVector()).getLevelBlock()).add(0.5, 0, 0.5), player);
    //去掉玩家的一个火力发电机物品
    let tmpitem = event.getItem().clone();
    tmpitem.setCount(1);
    blockitem.removeItemToPlayer(player, tmpitem);
    //记录玩家上次操作时间
    playerTouchedTime[event.getPlayer().getName()] = mills();
}

/**
 * @description 处理投掷器/发射器发出燃料自动加注
 */
function ItemSpawnEvent(/**@type {cn.nukkit.event.entity.ItemSpawnEvent}*/event){
    //该世界没有开启科技黎明直接忽略
    if(!TechDawnConfig.isLevelEnabled(event.getEntity().getLevel().getName())) return;
    let itemEntity = event.getEntity();
    let item = itemEntity.getItem();
    if(!(item.getId() == 3729 || item.getId() == 263)){
        return;
    }
    for(let each of itemEntity.getChunk().getEntities()){
        if(each.getName() == "BNModel" && each.dataStorage.getItem("techDawn") && each.dataStorage.getItem("name") == "fuelGenerator" && each.getPosition().floor().equals(itemEntity.getPosition().floor())){
            if(item.getId() == 3729){
                addWorkingTime(each, 200);
                itemEntity.close();
                break;
            }else if(item.getId() == 263 && item.getDamage() == 1){
                addWorkingTime(each, 120);
                itemEntity.close();
                break;
            }
        }
    }
}