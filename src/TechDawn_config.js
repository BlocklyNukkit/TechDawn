//pragma js
//pragma module TechDawnMain

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件配置文件模块
 */

/**
 * @description 配置文件路径
 */
const configPath = "./plugins/TechDawn/config.yml";

/**
 * @description 配置文件对象
 */
var config = {
    /** @type {string[]} */
    enableLevel: [],
    /** @type {int} */
    maxPowerConductLength: 256
};

/**
 * @description 启动时执行的内容
 */
{
    loadConfig();
    //导入翻译模块
    const TechDawnTranslate = require("TechDawnTranslate");
    //创建权限节点
    manager.createPermission("techDawn.reloadConfig", TechDawnTranslate.translate("permission_reload_config"), "OP");
    //创建命令
    manager.createCommand("reloadtechdawnconfig", TechDawnTranslate.translate("reload_techdawn_config_command"), F((sender, args) => {
        //检测玩家是否有权访问命令
        if(sender.isPlayer()){
            let player = server.getPlayer(sender.getName());
            if(!manager.checkPlayerPermission("techDawn.reloadConfig", player)){
                player.sendMessage(TechDawnTranslate.translate("no_permission_for_command"));
            }
        }
        //有权访问则重载配置文件
        loadConfig();
        sender.sendMessage(TechDawnTranslate.translate("reload_techdawn_config_command_finish"));
    }))
}

/**
 * @description 加载配置文件
 */
function loadConfig(){
    let content = manager.readFile(configPath);
    if(content == "FILE NOT FOUND"){
        manager.writeFile(configPath, manager.JSONtoYAML(JSON.stringify(config)));
    }else{
        config = JSON.parse(manager.YAMLtoJSON(content));
    }
}