<template>
    <NvTrend method="post" :options="options" :title="title" :url="url" :params="params" :show-loading="showLoading" :show-series-detail="true" :seriesFilter="seriesFilter" :unfoldSeriesDetail="true" showSeriesDetailText="详情"></NvTrend>
</template>

<script>

export default {
    name: 'trendDemo',
    data() {
        return {
            // title 可选
            title: '趋势图实例(秒)',
            // api 必选
            url: '/api/trend',
            params: {
                test: true
            },
            // showLoading 可选
            showLoading: 'Loading...',
            // options 可选
            options: {
                threshold: 140000
                // series: [{
                //     type: 'line', 
                //     markLine: {
                //         silent: true,
                //         symbol: 'none',
                //         label: {
                //             position: 'middle'
                //         },
                //         data: [{
                //             yAxis: 140000,
                //             lineStyle: {
                //                 color: '#f00',
                //                 type: 'solid'
                //             }
                //         }]
                //     }
                // }],
                // zero or connect
                // nullPointMode: 'connect'
            }
        };
    },
    methods: {
        seriesFilter(series) {
            return series.map((item) => Object.assign(item, {
                statistic: {
                    name: item.name,
                    max: 100,
                    min: Math.random() * 10 + 90,
                    avg: 95
                }
            }));
        }
    }
};
</script>

<style lang="less" >
</style>
