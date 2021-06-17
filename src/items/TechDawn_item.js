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
 * @summary 3401-3500 工具
 * @summary 3501-3520 粉碎矿石
 * @summary 3521-3580 矿物粉
 * @summary 3581-3640 小撮矿物粉
 * @summary 3641-3680 齿轮
 * @summary 3681-3720 金属板
 * @summary 3721-3770 金属锭
 * @summary 3771-3830 金属粒
 */
//new ItemInfo(36, "_gear", "  Gear", "齿轮", "./plugins/TechDawn/textures/齿轮.png", 64, "items", false, false).register();
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
new ItemInfo(3582, "tiny_chromium_dust", "Tiny Chromium Dust", "小撮铬粉", "./plugins/TechDawn/textures/小撮铬粉.png", 64, "items", false, false).register();
new ItemInfo(3583, "tiny_gold_dust", "Tiny Gold Dust", "小撮金粉", "./plugins/TechDawn/textures/小撮金粉.png", 64, "items", false, false).register();
new ItemInfo(3584, "tiny_sulfur_dust", "Tiny Sulfur Dust", "小撮硫粉", "./plugins/TechDawn/textures/小撮硫粉.png", 64, "items", false, false).register();
new ItemInfo(3585, "tiny_coal_dust", "Tiny Coal Dust", "小撮煤粉", "./plugins/TechDawn/textures/小撮煤粉.png", 64, "items", false, false).register();
new ItemInfo(3586, "tiny_manganese_dust", "Tiny Manganese Dust", "小撮锰粉", "./plugins/TechDawn/textures/小撮锰粉.png", 64, "items", false, false).register();
new ItemInfo(3587, "tiny_nickel_dust", "Tiny Nickel Dust", "小撮镍粉", "./plugins/TechDawn/textures/小撮镍粉.png", 64, "items", false, false).register();
new ItemInfo(3588, "tiny_lead_dust", "Tiny Lead Dust", "小撮铅粉", "./plugins/TechDawn/textures/小撮铅粉.png", 64, "items", false, false).register();
new ItemInfo(3589, "tiny_lapis_dust", "Tiny Lapis Dust", "小撮青金石粉", "./plugins/TechDawn/textures/小撮青金石粉.png", 64, "items", false, false).register();
new ItemInfo(3590, "tiny_bronze_dust", "Tiny Bronze Dust", "小撮青铜粉", "./plugins/TechDawn/textures/小撮青铜粉.png", 64, "items", false, false).register();
new ItemInfo(3591, "tiny_iron_dust", "Tiny Iron Dust", "小撮铁粉", "./plugins/TechDawn/textures/小撮铁粉.png", 64, "items", false, false).register();
new ItemInfo(3592, "tiny_copper_dust", "Tiny Copper Dust", "小撮铜粉", "./plugins/TechDawn/textures/小撮铜粉.png", 64, "items", false, false).register();
new ItemInfo(3593, "tiny_tin_dust", "Tiny Tin Dust", "小撮锡粉", "./plugins/TechDawn/textures/小撮锡粉.png", 64, "items", false, false).register();
new ItemInfo(3594, "tiny_silver_dust", "Tiny Silver Dust", "小撮银粉", "./plugins/TechDawn/textures/小撮银粉.png", 64, "items", false, false).register();
new ItemInfo(3595, "tiny_diamond_dust", "Tiny Diamond Dust", "小撮钻石粉", "./plugins/TechDawn/textures/小撮钻石粉.png", 64, "items", false, false).register();
//金属粒
new ItemInfo(3771, "stainless_steel_nugget", "Stainless Steel Nugget", "不锈钢粒", "./plugins/TechDawn/textures/不锈钢粒.png", 64, "items", false, false).register();
new ItemInfo(3772, "chromium_nugget", "Chromium Nugget", "铬粒", "./plugins/TechDawn/textures/铬粒.png", 64, "items", false, false).register();
new ItemInfo(3773, "sulfur_nugget", "Sulfur Nugget", "硫粒", "./plugins/TechDawn/textures/硫粒.png", 64, "items", false, false).register();
new ItemInfo(3774, "coal_nugget", "Coal Nugget", "煤粒", "./plugins/TechDawn/textures/煤粒.png", 64, "items", false, false).register();
new ItemInfo(3775, "manganese_nugget", "Manganese Nugget", "锰粒", "./plugins/TechDawn/textures/锰粒.png", 64, "items", false, false).register();
new ItemInfo(3776, "nickel_nugget", "Nickel Nugget", "镍粒", "./plugins/TechDawn/textures/镍粒.png", 64, "items", false, false).register();
new ItemInfo(3777, "lead_nugget", "Lead Nugget", "铅粒", "./plugins/TechDawn/textures/铅粒.png", 64, "items", false, false).register();
new ItemInfo(3778, "lapis_nugget", "Lapis Nugget", "青金石粒", "./plugins/TechDawn/textures/青金石粒.png", 64, "items", false, false).register();
new ItemInfo(3779, "bronze_nugget", "Bronze Nugget", "青铜粒", "./plugins/TechDawn/textures/青铜粒.png", 64, "items", false, false).register();
new ItemInfo(3780, "copper_nugget", "Copper Nugget", "铜粒", "./plugins/TechDawn/textures/铜粒.png", 64, "items", false, false).register();
new ItemInfo(3781, "tin_nugget", "Tin Nugget", "锡粒", "./plugins/TechDawn/textures/锡粒.png", 64, "items", false, false).register();
new ItemInfo(3782, "silver_nugget", "Silver Nugget", "银粒", "./plugins/TechDawn/textures/银粒.png", 64, "items", false, false).register();
new ItemInfo(3783, "diamond_nugget", "Diamond Nugget", "钻石粒", "./plugins/TechDawn/textures/钻石粒.png", 64, "items", false, false).register();
//金属板
new ItemInfo(3681, "stainless_steel_plate", "Stainless Steel Plate", "不锈钢板", "./plugins/TechDawn/textures/不锈钢板.png", 64, "items", false, false).register();
new ItemInfo(3682, "chromium_plate", "Chromium Plate", "铬板", "./plugins/TechDawn/textures/铬板.png", 64, "items", false, false).register();
new ItemInfo(3683, "gold_plate", "Gold Plate", "金板", "./plugins/TechDawn/textures/金板.png", 64, "items", false, false).register();
new ItemInfo(3684, "sulfur_plate", "Sulfur Plate", "硫板", "./plugins/TechDawn/textures/硫板.png", 64, "items", false, false).register();
new ItemInfo(3685, "coal_plate", "Coal Plate", "煤板", "./plugins/TechDawn/textures/煤板.png", 64, "items", false, false).register();
new ItemInfo(3686, "manganese_plate", "Manganese Plate", "锰板", "./plugins/TechDawn/textures/锰板.png", 64, "items", false, false).register();
new ItemInfo(3687, "nickel_plate", "Nickel Plate", "镍板", "./plugins/TechDawn/textures/镍板.png", 64, "items", false, false).register();
new ItemInfo(3688, "lead_plate", "Lead Plate", "铅板", "./plugins/TechDawn/textures/铅板.png", 64, "items", false, false).register();
new ItemInfo(3689, "lapis_plate", "Lapis Plate", "青金石板", "./plugins/TechDawn/textures/青金石板.png", 64, "items", false, false).register();
new ItemInfo(3690, "bronze_plate", "Bronze Plate", "青铜板", "./plugins/TechDawn/textures/青铜板.png", 64, "items", false, false).register();
new ItemInfo(3691, "iron_plate", "Iron Plate", "铁板", "./plugins/TechDawn/textures/铁板.png", 64, "items", false, false).register();
new ItemInfo(3692, "copper_plate", "Copper Plate", "铜板", "./plugins/TechDawn/textures/铜板.png", 64, "items", false, false).register();
new ItemInfo(3693, "tin_plate", "Tin Plate", "锡板", "./plugins/TechDawn/textures/锡板.png", 64, "items", false, false).register();
new ItemInfo(3694, "silver_plate", "Silver Plate", "银板", "./plugins/TechDawn/textures/银板.png", 64, "items", false, false).register();
new ItemInfo(3695, "diamond_plate", "Diamond Plate", "钻石板", "./plugins/TechDawn/textures/钻石板.png", 64, "items", false, false).register();
//齿轮
new ItemInfo(3641, "stainless_steel_gear", "Stainless Steel Gear", "不锈钢齿轮", "./plugins/TechDawn/textures/不锈钢齿轮.png", 64, "items", false, false).register();
new ItemInfo(3642, "chromium_gear", "Chromium Gear", "铬齿轮", "./plugins/TechDawn/textures/铬齿轮.png", 64, "items", false, false).register();
new ItemInfo(3643, "gold_gear", "Gold Gear", "金齿轮", "./plugins/TechDawn/textures/金齿轮.png", 64, "items", false, false).register();
new ItemInfo(3644, "coal_gear", "Coal Gear", "煤齿轮", "./plugins/TechDawn/textures/煤齿轮.png", 64, "items", false, false).register();
new ItemInfo(3645, "manganese_gear", "Manganese Gear", "锰齿轮", "./plugins/TechDawn/textures/锰齿轮.png", 64, "items", false, false).register();
new ItemInfo(3646, "wood_gear", "Wood Gear", "木齿轮", "./plugins/TechDawn/textures/木齿轮.png", 64, "items", false, false).register();
new ItemInfo(3647, "nickel_gear", "Nickel Gear", "镍齿轮", "./plugins/TechDawn/textures/镍齿轮.png", 64, "items", false, false).register();
new ItemInfo(3649, "lapis_gear", "Lapis Gear", "青金石齿轮", "./plugins/TechDawn/textures/青金石齿轮.png", 64, "items", false, false).register();
new ItemInfo(3650, "bronze_gear", "Bronze Gear", "青铜齿轮", "./plugins/TechDawn/textures/青铜齿轮.png", 64, "items", false, false).register();
new ItemInfo(3651, "stone_gear", "Stone Gear", "石齿轮", "./plugins/TechDawn/textures/石齿轮.png", 64, "items", false, false).register();
new ItemInfo(3652, "iron_gear", "Iron Gear", "铁齿轮", "./plugins/TechDawn/textures/铁齿轮.png", 64, "items", false, false).register();
new ItemInfo(3653, "copper_gear", "Copper Gear", "铜齿轮", "./plugins/TechDawn/textures/铜齿轮.png", 64, "items", false, false).register();
new ItemInfo(3654, "tin_gear", "Tin Gear", "锡齿轮", "./plugins/TechDawn/textures/锡齿轮.png", 64, "items", false, false).register();
new ItemInfo(3655, "silver_gear", "Silver Gear", "银齿轮", "./plugins/TechDawn/textures/银齿轮.png", 64, "items", false, false).register();
new ItemInfo(3656, "diamond_gear", "Diamond Gear", "钻石齿轮", "./plugins/TechDawn/textures/钻石齿轮.png", 64, "items", false, false).register();
//木桶
new ItemInfo(3402, "empty_wood_bucket", "Empty Wood Bucket", "空木桶", "./plugins/TechDawn/textures/空木桶.png", 64, "items", true, true).register();
new ItemInfo(3403, "watered_wood_buckeet", "Watered Wood Bucket", "装水木桶", "./plugins/TechDawn/textures/装水木桶.png", 16, "items", true, true).register();

/**
 * @description 注册冶炼合成表
 * @param {int} input 原料
 * @param {int} output 产物
 * @param {int?} data 数据值
 */
function frunace(input, output, data){
    if(data){
        blockitem.addFurnaceCraft(blockitem.buildItem(input, 0, 1), blockitem.buildItem(output, data, 1));
    }else{
        blockitem.addFurnaceCraft(blockitem.buildItem(input, 0, 1), blockitem.buildItem(output, 0, 1));
    }
    let BlastFurnaceRecipe = require("cn.nukkit.inventory.BlastFurnaceRecipe");
    if(manager.isPowerNukkit()){
        if(data){
            server.addRecipe(new BlastFurnaceRecipe(blockitem.buildItem(output, data, 1), blockitem.buildItem(input, 0, 1)));
        }else{
            server.addRecipe(new BlastFurnaceRecipe(blockitem.buildItem(output, 0, 1), blockitem.buildItem(input, 0, 1)));
        }
    }
}

/**
 * @description 注册1变9无序配方
 * @param {int} input 原料id
 * @param {int} output 产物id
 * @param {int?} dataInput 原料特殊值
 * @param {int?} dataOutput 产物特殊值
 */
function craft19(input, output, dataInput, dataOutput){
    if(!dataInput) dataInput = 0;
    if(!dataOutput) dataOutput = 0;
    blockitem.addShapelessCraft(Java.to([blockitem.buildItem(input, dataInput, 1)], "cn.nukkit.item.Item[]"), blockitem.buildItem(output, dataOutput, 9));
}

/**
 * @description 注册9变1无序配方
 * @param {int} input 原料id
 * @param {int} output 产物id
 * @param {int?} dataInput 原料特殊值
 * @param {int?} dataOutput 产物特殊值
 */
 function craft91(input, output, dataInput, dataOutput){
    if(!dataInput) dataInput = 0;
    if(!dataOutput) dataOutput = 0;
    blockitem.addShapelessCraft(Java.to([
        blockitem.buildItem(input, dataInput, 1),
        blockitem.buildItem(input, dataInput, 1),
        blockitem.buildItem(input, dataInput, 1),
        blockitem.buildItem(input, dataInput, 1),
        blockitem.buildItem(input, dataInput, 1),
        blockitem.buildItem(input, dataInput, 1),
        blockitem.buildItem(input, dataInput, 1),
        blockitem.buildItem(input, dataInput, 1),
        blockitem.buildItem(input, dataInput, 1)
    ], "cn.nukkit.item.Item[]"), blockitem.buildItem(output, dataOutput, 1));
}

//粉碎的矿石冶炼为锭
frunace(3501, 265);
frunace(3502, 3724);
frunace(3503, 266);
frunace(3504, 3726);
//frunace(3505, null); 铝锭不能熔炉冶炼
frunace(3506, 388);
frunace(3507, 263);
frunace(3508, 265);
frunace(3509, 3724);
frunace(3510, 3727);
//frunace(3511, null) 锌锭不能熔炉冶炼
frunace(3512, 3728);
frunace(3513, 264);
frunace(3514, 331);
frunace(3515, 351, 4);

//金属粉冶炼为锭
frunace(3521, 3721);
frunace(3522, 3722);
frunace(3523, 266);
frunace(3526, 3723);
frunace(3528, 3724);
frunace(3530, 3725);
frunace(3531, 265);
frunace(3532, 3726);
frunace(3533, 3727);
frunace(3534, 3728);

//小撮金属粉冶炼为粒
frunace(3581, 3771);
frunace(3582, 3772);
frunace(3583, 371);
frunace(3585, 3774);
frunace(3586, 3775);
frunace(3587, 3776);
frunace(3588, 3777);
frunace(3589, 3778);
frunace(3590, 3779);
frunace(3591, 452);
frunace(3592, 3780);
frunace(3593, 3781);
frunace(3594, 3782);
frunace(3595, 3783);

//金属锭变成金属粒
craft19(3721, 3771);
craft19(3722, 3772);
craft19(3723, 3775);
craft19(3724, 3777);
craft19(3725, 3779);
craft19(3726, 3780);
craft19(3727, 3781);
craft19(3728, 3782);
craft19(264, 3783);
craft19(263, 3774);
craft19(351, 3778, 4);

//金属粉合成小撮金属粉
craft19(3521, 3581);
craft19(3522, 3582);
craft19(3523, 3583);
craft19(3524, 3584);
craft19(3525, 3585);
craft19(3526, 3586);
craft19(3527, 3587);
craft19(3528, 3588);
craft19(3529, 3589);
craft19(3530, 3590);
craft19(3531, 3591);
craft19(3532, 3592);
craft19(3533, 3593);
craft19(3534, 3594);
craft19(3535, 3595);

//金属粒变成金属锭
craft91(3771, 3721);
craft91(3772, 3722);
craft91(3775, 3723);
craft91(3777, 3724);
craft91(3779, 3725);
craft91(3780, 3726);
craft91(3781, 3727);
craft91(3782, 3728);
craft91(3783, 264);
craft91(3774, 263);
craft91(3778, 351, 0, 4);

//小撮金属粉合成金属粉
craft91(3581, 3521);
craft91(3582, 3522);
craft91(3583, 3523);
craft91(3584, 3524);
craft91(3585, 3525);
craft91(3586, 3526);
craft91(3587, 3527);
craft91(3588, 3528);
craft91(3589, 3529);
craft91(3590, 3530);
craft91(3591, 3531);
craft91(3592, 3532);
craft91(3593, 3533);
craft91(3594, 3534);
craft91(3595, 3535);

/**
 * @description BN加载完成事件
 * @description 用于定义机器相关合成
 */
function BNInitializedEvent(/**@type {com.blocklynukkit.loader.script.event.BNInitializedEvent}*/event){
    /**
     * @description 添加科技黎明铁砧合成
     * @type {(input:int, output:int, damage:int) => void}
     */
    const anvil = require("TechDawnMachineAnvil").addAnvilCraft;
    //金属锭砸板
    anvil(3271, 3681, 15);
    anvil(3272, 3682, 15);
    anvil(266, 3683, 15);
    anvil(3723, 3686, 15);
    anvil(263, 3685, 15);
    anvil(3724, 3688, 15);
    anvil(3725, 3690, 15);
    anvil(3726, 3692, 15);
    anvil(265, 3691, 15);
    anvil(3727, 3693, 15);
    anvil(3728, 3694, 15);
    anvil(264, 3695, 15);
}
