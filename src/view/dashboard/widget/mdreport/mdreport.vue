<template>
    <div class="mdreport-config">
        <baseConfig :itemlist="itemList">
            <div slot="datasource" class="mdreport-datasource">
                <defaultDatasource />
            </div>
            <div slot="data" class="mdreport-data">
                <div class="mdreport-table">
                    <Form :model="reportData" :label-width="60">
                        <FormItem label="维度列名" class="input-item">
                            <Input
                                type="textarea"
                                class="input-box request"
                                v-model="reportData.caption"
                                placeholder="请填写表格维度列的标题"
                            />
                        </FormItem>
                    </Form>
                    <Table v-if="!isOrdered" border :data="tableData" :columns="tableColumns"></Table>
                </div>
                <Dropdown @on-click="addData" trigger="click">
                    <Button class="add-data-btn" :class="{'disabled': isOrdered}" icon="plus">
                        <span>添加数据</span>
                    </Button>
                    <DropdownMenu slot="list" style="margin-left: 0px">
                        <DropdownItem name="origin">添加列</DropdownItem>
                        <DropdownItem name="column" :disabled="originColumn.length === 0">添加列计算</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Modal
                    :title="modalTitle"
                    :mask-closable="false"
                    :width="modelWidth"
                    :closable="false"
                    v-model="isShowModel"
                    class="model-list"
                    ref="modelDlg">
                    <origin-model
                        ref="originSetting"
                        v-if="columnType == 'origin'"
                        :dataSet="settingData"
                        :monitoringType="monitoringType"
                        :monitoring="monitoring"
                        :groupList="groupList"
                        :product="product"
                        isShowModel="isShowModel"
                        >
                        </origin-model>
                    <column-model
                        ref="columnSetting"
                        v-if="columnType == 'column'"
                        :dataSet="settingData"
                        :product="product"
                        :groupList="groupList"
                        :originColumn="originColumn"
                        isShowModel="isShowModel"
                        >
                        </column-model>
                    <div slot="footer">
                        <Button type="text" class="model-close-btn" size="large" @click="closeSetting">取消</Button>
                        <Button type="primary" class="model-submit-btn" size="large" @click="renderData">确定</Button>
                    </div>
                </Modal>
            </div>
            <div slot="style" class="mdreport-style">
                <Form :model="reportData" :label-width="60">
                    <FormItem label="表格说明">
                        <Input class="input-class" v-model="reportData.comments" placeholder=""></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="link">
                <defaultLink />
            </div>
        </baseConfig>
    </div>
</template>

<script>
import baseConfig from '../configuration';
import defaultLink from '../common/defaultLink';
import defaultDatasource from '../common/defaultDatasource';
import originModel from './origin-model';
import columnModel from './column-model';
import {Tooltip} from 'iview';
import moment from 'moment';
const noData= {
    header: '无数据',
    metric: '无数据',
    type: 'nodata',
    cellClassName: {
        metric: 'nodata-table-info-cell',
        header: 'nodata-table-info-cell'
    }
};
export default {
    name: 'mdreport-config',
    components: {
        baseConfig,
        defaultLink,
        defaultDatasource,
        originModel,
        columnModel
    },
    props: {
        orderStatus: Boolean,
        product: String
    },
    mounted() {
        let tableData = this.initConfigData(this.$store.state.dashboard.widgetConfig.data);
        this.tableData = this.initTabelData(tableData.columns);
    },
    computed: {
        canAddCalculation() {
            return (this.originColumn.length === 0);
        }
    },
    data() {
        let tableData = this.initConfigData(this.$store.state.dashboard.widgetConfig.data);
        return {
            itemList: [
                {
                    name: '数据源配置',
                    slot: 'datasource'
                },
                {
                    name: '列配置',
                    slot: 'data'
                },
                {
                    name: '样式配置',
                    slot: 'style'
                },
                {
                    name: '链接配置',
                    slot: 'link'
                }
            ],
            popStatus: false,
            isOrdered: this.orderStatus,
            cloneEvent: node => {
                this.currentNode = node;
            },
            modalTitle: '添加数据',
            isShowModel: false,
            // 选择监控对象弹框控制
            isChooseMonitor: false,
            // 监控对象
            monitoring: tableData.namespace,
            // 监控对象类别
            monitoringType: 'instance',
            // 监控对象默认选中
            chooseMonitoring: [],
            modelWidth: 614,
            monitorWidth: 500,
            dataset: [],
            // 单记录数据
            settingData: {},
            tableData: [],
            tableColumns: [
                {
                    title: '列名',
                    align: 'center',
                    key: 'header',
                    render: (h, params) => {
                        let row = params.row;
                        // return (<span class="content" title={row.header}>{row.header}</span>);
                        return (
                            <Tooltip placement="bottom-start" content={row.header} delay={1000}>
                                <span>{row.header}</span>
                            </Tooltip>
                        );
                    }
                }, {
                    title: '表达计算',
                    align: 'center',
                    key: 'metric',
                    render: (h, params) => {
                        let row = params.row;
                        // return (<span class="content" title={row.metric}>{row.metric}</span>);
                        return (
                            <Tooltip placement="bottom-start" content={row.metric} delay={1000}>
                                <span>{row.metric}</span>
                            </Tooltip>
                        );
                    }
                }, {
                    title: '操作',
                    width: 100,
                    align: 'center',
                    key: 'action',
                    render: (h, params) => {
                        let row = params.row;
                        return (
                            <div class={row.type === 'nodata'
                                ? 'disabled icons'
                                : 'icons'}>
                                <a href="javascript:;" onClick={this.editDataSet.bind(this, row)}>
                                    <sa-icon type="pencil"/>
                                </a>
                                <a href="javascript:;" onClick={this.copyDataSet.bind(this, row)}>
                                    <sa-icon type="copy"/>
                                </a>
                                <a href="javascript:;" onClick={this.delDataSet.bind(this, row)}>
                                    <sa-icon type="trash-alias"/>
                                </a>
                            </div>
                        );
                    }
                }
            ],
            // 数据源列，真实数据库中存储的列
            originColumn: [],
            columnType: 'origin',
            // 分组列表
            groupList: [],
            reportData: tableData,
            orderData: []
        };
    },
    methods: {

        /**
         * 初始化组件配置
         * 用于适应组件类型的切换
         *
         * @return {[type]} [description]
         */
        initConfigData(config) {
            let transferConf = {};
            if (!config || !config.columns) {
                transferConf = {
                    namespace: [],
                    columns: [],
                    product: this.product,
                    comments: ''
                };
            }
            else {
                transferConf = config;
            }
            return transferConf;
        },

        /**
         * 修改排序状态
         */
        changeOrderStatus() {
            if (!this.isOrdered) {
                this.isOrdered = true;
                this.orderData = [];
                this.reportData.columns.forEach(item => {
                    this.orderData.push(Object.assign({}, item));
                });
                this.$emit('changeOrder', {
                    type: 'mdReport',
                    isOrdered: true
                });
            }
        },

        /**
         * 选择监控对象
         */
        chooseMonitor() {
            this.isChooseMonitor = true;
            this.chooseMonitoring = this.monitoring;
        },

        /**
         * 关闭监控对象
         */
        closeMonitor() {
            this.isChooseMonitor = false;
            this.chooseMonitoring = [];
        },

        /**
         * 渲染监控对象
         */
        renderMonitor() {
            this.monitoring = this.$refs.monitoring.getMonitoring();
            this.monitoringType = this.$refs.monitoring.getMonitorType();
            this.isChooseMonitor = false;
            this.reportData.namespace = this.monitoring;
        },

        /**
         * 删除监控对象
         */
        deleteMonitor(monitor) {
            let index = this.monitoring.indexOf(monitor);
            this.monitoring.splice(index, 1);
            this.chooseMonitoring.splice(index, 1);
            this.reportData.namespace = this.monitoring;
        },

        /**
         * 添加数据
         */
        addData(type) {
            this.columnType = type;
            if (this.isOrdered) {
                return;
            }
            this.settingData = {};
            this.isShowModel = true;
        },

        /**
         * 修改数据
         */
        editDataSet(row) {
            if (this.tableData[0].type !== 'nodata') {
                this.columnType = row.source;
                this.settingData = row;
                this.isShowModel = true;
            }
        },

        /**
         * 删除数据
         */
        delDataSet(row) {
            if (this.tableData[0].type !== 'nodata') {
                let index = -1;
                this.tableData.forEach((item, i) => {
                    if (item.id === row.id) {
                        index = i;
                    }
                });
                if (index !== -1) {
                    if (this.refreshColumn(row, 'delete', index)) {
                        // 刷新列分组
                        this.delData(index);
                    }
                }
            }
        },

        delData(index) {
            this.refreshGroupList(this.reportData.columns[index], 'delete');
            this.reportData.columns.splice(index, 1);
            this.tableData.splice(index, 1);
        },

        /**
         * 复制数据
         *
         * @param  {[type]} row [description]
         */
        copyDataSet(row) {
            if (this.tableData[0].type !== 'nodata') {
                let index = -1;
                let tableLength = this.tableData.length;
                this.tableData.forEach((item, i) => {
                    if (item.id === row.id) {
                        index = i;
                    }
                });
                if (index !== -1) {
                    let copyRow = Object.assign({}, row);
                    copyRow.header = copyRow.header + '_' + moment().unix();
                    if (copyRow.source === 'origin') {
                        copyRow.alias = copyRow.alias + '_' + moment().unix();
                    }
                    this.reportData.columns.splice(index + 1, 0, copyRow);
                    let tableRow = Object.assign({}, copyRow);
                    tableRow.id = tableLength + 1;
                    this.tableData.splice(index + 1, 0, tableRow);
                    this.refreshColumn(copyRow, 'add');
                }
            }
        },

        /**
         * 关闭设置弹出框
         */
        closeSetting() {
            // 关闭对话框
            this.isShowModel = false;
            if (this.columnType === 'origin') {
                this.$refs.originSetting.resetForm();
            }
            else {
                this.$refs.columnSetting.resetForm();
            }
            this.settingData = {};
        },

        /**
         * 保存数据对象
         *
         * @return {[type]} [description]
         */
        renderData() {
            let addRow = {};
            if (this.columnType === 'origin') {
                addRow = this.$refs.originSetting.getRowData();
            }
            else {
                addRow = this.$refs.columnSetting.getRowData();
            }
            this.refreshGroupList(addRow, 'add');
            // 数据验证
            if (!addRow) {
                return false;
            }
            // 新增 | 更新 数据记录
            if (addRow.id) {
                this.editRow(addRow);
            }
            else {
                this.renderNewRow(addRow);
                this.refreshColumn(addRow, 'add');
            }
            this.settingData = {};
            // 关闭对话框
            this.isShowModel = false;

        },

        /**
         * 存储数据，过滤掉唯一标识id
         *
         * @param  {[type]} row [description]
         * @return {[type]}     [description]
         */
        filter(row) {
            return {
                metric: row.metric,
                statistics: row.statistics,
                product: row.product,
                header: row.header || '',
                unit: row.unit,
                decimals: row.decimals
            };
        },

        /**
         * 渲染新数据记录
         *
         * @param  {[type]} row [description]
         */
        renderNewRow(row) {
            let tableData = this.tableData;
            this.reportData.columns.push(row);

            if (tableData[0] && tableData[0].type === 'nodata') {
                tableData = [];
            }
            let index = tableData.length + 1;
            row.id = row.id ? row.id : index;
            let tableRow = row;
            tableData.push(tableRow);
            this.tableData = tableData;
        },

        /**
         * 更新已有数据记录
         *
         * @param  {[type]} row [description]
         */
        editRow(row) {
            this.tableData.forEach((item, i) => {
                if (item.id === row.id) {
                    if (this.refreshColumn(row, 'edit', i)) {
                        this.editRowByIndex(row, i);
                    }
                }
            });
        },

        editRowByIndex(row, index) {
            this.$set(this.reportData.columns, index, row);
            this.$set(this.tableData, index, row);
        },

        /**
         * 初始话table列表
         *
         * @param  {[type]} dataset [description]
         * @return {[type]}         [description]
         */
        initTabelData(dataset) {
            let tableData = [noData];
            if (dataset && dataset.length > 0) {
                tableData = [];
                dataset.forEach((item, index) => {
                    let tableItem = Object.assign({}, item);
                    tableItem.id = index + 1;
                    tableData.push(tableItem);
                    this.refreshGroupList(tableItem, 'add');
                    this.refreshColumn(tableItem, 'add');
                });
            }
            return tableData;
        },
        sortTable(list, oldIndex, newIndex) {
            let item = list[oldIndex];
            if (newIndex < oldIndex) {
                list.splice(newIndex, 0, item);
                list.splice(oldIndex + 1, 1);
            }
            else {
                list.splice(newIndex + 1, 0, item);
                list.splice(oldIndex, 1);
            }
            return list;
        },

        /**
         * 刷新分组列表
         *
         * @param  {[type]} row        [更新row]
         * @param  {[type]} manageType [操作方式，del | add]
         */
        refreshGroupList(row, manageType) {
            let index = this.groupList.indexOf(row.group);
            if (row.group && manageType === 'add') {
                if (index === -1) {
                    this.groupList.push(row.group);
                }
            }
            else if (index > -1) {
                this.groupList.splice(index, 1);
            }
        },

        /**
         * 刷新可用数据源列表
         *
         * @param  {[type]} row         [更新row]
         * @param  {[type]} manageType  [操作方式，del | add]
         * @param  {[type]} deleteIndex [删除的原始数据索引]
         * @return {[type]}             [description]
         */
        refreshColumn(row, manageType, deleteIndex) {
            let flag = true;
            if (row.source === 'origin') {
                let index = this.originColumn.indexOf(row.alias);
                // 向数据源列表中添加列别名
                if (row.alias && manageType === 'add') {
                    if (index === -1 && row.use) {
                        this.originColumn.push(row.alias);
                    }
                }
                // 从数据源列表中删除列别名，需判断是否有占用的列别名，如果有则不可删除
                else if (row.alias && manageType === 'delete') {
                    this.reportData.columns.forEach(columnItem => {
                        if (columnItem.source === 'column') {
                            let metricList = this.filterMetric(columnItem.metric);
                            if (metricList.indexOf(row.alias) > -1) {
                                this.$Modal.confirm({
                                    title: '提示',
                                    content: '有列计算在使用该列，是否确定删除',
                                    onOk: () => {
                                        // 删除列名列表
                                        this.originColumn.splice(index, 1);
                                        /*
                                         * 删除groupList列表
                                         * 删除列真实数据
                                         */
                                        this.delData(deleteIndex);
                                    }
                                });
                                flag = false;
                            }
                        }
                    });
                    if (flag) {
                        // 删除列名列表
                        this.originColumn.splice(index, 1);
                    }
                }
                // 从数据源列表中修改列别名，需判断是否有占用的列别名，如果有则不可修改
                else if (row.alias && manageType === 'edit') {
                    this.reportData.columns.forEach(columnItem => {
                        let preRowAlias = this.tableData[deleteIndex].alias;
                        if (columnItem.source === 'column') {
                            let metricList = this.filterMetric(columnItem.metric);
                            if (metricList.indexOf(preRowAlias) > -1) {
                                this.$Modal.confirm({
                                    title: '提示',
                                    content: '有列计算在使用该列，是否确定修改',
                                    onOk: () => {
                                        // 更新列名列表
                                        this.originColumn.splice(index, 1, row.alias);
                                        this.editRowByIndex(row, deleteIndex);
                                    }
                                });
                                flag = false;
                            }
                        }
                    });
                    if (flag) {
                        // 更新列名列表
                        this.originColumn.splice(index, 1, row.alias);
                    }
                }
            }
            return flag;
        },

        /**
         * 过滤监控项
         *
         * @param  {[type]} metric [description]
         * @return {[type]}        [description]
         */
        filterMetric(metric) {
            let tempArr = metric.split('#{');
            let expressArr = [];
            // 匹配列计算的监控项表达式，并计算监控项值
            tempArr.forEach(item => {
                if (item) {
                    let temp = item.split('}');
                    temp.forEach(tTemp => {
                        if (tTemp) {
                            expressArr.push(tTemp);
                        }
                    });
                }
            });
            return expressArr;
        }
    },
    watch: {
        reportData: {
            handler(val) {
                this.$store.commit('UPDATE_CONFIG', {data: val});
            },
            deep: true
        },
        orderStatus: {
            handler(val) {
                this.isOrdered = val;
            },
            deep: true
        }
    }
};
</script>

<style lang="less">
@import '../../assets/css/style.less';
.mdreport-config {
    .widget-config-item {
        position: relative;
    }
    .mdreport-data {
        margin-top: 20px;
        .monitoring-table-holder {
            margin-bottom: 16px;
            .monitoring-btn {
                padding: 3px 10px;
                background: #f4f6f8;
                box-shadow: 0 1px 0 0 #cbd3dc;
                border-radius: 2px;
                font-size: 12px;
                color: #4a4a4a;
                cursor: pointer;
            }
            .monitoring-list {
                padding: 0 0 10px 10px;
                margin-top: 5px;
                background: #f2f7fb;
                li {
                    display: inline-block;
                    margin-top: 10px;
                    margin-right: 10px;
                    padding: 2px 6px;
                    background: #2981d5;
                    border-radius: 2px;
                    color: #fff;
                    opacity: .5;
                    span {
                        display: inline-block;
                        width: 102px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 12px;
                        vertical-align: top;
                    }
                    a {
                        color: #fff;
                        i {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        .ivu-table-column-center {
            text-align: center;
            color: #666;
            .ivu-table-cell {
                span.content {
                    display: inline-block;
                    width: 122px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
        .nodata-table-info-cell {
            color: #d0d0d0;
            .ivu-table-cell {
                text-align: center;
            }
        }
        .ivu-tooltip {
            .ivu-tooltip-rel {
                span {
                    display: inline-block;
                    width: 122px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
            .ivu-tooltip-popper {
                min-width: 200px;
                .ivu-tooltip-arrow {
                    border-bottom-color: #dbe5ef;
                }
                .ivu-tooltip-inner {
                    position: relative;
                    background: #fff;
                    border: 1px solid #dbe5ef;
                    box-shadow: 0 2px 4px 0 rgba(33,75,123,0.11);
                    border-radius: 2px 0 0 0;
                    color: #55abf9;
                    white-space: normal;
                    &:before {
                        position: absolute;
                        content: '';
                        top: -4px;
                        left: 16px;
                        border-width: 0 4px 4px;
                        border-color: transparent;
                        border-style: solid;
                        border-bottom-color: #fff;
                    }
                }
            }
        }
        .icons {
            &.disabled i {
                color: #d0d0d0;
            }
            a {
                margin-right: 10px;
                &:last-child {
                    margin-right: 0;
                }
                i {
                    color: #7db0e3;
                }
            }
        }
        .mdreport-table {
            margin-top: 25px;
            .ivu-table {
                &:before {
                    content: none;
                }
                &:after {
                    background: #fff;
                }
            }
            .ivu-table-wrapper {
                border-top: 1px solid #dbe5ef;
                border-left: none;
                border-right: none;
                border-bottom: none;
                th {
                    background: rgba(243,247,251,0.50);
                    border-right: 1px solid #dbe5ef;
                    border-bottom: 1px solid #dbe5ef;
                    &:last-child {
                        border-right: none;
                    }
                }
                .ivu-table-body {
                    td {
                        border-right: 1px solid #dbe5ef;
                        border-bottom: 1px solid #dbe5ef;
                        &:last-child {
                            border-right: none;
                        }
                    }
                }
            }
            .drag-table {
                .table-head,
                .table-body {
                    border-top: 1px solid #dbe5ef;
                    border-bottom: 1px solid #dbe5ef;
                    li {
                        float: left;
                        display: inline-block;
                        border-left: 1px solid #dbe5ef;
                        padding: 9px;
                        width: 158px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        text-align: center;
                        font-size: 12px;
                        &:first-child {
                            width: 170px;
                            border-left: none;
                        }
                        &.manage {
                            float: right;
                            width: 100px;
                        }
                    }
                }
                .table-body {
                    border-top: none;
                    li {
                        min-height: 37px;
                        &.namespace-item {
                            position: relative;
                            padding-left: 20px;
                            text-align: left;
                            overflow: visible;
                            .circle-status {
                                position: absolute;
                                left: 5px;
                                top: 15px;
                                display: inline-block;
                                background: #dbe5ef;
                                width: 8px;
                                height: 8px;
                                border-radius: 50%;
                                border: 1px solid #bbc7d2;
                                z-index: 10;
                            }
                        }
                    }
                    &.drop-placeholder-line {
                        height: 0;
                        overflow: hidden;
                        background: #b5d3f0;
                        border: 1px solid #b5d3f0;
                    }
                    &.source-target-item{
                        display: block !important;
                        opacity: .3;
                        .namespace-item .circle-status {
                            background: #1cd6a2;
                        }
                    }
                    .sortable-drag {
                        .namespace-item .circle-status {
                            background: #1cd6a2;
                        }
                    }
                }
            }
        }
        .add-data-btn {
            background: #f2f7fb;
            margin-top: 15px;
            border: 1px solid #e2ebf3;
            border-radius: 2px;
            width: auto;
            &.disabled {
                color: #dddee1;
                background: #fff;
            }
        }
        .order-setting {
            position: absolute;
            top: 0px;
            right: 20px;
            font-size: 12px;
            i {
                color: #d0d0d0;
            }
        }
        .order-setting-cancel {
            position: absolute;
            top: 0px;
            right: 60px;
            font-size: 12px;
            i {
                color: #d0d0d0;
            }
        }
    }
    .mdreport-style {
        padding-top: 24px;
        .ivu-form-item {
            margin-bottom: 10px;
        }
        .ivu-form-item-label {
            padding: 0 12px 0 0;
            line-height: 25px;
        }
    }
}
.monitor-model-list {
    .common-tip {
        span {
            font-size: 13px;
            color: #262626;
        }
        .monitoring-dropdown {
            margin-left: 15px;
            .monitoring-trigger {
                border: 1px solid #e2e2e2;
            }
        }
    }
    .monitor-list {
        margin-left: 71px;
        margin-top: 5px;
    }
}
</style>
