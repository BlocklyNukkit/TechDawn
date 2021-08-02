//pragma js
//pragma module TechDawnTranslate

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件翻译模块
 */

/**
 * @description 翻译内容映射表
 */
const chinese = {
    "init": "§e科技黎明插件正在加载中...",
    "download_texture": "§b正在下载材质 §e{} §b中...",
    "register_items": "§e正在注册物品中...",
    "redstone_battery_box_title": "红石电池箱",
    "battery_box_content": "存储： §e{} / {} §c RF",
    "permission_reload_config": "科技黎明插件重载配置权限",
    "reload_techdawn_config_command": "重载科技黎明配置文件命令",
    "reload_techdawn_config_command_finish": "科技黎明配置文件重载完成",
    "no_permission_for_command": "§c你没有权限使用此命令",
    "farm_manager_title": "农场管理机",
    "farm_manager_slider_title": "模式",
}
const english = {
    "init": "§eTechDawn plugin loading...",
    "download_texture": "§bDownloading texture §e{} §b...",
    "register_items": "§eRegistering items...",
    "redstone_battery_box_title": "Redstone Battery Box",
    "battery_box_content": "Storage: §e{} / {} §c RF",
    "permission_reload_config": "The permission to reload configs of techDawn",
    "reload_techdawn_config_command": "Reload configs of TechDawn",
    "reload_techdawn_config_command_finish": "TechDawn configs reloaded",
    "no_permission_for_command": "§cYou DONOT have the permission to access the command",
    "farm_manager_title": "Farm Manager",
    "farm_manager_slider_title": "Mode",
}
const isChinese = (server.getLanguage().getLang() == "chs");


/**
 * @description 获取翻译内容
 */
export function translate(toTranslate){
    return isChinese ? chinese[toTranslate] : english[toTranslate];
}

/**
 * @description 获取格式化翻译内容
 */
 export function translateFormat(toTranslate, formats){
    /** @type {string[]} */
    let arr = formats;
    /** @type {string} */
    let output = isChinese ? chinese[toTranslate] : english[toTranslate];
    for(let each of arr){
        output = output.replace('{}', each);
    }
    return output;
}