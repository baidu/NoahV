/**
 * @file javascript steps
 * @author nimingdexiaohai(nimingdexiaohai@163.com)
 */

let stepsUtils = {};

/**
 * 获取当前可视区域的步骤数据
 *
 * @param {Array} collections 所有数据
 * @param {number} distance 可视的个数
 * @param {number} first 第一个可视的步骤在全集中的下标
 * @return {Array} 可视区域的步骤对象集合
 */
stepsUtils.getShownDatas = (collections, distance, first) => {
    let result = [];
    if (collections && collections.length) {
        for (let i = 0, len = collections.length; i < len && i < first + distance; i++) {
            if (i < first) {
                continue;
            }
            else {
                result[i - first] = collections[i];
                // 在原始集合中的下标
                result[i - first]['rawInx'] = i;
                result[i - first]['lastShown'] = false;
            }
        }
        if (result.length) {
            // 表示是否为当前可视区域的最后一个步骤项
            result[result.length - 1]['lastShown'] = true;
        }
    }
    return result;
};

/**
 * 获取当前执行阶段在可视区域的位置
 *
 * @param {Array} items 可视区域所有数据
 * @return {number} 返回该阶段在可视区域中的相对位置，从0开始
 */
stepsUtils.getActiveStageInx = items => {
    let inx = -1;
    if (items && items.length) {
        for (let i = 0, len = items.length; i < len; i++) {
            if (items[i].status === 'running') {
                inx = i;
                break;
            }
        }
    }
    return inx;
};

/**
 * 获取某个阶段在可视区域的位置
 *
 * @param {Array} items 可视区域所有数据
 * @param {Object} item 某个阶段项
 * @return {number} 返回该阶段在可视区域中的相对位置，从0开始
 */
stepsUtils.getStageInx = (items, item) => {
    let inx = -1;
    if (items && items.length) {
        for (let i = 0, len = items.length; i < len; i++) {
            if (items[i].rawInx === item.rawInx) {
                inx = i;
                break;
            }
        }
    }
    return inx;
};

/**
 * 函数节流
 *
 * @param {Function} method 要节流的函数
 * @param {number} time 间隔时间
 */
stepsUtils.throttle = (method, time) => {
    if (method) {
        if (method.tId) {
            clearTimeout(method.tId);
        }
        method.tId = setTimeout(() => {
            method();
        }, time);
    }
};

export default stepsUtils;
