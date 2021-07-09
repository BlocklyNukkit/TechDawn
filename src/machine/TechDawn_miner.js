//pragma js
//pragma module TechDawnMachineMiner

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件挖掘机模块
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
 * @description 放置挖掘机
 * @param {cn.nukkit.level.Position} pos
 * @param {cn.nukkit.Player} player 放置的玩家，如果非玩家放置传入null
 * @param {{x: number,y: number,z: number,level: string,yaw: number,pitch: number, dataStroage: Object}} data 非玩家放置时传入的还原信息
 */
export function placeMiner(pos, player, data){
    pos.getLevel().loadChunk(pos.getChunkX(), pos.getChunkZ());
    let model = entity.buildModel(pos, "miner", 1, 1, 1, 1, F((self, tick) => {
        //每32刻检测一次是否可以挖掘方块
        if(!(tick & 31) && self.dataStorage.getItem("storage") >= 20){
            /** @type {cn.nukkit.level.Position} */
            let dVector = self.getPosition().clone();
            let font = Math.floor((45 + self.getYaw()) / 90);
            switch (font) {
                case 0:
                    dVector = dVector.add(0, 0, 1);
                    break;
                case 1:
                    dVector = dVector.add(-1, 0, 0);
                    break;
                case 2:
                    dVector = dVector.add(0, 0, -1);
                    break;
                case 3:
                    dVector = dVector.add(1, 0, 0);
                    break;
            }
            let block = dVector.getLevelBlock();
            if(block.canBeBrokenWith(blockitem.buildItem(257, 0, 1))){
                blockitem.setBlock(dVector, blockitem.buildBlock(0, 0), true);
                blockitem.blockUpdate(dVector);
                blockitem.makeDropItem(dVector.add(0.5, 0.5, 0.5), blockitem.buildItemFromBlock(block));
                self.dataStorage.setItem("storage", self.dataStorage.getItem("storage") - 20);
            }
        }
    }), 1, F((self, damageEvent) => {
        let tmpItem = inventory.getEntityItemInHand(damageEvent.getDamager());
        //检测手里是不是锤子
        if(tmpItem.getId() >= 3404 && tmpItem.getId() <= 3408){
            blockitem.makeDropItem(self, blockitem.buildItem(3354, 0, 1));
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
        model.dataStorage.setItem("name", "miner");
        model.dataStorage.setItem("storage", 0);
        model.dataStorage.setItem("maxStorage", 120);
        model.dataStorage.setItem("mode", "I");
        model.dataStorage.setItem("maxAccept", 20);
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
        if(each.getName() == "BNModel" && each.dataStorage.getItem("techDawn") && each.dataStorage.getItem("name") == "miner" && each.getPosition().floor().equals(itemEntity.getPosition().floor())){
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
    //放置挖掘机
    let player = event.getPlayer();
    if(event.getItem().getId() != 3354){
        return;
    }
    //放置挖掘机
    placeMiner((event.getBlock().getId() == 55 ? event.getBlock() : event.getBlock().add(event.getFace().getUnitVector()).getLevelBlock()).add(0.5, 0, 0.5), player);
    //去掉玩家的一个挖掘机物品
    let tmpitem = event.getItem().clone();
    tmpitem.setCount(1);
    blockitem.removeItemToPlayer(player, tmpitem);
    //记录玩家上次操作时间
    playerTouchedTime[event.getPlayer().getName()] = mills();
}