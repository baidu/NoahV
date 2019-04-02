<template>
    <div class="ui-eventriver-container">
        <div class="ui-event-holder" id="eventHolder">
            <ul class="ui-legends-holder" id="eventLegendsContainer">
            <template v-for="leng in list">
                <li
                    v-if="leng.checked"
                    class="checked"
                    :style="{border: '1px solid ' + leng.color}"
                    v-on:click="serieClick(leng)"
                    v-on:mouseover="serieHover(leng, true)"
                    v-on:mouseout="serieHover(leng, false)">
                    <i class="ui-legend-icon" :style="{color: leng.color}"></i>
                    <button
                        class="eventlist"
                        :id="leng.type"
                        :style="{color: leng.color}">{{leng.name}}</button>
                </li>
                <li v-else class="checked" v-on:click="serieClick(leng)">
                    <i class="ui-legend-icon"></i>
                    <button class="eventlist" :id="leng.type" >{{leng.name}}</button>
                </li>
            </template>
            </ul>
        </div>
        <EventRiver
            v-if="eventType !== 'list'"
            ref="eventRiver"
            :config="options"
            :layoutType="alone"
            :serieLists="series" />
        <EventList v-if="eventType === 'list'" ref="eventList"
            :config="options"
            :extra="extra"
            :series="series" />
        <nv-mask ref="mask"></nv-mask>
    </div>
</template>
<script>
import u from 'underscore';
import moment from 'moment';
import mdutil from '../util/util';
import EventRiver from './eventRiver';
import EventList from './eventList';
import nvMask from '../mask';
const DEFAULT_REQUEST_TYPE = 'post';
const DEFAULTTIME = 'before(2h)';
let widgetConf = {};
let Color = {
    defualtColor: [
        '#bb89e2', '#4bb9f5', '#51cb96', '#efdb00',
        '#FF7C83', '#75D4BB', '#1FC699', '#8FD18B',
        '#C9E17F', '#FFD769', '#FFB685', '#FCA15C',
        '#F88452', '#F5A59F', '#FF7C83', '#0066CC'
    ],
    colors: {},
    idx: 0,
    cache: {},
    set(type, color) {
        this.colors[type] = color;
    },
    get(type) {
        // all the events'colors was distributed by the object of this.colors
        if (this.colors[type]) {
            return this.colors[type];
        }
        if (!this.cache[type]) {
            let color = this.defualtColor[this.idx++ % this.defualtColor.length];
            this.cache[type] = color;
            this.set(type, color);
        }
        return this.cache[type];
    }
};
/**
 * Processing legend data
 *
 * @param  {[type]} lengeds [lengeds Object]
 * @return {[type]}         [lengeds]
 */
function manageLengData(lengeds) {
    if (lengeds) {
        lengeds.map(leng => {
            let color = leng.color;
            if (!leng.color) {
                color = Color.get(leng.type);
                leng.color = color;
            }
            else {
                Color.set(leng.type, leng.color);
            }
            return leng;
        });
    }
    return lengeds;
}
/**
 * Get the event display realSchame
 *
 * @param  {[type]} schema [Legend Schema]
 * @param  {[type]} name   [Event Name]
 * @return {[type]}        [description]
 */
function getRealSchame(schema, name) {
    let realName = u.find(schema, item => {
        if (item.type === name) {
            return true;
        }
    });
    return realName;
}
/**
 * Set event display data
 * Manage the detail infomation,such as color, start, end and detailMapArr.
 *
 * @param  {[type]} data [Event Object]
 * @return {[type]}      [Event Object]
 */
function manageSeries(data) {
    if (data.dataSchema && data.events) {
        data.dataSchema.map(leng => {
            let color = leng.color;
            if (!leng.color) {
                color = Color.get(leng.type);
            }
            else {
                Color.set(leng.type, leng.color);
            }
            leng.color = color;
            return leng;
        });
        u.map(data.events, item => {
            let eventlist = item.eventList;
            u.each(eventlist, event => {
                if (data.dataSchema) {
                    let realSchame = getRealSchame(data.dataSchema, item.name);
                    event.name = realSchame.name;
                    event.eventDetailMap = realSchame.eventDetailMap;
                    event.type = item.name;
                }
                else {
                    event.name = item.name;
                    event.type = item.type;
                }
                // Event Detail Map
                if (item.eventDetailMap) {
                    event.eventDetailMap = item.eventDetailMap;
                }
                event.event = {
                    display: event.display ? event.display : item.display
                };
                event.start = event.startTime * 1000;
                event.end = event.endTime * 1000;
                event.color = Color.get(item.name);
                event.eventType = item.eventType;
            });
        });
    }
    return data;
}
export default {
    name: 'hello',
    components: { EventRiver, EventList, nvMask},
    props: {
        // set eventriver's type. when user sets 'list' show eventList.
        type: {
            type: String,
            default: undefined,
            required: false
        },
        // get conf's url
        url: {
            type: String,
            required: false
        },
        // get widget's time
        params: {
            type: Object,
            required: false,
            default: () => ({})
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
        }
    },
    // props: ['url', 'params', 'type'],
    data() {
        return {
            list: [],
            eventRiverConf: this.conf || {},
            options: {},
            series: {},
            alone: 'alone',
            extra: [],
            data: {},
            errTip: false,
            // Whether the component is loading
            isLoading: false,
            // Whether the component has been loaded
            isload: false,
            eventType: ''
        };
    },
    created() {
        widgetConf = this.$extraEchartsConf;
        // If the external configuration conf renders directly
        if (this.conf) {
            this.getEventData();
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
    watch: {
        conf: {
            handler(conf) {
                this.eventRiverConf = Object.assign({}, conf);
                this.getEventData();
            },
            deep: true
        },
        type(type) {
            this.eventType = type;
        }
    },
    methods: {
        initConf() {
            this.data = [];
            // start render eventriver;
            this.drawView();
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
         * drew svg
         */
        drewView() {
            let eventData = this.data;
                if (!eventData.dataSchema
                    && this.eventRiverConf.data
                    && this.eventRiverConf.data.schema) {
                    eventData.dataSchema = this.eventRiverConf.data.schema;
                }
                const time = this.eventRiverConf.time ? mdutil.timetransfer(this.eventRiverConf.time) : [];
                let series = {
                    start: moment(this.params.start || time[0]).unix() * 1000,
                    end: moment(this.params.end || time[1]).unix() * 1000,
                    series: manageSeries(eventData).events,
                    // close the legend
                    legend: 'none' || 'bottom',
                    axis: this.params.axis || 'bottom'
                };
                this.eventQueue = manageSeries(eventData);
                this.list = manageLengData(eventData.dataSchema) || [];
                this.series = series;
                this.extra = eventData.extra ? eventData.extra : [];
                this.hideMask();
        },
        /**
         * Get conf through path
         */
        getConf() {
            let confUrl = this.url;
            let confMethod = this.confMethod.toLowerCase() || DEFAULT_REQUEST_TYPE.toLowerCase();
            if (!this.url) {
                confUrl = widgetConf.getAPI(widgetConf.mons.confApi.nvMdEventRiver);
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
                    this.eventRiverConf = JSON.parse(data.data.data.configure);
                    // get render data
                    this.getEventData();
                }
                else {
                    this.showError(data.data.message);
                }
            });
        },
        /**
         * Get data by conf
         */
        getEventData() {
            if (this.eventRiverConf.style && this.eventRiverConf.style.type) {
                this.eventType = this.eventRiverConf.style.type;
            }
            if (!this.timeParams) {
                this.timeParams = this.initTime();
            }
            /**
             * When the configuration time type is none or the time when the dashboard is used,
             * the component is set by default.
             */
            if (!this.eventRiverConf.timeType || this.eventRiverConf.timeType === 'relative') {
                this.eventRiverConf = Object.assign({}, this.eventRiverConf);
            }
            let showTime = mdutil.setTime(this.eventRiverConf.timeType, this.timeParams, this.eventRiverConf.time);
            let params = {
                data: JSON.stringify(this.eventRiverConf.data) || '{}',
                time: showTime
            };
            this.showTime = showTime;
            // users can set dataUrl in a extra visualWidgetConf.js
            // Data request configuration
            let dataUrl;
            let dataRequestType = DEFAULT_REQUEST_TYPE;
            if (this.eventRiverConf.datasource) {
                let datasource = this.eventRiverConf.datasource;
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
                 * get dataUrl from wigetConfig.js
                 */
                dataUrl = widgetConf.getAPI(widgetConf.mons.dataApi.nvMdEventRiver);
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
                        this.data = mdData.data.data;
                        this.drewView();
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
         * switch the Events
         *
         * @param  {[type]} serie [description]
         */
        serieClick(serie) {
            let checked = serie.checked;
            if (checked) {
                checked = false;
            }
            else {
                checked = true;
            }
            serie.checked = checked;
            this.enableQueue(serie.type, checked);
        },
        /**
         * fresh event status by eventName
         *
         * @param  {[type]} type [eventName, the unique identify of events]
         * @param  {[type]} enable [status, the status of event, true is acitve, false is unactive]
         */
        enableQueue(type, enable) {
            let eventQueue = this.eventQueue;
            let param = u.find(eventQueue.events, event => {
                return event.name === type;
            });
            let preSeries = this.series;
            if (param) {
                if (!enable) {
                    // delete Events
                    param = u.reject(preSeries.series, item => {
                        return item.name === type;
                    });
                    preSeries.series = param;
                }
                else {
                    preSeries.series.push(param);
                }
                // render event erea info
                if (this.eventType === 'list') {
                    this.$refs.eventList.renderRiver(preSeries);
                }
                else {
                    this.$refs.eventRiver.renderRiver(preSeries);
                }
            }
        },
        /**
         * change the hover status of events
         * when user hover the Legend, active the corresponding events
         */
        serieHover(serie, isFocus) {
            if (this.eventType !== 'list') {
                this.$refs.eventRiver.focusSerie(serie, isFocus);
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
    }
};
</script>
