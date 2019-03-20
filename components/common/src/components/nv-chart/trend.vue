<template>
    <div :class="getCls('trend')">
        <h3>{{resTitle}}</h3>
        <vue-echarts :options="curOptions" ref="chart"></vue-echarts>
    </div>
</template>

<script>
import _ from 'lodash';
import m from 'moment';
import vueEcharts from './vueEcharts';
import getClassName from '../utils.js';
import options from './options';
import chartUtil from './chartUtil';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
let xAxisFormat = 'YYYY-MM-DD HH:mm:ss';

const trendOptions = {
    title: {
        margin: 0,
        text: ''
    },
    grid: {
        bottom: 70,
        left: 60,
        right: 40
    },
    chart: {
        height: 250
    },
    subtitle: {
        text: ''
    },
    yAxis: {
        minPadding: 0,
        opposite: false
    },
    xAxis: {
        type: 'time',
        showMaxLabel: false,
        axisLabel: {
            formatter: value => {
                let label = m(value).format('HH:mm:ss');
                if (label === '00:00:00') {
                    return '{spStyle|' + m(value).format('YYYY-MM-DD') + '}';
                }
                return m(value).format(xAxisFormat);
            },
            color: '#333',
            showMaxLabel: false,
            rich: {
                spStyle: {
                    fontWeight: 'bold'
                }
            }
        }
    },
    dataZoom: [
        {
            bottom: 24,
            start: 0,
            height: 20,
            handleStyle: {
                color: '#d3dee5'
            },
            type: 'slider',
            backgroundColor: '#e8e9ef',
            dataBackground: {
                areaStyle: {
                    color: '#e8e9ef'
                }
            },
            fillerColor: '#e9efff',
            showDataShadow: false,
            labelFormatter(value) {
                return m(value).format(xAxisFormat);
            }
        }
    ],
    exporting: {
        enabled: false
    },
    rangeSelector: {
        enabled: false
    },
    navigator: {
        enabled: false
    },
    scrollbar: {
        enabled: false
    },
    tooltip: {
        formatter(params) {
            let time;
            let seriesTooltip = [];
            _.each(params, item => {
                time = m(item.axisValue).format(DATE_FORMAT);
                let html = `<dd style="padding: 3px 10px;color: ${item.color}">`
                    + item.seriesName
                    + ': '
                    + item.value[1]
                    + '</dd>';
                seriesTooltip.push(html);
            });
            return '<dl style="min-width: 150px;padding-bottom: 3px">'
                + '<dt style="background-color: #3a62ca;padding: 5px 10px;color: #fff;margin-bottom: 3px;">'
                + time
                + '</dt>'
                + seriesTooltip.join('')
                + '</dl>';
        }
    },
    legend: {
        bottom: 0
    }
};

function shortValue(value) {
    if (typeof value === 'number' && value > 1000000) {
        return Math.ceil(value / 1000000) + 'M';
    }
    else if (typeof value === 'number' && value > 1000) {
        return Math.ceil(value / 1000) + 'K';
    }
    return value;
}

export default {
    name: 'NvTrend',
    props: {
        title: String,
        url: {
            type: String,
            required: true
        },
        params: Object,
        options: Object,
        showLoading: String,
        method: String
    },

    components: {
        vueEcharts
    },
    data() {
        return {
            resTitle: this.title ? this.title : '',
            curOptions: this.getInitOptions()
        };
    },
    mounted() {
        this.getData();
    },
    watch: {
        // params数据监听，变化的时候处理
        params: {
            handler() {
                this.getData();
            },
            deep: true
        }
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
        getInstance() {
            return this.$refs.chart.getChart();
        },
        getData() {
            // const params = self.params;
            let config = {
                url: this.url
            };

            if (typeof this.showLoading !== 'undefined') {
                this.$refs.chart.getChart().showLoading('default', {
                    text: this.showLoading
                });
                config.showLoading = false;
            }

            let method = 'post';
            if (this.method) {
                method = this.method.toLowerCase();
            }
            config.method = method;

            if (method === 'get') {
                config.params = this.params;
            }
            else {
                config.data = this.params;
            }

            this.$request(config).then(response => {
                const data = response.data.data;

                if (typeof this.showLoading !== 'undefined') {
                    this.$refs.chart.getChart().hideLoading();
                }

                // set the title
                this.resTitle = this.title ? this.title : data.title;

                let curOptions = _.cloneDeep(this.curOptions);

                // 处理自定义series
                let customSeries = [];
                let initOptions = this.getInitOptions();
                if (initOptions.series) {
                    customSeries = _.cloneDeep(initOptions.series);
                }

                curOptions.series = [];


                let timeGap = Number.MIN_VALUE;

                // set the series
                data.data.forEach(item => {
                    item.type = 'line';
                    item.symbol = 'none';
                    if (this.options.nullPointMode === 'zero') {
                        item.data.map(list => {
                            if (list[1] === null || list[1] === undefined) {
                                list[1] = 0;
                            }
                            return list;
                        });
                    }
                    else if (this.options.nullPointMode === 'connect') {
                        item.connectNulls = true;
                    }
                    curOptions.series.push(item);


                    // 寻找X轴时间最佳展示Label格式
                    if (item.data
                        && item.data.length > 0
                        && timeGap < (item.data[item.data.length - 1][0] - item.data[0][0]))
                        {
                        timeGap = (item.data[item.data.length - 1][0] - item.data[0][0]);
                    }
                });

                /**
                 * 处理预定义配置，预定于配置会占用颜色表
                 * 所以这里将预定于的配置放到数据配置后面
                 */
                if (Array.isArray(customSeries)) {
                    customSeries.forEach(item => {
                        curOptions.series.push(item);
                    });
                }
                else {
                    curOptions.series.push(customSeries);
                }
                curOptions.chartNotMerge = true;
                this.curOptions = Object.assign({}, curOptions);

                // 判断X轴时间跨度
                if ((timeGap / 1000) < (24 * 60 * 60)) {
                    xAxisFormat = 'HH:mm:ss';
                }
                // 跨天
                else if ((timeGap / 1000) > (24 * 60 * 60)) {
                    xAxisFormat = 'DD HH:mm:ss';
                }

                // 跨月
                else if ((timeGap / 1000) > (24 * 60 * 60 * 30)) {
                    xAxisFormat = 'MM-DD HH:mm:ss';
                }

                // 跨年
                else if ((timeGap / 1000) > (24 * 60 * 60 * 30 * 12)) {
                    xAxisFormat = 'YYYY-MM-DD HH:mm:ss';
                }

                // 画阈值线
                if (this.options.threshold) {
                    curOptions.series.push({
                        type: 'line',
                        markLine: {
                            silent: true,
                            symbol: 'none',
                            label: {
                                position: 'end',
                                formatter: () => {
                                    return  shortValue(+this.options.threshold) + (this.options.unit || '');
                                }
                            },
                            data: [
                                {
                                    yAxis: +this.options.threshold,
                                    lineStyle: {
                                        color: '#f00',
                                        type: 'solid',
                                        width: 1
                                    }
                                }
                            ]
                        }
                    });
                }
            });
        },
        getInitOptions() {
            return this.options
                ? chartUtil.deepAssign({}, this.defaultOptions(), trendOptions, this.options)
                : chartUtil.deepAssign({}, this.defaultOptions(), trendOptions)
        },
        defaultOptions() {
            return options['lineChart'];
        }
    }
};
</script>

