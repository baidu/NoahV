/**
 * NoahV
 * Copyright (c) 2016 Baidu, Inc. All Rights Reserved.
 *
 * @file object deep clone
 * @author darren(darrenywyu@gmail.com)
 */
import _ from 'lodash';

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
                    newArg[i - 1][key] = Object.assign({}, newArg[i - 1][key], value);
                }
                else {
                    newArg[i - 1][key] = value;
                }
            });
        }
        return newArg[0];
    }
};

export default chartUtil;
