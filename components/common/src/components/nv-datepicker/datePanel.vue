<template>
    <div class="inner-panel-body">
        <div class="left-panel">
            <div class="header">
                <div class="btn-wrapper" @click="monthChange('left', 'prev')">
                    <div class="last-btn"></div>
                </div>
                <Select
                    v-model="dateValue.startYear"
                    class="header-year"
                    @on-change="headerChange('left')"
                >
                    <Option v-for="item in dateOptions.leftYears" :value="item" :key="item">
                        {{item}}
                    </Option>
                </Select>
                <Select
                    v-model="dateValue.startMonth"
                    class="header-month"
                    @on-change="headerChange('left')"
                >
                    <Option v-for="item in dateOptions.months" :value="item" :key="item">
                        {{item + 1}}
                    </Option>
                </Select>
                <div class="btn-wrapper"  @click="monthChange('left', 'next')">
                    <div class="next-btn"></div>
                </div>
            </div>
            <NvDatePickerDateTable
                :ref="'leftSaDatePickerDateTable' + postfix"
                :type="type"
                :confirm="confirm"
                :options="options"
                :autoClose="autoClose"
                :dateValue="dateValue"
                :weekDays="dateOptions.weekDays"
                :currentCells="dateValue.leftDays"
                :otherCells="dateValue.rightDays"
                :disabledDateClickTip="disabledDateClickTip"
                @on-date-change="dateChange"
                @reset-side-bar="resetSidebar"
                @reset-hot-keys="resetHotKeys"
                @reset-top-bar="resetTopBar"
                @auto-close-picker="autoClosePicker"
            >
            </NvDatePickerDateTable>
        </div>
        <div class="right-panel" v-if="type.indexOf('range') > -1">
            <div class="header">
                <div class="btn-wrapper" @click="monthChange('right', 'prev')">
                    <div class="last-btn"></div>
                </div>
                <Select
                    v-model="dateValue.endYear"
                    class="header-year"
                    @on-change="headerChange('right')"
                >
                    <Option v-for="item in dateOptions.rightYears" :value="item" :key="item">
                        {{item}}
                    </Option>
                </Select>
                <Select
                    v-model="dateValue.endMonth"
                    class="header-month"
                    @on-change="headerChange('right')"
                >
                    <Option v-for="item in dateOptions.months" :value="item" :key="item">
                        {{item + 1}}
                    </Option>
                </Select>
                <div class="btn-wrapper" @click="monthChange('right', 'next')">
                    <div class="next-btn"></div>
                </div>
            </div>
            <NvDatePickerDateTable
                :ref="'rightSaDatePickerDateTable' + postfix"
                :type="type"
                :options="options"
                :confirm="confirm"
                :autoClose="autoClose"
                :dateValue="dateValue"
                :weekDays="dateOptions.weekDays"
                :currentCells="dateValue.rightDays"
                :otherCells="dateValue.leftDays"
                :disabledDateClickTip="disabledDateClickTip"
                @on-date-change="dateChange"
                @reset-side-bar="resetSidebar"
                @reset-hot-keys="resetHotKeys"
                @reset-top-bar="resetTopBar"
                @auto-close-picker="autoClosePicker"
            >
            </NvDatePickerDateTable>
        </div>
    </div>
</template>

<script>
import u from 'underscore';
import datePickerUtils from './datePicker.js';
import NvDatePickerDateTable from './dateTable';

export default {
    name: 'NvDatePickerDatePanel',
    components: {
        // 日期选择单面板
        NvDatePickerDateTable
    },
    data() {
        return {
            // uuid
            postfix: ''
        };
    },
    props: {
        // 用户自定义配置
        options: Object,
        confirm: Boolean,
        autoClose: Boolean,
        dateValue: Object,
        // 日期时间候选项
        dateOptions: Object,
        isDisabledHandler: Function,
        disabledDateClickTip: String,
        type: {
            type: String,
            default: 'datetime'
        }
    },
    created() {
        this.postfix = (new Date()).getTime();
        // 渲染初始选中效果
        this.headerChange('left');
    },
    methods: {
        /**
         * 切换月份
         *
         * @param {string} pos 标识切换起始/终止月份
         * @param {string} flag 标识切换到前/后一个月份
         */
        monthChange(pos, flag) {
            if (pos === 'left') {
                if (flag === 'prev') {
                    // 向前切换
                    if (this.dateValue.startMonth === 0) {
                        this.dateValue.startYear -= 1;
                        this.dateValue.startMonth = 11;
                    }
                    else {
                        this.dateValue.startMonth -= 1;
                    }
                }
                else {
                    // 向后切换
                    if (this.dateValue.startMonth === 11) {
                        this.dateValue.startYear += 1;
                        this.dateValue.startMonth = 0;
                    }
                    else {
                        this.dateValue.startMonth += 1;
                    }
                }
                this.linkage('left');
            }
            else {
                if (flag === 'prev') {
                    // 向前切换
                    if (this.dateValue.endMonth === 0) {
                        this.dateValue.endYear -= 1;
                        this.dateValue.endMonth = 11;
                    }
                    else {
                        this.dateValue.endMonth -= 1;
                    }
                }
                else {
                    // 向后切换
                    if (this.dateValue.endMonth === 11) {
                        this.dateValue.endYear += 1;
                        this.dateValue.endMonth = 0;
                    }
                    else {
                        this.dateValue.endMonth += 1;
                    }
                }
                this.linkage('right');
            }
            this.updateYearRange();
            
            this.dateValue.leftDays = datePickerUtils.getMonthData(
                this.dateValue.startYear,
                this.dateValue.startMonth,
                this.isDisabledHandler
            )['days'];
            this.dateValue.rightDays = datePickerUtils.getMonthData(
                this.dateValue.endYear,
                this.dateValue.endMonth,
                this.isDisabledHandler
            )['days'];
            this.$nextTick(() => {
                this.updateHandler(this.type);
            });
        },
        /**
         * 选择年份（或月份）
         *
         * @param {String} pos 标识切换起始/终止面板
         */
        headerChange(pos) {
            this.linkage(pos);
            this.updateYearRange();
            this.dateValue.leftDays = datePickerUtils.getMonthData(
                this.dateValue.startYear,
                this.dateValue.startMonth,
                this.isDisabledHandler
            )['days'];
            this.dateValue.rightDays = datePickerUtils.getMonthData(
                this.dateValue.endYear,
                this.dateValue.endMonth,
                this.isDisabledHandler
            )['days'];
            this.$nextTick(() => {
                this.updateHandler(this.type);
            });
        },
        /**
         * 实时联动两个面板，保证左面板始终在右面板前面
         *
         * @param {string} source 事件来源
         */
        linkage(source) {
            let leftMonth = +new Date(this.dateValue.startYear, this.dateValue.startMonth, 1);
            let rightMonth = +new Date(this.dateValue.endYear, this.dateValue.endMonth, 1);
            let needLinkage = leftMonth >= rightMonth;
            if (needLinkage) {
                if (source === 'left') {
                    this.dateValue.endMonth = this.dateValue.startMonth + 1;
                    if (this.dateValue.endMonth > 11) {
                        this.dateValue.endYear = this.dateValue.startYear + 1;
                        this.dateValue.endMonth = 0;
                    }
                    else {
                        this.dateValue.endYear = this.dateValue.startYear;
                    }
                }
                else if (source === 'right') {
                    this.dateValue.startMonth = this.dateValue.endMonth - 1;
                    if (this.dateValue.startMonth < 0) {
                        this.dateValue.startYear = this.dateValue.endYear - 1;
                        this.dateValue.startMonth = 11;
                    }
                    else {
                        this.dateValue.startYear = this.dateValue.endYear;
                    }
                }
            }
        },
        /**
         * 调整年份范围
         *
         */
        updateYearRange() {
            let leftYears = this.dateOptions.leftYears;
            let rightYears = this.dateOptions.rightYears;
            let leftMinYear = u.min(leftYears);
            let leftMaxYear = u.max(leftYears);
            let rightMinYear = u.min(rightYears);
            let rightMaxYear = u.max(rightYears);

            if (this.dateValue.startYear < leftMinYear) {
                leftYears.unshift(this.dateValue.startYear);
                rightYears.unshift(this.dateValue.startYear);
                this.$set(this.dateOptions, 'leftYears', leftYears);
                this.$set(this.dateOptions, 'rightYears', rightYears);
            }
            else if (this.dateValue.endYear > rightMaxYear) {
                leftYears.push(this.dateValue.endYear);
                rightYears.push(this.dateValue.endYear);
                this.$set(this.dateOptions, 'leftYears', leftYears);
                this.$set(this.dateOptions, 'rightYears', rightYears);
            }
        },
        /**
         * 切换月份或年份的更新处理逻辑
         *
         * @param {string} type 时间日历组件的日期类型
         */
        updateHandler(type) {
            if (['date', 'datetime'].indexOf(type) > -1) {
                this.updateSelectedDateHandler();
            }
            if (['daterange','daterangetime'].indexOf(type) > -1) {
                this.updateSelectedRangeDateHandler();
            }
        },
        /**
         * 单时间点的选中更新处理逻辑
         */
        updateSelectedDateHandler() {
            if (this.dateValue.selectedDate) {
                datePickerUtils.toggleSelectedHandler(
                    this.dateValue.leftDays, true, false,
                    item => {
                        let date = new Date(item.year, item.month, item.showDate);
                        return date.getTime() === datePickerUtils.clearHours(this.dateValue.selectedDate);
                    },
                    () => {
                        return true;
                    }
                );
                datePickerUtils.toggleSelectedHandler(
                    this.dateValue.rightDays, true, false,
                    item => {
                        let date = new Date(item.year, item.month, item.showDate);
                        return date.getTime() === datePickerUtils.clearHours(this.dateValue.selectedDate);
                    },
                    () => {
                        return true;
                    }
                );
            }
        },
        /**
         * 时间段的选中更新处理逻辑
         */
        updateSelectedRangeDateHandler() {
            if (this.dateValue.startSelectedDate && this.dateValue.endSelectedDate) {
                datePickerUtils.toggleSelectedHandler(
                    this.dateValue.leftDays, true, true,
                    item => {
                        if (item.type === 'current-month') {
                            let date = new Date(item.year, item.month, item.showDate);
                            return date.getTime() === datePickerUtils.clearHours(this.dateValue.startSelectedDate)
                                || date.getTime() === datePickerUtils.clearHours(this.dateValue.endSelectedDate);
                        }
                    },
                    item => {
                        if (item.type === 'current-month') {
                            let date = new Date(item.year, item.month, item.showDate);
                            return (date > datePickerUtils.clearHours(this.dateValue.startSelectedDate)
                                    && date < datePickerUtils.clearHours(this.dateValue.endSelectedDate));
                        }
                    }
                );
                datePickerUtils.toggleSelectedHandler(
                    this.dateValue.rightDays, true, true,
                    item => {
                        if (item.type === 'current-month') {
                            let date = new Date(item.year, item.month, item.showDate);
                            return date.getTime() === datePickerUtils.clearHours(this.dateValue.startSelectedDate)
                                || date.getTime() === datePickerUtils.clearHours(this.dateValue.endSelectedDate);
                        }
                    },
                    item => {
                        if (item.type === 'current-month') {
                            let date = new Date(item.year, item.month, item.showDate);
                            return (date > datePickerUtils.clearHours(this.dateValue.startSelectedDate)
                                    && date < datePickerUtils.clearHours(this.dateValue.endSelectedDate));
                        }
                    }
                );
            }
            else if (this.dateValue.startSelectedDate) {
                datePickerUtils.toggleSelectedHandler(
                    this.dateValue.leftDays, true, false,
                    item => {
                        if (item.type === 'current-month') {
                            let date = new Date(item.year, item.month, item.showDate);
                            return date.getTime() === datePickerUtils.clearHours(this.dateValue.startSelectedDate);
                        }
                    },
                    () => {
                        return true;
                    }
                );
                datePickerUtils.toggleSelectedHandler(
                    this.dateValue.rightDays, true, false,
                    item => {
                        if (item.type === 'current-month') {
                            let date = new Date(item.year, item.month, item.showDate);
                            return date.getTime() === datePickerUtils.clearHours(this.dateValue.startSelectedDate);
                        }
                    },
                    () => {
                        return true;
                    }
                );
            }
            else {
                // do nothing
            }
        },
        /**
         * 抛出change事件
         */
        dateChange() {
            this.$emit('on-date-change');
        },
        /**
         * 重置内部快捷面板
         *
         */
        resetSidebar() {
            this.$emit('reset-side-bar');
        },
        /**
         * 重置外部快捷面板
         *
         */
        resetHotKeys() {
            this.$emit('reset-hot-keys');
        },
        /**
         * 重置外部快捷面板
         *
         */
        resetTopBar() {
            this.$emit('reset-top-bar');
        },
        /**
         * 自动关闭选择面板，当confirm=false且设置autoClose=true时有效
         *
         */
        autoClosePicker() {
            this.$emit('close-picker');
        },
        /**
         * 清除日历面板
         *
         */
        clearDateTable() {
            this.$refs['leftSaDatePickerDateTable' + this.postfix].clearDateTable();
            if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                this.$refs['rightSaDatePickerDateTable' + this.postfix].clearDateTable();
            }
        }
    }
};
</script>

