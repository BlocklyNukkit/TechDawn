//pragma js
//pragma module TechDawnMachinePower

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件能源模块
 */

/**
 * @description 获取时间函数
 */
const mills = java.lang.System.currentTimeMillis;

/**
 * @description 能源最大传输距离
 */
const maxConductLength = 256;

/**
 * @description 字符串形式的坐标对应电网中应有的机械实体
 * @type {{[key: string]: com.blocklynukkit.loader.other.Entities.BNModel}}
 * @todo 此优化方案尚未启用
 */
const pos2EntityContains = {}

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
     * @type {string[]} 已经递归过的位置 
     */
    this.closed = [];
    this.time = 0;
    /**
     * @description 递归函数
     * @param {cn.nukkit.level.Position} currentPos
     * @private
     */
    this.transfer = function(currentPos){
        if(this.closed.indexOf(pos2string(currentPos)) != -1){
            return;
        }else{
            this.time++;
            if(this.time > maxConductLength){
                return;
            }
            this.closed.push(pos2string(currentPos));
            let poses = [
                currentPos.add(1,0,0),
                currentPos.add(1,1,0),
                currentPos.add(1,-1,0),
                currentPos.add(-1,1,0),
                currentPos.add(-1,0,0),
                currentPos.add(-1,-1,0),
                currentPos.add(0,1,1),
                currentPos.add(0,0,1),
                currentPos.add(0,-1,1),
                currentPos.add(0,1,-1),
                currentPos.add(0,0,-1),
                currentPos.add(0,-1,-1)
            ];
            for(let each of poses){
                if(canTransferTo(currentPos, each)){
                    this.transfer(each);
                }
            }
        }
    }
    /**
     * @description 开始计算能源传输
     * @param {boolean} showParticle 是否显示红石粒子
     */
    this.startTransfer = function(showParticle){
        let start = mills();
        //计算能源通路
        this.transfer(this.startPos);
        //转换为坐标处理
        let finalPoses = [];
        for(let each of this.closed){
            finalPoses.push(string2pos(each));
        }
        //显示红石粒子
        if(showParticle){
            for(let each of finalPoses){
                particle.drawDot(each.add(0.5,0.1,0.5), 11);
            }
        }
        /**
         * @description 所有机械实体数组
         * @type {com.blocklynukkit.loader.other.Entities.BNModel[]}
         */
        const inputMachines = [];
        /**
         * @description 所有电池实体数组
         * @type {com.blocklynukkit.loader.other.Entities.BNModel[]}
         */
        const storeMachines = [];
        //计算范围内的所有机械实体
        for(let i=0;i<finalPoses.length;i++){
            /** @type {cn.nukkit.entity.Entity[]} */
            let chunkEntites = Java.from(finalPoses[i].getChunk().getEntities().values());
            for(let j=0;j<chunkEntites.length;j++){
                let each = chunkEntites[j];
                if(each.getName() == "BNModel" && each.dataStorage.getItem("techDawn") && each.getPosition().floor().equals(finalPoses[i])){
                    if(each.dataStorage.getItem("mode") == "I"){
                        inputMachines.push(each);
                    }else if(each.dataStorage.getItem("mode") == "IO"){
                        storeMachines.push(each);
                    }
                }
            }
        }
        //机器排序
        var s = this.startPos;
        inputMachines.sort((a, b) => {
            return s.distance(a) - s.distance(b);
        });
        storeMachines.sort((a, b) => {
            return a.dataStorage.getItem("storage") - b.dataStorage.getItem("storage");
        });
        //分配电能
        for(let each of inputMachines.concat(storeMachines)){
            let currentTransfer = Math.min(each.dataStorage.getItem("maxAccept"), this.totalTransfer);
            const storage = each.dataStorage.getItem("storage");
            const maxStorage = each.dataStorage.getItem("maxStorage");
            if(storage + currentTransfer > maxStorage){
                currentTransfer = maxStorage - storage;
            }
            this.totalTransfer -= currentTransfer;
            each.dataStorage.setItem("storage", storage + currentTransfer);
            if(this.totalTransfer <= 0){
                return;
            }
        }
        logger.info(mills()-start);
    }
}

/**
 * @description 构建能源传输对象
 * @param {cn.nukkit.level.Position} startPos 能源输出开始的地方
 * @param {int} totalTransfer 一共传输多少能源
 * @returns {PowerOutputProcess}
 */
export function newPowerOutputProcess(startPos, totalTransfer){
    return new PowerOutputProcess(startPos, totalTransfer);
}

/**
 * @description 坐标转字符串
 * @param {cn.nukkit.level.Position} pos
 */
function pos2string(pos){
    return pos.x+" "+pos.y+" "+pos.z+" "+pos.getLevelName();
}

/**
 * @description 字符串转坐标
 * @param {string} str
 */
function string2pos(str){
    let xyz = str.split(" ");
    return algorithm.buildPosition(Number(xyz[0]), Number(xyz[1]), Number(xyz[2]), server.getLevelByName(xyz[3]));
}

/**
 * @description 红石线是否连接
 * @param {cn.nukkit.level.Position} from
 * @param {cn.nukkit.level.Position} to
 * @returns {boolean}
 */
function canTransferTo(from, to){
    if(from.equals(to)){
        return false;
    }else if(to.getLevelBlock().getId() != 55){
        return false;
    }else{
        if(Math.abs(to.distanceSquared(from)) > 2){
            return false;
        }else{
            if(to.y == from.y){
                return true;
            }else if(to.x != from.x){
                if(to.x > from.x && to.y > from.y){
                    return !from.add(0,1,0).getLevelBlock().isSolid();
                }else if(to.x > from.x && to.y < from.y){
                    return !from.add(1,0,0).getLevelBlock().isSolid();
                }else if(to.x < from.x && to.y > from.y){
                    return !from.add(0,1,0).getLevelBlock().isSolid();
                }else if(to.x < from.x && to.y < from.y){
                    return !from.add(-1,0,0).getLevelBlock().isSolid();
                }
            }else if(to.z != from.z){
                if(to.z > from.z && to.y > from.y){
                    return !from.add(0,1,0).getLevelBlock().isSolid();
                }else if(to.z > from.z && to.y < from.y){
                    return !from.add(0,0,1).getLevelBlock().isSolid();
                }else if(to.z < from.z && to.y > from.y){
                    return !from.add(0,1,0).getLevelBlock().isSolid();
                }else if(to.z < from.z && to.y < from.y){
                    return !from.add(0,0,-1).getLevelBlock().isSolid();
                }
            }
        }
    }
    return false;
}

function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/e){
    if(e.getBlock().getId() == 55){
        e.getPlayer().sendMessage(e.getBlock().getDamage());
        let process = new PowerOutputProcess(e.getBlock(), 20);
        process.startTransfer(true);
    }
}