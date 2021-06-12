//pragma js
//pragma module TechDawnTranslate

/**
 * @author Superice666(超神的冰凉) @TechDawn_Project
 * @description 科技黎明插件翻译模块
 */

/**
 * @description 翻译内容映射表
 */
const chinese = {
    "init": "§e科技黎明插件正在加载中..."
}
const english = {
    "init": "§eTechDawn plugin loading..."
}
const isChinese = (server.getLanguage().getLang() == "chn");


/**
 * @description 获取翻译内容
 */
export function translate(toTranslate){
    return isChinese ? chinese[toTranslate] : english[toTranslate];
}