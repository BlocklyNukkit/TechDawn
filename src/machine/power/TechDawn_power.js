//pragma js
//pragma module TechDawnMachinePower

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件能源模块
 */

/**
 * @description 能源输出处理对象
 * @class
 * @param {cn.nukkit.level.Position} startPos 能源输出开始的地方
 * @param {int} totalTransfer 一共传输多少能源
 */
function PowerOutputProcess(startPos, totalTransfer){
    /** @type {cn.nukkit.level.Position} 能源输出开始的地方 */
    this.startPos = startPos;
    /** @type {int} 一共传输多少能源 */
    this.totalTransfer = totalTransfer;
    /** 
     * @private 
     * @type {cn.nukkit.level.Position[]} 已经递归过的位置 
     */
    this.closed = [];
    /**
     * @description 递归函数
     * @private
     */
    this.transfer = function(currentPos){
        if(this.closed.indexOf(currentPos) != -1){
            return;
        }else{
            
        }
    }
    /**
     * @description 开始计算能源传输
     */
    this.startTransfer = function(){
        
    }
}

function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/e){
    if(e.getBlock().getId() == 55){
        e.getPlayer().sendMessage(e.getBlock().getDamage());
    }
}