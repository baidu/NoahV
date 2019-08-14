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
                v-model="dateValue.endSecond"
                @on-change="timeChange('right')"
            >
            </InputNumber>
        </div>
        </template>
        <div class="btn-panel" v-if="confirm">
            <button type="button" class="primary" @click="confirmClick">确定</button>
            <button type="button" class="reset" @click="reset">取消</button>
        </div>
    </div>
</template>

<script>
import datePickerUtils from './datePicker.js';

export default {
    name: 'NvDatePickerConsoleTimePanel',
    data() {
        return {
            // 格式处理函数
            formatter: value => (value < 10 ? `0${value}` : `${value}`),
            // 格式解析函数
            parser: value => (value < 10 ? value.replace('0', '') : value)
        };
    },
    props: {
        confirm: Boolean,
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
    methods: {
        /**
         * 切换时间
         *
         * @param {String} pos 标识切换起始/终止时间
         */
        timeChange(pos) {
            if (this.type === 'datetime') {
                if (this.dateValue.selectedDate) {
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
            }
            if (this.type === 'daterangetime') {
                if (pos === 'left' && this.dateValue.startSelectedDate) {
                    this.setSelectedDate('start');
                    this.selfHealing('left');
                    this.$emit('on-date-change');
                }
                if (pos === 'right' && this.dateValue.endSelectedDate) {
                    this.setSelectedDate('end');
                    this.selfHealing('right');
                    this.$emit('on-date-change');
                }
            }
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
            this.$emit('on-confirm');
        }
    }
};
</script>

