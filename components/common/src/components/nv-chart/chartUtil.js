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
                        newArg[i - 1][key] = _.merge({}, newArg[i - 1][key], value);
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


chartUtil.kByteUnit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
chartUtil.kBitUnit = ['', 'k', 'm', 'g', 't', 'p', 'e', 'z', 'y', 'b'];
chartUtil.formatter = {
    isByteUnit: function (value) {
        return _.indexOf(chartUtil.kByteUnit, value) !== -1;
    },
    percent: function (value, number) {
        number = number ? number : 2; // 如果末尾尾0，不需要显示+ '%'
        return Number(value.toFixed(number));
    },
    bytes: function (value, number, byteUnit, unit) {
        number = number === undefined ? 2 : number;
        byteUnit = byteUnit ? byteUnit : 1024;
        var idx = unit ? _.indexOf(chartUtil.kByteUnit, unit) : 0;
        var len = chartUtil.kByteUnit.length - 1;
        while (value >= byteUnit && idx < len) {
            value = value / byteUnit;
            idx++;
        }
        var str = '';
        if (number === 0) {
            str = Math.round(value);
        }
        else {
            str = Number(value.toFixed(number));
        }
        return str + chartUtil.kByteUnit[idx];
    },
    bits: function (value, number, bitUnit) {
        number = number === undefined ? 2 : number;
        bitUnit = bitUnit ? bitUnit : 1024;
        var idx = 0;
        var len = chartUtil.kBitUnit.length - 1;
        while (value >= bitUnit && idx < len) {
            value = value / bitUnit;
            idx++;
        }
        var str = '';
        if (number === 0) {
            str = Math.round(value);
        }
        else {
            str = Number(value.toFixed(number));
        }
        return str + chartUtil.kBitUnit[idx];
    },
    number: function (value, number) {
        number = number === 'undefined' ? 1 : number;
        if (value < 10000) {
            return Number(value.toFixed(number));
        } // 15000、20000，当number为0的时候，都是2万
        // 所以需要判断一下value是否能整除，不能整除的至少保留一位小数
        else if (value < 1000000) {
            return (value / 10000).toFixed(value % 10000 === 0
                ? number : Math.max(1, number)) + '万';
        }
        else if (value < 10000000) {
            return (value / 1000000).toFixed(value % 1000000 === 0
                ? number : Math.max(1, number)) + '百万';
        }
        return (value / 10000000.0).toFixed(value % 10000000 === 0
            ? number : Math.max(1, number)) + '千万';
    }
};

chartUtil.getUnitType = unit => {
    let type;
    let suffix = '';
    if (unit.toUpperCase() === 'BYTES' || unit.toUpperCase() === 'BYTES/S') {
        suffix = unit.toUpperCase() === 'BYTES' ? '' : '/s';
        type = 'bytes';
    }
    else if (unit.toUpperCase() === 'BPS') {
        type = 'bytes';
        suffix = unit.substring(1, unit.length);
    }
    else if (unit === '%') {
        type = 'percent';
        suffix = '%';
    }
    else if (chartUtil.formatter.isByteUnit(unit)) {
        type = 'bytes';
    }
    else {
        type = 'number';
        suffix = unit;
    }
    return {
        type,
        suffix
    };
};

chartUtil.getTooltipValue = (value, unit, decimals) => {
    decimals = decimals === undefined ? 2 : decimals;
    let {
        type,
        suffix
    } = chartUtil.getUnitType(unit);
    let valueStr = '';
    if (isNaN(value)) {
        valueStr = '-';
    }
    else {
        let prefix = value < 0 ? '-' : '';
        value = Math.abs(value);
        value = chartUtil.formatter[type](value, decimals);
        valueStr = prefix + value + suffix;
    }
    return valueStr;
};

chartUtil.getyAxisValue = (value, unit) => {
    let {
        type,
        suffix
    } = chartUtil.getUnitType(unit);
    let prefix = value < 0 ? '-' : '';
    value = Math.abs(value);
    value = chartUtil.formatter[type](value, 2);
    return prefix + value + suffix;
};



export default chartUtil;
