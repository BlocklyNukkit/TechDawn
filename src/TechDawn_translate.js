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
    "init": "§e科技黎明插件正在加载中...",
    "download_texture": "§b正在下载材质 §e{} §b中...",
}
const english = {
    "init": "§eTechDawn plugin loading...",
    "download_texture": "§bDownloading texture §e{} §b...",
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