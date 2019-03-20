<template>
    <NvTrend method="post" :options="options" :title="title" :url="url" :params="params" :show-loading="showLoading"></NvTrend>
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
    }
};
</script>

<style lang="less" >
</style>
