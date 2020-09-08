<template>
    <div class="widget-edit">
        <Card :bordered="false" class="widget-base">
            <div slot="title" class="card-title">基本信息</div>
            <Form
                label-position="left"
                ref="basicInfo"
                :model="basicInfo"
                inline
                :label-width="90"
                :rules="baseInfoValidate"
            >
                <FormItem label="组件名称：" prop="widgetTitle">
                    <Input
                        v-model="basicInfoTitle"
                        placeholder="输入组件名称"
                        style="width:400px"
                    >
                    </Input>
                </FormItem>
                <FormItem label="组件类型：" prop="widgetType">
                    <Select
                        v-model="basicInfoType"
                        style="width:200px"
                        @on-change="changeWidgetType"
                    >
                        <Option
                            v-for="item in typeList"
                            :value="item.value"
                            :key="item.value"
                        >
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Card>
        <div class="widget-content">
            <Card :bordered="false" class="widget-setting">
                <div slot="title" class="card-title">
                    组件配置
                </div>
                <div class="setting-list">
                    <div class="setting-content">
                        <template v-if="basicInfoType === 'mdtrend'">
                            <mdtrendConfig />
                        </template>
                        <template v-else-if="basicInfoType === 'mdcircle'">
                            <mdcircleConfig  />
                        </template>
                        <template v-else-if="basicInfoType === 'mdtable'">
                            <mdreportConfig
                            :orderStatus="orderStatus"
                            @changeOrder="changeOrder" />
                        </template>
                        <template v-else-if="basicInfoType === 'billboard'">
                            <billboardConfig
                                :orderStatus="orderStatus"
                                @changeOrder="changeOrder"/>
                        </template>
                        <template v-else-if="basicInfoType === 'eventRiver'">
                            <eventRiverConfig></eventRiverConfig>
                        </template>
                        <template v-else>
                            暂时不支持该种类型组件配置~
                        </template>
                    </div>
                    <div class="action-list">
                        <Button type="ghost" :class="{'disabled': orderStatus}" @click="cancel()">取消</Button>
                        <Button type="primary" :class="{'disabled': orderStatus}" @click="saveWidget()">提交</Button>
                        <Button
                            class="preview-btn"
                            :class="{'disabled': orderStatus}"
                            @click="showPreview()"
                        >预览</Button>
                    </div>
                </div>
            </Card>
            <Card :bordered="false" class="widget-view">
                <div slot="title" class="card-title">
                    组件预览
                </div>
                <div class="widget-view-content">
                    <div class="no-preview" v-if="!preview"></div>
                    <div class="preview" v-else>
                        <template v-if="basicInfoType === 'mdtrend'">
                            <NvMDTrend :conf="conf" dataUrl="api/get/trend"/>
                        </template>
                        <template v-else-if="basicInfoType === 'mdcircle'">
                            <NvMDCircle :conf="conf" />
                        </template>
                        <template v-else-if="basicInfoType === 'mdtable'">
                            <NvMDReport :conf="conf" />
                        </template>
                        <template v-else-if="basicInfoType === 'billboard'">
                            <NvMDBillboard :conf="conf" />
                        </template>
                         <template v-else-if="basicInfoType === 'eventRiver'">
                            <NvMDEventRiverView :conf="conf" :params="getErParams()"/>
                        </template>
                        <template v-else>
                            暂时不支持该种类型组件配置~
                        </template>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import apiConfig from '../api/config';
import util from '../util/util';
import m from 'moment';

// 引入组件配置文件
import mdtrendConfig from './mdtrend/mdtrend.vue';
import mdcircleConfig from './mdcircle/mdcircle.vue';
import mdreportConfig from './mdreport/mdreport.vue';
import billboardConfig from './billboard/billboard.vue';
import eventRiverConfig from './eventRiver/eventRiver.vue';
export default {
    name: 'widgetedit',
    components: {
        mdtrendConfig,
        mdcircleConfig,
        mdreportConfig,
        billboardConfig,
        eventRiverConfig
    },
    created() {
        // 获取query中的信息
        this.id = this.$route.query.id;
        if (typeof this.id !== 'undefined') {
            this.$store.dispatch('getConfig', {
                id: this.id
            });
        }

    },
    data() {
        return {
            isLoad: false,
            basicInfo: {
                widgetTitle: '',
                widgetType: ''
            },
            typeList: [
                {
                    label: '趋势图',
                    value: 'mdtrend'
                },
                {
                    label: '仪表图',
                    value: 'mdcircle'
                },
                {
                    label: '面板',
                    value: 'billboard'
                },
                {
                    label: '表格',
                    value: 'mdtable'
                },
                {
                    label: '事件流图',
                    value: 'eventRiver'
                }
            ],
            baseInfoValidate: {
                widgetTitle: [{ required: true, message: '请填写', trigger: 'blur' }],
                widgetType: [{ required: true, message: '请选择', trigger: 'change' }]
            },
            preview: false,
            conf: {},
            orderStatus: false
        };
    },
    methods: {
        getWidgetConfig() {
            const widgetConfig = this.$store.state.dashboard.widgetConfig || {};
            widgetConfig.title = this.basicInfo.widgetTitle;
            widgetConfig.data = widgetConfig.data || {};
            widgetConfig.datasource = widgetConfig.datasource || {};
            let customParams = {};
            const datasourceParams = widgetConfig.datasource.params;
            if (datasourceParams) {
                try {
                    widgetConfig.datasource.params = JSON.parse(widgetConfig.datasource.params);
                    customParams = {params: JSON.parse(datasourceParams)};
                }
                catch (err) {
                    customParams = {params: datasourceParams};
                }
            }
            Object.assign(widgetConfig.data, customParams);
            return Object.assign({
                type: this.basicInfo.widgetType
            }, {configure: JSON.stringify(widgetConfig)});
        },
        saveWidget() {
            if (!this.orderStatus) {
                this.$refs.basicInfo.validate(valid => {
                    if (valid) {
                        let config = this.getWidgetConfig();
                        // Todo
                        // 校验widgetConfig
                        this.save(config);
                    }
                    else {
                        this.$Message.error('表单校验失败');
                    }
                });
            }
        },
        changeOrder(status) {
            this.orderStatus = status.isOrdered;
        },
        showPreview() {
            if (!this.orderStatus) {
                this.conf = JSON.parse(this.getWidgetConfig().configure);
                this.preview = true;
            }
        },
        save(config, callback) {
            let params = Object.assign({}, config, {
                id: this.id
            });
            this.$request({
                url: util.getApi(apiConfig.widgetSave),
                method: 'post',
                data: params
            }).then(response => {
                if (response.data.success) {
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                    else {
                        this.$Message.success('保存成功');
                        // 返回上一个页面
                        this.$router.back();
                        // 重置页面数据
                        this.basicInfoType = '';
                        this.$store.commit('RESET_CONFIG');
                    }
                }
                else {
                    this.$Message.error(response.data.message);
                }
            });
        },
        /**
         * 取消操作
         */
        cancel() {
            if (!this.orderStatus) {
                this.$router.back();
                // 重置页面数据
                this.basicInfoType = '';
                this.$store.commit('RESET_CONFIG');
            }
        },

        /**
         * 修改组件类型
         */
        changeWidgetType(type) {
            if (this.isLoad) {
                if (this.$store.state.dashboard.widgetConfig
                && this.$store.state.dashboard.widgetConfig.data) {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '切换组件类型后，组件配置将重置，是否继续切换？',
                        onOk: () => {
                            this.$store.commit('RESET_CONFIG');
                            this.orderStatus = false;
                            this.preview = false;
                            this.basicInfoType = type;
                        },
                        onCancel: () => {
                            this.basicInfo.widgetType = this.basicInfoType;
                        }
                    });
                }
                else if (this.$store.state.dashboard.widgetConfig
                    && !this.$store.state.dashboard.widgetConfig.data
                    && this.$store.state.dashboard.widgetConfig.style) {
                    this.$store.commit('RESET_CONFIG');
                    this.basicInfoType = type;
                }
                else {
                    this.basicInfoType = type;
                }
            }

            if (this.$store.state.dashboard.widgetType) {
                this.isLoad = true;
            }
        },
        startOrder() {
            this.orderStatus = true;
        },
        getErParams() {
            return {
                start: m().subtract(2, 'h').format('YYYY-MM-DD HH:mm:ss'),
                end: m().format('YYYY-MM-DD HH:mm:ss'),
            }
        }
    },
    computed: {
        basicInfoTitle: {
            get() {
                let widgetTitle = this.$store.state.dashboard.widgetTitle;
                this.basicInfo.widgetTitle = widgetTitle;
                return widgetTitle;
            },
            set(value) {
                this.basicInfo.widgetTitle = value;
                this.$store.commit('UPDATE_TITLE', {title: value});
            }
        },
        basicInfoType: {
            get() {
                let widgetType = this.$store.state.dashboard.widgetType
                    !== 'WIDGETS'
                    ? (this.$store.state.dashboard.widgetType
                        ? this.$store.state.dashboard.widgetType
                        : 'mdtrend')
                    : 'mdtrend';
                this.basicInfo.widgetType = widgetType;
                return widgetType;
            },
            set(value) {
                this.basicInfo.widgetType = value;
                this.$store.commit('UPDATE_TYPE', {type: value});
            }
        }
    },
    watch: {

    }
};
</script>

<style lang="less">
.clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
}
.clearfix {
    zoom: 1;
}
.widget-edit {
    position: relative;
    margin: -20px;
    background: #f5f7f9;
    min-height: 500px;
    .ivu-select-single .ivu-select-selection {
        height: 32px;
        .ivu-select-placeholder {
            height: 22px;
            line-height: 22px;
        }
        .ivu-select-selected-value {
            height: 22px;
            line-height: 22px;
        }
    }
    .ivu-select-item {
        padding: 7px 16px;
    }
    .widget-content {
        position: relative;
        height: 588px;
    }
    .widget-base,
    .widget-view,
    .widget-setting {
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
        border-radius: 2px;
    }
    .widget-base {
        .ivu-select-single .ivu-select-selection {
            .ivu-select-placeholder {
                height: 30px;
                line-height: 30px;
            }
            .ivu-select-selected-value {
                height: 30px;
                line-height: 30px;
            }
        }
        .ivu-form-item {
            margin-bottom: 0;
        }
    }
    .widget-setting {
        width: 460px;
        height: 568px;
        float: left;
        .setting-content {
            height: 450px;
            overflow-y: scroll;
        }
        .action-list {
            position: absolute;
            bottom: 20px;
            right: 0;
            .ivu-btn {
                float: left;
                margin-right: 20px;
            }
            .preview-btn {
                background: #00BD57;
                color: #fff;
            }
        }
    }
    .widget-view {
        margin-left: 480px;
        margin-top: 20px;
        min-height: 568px;
        .widget-view-content {
            text-align: center;
            .no-preview {
                background: url(../assets/img/widget-preview.png);
                width: 520px;
                height: 302px;
                background-size: 520px;
                display: inline-block;
                margin-top: 50px;
            }
        }
    }

    .ivu-card-head {
        padding: 10px 15px;
        border-bottom: none;
        color: #383636;
        font-size: 14px;
        .card-title {
            font-size: 14px;
            line-height: 20px;
            font-weight: normal;
            position: relative;
        }
    }
    .crumb-nav {
        position: relative;
        top: -12px;
        width: 100%;
        z-index: 10;
        padding: 0 24px;
        margin: 0 -24px;
        box-sizing: content-box;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        .ivu-card-body {
            float: right;
            span {
                display: inline-block;
                font-size: 12px;
            }
            .type-list {
                display: inline-block;
                width: 150px;
            }
        }

    }
}
</style>
