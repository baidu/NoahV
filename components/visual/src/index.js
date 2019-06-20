/**
 * @file entry
 *
 * @author wang_jing13@163.com
 *         darren(darrenywyu@gmail.com)
 */

import ApiConf from './config/widgetApi';
import {eConfig} from './config/widgetConfig';
import {axiosInstance} from './util/axiosInstance';

import SaMDBillboard from './billboard';
import SaMDCircle from './circle';
import SaMDTrend from './mdtrend';
import SaMDCustomBox from './customBox';
import SaMDReport from './mdreport';
import SaMDEventRiverView from './eventRiver/index';

import NvMDBillboard from './billboard';
import NvMDCircle from './circle';
import NvMDTrend from './mdtrend';
import NvMDCustomBox from './customBox';
import NvMDReport from './mdreport';
import NvMDEventRiverView from './eventRiver/index';
import NvMDBubble from './mdbubble/mdbubble';

const defaultEchartsConf = Object.assign({}, ApiConf, eConfig);

const noahVisual = {
    SaMDBillboard,
    SaMDCircle,
    SaMDTrend,
    SaMDCustomBox,
    SaMDReport,
    SaMDEventRiverView,
    NvMDBillboard,
    NvMDCircle,
    NvMDTrend,
    NvMDCustomBox,
    NvMDReport,
    NvMDEventRiverView,
    NvMDBubble
};

const install = (Vue, opts) => {
    Object.keys(noahVisual).forEach(key => {
        Vue.component(key, noahVisual[key]);
    });

    // Set extraEchartsConf: Merge user configuration and default configuration
    Vue.prototype.$extraEchartsConf = Object.assign({}, defaultEchartsConf, opts);

    if (Vue.prototype.$request) {
        Vue.prototype.$wRequest = Vue.prototype.$request;
    }
    else {
        let axiosOpts = opts ? opts.axios : {};
        Vue.prototype.$wRequest = axiosInstance.preHandlerAxios(axiosOpts);
    }
};

// External function: help users set configuration friendly.
const setOptions = (Vue, opts) => {

    // Set extraEchartsConf: Merge user configuration and default configuration
    Vue.prototype.$extraEchartsConf = Object.assign({}, defaultEchartsConf, opts);

    if (Vue.prototype.$request) {
        Vue.prototype.$wRequest = Vue.prototype.$request;
    }
    else {
        let axiosOpts = opts ? opts.axios : {};
        Vue.prototype.$wRequest = axiosInstance.preHandlerAxios(axiosOpts);
    }
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue, defaultEchartsConf);
}


export default Object.assign(noahVisual, {install, setOptions});
