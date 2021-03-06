//pragma js
//pragma module TechDawnMachineItem

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件机械物品模块
 */

/**
 * @description 所有注册过的物品
 * @type {{[key: string]: ItemInfo}}
 */
 const items = {};

/**
 * @description 根据物品名获取物品信息
 * @param {string} name
 * @returns {ItemInfo}
 */
export function getMachineItemInfo(name){
    return items[name];
}

/**
 * @class
 * @classdesc 描述一个物品的信息
 * @constructor
 * @param {int} id 物品的id
 * @param {string} name 物品的名称
 * @param {string} eng 物品英文翻译名
 * @param {string} chn 物品中文翻译名
 * @param {string} texturePath 物品贴图路径
 * @param {string} stackSize 物品最大堆叠数量
 * @param {string} type 物品的种类：`construction` `nature` `equipment` `items`
 * @param {boolean} isDisplayAsTool 是否展示为工具
 * @param {boolean} canOnOffhand 副手装备
 */
function ItemInfo(id, name, eng, chn, texturePath, stackSize, type, isDisplayAsTool, canOnOffhand){
    /** @description 物品的id */
    this.id = id;
    /** @description 物品的名称 */
    this.name = name;
    /** @description 物品的英文翻译名 */
    this.eng = eng;
    /** @description 物品的中文翻译名 */
    this.chn = chn;
    /** @description 物品的贴图路径 */
    this.texturePath = texturePath;
    /** @description 物品的最大堆叠数量 */
    this.stackSize = stackSize;
    /** @description 物品的种类：`construction` `nature` `equipment` `items` */
    this.type = type;
    /** @description 是否展示为工具 */
    this.isDisplayAsTool = isDisplayAsTool;
    /** @description 副手装备 */
    this.canOnOffhand = canOnOffhand;
    //保存该物品
    items[name] = this;
    /**
     * @description 注册该类描述的物品并返回类自身
     */
    this.register = function(){
        blockitem.registerSimpleItem(this.id, this.name, this.stackSize, this.type, this.isDisplayAsTool, this.canOnOffhand);
        blockitem.addItemEnglishTranslation(this.id, this.eng);
        blockitem.addItemChineseTranslation(this.id, this.chn);
        blockitem.addItemTexture(this.id, this.texturePath);
        blockitem.addToCreativeBar(blockitem.buildItem(this.id, 0, 1));
        return this;
    }
}

/**
 * @description 注册物品
 * @summary 3351-3400 机械
 * @summary 3401-3500 工具
 * @summary 3501-3520 粉碎矿石
 * @summary 3521-3580 矿物粉
 * @summary 3581-3640 小撮矿物粉
 * @summary 3641-3680 齿轮
 * @summary 3681-3720 金属板
 * @summary 3721-3770 金属锭
 * @summary 3771-3830 金属粒
 */
//注册火力发电机及其合成表
new ItemInfo(3351, "fuel_generator", "Fuel Generator", "火力发电机", "./plugins/TechDawn/textures/火力发电机.png", 64, "construction", false, false).register();
/// |   铁板   |   铁板   |   铁板   |
/// |   铁板   |不锈钢齿轮|   铁板   |
/// |   铁板   |   熔炉   |   铁板   |
blockitem.addShapedCraft("AAA|ABA|ACA|", blockitem.buildItem(3351, 0, 1), "A", blockitem.buildItem(3691, 0, 1), "B", blockitem.buildItem(3641, 0, 1), "C", blockitem.buildItem(61, 0, 1));

//注册红石电池箱及其合成表
new ItemInfo(3352, "redstone_battery_box", "Redstone Battery Box", "红石电池箱", "./plugins/TechDawn/textures/红石电池箱.png", 64, "construction", false, false).register();
/// |   铁板   |   铁板   |   铁板   |
/// |不锈钢齿轮|   红石块  |不锈钢齿轮|
/// |   铁板   |   铁板   |   铁板   |
blockitem.addShapedCraft("AAA|BCB|AAA", blockitem.buildItem(3352, 0, 1), "A", blockitem.buildItem(3691, 0, 1), "B", blockitem.buildItem(3641, 0, 1), "C", blockitem.buildItem(152, 0, 1));

//注册高炉及其合成表
new ItemInfo(3353, "shaft_furnace", "Shaft Furnace", "高炉", "./plugins/TechDawn/textures/高炉.png", 64, "construction", false, false).register();
/// |   铁板   |  导热片  |   铁板   |
/// |  导热片  |  红石块  |  导热片  |
/// |   铁板   |  导热片  |   铁板   |
blockitem.addShapedCraft("ABA|BCB|ABA", blockitem.buildItem(3353, 0, 1), "A", blockitem.buildItem(3691, 0, 1), "B", blockitem.buildItem(3411, 0, 1), "C", blockitem.buildItem(152, 0, 1));

//注册挖掘机及其合成表
new ItemInfo(3354, "miner", "Miner", "挖掘机", "./plugins/TechDawn/textures/挖掘机.png", 64, "construction", false, false).register();
/// |   铁板   | 电动马达 |   铁板   |
/// | 电动马达 |  红石块  | 电动马达 |
/// |   铁板   |   铁镐   |   铁板   |
blockitem.addShapedCraft("ABA|BCB|ADA", blockitem.buildItem(3354, 0, 1), "A", blockitem.buildItem(3691, 0, 1), "B", blockitem.buildItem(3412, 0, 1), "C", blockitem.buildItem(152, 0, 1), "D", blockitem.buildItem(257, 0, 1));

//注册农场管理机及其合成表
new ItemInfo(3355, "farm_manager", "Farm Manager", "农场管理机", "./plugins/TechDawn/textures/农场管理机.png", 64, "construction", false, false).register();
/// |   铁板   |   铁锄   |   铁板   |
/// |   铁板   |  红石块  |   铁板   |
/// |   铁板   | 电动马达 |   铁板   |
blockitem.addShapedCraft("ABA|ACA|ADA|", blockitem.buildItem(3355, 0, 1), "A", blockitem.buildItem(3691, 0, 1), "B", blockitem.buildItem(292, 0, 1), "C", blockitem.buildItem(152, 0, 1), "D", blockitem.buildItem(3412, 0, 1));

//注册电磁铁及其合成表
new ItemInfo(3356, "electromagnet", "Electromagnet", "电磁铁", "./plugins/TechDawn/textures/电磁铁.png", 64, "construction", false, false).register();
/// |   铁板   |  铜线圈  |   铁板   |
/// |  铜线圈  |  红石块  |  铜线圈  |
/// |   铁板   |  铜线圈  |   铁板   |
blockitem.addShapedCraft("ABA|BCB|ABA", blockitem.buildItem(3356, 0, 1), "A", blockitem.buildItem(3691, 0, 1), "B", blockitem.buildItem(3413, 0, 1), "C", blockitem.buildItem(152, 0, 1));

//注册太阳能发电机及其合成表
new ItemInfo(3357, "solar_generator", "Solar Generator", "太阳能发电机", "./plugins/TechDawn/textures/太阳能发电机.png", 64, "construction", false, false).register();
/// |  光电板  |  光电板  |  光电板  |
/// |   铁板   |  红石块  |   铁板   |
/// |   铁板   |   铁板   |   铁板   |
blockitem.addShapedCraft("GGG|ACA|AAA", blockitem.buildItem(3357, 0, 1), "A", blockitem.buildItem(3691, 0, 1), "G", blockitem.buildItem(3697, 0, 1), "C", blockitem.buildItem(152, 0, 1));

