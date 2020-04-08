<template>
    <div>
        <template v-if="['datetime', 'daterangetime'].indexOf(type) > -1">
        <div class="left-time-panel">
            <InputNumber
                v-model="dateValue.startHour"
                :max="23"
                :min="0"
                :formatter="formatter"
                :parser="parser"
                :precision="0"
                :active-change="activeChange"
                @on-change="timeChange('left')"
            >
            </InputNumber>
            <span>:</span>
            <InputNumber
                v-model="dateValue.startMinute"
                :max="59"
                :min="0"
                :formatter="formatter"
                :parser="parser"
                :precision="0"
                :active-change="activeChange"
                @on-change="timeChange('left')"
            >
            </InputNumber>
            <span v-if="timePickerCtrl.secondePicker">:</span>
            <InputNumber
                v-model="dateValue.startSecond"
                v-if="timePickerCtrl.secondePicker"
                :max="59"
                :min="0"
                :formatter="formatter"
                :parser="parser"
                :precision="0"
                :active-change="activeChange"
                @on-change="timeChange('left')"
            >
            </InputNumber>
        </div>
        <div v-if="timePickerCtrl.endTimePicker" class="right-time-panel">
            <InputNumber
                v-model="dateValue.endHour"
                :max="23"
                :min="0"
                :formatter="formatter"
                :parser="parser"
                :precision="0"
                :active-change="activeChange"
                @on-change="timeChange('right')"
            >
            </InputNumber>
            <span>:</span>
            <InputNumber
                :max="59"
                :min="0"
                :formatter="formatter"
                :parser="parser"
                :precision="0"
                :active-change="activeChange"
                v-model="dateValue.endMinute"
                @on-change="timeChange('right')"
            >
            </InputNumber>
            <span v-if="timePickerCtrl.secondePicker">:</span>
            <InputNumber
                v-if="timePickerCtrl.secondePicker"
                :max="59"
                :min="0"
                :formatter="formatter"
                :parser="parser"
                :precision="0"
                :active-change="activeChange"
                v-model="dateValue.endSecond"
                @on-change="timeChange('right')"
            >
            </InputNumber>
        </div>
        </template>
        <p class="note-tips" v-if="tips && type === 'daterangetime'">
            <span>*</span>
            <span>{{tips}}</span>
        </p>
        <div class="btn-panel" v-if="confirm">
            <button type="button" :class="['primary', {'confirm-disabled': confirmDisabled}]" :disabled="confirmDisabled" @click="confirmClick">{{t('datepicker.ok')}}</button>
            <button type="button" class="reset" @click="reset">{{t('datepicker.clear')}}</button>
        </div>
    </div>
</template>

<script>
import datePickerUtils from './datePicker.js';
import mixin from '../../mixins';

export default {
    mixins: [mixin],
    name: 'NvDatePickerConsoleTimePanel',
    data() {
        return {
            // 格式处理函数
            formatter: val => {
                let value = val ? (val < 10 ? `0${val}` : `${val}`) : `00`;
                return value; 
            },
            // 格式解析函数
            parser: val => {
                let value = val ? (val < 10 ? val.replace('0', '') : val) : 0;
                return value;
            }
        };
    },
    props: {
        // 信息提示
        tips: '',
        trigger: String,
        confirm: Boolean,
        autoFix: Boolean,
        // 维护时间日历组件的日期对象
        dateValue: Object,
        // 时间面板的显示控制
        timePickerCtrl: Object,
        // 时间日历组件的类型
        type: {
            type: String,
            default: 'datetime'
        }
    },
    computed: {
        activeChange() {
            return this.trigger === 'change' ? true : false;
        },
        confirmDisabled() {
            return ['daterangetime', 'daterange'].indexOf(this.type) > -1 
            && !(this.dateValue.startSelectedDate && this.dateValue.endSelectedDate);
        }
    },
    methods: {
        /**
         * 切换时间
         *
         * @param {String} pos 标识切换起始/终止时间
         */
        timeChange(pos) {
            if (this.type === 'datetime' && this.dateValue.selectedDate) {
                this.dateValue.selectedDate = new Date(
                    this.dateValue.selectedDate.getFullYear(),
                    this.dateValue.selectedDate.getMonth(),
                    this.dateValue.selectedDate.getDate(),
                    this.dateValue.startHour,
                    this.dateValue.startMinute,
                    this.dateValue.startSecond
                );
                this.$emit('on-date-change');
            }
            if (this.type === 'daterangetime') {
                if (pos === 'left' && this.dateValue.startSelectedDate) {
                    this.nullHealing();
                    this.setSelectedDate('start');
                    if (this.autoFix) {
                        this.selfHealing('left');
                    }
                    this.$emit('on-date-change');
                }
                if (pos === 'right' && this.dateValue.endSelectedDate) {
                    this.nullHealing();
                    this.setSelectedDate('end');
                    if (this.autoFix) {
                        this.selfHealing('right');
                    }
                    this.$emit('on-date-change');
                }
            }
        },
        /**
         * self healing for null time value
         * 
         */
        nullHealing() {
            this.dateValue.startHour = this.dateValue.startHour || 0;
            this.dateValue.startMinute = this.dateValue.startMinute || 0;
            this.dateValue.startSecond = this.dateValue.startSecond || 0;
            this.dateValue.endHour = this.dateValue.endHour || 0;
            this.dateValue.endMinute = this.dateValue.endMinute || 0;
            this.dateValue.endSecond = this.dateValue.endSecond || 0;
        },
        /**
         * self healing for invalid selected time value
         * 
         * @param {String} key left/right flag
         */
        selfHealing(key) {
            if (!this.dateValue.startSelectedDate || !this.dateValue.endSelectedDate) {
                return;
            }
            
            let start = this.dateValue.startSelectedDate.getTime();
            let end = this.dateValue.endSelectedDate.getTime();
            if (start > end) {
                if (key === 'left') {
                    this.dateValue.endHour = this.dateValue.startHour;
                    this.dateValue.endMinute = this.dateValue.startMinute;
                    this.dateValue.endSecond = this.dateValue.startSecond;
                    this.setSelectedDate('end');
                }
                else {
                    this.dateValue.startHour = this.dateValue.endHour;
                    this.dateValue.startMinute = this.dateValue.endMinute;
                    this.dateValue.startSecond = this.dateValue.endSecond;
                    this.setSelectedDate('start');
                }
            }
        },
        /**
         * set selctedDate
         * @param {String} key selectedDate kind
         */
        setSelectedDate(key) {
            this.dateValue[key + 'SelectedDate'] = new Date(
                this.dateValue[key + 'SelectedDate'].getFullYear(),
                this.dateValue[key + 'SelectedDate'].getMonth(),
                this.dateValue[key + 'SelectedDate'].getDate(),
                this.dateValue[key + 'Hour'],
                this.dateValue[key + 'Minute'],
                this.dateValue[key + 'Second']
            );
        },
        /**
         * 清空按钮处理逻辑
         *
         */
        reset() {
            this.$emit('on-reset');
        },
        /**
         * 确认按钮处理逻辑
         *
         */
        confirmClick() {
            if (['daterangetime', 'daterange'].indexOf(this.type) > -1) {
                if (this.dateValue.startSelectedDate && this.dateValue.endSelectedDate) {
                    this.$emit('on-confirm');
                }
            }
            else {
                this.$emit('on-confirm');
            }
        }
    }
};
</script>

