<template>
    <div class="dashboard-view">
        <div class="dashboard-view-header">
            <div class="dashboard-name">
                {{title}}
            </div>
            <div class="dashboard-back">
                <a href="#/dashboard/list">返回</a>
            </div>
        </div>
        <SaDatePicker
            type="daterangetime"
            dateFormat="YYYY-MM-DD HH:mm"
            :options="dateOptions"
            :value="value"
            @on-change="timeChange"
            ref="daterange"
        >
        </SaDatePicker>

        <div class="auto-refresh" v-if="refresh">
            <span class="refresh-title">自动刷新：</span>
            <i-switch size="large" @on-change="refreshSwitch" v-model="refreshValue" :disabled="switchDisable">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
            </i-switch>
            <!-- <div class="refresh-btn">
                <sa-icon type="refresh"></sa-icon>
            </div> -->
            <div class="refresh-tip" v-if="showTimeLimitTip">
                <sa-icon type="warning-circle-o"></sa-icon>
                时间段超过5小时，刷新关闭
            </div>
        </div>
        <div class="view-content">
            <div class="row" v-for="row in wigetData" >
                <div :class="'widget-item col-md-' + row.length" v-for="item in row">
                    <template v-if="item.type === 'mdtrend'">
                        <SaMDTrend :path="item.path" :params="params" :extraParams="extraParams"
confMethod="get" />
                    </template>
                    <template v-else-if="item.type === 'mdcircle'">
                        <SaMDCircle :path="item.path" :params="params" :extraParams="extraParams" confMethod="get" />
                    </template>
                    <template v-else-if="item.type === 'mdtable'">
                        <SaMDReport :path="item.path" :params="params" :extraParams="extraParams" confMethod="get" />
                    </template>
                    <template v-else-if="item.type === 'billboard'">
                        <SaMDBillboard :path="item.path" :params="params" :extraParams="extraParams" confMethod="get" />
                    </template>
                    <template v-else-if="item.type === 'eventRiver'" >
                        <NvMDEventRiverView :path="item.path" :params="params" :extraParams="extraParams" confMethod="get" />
                    </template>
                    <template v-else>
                        <div class="support-tip">
                            暂时不支持该种类型组件配置~
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import m from 'moment';
import apiConfig from './api/config';
import util from './util/util';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
const FRENSH_TIME = 60000;
export default {
    name: 'dashboardView',
    created() {
        let id = this.$route.query.id;
        if (id) {
            this.$request({
                url: util.getApi(apiConfig.dashboardGet),
                method: 'get',
                params: {
                    id: id
                }
            }).then(response => {
                if (response.data.success) {
                    this.title = response.data.data.title;
                    let config = JSON.parse(response.data.data.configure);
                    this.wigetData = config.widgets;
                    this.refresh = config.refresh || false;
                    this.timer = setTimeout(this.autoRefresh, FRENSH_TIME);
                }
                else {
                    this.$Message.error('配置获取失败');
                }
            });
        }
    },
    data() {
        return {
            title: '',
            refreshValue: true,
            showTimeLimitTip: false,
            switchDisable: false,
            value: [m().subtract(2, 'hour').toDate(), m().toDate()],
            dateOptions: {
                position: 'outer',
                shortcuts: [
                    {
                        text: '30分钟',
                        value() {
                            return [
                                m().subtract(30, 'minute').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '1小时',
                        value() {
                            return [
                                m().subtract(1, 'hour').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '2小时',
                        defaultSelected: true,
                        value() {
                            return [
                                m().subtract(2, 'hour').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '1天',
                        value() {
                            return [
                                m().subtract(1, 'day').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '7天',
                        value() {
                            return [
                                m().subtract(7, 'day').toDate(),
                                m().toDate()
                            ];
                        }
                    }
                ]
            },
            params: {},
            wigetData: [],
            extraParams: {
            },
            timer: null,
            refresh: false
        };
    },
    methods: {
        timeChange(time) {
            if (time.length !== 2 || typeof time[0] !== 'object' || typeof time[1] !== 'object') {
                return;
            }
            time = time.map(item => {
                return m(item).format(DATE_FORMAT);
            });
            let obj = {};
            Object.assign(obj, this.params, {
                start: time[0],
                end: time[1]
            });
            this.params = obj;
            // 非两小时时去除快捷选中
            if (m(time[1]).format('X') - m(time[0]).format('X') !== 7200) {
                this.dateOptions.shortcuts[2].defaultSelected = false;
            }
            // 当时间间隔超过5个小时的时候，停止刷新功能
            if (m(time[1]).format('X') - m(time[0]).format('X') > 18000) {
                this.refreshValue = false;
                this.showTimeLimitTip = true;
                this.switchDisable = true;
                clearTimeout(this.timer);
            }
            else if (this.showTimeLimitTip === true) {
                this.refreshValue = true;
                this.showTimeLimitTip = false;
                this.switchDisable = false;
                this.timer = setTimeout(this.autoRefresh, FRENSH_TIME);
            }
        },
        refreshSwitch(value) {
            if (value === true) {
                this.timer = setTimeout(this.autoRefresh, FRENSH_TIME);
            }
            else {
                clearTimeout(this.timer);
            }
        },
        autoRefresh() {
            const DATERANGE = this.$refs.daterange;
            if (this.refresh !== true || typeof DATERANGE === undefined) {
                // do something
            }
            else {
                clearTimeout(this.timer);
                let date = DATERANGE.getDate().selectDate;
                let endTime = parseInt(m(date[1]).format('x'), 10);
                let startTime = parseInt(m(date[0]).format('x'), 10);
                let currentTime = parseInt(m().format('x'), 10);
                let timeRange = currentTime - endTime;
                let newDate = [
                    m(startTime + timeRange).format(DATE_FORMAT),
                    m(currentTime).format(DATE_FORMAT)
                ];
                this.value = newDate;
                this.timer = setTimeout(this.autoRefresh, FRENSH_TIME);
            }
        }
    }
};
</script>

<style lang="less">
.dashboard-view {
    .dashboard-view-header {
        margin-bottom: 15px;
        overflow: hidden;
        .dashboard-name {
            float: left;
            font-size: 16px;
            color: #383636;
        }
        .dashboard-back {
            float: right;
            a {
                display: block;
                border: 1px solid #e2e2e2;
                border-radius: 2px;
                width: 68px;
                height: 24px;
                font-size:12px;
                color: #383636;
                text-align: center;
                line-height: 22px;
            }
        }
    }
    .auto-refresh {
        display: inline-block;
        line-height: 26px;
        margin-left: 20px;
        .refresh-title {
        }
       .refresh-btn {
            background: #268deb;
            color: #fff;
            display: inline;
            padding: 5px;
            border-radius: 2px;
            cursor: pointer;
       }
       .refresh-tip {
            display: inline;
            margin-left: 10px;
            padding: 4px 10px;
            background-color: #fdefda;
            border: 1px solid #f6ab3b;
            color: #df9629;
            border-radius: 2px;
       }
    }
    .view-content {
        margin-top: 20px;
        .row {
            overflow: hidden;
            margin: 0 -5px;
            margin-bottom: 10px;
            .widget-item {
                box-sizing: border-box;
                float: left;
                padding: 0 5px;
                .support-tip {
                    border: 1px solid #ccc;
                    text-align: center;
                    height: 100%;
                    min-height: 250px;
                    line-height: 250px;
                }
                &.col-md-1 {
                    width: 100%;
                }
                &.col-md-2 {
                    width: 50%;
                }
                &.col-md-3 {
                    width: 33.33333%;
                }
                &.col-md-4 {
                    width: 25%;
                }
                &.col-md-5 {
                    width: 20%;
                }
                &.col-md-6 {
                    width: 16.6666%;
                }
                &.col-md-7 {
                    width: 14.2857%;
                }
                &.col-md-8 {
                    width: 12.5%;
                }
            }
        }
    }
}
</style>
