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
 * @description 记录科技黎明铁砧合成
 * @type {{[key: string]: {outputId: int, toolDamage: int}}}
 */
const anvilCraft = {};

/**
 * @description 添加科技黎明铁砧合成
 * @param {int} input
 * @param {int} output
 * @param {int} damage 此次合成消耗锤子的耐久
 */
export function addAnvilCraft(input, output, damage){
    anvilCraft[String(input)] = {outputId: output, toolDamage: damage};
}

addAnvilCraft(3721, 3681, 6);

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
        let upPos = event.getBlock().add(0.5, 1, 0.5);
        tmpItem.setCount(1);
        blockitem.removeItemToPlayer(event.getPlayer(), tmpItem);
        let previousStore = anvilItem[event.getBlock()];
        if(previousStore != null){
            //去掉上面显示的物品
            entity.removeFloatingItem(upPos, previousStore);
            //防止玩家打开铁砧
            event.setCancelled();
            //如果玩家手里拿的是锤子
            if(tmpItem.getId() >= 3404 && tmpItem.getId() <= 3408){
                //查找是否有对应的合成
                let currentCraft = anvilCraft[String(previousStore.getId())];
                //找到了对应的合成
                if(currentCraft != null){
                    //执行响应合成操作
                    let resultItem = blockitem.buildItem(currentCraft.outputId, 0, 1);
                    anvilItem[event.getBlock()] = resultItem;
                    entity.showFloatingItem(upPos, resultItem);
                    //显示粒子效果
                    for(let _i=0;_i<5;_i++){
                        particle.drawDot(upPos.add(Math.random()*0.3 , 0.5 + Math.random()*0.3, Math.random()*0.3), 9);
                    }
                    //播放使用声音
                    blockitem.makeSound(upPos, "RANDOM_ANVIL_USE");
                    //玩家手里锤子掉耐久
                    let hammer = event.getItem();
                    hammer.setDamage(hammer.getDamage() + currentCraft.toolDamage);
                    if(hammer.getDamage() > hammer.getMaxDurability()){
                        inventory.setEntityItemInHand(event.getPlayer(), blockitem.buildItem(0,0,1));
                        blockitem.makeSound(upPos, "RANDOM_BREAK");
                    }else{
                        inventory.setEntityItemInHand(event.getPlayer(), hammer);
                    }
                    //记录玩家上次操作时间
                    playerTouchedTime[event.getPlayer().getName()] = mills();
                    return;
                }
            }
            //掉落上面的物品
            blockitem.makeDropItem(upPos, previousStore);
        }else if(tmpItem.getId() == 0){
            //玩家空手取下物品，不能让玩家打开铁砧
            event.setCancelled();
        }
        anvilItem[event.getBlock()] = tmpItem;
        entity.showFloatingItem(upPos, tmpItem);
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
