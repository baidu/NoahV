/**
 * @file axios instance
 * @author mohaiyan(mohaiyan2005@163.com)
 */

import axios from 'axios';
import qs from 'qs';
import axiosDefaults from 'axios/lib/defaults';

// keep spin.show and spin.hide consistent
let singleton = 0;

const handlerUrl = (url, params) => {
    if (/\{.*?\}/g.test(url)) {
        const matches = url.match(/\{.*?\}/g);
        matches.map(item => {
            let key = item.substring(1, item.length - 1);
            if (params && params[key] && params[key] !== '') {
                url = url.replace(item, params[key]);
            }
            else {
                url = url.replace(item, key);
            }
            return item;
        });
    }
    return url;
};

const axiosConf = {
    paramsSerializer(params) {
        return qs.stringify(params);
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
        data => {
            data = qs.stringify(data);
            return data;
        }
    ],
    adapter(config) {

        // match for the api style of restful
        if (config.url) {
            let args = {};
            if (config.pathArgs && config.pathArgs) {
                args = config.pathArgs;
            }
            else if (config.params && config.data) {
                Object.assign(args, config.params, qs.parse(config.data));
            }
            else if (config.params) {
                args = config.params;
            }
            else if (config.data) {
                args = qs.parse(config.data);
            }
            config.url = handlerUrl(config.url, args);
        }
        return axiosDefaults.adapter(config);
    },
    validateStatus(status) {
        if (status >= 200 && status < 300) {
            return true;
        }
        else {

            // vueInstance.$Message.error('Error! there was a ' + status + ' code returns');
            return false;
        }
    },
    transformResponse: [
        data => {
            singleton--;
            if (singleton === 0) {

                // hide执行时会有500ms的延迟，防止Spin不能被清除，页面不能正常向下滑动，在这里手动去掉overflow的hidden值
                document.body.style.overflow = '';
            }
            const parseData = JSON.parse(data);
            if (parseData.success) {
                if (parseData.data && parseData.data.redirect) {
                    if (parseData.data.redirect.indexOf('http') === -1) {
                        window.location.href = window.location.origin + parseData.data.redirect;
                    }
                    else {
                        window.location.href = parseData.data.redirect;
                    }
                }
            }
            return parseData;
        }
    ]
};


export const axiosInstance = {
    preHandlerAxios(opst) {
        return axios.create(Object.assign({}, axiosConf, opst));
    }
};



