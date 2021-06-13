//pragma js
//pragma module TechDawnItem

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件物品模块
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
export function getItemInfo(name){
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
 * @param {string} isDisplayAsTool 是否展示为工具
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
        return this;
    }
}

//注册物品
new ItemInfo(3501, "crushed_magnetite_ore", "Crushed Magnetite Ore", "粉碎的磁铁矿", "./plugins/TechDawn/textures/粉碎的磁铁矿.png", 64, "nature", false, false).register();
new ItemInfo(3502, "crushed_gelenite_ore", "Crushed Gelenite Ore", "粉碎的方铅矿", "./plugins/TechDawn/textures/粉碎的方铅矿.png", 64, "nature", false, false).register();
new ItemInfo(3503, "crushed_gold_ore", "Crushed Gold Ore", "粉碎的金矿", "./plugins/TechDawn/textures/粉碎的金矿.png", 64, "nature", false, false).register();
new ItemInfo(3504, "crushed_malachite_ore", "Crushed Malachite Ore", "粉碎的孔雀石矿", "./plugins/TechDawn/textures/粉碎的孔雀石矿.png", 64, "nature", false, false).register();
new ItemInfo(3505, "crushed_aluminium_ore", "Crushed Aluminium Ore", "粉碎的铝矿", "./plugins/TechDawn/textures/粉碎的铝矿.png", 64, "nature", false, false).register();
new ItemInfo(3506, "crushed_emerald_ore", "Crushed Emerald Ore", "粉碎的绿宝石矿", "./plugins/TechDawn/textures/粉碎的绿宝石矿.png", 64, "nature", false, false).register();
new ItemInfo(3507, "crushed_coal_ore", "Crushed Coal Ore", "粉碎的煤矿", "./plugins/TechDawn/textures/粉碎的煤矿.png", 64, "nature", false, false).register();
new ItemInfo(3508, "crushed_iron_ore", "Crushed Iron Ore", "粉碎的铁矿", "./plugins/TechDawn/textures/粉碎的铁矿.png", 64, "nature", false, false).register();
new ItemInfo(3509, "crushed_copper_ore", "Crushed Copper Ore", "粉碎的铜矿", "./plugins/TechDawn/textures/粉碎的铜矿.png", 64, "nature", false, false).register();
new ItemInfo(3510, "crushed_tin_ore", "Crushed Tin Ore", "粉碎的锡矿", "./plugins/TechDawn/textures/粉碎的锡矿.png", 64, "nature", false, false).register();
new ItemInfo(3511, "crushed_zinc_ore", "Crushed Zinc Ore", "粉碎的锌矿", "./plugins/TechDawn/textures/粉碎的锌矿.png", 64, "nature", false, false).register();
new ItemInfo(3512, "crushed_silver_ore", "Crushed Silver Ore", "粉碎的银矿", "./plugins/TechDawn/textures/粉碎的银矿.png", 64, "nature", false, false).register();
new ItemInfo(3513, "crushed_diamond_ore", "Crushed Diamond Ore", "粉碎的钻石矿", "./plugins/TechDawn/textures/粉碎的钻石矿.png", 64, "nature", false, false).register();
new ItemInfo(3514, "crushed_redstone_ore", "Crushed Redstone Ore", "粉碎的红石矿", "./plugins/TechDawn/textures/粉碎的红石矿.png", 64, "nature", false, false).register();
new ItemInfo(3515, "crushed_lapis_ore", "Crushed Lapis Ore", "粉碎的青金石矿", "./plugins/TechDawn/textures/粉碎的青金石矿.png", 64, "nature", false, false).register();