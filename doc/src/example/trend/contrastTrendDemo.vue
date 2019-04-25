<template>
    <sa-contrast-trend :options="options" :title="title" :url="url" :params="params" :show-loading="showLoading" :items="items" :layout="layout" />
</template>

<script>
// import trendTpl from 'components/trendTpl.vue';
export default {
    name: 'contrastTrendDemo',
    // components: {
    //     trendTpl
    // },
    data() {
        return {
            // title 可选
            title: '我是title',
            // api 必选
            url: '/api/trend',
            params: {
                test: true
            },
            // showLoading 可选
            showLoading: 'Loading...',
            // options 可选
            options: {
                colors: [
                    'red', 'blue', '#90ed7d', '#f7a35c', '#8085e9',
                    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
                ]
            },
            layout: 'inline',
            items: [
                {
                    name: 'namespace',
                    title: '类别',
                    type: 'checkboxgroup',
                    required: true,
                    width: 300,
                    contrast: true,
                    option: [
                        {
                            name: 'QPS',
                            value: 'qps'
                        },
                        {
                            name: '吞吐',
                            value: 'tun'
                        },
                        {
                            name: '数据量',
                            value: 'num'
                        },
                        {
                            name: '队列请求',
                            value: 'request'
                        }
                    ]
                },
                {
                    name: 'timeRange',
                    title: '时间区间',
                    type: 'timeRange',
                    format: 'yyyy-MM-DD HH:mm:ss',
                    width: 360,
                    required: true
                }
            ]
        };
    }
};
</script>

<style lang="less" >
</style>
