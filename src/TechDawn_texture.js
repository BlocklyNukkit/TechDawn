//pragma js
//pragma module TechDawnTexture

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件材质模块，启动时将所有贴图写入硬盘
 */

const textureList = [
    '不锈钢板.png',
    '不锈钢粉.png',
    '不锈钢粒.png',
    '不锈钢锤子.png',
    '不锈钢锭.png',
    '不锈钢齿轮.png',
    '孔雀石矿.png',
    '小撮不锈钢粉.png',
    '小撮煤粉.png',
    '小撮硫粉.png',
    '小撮金粉.png',
    '小撮钻石粉.png',
    '小撮铁粉.png',
    '小撮铅粉.png',
    '小撮铜粉.png',
    '小撮铬粉.png',
    '小撮银粉.png',
    '小撮锡粉.png',
    '小撮锰粉.png',
    '小撮镍粉.png',
    '小撮青金石粉.png',
    '小撮青铜粉.png',
    '方铅矿石.png',
    '木锤子.png',
    '木齿轮.png',
    '淘金碗.png',
    '煤板.png',
    '煤粉.png',
    '煤粒.png',
    '煤齿轮.png',
    '石墨矿石.png',
    '石锤子.png',
    '石齿轮.png',
    '硫板.png',
    '硫粉.png',
    '硫粒.png',
    '磁铁矿.png',
    '空木桶.png',
    '粉碎的孔雀石矿.png',
    '粉碎的方铅矿.png',
    '粉碎的煤矿.png',
    '粉碎的磁铁矿.png',
    '粉碎的红石矿.png',
    '粉碎的绿宝石矿.png',
    '粉碎的金矿.png',
    '粉碎的钻石矿.png',
    '粉碎的铁矿.png',
    '粉碎的铜矿.png',
    '粉碎的铝矿.png',
    '粉碎的银矿.png',
    '粉碎的锌矿.png',
    '粉碎的锡矿.png',
    '粉碎的青金石矿.png',
    '粉碎的镍矿.png',
    '粉碎的铬矿.png',
    '粉碎的锰矿.png',
    '装水木桶.png',
    '金板.png',
    '金粉.png',
    '金齿轮.png',
    '钻石板.png',
    '钻石粉.png',
    '钻石粒.png',
    '钻石锤子.png',
    '钻石齿轮.png',
    '铁板.png',
    '铁粉.png',
    '铁锤子.png',
    '铁齿轮.png',
    '铅板.png',
    '铅矿石.png',
    '铅粉.png',
    '铅粒.png',
    '铅锭.png',
    '铜板.png',
    '铜矿石.png',
    '铜粉.png',
    '铜粒.png',
    '铜锤子.png',
    '铜锭.png',
    '铜齿轮.png',
    '铝矿石.png',
    '铬板.png',
    '铬粉.png',
    '铬粒.png',
    '铬锭.png',
    '铬齿轮.png',
    '银板.png',
    '银矿石.png',
    '银粉.png',
    '银粒.png',
    '银锭.png',
    '银齿轮.png',
    '锌矿石.png',
    '锡板.png',
    '锡矿石.png',
    '锡粉.png',
    '锡粒.png',
    '锡锭.png',
    '锡齿轮.png',
    '锰板.png',
    '锰粉.png',
    '锰粒.png',
    '锰锭.png',
    '锰齿轮.png',
    '镍板.png',
    '镍矿石.png',
    '镍粉.png',
    '镍粒.png',
    '镍锭.png',
    '镍齿轮.png',
    '青金石板.png',
    '青金石粉.png',
    '青金石粒.png',
    '青金石齿轮.png',
    '青铜板.png',
    '青铜粉.png',
    '青铜粒.png',
    '青铜锭.png',
    '青铜齿轮.png',
    '锻造模板.png',
    '锻造模板_齿轮.png',
    '精煤.png',
    '精煤粒.png',
    '火力发电机.png',
    '红石电池箱.png',
    '高炉.png',
    '导热片.png',
    '磁化不锈钢锭.png',
    '坡莫合金锭.png',
    '坡莫合金粉.png',
    '坡莫合金粒.png',
    '坡莫合金齿轮.png',
    '坡莫合金板.png',
    '小撮坡莫合金粉.png',
    '电动马达.png',
    '挖掘机.png',
    '农场管理机.png',
    '铜线圈.png',
    '电磁铁.png',
    '光电板.png',
    '太阳能发电机.png',
]

const modelList = [
    {path: "fuelGenerator/fuelGenerator.json", name: "fuelGenerator.json"},
    {path: "fuelGenerator/fuelGenerator.png", name: "fuelGenerator.png"},
    {path: "fuelGenerator/fuelGenerator_working.json", name: "fuelGenerator_working.json"},
    {path: "fuelGenerator/fuelGenerator_working.png", name: "fuelGenerator_working.png"},
    {path: "redStoneBatteryBox/redStoneBatteryBox.json", name: "redStoneBatteryBox.json"},
    {path: "redStoneBatteryBox/redStoneBatteryBox.png", name: "redStoneBatteryBox.png"},
    {path: "shaftFurnace/shaftFurnace.json", name: "shaftFurnace.json"},
    {path: "shaftFurnace/shaftFurnace.png", name: "shaftFurnace.png"},
    {path: "miner/miner.json", name: "miner.json"},
    {path: "miner/miner.png", name: "miner.png"},
    {path: "farmManager/farmManager.json", name: "farmManager.json"},
    {path: "farmManager/farmManager.png", name: "farmManager.png"},
    {path: "electromagnet/electromagnet.json", name: "electromagnet.json"},
    {path: "electromagnet/electromagnet.png", name: "electromagnet.png"},
    {path: "solarGenerator/solarGenerator.json", name: "solarGenerator.json"},
    {path: "solarGenerator/solarGenerator.png", name: "solarGenerator.png"},
]

//引入翻译模块
/** @description 翻译模块 @type {Object} */
const Translate = require("TechDawnTranslate");
/** @description 翻译函数 @type {(toTranslate: string) => string} */
var T = Translate.translate;
/** @description 翻译函数 @type {(toTranslate: string, format: string[]) => string} */
var TF = Translate.translateFormat;
/** @description 是否为中文 @type {boolean} */
const isChinese = (server.getLanguage().getLang()=="chs");
//下载物品材质
for(let each of textureList){
    let path = "./plugins/TechDawn/textures/"+each;
    if(!manager.isPathExists(path)){
        let url = "https://"+(isChinese?"raw.fastgit.org":"raw.githubusercontent.com")+"/BlocklyNukkit/TectDawn/master/image/"+(java.net.URLEncoder).encode(each, "UTF-8");
        logger.info(TF("download_texture", [each]));
        (com.blocklynukkit.loader.utils.Utils).downLoadFromUrl(url, each, "./plugins/TechDawn/textures");
    }
}
//下载模型材质
for(let each of modelList){
    let path = "./plugins/BlocklyNukkit/skin/"+each.name;
    if(!manager.isPathExists(path)){
        let url = "https://"+(isChinese?"raw.fastgit.org":"raw.githubusercontent.com")+"/BlocklyNukkit/TectDawn/master/model/"+each.path;
        logger.info(TF("download_texture", [each.path]));
        (com.blocklynukkit.loader.utils.Utils).downLoadFromUrl(url, each.name, "./plugins/BlocklyNukkit/skin");
    }
}
