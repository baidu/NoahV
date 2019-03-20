<template>
    <div class="default-time">
        <div class="title">
            时间范围
        </div>
        <div class="time-radio">
            <Form v-model="timeConfig">
                <RadioGroup v-model="timeConfig.type" vertical @on-change="typeChange">
                    <Radio label="relative">使用仪表盘时间范围</Radio>
                    <Radio label="fixed">设定相对时间范围</Radio>
                    <div class="fixed-time" v-if="timeConfig.type === 'fixed'">
                        <RadioGroup
                            v-model="timeConfig.fixedTime"
                            type="button"
                            size="small"
                            @on-change="fixTypeChange"
                        >
                            <Radio
                                v-for="item in fixedTimeGroup"
                                :label="item.value"
                                :key="item.value"
                                :class="[item.value === timeConfig.fixedTime ? 'ivu-radio-wrapper-checked' : '']"
                            >
                                {{item.name}}
                            </Radio>
                        </RadioGroup>
                        <div class="customFixedTime" v-if="fixedCustom === 'custom'">
                            最近
                            <InputNumber
                                :min="1"
                                v-model="timeConfig.value"
                                size="small"
                                style="width:80px;margin: 0 10px;"
                                @on-change="customValueChange"
                            >
                            </InputNumber>
                            <Select v-model="timeConfig.unit" style="width:70px"  @on-change="customUnitChange">
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
                    <Radio label="absolute">设定绝对时间范围</Radio>
                    <div class="absolute-time" v-show="timeConfig.type === 'absolute'">
                        <div class="timepicker">
                            <SaDatePicker
                                ref="absoluteTime"
                                type="daterangetime"
                                dateFormat="YYYY-MM-DD HH:mm"
                                :width="300"
                                :value="timeConfig.time"
                                @on-change="timeChange($event)"
                            >
                            </SaDatePicker>
                        </div>
                    </div>
                </RadioGroup>
            </Form>
        </div>
    </div>
</template>

<script>
import m from 'moment';
import u from 'underscore';
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
const getDefaultTime = (type, time) => {
    if (type === undefined && time === undefined) {
        return {
            type: 'relative',
            time: ''
        };
    }
    let defaultTime = {};
    if (type === 'fixed') {
        defaultTime = {};
        if (time.indexOf('before') > -1) {
            let matchArr = time.match(/(\d+)([mhdwM])/);
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
const parseValue = value => {
    let timeConfig = {};
    timeConfig.timeType = value.type;
    if (value.type === 'fixed') {
        if (value.fixedTime === 'custom') {
            if (value.unit === undefined) {
                timeConfig.time = '';
            }
            else {
                let customValue = value.value || 1;
                timeConfig.time = 'before('
                    + customValue
                    + value.unit
                    + ')';
            }
        }
        else {
            timeConfig.time = value.fixedTime || '';
        }
    }
    else if (value.type === 'absolute') {
        if (Array.isArray(value.time)) {
            timeConfig.time = value.time.join('|');
        }
        else {
            timeConfig.time = value.time;
        }
    }
    else {
        timeConfig.time = '';
    }
    return timeConfig;
};
const dateFormat = 'YYYY-MM-DD HH:mm';
export default {
    name: 'default-time',
    data() {
        return {
            // 是否选中自定义
            fixedCustom: '',
            fixedTimeGroup: fixedTimeGroup,
            customFixedTimeUnitGroup: customFixedTimeUnitGroup
        };
    },
    methods: {
        // 时间组件值改变
        timeChange(time) {
            if (time.length !== 2 || typeof time[0] !== 'object' || typeof time[1] !== 'object') {
                return;
            }
            time = time.map(item => {
                return m(item).format(dateFormat);
            });
            this.timeConfig = {
                type: 'absolute',
                time: time
            };

        },
        // 时间类型改变
        typeChange(type) {
            let obj = {
                type: type
            };
            this.fixedCustom = '';
            // 如果选中的是绝对时间，对组件时间做一次提取
            if (type === 'absolute') {
                let absoluteTime = this.$refs.absoluteTime.getDate().selectDate;
                if (
                    absoluteTime.length === 2
                    && typeof absoluteTime[0] === 'object'
                    && typeof absoluteTime[1] === 'object') {
                    absoluteTime = absoluteTime.map(item => {
                        return m(item).format(dateFormat);
                    });
                    obj.time = absoluteTime;
                }
            }
            this.timeConfig = u.extend(this.timeConfig, obj);
        },

        /**
         * 相对时间范围值的改版
         *
         * @param  {string} fixedTime 相对时间的值
         */
        fixTypeChange(fixedTime) {
            if (fixedTime === 'custom') {
                this.fixedCustom = 'custom';
            }
            else {
                this.fixedCustom = '';
            }
            this.timeConfig = u.extend(this.timeConfig, {fixedTime: fixedTime});
        },
        /**
         * 自定义值改变
         *
         * @param  {number} value 自定义值
         */
        customValueChange(value) {
            this.timeConfig = u.extend(this.timeConfig, {value: value});
        },
        /**
         * 自定义单位改变
         *
         * @param  {string} unit 自定义单位
         */
        customUnitChange(unit) {
            this.timeConfig = u.extend(this.timeConfig, {unit: unit});
        }
    },
    computed: {
        timeConfig: {
            get() {
                let timeType = this.$store.state.dashboard.widgetConfig.timeType;
                let time = this.$store.state.dashboard.widgetConfig.time;
                return getDefaultTime(timeType, time);
            },
            set(value) {
                if (value.fixedTime === 'custom'
                    && value.unit === undefined
                    && value.value === undefined
                    && value.type === 'fixed'
                ) {
                    return;
                }
                this.$store.commit('UPDATE_CONFIG', parseValue(value));
            }
        }
    }
};
</script>

<style lang="less">
.default-time {
    margin-top: 20px;
    position: relative;
    .title {
        float: left;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
    }
    .time-radio {
        margin-left: 80px;
        .fixed-time {
            margin-left: 20px;
            margin: 10px 0;
            .customFixedTime {
                margin-top: 10px;
            }
            .ivu-radio-group-button.ivu-radio-group-small .ivu-radio-wrapper {
                padding: 0 10px;
            }
        }
        .absolute-time {
            height: 30px;
            .timepicker {
                position: absolute;
                z-index: 999;
            }
        }
    }
    .ivu-select-single {
        .ivu-select-selection {
            line-height: 22px;
            height: 22px;
            .ivu-select-selected-value {
                line-height: 22px;
                height: 22px;
            }
        }
    }
    .ivu-select-item {
        padding: 3px 16px;
    }
}
</style>
