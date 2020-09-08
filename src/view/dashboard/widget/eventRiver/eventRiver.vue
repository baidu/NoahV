<template>
    <div class="event-river-config">
        <baseConfig :itemlist="itemlist">
            <div slot="datasource" class="mdtrend-data">
                <defaultDatasource />
            </div>
            <div slot="event">
                <NvTextLine :width="400" :height="200"
                            v-model="erData"
                            @on-blur="updateErData"
                            :options="options"></NvTextLine>
            </div>
            <div slot="style" class="mdtrend-style">
                <Form :model="style" class="event-river-style">
                    <FormItem label="类型">
                        <Select v-model="style.type" style="width: 100px">
                            <Option value="image" key="image">图</Option>
                            <Option value="list" key="list">列表</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="time">
                <defaultTime type="fixed" timevalue="before(20d)" ref="defaultTime"/>
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
        name: "event-river-config",
        components: {
            baseConfig,
            defaultDatasource,
            defaultLink,
            defaultTime
        },
        data() {
            return {
                erData: '',
                style: {},
                itemlist: [
                    {
                        name: '数据源配置',
                        slot: 'datasource'
                    },
                    {
                        name: '事件配置',
                        slot: 'event'
                    },
                    {
                        name: '样式配置',
                        slot: 'style'
                    },
                    {
                        name: '时间配置',
                        slot: 'time'
                    }
                ],
                options: {
                    lineNumbers: true,
                    mode: 'text/javascript'
                }
            };
        },
        mounted() {
            this.erData = JSON.stringify(this.$store.state.dashboard.widgetConfig.data, null, '\t') || '';
            this.style = this.$store.state.dashboard.widgetConfig.style || {};
        },
        methods: {
            updateErData() {
                this.$store.commit('UPDATE_CONFIG', {data: JSON.parse(this.erData)});
            }
        },
        watch: {
            style: {
                handler(val) {
                    this.$store.commit('UPDATE_CONFIG', {style: val});
                },
                deep: true
            }
        }
    }
</script>

<style lang="less">
    .ui-eventriver-container {
        .ui-event-holder {
            .ui-legends-holder {
                &:after {
                    display: none;
                }
            }
        }
    }
    .event-river-config {
        .event-river-style {
            padding-top: 5px;
        }
        .ivu-select-single {
            .ivu-select-selection {
                height: 22px;
                line-height: 22px;
            }
        }
    }
</style>
