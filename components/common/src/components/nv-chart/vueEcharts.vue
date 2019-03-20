<template>
    <div :class="getCls('vue-echarts')" ref="chart"></div>
</template>

<script>
import echarts from 'echarts';
import getClassName from '../utils.js';
import _ from 'lodash';

export default {
    props: ['options'],
    name: 'vueEcharts',
    data() {
        return {
            chart: null,
            chartOptions: {}
        };
    },
    mounted() {
        this.renderChart();
        // 处理resize时间，IE只兼容IE9及以上
        this.resizeHandler = _.debounce(this.resizeChart, 200);
        window.addEventListener('resize', this.resizeHandler);
    },
    methods: {
         /**
         * 获取类名
         *
         * @param {String} postfix 后缀名称
         * @return {Object} 样式集合
         */
        getCls(postfix) {
            return getClassName.getComponentWrapperCls(postfix);
        },
        getChart() {
            return this.chart;
        },
        addSeries(options) {
            if (this.chart) {
                let currentOption = this.chart.getOption();
                if (Array.isArray(currentOption.series)) {
                    currentOption.series.push(options);
                }
                else if (typeof currentOption.series === 'object'){
                    let series = [currentOption.series];
                    series.push(options);
                    currentOption.series = series;
                }
                this.chart().setOption(currentOption);
            }
        },
        removeSeries() {
            while (this.chart
                && this.chart.getOption()
                && Array.isArray(this.chart.getOption().series)
                && this.chart.getOption().series.length !== 0
            ) {
                this.chart.series[0].remove();
            }
        },
        showLoading(txt) {
            this.chart.showLoading({
                text: txt
            });
        },
        hideLoading() {
            this.chart.hideLoading();
        },
        renderChart(notMerge) {
            this.chart = echarts.init(this.$refs.chart);
            this.chartOptions = Object.assign({}, this.options);
            this.chart.setOption(this.chartOptions, notMerge === true);
        },
        resizeChart() {
            if (this.chart) {
                this.chart.resize();
            }
        }
    },
    watch: {
        options: {
            deep: true,
            handler(val) {
                // 处理Nv-chart中需要强制更新option的情况
                if (val.chartNotMerge === true) {
                    delete val.chartNotMerge;
                    this.renderChart(true);
                    return;
                }
                this.renderChart();
            }
        }
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
        // 解绑事件
        window.removeEventListener('resize', this.resizeHandler);
    }
};
</script>

