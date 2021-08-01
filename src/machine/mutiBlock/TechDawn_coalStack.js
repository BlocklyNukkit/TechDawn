//pragma js
//pragma module TechDawnMutiBlockMachineCoalStack

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件木炭堆模块
 */

/**
 * @description 配置文件模块
 */
const TechDawnConfig = require("TechDawnConfig");

function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/event){
    //该世界没有开启科技黎明直接忽略
    if(!TechDawnConfig.isLevelEnabled(event.getPlayer().getLevel().getName())) return;
    var touchblock = event.getBlock();
    var touchpos = algorithm.buildPositionfromBlock(event.getBlock());
    var item = blockitem.getItemInHand(event.getPlayer());
    if (item == null || item == undefined) {
        return;
    }
    if(touchblock.getId()==33){
        if(touchblock.getDamage()==0 && item.getId()==50){
            checkCoalStack(touchpos,event);
        }
    }
}

const Position = cn.nukkit.level.Position;

/**
 * @description 检查并创建木炭堆
 * @param {cn.nukkit.level.Position} pos 点击的位置
 * @param {cn.nukkit.event.player.PlayerInteractEvent} 玩家点击方块事件
 * @deprecated 此函数从空岛科技复制而来，需要重构
 */
function checkCoalStack(pos,event){
    let touchblock = event.getBlock();
    let touchpos = algorithm.buildPositionfromBlock(event.getBlock());
    let item = blockitem.getItemInHand(event.getPlayer());
    let brickLevel = 256;
    let tmp = Position.fromObject(pos,pos.getLevel())
    let height = -1;
    if(item.getId()!=50){
        return false;
    }
    for(let i=pos.getY();i>1;i--){
        tmp = tmp.add(0,-1,0);
        height++;
        if(tmp.getLevelBlock().getId()==45){
            brickLevel = tmp.getY();
            break;
        }
        if(i<pos.getY()&&(tmp.getLevelBlock().getId()!=17)){
            brickLevel=256;
            break;
        }
    }
    let jiao = 0;
    if(brickLevel==256){
        return false;
    }else{
        for(let i=0;i<7;i++){
            if(tmp.getLevel().getBlock(tmp.x-i,tmp.y,tmp.z-i).getId()==45){
                jiao = i;
            }
        }
    }
    let len = jiao*2+1;let fillbrick = true;
    for(let i=pos.x-jiao;i<pos.x+jiao+1;i++){
        for(let j=pos.z-jiao;j<pos.z+jiao+1;j++){
            if(pos.getLevel().getBlock(i,tmp.y,j).getId()!=45){
                fillbrick = false;
                return false;
            }
        }
    }
    for(let i=pos.x-jiao;i<pos.x+jiao+1;i++){
        for(let j=pos.z-jiao;j<pos.z+jiao+1;j++){
            if(pos.getLevel().getBlock(i,pos.y,j).getId()==0){
                fillbrick = false;
                return false;
            }
        }
    }
    event.setCancelled();
    if(item.getCount()==1){
        inventory.setEntityItemInHand(event.getPlayer(),blockitem.buildItem(0,0,0));
    }else{
        inventory.setEntityItemInHand(event.getPlayer(),blockitem.buildItem(item.getId(),item.getDamage(),item.getCount()-1));
    }
    let handler = manager.setInterval(function(pos1,pos2){
        let dx = (pos1.x+pos2.x)/2;let dz = (pos1.z+pos2.z)/2;
        let d1 = Position.fromObject(manager.buildvec3(pos1.x,pos1.y,pos2.z),pos1.getLevel());
        let d2 = Position.fromObject(manager.buildvec3(pos2.x,pos1.y,pos1.z),pos1.getLevel());
        particle.drawLine(pos1.add(0.5,0,0.5),pos2.add(0.5,0,0.5),1,67);particle.drawLine(d1.add(0.5,0,0.5),d2.add(0.5,0,0.5),1,67);
    },30,Position.fromObject(manager.buildvec3(pos.x-jiao,pos.y+2,pos.z-jiao),pos.getLevel()),Position.fromObject(manager.buildvec3(pos.x+jiao+1,pos.y+2,pos.z+jiao+1),pos.getLevel()));
    manager.setTimeout(function(pos1,pos2,id){
        manager.clearInterval(id);
        for(let x=pos1.x;x<pos2.x;x++){
            for(let y=pos1.y;y<pos2.y;y++){
                for(let z=pos1.z;z<pos2.z;z++){
                    let make = Position.fromObject(manager.buildvec3(x,y,z),pos1.getLevel());
                    if(make.getLevelBlock().getId()==17){
                        blockitem.setBlock(make,blockitem.buildBlock(0,0),true);
                        blockitem.makeDropItem(make.add(0.5,0,0.5),blockitem.buildItem(263,1,Math.floor(2+Math.random()*2)));
                    }
                }
            }
        }
    },Math.floor(1*20*(90+60*Math.random())),Position.fromObject(manager.buildvec3(pos.x-jiao,tmp.y+1,pos.z-jiao),pos.getLevel()),Position.fromObject(manager.buildvec3(pos.x+jiao+1,pos.y,pos.z+jiao+1),pos.getLevel()),handler)
    return true;
}