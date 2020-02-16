<template>
    <div>
        <dl>
            <dt>{{event.name}}</dt>
            <dt>{{t('eventRiver.startTime')}}：{{event.startTime * 1000|formatTime}}</dt>
            <dt>{{t('eventRiver.endTime')}}：{{event.endTime * 1000|formatTime}}</dt>
            <template v-for="item in detail">
                <dt
                    v-if="item.type === 'link'">
                    {{item.name}}：<a v-bind:href="[item.value]" target="_blank">{{t('eventRiver.detail')}}</a>
                </dt>
                <dt v-if="item.type === 'arr'">{{item.name}}：{{item.value}}</dt>
                <dt v-if="item.type === 'text'">{{item.name}}：{{item.value}}</dt>
                <dt v-if="item.type === 'name'">{{item.name}}</dt>
            </template>
        </dl>
    </div>
</template>
<script>
import moment from 'moment';

import mixin from '../mixins';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * Get the display content based on the object key value
 * Traverse through the posterior root traversal
 *
 * @param  {[type]} key       [Keyword]
 * @param  {[type]} detailObj [Map object]
 * @return {[type]}           [Real Content]
 */
function getInfoVal(key, detailObj) {
    let index = key.indexOf('.');
    let mainKey = key.substring(0, index);
    let leftKey = key.substring(index + 1, key.length);
    if (index === -1) {
        mainKey = key;
        leftKey = false;
    }
    let realVal = detailObj[mainKey];
    if (!leftKey) {
        return realVal;
    }
    if (realVal) {
        realVal = getInfoVal(leftKey, realVal);
    }
    else {
        return false;
    }
    return realVal;
}

export default {
    mixins: [mixin],
    props: {
        event: Object,
        series: Object
    },
    data() {
        let event = this.event;
        return {
            detail: this.eventDetailMap(event)
        };
    },
    filters: {
        formatTime(event) {
            return moment(event).format(TIME_FORMAT);
        }
    },
    methods: {
        eventDetailMap(event) {
            let detailMapArr = event.eventDetailMap ? event.eventDetailMap : false;
            let detail = event.event.display;
            let htm = [];
            if (typeof detail !== 'object') {
                htm.push({
                    type: 'name',
                    value: '',
                    name: detail
                });
            }

            // if conf have detail info map, show real info
            else if (detailMapArr) {
                detailMapArr.map(item => {
                    let name = item.name;
                    let info = getInfoVal(item.key, detail);
                    if (info) {
                        if (item.type === 'arr') {
                            if (typeof info === 'object') {
                                info = info.join(',');
                            }
                        }
                        htm.push({
                            type: item.type,
                            name: name,
                            value: info
                        });
                    }
                    return item;
                });
            }

            // if conf don't have detailMap, show display instead
            else {
                for (let key in detail) {
                    htm.push({
                        type: 'text',
                        name: key,
                        value: detail[key]
                    });
                }
            }
            return htm;
        }
    }
};

</script>
<style lang="less"></style>
