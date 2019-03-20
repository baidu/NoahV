/**
 * NoahV Core
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file header render
 * @author darren(darrenywyu@gmail.com)
 *         Joannamo(joannamo123@163.com)
 */

const headerHanlder = config => {
    const {header, login, type, hasBread} = config;

    // default hasBread
    let hasBreadSource = hasBread !== false;


    // the headerMap array
    let headerMap = [];
    let redirectRouter = '';


    function getHeaderMap(headers) {
        if (Array.isArray(headers)) {
            headers.forEach(item => {
                if (typeof item.parent === 'undefined') {
                    item.parent = null;
                }
                headerMap.push(item);

                if (item.children) {
                    item.children.forEach(chItem => {
                        chItem.parent = item.key;
                        return null;
                    });

                    getHeaderMap(item.children);
                }
            });
        }
    }

    getHeaderMap(header);
    getHeaderMap(login.subnav);

    const getCurrentItem = (key, value) => {
        let res = {};
        headerMap.forEach(item => {
            if (item[key] && item[key] === value) {
                res = item;
            }
        });

        return res;
    };

    const unSelectedItem = item => {
        item.forEach(curItem => {
            curItem.selected = false;
            if (curItem.children) {
                unSelectedItem(curItem.children);
            }
        });
    };

    const linkInHeader = path => {
        let inHeaderFlag = false;
        headerMap.forEach(item => {
            if (item.link === path) {
                inHeaderFlag = true;
            }
        });
        return inHeaderFlag;
    };


    const addSelectedProperty = header => {
        header.forEach(item => {
            if (typeof item.selected === 'undefined') {
                item.selected = false;

                if (item.children) {
                    addSelectedProperty(item.children);
                }
            }
        });
    };

    addSelectedProperty(header);

    function getRedirectRouter(data) {
        data.forEach(item => {
            if (item.selected) {
                if (!item.children) {
                    redirectRouter = item.link;
                }
                else {
                    getRedirectRouter(item.children);
                }
            }
        });
    }

    getRedirectRouter(header);

    return {
        login: config.login,
        headerConf: config.header,
        logo: config.logo,
        hasBread: hasBreadSource,
        type: (typeof type === 'undefined') ? 'header' : type,
        separator: config.separator,
        getCurrentItem: getCurrentItem,
        unSelectedItem: unSelectedItem,
        linkInHeader: linkInHeader
    };

};

export default headerHanlder;
