<template>
    <div ref="circle" class="ui-mdcircle">
        <div class="multiple-chart-header">
            <h2 v-if="!link">{{title}}</h2>
            <h2 v-else="link">
                <a :href="link" target="_blank">{{title}}</a>
            </h2>
            <h2 class="ui-circle-time">{{times}}</h2>
        </div>
        <div class="multiple-chart-body" v-if="!errTip">
            <div class="echarts" ref="chart" :style="mdStyle"></div>
        </div>
        <div class="circle-error-holder" v-if="errTip">{{errTip}}</div>
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


const TITLE = '仪表图';
const HEIGHT = 200;
const DEFAULTTIME = 'before(2h)';
const DEFAULTFORMAT = 'MM.DD HH:mm';
const DEFAULTCONF = {
    'title': TITLE,
    'timeType': 'relative',
    'time': DEFAULTTIME
};
const DEFAULT_REQUEST_TYPE = 'post';
let widgetConf = {};

/**
 * Repair component color gradient problem
 * Assign fixed component colors according to numeric values
 * The maximum and minimum values are calculated according to the configuration
 *
 * @param  {[type]} data      [description]
 * @param  {[type]} threshold [description]
 * @return {[type]}           [description]
 */
function filterThreshold(data, threshold) {
    let colorMap = widgetConf.extraComponent.circle.colors;
    let min = parseFloat(threshold.min);
    let max = parseFloat(threshold.max);
    let thresholdArr = threshold.thresholdColor;
    let thresholdColor = threshold.thresholdColor;
    if (typeof data === 'number') {
        thresholdArr = [];
        if (thresholdColor.length > 0) {
            u.find(thresholdColor, (item, index) => {
                if (data <= min + (item[0] * (max - min))) {
                    thresholdArr.push([data / max, item[1]]);
                    return true;
                }
                if ((index === thresholdColor.length - 1) && thresholdArr.length === 0) {
                    thresholdArr.push([data / max, item[1]]);
                }
            });
        }
        // 如果没有设置阈值，修复问题
        else {
            thresholdArr.push([data / max, colorMap.default]);
        }
    }
    return thresholdArr;
}

/**
 * Analytic configuration threshold
 *
 * @param  {[type]} threshold [description]
 * @return {[type]}           [description]
 */
function getThreshold(style) {
    let colorMap = widgetConf.extraComponent.circle.colors;
    let threshold = style.threshold;
    let arr = [];
    let thresholdColor = [];
    let obj = {};
    obj.min = style.min ? parseFloat(style.min) : 0;
    obj.max = style.max ? parseFloat(style.max) : 100;
    if (threshold.length > 0) {
        arr = threshold.sort((a, b) => {
            a[0] = parseFloat(a[0]);
            b[0] = parseFloat(b[0]);
            return a[0] - b[0];
        });
        arr = threshold;
        if (arr[0][0] > obj.min) {
            arr.unshift([obj.min, arr[0][0], colorMap.default]);
        }
        let len = arr.length;
        if (arr[len - 1][1] < obj.max) {
            arr.push([arr[len - 1][1], obj.max, colorMap.default]);
        }
        u.each(arr, item => {
            let relationArr = [];
            relationArr.push((item[1] - obj.min) / (obj.max - obj.min));
            if (colorMap[item[2]]) {
                relationArr.push(colorMap[item[2]]);
            }
            else {
                relationArr.push(item[2]);
            }
            if (relationArr.length !== 0) {
                thresholdColor.push(relationArr);
            }
        });
    }
    obj.thresholdColor = thresholdColor;
    return obj;
}

export default {
    name: 'circle',
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

        // get conf's method type
        confMethod: {
            type: String,
            default: 'post',
            required: false
        },

        // extra style to supplement circle
        extraStyle: {
            type: Object,
            required: false
        }
    },
    components: {nvMask},
    data() {
        let height = this.params ? this.params.height || HEIGHT : HEIGHT;
        return {
            circleConf: {},
            curOptions: {},
            mdConf: {},
            height: height,
            mdStyle: 'height:' + height + 'px;',
            clientHeight: document.documentElement.clientHeight,

            // params bak
            timeParams: this.params,
            link: false,
            data: 0,
            showTime: DEFAULTTIME,
            errTip: false,

            // Whether the component is loading
            isLoading: false,

            // Whether the component has been loaded
            isload: false
        };
    },
    computed: {
        title() {
            return this.circleConf ? this.circleConf.title : TITLE;
        },
        times() {
            if (!this.circleConf) {
                return;
            }
            let titleTimes = '';
            titleTimes = mdutil.timetransfer(this.showTime).join('|');
            let times = '';
            if (titleTimes) {
                times = titleTimes.split('|');
                u.each(times, (item, i) => {
                    times[i] = moment(item).format(this.circleConf.showTimeFormat || DEFAULTFORMAT);
                });
                times = times.join('-');
            }
            return times;
        }
    },
    watch: {
        params: {
            handler(val) {
                if (val) {
                    this.showMask();
                    this.timeParams = val;
                    this.isload = false;
                    this.renderDataByConf(this.circleConf);
                }
            },
            deep: true
        },
        conf: {
            handler(val, oldVal) {
                if (val !== oldVal) {
                    this.showMask();
                    this.isload = false;
                    this.renderDataByConf(val);
                }
            },
            deep: true
        }
    },
    mounted() {

        // prevent to fresh the view when windows's width change too often.
        this.redraw = u.throttle(this.scrollTop, 200);
        this.resizePage = u.throttle(this.resize, 200);
        $(window).on('resize', this.resizePage);
        eventBus.$on('refresh-page', () => {
            this.isload = false;
            this.resizePage();
        });

        // add lazy loading when you scroll the page
        
        let scrollTrigger = widgetConf.extraComponent.trend.scrollTrigger || document;
        $(scrollTrigger).on('scroll', this.redraw);
    },
    created() {
        widgetConf = this.$extraEchartsConf;

        // If the external configuration conf renders directly
        if (this.conf) {
            this.renderDataByConf(this.conf);
            return;
        }

        // No conf gets the cloud configuration through path
        if (this.path) {
            this.getConf();
            return;
        }

        // Set the default conf value
        this.initConf();
    },
    methods: {

        /**
         * Get conf through path
         */
        getConf() {
            let confUrl = this.url;
            let confMethod = this.confMethod.toLowerCase() || DEFAULT_REQUEST_TYPE.toLowerCase();
            if (!this.url) {

                /**
                 * TODO: Compatible with the configuration of the used code base,
                 * post-optimization only retains nvMdCircle
                 */
                confUrl = widgetConf.getAPI(widgetConf.mons.confApi.nvMdCircle || widgetConf.mons.confApi.saMdCircle);
            }

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
                    this.errTip = false;
                    this.circleConf = JSON.parse(data.data.data.configure);

                    // get render data

                    this.scrollTop();
                }
                else {
                    this.showError(data.data.message);
                }
            });
        },

        /**
         * init conf
         * if user have no conf ,set display = 100, and show it
         */
        initConf() {
            let initConf = {
                display: 100
            };
            this.renderDataByConf(initConf);
        },

        /**
         * calculate width and height
         */
        freshContainer() {
            let width = $(this.$refs.circle).width();
            this.height = this.params ? this.params.height || HEIGHT : HEIGHT;
            if (this.height > width / 2 ) {
                this.height = width / 2;
            }
            this.mdStyle = 'height:' + this.height + 'px;';
        },


        getRadius() {
            let width = $(this.$refs.circle).width();
            if (width < 320) {
                return this.height - 30;
            }
            else {
                return this.height - 40;
            }
        },

        getPositionY() {
            let width = $(this.$refs.circle).width();
            if (width < 320) {
                return this.height - 15;
            }
            else {
               return this.height - 25;
            }
            
        },

        resize() {
            // 重设下高度值
            this.freshContainer();
            if (this.chart && typeof this.chart.resize === 'function') {
                if (typeof this.chart.getWidth !== 'function') {
                    return;
                }
                let options = this.chart.getOption();
                options.series[0].radius = this.getRadius();
                options.series[0].center = ['50%', this.getPositionY()];
                if (this.chart.getWidth() <= 320) {
                    options.series[0].axisLine.lineStyle.width = 30;
                    options.series[0].axisLabel.width = 30;
                }
                else {
                    options.series[0].axisLine.lineStyle.width = 38;
                    options.series[0].axisLabel.width = 38;
                }
                this.$nextTick(() => {
                    this.chart.setOption(options);
                    if (this.extraStyle) {
                        this.chart.setOption(this.extraStyle);
                    }
                    this.chart.resize();
                    });
            }
        },

        /**
         * update data
         */

        freshData() {
            if (!this.timeParams) {
                this.timeParams = this.initTime();
            }

            /**
             * When the configuration time type is none or the time when the dashboard is used,
             * the component is set by default.
             */
            if (!this.circleConf.timeType || this.circleConf.timeType === 'relative') {
                this.circleConf = Object.assign({}, DEFAULTCONF, this.circleConf);
            }
            let showTime = mdutil.setTime(this.circleConf.timeType, this.timeParams, this.circleConf.time);
            let params = {
                data: JSON.stringify(this.circleConf.data) || '{}',
                time: showTime
            };
            this.showTime = showTime;
            // users can set dataUrl in a extra visualWidgetConf.js

            // Data request configuration
            let dataUrl;
            let dataRequestType = DEFAULT_REQUEST_TYPE;
            if (this.circleConf.datasource) {
                let datasource = this.circleConf.datasource;

                // Support for multiple data sources
                dataUrl = datasource.api;

                // Configuration includes data request mode
                dataRequestType = datasource.method || DEFAULT_REQUEST_TYPE;
            }
            else if (this.dataUrl) {
                dataUrl = this.dataUrl;
            }
            else {

                /**
                 * TODO: Compatible with the configuration of the used code base,
                 * post-optimization only retains nvMdCircle
                 */
                dataUrl = widgetConf.getAPI(widgetConf.mons.dataApi.nvMdCircle || widgetConf.mons.dataApi.saMdCircle);
            }

            /**
             * When the adaptation request type is get, the request field is params,
             * and when it is post, the request field is data.
             */
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
                if (mdData.data.success) {
                    this.errTip = false;
                    this.$nextTick(() => {
                        let data;
                        try {
                            data = mdData.data.data[0].data[0][1];
                        }
                        catch(err) {
                            // 兼容处理数据机构不符合要求的情况
                            data = typeof mdData.data.data !== 'object' ?  mdData.data.data : null;
                            console.warn(err);
                        }
                        this.data = data;
                        this.render(data);
                    });
                }
                else {
                    this.showError(mdData.data.message);
                }
                this.isload = true;
                this.isLoading = false;
            });
        },

        /**
         * render widget data base on conf
         *
         * @param  {[type]} conf [widget conf]
         */
        renderDataByConf(conf) {
            let circleConf = u.clone(conf);
            this.circleConf = Object.assign({}, {
                title: TITLE,
                style: {
                    min: 0,
                    max: 100,
                    threshold: []
                }
            }, circleConf);
            if (circleConf && circleConf.display) {
                this.$nextTick( () => {
                    this.data = circleConf.display;
                    this.isload = true;
                    this.render(circleConf.display);
                });
                return;
            }
            this.$nextTick( () => {
                this.scrollTop();
            });
        },


        /**
         * render widget data base on data
         *
         * @param  {[type]} data [description]
         */
        render(data) {
            // 重设下宽高
            this.freshContainer();

            const circleConf = this.circleConf;

            let style = circleConf.style;
            // calculate the color's section
            let threshold = getThreshold(style);
            let min = parseFloat(style.min, 10);
            let max = parseFloat(style.max, 10);
            let unit = style.unit || '';
            // 如果数据为null的话，不经过小数位处理
            data = data === null ? null : mdutil.setDecimal(data, style.decimals);
            this.link = circleConf.link ? circleConf.link : false;

            let lineColor = filterThreshold(+data, threshold);


            let containerWidth = $(this.$refs.circle).innerWidth();

            let echartsConf = {
                series: {
                    type: 'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    radius: this.getRadius(),
                    center: ['50%', this.getPositionY()],
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    splitNumber: 1,
                    axisLabel: {
                        color: '#666',
                        show: true,
                        fontSize: 12,
                        width: containerWidth <= 320 ? 30 : 38,
                        distance: -30,
                        padding: [20, 0, 0, 0],
                        formatter(value, index) {
                            if (value === min) {
                                return '{minvalue|' + value + '}';
                            }
                            else if (value === max) {
                                return '{maxvalue|' + value + '}';
                            }
                            return ''
                        },
                        rich: {
                            minvalue: {
                                color: '#666',
                                align: 'center'
                            },
                            maxvalue: {
                                color: '#666',
                                align: 'center'
                            }
                        }
                    },
                    detail: {
                        offsetCenter: [0, -15],
                        textStyle: {
                            fontSize: 18,
                            color: '#333333'
                        },
                        formatter(value) {
                            // 针对数据为null的情况显示为N/A
                            let showLabel = data === null ? 'N/A' : data + unit;
                            return showLabel;
                        }
                    },
                    pointer: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#323232'
                        }
                    },
                    min: min,
                    max: max,
                    axisLine: {
                        lineStyle: {
                            width: containerWidth <= 320 ? 30 : 38,
                            color: [lineColor[0], [1, '#edeeef']]
                        }
                    }
                }
            };


            this.curOptions = echartsConf;
            this.$nextTick(() => {
                this.chart = echarts.init(this.$refs.chart);
                this.chart.setOption(this.curOptions);

                if (this.extraStyle) {
                    this.chart.setOption(this.extraStyle);
                }

                // hide loading mdmask
                this.hideMask();
            });
            
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
         * caculate the sceen's position and judge whether to load
         */
        scrollTop() {
            if (this.isload || this.isLoading) {
                return;
            }
            const main = this.$refs.circle;
            let top = mdutil.getScrollTop();
            let height = mdutil.getViewHeight();
            let offset = mdutil.getOffset(main);
            if (offset && offset.top < top + height && offset.bottom > top) {
                this.showMask();
                this.freshData();
            }
        },

        /**
         * show error massage
         */
        showError(message) {
            this.errTip = message;
            this.hideMask();
        },

        /**
         * show loading mdmask
         */
        showMask() {
            this.$refs.mask.show();
        },

        /**
         * hide loading mdmask
         */
        hideMask() {
            this.$refs.mask.hide();
        }
    },
    beforeDestroy() {
        if (this.chart) {
            if (typeof this.chart.clear === 'function') {
                this.chart.clear(); 
            }
            if (typeof this.chart.dispose === 'function') {
                this.chart.dispose();
            }
        }
        $(window).off('resize', this.resizePage);
        $(document).off('scroll', this.redraw);
        this.$off('refresh-page');
    }
};

</script>

