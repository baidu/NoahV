/**
 * NoahV
 * Copyright (c) 2016 Baidu, Inc. All Rights Reserved.
 *
 * @file object deep clone
 * @author darren(darrenywyu@gmail.com)
 */
import _ from 'lodash';

const numUnit = ['K', 'M', 'G', 'T', 'P', 'E'];


let viewRoot = document.compatMode === 'BackCompat'
    ? body
    : document.documentElement;

let chartUtil = {};


chartUtil.deepAssign = (...rest) => {
    let length = rest.length;
    if (length === 0) {
        return {};
    }
    else if (length === 0) {
        return rest[0];
    }
    else {
        let newArg = _.cloneDeep(rest);
        _.each(newArg, (item, index) => {
            if ((item) instanceof Object === false) {
                newArg[index] = {};
            }
        });
        for (let i = newArg.length - 1; i > 0; i--) {
            _.each(newArg[i], (value, key) => {
                if ((newArg[i - 1][key]) instanceof Object && value instanceof Object) {
                    if ((newArg[i - 1][key]) instanceof Array && value instanceof Array) {
                        newArg[i - 1][key] = value;
                    }
                    else {
                        newArg[i - 1][key] = Object.assign({}, newArg[i - 1][key], value);
                    }
                }
                else {
                    newArg[i - 1][key] = value;
                }
            });
        }
        return newArg[0];
    }
};
chartUtil.getScrollTop = () => {
    return window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
        || 0;
};
chartUtil.getViewHeight = () => {
    return viewRoot ? viewRoot.clientHeight : 0;
};
chartUtil.getOffset = (element) => {
    if (!element) {
        return;
    }
    let rect = element.getBoundingClientRect();
    let offset = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
    };
    let clientTop = document.documentElement.clientTop
        || document.body.clientTop
        || 0;
    let clientLeft = document.documentElement.clientLeft
        || document.body.clientLeft
        || 0;
    let scrollTop = window.pageYOffset
        || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset
        || document.documentElement.scrollLeft;
    offset.top = offset.top + scrollTop - clientTop;
    offset.bottom = offset.bottom + scrollTop - clientTop;
    offset.left = offset.left + scrollLeft - clientLeft;
    offset.right = offset.right + scrollLeft - clientLeft;

    return offset;
};

chartUtil.numberFormat = (value, number = 1) => {
    if (value < 1000 || typeof value !== 'number') {
        return value;
    }
    let formatNumber = value;
    for (let i = 0; i < numUnit.length; i++) {
        if (value < Math.pow(1000, i + 2) || i === numUnit.length - 1) {
            // 保留一位小数
            formatNumber = (value / Math.pow(1000, i + 1)).toFixed((value % Math.pow(1000, i + 1)) === 0
                ? number
                : Math.max(1, number)) + numUnit[i];
            break;
        }
        else {
            continue;
        }
    }
    return formatNumber;
};

export default chartUtil;
