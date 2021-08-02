//pragma js
//pragma module TechDawnSaver

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件数据保存模块
 */

/**
 * @description 科技黎明机器储存
 */
const Long2ObjectOpenHashMap = require("it.unimi.dsi.fastutil.longs.Long2ObjectOpenHashMap");
const machineData = new Long2ObjectOpenHashMap();

/**
 * @description 添加机器
 * @param {com.blocklynukkit.loader.other.Entities.BNModel} model
 */
export function addMachine(model){
    machineData.put(model.getId(), model);
}

/**
 * @description 移除机器
 * @param {com.blocklynukkit.loader.other.Entities.BNModel} model
 */
export function removeMachine(model){
    machineData.remove(model.getId());
}

/**
 * @description 保存所有黎明科技机器数据
 */
function BNClosedEvent(/**@type {com.blocklynukkit.loader.script.event.BNClosedEvent}*/event){
    var mainDatas = [];
    for(let each of machineData.values()){
        /** @type {com.blocklynukkit.loader.other.Entities.BNModel} */
        let model = each;
        let data = {};
        data["x"] = model.getX();
        data["y"] = model.getY();
        data["z"] = model.getZ();
        data["level"] = model.getLevel().getName();
        data["yaw"] = model.getYaw();
        data["pitch"] = model.getPitch();
        data["type"] = model.dataStorage.getItem("name");
        let tmpStorage = {};
        for(let key of model.dataStorage.getKeys()){
            tmpStorage[key] = model.dataStorage.getItem(key);
        }
        data["dataStorage"] = tmpStorage;
        mainDatas.push(data);
        model.close();
    }
    manager.writeFile("./plugins/TechDawn/machines.json", JSON.stringify(mainDatas));
}

/**
 * @description 载入所有黎明科技机器
 */
function BNInitializedEvent(/**@type {com.blocklynukkit.loader.script.event.BNInitializedEvent}*/event){
    //导入模块
    const TechDawnMachineFuelGenerator = require("TechDawnMachineFuelGenerator");
    const TechDawnMachineRedStoneBatteryBox = require("TechDawnMachineRedStoneBatteryBox");
    const TechDawnMachineShaftFurnace = require("TechDawnMachineShaftFurnace");
    const TechDawnMachineMiner = require("TechDawnMachineMiner");
    const TechDawnConfig = require("TechDawnConfig");
    //解析数据
    var data = manager.readFile("./plugins/TechDawn/machines.json");
    if(data == "FILE NOT FOUND"){
        return;
    }
    var mainDatas = JSON.parse(data);
    for(let entry of mainDatas){
        let pos = algorithm.buildPosition(entry["x"], entry["y"], entry["z"], server.getLevelByName(entry["level"]));
        switch(entry["type"]){
            case "fuelGenerator":
                TechDawnMachineFuelGenerator.place(pos, null, entry);break;
            case "redStoneBatteryBox":
                TechDawnMachineRedStoneBatteryBox.place(pos, null, entry);break;
            case "shaftFurnace":
                TechDawnMachineShaftFurnace.place(pos, null, entry);break;
            case "miner":
                TechDawnMachineMiner.place(pos, null, entry);break;
        }
    }
    /**
     * @description 定时保存机器数据
     */
    manager.createLoopTask(F((tick) => {
        var mainDatas = [];
        for(let each of machineData.values()){
            /** @type {com.blocklynukkit.loader.other.Entities.BNModel} */
            let model = each;
            let data = {};
            data["x"] = model.getX();
            data["y"] = model.getY();
            data["z"] = model.getZ();
            data["level"] = model.getLevel().getName();
            data["yaw"] = model.getYaw();
            data["pitch"] = model.getPitch();
            data["type"] = model.dataStorage.getItem("name");
            let tmpStorage = {};
            for(let key of model.dataStorage.getKeys()){
                tmpStorage[key] = model.dataStorage.getItem(key);
            }
            data["dataStorage"] = tmpStorage;
            mainDatas.push(data);
        }
        manager.writeFile("./plugins/TechDawn/machines.json", JSON.stringify(mainDatas));
    }), 20*60*10);
    /**
     * @description 定时检查机器状态，消失了重新启动
     */
    manager.createLoopTask(F(tick => {
        for(let each of machineData.values()){
            /** @type {com.blocklynukkit.loader.other.Entities.BNModel} */
            let model = each;
            if(model.isClosed()){
                model.spawnToAll();
            }
        }
    }), 20*TechDawnConfig.getMachineCheckTime());
}