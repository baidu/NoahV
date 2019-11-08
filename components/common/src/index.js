/**
 * NOAHV
 * Copyright (c) 2016 Baidu, Inc. All Rights Reserved.
 *
 * @file NoahV Component
 * @author darren(darrenywyu@gmail.com)
 *         Joannamo(joannamo123@163.com)
 */

// TPL，Sa命名方式
import SaForm from './components/nv-form';
import SaTable from './components/nv-table';
import SaFilterTable from './components/nv-filtertable';
import SaContrastTrend from './components/nv-chart';
import Sa404 from './components/nv-404';
import SaTree from './components/nv-tree';
import SaDatePicker from './components/nv-datepicker';
import SaList from './components/nv-list';
import SaSteps from './components/nv-steps';
import SaTag from './components/nv-tag';

// TPL，Nv命名方式
import NvForm from './components/nv-form';
import NvTable from './components/nv-table';
import NvFilterTable from './components/nv-filtertable';
import NvContrastTrend from './components/nv-chart';
import Nv404 from './components/nv-404';
import NvTree from './components/nv-tree';
import NvDatePicker from './components/nv-datepicker';
import NvList from './components/nv-list';
import NvSteps from './components/nv-steps';
import NvSearch from './components/nv-search';
import NvTag from './components/nv-tag';
import NvDutyTable from './components/nv-dutytable';

// Basic，Sa命名方式
import SaIcon from './components/nv-icon';
import SaInput from './components/nv-input';
import SaCheckbox from './components/nv-checkbox';
import SaTextLine from './components/nv-textline';
import SaSwitch from './components/nv-switch';
import SaButton from './components/nv-button';
import SaDialog from './components/nv-dialog';
import SaPipline from './components/nv-pipline';
import SaTransfer from './components/nv-transfer';
import {SaTrend, SaChart} from './components/nv-chart';
import SaCascaderSelect from './components/nv-cascaderSelect';

// Basic，Nv命名方式
import NvIcon from './components/nv-icon';
import NvInput from './components/nv-input';
import NvCheckbox from './components/nv-checkbox';
import NvTextLine from './components/nv-textline';
import NvSwitch from './components/nv-switch';
import NvButton from './components/nv-button';
import NvDialog from './components/nv-dialog';
import NvPipline from './components/nv-pipline';
import NvTransfer from './components/nv-transfer';
import {NvTrend, NvChart} from './components/nv-chart';
import NvCascaderSelect from './components/nv-cascaderSelect';
import NvEllipsis from './components/nv-ellipsis';

// 暂时兼容部分组件老的命名
import formTpl from './components/nv-form';
import tableTpl from './components/nv-table';
import filterTableTpl from './components/nv-filtertable';

import VueClipboard from 'vue-clipboard2';

const noahv = {
    // 业务模板
    SaForm,
    SaTable,
    SaFilterTable,
    Sa404,
    SaSwitch,
    SaDialog,
    SaButton,
    SaContrastTrend,
    SaList,
    SaSteps,
    SaTag,

    // 业务模板，兼容Nv命名组件
    NvForm,
    NvTable,
    NvFilterTable,
    Nv404,
    NvSwitch,
    NvDialog,
    NvButton,
    NvContrastTrend,
    NvList,
    NvSteps,
    NvSearch,
    NvTag,
    NvDutyTable,

    // 基础组件类
    SaIcon,
    SaInput,
    SaCheckbox,
    SaTextLine,
    SaTree,
    SaDatePicker,
    SaChart,
    SaTrend,
    SaPipline,
    SaTransfer,
    SaCascaderSelect,

    // 基础组件类，兼容Nv命名组件
    NvIcon,
    NvInput,
    NvCheckbox,
    NvTextLine,
    NvPipline,
    NvTree,
    NvDatePicker,
    NvChart,
    NvTrend,
    NvTransfer,
    NvCascaderSelect,
    NvEllipsis,

    // 暂时兼容部分组件老的命名
    formTpl,
    tableTpl,
    filterTableTpl
};


const install = Vue => {
    Object.keys(noahv).forEach(key => {
        Vue.component(key, noahv[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}


export default Object.assign(noahv, {install});
