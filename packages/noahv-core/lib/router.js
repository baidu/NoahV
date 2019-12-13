/**
 * NoahV Core
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file router handler
 * @author darren(darrenywyu@gmail.com)
 *         Joannamo(joannamo123@163.com)
 */

import _ from 'lodash';

/* eslint-disable no-undef,func-names */
function getComponent(path) {
    let fileType = 'vue';
    if ((/^\/.*/).test(path)) {
        path = path.replace(/^\//, '');
    }
    if ((/^\.\/.*/).test(path)) {
        path = path.replace(/^\.\//, '');
    }
    if ((/^src.*/).test(path)) {
        path = path.replace('src/', '');
    }
    if ((/\./).test(path)) {
        fileType = path.match(/\.(\S*)$/)[1];
        let suffix = path.match(/\.(\S*)$/)[0];
        path = path.replace(suffix, '');
    }
    if (fileType === 'vue') {
        return resolve => {
            return require.ensure(
                [],
                function () {
                    return resolve(require('src/' + path + '.vue'));
                }
            );
        };
    }
    else if (fileType === 'md') {
        return resolve => {
            return require.ensure(
                [],
                function () {
                    return resolve(require('src/' + path + '.md'));
                }
            );
        };
    }
}

function isObject(obj) {
    return obj instanceof Object && typeof obj !== 'function';
}

function findEntry(config, parent){
    let entry = '';
    if (config && Array.isArray(config) && config.length > 0) {
        let len = config.length;
        for (let i = 0; i < len; i++) {
            if (config[i].entry === true) {
                if (parent && config[i].path.indexOf(parent.path) === -1) {
                    /\/$/.test(parent.path) || /^\//.test(config[i].path)
                    ? entry = parent.path + config[i].path
                    : entry = parent.path + '/' + config[i].path
                }
                else {
                    entry = config[i].path;
                }
                break;
            }
            else if (config[i].children && Array.isArray(config[i].children)) {
                let childrenEntry = findEntry(config[i].children, config[i]);
                if (childrenEntry) {
                    entry = childrenEntry;
                    break;
                }
            }
        }
    }
    return entry;
}

const router = function (config) {
    let routers = [];
    _.each(config, function (item) {
        let temp = {};
        // 处理components写法
        if (item.components && isObject(item.components)) {
            let component = {};
            _.each(item.components, function (value, key) {
                component[key] = typeof value === 'string' ? getComponent(value) : value;
            });
            temp = {
                path: item.path,
                components: component
            };
        }
        // 处理component写法
        else if (item.component && isObject(item.component)) {
            let component = {};
            _.each(item.component, function (value, key) {
                if (key === 'template') {
                    component[key] = value;
                }
                else {
                    component[key] = typeof value === 'string' ? getComponent(value) : value;
                }
            });
            if (component.template) {
                temp = {
                    path: item.path,
                    component: component
                };
            }
            else {
                temp = {
                    path: item.path,
                    components: component
                };
            }
        }
        else {
            temp = {
                path: item.path,
                component: typeof item.component === 'string' ? getComponent(item.component) : item.component
            };
        }
        // 处理chidren情况
        if (item.children !== undefined) {
            if (typeof item.children === 'string') {
                temp.children = getComponent(item.children);
            }
            else {
                temp.children = item.children;
            }
        }
        routers.push(Object.assign({}, item, temp));
    });
    // 配置默认跳转
    routers.unshift({
        path: '',
        redirect: findEntry(config) || config[0].path
    });
    return routers;
};
/* eslint-enable */
export default router;
