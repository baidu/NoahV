/**
 * @file store
 * @author Joannamo(joannamo123@163.com)
 *         darren(darrenywyu@gmail.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import api from 'common/header';
import {LOGIN, UPDATE_BASE_FLAG} from './mutation-types';
const VUE_INSTANCE = new Vue();

Vue.use(Vuex);

const state = {
    username: 'guest',
    baseDataReady: false
};

const mutations = {
    [LOGIN](state, username) {
        state.username = username;
    },
    [UPDATE_BASE_FLAG](state, flag) {
        state.baseDataReady = flag;
    }
};

const actions = {
    getUserName({commit}) {
        if (api.login.hasLogin) {
            if (api.login.url && api.login.url !== '') {
                VUE_INSTANCE.post(api.login.url).then(response => {
                    if (!response.data.success) {
                        return;
                    }
                    let resData = response.data.data;
                    if (resData.userName) {
                        commit(LOGIN, resData.userName);
                    }
                });
            }
        }
    },
    // 获取基础数据
    getBaseData({commit}) {
        let depInfo = [];
        return Promise.all(depInfo).then(() => {
            // 基础信息准备完成标识
            commit(UPDATE_BASE_FLAG, true);
        });
    }
};

export default new Vuex.Store({
    state: Object.assign({}, state),
    modules: Object.assign({}),
    actions: Object.assign({}, actions),
    mutations: Object.assign({}, mutations)
});
