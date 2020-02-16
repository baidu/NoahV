/**
 * @file javascript get className
 *
 * @author nimingdexiaohai(nimingdexiaohai@163.com)
 */

let getClassName = {};
const prefixCls = ['noahv'];

/**
 * 获取组件样式类名
 *
 * @param {string} postfix 传入的后缀字符串
 * @return {Object} 返回拼接后的类名集合
 */
getClassName.getComponentWrapperCls = postfix => {
    let classNames = [];
    for (let i = 0, len = prefixCls.length; i < len; i++) {
        classNames[i] = prefixCls[i] + '-' + postfix;
    }
    return classNames;
};

/**
 * 条件获取组件样式类名
 *
 * @param {Object} clsConfig 传入的后缀字符串及其生效条件
 *
 * @return {Object} 返回拼接后的类名集合
 */
getClassName.getConditionCls = clsConfig => {
    let classNames = [];
    for (let i = 0, len = clsConfig.length; i < len; i++) {
        if (clsConfig[i].condition) {
            for (let j = 0, len = prefixCls.length; j < len; j++) {
                classNames.push(prefixCls[j] + '-' + clsConfig[i].postfix);
            }
        }
    }
    return classNames;
};

export default getClassName;
