<template>
    <div class="date-picker-cells">
        <div class="cells-header">
            <span v-for="(item, i) in weekDays" :key="i">{{item}}</span>
        </div>
        <span
            v-for="(item, i) in readCells"
            :key="i"
            :class="getCellCls(item)"
            :data-year="item.year"
            :data-month="item.month"
            :data-item="item"
            @click="handleClick(item)"
        >
            <em>{{item['showDate']}}</em>
        </span>
    </div>
</template>
<script>
import datePickerUtils from './datePicker.js';


export default {
    name: 'NvDatePickerDateTable',
    props: {
        type: String,
        options: Object,
        confirm: Boolean,
        weekDays: Array,
        // 其他面板的日期集合
        otherCells: Array,
        // 当前面板的日期集合
        currentCells: Array,
        dateValue: Object,
        autoClose: Boolean
    },
    data() {
        return {
            readCells: [],
            startSelectedDate: '',
            endSelectedDate: '',
            selectedSingleDate: ''
        };
    },
    watch: {
        currentCells: {
            handler(cells) {
                this.readCells = cells;
            },
            immediate: true
        },
        'dateValue.startSelectedDate': {
            handler(val) {
                this.startSelectedDate = val;
            },
            deep: true,
            immediate: true
        },
        'dateValue.endSelectedDate': {
            handler(val) {
                this.endSelectedDate = val;
            },
            deep: true,
            immediate: true
        },
        'dateValue.selectedDate': {
            handler(val) {
                this.selectedSingleDate = val;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        /**
         * 样式控制逻辑
         *
         * @param {Object} cell 日期单元
         * @return {Array} 该日期单元的样式集合
         */
        getCellCls(cell) {
            return [
                'cell',
                {
                    'last-month': cell.type === 'prev-month',
                    'next-month': cell.type === 'next-month',
                    'current-month': cell.type === 'current-month',
                    'date-picker-selected': cell.isSelected,
                    'date-picker-range-selected': cell.inSelectedSection,
                    'today-selected': cell.isToday && cell.isSelected && !cell.inSelectedSection,
                    'today': cell.isToday,
                    'cell-disabled': cell.isDisabled
                }
            ];
        },
        /**
         * 日期的点击处理逻辑
         *
         * @param {Object} cell 点击的日期对象
         */
        handleClick(cell) {
            if (cell && cell.isDisabled) {
                this.$Message.error('不可以设置禁止日期！');
                return;
            }
            if (cell.type !== 'current-month') {
                return;
            }
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                this.updateDateHandler(cell);
                this.$emit('on-date-change');
                if (!this.confirm && this.autoClose) {
                    this.$emit('auto-close-picker');
                }
            }
            else if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                this.updateDateRangeHandler(cell);
                this.$emit('on-date-change');
            }
        },
        /**
         * 选中单时间点时，选中日期的更新处理逻辑
         *
         * @param {Object} cell 点击的日期对象
         */
        updateDateHandler(cell) {
            datePickerUtils.toggleSelectedHandler(
                this.currentCells, false, false,
                () => {
                    return true;
                },
                () => {
                    return true;
                }
            );
            datePickerUtils.toggleSelectedHandler(
                this.otherCells, false, false,
                () => {
                    return true;
                },
                () => {
                    return true;
                }
            );
            this.$set(cell, 'isSelected', true);
            this.selectedSingleDate = new Date(
                cell.year,
                cell.month,
                cell.showDate,
                this.dateValue.startHour,
                this.dateValue.startMinute,
                this.dateValue.startSecond
            );
            this.$set(this.dateValue, 'selectedDate', this.selectedSingleDate);

            this.$emit('reset-side-bar');
            this.$emit('reset-hot-keys');
            this.$emit('reset-top-bar');
        },
        /**
         * 选中时间段时，选中日期的更新处理逻辑
         *
         * @param {Object} cell 点击的日期对象
         */
        updateDateRangeHandler(cell) {
            if (this.startSelectedDate && this.endSelectedDate) {
                datePickerUtils.toggleSelectedHandler(
                    this.currentCells, false, false,
                    () => {
                        return true;
                    },
                    () => {
                        return true;
                    }
                );
                datePickerUtils.toggleSelectedHandler(
                    this.otherCells, false, false,
                    () => {
                        return true;
                    },
                    () => {
                        return true;
                    }
                );
                this.$set(cell, 'isSelected', true);
                this.startSelectedDate = new Date(
                    cell.year,
                    cell.month,
                    cell.showDate,
                    this.dateValue.startHour,
                    this.dateValue.startMinute,
                    this.dateValue.startSecond
                );
                this.endSelectedDate = '';
            }
            else if (this.startSelectedDate) {
                let date = new Date(
                    cell.year,
                    cell.month,
                    cell.showDate,
                    this.dateValue.endHour,
                    this.dateValue.endMinute,
                    this.dateValue.endSecond
                );
                if (this.startSelectedDate > date) {
                    // invalid date handle
                    if (this.isSameDay(this.startSelectedDate, date)) {
                        this.dateValue.endHour = this.dateValue.startHour;
                        this.dateValue.endMinute = this.dateValue.startMinute;
                        this.dateValue.endSecond = this.dateValue.startSecond;
                        this.endSelectedDate = new Date(
                            cell.year,
                            cell.month,
                            cell.showDate,
                            this.dateValue.endHour,
                            this.dateValue.endMinute,
                            this.dateValue.endSecond
                        );
                    }
                    else {
                        datePickerUtils.toggleSelectedHandler(
                            this.currentCells, false, false,
                            () => {
                                return true;
                            },
                            () => {
                                return true;
                            }
                        );
                        datePickerUtils.toggleSelectedHandler(
                            this.otherCells, false, false,
                            () => {
                                return true;
                            },
                            () => {
                                return true;
                            }
                        );
                        this.startSelectedDate = date;
                        this.endSelectedDate = '';
                        this.$set(cell, 'isSelected', true);
                    }
                }
                else {
                    this.endSelectedDate = date;
                    datePickerUtils.toggleSelectedHandler(
                        this.currentCells, true, true,
                        item => {
                            let date = new Date(item.year, item.month, item.showDate);
                            return date.getTime() === datePickerUtils.clearHours(this.startSelectedDate);
                        },
                        item => {
                            let date = new Date(item.year, item.month, item.showDate);
                            return date > datePickerUtils.clearHours(this.startSelectedDate)
                                && date < datePickerUtils.clearHours(this.endSelectedDate);
                        }
                    );
                    datePickerUtils.toggleSelectedHandler(
                        this.otherCells, true, true,
                        item => {
                            let date = new Date(item.year, item.month, item.showDate);
                            return date.getTime() === datePickerUtils.clearHours(this.startSelectedDate);
                        },
                        item => {
                            let date = new Date(item.year, item.month, item.showDate);
                            return date > datePickerUtils.clearHours(this.startSelectedDate)
                                && date < datePickerUtils.clearHours(this.endSelectedDate);
                        }
                    );
                    this.$set(cell, 'isSelected', true);
                    if (!this.confirm && this.autoClose) {
                        this.$emit('auto-close-picker');
                    }
                }
            }
            else {
                this.$set(cell, 'isSelected', true);
                this.startSelectedDate = new Date(
                    cell.year,
                    cell.month,
                    cell.showDate,
                    this.dateValue.startHour,
                    this.dateValue.startMinute,
                    this.dateValue.startSecond
                );
                this.endSelectedDate = '';
            }
            this.$set(this.dateValue, 'startSelectedDate', this.startSelectedDate);
            this.$set(this.dateValue, 'endSelectedDate', this.endSelectedDate);

            this.$emit('reset-side-bar');
            this.$emit('reset-hot-keys');
            this.$emit('reset-top-bar');
        },
        /**
         * selected date is in same day
         *
         * @return {Boolean} return is or not in same day
         */
        isSameDay(startDate, endDate) {
            let startDay = datePickerUtils.clearHours(startDate);
            let endDay = datePickerUtils.clearHours(endDate);
            return startDay === endDay;
        },
        /**
         * 重置日期面板
         *
         */
        clearDateTable() {
            datePickerUtils.toggleSelectedHandler(
                this.currentCells, false, false,
                () => {
                    return true;
                },
                () => {
                    return true;
                }
            );
            datePickerUtils.toggleSelectedHandler(
                this.otherCells, false, false,
                () => {
                    return true;
                },
                () => {
                    return true;
                }
            );
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                this.$set(this.dateValue, 'selectedDate', '');
            }
            else if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                this.$set(this.dateValue, 'startSelectedDate', '');
                this.$set(this.dateValue, 'endSelectedDate', '');
            }

        }
    }
};
</script>
