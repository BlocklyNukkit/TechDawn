//pragma js
//pragma module TechDawnMain

/**
 * @author Superice666(超神的冰凉) @TechDawn_Project
 * @description 科技黎明插件主模块
 */

/** @description 翻译模块 @type {Object} */
var Translate;
/** @description 翻译函数 @type {(toTranslate: string) => string} */
var T;

/**
 * @description BN初始化完成事件
 */
function BNInitializedEvent(/**@type {com.blocklynukkit.loader.script.event.BNInitializedEvent}*/event){
    //引入其他模块
    Translate = require("TechDawnTranslate");
    //导出翻译函数
    T = Translate.translate;

    //开始初始化
    logger.info(T("init"));
}