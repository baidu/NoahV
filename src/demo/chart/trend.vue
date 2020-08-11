<template>
    <div class="demo-chart-trend">
        <div class="time-filter-area">
            <NvDatePicker
                :width="350"
                type="daterangetime"
                :dateFormat="time.dateFormat"
                v-model="time.value"
                :options="time.dateOptions"
                @on-change="timeChange"
            />
        </div>
        <NvTrend
            method="get"
            :options="trendConf.options"
            :title="trendConf.title"
            :url="trendConf.url"
            :params="trendConf.params"
            :show-loading="trendConf.showLoading"
        />
    </div>
</template>

<script>
import m from 'moment';
import u from 'underscore';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DEFAULT_TIME = {
    startTime: m().subtract(2, 'hour'),
    endTime: m()
};
export default {
    name: 'demo-chart-trend',
    data() {
        return {
            time: {
                dateFormat: DATE_FORMAT,
                value: [
                    DEFAULT_TIME.startTime.toDate(),
                    DEFAULT_TIME.endTime.toDate()
                ],
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
                }
            },
            trendConf: {
                // title 可选
                title: '趋势图',
                // api 必选
                url: '/api/demo/chart/trend/get',
                params: {
                    startTime: DEFAULT_TIME.startTime.format(DATE_FORMAT),
                    endTime: DEFAULT_TIME.endTime.format(DATE_FORMAT)
                },
                // showLoading 可选
                showLoading: '数据加载中...',
                // options 可选
                options: {
                }
            }
        };
    },
    computed: {
    },
    methods: {
        timeChange(time) {
            if (Array.isArray(time) && time.length === 2) {
                if (time[0] && time[1]) {
                    let params = Object.assign({}, this.trendConf.params, {
                        startTime: m(time[0]).format(DATE_FORMAT),
                        endTime: m(time[1]).format(DATE_FORMAT)
                    });
                    if (!u.isEqual(this.trendConf.params, params)) {
                        this.trendConf.params = params;
                    }
                }
            }

        }
    }
};
</script>

<style lang="less" >
    .demo-chart-trend {
        .time-filter-area {
            border: none;
            padding: 0;
            .filter-time-btn {
                margin-left: 20px;
            }
            margin-bottom: 20px;
        }
    }
</style>
