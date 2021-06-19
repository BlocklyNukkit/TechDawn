//pragma js
//pragma module TechDawnMachineCauldron

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件炼药锅模块
 */

/**
 * @description 炼药锅洗练合成表
 * @type {{[key: string]: {output: int, needWater: boolean}}}
 */
const cauldronCraft = {};

/**
 * @description 添加炼药锅洗练合成
 * @param {int} input
 * @param {int} output
 */
export function addCauldronCraft(input, output){
    cauldronCraft[String(input)] = output;
}

/**
 * @description 处理炼药锅洗练合成
 */
function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/event){
    if(event.getBlock().getId() != 118){
        return;
    }
    let tmpItem = event.getItem().clone();
    tmpItem.setCount(1);
    let currentCraft = cauldronCraft[String(tmpItem.getId())];
    if(currentCraft != null){
        if(currentCraft.needWater && cauldronHasWater(event.getBlock())){
            blockitem.removeItemToPlayer(event.getPlayer(), tmpItem);
            blockitem.makeDropItem(event.getBlock().add(0.5, 0.5, 0.5), blockitem.buildItem(currentCraft.output, 0, 1));
            cauldronLessWater(event.getBlock());
        }
    }
}

/**
 * @description 判断炼药锅是否有水
 * @param {cn.nukkit.block.Block} block 炼药锅方块
 */
function cauldronHasWater(block){
    return block.getDamage() > 0;
}

/**
 * @description 减少炼药锅中的水
 * @param {cn.nukkit.block.Block} block 炼药锅方块
 */
function cauldronLessWater(block){
    if(cauldronHasWater(block)){
        block.setDamage(block.getDamage() - 1);
    }
}
