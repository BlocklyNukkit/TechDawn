//pragma js
//pragma module TechDawnMachineAnvil

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件主模块
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

/**
 * @description 记录铁砧对应的物品
 */
const anvilItem = new com.blocklynukkit.loader.other.data.MemoryStorage();

/**
 * @description 处理铁砧潜行合成
 */
function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/event){
    //玩家操作间隔太小直接忽略
    if(playerTouchedTime[event.getPlayer().getName()] != null &&  mills() - playerTouchedTime[event.getPlayer().getName()] < 200) return;
    //玩家不潜行直接不处理
    if(!event.getPlayer().isSneaking()) return;
    //处理铁砧放置物品
    if(event.getBlock().getId() == 145){
        let tmpItem = event.getItem().clone();
        tmpItem.setCount(1);
        blockitem.removeItemToPlayer(event.getPlayer(), tmpItem);
        let previousStore = anvilItem[event.getBlock()];
        if(previousStore != null){
            entity.removeFloatingItem(event.getBlock().add(0.5, 1, 0.5), previousStore);
            blockitem.makeDropItem(event.getBlock().add(0.5, 1, 0.5), previousStore);
            //防止玩家打开铁砧
            event.setCancelled();
        }else if(tmpItem.getId() == 0){
            //玩家空手取下物品，不能让玩家打开铁砧
            event.setCancelled();
        }
        anvilItem[event.getBlock()] = tmpItem;
        entity.showFloatingItem(event.getBlock().add(0.5, 1, 0.5), tmpItem);
    }
    //记录玩家上次操作时间
    playerTouchedTime[event.getPlayer().getName()] = mills();
}

/**
 * @description 当插件关闭时，铁砧掉落上面的物品
 */
function BNClosedEvent(/**@type {com.blocklynukkit.loader.script.event.BNClosedEvent}*/event){
    for(let entry of anvilItem.entrySet()){
        if(entry.getValue().getId() != 0){
            blockitem.makeDropItem(entry.getKey().add(0.5, 1, 0.5), entry.getValue());
            entity.removeFloatingItem(entry.getKey().add(0.5, 1, 0.5), entry.getValue());
        }
    }
}
