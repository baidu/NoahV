/**
 * @file 获取widget初始配置信息，提供给vuex
 *
 * @author darren(darrenywyu@gmail.com)
 */
import apiConfig from './config';
import util from '../util/util';
import Vue from 'vue';
const vueInstace = new Vue();

export default {
    getConfig(params, cb) {
        vueInstace.$request({
            url: util.getApi(apiConfig.widgetConfig),
            method: 'get',
            params: {
                id: params.id
            }
        }).then(res => {
            if (res.data.success) {
                const data = res.data.data;
                cb(data);
            }
            else {
                // 听天由命了
            }
        });
    }
};
