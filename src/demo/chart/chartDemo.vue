<template>
    <div class="chart-demo">
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

<script>
export default {
    name: 'chart-demo',
    data() {
        return {
            lineConf: {
                title: '全年平均降雨量(非时序数据趋势图)',
                type: 'line',
                chartUrl: '/api/demo/chart/line/get',
                params: {
                },
                options: {
                }
            },
            columnConf: {
                title: '全年平均降雨量(柱状图)',
                type: 'column',
                chartUrl: '/api/demo/chart/line/get',
                params: {
                },
                options: {
                }
            },
            pieConf: {
                title: '浏览器市场占用率(饼状图)',
                type: 'pie',
                chartUrl: '/api/demo/chart/pie/get',
                params: {
                    dev: true
                },
                options: {
                }
            },
            pie2Conf: {
                title: '浏览器市场占用率(环状图)',
                type: 'pie',
                chartUrl: '/api/demo/chart/pie/get',
                params: {
                    dev: true
                },
                options: {
                }
            },
            trendConf: {
                // title 可选
                title: '时序数据趋势图',
                // api 必选
                url: '/api/demo/chart/trend/get',
                params: {
                    startTime: '',
                    endTime: ''
                },
                // showLoading 可选
                showLoading: 'Loading...',
                // options 可选
                options: {
                }
            }

        };
    },
    computed: {

    },
    methods: {
        dataFilter(data) {
            data.data.forEach(item => {
                item.innerSize = 100;
                item.depth = 45;
            });
            return data;
        }
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
}
</style>
