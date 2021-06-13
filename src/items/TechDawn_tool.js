//pragma js
//pragma module TechDawnTool

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件主模块
 */

/**
 * @description 所有注册过的工具
 * @type {{[key: string]: ToolInfo}}
 */
const tools = {};

/**
 * @description 根据物品名获取工具信息
 * @param {string} name
 * @returns {ToolInfo}
 */
export function getToolInfo(name){
    return tools[name];
}

/**
 * @class
 * @classdesc 描述一个工具的信息
 * @constructor
 * @param {int} id 工具的id
 * @param {string} name 工具的名称
 * @param {string} eng 工具英文翻译名
 * @param {string} chn 工具中文翻译名
 * @param {string} texturePath 工具贴图路径
 * @param {string} type 工具的种类：`sword` `shovel` `pickaxe` `axe` `hoe`
 * @param {int} tier 工具挖掘等级 0-空手,1-木,2-金,3-石,4-铁,5-钻石,6-下界合金
 * @param {int} durabillity 工具耐久值
 * @param {int} attackDamage 攻击伤害
 * @param {boolean} canOnOffhand 副手装备
 */
function ToolInfo(id, name, eng, chn, texturePath, type, tier, durabillity, attackDamage, canOnOffhand){
    /** @description 工具的id */
    this.id = id;
    /** @description 工具的名称 */
    this.name = name;
    /** @description 工具的英文翻译名 */
    this.eng = eng;
    /** @description 工具的中文翻译名 */
    this.chn = chn;
    /** @description 工具的贴图路径 */
    this.texturePath = texturePath;
    /** @description 工具的种类：`sword` `shovel` `pickaxe` `axe` `hoe` */
    this.type = type;
    /** @description 工具挖掘等级 0-空手,1-木,2-金,3-石,4-铁,5-钻石,6-下界合金 */
    this.tier = tier;
    /** @description 工具耐久值 */
    this.durabillity = durabillity;
    /** @description 攻击伤害 */
    this.attackDamage = attackDamage;
    /** @description 副手装备 */
    this.canOnOffhand = canOnOffhand;
    //保存该物品
    tools[name] = this;
    /**
     * @description 注册该类描述的工具并返回类自身
     */
    this.register = function(){
        blockitem.registerToolItem(this.id, this.name, this.type, this.tier, this.durabillity, this.attackDamage, this.canOnOffhand);
        blockitem.addItemEnglishTranslation(this.id, this.eng);
        blockitem.addItemChineseTranslation(this.id, this.chn);
        blockitem.addItemTexture(this.id, this.texturePath);
        return this;
    }
}

new ToolInfo(3401, "panning_bowl", "Panning Bowl", "淘金碗", "./plugins/TechDawn/textures/淘金碗.png", "sword", 0, 64, 2, true);
