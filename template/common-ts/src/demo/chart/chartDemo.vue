<template>
    <div class="chart-demo">
        <div class="time-filter-area">
            <NvDatePicker
                :width="350"
                type="daterangetime"
                :dateFormat="time.dateFormat"
                v-model="time.value"
                :options="time.dateOptions"
                theme='common'
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

        <NvChart
            :type="lineConf.type"
            :title="lineConf.title"
            :url="lineConf.chartUrl"
            method="get"
            :options="lineConf.options"
            :params="lineConf.params"
            show-loading="数据加载中..."
        />

        <NvChart
            :type="columnConf.type"
            :title="columnConf.title"
            :url="columnConf.chartUrl"
            method="get"
            :options="columnConf.options"
            :params="columnConf.params"
            show-loading="数据加载中..."
        />

        <NvChart
            :type="pieConf.type"
            :title="pieConf.title"
            :url="pieConf.chartUrl"
            method="get"
            :options="pieConf.options"
            :params="pieConf.params"
            show-loading="数据加载中..."
        />

        <NvChart
            :type="pie2Conf.type"
            :title="pie2Conf.title"
            :url="pie2Conf.chartUrl"
            method="get"
            :options="pie2Conf.options"
            :params="pie2Conf.params"
            :dataFilter="dataFilter"
            show-loading="数据加载中..."
        />
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import m from 'moment';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

@Component
export default class chartDemo extends Vue {
    time: any = {
        dateFormat: dateFormat,
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
        }
    };
    lineConf: any = {
        title: '全年平均降雨量(非时序数据趋势图)',
        type: 'line',
        chartUrl: '/api/demo/chart/line/get',
        params: {
        },
        options: {
        }
    };
    columnConf: any = {
        title: '全年平均降雨量(柱状图)',
        type: 'column',
        chartUrl: '/api/demo/chart/line/get',
        params: {
        },
        options: {
        }
    };
    pieConf: any = {
        title: '浏览器市场占用率(饼状图)',
        type: 'pie',
        chartUrl: '/api/demo/chart/pie/get',
        params: {
            dev: true
        },
        options: {
        }
    };
    pie2Conf: any = {
        title: '浏览器市场占用率(环状图)',
        type: 'pie',
        chartUrl: '/api/demo/chart/pie/get',
        params: {
            dev: true
        },
        options: {
        }
    };
    trendConf: any = {
        // title 可选
        title: '时序数据趋势图',
        // api 必选
        url: '/api/demo/chart/trend/get',
        params: {
            startTime: m().subtract(2, 'hour').format(dateFormat),
            endTime: m().format(dateFormat)
        },
        // showLoading 可选
        showLoading: '数据加载中...',
        // options 可选
        options: {
        }
    };
    dataFilter(data: any) {
        data.data.forEach(item => {
            item.innerSize = 100;
            item.depth = 45;
        });
        return data;
    }
    timeChange(time: Array<string>) {
        this.trendConf.params = {
            startTime: m(time[0]).format(dateFormat),
            endTime: m(time[1]).format(dateFormat)
        };
        this.lineConf.params = {
            startTime: m(time[0]).format(dateFormat),
            endTime: m(time[1]).format(dateFormat)
        };
    }
};
</script>

<style lang="less" >
.chart-demo {
    & > div {
        border: 1px solid #ccc;
        margin-bottom: 20px;
        padding: 10px;
    }
    .time-filter-area {
        border: none;
        padding: 0;
        margin-bottom: 20px;
    }
}
</style>
