//pragma js
//pragma module TechDawnMain

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件主模块
 */

/** @description 翻译模块 @type {Object} */
var Translate;
/** @description 翻译函数 @type {(toTranslate: string) => string} */
var T;
/** @description 翻译函数 @type {(toTranslate: string, format: string[]) => string} */
var TF;

/**
 * @description BN初始化完成事件
 */
function BNInitializedEvent(/**@type {com.blocklynukkit.loader.script.event.BNInitializedEvent}*/event){
    //引入其他模块
    Translate = require("TechDawnTranslate");
    //导出翻译函数
    T = Translate.translate;
    TF = Translate.translateFormat;
    
    //开始初始化
    logger.info(T("init"));
}