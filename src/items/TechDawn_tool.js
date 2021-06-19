//pragma js
//pragma module TechDawnTool

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件工具模块
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
        blockitem.addToCreativeBar(blockitem.buildItem(this.id, 0, 1));
        return this;
    }
}

/**
 * @description 注册工具
 */
new ToolInfo(3401, "panning_bowl", "Panning Bowl", "淘金碗", "./plugins/TechDawn/textures/淘金碗.png", "shovel", 3, 64, 2, true).register();
//3402 空木桶
//3403 装水木桶
new ToolInfo(3404, "stainless_steel_hammer", "Stainless Steel Hammer", "不锈钢锤子", "./plugins/TechDawn/textures/不锈钢锤子.png", "pickaxe", 5, 3800, 8, false).register();
new ToolInfo(3405, "diamond_hammer", "Diamond Hammer", "钻石锤子", "./plugins/TechDawn/textures/钻石锤子.png", "pickaxe", 5, 2780, 7, false).register();
new ToolInfo(3406, "iron_hammer", "Iron Hammer", "铁锤子", "./plugins/TechDawn/textures/铁锤子.png", "pickaxe", 4, 500, 6, false).register();
new ToolInfo(3407, "stone_hammer", "Stone Hammer", "石锤子", "./plugins/TechDawn/textures/石锤子.png", "pickaxe", 3, 120, 5, false).register();
new ToolInfo(3408, "wood_hammer", "Wood Hammer", "木锤子", "./plugins/TechDawn/textures/木锤子.png", "pickaxe", 1, 40, 4, false).register();
/**
 * @description 添加工具合成表
 */
//淘金碗
blockitem.addShapedCraft("A A|AAA", blockitem.buildItem(3401, 0, 1), "A", blockitem.buildItem(1, 0, 1));
//木桶
blockitem.addShapedCraft("A A|A A| A ", blockitem.buildItem(3402, 0, 1), "A", blockitem.buildItem(5, 0, 1));
blockitem.addShapedCraft("A A|A A| A ", blockitem.buildItem(3402, 0, 1), "A", blockitem.buildItem(5, 1, 1));
blockitem.addShapedCraft("A A|A A| A ", blockitem.buildItem(3402, 0, 1), "A", blockitem.buildItem(5, 2, 1));
blockitem.addShapedCraft("A A|A A| A ", blockitem.buildItem(3402, 0, 1), "A", blockitem.buildItem(5, 3, 1));
blockitem.addShapedCraft("A A|A A| A ", blockitem.buildItem(3402, 0, 1), "A", blockitem.buildItem(5, 4, 1));
blockitem.addShapedCraft("A A|A A| A ", blockitem.buildItem(3402, 0, 1), "A", blockitem.buildItem(5, 5, 1));
//木锤子
blockitem.addShapedCraft("AAA|ABA| B ", blockitem.buildItem(3408, 0, 1), "A", blockitem.buildItem(5, 0, 1), "B", blockitem.buildItem(280, 0, 1));
blockitem.addShapedCraft("AAA|ABA| B ", blockitem.buildItem(3408, 0, 1), "A", blockitem.buildItem(5, 1, 1), "B", blockitem.buildItem(280, 0, 1));
blockitem.addShapedCraft("AAA|ABA| B ", blockitem.buildItem(3408, 0, 1), "A", blockitem.buildItem(5, 2, 1), "B", blockitem.buildItem(280, 0, 1));
blockitem.addShapedCraft("AAA|ABA| B ", blockitem.buildItem(3408, 0, 1), "A", blockitem.buildItem(5, 3, 1), "B", blockitem.buildItem(280, 0, 1));
blockitem.addShapedCraft("AAA|ABA| B ", blockitem.buildItem(3408, 0, 1), "A", blockitem.buildItem(5, 4, 1), "B", blockitem.buildItem(280, 0, 1));
blockitem.addShapedCraft("AAA|ABA| B ", blockitem.buildItem(3408, 0, 1), "A", blockitem.buildItem(5, 5, 1), "B", blockitem.buildItem(280, 0, 1));
//石锤子
blockitem.addShapedCraft("AAA|ABA| B ", blockitem.buildItem(3407, 0, 1), "A", blockitem.buildItem(4, 0, 1), "B", blockitem.buildItem(280, 0, 1));
//铁锤子
blockitem.addShapedCraft("AAA|ABA| B ", blockitem.buildItem(3406, 0, 1), "A", blockitem.buildItem(265, 0, 1), "B", blockitem.buildItem(280, 0, 1));
//钻石锤子
blockitem.addShapedCraft("AAA|ABA| B ", blockitem.buildItem(3405, 0, 1), "A", blockitem.buildItem(264, 0, 1), "B", blockitem.buildItem(280, 0, 1));
//不锈钢锤子
blockitem.addShapedCraft("AAA|ABA| B ", blockitem.buildItem(3408, 0, 1), "A", blockitem.buildItem(3721, 0, 1), "B", blockitem.buildItem(280, 0, 1));

/** 
 * @description 获取淘金结果模块 
 * @description 因为我们在编译脚本中确定的顺序保证了TechDawnLoot_Panning模块一定优先加载，所以可以直接导入
 */
const lootPanning = require("TechDawnLootPanning");

/**
 * @description 破坏方块事件
 */
function BlockBreakEvent(/**@type {cn.nukkit.event.block.BlockBreakEvent}*/event){
    const iid = event.getItem().getId();
    const bid = event.getBlock().getId();
    //处理淘金碗
    if(iid == 3401 && (bid == 12 || iid == 13)){
        let item = lootPanning.getPanningResult(event.getBlock().getId() == 12);
        event.setDrops(Java.to([item], "cn.nukkit.item.Item[]"));
    }else if(iid >= 3404 && iid <= 3408){
        if(bid == 4 || bid == 1){
            event.setDrops(Java.to([blockitem.buildItem(13, 0, 1)], "cn.nukkit.item.Item[]"));
        }else if(bid == 13){
            event.setDrops(Java.to([blockitem.buildItem(12, 0, 1)], "cn.nukkit.item.Item[]"));
        }
    }
}

/**
 * @description 玩家右键事件
 */
function RightClickBlockEvent(/**@type {cn.nukkit.event.player.PlayerInteractEvent}*/event){
    const iid = event.getItem().getId();
    //玩家使用空木桶装水
    if(iid == 3402){
        let backWardBlock = event.getBlock().add(event.getFace().getUnitVector()).getLevelBlock();
        if(backWardBlock.getId() == 8 || backWardBlock.getId() == 9){
            blockitem.setBlock(backWardBlock, blockitem.buildBlock(0, 0), false);
            blockitem.blockUpdate(backWardBlock);
            blockitem.makeSound(backWardBlock, "BUCKET_FILL_WATER");
            blockitem.removeItemToPlayer(event.getPlayer(), blockitem.buildItem(3402, 0 ,1));
            blockitem.addItemToPlayer(event.getPlayer(), blockitem.buildItem(3403, 0, 1));
        }
    }
    //玩家使用装水木桶放水
    else if(iid == 3403){
        //玩家给炼药锅装水
        if(event.getBlock().getId() == 118){
            if(event.getBlock().getDamage() != 6){
                event.getBlock().setDamage(6);
                blockitem.setBlock(event.getBlock(), event.getBlock(), false);
                blockitem.makeSound(event.getBlock(), "CAULDRON_FILLWATER");
                blockitem.removeItemToPlayer(event.getPlayer(), blockitem.buildItem(3403, 0 ,1));
                blockitem.addItemToPlayer(event.getPlayer(), blockitem.buildItem(3402, 0, 1));
            }
        }else{
            //把水倒在地上
            let backWardBlock = event.getBlock().add(event.getFace().getUnitVector()).getLevelBlock();
            if(backWardBlock.getId() == 0 || backWardBlock.getId() == 8){
                blockitem.setBlock(backWardBlock, blockitem.buildBlock(8, 0), false);
                blockitem.blockUpdate(backWardBlock);
                blockitem.makeSound(backWardBlock, "BUCKET_EMPTY_WATER");
                blockitem.removeItemToPlayer(event.getPlayer(), blockitem.buildItem(3403, 0 ,1));
                blockitem.addItemToPlayer(event.getPlayer(), blockitem.buildItem(3402, 0, 1));
            }
        }
    }
}
