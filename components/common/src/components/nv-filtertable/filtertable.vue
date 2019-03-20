<template>
    <div :class="getCls('filter-table')">
        <NvForm
            ref="noahvFilterTableTplRefForm"
            :items="items"
            :action="formAction"
            :layout="filterLayout"
            :handlerSort='true'
            :method="method"
            :labelwidth="labelwidth"
            :params="params"
            :showLoading="formShowLoading"
        />
        <NvTable
            ref="noahvFilterTableTplRefTable"
            :columns="columns"
            :tips="tips"
            :tdata="tData"
            :rowSelect="rowSelect"
            :title="title"
            :params="params"
            :pagination="pagination"
            :action="action"
            :page="page"
            :border="border"
            :dataMap="dataMap"
            :showLoading="showLoading"
            :loading="loading"
            :stripe="stripe"
            :dataFilter="dataFilter"
            :showsizer="showsizer"
            :noDataText="noDataText"
            :showElevator="showelevator"
            @on-page-size-change="pageSizeChange"
            @on-page-change="pageChange"
            @on-column-sort="columnSort"
            @on-selection-change="selectionChange"
            @on-data-change="dataChange"
        />
    </div>
</template>
<script>
import getClassName from '../utils.js';

export default {
    props: {
        items: Array,
        columns: Array,
        layout: String,
        url: String,
        tips: String,
        title: String,
        pagination: [Boolean, Object],
        method: String,
        rowSelect: {
            type: Boolean,
            default: false
        },
        action: Object,
        labelwidth: Number,
        params: Object,
        dataMap: Object,
        border: {
            type: Boolean,
            default: false
        },
        showLoading: {
            type: Boolean,
            default: true
        },
        stripe: {
            type: Boolean,
            default: false
        },
        dataFilter: Function,
        showsizer: {
            type: Boolean,
            default: true
        },
        autoLoadData: {
            type: Boolean,
            default: true
        },
        noDataText: String,
        showelevator: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: false,
            // 如果配置了不展示组件自有loading，那将展示默认的数据请求loading
            formShowLoading: this.showLoading === false,
            tData: [],
            page: {},
            filterLayout: this.layout || 'inline',
            submitAggr: {},
            extraParams: this.params || {}
        };
    },
    created() {
        const formAction = [
            {
                name: 'submit',
                type: 'primary',
                title: '查询',
                submitUrl: this.url,
                beforeXhr() {
                    this.loading = true;
                },
                callback: (FieldsValue, data) => {
                    if (!this.url) {
                        this.$Message.error('请配置表格数据来源API');
                        return;
                    }
                    this.tData = data.data;
                    this.loading = false;
                    if (this.pagination && this.pagination.remote === true) {
                        // 处理当前页码无数据的情况
                        if (this.tData && this.tData.length === 0) {
                            if (data.page.pageNo > 1) {
                                data.page.pageNo = data.page.pageNo - 1;
                                this.handPageEvent(data.page);
                                return;
                            }
                        }
                        this.page = data.page;

                        // TODO: 后续可以用dataMap替换
                    }
                    this.$emit('on-data-filter', this.tData);
                },
                errorCallBack: () => {
                    this.loading = false;
                }
            }
        ];
        this.formAction = formAction;
    },
    mounted() {
        if (this.pagination) {
            this.extraParams.pageSize = this.pagination.defaultPageSize || 10;
            this.extraParams.pageNo = this.pagination.currentPage || 1;
        }
        this.$nextTick(() => {
            if (this.autoLoadData !== false) {
                this.$refs.noahvFilterTableTplRefForm.fireSubmitEvent(this.extraParams);
            }
        });
    },
    methods: {
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
         * 刷新filterTable
         */
        reload() {
            if (this.url) {
                this.$refs.noahvFilterTableTplRefForm.fireSubmitEvent(this.extraParams);
            }
        },
        columnSort(data) {
            this.extraParams.sortKey = data.key;
            this.extraParams.sortOrder = data.order;
            this.$refs.noahvFilterTableTplRefForm.fireSubmitEvent(this.extraParams);
            this.$emit('on-column-sort', data);
        },
        getSelectItem() {
            if (this.rowSelect) {
                return this.$refs.noahvFilterTableTplRefTable.getSelectItem();
            }
            return [];
        },
        pageChange(page) {
            this.handPageEvent(page);
            this.$emit('on-page-change', page);
        },
        pageSizeChange(page) {
            // iview的pageSizeChange会自动调用pagechange(1)，所以pageNo不为1时无需再处理数据
            if (page.pageNo === 1) {
                this.handPageEvent(page);
            }
            this.$emit('on-page-size-change', page);
        },
        handPageEvent(page) {
            if (this.pagination && this.pagination.remote === true) {
                this.extraParams.pageNo = page.pageNo;
                this.extraParams.pageSize = page.pageSize;
                this.$refs.noahvFilterTableTplRefForm.fireSubmitEvent(this.extraParams);
            }
        },
        selectionChange(selection) {
            this.$emit('on-selection-change', selection);
        },
        dataChange(data) {
            this.$emit('on-data-change', data);
        }
    }
};
</script>

