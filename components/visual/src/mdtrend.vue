<template>
    <div ref="trend" class="ui-mdtrend">
        <div class="multiple-chart-header">
            <h2 v-if="linkUrl">
                <a :href="linkUrl" target="_blank">{{title}}</a>
            </h2>
            <h2 v-else>{{title}}</h2>
        </div>
        <div class="multiple-chart-body" v-show="!errTip">
            <div class="echarts" ref="chart" :style="mdStyle"></div>
        </div>
        <div class="trend-error-holder" v-show="errTip">{{errTip}}</div>
        <nv-mask ref="mask"></nv-mask>
    </div>
</template>
<script>
import u from 'underscore';
import $ from 'jquery';
import moment from 'moment';
import {eventBus} from './eventBus';
import mdutil from './util/util';
import nvMask from './mask';
import echarts from 'echarts';

import chartareaPng from './assets/img/trend/chartarea.png';
import chartcolumnPng from './assets/img/trend/chartcolumn.png';
import chartlinePng from './assets/img/trend/chartline.png';
import chartnormalPng from './assets/img/trend/chartnormal.png';
import chartstackPng from './assets/img/trend/chartstack.png';

import {t} from './locale';
import mixin from './mixins';


const HEIGHT = 320;
const TIMING = 60;
const DEFAULTTIME = 'before(2h)';
const DEFAULTCONF = {
    'timeType': 'relative',
    'time': DEFAULTTIME
};
const DEFAULT_REQUEST_TYPE = 'post';

let timeFormatter = 'YYYY-MM-DD HH:mm:ss';
let widgetConf = {};
const numUnit = ['K', 'M', 'G', 'T', 'P', 'E'];


/**
 * Traversal event gets the included data points
 *
 * @param  {[type]} events [Extra Events List]
 * @param  {[type]} max    [max]
 * @param  {[type]} min    [min]
 * @param  {[type]} refer  [Trend's Series]
 * @return {[type]}        [The extra events lists influence of points]
 */
function handlerEventsArea(events, max, min, xMax, xMin) {
    let data = [];
    u.each(events, evt => {
        evt.startTime = evt.startTime < xMin ? xMin : evt.startTime;
        evt.endTime = evt.endTime > xMax ? xMax : evt.endTime;
        evt.startTime = evt.startTime * 1000;
        evt.endTime = evt.endTime * 1000;

        data.push([
            {
                coord: [
                    evt.startTime,
                    min
                ]
            },
            {
                coord: [
                    evt.endTime,
                    max
                ]
            }
        ]);
    });
    return data;
}

/**
 * According to the time axis to get event
 *
 * @param  {[type]} events [Extra Events List]
 * @param  {[type]} t      [Active Time in the line]
 * @param  {[type]} etype  [Extra Events Type]
 * @return {[type]}        [description]
 */
function findEventsByTimestamp(events, t, etype) {
    let data = [];

    // Custom events, add custom fields
    if (etype === 'customEvents') {
        u.each(events, (type, index) => {
            let len = type.events.length;
            u.each(type.events, evt => {
                if ((t >= evt.startTime) && t <= (evt.endTime)) {
                    let temp = {};
                    temp.name = type.name;
                    temp.desc = evt.detail;
                    temp.index = index;
                    temp.color = type.color;

                    // The event contains the total number
                    temp.count = len;
                    temp.evt = evt;
                    data.push(temp);
                }
            });
        });
        return data;
    }
    else if (etype === 'point') {
        u.each(events, evt => {

            // 兼容自定义异常点的形式
            if (Object.prototype.toString.call(evt) === '[object Object]') {
                u.find(evt.data, (item) => {
                    if (item[0] === t) {
                        data.push({
                            name: evt.name,
                            value: item[1],
                            color: evt.color
                        })
                    }

                });
            }
            else if (t === evt[0]) {
                data.push(evt);
            }
        });
        return data;
    }
    u.each(events, evt => {
        if (t >= evt.startTime && t <= evt.endTime) {
            data.push(evt);
        }
    });
    data = u.uniq(data, true, item => {
        return item.id;
    });
    return data;
}


/**
 * Pretreatment the time of trend
 * range: use when user sets contrast-time.
 * Server will complete the offset time to the current time, when setting contrast-time(offset time).
 *
 * @param {Array} times [times]
 * @param {Array} contrast [ring array in the same period]
 * @param {Object} timemap [a map of time.(such as: 昨天、一小时前、上周)]
 */
function handleTrendTime(times, contrast, timemap) {
    let basetime;
    if (!times) {
        return;
    }

    // calculate the default time
    u.each(times, (time, i) => {
        let tt = mdutil.timetransfer(time);
        times[i] = tt.join('|');
        if (i === 0) {
            basetime = tt;
        }
    });
    timemap[times[0].replace(/[-/:\s]*/g, '')] = t('mdtrend.currentTime');

    // calculate the time of the ring array in the same period
    if (basetime.length === 2) {
        let baseStartTime = moment(basetime[0]);
        let baseEndTime = moment(basetime[1]);
        let start;
        let end;
        let range;

        // if the parameter of contrast has string 'true', then remove it.
        if (contrast.indexOf('true') !== -1) {
            let p = contrast.indexOf('true');
            contrast.splice(p, 1);
        }
        u.each(contrast, item => {
            if (item === 'chain') {
                range = baseEndTime.unix() - baseStartTime.unix();
                end = baseStartTime.format(timeFormatter);
                start = baseStartTime.clone().subtract(range, 's').format(timeFormatter);
            }
            else if (item.indexOf('-') !== -1) {

                let relative = baseEndTime.unix() - baseStartTime.unix();
                end = moment(item).format('YYYY-MM-DD') + ' ' + moment(baseEndTime.clone()).format('HH:mm:ss');
                start = moment((moment(end).unix() - relative) * 1000).format('YYYY-MM-DD HH:mm:ss');
                range = baseEndTime.unix() - moment(end).unix();

            }
            else {
                let mt = item.match(/(\d+)(\w+)/);
                let value = mt[1];
                let unit = mt[2];
                let s1 = baseStartTime.clone().subtract(value, unit);
                let s2 = baseEndTime.clone().subtract(value, unit);
                start = s1.format(timeFormatter);
                end = s2.format(timeFormatter);
                range = baseStartTime.unix() - s1.unix();
            }
            if (range) {
                times.push(start + '|' + end + '|' + range);
            }
            else {
                times.push(start + '|' + end);
            }
            let mapkey = start + '|' + end;
            mapkey = mapkey.replace(/[-/:\s]*/g, '');

            // match the real value
            if (item.indexOf('d') !== -1 || item.indexOf('w') !== -1) { // 1d, 1w 这种的
                let mt = item.match(/(\d+)(\w+)/);
                let map = {
                    'd': t('mdtrend.dayBefore'),
                    'w': t('mdtrend.weekBefore')
                };
                timemap[mapkey] = mt[1] + map[mt[2]];
            }
            else {
                timemap[mapkey] = mapkey;
            }
        });
        return times;
    }
}


function shortValue(value, type, conf, number = 1) {
    if (type === 'thousand') {
        let integer = parseInt(value);
        if (integer < 1000 || typeof integer !== 'number') {
            return conf.style&&conf.style.decimals?value.toFixed(conf.style.decimals):value;
        }
        else {
            return conf.style&&conf.style.decimals?parseInt(value.toLocaleString()).toFixed(conf.style.decimals):value.toLocaleString();
        }
    }else {
        if (value < 1000 || typeof value !== 'number') {
            return value;
        }
        let formatNumber = value;
        for (let i = 0; i < numUnit.length; i++) {
            if (value < Math.pow(1000, i + 2) || i === numUnit.length - 1) {
                // 保留一位小数
                formatNumber = (value / Math.pow(1000, i + 1)).toFixed((value % Math.pow(1000, i + 1)) === 0
                    ? number
                    : Math.max(1, number)) + numUnit[i];
                break;
            }
            else {
                continue;
            }
        }

        return formatNumber;

    }
}

// Change the type of Chart
let ChartType = {
    methods: {
        initChatType(type) {

            /**
             * trend line's combine-type
             * combine-type include: 堆叠折线、堆叠面积、堆叠柱状图。
             * config：line-stack, area-stack, column-stack
             */
            if (type.indexOf('-') > -1) {
                let chartStacking = type.split('-')[1];
                this.chartType = type.split('-')[0];
                type = chartStacking;
            }

            if (type === 'stack') {
                this.chartStacking = 'normal';
            }
            else if (type === 'normal') {
                this.chartStacking = null;
            }
            else {
                this.chartType = type;
                this.chartStacking = null;
            }
        }
    }
};

// WarningEvents
let WarningEvents = {
    mounted() {
        this.$on('tooltipformat', this.loadWarningTooltip);
        this.$on('chartloaded', this.loadWarningEvents);
    },
    methods: {

        /**
         * Loading WaringingEvents
         * loading Events when ruleNames in the config
         *
         * @param  {[type]} obj [description]
         */
        loadWarningEvents(obj) {
            let chart = obj.chart;
            let conf = this.trendConf;
            let aggrName = conf.data ? conf.data[0] : {};
            if (aggrName && aggrName.ruleNames && aggrName.ruleNames.length) {
                let paramString = JSON.stringify({
                    dimensions: aggrName.dimensions,
                    time: this.currentTime,
                    ruleNames: aggrName.ruleNames
                });
                let params = {
                    params: paramString
                };
                if (conf.extra) {
                    params.extra = conf.extra;
                }
                if (this.events && this.params === paramString) {
                    this.renderEvents(chart, this.events);
                }
                else if (this.extraUrls && this.extraUrls.warningEventsUrl) {
                    this.$wRequest.post(this.extraUrls.warningEventsUrl, params).then(data => {
                        this.events = [];
                        u.each(data.data, item => {
                            [].push.apply(this.events, item.events);
                        });
                        this.renderEvents(chart, this.events);
                    });
                }
            }
        },

        /**
         * Add events in series
         *
         * @param  {[type]} chart  [description]
         * @param  {[type]} events [description]
         */
        renderEvents(chart, events) {
            if (!chart || chart.getOption().series.length < 1) {
                return;
            }
            let option = chart.getOption();
            let series = option.series;
            let max = Number.MIN_VALUE;
            let min = Number.MAX_VALUE;

            let xAxisMax = Number.MIN_VALUE;
            let xAxisMin = Number.MAX_VALUE;

            u.each(series, item => {
                if (item.name === t() || item.name === '异常点' || !item.data) {
                    return;
                }
                max = max > item.dataMax ? max : item.dataMax;
                min = min > item.dataMin ? item.dataMin : min;

                let currentXMin = item.data.length > 0
                    ? item.data[0][0] : Number.MIN_VALUE;
                let currentXMax = item.data.length > 0
                    ? item.data[item.data.length - 1][0] : Number.MAX_VALUE;
                xAxisMax = xAxisMax > currentXMax ? xAxisMax : currentXMax;
                xAxisMin = xAxisMin > currentXMin ? currentXMin : xAxisMin;
            });

            xAxisMax = moment(xAxisMax).format('X');
            xAxisMin = moment(xAxisMin).format('X');
            if (series && events.length) {

                // get points in the specified time range
                events = handlerEventsArea(events, max, min, xAxisMax, xAxisMin);
                option.series.push({
                    name: '异常区域',
                    type: 'line',
                    itemStyle: {
                        color: '#ee90c1'
                    },
                    markArea: {
                        data: events,
                        itemStyle: {
                            color: '#ee90c1',
                            opacity: 0.6
                        }
                    }
                });
                chart.setOption(option);
            }
        },

        /**
         * add Warning Events points Info in tooltip
         *
         * @param  {[type]} toolTipObj [description]
         * @return {[type]}            [description]
         */
        loadWarningTooltip(toolTipObj) {
            let evts = findEventsByTimestamp(this.events || [], toolTipObj.point.axisValue);
            let htm = toolTipObj.htm;
            if (evts.length > 0) {
                htm.push('<dd style="padding: 3px 10px;">'
                    + '<span style="color:#ee90c1;">异常事件: </span><span>'
                    + evts.length
                    + '</span></dd>');
                u.each(evts, evt => {
                    if (evt.itemValues && evt.tags) {
                        htm.push('<dd class="echarts-tooltip-item">'
                            + evt.itemValues
                            + '</dd><dd class="echarts-tooltip-item-warning">维度：'
                            + evt.tags.join(',')
                            + '</dd>');
                    }
                });
            }
            return htm;
        }
    }
};

// CustomEvents
let CustomEvents = {
    mounted() {
        this.$on('tooltipformat', this.loadCustomTooltip);
        this.$on('chartloaded', this.loadCustomEvents);
    },
    methods: {
        loadCustomEvents(obj) {
            let chart = obj.chart;
            let conf = this.trendConf;
            let aggrName = conf.data ? conf.data[0] : {};
            if (aggrName && conf.eventList && conf.eventList.length) {
                let paramString = {
                    time: this.currentTime,
                    eventList: JSON.stringify(conf.eventList)
                };
                let params = paramString;
                if (this.eventTypes && this.params === paramString) {
                    this.renderCustomEvents(chart, this.eventTypes);
                }
                else if (this.extraUrls && this.extraUrls.customEventsUrl) {
                    this.$wRequest.post(this.extraUrls.customEventsUrl, params).then(data => {
                        let res = data.data;
                        if (res && res.success) {
                            this.eventTypes = res.data;
                            this.renderCustomEvents(chart, res.data);
                        }
                    });
                }
            }
        },
        renderCustomEvents(chart, eventTypes) {
            let bgColor = widgetConf.extraComponent.trend.eventColor;
            if (!chart || chart.getOption().series.length < 1) {
                return;
            }
            let option = chart.getOption();
            let series = option.series;
            let max = Number.MIN_VALUE;
            let min = Number.MAX_VALUE;

            let xAxisMax = Number.MIN_VALUE;
            let xAxisMin = Number.MAX_VALUE;

            u.each(series, item => {
                if (item.name === '正常范围' || item.name === '异常点' || !item.data) {
                    return;
                }
                max = max > item.dataMax ? max : item.dataMax;
                min = min > item.dataMin ? item.dataMin : min;

                let currentXMin = item.data.length > 0
                    ? item.data[0][0] : Number.MIN_VALUE;
                let currentXMax = item.data.length > 0
                    ? item.data[item.data.length - 1][0] : Number.MAX_VALUE;
                xAxisMax = xAxisMax > currentXMax ? xAxisMax : currentXMax;
                xAxisMin = xAxisMin > currentXMin ? currentXMin : xAxisMin;
            });

            xAxisMax = moment(xAxisMax).format('X');
            xAxisMin = moment(xAxisMin).format('X');
            if (series.length > 0 && eventTypes.length) {
                u.each(eventTypes, (eventType, index) => {
                    let events = handlerEventsArea(eventType.events, max, min, xAxisMax, xAxisMin);
                    option.series.push({
                        name: eventType.name,
                        type: 'line',
                        silent: false,
                        itemStyle: {
                            color: eventType.color || bgColor[(index % bgColor.length)]
                        },
                        markArea: {
                            data: events,
                            itemStyle: {
                                color: eventType.color || bgColor[(index % bgColor.length)],
                                opacity: 0.4
                            }
                        }
                    });
                    chart.setOption(option);
                });
            }
        },
        loadCustomTooltip(toolTipObj) {
            let bgColor = widgetConf.extraComponent.trend.eventColor;
            let evts = findEventsByTimestamp(this.eventTypes || [], toolTipObj.point.axisValue, 'customEvents');
            let htm = toolTipObj.htm;
            if (evts.length > 0) {
                u.each(evts, (evt, i) => {
                    if (i === 0) {
                        let color = evt.color || bgColor[evt.index];
                        let spanInnerHTML = '<dd class="echarts-tooltip-item" '
                            + 'style="color:'
                            + color
                            + '">'
                            + evt.name
                            + ': </dd>';
                        htm.push(spanInnerHTML);
                    }
                    htm.push('<dd class="echarts-tooltip-item-desc">'
                        + evt.desc
                        + '</dd>');
                });
            }
            return htm;
        }
    }
};

// Abnormal Points
let Points = {
    mounted() {
        this.$on('tooltipformat', this.loadPointsTooltip);
        this.$on('chartloaded', this.loadPoints);
    },
    methods: {

        /**
         * Load Abnormal Points
         * Loading Events when ruleNames and cycle in the config
         *
         * @param  {[type]} obj [points Object]
         * @return {[type]}     [description]
         */
        loadPoints(obj) {
            let chart = obj.chart;
            let conf = this.trendConf;
            let aggrName = conf.data ? conf.data[0] : {};
            if (aggrName && aggrName.ruleNames && aggrName.ruleNames.length && aggrName.cycle) {
                let dimensions = u.map(aggrName.dimensions, item => {
                    if (item.values && item.values.length) {
                        return {
                            name: item.name,
                            value: item.values[0]
                        };
                    }
                    return null;
                });
                dimensions = u.filter(dimensions, item => {
                    return item && item.value !== 'ALL';
                });
                let paramString = JSON.stringify({
                    dimensions: dimensions,
                    time: this.currentTime,
                    ruleName: aggrName.ruleNames[0],
                    cycle: aggrName.cycle
                });
                let params = {
                    params: paramString
                };
                if (conf.extra) {
                    params.extra = conf.extra;
                }
                if (this.abnormals && this.params === paramString) {
                    this.renderAbnormals(chart, this.abnormals);
                }
                else if (this.extraUrls && this.extraUrls.trendPointsUrl){
                    this.$wRequest.post(this.extraUrls.trendPointsUrl, params).then(data => {
                        let res = data.data;
                        if (res && res.success) {
                            this.abnormals = res.data || [];
                            this.renderAbnormals(chart, this.abnormals);
                        }
                    });
                }
            }
        },

        /**
         * Add Abnormals Points in series
         *
         * @param  {[type]} chart  [description]
         * @param  {[type]} events [description]
         */
        renderAbnormals(chart, abnormals) {
            if (!chart || chart.getOption().series.length < 1) {
                return;
            }

            let option = chart.getOption();
            let series = option.series;

            if (series.length > 0 && abnormals.length) {
                u.each(abnormals, list => {
                    option.series.push({
                        name: list.name || '异常点',
                        type: 'line',
                        silent: false,
                        itemStyle: {
                            color: list.color || '#f00'
                        },
                        markPoint: {
                            data: u.map(list.data, item => {
                                return {
                                    coord: [item[0], item[1]]
                                };
                            }),
                            symbol: list.symbol || 'square',
                            symbolSize: list.size || 12,
                            itemStyle: {
                                color: list.color || '#f00'
                            }
                        }
                    });
                });

                chart.setOption(option);
            }
        },

        /**
         * add Abnormal Points Info in tooltip
         *
         * @param  {[type]} toolTipObj [description]
         * @return {[type]}            [description]
         */
        loadPointsTooltip(toolTipObj) {
            let evts = findEventsByTimestamp(this.abnormals || [], toolTipObj.point.axisValue, 'point');
            let htm = toolTipObj.htm;
            let conf = toolTipObj.conf;
            if (evts.length > 0) {
                u.each(evts, evt => {
                    let cur;
                    let name;
                    let style = '';
                    if (Object.prototype.toString.call(evt) === '[object Object]') {
                        cur = evt.value;
                        name = evt.name;
                        style = `style="color: ${evt.color};"`;
                    }
                    else {
                        cur = evt[3];
                        name = '异常点'
                    }
                    htm.push(`<dd class="echarts-tooltip-item echarts-tooltip-point-item"><span ${style}>${name}: </span>`
                        + mdutil.numberFormat(cur, conf.style.decimals) + '</dd>');
                });
            }
            return htm;
        }
    }
};

export default {
    props: {

        // get conf's url
        url: {
            type: String,
            required: false
        },

        // get widget's time
        params: {
            type: Object,
            required: false
        },

        // get widget's name
        path: {
            type: String,
            required: false
        },

        // get widget's conf
        conf: {
            type: Object,
            required: false
        },

        // get widget's data url
        dataUrl: {
            type: String,
            default: '',
            required: false
        },

        // get data's extra params
        extraParams: {
            type: Object,
            required: false
        },

        // get extraUrls data's api. such as warningEventsUrl
        extraUrls: {
            type: Object,
            required: false
        },

        // get conf's method type
        confMethod: {
            type: String,
            default: 'post',
            required: false
        },

        // extra style to supplement mdtrend
        extraStyle: {
            type: Object,
            required: false
        },

        // y轴, tooltip是否根据单位转换
        numUnitType: {
            type: String,
            default: 'thousand', // thousand, unit
            required: false
        }

    },
    name: 'NvMDTrend',
    mixins: [ChartType, WarningEvents, CustomEvents, Points, mixin],
    components: {nvMask},
    data() {
        let height = this.params ? this.params.height || HEIGHT : HEIGHT;
        let defaultData = this.conf ? this.conf.display : [];
        return {
            trendConf: u.clone(this.conf),
            data: u.clone(defaultData),
            mdStyle: 'height:' + height + 'px;',
            state: false,
            isLoading: false,
            currentTime: false,
            id: 0,
            errTip: false,
            chart: {},

            // a copy of params
            timeParams: this.params
        };
    },
    watch: {
        params: {
            handler(val) {
                if (val && !this.trendConf.refresh) {
                    this.state = false;
                    this.showMask();
                    this.currentTime = val.start + '|' + val.end;
                    this.trendConf.refresh = false;
                    this.timeParams = val;
                    clearTimeout(this.id);
                    this.renderDataByConf(this.trendConf);
                }
            },
            deep: true
        },
        conf: {
            handler(val, oldVal) {
                if (val !== oldVal) {
                    this.state = false;
                    this.showMask();
                    this.renderDataByConf(val);
                }
            },
            deep: true
        }
    },
    computed: {
        title() {
            if (!this.trendConf) {
                return '';
            }
            return this.trendConf ? this.trendConf.title : '';
        },
        linkUrl() {
            const conf = this.trendConf;
            if (!conf) {
                return;
            }
            return conf.link;
        },
        changeType() {
            const conf = this.trendConf;
            if (!conf) {
                return true;
            }
            return conf.style.displayType;
        },
        showZoom() {
            if (this.extraStyle
                && this.extraStyle.dataZoom
                && this.extraStyle.dataZoom.show === false) {
                return false;
            }
            else if (widgetConf.extraComponent
                && widgetConf.extraComponent.trend
                && widgetConf.extraComponent.trend.dataZoom
                && widgetConf.extraComponent.trend.dataZoom.show === false) {
                return false;
            }
            return true;
        }
    },
    created() {

        /**
         * get user's globle conf
         * it includes:
         * 1. data and conf's API of interface
         */
        widgetConf = this.$extraEchartsConf;
        if (this.conf) {

            // if user has set trend data just render it.
            this.renderDataByConf(this.conf);
            return;
        }
        if (this.path) {
            this.getConf();
            return;
        }
        this.initConf();
    },
    mounted() {
        // 同步tooltip
        eventBus.$on('syncTooltips', this.syncTooltips);

        // when listen to the event of refresh-page, refresh the widget.
        eventBus.$on('refresh-page', () => {
            this.state = false;
            this.redraw();
        });
        this.redraw = u.debounce(this.scrollTop, 100);
        let scrollTrigger = widgetConf.extraComponent.trend.scrollTrigger || document;

        // add lazy loading when you scroll the page
        $(scrollTrigger).on('scroll', this.redraw);

        this.resizePage = u.debounce(this.resize, 200);
        $(window).on('resize', this.resizePage);
    },
    methods: {
        freshData() {

            // 当配置时间类型为无或者为使用仪表盘的时间，则设置组件默认时
            if (!this.trendConf.timeType || this.trendConf.timeType === 'relative') {
                this.trendConf = Object.assign({}, DEFAULTCONF, this.trendConf);
            }
            const conf = this.trendConf;
            if (!this.timeParams) {
                this.timeParams = this.initTime();
            }
            let showTime = mdutil.setTime(conf.timeType, this.timeParams, conf.time || DEFAULTTIME);

            // suport the function of data time comparison, when the data's type is array
            if (Object.prototype.toString.call(conf.data) === '[object Array]') {
                conf.data.map(itemData => {
                    itemData.time = handleTrendTime([showTime], itemData.contrast || [], {});
                    return itemData;
                });
            }

            let params = {
                data: JSON.stringify(conf.data) || '{}',
                time: showTime
            };
            if (!this.state) {
                this.state = true;
            }

            let dataUrl;
            let dataRequestType = DEFAULT_REQUEST_TYPE;
            if (conf.datasource) {

                // suport multiple data source
                dataUrl = conf.datasource.api;

                // set data interface's method type
                dataRequestType = conf.datasource.method || DEFAULT_REQUEST_TYPE;
            }
            else if (this.dataUrl) {
                dataUrl = this.dataUrl;
            }
            else {

                /**
                 * TODO: Compatible with the configuration of the used code base,
                 * post-optimization only retains saMdTrend
                 */
                dataUrl = widgetConf.getAPI(widgetConf.mons.dataApi.nvMdTrend || widgetConf.mons.dataApi.saMdTrend);
            }

            // if request's method type is get, interface's param key is params, otherwise the param's key is data.
            let dataParams = {
                url: dataUrl,
                method: dataRequestType.toLowerCase(),
                showLoading: false
            };
            if (dataRequestType.toLowerCase() === 'get') {
                dataParams.params = params;
            }
            else {
                dataParams.data = params;
            }
            this.isLoading = true;
            this.$wRequest(dataParams).then(mdData => {
                this.isLoading = false;
                if (mdData.data.success) {
                    this.errTip = false;
                    let freshTime = conf.freshTime ? conf.freshTime : TIMING;
                    this.data = mdData.data.data;
                    if (mdData.data.data.length === 0) {
                        this.showError(t('mdtrend.nodataTip'));
                    }
                    else {
                        this.initChatType(conf.style.displayType);
                        this.renderChart(mdData.data.data);
                        this.hideMask();

                        // auto refresh trend data
                        if (!conf.refresh) {
                            clearTimeout(this.id);
                            return;
                        }
                        this.id = setTimeout(() => {
                            this.currentTime = params.time;
                            this.scrollTop();
                        }, freshTime * 1000);
                    }
                }
                else {
                    this.showError(mdData.data.message);
                }
            });
        },
        renderDataByConf(conf) {
            let trendConf = u.clone(conf);
            this.trendConf = u.extend({
                title: t('mdtrend.title'),
                style: {
                    displayType: 'line',

                    // valus are: zero/connect/null，default is null
                    nullPointMode: 'zero'
                }
            }, trendConf);
            if (trendConf && trendConf.display) {
                if (trendConf.style && trendConf.style.displayType) {
                    this.initChatType(trendConf.style.displayType)
                }
                this.$nextTick(() => {
                    this.data = trendConf.display;
                    if (trendConf.display.length === 0) {
                        this.showError(t('mdtrend.nodataTip'));
                    }
                    else {
                        this.renderChart(trendConf.display);
                    }
                    this.hideMask();
                });
                return;
            }
            this.$nextTick( () => {
                this.scrollTop();
            });
        },

        /**
         * get conf by url
         */
        getConf() {
            let confMethod = this.confMethod.toLowerCase() || DEFAULT_REQUEST_TYPE.toLowerCase();

            /**
             * TODO: Compatible with the configuration of the used code base,
             * post-optimization only retains saMdTrend
             */
            let confUrl = this.url
                ? this.url
                : widgetConf.getAPI(widgetConf.mons.confApi.nvMdTrend || widgetConf.mons.confApi.saMdTrend);
            let params = Object.assign({}, {
                name: this.path
            }, this.extraParams);
            let axiosParams = {
                url: confUrl,
                method: confMethod,
                showLoading: false
            };
            if (confMethod === 'get') {
                axiosParams.params = params;
            }
            else {
                axiosParams.data = params;
            }
            this.isLoading = true;
            this.$wRequest(axiosParams).then(data => {
                this.isLoading = false;
                if (data.data.success) {
                    let trendData = data.data.data;
                    this.errTip = false;
                    if (trendData.configure) {
                        this.trendConf = JSON.parse(trendData.configure);
                    }
                    else {
                        this.trendConf = trendData;
                    }

                    // get render data
                    this.scrollTop();
                }
                else {
                    this.showError(data.data.message);
                }
            });
        },

        /**
         * render the trend chart by data and configuration
         *
         * @param  {[type]} data      [description]
         * @return {[type]}           [description]
         */
        renderChart(data) {
            const conf = this.trendConf;
            let series = this.manageData(data);
            const numUnitType = this.numUnitType;

            // 如果this.chart已经初始化过了，清除
            if (typeof this.chart.clear === 'function') {
                this.chart.clear();
            }

            this.commonOption = {
                noDataLoadingOption:
                {
                    text: widgetConf.nodata,
                    effect: 'bubble',
                    effectOption:
                    {
                        effect:
                        {
                            n: 0
                        }
                    }
                },
                color: widgetConf.extraComponent.trend.colors,
                grid: {
                    top: 50,
                    left: '2.6%',
                    right: this.threshold ? 60 : 20,
                    bottom: this.showZoom ? 75 : 50,
                    containLabel:true
                },
                legend: {
                    type: 'scroll',
                    show: true,
                    bottom: 5,
                    icon: 'line',
                    itemWidth: 10
                },
                toolbox: {
                    show: true,
                    left: 20,
                    top: 0,
                    feature: {
                        myTool: {
                            show: this.changeType,
                            title: this.t('mdtrend.switchToArea'),
                            icon: 'image://' + chartareaPng,
                            onclick: () => {
                                u.each(this.commonOption.series, item => {
                                    item.type = 'line';
                                    item.areaStyle = {};
                                    item.stack = this.chartStacking === 'normal' ? {} : null
                                });
                                this.chart.setOption(this.commonOption);
                            }
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar', 'stack', 'tiled'],
                            icon: {
                                line: 'image://' + chartlinePng,
                                bar: 'image://' + chartcolumnPng,
                                stack: 'image://' + chartstackPng,
                                // tiled: 'image://' + chartnormalPng
                            },
                            title: {
                                line: this.t('mdtrend.switchToLine'),
                                bar: this.t('mdtrend.switchToColumn'),
                                stack: this.t('mdtrend.switchToStack'),
                            },
                            option: {
                                line: {
                                    itemStyle: {
                                    },
                                    series: {
                                        areaStyle: null
                                    }
                                }
                            }
                        }
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                    splitNumber: 10,
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        formatter: value => {
                            let label = moment(value).format('HH:mm:ss');
                            if (label === '00:00:00') {
                                return '{spStyle|' + moment(value).format('YYYY-MM-DD') + '}';
                            }
                            return moment(value).format(this.xAxisFormat || timeFormatter);
                        },
                        color: '#333',
                        showMaxLabel: false,
                        rich: {
                            spStyle: {
                                fontWeight: 'bold'
                            }
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: Object.assign(this.yAxis, {
                    type: 'value',
                    scale: true,
                    splitLine: {
                        color: '#eee'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        color: '#333',
                        formatter(value) {
                            return shortValue(value, numUnitType,conf);
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }),
                dataZoom: [
                    {
                        bottom: 29,
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
                            return moment(value).format(timeFormatter);
                        },
                        realtime: false
                    }
                ],
                tooltip: {
                    backgroundColor: '#fff',
                    trigger: 'axis',
                    padding: [10, 20, 10, 10],
                    textStyle: {
                        color: '#666',
                        fontSize: 12
                    },
                    axisPointer: {
                        lineStyle: {
                            color: '#3a62ca'
                        }
                    },
                    confine: true,
                    extraCssText: 'border-radius:0;padding:0;',
                    formatter: params => {
                        let decimals = conf.style.decimals;
                        let time;
                        let seriesTooltip = [];
                        u.each(params, item => {
                            let valueSuffix = this.commonOption.series[item.seriesIndex].tooltip.valueSuffix || '';
                            time = moment(item.axisValue).format(timeFormatter);
                            if (item.value[1] === null || item.value[1] === undefined) {
                                return;
                            }
                            let html = `<dd class="echarts-tooltip-item" style="color: ${item.color}">`
                                + item.seriesName
                                + ': '
                                + `<span class="echarts-tooltip-item-value">`
                                + mdutil.setDecimal(item.value[1], decimals, numUnitType)
                                + valueSuffix
                                + `</span>`
                                + '</dd>';
                            seriesTooltip.push(html);
                        });

                        this.$emit('tooltipformat', {
                            htm: seriesTooltip,
                            point: params[0],
                            conf: conf
                        });

                        // 当所有线条都没有数据时，不展示tooltip;
                        if (seriesTooltip.length === 0) {
                            return '';
                        }
                        return '<div class="echarts-tooltip">'
                            + '<dl>'
                            + '<dt class="echarts-tooltip-title">'
                            + time
                            + '</dt>'
                            + seriesTooltip.join('')
                            + '</dl></div>';
                    }

                }
            };

            this.commonOption.series = series;

            this.chart = echarts.init(this.$refs.chart);

            // 处理xAxis重叠的问题
            if (typeof this.chart.getWidth === 'function') {
                let chartWidth = this.chart.getWidth();
                this.commonOption.xAxis.splitNumber = parseInt(chartWidth / 150, 10)
            }

            this.chart.setOption(this.commonOption);


            // 设置下全局属性
            this.chart.setOption(widgetConf.extraComponent.trend);

            if (this.extraStyle) {
                this.chart.setOption(this.extraStyle);
            }

            this.chart.on('magictypechanged', e => {
                if (e.currentType === 'line') {
                    u.each(this.commonOption.series, item => {
                        item.areaStyle = null;
                        item.type = 'line';
                        item.stack = this.chartStacking === 'normal' ? {} : null
                    });
                    this.chart.setOption(this.commonOption);
                }
                else if (e.currentType === 'stack') {
                    this.chartStacking = 'normal';
                }
                else if (e.currentType === 'tiled') {
                    this.chartStacking = '';
                }
            });

            this.chart.on('updateAxisPointer', function (params) {
                eventBus.$emit('syncTooltips', params, this.chart);
            });

            this.$emit('chartloaded', {
                chart: this.chart
            });
        },

        isInScreen() {
            const main = this.$refs.trend;
            let top = mdutil.getScrollTop();
            let height = mdutil.getViewHeight();
            let offset = mdutil.getOffset(main);
            if (offset && offset.top < top + height && offset.bottom > top) {
                return true;
            }
            return false
        },

        /**
         * caculate the sceen's position and judge whether to load
         */
        scrollTop() {
            if (!this.state
                && this.trendConf
                && !this.trendConf.display
                && !this.isLoading
                && this.isInScreen()) {
                try {
                    this.freshData();
                }
                catch (e) {
                    this.showError(t('mdtrend.errorConfig'));
                }
            }
        },

        manageData(data) {
            const conf = this.trendConf;
            const warningColor = widgetConf.extraComponent.themeColor.warningColor;
            const numUnitType = this.numUnitType;

            let max = Number.MIN_VALUE;
            let min = Number.MAX_VALUE;

            let threshold = conf.style.threshold;
            this.threshold = threshold;
            let series = [];
            let yAxis = {
                name: ''
            };

            let lineWidth = data.length > 6 ? 1 : 2;

            let timeGap = Number.MIN_VALUE;

            u.each(data, item => {
                let name = item.name;
                let list = item.data;
                let connectNulls = false;
                let showSymbol = false;

                // if nullPointMode is true,use 0 replace the null values
                if (conf.style.nullPointMode === 'zero') {
                    list = list.map(it => {
                        if (it[1] === null || it[1] === undefined) {
                            it[1] = 0;
                        }
                        return it;
                    });
                }
                else if (conf.style.nullPointMode === 'connect') {
                    connectNulls = true;
                }
                else {
                    showSymbol = true;
                }

                list = u.map(list, it => {
                    let value = it[1];
                    if (value !== null) {
                        max = max > value ? max : value;
                        min = min > value ? value : min;
                    }
                    let data = [
                        it[0],
                        value
                    ];

                    return data;
                });

                // 寻找X轴时间最佳展示Label格式
                if (list
                    && list.length > 0
                    && list[list.length - 1][0]
                    && list[0][0]
                    && timeGap < (list[list.length - 1][0] - list[0][0])
                ) {
                    timeGap = (list[list.length - 1][0] - list[0][0]);
                }

                // when user config threshold,calculate the max and min of the yAxis
                let yMax = threshold ? Math.max(threshold, max) : max;
                let yMin = threshold ? Math.min(threshold, min) : min;

                // 设置孤点功能
                let currentIndx = 1;
                let lens = list.length;
                while (currentIndx > 0 && currentIndx  <= lens - 2) {
                    let preIndx = currentIndx - 1;
                    let aferIdx = currentIndx + 1;

                    if (
                        (list[preIndx][1] === undefined || list[preIndx][1] === null)
                        && (list[aferIdx][1] === undefined || list[aferIdx][1] === null)
                        && list[currentIndx][1] !== undefined) {
                        list[currentIndx] = {
                            value: list[currentIndx],
                            symbol: 'rect'
                        };
                    }
                    // 第一个节点
                    else if (currentIndx === 1
                        && list[preIndx][1] !== undefined
                        && (list[currentIndx][1] === undefined || list[currentIndx][1] === null)) {
                        list[preIndx] = {
                            value: list[preIndx],
                            symbol: 'rect'
                        };
                    }
                    // 最后一个点有数据，倒数第二个点没数据
                    else if (currentIndx === lens - 2
                        && list[aferIdx][1] !== undefined
                        && (list[currentIndx][1] === undefined || list[currentIndx][1] === null)) {
                        list[aferIdx] = {
                            value: list[aferIdx],
                            symbol: 'rect'
                        };
                    }
                    // 最后一个点有数据，倒数第二个点有数据
                    else if (currentIndx === lens - 2
                        && list[aferIdx][1] !== undefined
                        && (list[currentIndx][1] !== undefined)) {
                        list[aferIdx] = {
                            value: list[aferIdx],
                            symbol: 'none'
                        };
                        list[currentIndx] = {
                            value: list[currentIndx],
                            symbol: 'none'
                        };
                    }
                    else {
                        list[currentIndx] = {
                            value: list[currentIndx],
                            symbol: 'none'
                        };
                    }
                    currentIndx++;
                }

                let currentSeries = {
                    name: name,
                    data: list,
                    dataMax: yMax,
                    dataMin: yMin,
                    symbol: 'rect',
                    showSymbol: showSymbol,
                    showAllSymbol: showSymbol,
                    legendHoverLink: false,
                    type: this.chartType === 'column' ? 'bar' : 'line',
                    connectNulls: connectNulls,
                    tooltip: {
                        valueSuffix: item.unit || conf.style.unit || ''
                    },
                    lineStyle: {
                        width: lineWidth
                    },
                    barGap: '-100%',
                    animation: false,
                    areaStyle: this.chartType === 'area' ? {} : null,
                    stack: this.chartStacking === 'normal' ? {} : null
                };

                if (this.extraStyle && this.extraStyle.series) {
                    series.push(Object.assign({}, currentSeries, this.extraStyle.series));
                }
                else {
                    series.push(currentSeries);
                }
            });

            // 画阈值线
            if (threshold) {
                series.push({
                    type: 'line',
                    markLine: {
                        silent: true,
                        symbol: 'none',
                        label: {
                            position: 'end',
                            formatter() {
                                let result;
                                if (numUnitType === 'thousand') {
                                    result = result > 1000 ? result.toLocaleString() : result;
                                }
                                else {
                                    result = shortValue(+threshold) + (conf.style.unit || '');
                                }

                                return result;
                            }
                        },
                        data: [
                            {
                                yAxis: +threshold,
                                lineStyle: {
                                    color: warningColor,
                                    type: 'solid',
                                    width: 1
                                }
                            }
                        ]
                    }
                });
            }

            if ((timeGap / 1000) < (24 * 60 * 60)) {
                this.xAxisFormat = 'HH:mm:ss';
            }
            // 跨天
            else if ((timeGap / 1000) > (24 * 60 * 60)) {
                this.xAxisFormat = 'DD HH:mm:ss';
            }

            // 跨月
            else if ((timeGap / 1000) > (24 * 60 * 60 * 30)) {
                this.xAxisFormat = 'MM-DD HH:mm:ss';
            }

            // 跨年
            else if ((timeGap / 1000) > (24 * 60 * 60 * 30 * 12)) {
                this.xAxisFormat = 'YYYY-MM-DD HH:mm:ss';
            }

            this.yAxis = yAxis;
            return series;
        },

        /**
         * init conf
         * if user have no conf ,set display = 100, and show it
         */
        initConf() {
            let initConf = {
                display: []
            };
            this.renderDataByConf(initConf);
        },

        /**
         * if user set no time, set default time to params
         * @return {[type]} [params time]
         */
        initTime() {
            let times = mdutil.timetransfer(DEFAULTTIME);
            return {
                start: times[0],
                end: times[1]
            };
        },

        /**
         * refresh current widget by user
         * External fuction
         */
        refresh() {
            this.state = false;
            this.showMask();
            this.getConf();
        },

        /**
         * show loading mdmask
         */
        showMask() {
            this.$refs.mask.hide();
        },

        /**
         * hide loading mdmask
         */
        hideMask() {
            this.$refs.mask.hide();
        },

        /**
         * show error massage
         */
        showError(message) {
            this.errTip = message;
            this.hideMask();
        },

        /**
         * resize chart
         */
        resize() {
            if (this.chart && typeof this.chart.resize === 'function') {
                this.chart.resize();
                // 处理xAxis重叠的问题
                if (typeof this.chart.getWidth === 'function') {
                    let currentWidth = this.chart.getWidth();
                    let options = this.chart.getOption();
                    options.xAxis[0].splitNumber = parseInt(currentWidth / 150, 10);
                    this.chart.setOption(options);
                }
            }
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
        }
    },

    beforeDestroy() {
        clearTimeout(this.id);
        if (this.chart) {
            if (typeof this.chart.off === 'function') {
                this.chart.off('updateAxisPointer');
                this.chart.off('magictypechanged');
            }
            if (typeof this.chart.clear === 'function') {
                this.chart.clear();
            }
            if (typeof this.chart.dispose === 'function') {
                this.chart.dispose();
            }
        }
        $(window).off('resize', this.resizePage);
        let scrollTrigger = widgetConf.extraComponent.trend.scrollTrigger || document;
        $(scrollTrigger).off('scroll', this.redraw);
        this.$off('tooltipformat');
        this.$off('chartloaded');
        this.$off('syncTooltips');
        this.$off('refresh-page');
    }
};
</script>
