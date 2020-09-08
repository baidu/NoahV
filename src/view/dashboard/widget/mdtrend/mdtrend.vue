<template>
    <div class="mdtrend-config">
        <baseConfig>
            <div slot="datasource" class="mdtrend-data">
                <defaultDatasource />
            </div>
            <div slot="style" class="mdtrend-style">
                <Form :model="style" :label-width="50">
                    <FormItem label="类型">
                        <Select
                            v-model="style.displayType"
                        >
                            <Option value="line" key="line">折线图</Option>
                            <Option value="column" key="column">柱状图</Option>
                            <Option value="stack" key="stack">堆叠柱状图</Option>
                            <Option value="area" key="area">面积图</Option>
                            <Option value="normal" key="normal">堆叠面积图</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="单位">
                        <Input class="input-class" v-model="style.unit" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="空处理">
                        <Select
                            v-model="style.nullPointMode">
                            <Option value="zero" key="zero">显示为0</Option>
                            <Option value="connect" key="connect">连线</Option>
                            <Option value="null" key="null">断点</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="阈值">
                        <Input class="input-class" v-model="style.threshold" placeholder=""></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="time">
                <defaultTime type="fixed" timevalue="before(20d)" ref="defaultTime"/>
            </div>
            <div slot="link">
                <defaultLink />
            </div>
        </baseConfig>
    </div>
</template>

<script>
import baseConfig from '../configuration';
import defaultDatasource from '../common/defaultDatasource';
import defaultLink from '../common/defaultLink';
import defaultTime from '../common/defaultTime';
export default {
    name: 'mdtrend-config',
    components: {
        baseConfig,
        defaultDatasource,
        defaultLink,
        defaultTime
    },
    props: {
        type: String
    },
    mounted() {
        let style = this.$store.state.dashboard.widgetConfig.style || {
            displayType: 'line',
            unit: '',
            nullPointMode: 'zero',
            threshold: ''
        };
        this.style = style;
    },
    data() {
        return {
            // 单记录数据
            style: {}
        };
    },
    methods: {
    },
    watch: {
        style: {
            handler(val) {
                this.$store.commit('UPDATE_CONFIG', {style: val});
            },
            deep: true
        }
    }
};
</script>

<style lang="less">
@import '../../assets/css/style.less';
.mdtrend-config {
    .mdtrend-style {
        padding-top: 24px;
        .ivu-form-item {
            margin-bottom: 10px;
        }
        .ivu-form-item-label {
            padding: 0 12px 0 0;
            line-height: 25px;
        }
        .ivu-form-item-content {
            line-height: 25px;
            .input-class {
                width: 72px;
                height: 25px;
                .ivu-input {
                    height: 25px;
                }
            }
            .label-class {
                margin-right: 10px;
            }
            .ivu-select-single {
                width: 101px;
                .ivu-select-selection {
                    height: 25px;
                }
            }
        }
    }
}
</style>
