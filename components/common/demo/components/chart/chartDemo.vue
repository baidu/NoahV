<template>
    <div>
        <NvChart method="post" :title="title" :url="urlChart" :params="params" show-loading="数据加载中..."/>
        <NvChart method="post" :options="optionsChart" title="我是chart2" type="column" :url="urlChart" :params="params"  show-loading="数据加载中..."/>
        <NvChart method="post" :options="optionsPie" type="pie" :url="urlPie" :params="params"  />
        <NvChart method="post" :options="optionsPieInnerSize" :dataFilter="dataFilter" type="pie" :url="urlPie" :params="params"  />
    </div>
</template>

<script>
import u from 'underscore';
export default {
    name: 'chartDemo',
    data() {
        return {
            title: '我是column title',
            urlChart: '/api/chart/column',
            params: {
                test: 'test-column'
            },
            optionsChart: {
                // xAxis: {
                //     // categories: ['苹果', '香蕉', '橙子']
                // },
                // yAxis: {
                //     title: {
                //         // text: '吃水果个数'
                //     }
                // }
            },
            urlPie: '/api/chart/pie',
            optionsPie: {
                title: {
                    text: '2018年1月浏览器市场份额'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: 'black'
                            }
                        }
                    }
                },
            },
            optionsPieInnerSize: {
                title: {
                    text: '2014 年某网站各浏览器访问量占比'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: 'black'
                            }
                        }
                    }
                }
            }
        };
    },
    methods: {
        dataFilter(data) {
            data.data.forEach(function (item) {
                item.radius = ['30%', '50%'];
            });
            return data;
        }
    }
};
</script>

<style lang="less" >
</style>
