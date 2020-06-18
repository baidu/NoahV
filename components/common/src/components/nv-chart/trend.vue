<template>
    <div :class="getCls('trend')" ref="trend">
        <h3>
            <span class="trend-title" :title="resTitle">{{resTitle}}</span>
            <slot name="header-right"></slot>
        </h3>
        <!-- <vue-echarts :options="curOptions" ref="chart"></vue-echarts> -->
        <div :class="getCls('chart')" ref="chart" v-show="displayChart"></div>
        
        <div class="trend-detail" v-if="showSeriesDetail">
            <div class="detail-handler" @click="toggleDetailPanel">
                {{showSeriesDetailText}}
                <nv-icon type="angle-down" v-show="!showDetailPanel" />
                <nv-icon type="angle-up" v-show="showDetailPanel" />
            </div>
            <div class="detail-panel" v-show="showDetailPanel">
                <ul>
                    <li class="detail-title">
                        <span v-for="(conf, index) in detailConf">
                            <span @click="toggleOrder(index)">
                                {{conf.title}}
                                <nv-icon type="arrow-up-line" v-if="conf.order === 'asc'" />
                                <nv-icon type="arrow-down-line" v-else-if="conf.order === 'desc'" />
                                <nv-icon type="arrow-default" v-else="!conf.order" />
                            </span>
                        </span>
                    </li>
                    <li v-for="(item, index) in detailStatistic" v-if="item.name" @click="toggleLegend(index)" :class="{active: !item.active}">
                        <template v-for="conf in detailConf">
                            <span v-if="conf.key === 'name' && !item.active" :style="{color: item.color}">
                                {{item[conf.key]}}
                            </span>
                            <span v-else>
                                {{item[conf.key]}}
                            </span>
                        </template>
                    </li>
                </ul>
            </div>
        </div>
        <div class="trend-error-holder" v-show="errTip" :title="errTip">{{errTip}}</div>
        <div class="trend-error-holder" v-show="noData" v-html="noDataTip"></div>
        <div class="show-loading" v-show="!isLoading">
            <div class="mask"></div>
            <div class="content">{{showLoading}}</div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import m from 'moment';
import echarts from 'echarts';
import getClassName from '../utils.js';
import options from './options';
import chartUtil from './chartUtil';
import {eventBus} from '../eventBus';
import {t} from '../../locale';
import mixin from '../../mixins';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
let xAxisFormat = 'YYYY-MM-DD HH:mm:ss';

const trendOptions = {
    title: {
        margin: 0,
        text: ''
    },
    grid: {
        containLabel: true,
        left: 0,
        right: 5,
        top: 15
    },
    chart: {
        height: 250
    },
    subtitle: {
        text: ''
    },
    yAxis: {
        minPadding: 0,
        opposite: false,
        axisLine: {
            show: false
        },
        axisLabel: {
            color: '#666',
            inside: true,
            margin: 0,
            verticalAlign: 'bottom',
        }
    },
    xAxis: {
        // type: 'time',
        boundaryGap: false,
        showMaxLabel: false,
        axisLabel: {
            padding: [0, 10, 0, 10],
            formatter: value => {
                let label = m(value).format('HH:mm:ss');
                if (label === '00:00:00') {
                    return '{spStyle|' + m(value).format('YYYY-MM-DD') + '}';
                }
                return m(value).format(xAxisFormat);
            },
            color: '#333',
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
            end: 100,
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
    },
    legend: {
        bottom: 0,
        type: 'scroll',
        itemWidth: 10
    }
};

export default {
    name: 'NvTrend',
    mixins: [mixin],
    props: {
        title: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        params: {
            type: [Object, Array],
            default: () => ({})
        },
        options: {
            type: Object,
            default: () => ({})
        },
        showLoading: {
            type: String,
            default () {
                return t('trend.loadingData');
            }
        },
        method: {
            type: String,
            default: 'post'
        },
        requestConfig: {
            type: Object,
            default: () => ({})
        },
        trendData: {
            type: Object,
            default: () => ({})
        },
        noDataTip: {
            type: String,
            default () {
                return t('trend.noData');
            }
        },
        seriesFilter: Function,
        dataFilter: Function,
        scrollTrigger: {
            type: String
        },
        resizeTrigger: {
            type: String
        },
        needSyncTooltips: {
            type: Boolean,
            default() {
                return true;
            }
        },
        showSeriesDetailText: {
            type: String,
            default () {
                return t('trend.detail');
            }
        },
        showSeriesDetail: {
            type: Boolean,
            default() {
                return false;
            }
        },
        unfoldSeriesDetail: {
            type: Boolean,
            default() {
                return false;
            }
        },
        seriesDetailConf: {
            type: Array,
            default: () => [
                {
                    title: t('trend.detailTitle'),
                    key: 'name'
                },
                {
                    title: 'Max',
                    key: 'max'
                },
                {
                    title: 'Min',
                    key: 'min',
                    order: 'desc'
                },
                {
                    title: 'Avg',
                    key: 'avg'
                }
            ]
        },
        unitName: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            resTitle: this.title ? this.title : '',
            isLoading: false,
            errTip: '',
            noData: false,
            hasRequested: false,
            showDetailPanel: this.unfoldSeriesDetail ? true : false,
            detailStatistic: [],
            detailConf: this.seriesDetailConf
        };
    },
    created() {
        this.curOptions = this.getInitOptions();
        this.chart = null;
    },

    mounted() {
        // 同步tooltip
        if (this.needSyncTooltips !== false) {
            eventBus.$on('syncTooltips', this.syncTooltips);
        }

        this.redraw = _.throttle(this.scrollTop, 100);
        let scrollTarget = document.querySelector(this.scrollTrigger) || document;
        scrollTarget.addEventListener('scroll', this.redraw, false);

        this.resizeHandler = _.throttle(this.resizeChart, 100);

        let resizeTarget = document.querySelector(this.resizeTrigger) || window;
        resizeTarget.addEventListener('resize', this.resizeHandler);

        this.$nextTick( () => {
            this.scrollTop();
        });
    },
    computed: {
        watchObj() {
            return [this.params, this.trendData];
        },
        displayChart() {
            return !this.errTip && !this.noData
        }
    },
    watch: {
        // watchObj数据监听，变化的时候处理
        watchObj: {
            handler() {
                this.getData();
            },
            deep: true
        },
        requestConfig: {
            handler() {
                if (this.hasRequested && this.isLoading) {
                    this.hasRequested = false;
                    this.isLoading = false;
                }
                this.scrollTop();
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
            return this.chart;
        },
        renderTrend() {
            this.isLoading = true;
            this.chart = echarts.init(this.$refs.chart);


            // 处理xAxis重叠的问题
            if (typeof this.chart.getWidth === 'function') {
                let chartWidth = this.chart.getWidth();
                this.curOptions.xAxis.splitNumber = parseInt(chartWidth / 100, 10);
            }

            this.chart.setOption(this.curOptions, true);

            // 同步tooltip
            if (this.needSyncTooltips !== false) {
                this.chart.on('updateAxisPointer', function (params) {
                    eventBus.$emit('syncTooltips', params, this.chart);
                });
            }
        },
        refresh() {
            this.isLoading = false;
            this.noData = false;
            this.errTip = '';
            this.hasRequested = false;
            this.redraw();
        },
        getData() {
            // const params = self.params;
            if (this.url || (this.requestConfig && this.requestConfig.url)) {
                let config = {
                    url: this.url,
                    showLoading: false
                };

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

                Object.assign(config, this.requestConfig);
                this.hasRequested = true;
                this.$request(config)
                    .then(response => {
                        if (response.data.success === false && response.data.message) {
                            this.showError(response.data.message);
                            this.isLoading = true;
                            return Promise.reject(response.data.message);
                        }
                        else {
                            this.errTip = '';
                        }
                        let data = response.data.data || response.data.result;
                        if (typeof this.dataFilter === 'function') {
                            data = this.dataFilter(data);
                        }
                        return data;
                    })
                    .then(this.initData)
                    .catch((err) => {
                        console.warn(err);
                    });
            }
            else if (this.trendData && this.trendData.data && this.trendData.data instanceof Array) {
                this.initData(this.trendData);
            }

        },
        /**
         * after received data
         * @params {Object} data
         */
        initData(data) {
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

            if (data.data && data.data.length === 0) {
                this.showNoData();
                return;
            }
            else {
                this.noData = false;
            }

            let noData = _.every(data.data, item => {
                return item.data && item.data.length === 0;
            });
            if (noData) {
                this.showNoData();
                return;
            }
            else {
                this.noData = false;
            }

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
                else if (this.options.nullPointMode === '') {
                    item.connectNulls = false;
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

            if (typeof this.seriesFilter === 'function') {
                curOptions.series = this.seriesFilter(curOptions.series);
            }

            this.curOptions = Object.assign({}, curOptions);


            if (this.showSeriesDetail) {
                this.curOptions.legend.show = false;
                this.curOptions.grid.bottom = 0;
                if (this.curOptions.dataZoom) {
                    this.curOptions.dataZoom[0].show = false;
                }
            }

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
                this.curOptions.series.push({
                    type: 'line',
                    markLine: {
                        silent: true,
                        symbol: 'none',
                        label: {
                            position: 'insideEndTop',
                            formatter: () => {
                                return chartUtil.getTooltipValue(+this.options.threshold, this.unitName || '', 0);
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

            this.curOptions.series.forEach((item, index) => {
                if (item.statistic) {
                    let colorIndex = index % this.curOptions.color.length;
                    item.statistic.color = this.curOptions.color[colorIndex];
                    this.detailStatistic.push(item.statistic);
                }
            });
            if (this.detailStatistic.length > 0 && this.detailConf) {
                let key;
                let order;
                this.detailConf.forEach(item => {
                    if (item.order) {
                        key = item.key;
                        order = item.order;
                    }
                });
                if (key && order) {
                    this.sortSeries(order, key);
                }
            }


            // 处理坐标轴
            this.curOptions.yAxis.axisLabel.formatter = value => {
                return chartUtil.getyAxisValue(value, this.unitName);
            };

            this.curOptions.tooltip.formatter = params => {
                let time;
                let seriesTooltip = [];
                _.each(params, item => {
                    time = m(item.axisValue).format(DATE_FORMAT);
                    let html = `<dd style="padding: 3px 10px;color: ${item.color}">`
                        + item.seriesName
                        + ': '
                        + (item.value[1] === null ? '-'
                        : chartUtil.getTooltipValue(item.value[1], this.unitName))
                        + '</dd>';
                    seriesTooltip.push(html);
                });
                return '<dl style="min-width: 150px;padding-bottom: 3px">'
                    + '<dt style="background-color: #3a62ca;padding: 5px 10px;color: #fff;margin-bottom: 3px;">'
                    + time
                    + '</dt>'
                    + seriesTooltip.join('')
                    + '</dl>';
            };

            this.renderTrend();
        },
        /**
         * caculate the sceen's position and judge whether to load
         */
        scrollTop() {
            if (!this.hasRequested && !this.isLoading
                && this.isInScreen()) {
                try {
                    this.$emit('canLoading');
                    this.getData();
                }
                catch (e) {
                    this.showError(this.t('trend.getDataError'));
                }
            }
        },
        showError(message) {
            this.errTip = JSON.stringify(message);
        },
        showNoData() {
            this.isLoading = true;
            this.noData = true;
        },
        isInScreen() {
            const main = this.$refs.trend;
            if (!main) {
                return;
            }
            let height = chartUtil.getViewHeight();
            let rect = main.getBoundingClientRect();
            let offset = {
                top: rect.top,
                bottom: rect.bottom
            };
            if (offset && offset.top - 50 < height && offset.bottom > 0) {
                return true;
            }
            return false
        },
        /**
         * 同步tooltip
         * @param  {Object} params   tooltip相关参数
         * @param  {Object} sourceChart  echart实例
         */
        syncTooltips(params, sourceChart) {
            if (this.chart
                && sourceChart !== this.chart
                && typeof this.chart.dispatchAction === 'function'
                && typeof this.chart.makeActionFromEvent === 'function'
                && this.isInScreen()
            ) {
                this.chart.dispatchAction(
                    this.chart.makeActionFromEvent(params),
                    true
                );
            }
        },
        getInitOptions() {
            return this.options
                ? chartUtil.deepAssign({}, this.defaultOptions(), trendOptions, this.options)
                : chartUtil.deepAssign({}, this.defaultOptions(), trendOptions)
        },
        defaultOptions() {
            return options['lineChart'];
        },
        resizeChart() {
            if (this.chart) {
                this.chart.resize();
            }
        },
        toggleDetailPanel() {
            this.showDetailPanel = !this.showDetailPanel;
        },
        toggleOrder(index) {
            this.detailConf = this.detailConf.map((item, i) => {
                if (index === i) {
                    if (item.order === 'asc') {
                        item.order = 'desc';
                        this.sortSeries('desc', item.key);
                    }
                    else {
                        item.order = 'asc';
                        this.sortSeries('asc', item.key);
                    }
                }
                else {
                    item.order = 'default';
                }
                return item;
            });
        },
        sortSeries(order, key) {
            this.detailStatistic.sort((a, b) => {
                if (typeof a[key] === 'number' && typeof b[key] === 'number') {
                    return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
                }
                else if (typeof a[key] === 'string' && typeof b[key] === 'string'){
                    let aStr = a[key];
                    let bStr = b[key];
                    let alen = aStr.length;
                    let blen = bStr.length;
                    let i = 0;
                    while(i < alen && i < blen) {
                        if (aStr.charAt(i) === bStr.charAt(i)) {
                            i++;
                        }
                        else {
                            return order === 'asc' ? aStr.charAt(i) - bStr.charAt(i) : bStr.charAt(i) - aStr.charAt(i);
                        }
                    }
                    return order === 'asc' ? alen - blen : blen - alen;
                }
                else {
                    return order === 'asc' ? a[key] > b[key] : b[key] < a[key];
                }
            });
        },
        toggleLegend(index) {
            if (this.chart) {
                this.chart.dispatchAction({
                    type: 'legendToggleSelect',
                    name: this.detailStatistic[index].name
                });
            }
            this.detailStatistic[index].active = !this.detailStatistic[index].active;
            let temp = this.detailStatistic[index];
            this.detailStatistic.splice(index, 1, temp);
        }
    },
    beforeDestroy() {
        if (this.chart) {
            if (typeof this.chart.off === 'function') {
                this.chart.off('updateAxisPointer');
            }
            if (typeof this.chart.clear === 'function') {
                this.chart.clear();
            }
            if (typeof this.chart.dispose === 'function') {
                this.chart.dispose();
            }
        }
        // 解绑事件
        window.removeEventListener('resize', this.resizeHandler);
        document.removeEventListener('scroll', this.redraw);
        eventBus.$off('syncTooltips');
    }
};
</script>
