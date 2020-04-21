<template>
    <div ref="billboard" class="billboard-holder container" :style="mdStyle">
        <div class="hd container">
            <a v-if="link" :href="link" target="_blank"><em>{{title}}</em></a>
            <em v-else>{{title}}</em>
        </div>
        <div class="bd">
            <div class="time">{{times}}</div>
            <ul class="billboard-list" v-if="!errTip">
                <li v-for="sub in subTitles" :data-type="sub.display" :class="{warning:sub.warning}">
                    <h2>{{sub.alias || sub.name}}</h2>
                    <h3 :title="sub.data + sub.unit"><span>{{sub.data}}</span>{{sub.unit}}</h3>
                </li>
            </ul>
        </div>
        <div class="billboard-error-holder" v-if="errTip">{{errTip}}</div>
        <nv-mask ref="mask"></nv-mask>
    </div>
</template>
<script>
import u from 'underscore';
import $ from 'jquery';
import moment from 'moment';
import mdutil from './util/util';
import nvMask from './mask';

import {t} from './locale';
import mixin from './mixins';

const HEIGHT = 200;
const TITLE = t('billboard.title');
const DEFAULTTIME = 'before(2h)';
const DEFAULTNULLVALUE = 'N/A';
const DEFAULTFORMAT = 'MM.DD HH:mm';
const DEFAULTCONF = {
    'title': TITLE,
    'timeType': 'relative',
    'time': DEFAULTTIME
};

// Default settings
const DEFAULTVALUE = [
    {
        name: t('billboard.subTitle'),
        value: 0,
        unit: '%'
    }
];

// user's project setting
let widgetConf = {};
const DEFAULT_REQUEST_TYPE = 'post';
export default {
    mixins: [mixin],
    name: 'billboard',
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

        // filter data
        dataFilter: {
            type: Function,
            default: data => data,
            required: false
        }
    },
    components: {nvMask},
    data() {
        let height = this.params ? this.params.height || HEIGHT : HEIGHT;
        return {
            mdStyle: `min-height:${height}px;`,

            // a version of params's copy
            timeParams: this.params,

            // widget's time
            showTime: DEFAULTTIME,
            // a url of the link to other page
            link: false,

            // error massage
            errTip: false,

            // Whether the component is loading
            isLoading: false,

            // Whether the component has been loaded
            isload: false,
            billboardData: [],

            // a version of conf's copy
            billboardConf: u.clone(this.conf)
        };
    },
    computed: {
        title() {
            return this.billboardConf ? this.billboardConf.title : TITLE;
        },
        times() {
            if (!this.billboardConf) {
                return;
            }
            let titleTimes = '';
            titleTimes = mdutil.timetransfer(this.showTime).join('|');
            let times = '';
            if (titleTimes) {
                times = titleTimes.split('|');
                u.each(times, (item, i) => {
                    // Formatting widget time
                    times[i] = moment(item).format(this.billboardConf.showTimeFormat || DEFAULTFORMAT);
                });
                times = times.join('-');
            }
            return times;
        },
        subTitles() {
            let data = this.billboardData;
            if (!data || !this.billboardConf) {
                return;
            }
            else if (data) {
                data = this.caluateData(data, this.billboardConf);
            }
            return data;
        }
    },
    watch: {
        params: {
            handler(val) {
                this.timeParams = val;
                this.isload = false;
                this.scrollTop();
            },
            deep: true
        },
        conf: {
            handler(val, oldVal) {
                if (val !== oldVal) {
                    this.billboardConf = u.clone(val);
                    this.isload = false;
                    this.scrollTop();
                }
            },
            deep: true
        }
    },
    created() {

        /**
         * get user's globle conf
         * it includes:
         * 1. data and conf's API of interface
         * 2. echarts custom configuration
         */
        widgetConf = this.$extraEchartsConf;
        this.$nextTick(() => {
            this.showMask();
            if (this.path) {
                this.getConf();
                return;
            }
            if (this.conf) {
                this.billboardConf = u.clone(this.conf);
                this.scrollTop();
                return;
            }
            this.initConf();
        });
    },
    mounted() {

        /**
         * prevent to fresh the view when windows's width change too often.
         * add lazy loading when you scroll the page
         */
        this.redraw = u.throttle(this.scrollTop, 100);
        let scrollTrigger = this.$extraEchartsConf.extraComponent.trend.scrollTrigger || document;
        $(scrollTrigger).on('scroll', this.redraw);
    },
    methods: {

        /**
         * init billboard configure
         * user can use this widget with no conf|path|display
         */
        initConf() {
            this.billboardConf = DEFAULTCONF;
            this.scrollTop();
        },

        /**
         * get conf by url
         */
        getConf() {
            let confUrl = this.url;
            let confMethod = this.confMethod.toLowerCase() || DEFAULT_REQUEST_TYPE.toLowerCase();
            if (!this.url) {

                /*
                 * TODO: Compatible with the configuration of the used code base,
                 * post-optimization only retains nvMdBillboard
                 */
                confUrl = widgetConf.getAPI(widgetConf.mons.confApi.nvMdBillboard
                    || widgetConf.mons.confApi.saMdBillboard);
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
                    this.billboardConf = JSON.parse(data.data.data.configure || '{}');

                    // get render data
                    this.scrollTop();
                }
                else {
                    this.showError(data.data.message);
                }
            });
        },

        /**
         * get data from server
         *
         * @params object   params  interface parameters
         * @params function cb      callback function
         */
        getData(params, cb) {
            let dataUrl;
            let dataRequestType = DEFAULT_REQUEST_TYPE;
            if (this.billboardConf.datasource) {
                let datasource = this.billboardConf.datasource;

                // suport multiple data source
                dataUrl = datasource.api;

                // set data interface's method type
                dataRequestType = datasource.method || DEFAULT_REQUEST_TYPE;
            }
            else if (this.dataUrl) {
                dataUrl = this.dataUrl;
            }
            else {

                /**
                 * TODO: Compatible with the configuration of the used code base,
                 * post-optimization only retains saMdBillboard
                 */
                dataUrl = widgetConf.getAPI(widgetConf.mons.dataApi.nvMdBillboard
                    || widgetConf.mons.dataApi.saMdBillboard);
            }

            if (!dataUrl) {
                cb(DEFAULTVALUE);
                return;
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
                mdData = this.dataFilter(mdData);
                if (mdData.data.success) {

                    // if the configuration's length equal 0,then show 'No Data'.
                    let showData = mdData.data.data;
                    if (showData.length === 0
                        && this.billboardConf.data.length === 0) {
                        this.errTip = widgetConf.nodata;
                    }
                    else {
                        this.errTip = false;
                        showData = showData.length ? showData : [{}]
                        cb(showData);
                    }
                }
                else {
                    this.showError(mdData.data.message);
                }

                // mark this widget has been loaded
                this.isload = true;
                this.isLoading = false;
            });
        },

        /**
         * Setting request parameters
         */
        freshData() {

            // set default time type
            if (!this.billboardConf.timeType || this.billboardConf.timeType === 'relative') {
                this.billboardConf = Object.assign({}, DEFAULTCONF, this.billboardConf);
            }

            if (!this.timeParams) {
                this.timeParams = this.initTime();
            }
            let showTime = mdutil.setTime(
                this.billboardConf.timeType,
                this.timeParams,
                this.billboardConf.time
            );
            this.showTime = showTime;
            this.link = this.billboardConf.link
                ? this.billboardConf.link
                : false;

            // if conf has display,then show it
            if (this.billboardConf.display) {
                this.billboardData = this.billboardConf.display;
                this.isload = true;
                this.hideMask();
                return;
            }

            // send io request to get detail value
            let params = {
                data: JSON.stringify(this.billboardConf.data),
                time: showTime
            };
            this.getData(params, mdData => {

                // hide loading mdmask
                this.hideMask();
                this.showTime = params.time;
                this.billboardData = mdData;
            });
        },

        // retrun the render sub-info Template
        caluateData(data, conf) {
            const confLists = conf.data;
            let nData = [];
            if (data && data.length > 0 && confLists && confLists.length > 0) {
                u.each(confLists, item => {
                    let temp = {};
                    u.each(data, mapItem => {
                        if (item.name === mapItem.name) {
                            temp = u.clone(mapItem);
                            try {
                                // The Number type will automatically delete the end 0
                                temp.data = mdutil.setDecimal(mapItem.value || mapItem.data[0][1] , item.decimals || 4);
                            }
                            catch(err) {
                                temp.data = '0';
                                console.warn(err);
                            }
                        }
                    });
                    temp.alias = item.alias ? item.alias : '';
                    temp.data = temp.data ? temp.data : DEFAULTNULLVALUE;
                    temp.unit = item.unit || '';
                    temp.name = item.name ? item.name : this.t('billboard.noConf');
                    nData.push(temp);
                });
                this.hideMask();
            }
            else if (data && data.length > 0) {
                data.map(item => {
                    if (!item.data && item.value) {
                        item.data = item.value;
                    }
                    console.log(item)
                    item.data = mdutil.setDecimal(item.data, item.decimals || 4);
                    nData.push(item);
                    return item;
                });
            }
            return nData;
        },

        /**
         * caculate the sceen's position and judge whether to load
         */
        scrollTop() {
            const main = this.$refs.billboard;
            let top = mdutil.getScrollTop();
            let height = mdutil.getViewHeight();
            let offset = mdutil.getOffset(main);
            if (offset && offset.top < top + height && offset.bottom > top
                && this.billboardConf
                && !this.isload && !this.isLoading) {
                this.$nextTick( () => {
                    this.showMask();
                    this.freshData();
                });
            }
        },

        /**
         * if user set no time, set default time to params
         */
        initTime() {
            let times = mdutil.timetransfer(DEFAULTTIME);
            return {
                start: times[0],
                end: times[1]
            };
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
        // destroy the event of scroll
        $(document).off('scroll', this.redraw);
        clearTimeout(this.id);
    }
};
</script>
