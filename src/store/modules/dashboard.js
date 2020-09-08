/**
 * @file vuex for dashboard config
 *
 * @author darren(darrenywyu@gmail.com)
 */

import widget from '../../view/dashboard/api/widget';
import * as types from '../mutation-types';

// initial state
const state = {
    widgetConfig: {},
    widgetTitle: '',
    widgetType: '',
    productLists: [],
    product: ''
};

// getters
const getters = {
    widgetConfig: state => state.widgetConfig
};

// actions
const actions = {
    getConfig({commit}, id) {
        widget.getConfig(id, config => {
            commit(types.GET_CONFIG, {config});
        });
    }
};

// mutations
const mutations = {
    [types.GET_CONFIG](state, {config}) {
        let widgetConfig = state.widgetConfig;
        try {
            widgetConfig = JSON.parse(config.configure);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('vuex:dashboard配置格式化出错');
        }
        state.widgetConfig = widgetConfig;
        state.widgetTitle = config.title;
        state.widgetType = config.type;
        // state.product = config.productName;
    },
    [types.UPDATE_CONFIG](state, config) {
        state.widgetConfig = Object.assign({}, state.widgetConfig, config);
    },
    [types.UPDATE_TITLE](state, config) {
        state.widgetTitle = config.title;
    },
    [types.UPDATE_TYPE](state, config) {
        state.widgetType = config.type;
    },
    [types.UPDATE_PRODUCT](state, config) {
        config.map(item => {
            item.value = item.name;
            return item;
        });
        state.productLists = config;
    },
    [types.UPDATE_PRODUCT_TYPE](state, config) {
        state.product = config.product;
    },
    [types.RESET_CONFIG](state) {
        state.widgetConfig = Object.assign({});
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
