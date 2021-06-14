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
        blockitem.addToCreativeBar(blockitem.buildItem(this.id, 0, 1));
        return this;
    }
}

/**
 * @description 注册物品
 * @summary 3401-3500 工具
 * @summary 3501-3520 粉碎矿石
 * @summary 3521-3580 矿物粉
 * @summary 3581-3640 小撮矿物粉
 * @summary 3641-3680 齿轮
 * @summary 3681-3720 金属板
 * @summary 3721-3770 金属锭
 * @summary 3771-3830 金属粒
 */
//new ItemInfo(35, "tiny__dust", "Tiny  Dust", "小撮粉", "./plugins/TechDawn/textures/小撮粉.png", 64, "items", false, false).register();
//粉碎矿石
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
//金属锭
new ItemInfo(3721, "stainless_steel_ingot", "Stainless Steel Ingot", "不锈钢锭", "./plugins/TechDawn/textures/不锈钢锭.png", 64, "items", false, false).register();
new ItemInfo(3722, "chromium_ingot", "Chromium Ingot", "铬锭", "./plugins/TechDawn/textures/铬锭.png", 64, "items", false, false).register();
new ItemInfo(3723, "manganese_ingot", "Manganese Ingot", "锰锭", "./plugins/TechDawn/textures/锰锭.png", 64, "items", false, false).register();
new ItemInfo(3724, "lead_ingot", "Lead Ingot", "铅锭", "./plugins/TechDawn/textures/铅锭.png", 64, "items", false, false).register();
new ItemInfo(3725, "bronze_ingot", "Bronze Ingot", "青铜锭", "./plugins/TechDawn/textures/青铜锭.png", 64, "items", false, false).register();
new ItemInfo(3726, "copper_ingot", "Copper Ingot", "铜锭", "./plugins/TechDawn/textures/铜锭.png", 64, "items", false, false).register();
new ItemInfo(3727, "tin_ingot", "Tin Ingot", "锡锭", "./plugins/TechDawn/textures/锡锭.png", 64, "items", false, false).register();
new ItemInfo(3728, "silver_ingot", "Silver Ingot", "银锭", "./plugins/TechDawn/textures/银锭.png", 64, "items", false, false).register();
//金属粉
new ItemInfo(3521, "stainless_steel_dust", "Stainless Steel Dust", "不锈钢粉", "./plugins/TechDawn/textures/不锈钢粉.png", 64, "items", false, false).register();
new ItemInfo(3522, "chromium_dust", "Chromi Dust", "铬粉", "./plugins/TechDawn/textures/铬粉.png", 64, "items", false, false).register();
new ItemInfo(3523, "gold_dust", "Gold Dust", "金粉", "./plugins/TechDawn/textures/金粉.png", 64, "items", false, false).register();
new ItemInfo(3524, "sulfur_dust", "Sulfur Dust", "硫粉", "./plugins/TechDawn/textures/硫粉.png", 64, "items", false, false).register();
new ItemInfo(3525, "coal_dust", "Coal Dust", "煤粉", "./plugins/TechDawn/textures/煤粉.png", 64, "items", false, false).register();
new ItemInfo(3526, "manganese_dust", "Manganese Dust", "锰粉", "./plugins/TechDawn/textures/锰粉.png", 64, "items", false, false).register();
new ItemInfo(3527, "nickel_dust", "Nicke Dust", "镍粉", "./plugins/TechDawn/textures/镍粉.png", 64, "items", false, false).register();
new ItemInfo(3528, "lead_dust", "Lead Dust", "铅粉", "./plugins/TechDawn/textures/铅粉.png", 64, "items", false, false).register();
new ItemInfo(3529, "lapis_dust", "Lapis Dust", "青金石粉", "./plugins/TechDawn/textures/青金石粉.png", 64, "items", false, false).register();
new ItemInfo(3530, "bronze_dust", "Bronze Dust", "青铜粉", "./plugins/TechDawn/textures/青铜粉.png", 64, "items", false, false).register();
new ItemInfo(3531, "iron_dust", "Iron Dust", "铁粉", "./plugins/TechDawn/textures/铁粉.png", 64, "items", false, false).register();
new ItemInfo(3532, "copper_dust", "Copper Dust", "铜粉", "./plugins/TechDawn/textures/铜粉.png", 64, "items", false, false).register();
new ItemInfo(3533, "tin_dust", "Tin Dust", "锡粉", "./plugins/TechDawn/textures/锡粉.png", 64, "items", false, false).register();
new ItemInfo(3534, "silver_dust", "Silver Dust", "银粉", "./plugins/TechDawn/textures/银粉.png", 64, "items", false, false).register();
new ItemInfo(3535, "diamond_dust", "Diamond Dust", "钻石粉", "./plugins/TechDawn/textures/钻石粉.png", 64, "items", false, false).register();
//小撮金属粉
new ItemInfo(3581, "tiny_stainless_steel_dust", "Tiny Stainl Steel Dust", "小撮不锈钢粉", "./plugins/TechDawn/textures/小撮不锈钢粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_chromium_dust", "Tiny Chromium Dust", "小撮铬粉", "./plugins/TechDawn/textures/小撮铬粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_gold_dust", "Tiny Gold Dust", "小撮金粉", "./plugins/TechDawn/textures/小撮金粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_sulfur_dust", "Tiny Sulfur Dust", "小撮硫粉", "./plugins/TechDawn/textures/小撮硫粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_coal_dust", "Tiny Coal Dust", "小撮煤粉", "./plugins/TechDawn/textures/小撮煤粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_manganese_dust", "Tiny Manganese Dust", "小撮锰粉", "./plugins/TechDawn/textures/小撮锰粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_nickel_dust", "Tiny Nickel Dust", "小撮镍粉", "./plugins/TechDawn/textures/小撮镍粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_lead_dust", "Tiny Lead Dust", "小撮铅粉", "./plugins/TechDawn/textures/小撮铅粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_lapis_dust", "Tiny Lapis Dust", "小撮青金石粉", "./plugins/TechDawn/textures/小撮青金石粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_bronze_dust", "Tiny Bronze Dust", "小撮青铜粉", "./plugins/TechDawn/textures/小撮青铜粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_iron_dust", "Tiny Iron Dust", "小撮铁粉", "./plugins/TechDawn/textures/小撮铁粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_copper_dust", "Tiny Copper Dust", "小撮铜粉", "./plugins/TechDawn/textures/小撮铜粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_tin_dust", "Tiny Tin Dust", "小撮锡粉", "./plugins/TechDawn/textures/小撮锡粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_silver_dust", "Tiny Silver Dust", "小撮银粉", "./plugins/TechDawn/textures/小撮银粉.png", 64, "items", false, false).register();
new ItemInfo(35, "tiny_diamond_dust", "Tiny Diamond Dust", "小撮钻石粉", "./plugins/TechDawn/textures/小撮钻石粉.png", 64, "items", false, false).register();
