<template>
    <div :class="getCls('table')">
        <Table
            :highlight-row="highlightRow"
            :columns="columnsData"
            :data="tableData"
            :border="border"
            :loading="loadingConf"
            :stripe="stripe"
            :no-data-text="noDataText"
            @on-sort-change="tableSort"
            @on-selection-change="selectionChange"
            @on-row-click="chooseRow"
        >
            <h1
                slot="header"
                class="tabletpl-header"
                v-if="title"
            >
                {{title}}
            </h1>
            <p
                slot="footer"
                class="tabletpl-footer"
                v-if="tips"
            >
                {{tips}}
            </p>
        </Table>
        <div style="margin: 10px;overflow: hidden" v-if="showPager">
            <div style="float: right;">
                <Page
                    :total="paginationData.totalCount"
                    :current="paginationData.pageNo"
                    :page-size-opts="paginationData.pageSizeOptions"
                    :page-size="paginationData.pageSize"
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    :show-sizer="showsizer"
                    :show-elevator="showelevator"
                    placement="top"
                >
                </Page>
            </div>
        </div>
    </div>
</template>
<script>
import u from 'underscore';
import getClassName from '../utils.js';

const defaultPageSizeOptions = [10, 20, 30, 40];
const transferTableRes = (dataMap, res) => {
    // TODO
    return res;
};
export default {
    props: {
        url: String,
        columns: Array,
        pagination: {
            type: [Object, Boolean],
            default: true
        },
        title: String,
        method: String,
        tips: String,
        rowSelect: [Boolean, String],
        tdata: Array,
        showsizer: {
            type: Boolean,
            default: true
        },
        // 是否单独显示加载中动画
        showLoading: {
            type: Boolean,
            default: true
        },
        loading: Boolean,
        params: Object,
        action: Object,
        dataFilter: Function,
        page: Object,
        dataMap: Object,
        border: {
            type: Boolean,
            default: false
        },
        stripe: {
            type: Boolean,
            default: false
        },
        noDataText: {
            type: String,
            default: '暂无数据'
        },
        showelevator: {
            type: Boolean,
            default: false
        },
        highlightRow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 当前表格展示的数据
            tableData: [],
            // 当前选中的item
            selection: [],
            // loading
            loadingConf: false,
            // 表格数据源
            tableDatasource: this.tdata || [],
            // 定义全局params，在获取表格提交请求参数是会合并该参数
            extraParams: {},
            // 是否需要展示分页组件
            showPager: this.pagination !== false,
            // 分页数据
            paginationData: {
                pageNo: this.pagination ? this.pagination.currentPage || 1 : 1,
                pageSize: this.pagination ? this.pagination.defaultPageSize || 10 : 10,
                pageSizeOptions: this.pagination ? this.pagination.pageSizeOptions
                    || defaultPageSizeOptions : defaultPageSizeOptions
            }
        };
    },
    watch: {
        // tdata数据源监听，变化的时候处理
        tdata: {
            handler(data) {
                this.tableDatasource = data;
                this.tableData = this.currentTableData();
            },
            deep: true
        },
        page: {
            handler(data) {
                Object.assign(this.paginationData, data);
            },
            deep: true
        },
        params: {
            handler() {
                this.reload();
            },
            deep: true
        },
        loading(value) {
            this.handlerLoading(value);
        }
    },
    computed: {
        /**
         * 表格列配置数据处理
         *
         * @return {Array} 处理之后的列配置信息
         */
        columnsData() {
            let columns = this.columns || [];
            // 处理自定义action配置
            if (this.action && this.action.title) {
                let actionConfig = this.action;
                let actionRow = {};
                actionRow.title = actionConfig.title;
                actionRow.width = actionConfig.width;
                actionRow.render = (h, obj) => this.actionItemRender(h, obj, actionConfig);
                columns.push(actionRow);
            }
            // 处理多选框
            if (this.rowSelect && columns.length > 0 && columns[0].type !== 'selection') {
                columns.unshift({
                    type: 'selection',
                    width: 60,
                    align: 'center'
                });
            }
            return columns.map(item => {
                if (typeof item.render === 'function') {
                    return item;
                }
                item.render = (h, obj) => this.tableItemRender(h, obj, item);
                return item;
            });
        },
        /**
         * 远程分页判断
         *
         * @return {Boolean} 是否远程分页
         */
        remotePage() {
            if (this.pagination && this.pagination.remote) {
                return true;
            }
            return false;
        }
    },
    created() {
        if (this.url) {
            this.handlerPagination();
            this.getTableData();
        }
        else if (this.tdata && this.tdata.length > 0) {
            this.tableData = this.currentTableData();
        }
    },
    methods: {
        /**
         * 刷新table
         */
        reload() {
            if (this.url) {
                this.getTableData();
            }
        },
        /**
         * 获取类名
         *
         * @param {String} postfix 后缀名称
         * @return {Object} 样式集合
         */
        getCls(postfix) {
            return getClassName.getComponentWrapperCls(postfix);
        },
        /**
         * 获取发送请求的配置
         *
         * @return {Object} 请求配置
         */
        getAjaxConfig() {
            let config = {
                url: this.url
            };
            let method = 'post';
            if (this.method) {
                method = this.method;
            }
            method = method.toLowerCase();
            let params = {};
            Object.assign(params, this.extraParams, this.params);
            if (method === 'get' || method === 'delete') {
                config.params = params;
            }
            else {
                config.data = params;
            }
            config.method = method;
            config.showLoading = this.showLoading === false;
            return config;
        },
        /**
         * 获取表格数据
         *
         */
        getTableData() {
            if (!this.url) {
                return;
            }
            const config = this.getAjaxConfig();
            this.handlerLoading(true);
            this.$request(config).then(response => {
                const res = response.data;
                if (res.success) {
                    let transferRes = res;
                    if (this.dataMap) {
                        transferRes = transferTableRes(this.dataMap, res);
                    }
                    this.tableDatasource = transferRes.data;
                    this.tableData = this.currentTableData();
                    // 修改分页信息
                    if (this.remotePage) {
                        // 处理当前页码无数据的情况
                        if (this.tableDatasource && this.tableDatasource.length === 0) {
                            if (transferRes.page && transferRes.page.pageNo > 1) {
                                this.extraParams.pageNo = transferRes.page.pageNo - 1;
                                this.getTableData();
                                return;
                            }
                        }
                        Object.assign(this.paginationData, transferRes.page);
                    }
                    else {
                        this.paginationData.totalCount = this.tableDatasource.length;
                    }
                    this.handlerLoading(false);
                }
                else {
                    this.$Message.error(res.message ? res.message : res);
                    this.handlerLoading(false);
                }
            }).catch(() => {
                this.handlerLoading(false);
            });
        },
        /**
         * 渲染表格列信息
         *
         * @param {Function} h 元素创建方法
         * @param {Object} obj 当前表格的数据
         * @param {string} item 当前列的配置
         *
         * @return {Function} 返会元素创建后的结果
         */
        tableItemRender(h, obj, item) {
            let className;
            let value = obj.row[item.key];
            let label = value;
            let url;
            let content;
            let fontColor;
            if (item.showError) {
                if (value instanceof Array) {
                    if (value[1] === false) {
                        className = 'highlight-error';
                        fontColor = '#f00';
                    }
                    label = value[0];
                }
            }
            if (item.label) {
                label = item.label;
            }
            if (item.link) {
                url = this.handlerTableLink(item.link, obj.row);
                return h('a', {
                    attrs: {
                        href: url,
                        target: item.target || '',
                        class: className
                    },
                    style: fontColor || {color: item.color}
                }, label);
            }
            else {
                content = label;
                return h('span', {
                    attrs: {
                        class: className
                    },
                    style: fontColor || {color: item.color}
                }, content);
            }
        },
        /**
         * 处理表格中的链接，主要替换类似{}参数数据
         *
         * @param {String} link 需要处理的原始链接
         * @param {Object} data 替换数据源
         * @param {Boolean} unencode 是否需要编码
         *
         * @return {Function} 替换之后的链接
         */
        handlerTableLink(link, data, unencode) {
            if (/\{.*?\}/g.test(link)) {
                const matches = link.match(/\{.*?\}/g);
                matches.map(item => {
                    let key = item.substring(1, item.length - 1);
                    if (data && data[key] && data[key] !== '') {
                        if (unencode === true) {
                            link = link.replace(item, data[key]);
                        }
                        else {
                            link = link.replace(item, encodeURIComponent(data[key]));
                        }
                    }
                    else {
                        link = link.replace(item, key);
                    }
                    return null;
                });
            }
            return link;
        },
        /**
         * 处理action->confirm的链接，替换row中类似{}参数数据
         *
         * @param {String} link 需要处理的原始链接
         * @param {Object} data 替换数据源
         * @param {Boolean} unencode 是否需要编码
         *
         * @return {string} 替换之后的链接
         */
        handlerConfirmLink(link, data, unencode) {
            if (/\{.*?\}/g.test(link)) {
                const matches = link.match(/\{.*?\}/g);
                matches.map(item => {
                    let key = item.substring(1, item.length - 1);
                    if (data && data[key] && data[key] !== '') {
                        if (unencode === true) {
                            link = link.replace(item, data[key]);
                        }
                        else {
                            link = link.replace(item, encodeURIComponent(data[key]));
                        }
                    }
                    return null;
                });
            }
            return link;
        },
        /**
         * 处理表格排序
         *
         * @param {Object} data 配置数据
         */
        tableSort(data) {
            if (data.column && data.column.sortable === 'custom') {
                this.extraParams.sortKey = data.key;
                this.extraParams.sortOrder = data.order;
                this.getTableData();
                this.$emit('on-column-sort', data);
            }
        },
        /**
         * 处理选择列的情况
         *
         */
        selectionChange(selection) {
            this.selection = selection;
            this.$emit('on-selection-change', selection);
        },
        /**
         * 获取已经选中的列
         *
         * @return {Array} 选中的列信息
         */
        getSelectItem() {
            return this.selection;
        },
        /**
         * 页码变化
         *
         * @param {Number} page 变化之后的页码
         */
        pageChange(page) {
            this.paginationData.pageNo = page;
            if (this.pagination && this.pagination.remote === true) {
                this.extraParams.pageNo = page;
                this.extraParams.pageSize = this.paginationData.pageSize;
                this.getTableData();
            }
            else {
                this.tableData = this.currentTableData();
            }
            this.$emit('on-page-change', this.paginationData);
        },
        /**
         * 页码变化
         *
         * @param {Number} 变化之后的每页条数
         */
        pageSizeChange(pageSize) {
            this.paginationData.pageSize = pageSize;

            // iview的pageSizeChange会自动调用pagechange(1)，所以只有当前页码为1的时候，需要处理表格数据
            if (this.paginationData.pageNo === 1) {
                if (this.showPager && this.remotePage) {
                    this.extraParams.pageNo = this.paginationData.pageNo;
                    this.extraParams.pageSize = pageSize;
                    this.getTableData();
                }
                else {
                    this.tableData = this.currentTableData();
                }
            }
            this.$emit('on-page-size-change', this.paginationData);
        },
        /**
         * 处理分页逻辑
         *
         */
        handlerPagination() {
            if (this.remotePage) {
                this.extraParams.pageNo = this.paginationData.pageNo;
                this.extraParams.pageSize = this.paginationData.pageSize;
            }
        },
        /**
         * 处理当前展示渲染的数据
         *
         * @return {Array} 当前需要展示的数据
         */
        currentTableData() {
            let datasource = this.tableDatasource || this.tdata || [];
            let paginationData = this.paginationData;
            let currentTableData = [];

            if (!this.showPager) {
                currentTableData = datasource;
            }

            else if (this.remotePage) {
                // 后端分页
                currentTableData = datasource;
            }
            else {
                // 前端分页
                currentTableData = datasource.slice(paginationData.pageSize * (paginationData.pageNo - 1),
                    paginationData.pageSize * paginationData.pageNo);
                this.paginationData.totalCount = datasource.length;
            }
            // 派发事件
            this.$emit('on-data-change', currentTableData);

            if (this.dataFilter && typeof this.dataFilter === 'function') {
                // 自定义数据方法
                return this.dataFilter(currentTableData);
            }
            else {
                return currentTableData;
            }
        },
        /**
         * 处理Action配置
         * @param {Object} h creatElemet
         * @param {Array} actionConfig action配置信息
         *
         * @return {Object} Action内容
         */
        actionItemRender(h, obj, actionConfig) {
            let actionList = [];
            actionConfig.list.forEach(item => {
                let props = {};
                let style = Object.assign({
                    marginRight: '5px',
                    cursor: 'pointer',
                    display: 'inline-block'
                }, item.style);
                let on;
                let label = item.label || '';
                let actionItem;
                item.type = item.type || 'span';
                switch (item.type) {
                    case 'sa-icon':
                        props = Object.assign({
                            type: item.icon || 'more'
                        }, item.props);
                        break;
                    case 'nv-icon':
                        props = Object.assign({
                            type: item.icon || 'more'
                        }, item.props);
                        break;
                    case 'Button':
                        props = Object.assign({
                            type: item.btnType || 'primary',
                            size: item.size || 'small'
                        }, item.props);
                        break;
                    case 'Label':
                        break;
                }
                if (item.event) {
                    // 处理自定义事件
                    if (item.event.clickHandler && typeof (item.event.clickHandler) === 'function') {
                        // click事件
                        on = {
                            click: () => {
                                this.handlerActionClick(item.event, obj.row);
                            }
                        };
                    }
                }
                if (item.confirm) {
                    on = {
                        click: () => {
                            this.handlerActionConfirm(item.confirm, obj.row);
                        }
                    };
                }
                if (item.link) {
                    actionItem = h('a', {
                        attrs: {
                            href: this.handlerTableLink(item.link, obj.row),
                            target: item.target || '_self',
                            class: item.className ? item.className + '' : 'action-link',
                            title: item.title || null
                        },
                        style: style
                    }, [
                        h(item.type, {
                            props: props,
                            style: style,
                            on: on
                        }, label)
                    ]);
                }
                else if (item.type === 'sa-icon' || item.type === 'nv-icon') {
                    actionItem = h('span', {
                        on: on,
                        attrs: {
                            class: item.className ? item.className + '' : 'action-icon',
                            title: item.title || null
                        }
                    }, [
                        h(item.type, {
                            props: props,
                            style: style
                        }, label)
                    ]);
                }
                else {
                    actionItem = h(item.type, {
                        attrs: {
                            class: item.className ? item.className + '' : 'action-item',
                            title: item.title || null
                        },
                        props: props,
                        style: style,
                        on: on
                    }, label);
                }
                actionList.push(actionItem);
            });
            return h('div', actionList);
        },
        handlerActionClick(event, row) {
            // 处理自定义click事件
            try {
                event.clickHandler(row);
            }
            catch (e) {
                this.$Message.error(e.name + ':' + e.message);
            }
        },
        handlerActionConfirm(confirm, row) {
            this.$Modal.confirm({
                title: confirm.title || '确认操作',
                content: confirm.content ? this.handlerTableLink(confirm.content, row, true) : '操作提示',
                cancelText: confirm.cancelText || '取消',
                okText: confirm.okText || '确认',
                width: confirm.width || 416,
                onOk: () => {
                    if (confirm.api) {
                        let config = {};
                        config.data = confirm.params || {};
                        config.url = this.handlerConfirmLink(confirm.api, row, true);
                        config.method = confirm.method || 'post';
                        config.method = config.method.toLowerCase();
                        config.pathArgs = confirm.pathArgs || {};
                        if (confirm.item) {
                            u.each(confirm.item, (value, key) => {
                                config.data[key] = this.handlerTableLink(value, row, true);
                            });
                        }
                        if (config.method === 'get' || config.method === 'delete') {
                            config.params = config.data || {};
                            delete config.data;
                        }
                        this.$request(config).then(response => {
                            const res = response.data;
                            if (res.success) {
                                this.$Message.success(confirm.successTip || '操作成功');
                                if (confirm.autoFresh) {
                                    this.getTableData();
                                }
                            }
                            else {
                                this.$Message.error(res.message ? res.message : response);
                            }
                            if (confirm.callback && typeof confirm.callback === 'function') {
                                confirm.callback(row);
                            }
                        }).catch(err => {
                            this.$Message.error(err);
                        });
                    }
                    else if (confirm.callback && typeof confirm.callback === 'function') {
                        confirm.callback(row);
                    }
                }
            });
        },
        handlerLoading(loading) {
            // 配置不展示
            if (this.showLoading === false) {
                this.loadingConf = false;
                return;
            }
            this.loadingConf = loading;
        },
        chooseRow(currentRow, index) {
            // 选中当行事件
            this.$emit('on-current-row-click', currentRow, index);
        }
    }
};
</script>

