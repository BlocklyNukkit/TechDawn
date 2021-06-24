//pragma js
//pragma module TechDawnLootPanning

/**
 * @author Superice666(超神的冰凉) 
 * @copyright TechDawn_Project
 * @fileoverview 科技黎明插件主模块
 */

/**
 * @description 获取淘金结果
 * @param {boolean} sandOrGravel
 * @returns {cn.nukkit.item.Item}
 */
export function getPanningResult(sandOrGravel){
    return sandOrGravel ? getSandPanningResult() : getGravelPanningResult();
}

//概率定义
const RandomItem = cn.nukkit.item.randomitem.RandomItem;
const Selector = cn.nukkit.item.randomitem.Selector;
const ConstantItemSelector = cn.nukkit.item.randomitem.ConstantItemSelector;
const root_sandPanning = RandomItem.putSelector(new Selector(RandomItem.ROOT));
const root_gravelPanning = RandomItem.putSelector(new Selector(RandomItem.ROOT));
//添加沙子淘金概率
RandomItem.putSelector(new ConstantItemSelector(3506, root_sandPanning), 0.004);//绿宝石
RandomItem.putSelector(new ConstantItemSelector(3513, root_sandPanning), 0.0015);//钻石
RandomItem.putSelector(new ConstantItemSelector(3514, root_sandPanning), 0.09);//红石
RandomItem.putSelector(new ConstantItemSelector(3515, root_sandPanning), 0.08);//青金石
RandomItem.putSelector(new ConstantItemSelector(3507, root_sandPanning), 0.3);//煤炭
RandomItem.putSelector(new ConstantItemSelector(3508, root_sandPanning), 0.04);//铁
RandomItem.putSelector(new ConstantItemSelector(3501, root_sandPanning), 0.055);//磁铁
RandomItem.putSelector(new ConstantItemSelector(3503, root_sandPanning), 0.02);//金
//添加沙砾淘金概率
RandomItem.putSelector(new ConstantItemSelector(3501, root_gravelPanning), 0.07);//磁铁
RandomItem.putSelector(new ConstantItemSelector(3508, root_gravelPanning), 0.06);//铁
RandomItem.putSelector(new ConstantItemSelector(3502, root_gravelPanning), 0.03);//方铅
RandomItem.putSelector(new ConstantItemSelector(3503, root_gravelPanning), 0.015);//金
RandomItem.putSelector(new ConstantItemSelector(3504, root_gravelPanning), 0.07);//孔雀石
RandomItem.putSelector(new ConstantItemSelector(3505, root_gravelPanning), 0.015);//铝
RandomItem.putSelector(new ConstantItemSelector(3507, root_gravelPanning), 0.07);//煤
RandomItem.putSelector(new ConstantItemSelector(3509, root_gravelPanning), 0.055);//铜
RandomItem.putSelector(new ConstantItemSelector(3510, root_gravelPanning), 0.06);//锡
RandomItem.putSelector(new ConstantItemSelector(3511, root_gravelPanning), 0.05);//铅
RandomItem.putSelector(new ConstantItemSelector(3512, root_gravelPanning), 0.005);//银
RandomItem.putSelector(new ConstantItemSelector(3513, root_gravelPanning), 0.002);//钻石
RandomItem.putSelector(new ConstantItemSelector(3515, root_gravelPanning), 0.012);//青金石
RandomItem.putSelector(new ConstantItemSelector(3516, root_gravelPanning), 0.016);//镍
RandomItem.putSelector(new ConstantItemSelector(3517, root_gravelPanning), 0.01);//铬
RandomItem.putSelector(new ConstantItemSelector(3518, root_gravelPanning), 0.015);//锰
RandomItem.putSelector(new ConstantItemSelector(318, root_gravelPanning), 0.40);//燧石
//通过反射api调用选择方法
const Clazz = java.lang.Class;
let Rclazz = Clazz.forName("cn.nukkit.item.randomitem.RandomItem");
let Sclazz = Clazz.forName("cn.nukkit.item.randomitem.Selector");
var method = Rclazz.getDeclaredMethod("selectFrom", Sclazz);
method.setAccessible(true);
/**
 * @description 获取选择结果
 * @param from 从哪里选择
 */
function getSelectResult(from){
    return method.invoke(Rclazz, from);
}

/**
 * @description 获取沙子淘金结果
 * @returns {cn.nukkit.item.Item}
 */
function getSandPanningResult(){
    if(Math.random() < 0.5) return blockitem.buildItem(0, 0, 0);
    let result = getSelectResult(root_sandPanning);
    if(result == null) return blockitem.buildItem(0, 0, 0);
    return (result instanceof require("cn.nukkit.item.Item")) ? result : blockitem.buildItem(0, 0, 0);
}

/**
 * @description 获取沙砾淘金结果
 * @returns {cn.nukkit.item.Item}
 */
 function getGravelPanningResult(){
    if(Math.random() < 0.5) return blockitem.buildItem(0, 0, 0);
    let result = getSelectResult(root_gravelPanning);
    if(result == null) return blockitem.buildItem(0, 0, 0);
    return (result instanceof require("cn.nukkit.item.Item")) ? result : blockitem.buildItem(0, 0, 0);
}