/**
 * NoahV Request
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file request tools
 * @author darren(darrenywyu@gmail.com)
 *         Joannamo(joannamo123@163.com)
 */

import axios from 'axios';
import Vue from 'vue';
import axiosDefaults from 'axios/lib/defaults';
import qs from 'qs';
const vueInstance = new Vue();


let request = {
    hooks: {}
};

// 正在请求数量
let inRequestNum = 0;
// 是否有Loading在展示
let hasLoadingShow = false;

/**
 * 处理restful风格接口，替换接口定义中的{}包裹的数据
 * @param  {string} url    待替换接口地址
 * @param  {Object} params 待替换数据
 * @return {string}        替换后接口地址
 */
function handlerRestfulUrl(url, params) {
    if (typeof request.hooks.handlerRestfulUrl === 'function') {
        return request.hooks.handlerRestfulUrl(url, params);
    }
    else if (/\{.*?\}/g.test(url)) {
        let matches = url.match(/\{.*?\}/g);
        matches.forEach( item => {
            let key = item.substring(1, item.length - 1);
            if (params && params[key] && params[key] !== '') {
                url = url.replace(item, params[key]);
            }
            else {
                url = url.replace(item, key);
            }
        });
    }
    return url;
}

/**
 * 处理失败请求情况
 * @param  {Object} error 错误信息
 */
function requestFailureHandler(error) {
    if (typeof request.hooks.beforeFailure === 'function') {
        error = request.hooks.beforeFailure(error) || error;
    }
    // 如果isSilent为true，不弹窗提示
    if (error.isSilent === true) {
        return;
    }
    // 处理弹窗信息，全局配置弹窗参数
    vueInstance.$Notice.config({
        top: 60,
        duration: 0
    });

    if (error.response) {
        vueInstance.$Notice.error({
            title: error.response.status + ' ' + error.response.statusText,
            desc: 'URL: ' + error.response.config.url
        });
    }
    else if (error.request) {
        vueInstance.$Notice.error({
            title: '系统提示',
            desc: '请求失败，未知错误'
        });
    }
    else {
        vueInstance.$Notice.error({
            title: '系统提示',
            desc: error.message
        });
    }
}

/**
 * 处理正确的请求情况
 * @param  {Object} response 接口返回信息
 * @return {Object} 返回信息
 */
function requestSuccessHandler(response) {
    try {
        let parseData = JSON.parse(response.data);
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
        response.data = parseData;
        return response;
    }
    catch (err) {
        vueInstance.$Notice.error({
            title: '系统提示',
            desc: err,
            duration: 0
        });
    }
}


/**
 * 处理请求发出时全局提示
 * @param  {Object} config 请求配置
 */
function handlerGlobalLoadingFormRequest(config) {
    if (typeof request.hooks.showGlobalLoading === 'function') {
        request.hooks.showGlobalLoading(config);
    }
    // TODO
    else if (config.showLoading !== false) {
        const DefaultLoading = {
            size: 40,
            type: 'load-c',
            class: 'noahv-loading',
            text: 'Loading...'
        };
        if (inRequestNum === 0) {
            hasLoadingShow = true;
            vueInstance.$Spin.show({
                render: h => {
                    return h('div', [
                        h('Icon', {
                            class: DefaultLoading.class,
                            props: {
                                type: DefaultLoading.type,
                                size: DefaultLoading.size
                            }
                        }),
                        h('div', DefaultLoading.text)
                    ]);
                }
            });
        }
    }
    inRequestNum++;
}

/**
 * 处理请求返回时全局提示
 */
function handlerGlobalLoadingFormResponse() {
    inRequestNum--;

    if (typeof request.hooks.hideGlobalLoading === 'function') {
        request.hooks.hideGlobalLoading();
    }

    else if (inRequestNum === 0 && hasLoadingShow === true) {
        hasLoadingShow = false;
        vueInstance.$Spin.hide();
        // hide执行时会有500ms的延迟，防止Spin不能被清除，页面不能正常向下滑动，在这里手动去掉overflow的hidden值
        document.body.style.overflow = '';
    }
}

const axiosDefaultConf = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
        data => {
            data = qs.stringify(data);
            return data;
        }
    ],
    paramsSerializer(params) {
        return qs.stringify(params);
    },
    adapter(config) {
        // 处理加载提示逻辑
        handlerGlobalLoadingFormRequest(config);

        // 在执行adapter逻辑前提供处理config的hooks
        if (typeof request.hooks.beforeAdapter === 'function') {
            config = request.hooks.beforeAdapter(config) || config;
        }

        // 处理restful风格接口
        if (config.url) {
            let args = {};
            if (config.pathArgs) {
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
            config.url = handlerRestfulUrl(config.url, args);
        }
        return axiosDefaults.adapter(config);
    },
    transformResponse: [
        data => {
            handlerGlobalLoadingFormResponse();
            if (typeof request.hooks.beforeResponse === 'function') {
                data = request.hooks.beforeResponse(data) || data;
            }
            return data;
        }
    ]
};

request.install = (Vue, opt) => {
    let conf = Object.assign({}, axiosDefaultConf, opt);
    const axiosInstance = axios.create(conf);
    Vue.prototype.$request = axiosInstance;

    axiosInstance.interceptors.request.use(config => {
        if (typeof request.hooks.beforeRequest === 'function') {
            return request.hooks.beforeRequest(config);
        }
        return config;
    }, error => {
        requestFailureHandler(error);
    });

    axiosInstance.interceptors.response.use(response => {
        if (typeof request.hooks.beforeSuccess === 'function') {
            response = request.hooks.beforeSuccess(response);
        }
        return requestSuccessHandler(response);
    }, error => {
        requestFailureHandler(error);
    });

};

export default request;
