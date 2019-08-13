<template>
    <div>
        <div class="time-panel" v-if="['datetime', 'daterangetime'].indexOf(type) > -1">
            <label>时间：</label>
            <select v-model="dateValue.startHour" @change="timeChange('left')">
                <option
                    v-for="(item, i) in dateOptions.hours"
                    :value="item"
                    :key="i"
                >
                    {{formatTime(item)}}
                </option>
            </select>
            <span>:</span>
            <select v-model="dateValue.startMinute" @change="timeChange('left')">
                <option
                    v-for="(item, i) in dateOptions.minutes"
                    :value="item"
                    :key="i"
                >
                    {{formatTime(item)}}
                </option>
            </select>
            <span v-if="timePickerCtrl.secondePicker">:</span>
            <select
                v-if="timePickerCtrl.secondePicker"
                v-model="dateValue.startSecond"
                @change="timeChange('left')"
            >
                <option
                    v-for="(item, i) in dateOptions.secondes"
                    :value="item"
                    :key="i"
                >
                    {{formatTime(item)}}
                </option>
            </select>
            <div v-if="timePickerCtrl.endTimePicker">
                <span>-</span>
                <select v-model="dateValue.endHour"  @change="timeChange('right')">
                    <option
                        v-for="(item, i) in dateOptions.hours"
                        :value="item"
                        :key="i"
                    >
                        {{formatTime(item)}}
                    </option>
                </select>
                <span>:</span>
                <select v-model="dateValue.endMinute"  @change="timeChange('right')">
                    <option
                        v-for="(item, i) in dateOptions.minutes"
                        :value="item"
                        :key="i"
                    >
                        {{formatTime(item)}}
                    </option>
                </select>
                <span v-if="timePickerCtrl.secondePicker">:</span>
                <select
                    v-if="timePickerCtrl.secondePicker"
                    v-model="dateValue.endSecond"
                    @change="timeChange('right')"
                >
                    <option
                        v-for="(item, i) in dateOptions.secondes"
                        :value="item"
                        :key="i"
                    >
                        {{formatTime(item)}}
                    </option>
                </select>
            </div>
        </div>
        <div class="btn-panel" v-if="confirm">
            <button type="button" class="reset" @click="reset">清空</button>
            <button type="button" class="primary" @click="confirmClick">确定</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'NvDatePickerCommonTimePanel',
    data() {
        return {
        };
    },
    props: {
        confirm: Boolean,
        dateValue: Object,
        // 日期时间候选项
        dateOptions: Object,
        timePickerCtrl: Object,
        type: {
            type: String,
            default: 'datetime'
        }
    },
    methods: {
        /**
         * change time
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
            else if (this.type === 'daterangetime') {
                if (pos === 'left' && this.dateValue.startSelectedDate) {
                    this.setSelectedDate('start');
                    this.selfHealing('left');
                    this.$emit('on-date-change');
                }
                else if (pos === 'right' && this.dateValue.endSelectedDate) {
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
         * 格式化时间选项
         *
         * @param {number} raw 原始时间选项
         * @return {number/string} 返回格式化后的时间选项
         */
        formatTime(raw) {
            return raw < 10 ? '0' + raw : raw;
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

