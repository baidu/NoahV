<template>
    <div ref="circle" class="ui-mdpie">
        <div class="multiple-pie-header">
            <h2 v-if="!link">{{title}}</h2>
            <h2 v-else="link">
                <a :href="link" target="_blank">{{title}}</a>
            </h2>
            <h2 class="ui-pie-time">{{times}}</h2>
        </div>
        <div class="multiple-pie-body" v-if="!errTip">
            <div class="echarts" ref="pie" :style="mdStyle"></div>
        </div>
        <div class="pie-error-holder" v-if="errTip" :style="mdStyle">{{errTip}}</div>
        <nv-mask ref="mask"></nv-mask>
    </div>
</template>
<script>

import u from 'underscore';
import $ from 'jquery';
import moment from 'moment';
import {eventBus} from '../eventBus';
import mdutil from '../util/util';
import nvMask from '../mask';
import echarts from 'echarts';

import {t} from '../locale';


const TITLE = t('nvPie.title');
const HEIGHT = 320;
const DEFAULTTIME = 'before(2h)';
const DEFAULTFORMAT = 'MM.DD HH:mm';
const DEFAULTCONF = {
    'title': TITLE,
    'timeType': 'relative',
    'time': DEFAULTTIME
};
const DEFAULT_REQUEST_TYPE = 'post';
let widgetConf = {};

const confGetError = t('nvPie.getConfError');
const dataGetError = t('nvPie.getDataError');

/**
 * Repair component color gradient problem
 * Assign fixed component colors according to numeric values
 * The maximum and minimum values are calculated according to the configuration
 *
 * @param  {[type]} data      [description]
 * @param  {[type]} thresholdColor [description]
 * @return {[type]}           [description]
 */
function filterThreshold(data, thresholdColor) {
    if (thresholdColor.length === 0) {
        return data;
    }
    let colorMap = widgetConf.extraComponent.pie.colors;
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += data[i].value;
    }
    u.each(data, item => {
        u.find(thresholdColor, (threshold, index) => {
            let value = item.value / total;
            if (value >= threshold[0] &&  value < threshold[1]) {
                item.itemStyle = {};
                item.itemStyle.color = threshold[2];
                return true;
            }
        });
    });
    return data;
}

/**
 * Analytic configuration threshold
 *
 * @param  {[type]} threshold [description]
 * @return {[type]}           [description]
 */
function getThresholdAndColorMap(style) {
    let colorMap = widgetConf.extraComponent.pie.colors;
    let threshold = style.threshold;
    let arr = [];
    let obj = {
        color: u.clone(colorMap)
    };
    if (threshold && threshold.length > 0) {
        arr = threshold.sort((a, b) => {
            a[0] = parseFloat(a[0]);
            b[0] = parseFloat(b[0]);
            return a[0] - b[0];
        });
        if (arr[0][0] > 0) {
            arr.unshift([0, arr[0][0], colorMap[0]]);
            obj.color.shift();
        }
        let len = arr.length;
        if (arr[len - 1][1] < 1) {
            arr.push([arr[len - 1][1], 1, colorMap[colorMap.length - 1]]);
            obj.color.pop();
        }
    }
    obj.threshold = arr;
    return obj;
}

export default {
    name: 'pie',
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
            pieConf: {},
            curOptions: {},
            mdConf: {},
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
            return this.pieConf ? this.pieConf.title : TITLE;
        },
        times() {
            if (!this.pieConf) {
                return;
            }
            let titleTimes = '';
            titleTimes = mdutil.timetransfer(this.showTime).join('|');
            let times = '';
            if (titleTimes) {
                times = titleTimes.split('|');
                u.each(times, (item, i) => {
                    times[i] = moment(item).format(this.pieConf.showTimeFormat || DEFAULTFORMAT);
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
                    this.renderDataByConf(this.pieConf);
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
        this.redraw = u.throttle(this.freshContainer, 200);
        this.resizePage = u.throttle(this.resize, 200);
        $(window).on('resize', this.resizePage);
        eventBus.$on('refresh-page', () => {
            this.isload = false;
            this.resizePage();
        });

        // add lazy loading when you scroll the page
        let scrollTrigger = widgetConf.extraComponent.pie.scrollTrigger || document;
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
                confUrl = widgetConf.getAPI(widgetConf.mons.confApi.nvMdPie);
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
                    this.pieConf = JSON.parse(data.data.data.configure);
                    // get render data
                    this.freshContainer();
                }
                else {
                    this.showError(data.data.message || confGetError);
                }
            });
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
         * calculate width and height
         */
        freshContainer() {
            let width = $(this.$refs.pie).innerWidth();
            let height = this.params ? this.params.height || HEIGHT : HEIGHT;
            if (height > width / 2) {
                height = width / 2 - 3;
            }
            this.mdStyle = 'height:' + height + 'px;';
            this.scrollTop();
        },
        // 根据当前的绘制区域的宽度确定饼图的中心位置
        getpieX() {
            let width;
            if (this.chart && this.chart.getWidth) {
                width = this.chart.getWidth();
            }
            else {
                width = $(this.$refs.pie).innerWidth()
            }
            if (width < 320) {
                 return '25%';
            }
            else if (width < 800) {
                return '30%';
            }
            else {
                return '40%';
            }
        },
        getLegendWidth() {
            let width;
            if (this.chart && this.chart.getWidth) {
                width = this.chart.getWidth();
            }
            else {
                width = $(this.$refs.pie).innerWidth()
            }

            return width / 2;
        },
        getLegendLeft() {
            let width;
            if (this.chart && this.chart.getWidth) {
                width = this.chart.getWidth();
            }
            else {
                width = $(this.$refs.pie).innerWidth()
            }
            if (width < 320) {
                 return 90;
            }
            else if (width < 800) {
                return 100;
            }
            else {
                return 120;
            }
        },
        getHeight() {
            let width = $(this.$refs.pie).innerWidth();
            let height = this.params ? this.params.height || HEIGHT : HEIGHT;
            if (height > width / 2) {
                height = width / 2 - 3;
            }
            return height;
        },

        getRaduis() {
            let width = $(this.$refs.pie).innerWidth();
            let height = this.getHeight();
            if (height > 210) {
                return [ (80 / height * 100).toFixed(0) + '%', (160 / height * 100).toFixed(0) + '%'];
            }
            return ['42%', '80%'];
        },

        resize() {
            let height = this.getHeight();
            this.mdStyle = 'height:' + height + 'px;';
            if (this.chart && typeof this.chart.resize === 'function') {
                if (typeof this.chart.getWidth !== 'function') {
                    return;
                }
                let options = this.chart.getOption();
                options.series[0].center = [this.getpieX(), '50%'];
                options.legend[0].left = this.getpieX();
                options.legend[0].padding = [0, 0, 0, this.getLegendLeft()];
                options.series[0].radius = this.getRaduis();
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
            if (!this.pieConf.timeType || this.pieConf.timeType === 'relative') {
                this.pieConf = Object.assign({}, DEFAULTCONF, this.pieConf);
            }
            let showTime = mdutil.setTime(this.pieConf.timeType, this.timeParams, this.pieConf.time);
            let params = {
                data: JSON.stringify(this.pieConf.data) || '{}',
                time: showTime
            };
            this.showTime = showTime;
            // users can set dataUrl in a extra visualWidgetConf.js

            // Data request configuration
            let dataUrl;
            let dataRequestType = DEFAULT_REQUEST_TYPE;
            if (this.pieConf.datasource) {
                let datasource = this.pieConf.datasource;

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
                dataUrl = widgetConf.getAPI(widgetConf.mons.dataApi.nvMdPie);
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
                            data = mdData.data.data;
                        }
                        catch(err) {
                            // 兼容处理数据结构不符合要求的情况
                            data = typeof mdData.data.data !== 'object' ?  mdData.data.data : null;
                            console.warn(err);
                        }
                        this.data = data;
                        this.render(data);
                    });
                }
                else {
                    this.showError(mdData.data.message || dataGetError);
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
            let pieConf = u.clone(conf);
            this.pieConf = Object.assign({}, {
                title: TITLE,
                style: {
                    min: 0,
                    max: 100,
                    threshold: []
                }
            }, pieConf);
            if (pieConf && pieConf.display) {
                this.$nextTick( () => {
                    this.data = pieConf.display;
                    this.isload = true;
                    this.render(pieConf.display);
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
            if (!Array.isArray(data)) {
                this.showError(dataGetError);
                return;
            }
            const pieConf = this.pieConf;

            let style = pieConf.style;
            // calculate the color's section
            let {threshold, color} = getThresholdAndColorMap(style);
            // 如果数据为null的话，不经过小数位处理
            this.link = pieConf.link ? pieConf.link : false;

            data = filterThreshold(data, threshold);
            // data mdutil.setDecimal(data, style.decimals)
            let total = 0;
            data.forEach(item => {
                if(item.data[0]) {
                    const sum = item.data[0][1];
                    total += Number(sum);
                }
            });

            let echartsConf = {
                color: color,
                tooltip: {
                    trigger: 'item',
                    confine: true,
                    formatter: function (item) {
                        let value = (item.value / total) * 100;
                        let percent = Number(value.toFixed(style.decimals).replace(/0+$/g, ''));
                        return `${item.name}: ${percent}%`;
                    },
                    backgroundColor: 'rgba(255,255,255,1)',
                    padding: 8,
                    textStyle: {
                        color: '#108CEE',
                        fontSize: 12,
                        rich: {
                            text: {
                                color: 'red'
                            }
                        }
                    },
                    extraCssText: 'box-shadow: 0 2px 10px 0 rgba(0,0,0,0.20);border-radius: 0;overflow: hidden;text-overflow: ellipsis;'
                },
                legend: {
                    orient: 'vertical',
                    left: this.getpieX(),
                    padding: [0, 0, 0, this.getLegendLeft()],
                    top: 'middle',
                    icon: 'circle',
                    itemWidth: 12,
                    itemHeight: 12,
                    itemGap: 16,
                    textStyle: {
                        padding: [0, 0, 0, 8],
                        rich: {
                            a: {
                                width: this.getLegendWidth(),
                                overflow: 'break',
                                padding: [0, 0, 0, 8],
                            },
                        },
                    }
                },
                series: {
                    type: 'pie',
                    startAngle: 180,
                    radius: this.getRaduis(),
                    center: [this.getpieX(), '50%'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    data: data,
                }
            };


            this.curOptions = echartsConf;
            this.chart = echarts.init(this.$refs.pie);
            this.chart.setOption(this.curOptions);

            if (this.extraStyle) {
                this.chart.setOption(this.extraStyle);
            }

            // hide loading mdmask
            this.hideMask();
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
            const main = this.$refs.pie;
            let top = mdutil.getScrollTop();
            let height = mdutil.getViewHeight();
            let offset = mdutil.getOffset(main);
            if (offset && offset.top < top + height && offset.bottom > top
                && !this.isload && !this.isLoading) {
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

