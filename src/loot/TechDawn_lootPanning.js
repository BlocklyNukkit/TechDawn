//pragma js
//pragma module TechDawnLoot_Panning

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件主模块
 */

/**
 * @description 获取淘金结果
 * @param {boolean} sandOrGravel
 * @returns {cn.nukkit.item.Item}
 * @todo
 */
export function getPanningResult(sandOrGravel){
    return sandOrGravel ? getSandPanningResult() : getGravelPanningResult();
}

/**
 * @description 获取沙子淘金结果
 * @returns {cn.nukkit.item.Item}
 * @todo
 */
function getSandPanningResult(){
    return blockitem.buildItem(264, 0, 1);
}

/**
 * @description 获取沙砾淘金结果
 * @returns {cn.nukkit.item.Item}
 * @todo
 */
 function getGravelPanningResult(){
    return blockitem.buildItem(262, 0, 1);
}