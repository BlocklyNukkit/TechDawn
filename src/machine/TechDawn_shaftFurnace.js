//pragma js
//pragma module TechDawnMachineShaftFurnace

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件高炉模块
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
 * @description 放置高炉
 * @param {cn.nukkit.level.Position} pos
 * @param {cn.nukkit.Player} player 放置的玩家，如果非玩家放置传入null
 * @param {{x: number,y: number,z: number,level: string,yaw: number,pitch: number, dataStroage: Object}} data 非玩家放置时传入的还原信息
 */
export function placeShaftFurnace(pos, player, data){
    let model = entity.buildModel(pos, "shaftFurnace", 1, 1, 1, 1, F(self => {

    }), 1, F((self, damageEvent) => {
        let tmpItem = inventory.getEntityItemInHand(damageEvent.getDamager());
        //检测手里是不是锤子
        if(tmpItem.getId() >= 3404 && tmpItem.getId() <= 3408){
            blockitem.makeDropItem(self, blockitem.buildItem(3353, 0, 1));
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
        let storage = self.dataStorage.getItem("storage");
        if(storage < 160){
            return;
        }
        let recipe = server.getCraftingManager().matchFurnaceRecipe(item);
        if(recipe != null){
            let tmpitem = item.clone();
            tmpitem.setCount(1);
            blockitem.removeItemToPlayer(player, tmpitem);
            blockitem.makeDropItem(self.add(0, 1, 0), recipe.getResult());
            particle.drawDot(self.add(0,1,0), 6);
            blockitem.makeSound(self, "MOB_ENDERDRAGON_FLAP");
            self.dataStorage.setItem("storage", storage - 160);
        }
    }));
    if(data){
        model.setYaw(data.yaw);
        model.setPitch(data.pitch);
        for(let key in data.dataStorage){
            model.dataStorage.setItem(key, data.dataStorage[key]);
        }
    }else{
        let yaw = player.getYaw() + 180;
        model.setYaw(yaw > 360 ? yaw - 360 : yaw);
        model.setPitch(0);
        model.dataStorage.setItem("techDawn", true);
        model.dataStorage.setItem("name", "shaftFurnace");
        model.dataStorage.setItem("storage", 0);
        model.dataStorage.setItem("maxStorage", 480);
        model.dataStorage.setItem("mode", "I");
        model.dataStorage.setItem("maxAccept", 480);
    }
}

/**
 * @description 处理投掷器/发射器自动冶炼
 */
function ItemSpawnEvent(/**@type {cn.nukkit.event.entity.ItemSpawnEvent}*/event){
    //该世界没有开启科技黎明直接忽略
    if(!TechDawnConfig.isLevelEnabled(event.getEntity().getLevel().getName())) return;
    let itemEntity = event.getEntity();
    let item = itemEntity.getItem();
    for(let each of itemEntity.getChunk().getEntities()){
        if(each.getName() == "BNModel" && each.dataStorage.getItem("techDawn") && each.dataStorage.getItem("name") == "shaftFurnace" && each.getPosition().floor().equals(itemEntity.getPosition().floor())){
            let storage = each.dataStorage.getItem("storage");
            if(storage < 160){
                return;
            }
            let recipe = server.getCraftingManager().matchFurnaceRecipe(item);
            if(recipe != null){
                itemEntity.close();
                blockitem.makeDropItem(each.add(0,1,0), recipe.getResult());
                particle.drawDot(each.add(0,1,0), 6);
                blockitem.makeSound(each, "MOB_ENDERDRAGON_FLAP");
                each.dataStorage.setItem("storage", storage - 160);
                break;
            }
        }
    }
}

function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/event){
    //玩家操作间隔太小直接忽略
    if(playerTouchedTime[event.getPlayer().getName()] != null &&  mills() - playerTouchedTime[event.getPlayer().getName()] < 200) return;
    //该世界没有开启科技黎明直接忽略
    if(!TechDawnConfig.isLevelEnabled(event.getPlayer().getLevel().getName())) return;
    //放置高炉
    let player = event.getPlayer();
    if(event.getItem().getId() != 3353){
        return;
    }
    //放置高炉
    placeShaftFurnace((event.getBlock().getId() == 55 ? event.getBlock() : event.getBlock().add(event.getFace().getUnitVector()).getLevelBlock()).add(0.5, 0, 0.5), player);
    //去掉玩家的一个高炉物品
    let tmpitem = event.getItem().clone();
    tmpitem.setCount(1);
    blockitem.removeItemToPlayer(player, tmpitem);
    //记录玩家上次操作时间
    playerTouchedTime[event.getPlayer().getName()] = mills();
}