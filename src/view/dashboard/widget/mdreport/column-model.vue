<template>
    <div class="mdreport-choose-holder">
        <Form ref="modelForm" :label-width="80" :rules="ruleInline" :model="formData">
            <FormItem label="数据配置">
                <column-origin
                    ref="columnAlias"
                    :metric="metric"
                    :product="product"
                    :originColumn="originColumn"
                    ></column-origin>
                <div class="common-tip">
                    <span>统计方式</span>
                    <Select class="statistics-list" v-model="statisticsType">
                        <Option
                            v-for="type in statisticsList"
                            :value="type.name"
                            :key="type.name"
                        >{{ type.name }}</Option>
                    </Select>
                </div>
            </FormItem>
            <FormItem label="样式配置" prop="header">
                <Row>
                    <Col span="16">
                        <div class="common-tip">
                            <span>列名称</span>
                            <Input
                                class="common-input"
                                placeholder="展示的列名"
                                v-model="formData.header"
                                style="width: 260px"></Input>
                            <span class="required">*</span>
                        </div>
                    </Col>
                    <Col span="6">
                        <search-group
                            ref="group"
                            :defaultGroup="formData.group"
                            :groups="groupList"
                            width="118">
                        </search-group>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="" prop="decimals">
                <Row>
                    <Col span="6">
                        <div class="common-tip">
                            <span>小数位</span>
                            <Input class="common-input" v-model="formData.decimals" style="width: 60px"></Input>
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="common-tip">
                            <span>单位</span>
                            <Input class="common-input" v-model="formData.unit" style="width: 70px"></Input>
                        </div>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="" prop="threshold">
                <thresholds ref="threshold" :threshold="formData.threshold"></thresholds>
            </FormItem>
            <FormItem label="时间配置" prop="time">
                <time-set ref="time" :timeSet="formData.timeSet"></time-set>
            </FormItem>
            <FormItem label="高级功能">
                <a
                    class="show-more"
                    :class="{isshow: advancedFuc}"
                    href="javascript:;"
                    @click="changeAdvanceStatus()"
                ></a>
                <div v-show="advancedFuc">
                   <Row>
                        <Col span="6">
                            <div class="common-tip contrast-time">
                                <span>合计</span>
                                <Select class="statistics-list" style="width: 70px" v-model="formData.total">
                                    <Option
                                        v-for="type in total"
                                        :value="type.name"
                                        :key="type.name"
                                    >
                                        {{ type.name }}
                                    </Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import columnOrigin from './column-origin';
import searchGroup from './search-group';
import thresholds from './threshold';
import timeSet from './time';
let defaultStatistics = 'avg';
export default {
    components: {
        columnOrigin,
        thresholds,
        timeSet,
        searchGroup
    },
    props: ['dataSet', 'product', 'originColumn', 'groupList'],
    data() {
        let defaultData = this.dataSet.header ? this.dataSet : {
            statistics: defaultStatistics,
            metric: '',
            header: '',
            decimals: 2,
            unit: '',
            total: '',
            user: true
        };
        return {
            statisticsType: defaultData.statistics,
            statisticsList: [
                {
                    name: 'avg'
                }, {
                    name: 'sum'
                }, {
                    name: 'max'
                }, {
                    name: 'min'
                }, {
                    name: 'count'
                }
            ],
            total: [
                {
                    name: 'avg'
                }, {
                    name: 'sum'
                }
            ],
            // 监控项表达式
            metric: defaultData.metric,
            formData: {
                header: defaultData.header,
                decimals: defaultData.decimals,
                unit: defaultData.unit,
                threshold: defaultData.threshold,
                total: defaultData.total,
                timeSet: {
                    timeType: defaultData.timeType,
                    time: defaultData.time
                },
                group: defaultData.group,
                use: defaultData.use
            },
            ruleInline: {
                header: [{ required: true, message: '列名不可以为空', trigger: 'blur' }]
            },
            // 高级功能展示
            advancedFuc: false
        };
    },
    watch: {
        dataSet: {
            handler(val) {
                this.statisticsType = val.statistics ? val.statistics : defaultStatistics;
                this.metric = val.metric;
                this.formData = {
                    header: val.header,
                    alias: val.alias,
                    decimals: val.decimals || 2,
                    unit: val.unit,
                    use: val.use || true,
                    total: val.total,
                    threshold: val.threshold || [],
                    group: val.group,
                    timeSet: {
                        timeType: val.timeType,
                        time: val.time
                    }
                };
            },
            deep: true
        }
    },
    methods: {
        getRowData() {
            let rowData = false;
            let columnMetric = this.$refs.columnAlias.getExpression();
            this.$refs.modelForm.validate(valid => {
                if (valid && columnMetric) {
                    let timeSet = this.$refs.time.getTime();
                    rowData = {
                        source: 'column',
                        group: this.$refs.group.getGroup(),
                        metric: columnMetric,
                        statistics: this.statisticsType,
                        header: this.formData.header,
                        alias: this.formData.alias,
                        unit: this.formData.unit,
                        decimals: this.formData.decimals,
                        threshold: this.$refs.threshold.getThreshold(),
                        timeType: timeSet.type,
                        time: timeSet.time,
                        total: this.formData.total,
                        use: this.formData.use
                    };
                    if (this.dataSet.id !== undefined) {
                        rowData.id = this.dataSet.id;
                    }
                    this.$refs.columnAlias.resetExpress();
                }
            });
            return rowData;
        },
        resetForm() {
            this.$refs.modelForm.resetFields();
            this.$refs.columnAlias.resetExpress();
        },

        /**
         * 修改高级功能状态
         */
        changeAdvanceStatus() {
            this.advancedFuc = !this.advancedFuc;
        }
    }
};
</script>
<style lang="less">
    @import '../../assets/css/style.less';
    .mdreport-choose-holder {
        .common-tip {
            margin-right: 4px;
            margin-top: 9px;
            & > span {
                background: #e6f0ff;
                padding: 4px 7px;
                border-radius: 3px 0 0 3px;
                border: 1px solid #e2e2e2;
                border-right: none;
            }
            .required {
                display: inline-block;
                background: none;
                border: none;
                padding: 0 2px;
                line-height: 19px;
                color: #ff4948;
            }
            .ivu-select-selection,
            .ivu-select-placeholder,
            .ivu-select-selected-value {
                height: 24px;
                line-height: 25px;
            }
            .statistics-list {
                margin-left: -5px;
                margin-top: 3px;
                display: inline-block;
                width: 150px;
                vertical-align: top;
                .ivu-select-selection {
                    height: 26px;
                    border: 1px solid #e2e2e2;
                    border-left: none;
                    border-radius: 0 3px 3px 0;
                    span {
                        background: #fff;
                    }
                    .ivu-select-selected-value {
                        height: 24px;
                        line-height: 22px;
                        border: none;
                    }
                    .ivu-select-arrow {
                        color: #55abf9;
                    }
                }
            }
            .common-input {
                margin-left: -5px;
                margin-top: 3px;
                display: inline-block;
                width: 150px;
                height: 26px;
                vertical-align: top;
                .ivu-input {
                    height: 26px;
                }
            }
        }
        .ivu-form-item-label {
            padding: 17px 15px 10px 10px;
            font-size: 13px;
            color: #282828;
            &:before {
                display: none;
            }
        }
        .ivu-form-item {
            margin-bottom: 0;
            .ivu-form-item-error-tip {
                display: none;
            }
            &.ivu-form-item-error {
                .ivu-input {
                    border: 1px solid #ff9c51;
                }
            }
            .offset-list {
                margin-top: 12px;
                height: 26px;
                .ivu-select-selection,
                .ivu-select-placeholder,
                .ivu-select-selected-value {
                    height: 26px;
                    line-height: 25px;
                    .ivu-icon {
                        color: #55abf9;
                    }
                }
            }
        }
    }

</style>
