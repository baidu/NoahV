<template>
    <div ref="eventListMain" class="ui-eventlist-holder">
        <Timebar :series="series" />
        <ul class="eventlist">
            <li class="eventlist-header">
                <div class="content">
                    <div v-for="title in extraTitles" class="fr fr-last">{{title.name}}</div>
                    <div class="fr fr-last">{{t('eventRiver.endTime')}}</div>
                    <div class="fr">{{t('eventRiver.startTime')}}</div>
                    <div class="fr">{{t('eventRiver.eventType')}}</div>
                    <div class="fr-title">{{t('eventRiver.eventDetail')}}</div>
                </div>
            </li>
            <template v-if="eventList.length !== 0">
                <li v-for="subEvent in eventList">
                    <EventTimer :event="subEvent" :series="series" />
                    <div class="content" @click="showDetail(subEvent)">
                        <div
                            v-for="title in extraTitles"
                            class="fr content-type list-content">{{subEvent|mapTitles(title)}}</div>
                        <div class="fr fr-last list-content">{{subEvent.end|formatTime}}</div>
                        <div class="fr list-content">{{subEvent.start|formatTime}}</div>
                        <div class="fr list-content">{{subEvent.type}}</div>
                        <div class="title">{{subEvent.name}}</div>
                    </div>
                    <div class="detail" v-show="subEvent.show">
                        <i class="event-arrow"></i>
                        <EventDetail :event="subEvent" :series="series" />
                    </div>
                </li>
            </template>
            <template v-if="eventList.length === 0">
                <li class="no-data">本时间段未查询到任何事件</li>
            </template>
        </ul>
    </div>
</template>
<script>
import u from 'underscore';
import $ from 'jquery';
import * as d3 from 'd3';
import moment from 'moment';
import EventDetail from './eventDetail';

import mixin from '../mixins';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * Sort Events by startTime
 *
 * @param  {[type]} events [eventLists]
 * @return {[type]}        [ordered eventLists]
 */
function orderEvents(events) {
    let list = [];
    events.map(event => {
        event.eventList.map(subEvent => {
            subEvent.show = false;
            list.push(subEvent);
            return subEvent;
        });
        return event;
    });
    return u.sortBy(list, item => {
        return item.startTime;
    });
}

// a subcomponents of eventTimer
let EventTimer = {
    template: '<div class="eventlist-bg"><div class="indicator" :style="style"></div></div>',
    props: {
        event: Object,
        series: Object
    },
    computed: {
        style() {
            let start = this.series.start;
            let end = this.series.end;
            let event = this.event;
            return {
                background: event.color,
                left: (event.start - start) / (end - event.start) * 100 + '%',
                right: (end - event.end) / (end - event.start) * 100 + '%'
            };
        }
    }
};

// a components of time axis
let Timebar = {
    template: '<div ref="eventListTime"></div>',
    props: {
        series: Object
    },
    data() {
        this.$nextTick(() => {
            this.renderTimer();
        });
        return {};
    },
    watch: {
        series: {
            handler() {
                this.renderTimer();
            },
            deep: true
        }
    },
    methods: {
        renderTimer() {
            let series = this.series;
            let eventListTimer = this.$refs.eventListTime;
            eventListTimer.innerHTML = '';
            let width = $(eventListTimer).width();
            d3.select(eventListTimer).select('svg').remove();
            let svg = d3.select(eventListTimer).append('svg')
                .attr('width', width)
                .attr('height', 20);
            let linear = d3.scaleLinear()
                .domain([series.start, series.end])
                .range([0, width]);
            let axis = d3.axisTop()
                .scale(linear)
                .ticks(Math.ceil(width / 150))
                .tickSize(0, 0)
                .tickPadding(5)
                .tickFormat(d => {
                    return moment(d).format('HH:mm');
                });

            let xAxis = svg.append('g')
                .attr('transform', 'translate(0,19)')
                .call(axis);
            xAxis.selectAll('line')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', -3)
                .attr('stroke', 'gray');
            xAxis.selectAll('text')
                .style('font-size', 10)
                .attr('fill', 'gray');
            xAxis.select('.domain')
                .attr('stroke-width', 1)
                .attr('stroke', 'gray');
            return axis;
        }
    }
};

// Main component
export default {
    mixins: [mixin],
    components: { EventTimer, Timebar, EventDetail },
    props: {
        config: Object,
        extra: Array,
        series: Object
    },
    filters: {
        formatTime(event) {
            return moment(event).format(TIME_FORMAT);
        },
        mapTitles(event, title) {
            return event.event.display[title.key];
        }
    },
    data() {
        let eventList = [];
        return {
            options: {},
            eventList: eventList
        };
    },
    watch: {
        series: {
            handler(val) {
                this.eventList = orderEvents(val.series);
            },
            deep: false
        }
    },
    computed: {
        extraTitles() {
            return this.extra;
        }
    },
    methods: {
        showDetail(event) {
            u.each(this.eventList, (evnt, index) => {
                if (evnt === event) {
                    event.show = !event.show;
                    this.$set(this.eventList, index, event);
                }
            });
            return event;
        },
        renderRiver(series) {
            this.eventList = orderEvents(series.series);
        }
    }
};

</script>
<style lang="less"></style>
