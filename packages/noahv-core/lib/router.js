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

const router = function (config) {
    let routers = [];
    let entry = '';
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
        if (item.meta) {
            temp.meta = item.meta;
        }

        // 判断是否配置了入口
        if (item.entry === true) {
            entry = item.path;
        }
        routers.push(temp);
    });

    if (entry === '') {
        entry = config[0].path;
    }

    // 配置默认跳转
    routers.unshift({
        path: '',
        redirect: entry
    });
    return routers;
};
/* eslint-enable */
export default router;
