<template>
    <div class="time-holder">
        <Select v-model="timeTpye" style="width:200px">
            <Option value="relative" key="relative">使用仪表盘时间范围</Option>
            <Option value="fixed" key="fixed">设定相对时间范围</Option>
            <Option value="absolute" key="absolute">设定绝对时间范围</Option>
        </Select>
        <div class="fixed-time" v-if="timeTpye === 'fixed'">
            <RadioGroup v-model="fixedTime" type="button" size="small">
                <Radio
                    v-for="item in fixedTimeGroup"
                    :label="item.value"
                    :key="item.value"
                    :class="[item.value === timeConfig.fixedTime ? 'ivu-radio-wrapper-checked' : '']"
                >
                    {{item.name}}
                </Radio>
            </RadioGroup>
            <div class="customFixedTime" v-if="fixedTime === 'custom'">
                最近
                <InputNumber
                    :min="1"
                    v-model="timeConfig.value"
                    size="small"
                    style="width:80px;margin: 0 10px;"
                >
                </InputNumber>
                <Select v-model="unit" style="width:70px">
                    <Option
                        v-for="list in customFixedTimeUnitGroup"
                        :value="list.value"
                        :key="list.value"
                    >
                        {{list.name}}
                    </Option>
                </Select>
            </div>
        </div>
        <div class="absolute-time" v-show="timeTpye === 'absolute'">
            <div class="common-tip">
                <span>起止时间</span>
                <SaDatePicker
                    type="daterangetime"
                    dateFormat="YYYY-MM-DD HH:mm"
                    :width="300"
                    :height="26"
                    :value="timeConfig.time"
                    @on-change="timeChange($event)"
                >
                </SaDatePicker>
            </div>
        </div>
    </div>
</template>
<script>
import m from 'moment';
const fixedTimeGroup = [
    {
        name: '今天',
        value: 'today()'
    },
    {
        name: '本周',
        value: 'week()'
    },
    {
        name: '本月',
        value: 'month()'
    },
    {
        name: '自定义',
        value: 'custom'
    }
];
const customFixedTimeUnitGroup = [
    {
        name: '分钟',
        value: 'm'
    },
    {
        name: '小时',
        value: 'h'
    },
    {
        name: '天',
        value: 'd'
    },
    {
        name: '周',
        value: 'w'
    }
];
const dateFormat = 'YYYY-MM-DD HH:mm';
export default {
    name: 'model-time',
    props: {
        timeSet: Object
    },
    watch: {
        timeSet(val) {
            let tempTime = Object.assign({}, val);
            this.timeConfig = getDefaultTime(tempTime.timeType, tempTime.time);
            this.timeTpye = this.timeConfig.type || 'relative';
            this.time = this.timeConfig.time || 'before(2h)';
            if (this.timeTpye === 'fixed') {
                this.fixedTime = this.timeConfig.fixedTime;
            }
        },
        fixedTime(val) {
            if (val !== 'custom') {
                this.time = val;
            }
        },
        timeTpye() {
            // handle type
        }
    },
    data() {
        let timeConfig = getDefaultTime(this.timeSet.timeType, this.timeSet.time);
        return {
            timeConfig: timeConfig,
            timeTpye: timeConfig.type || 'relative',
            time: timeConfig.time || 'before(2h)',
            fixedTimeGroup: fixedTimeGroup,
            customFixedTimeUnitGroup: customFixedTimeUnitGroup,
            fixedTime: timeConfig.fixedTime || 'today()',
            unit: timeConfig.unit || 'm'
        };
    },
    methods: {
        timeChange(time) {
            if (time.length !== 2 || typeof time[0] !== 'object' || typeof time[1] !== 'object') {
                return;
            }
            time = time.forEach(item => {
                return m(item).format(dateFormat);
            });
            this.timeConfig.time = time[0] + '|' + time[1];
        },
        getTime() {
            let time = this.time;
            if (this.timeTpye === 'fixed' && this.fixedTime === 'custom') {
                time = 'before(' + (this.timeConfig.value || 1) + this.unit + ')';
            }
            else if (this.timeTpye === 'fixed') {
                time = this.fixedTime;
            }
            else if (this.timeTpye === 'absolute') {
                time = this.timeConfig.time;
            }
            return {
                type: this.timeTpye,
                time: time
            };
        }
    }
};
const getDefaultTime = (type, time) => {
    if (typeof type === 'undefined' && typeof time === 'undefined') {
        return {
            type: 'relative',
            time: ''
        };
    }
    let defaultTime = {};
    if (type === 'fixed') {
        defaultTime = {};
        if (time.indexOf('before') > -1) {
            let matchArr = time.match(/(\d+)([mhdwMy])/);
            if (matchArr.length > 2) {
                defaultTime.value = parseInt(matchArr[1], 10);
                defaultTime.unit = matchArr[2];
            }
            defaultTime.fixedTime = 'custom';
        }
        else {
            defaultTime.fixedTime = time;
        }
    }
    else if (type === 'absolute') {
        if (time && time.indexOf('|') > -1) {
            defaultTime.time = time.split('|');
        }
        else {
            defaultTime.time = time;
        }
    }
    else {
        defaultTime.time = time;
    }
    defaultTime.type = type;
    return defaultTime;
};
</script>
<style lang="less">
    .time-holder {
        margin-top: 7px;
        .ivu-select {
            height: 26px;
            .ivu-select-selection {
                height: 26px;
                .ivu-select-placeholder,
                .ivu-select-selected-value {
                    height: 26px;
                    line-height: 26px;
                }
                .ivu-icon {
                    color: #55abf9;
                }
            }
            .ivu-select-item {
                padding: 5px 16px;
            }
        }
        .common-tip {
            .noahv-date-picker-wrapper {
                margin-left: -5px;
                margin-top: 3px;
                vertical-align: top;
                .noahv-date-picker-input-wrapper {
                    .noahv-date-picker-input {

                        border-left: none;
                    }
                }
            }
        }
    }
</style>
