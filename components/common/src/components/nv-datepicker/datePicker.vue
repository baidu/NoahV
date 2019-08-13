<template>
    <div :class="getCls()" :style="style.wrapperStyle" ref="date-picker-wrapper-refs">
        <div class="date-picker-rel" @click="openPicker">
            <div class="input-wrapper" :style="style.inputWidth">
                <div
                    class="icon-wrapper"
                    :style="style.iconStyle"
                    @mouseover="iconMouseOver"
                    @mouseout="iconMouseOut"
                    @click="iconClickHandler($event)"
                >
                    <nv-icon :type="iconType" class="icon"></nv-icon>
                </div>
                <input
                    class="input"
                    :value="shownDateStr"
                    :style="style.height"
                    :placeholder="placeholder"
                />
            </div>
        </div>
        <div class="outer-panel-wrapper" v-if="hotKeyCtrl.outer">
            <NvDatePickerHotKeys
                :ref="'saDatePickerHotKeys' + postfix"
                :type="type"
                :confirm="confirm"
                :options="options"
                :autoClose="autoClose"
                :dateValue="dateValue"
                :hotKeyCtrl="hotKeyCtrl"
                @set-date-handler="setDate"
                @on-date-change="dateChange"
                @on-shortcut-click="shortCutClickHandler"
                @auto-close-picker="closePicker"
            >
            </NvDatePickerHotKeys>
        </div>
        <div
            v-if="showPickerPanel"
            :style="style.innerPanelStyle"
            class="inner-panel-wrapper"
        >
            <NvDatePickerSidebar
                :ref="'saDatePickerSidebar' + postfix"
                :type="type"
                :confirm="confirm"
                :options="options"
                :autoClose="autoClose"
                :dateValue="dateValue"
                :hotKeyCtrl="hotKeyCtrl"
                @set-date-handler="setDate"
                @on-date-change="dateChange"
                @on-shortcut-click="shortCutClickHandler"
                @auto-close-picker="closePicker"
            >
            </NvDatePickerSidebar>
            <div class="inner-panel-body-wrapper">
                <NvDatePickerTopBar
                    v-if="hotKeyCtrl.top"
                    :ref="'saDatePickerTopBar' + postfix"
                    :type="type"
                    :confirm="confirm"
                    :options="options"
                    :autoClose="autoClose"
                    :dateValue="dateValue"
                    :hotKeyCtrl="hotKeyCtrl"
                    @set-date-handler="setDate"
                    @on-date-change="dateChange"
                    @on-shortcut-click="shortCutClickHandler"
                    @auto-close-picker="closePicker"
                >
                </NvDatePickerTopBar>
                <NvDatePickerDatePanel
                    :ref="'saDatePickerDatePanel' + postfix"
                    :type="type"
                    :confirm="confirm"
                    :options="options"
                    :autoClose="autoClose"
                    :dateValue="dateValue"
                    :dateOptions="dateOptions"
                    :isDisabledHandler="isDisabledHandler"
                    @on-date-change="dateChange"
                    @close-picker="closePicker"
                    @reset-side-bar="clearSideBar"
                    @reset-hot-keys="clearHotKeys"
                    @reset-top-bar="clearTopBar"
                >
                </NvDatePickerDatePanel>
                <NvDatePickerTimePanel
                    :ref="'saDataPickerTimePanel' + postfix"
                    :type="type"
                    :theme="theme"
                    :confirm="confirm"
                    :dateValue="dateValue"
                    :dateOptions="dateOptions"
                    :timePickerCtrl="timePickerCtrl"
                    @on-close="closePicker"
                    @on-reset="resetTimePanel"
                    @on-confirm="confirmHandler"
                    @on-clear="clearClickHandler"
                    @on-date-change="dateChange"
                >
                </NvDatePickerTimePanel>
            </div>
        </div>
    </div>
</template>

<script>
import u from 'underscore';
import moment from 'moment';
import getClassName from '../utils.js';
import datePickerUtils from './datePicker.js';

import NvDatePickerTopBar from './topBar';
import NvDatePickerHotKeys from './hotKeys';
import NvDatePickerSidebar from './sidebar';
import NvDatePickerDatePanel from './datePanel';
import NvDatePickerTimePanel from './timePanel';

// 日期候选项
const dateOptions = {
    years: [],
    months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    hours: [],
    minutes: [],
    secondes: []
};
export default {
    name: 'NvDatePicker',
    components: {
        // 外部hotKeys面板
        NvDatePickerHotKeys,
        // 内部sidebar面板
        NvDatePickerSidebar,
        // 内部topbar面板
        NvDatePickerTopBar,
        // 内部日期选择面板
        NvDatePickerDatePanel,
        // 内部时间选择面板
        NvDatePickerTimePanel
    },
    model: {
        prop: 'value',
        event: 'on-change'
    },
    props: {
        value: [Date, Array, String],
        setShownTxt: Function,
        theme: {
            type: String,
            default: 'console'
        },
        type: {
            validator: function (value) {
                return ['date', 'datetime', 'daterange', 'daterangetime'].indexOf(value) > -1;
            },
            default: 'datetime'
        },
        options: {
            type: Object,
            default() {
                return {};
            }
        },
        placeholder: {
            type: String,
            default: '请选择时间'
        },
        confirm: {
            type: Boolean,
            default() {
                return true;
            }
        },
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: Number,
            default: 30
        },
        dateFormat: {
            type: String,
            default() {
                if (['datetime', 'daterangetime'].indexOf(this.type) > -1) {
                    return 'YYYY-MM-DD HH:mm:ss';
                }
                else {
                    return 'YYYY-MM-DD';
                }
            }
        },
        autoClose: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // uuid
            postfix: '',
            // icon样式控制
            iconType: 'calendar',
            // 日期候选项
            dateOptions: dateOptions,
            // 时间日期面板控制
            showPickerPanel: false,
            // 显示的格式化后的选中日期
            shownDateStr: '',
            // 控制逻辑日期对象
            dateValue: {
                // 开始年份
                startYear: '',
                // 开始月份
                startMonth: '',
                // 开始日期天
                startDay: '',
                // 左侧面板的所有日期
                leftDays: [],
                // 开始日期小时
                startHour: '',
                // 开始日期分钟
                startMinute: '',
                // 开始日期秒
                startSecond: '',
                // 开始日期
                startDate: '',
                // 终止日期年份
                endYear: '',
                // 终止日期月份
                endMonth: '',
                // 终止日期天
                endDay: '',
                // 右侧面板的所有日期
                rightDays: [],
                // 终止日期小时
                endHour: '',
                // 终止日期分钟
                endMinute: '',
                // 终止日期秒
                endSecond: '',
                // 终止日期
                endDate: '',
                // 选中日期，供选择时间点使用
                selectedDate: '',
                // 选中日期，供选择时间段使用
                startSelectedDate: '',
                endSelectedDate: ''
            }
        };
    },
    created() {
        // 初始化
        this.init();
        // console风格的图标需要加以区别
        this.getIconType();
        // 生成唯一后缀
        this.postfix = (new Date()).getTime();
        // console风格只支持topBar方式配置快捷面板
        if (this.themeStyle === 'console' && this.options.position) {
            this.options.position = 'top';
        }
    },
    mounted() {
        // 监听点击面板外部区域的事件
        document.body.addEventListener('click', this.clickOuterArea, false);
    },
    beforeDestroy() {
        document.body.removeEventListener('click', this.clickOuterArea, false);
    },
    computed: {
        /**
         * 计算各个容器的样式
         *
         * @return {Object} 返回样式
         */
        style() {
            let style = {
                inputWidth: '',
                height: '',
                iconStyle: '',
                wrapperStyle: '',
                innerPanelStyle: ''
            };
            style.inputWidth = {
                width: this.width + 'px'
            };
            if (!this.hotKeyCtrl.outer) {
                style.wrapperStyle = {
                    width: this.width + 'px'
                };
            }
            style.height = {
                height: this.height + 'px'
            };
            style.iconStyle = {
                height: this.height + 'px',
                lineHeight: this.height + 'px'
            };

            if (['date','datetime'].indexOf(this.type) > -1) {
                if (this.hotKeyCtrl.inner) {
                    style.innerPanelStyle = {
                        width: '330px',
                        paddingLeft: '92px'
                    };
                }
                else if (this.themeStyle === 'console') {
                    style.innerPanelStyle = {
                        width: '260px',
                        padding: '0'
                    };
                }
                else {
                    style.innerPanelStyle = {
                        width: '240px',
                        padding: '0'
                    };
                }
            }
            else if (['daterange','daterangetime'].indexOf(this.type) > -1) {
                if (this.hotKeyCtrl.inner) {
                    style.innerPanelStyle = {
                        width: '550px',
                        paddingLeft: '92px'
                    };
                }
                else if (this.themeStyle === 'console') {
                    style.innerPanelStyle = {
                        width: '490px',
                        padding: '0'
                    };
                }
                else {
                    style.innerPanelStyle = {
                        width: '460px',
                        padding: '0'
                    };
                }
            }
            return style;
        },
        /**
         * 快捷面板的显示控制逻辑
         *
         * @return {Object} 返回快捷面板的显示控制逻辑
         */
        hotKeyCtrl() {
            let control = {
                outer: false,
                inner: false,
                top: false
            };
            if (this.options && this.options.shortcuts) {
                let len = this.options.shortcuts.length;
                if (len > 0 && this.options.position) {
                    switch (this.options.position) {
                        case 'outer':
                            control.outer = true;
                            control.inner = false;
                            control.top = false;
                            break;
                        case 'inner':
                            control.outer = false;
                            control.inner = true;
                            control.top = false;
                            break;
                        case 'top':
                            control.outer = false;
                            control.inner = false;
                            control.top = true;
                            break;
                        default: 
                            control.outer = false;
                            control.inner = false;
                            control.top = false;
                    }
                }
            }
            return control;
        },
        /**
         * 时间面板的显示控制逻辑
         *
         * @return {Object} 返回时间面板的显示控制逻辑
         */
        timePickerCtrl() {
            let control = {
                timePicker: false,
                secondePicker: false,
                endTimePicker: false
            };
            if (['datetime', 'daterangetime'].indexOf(this.type) > -1) {
                control.timePicker = true;
                if (this.dateFormat.toLowerCase().indexOf('ss') > -1) {
                    // 显示秒
                    control.secondePicker = true;
                }
                if (this.type === 'daterangetime') {
                    control.endTimePicker = true;
                }
            }
            return control;
        },
        /**
         * 皮肤风格设置
         *
         * @return {String} 皮肤风格设置
         */
        themeStyle() {
            if (['console', 'common'].indexOf(this.theme) === -1) {
                return 'console';
            }
            else {
                return this.theme;
            }
        }
    },
    watch: {
        value: {
            deep: true,
            immediate: true,
            handler(val) {
                if (this.isDifferent(val)) {
                    this.valueUpdate(val);
                    this.dateChange();
                }
            }
        },
        'dateValue.selectedDate': {
            deep: true,
            immediate: true,
            handler() {
                this.updateShownDateStr();
            }
        },
        'dateValue.startSelectedDate': {
            deep: true,
            handler() {
                this.updateShownDateStr();
            }
        },
        'dateValue.endSelectedDate': {
            deep: true,
            handler() {
                this.updateShownDateStr();
            }
        }
    },
    methods: {
        getCls() {
            return getClassName.getComponentWrapperCls('date-picker-' + this.themeStyle + '-wrapper');
        },
        init() {
            if ((this.hotKeyCtrl.outer || this.hotKeyCtrl.inner || this.hotKeyCtrl.top) && this.options && this.options.shortcuts) {
                let defaultSelect = '';
                let shortCutItems = this.options.shortcuts;
                for (let item of shortCutItems) {
                    if (item.defaultSelected) {
                        defaultSelect = item;
                        break;
                    }
                }
                // call custom value function
                if (defaultSelect.value && typeof defaultSelect.value === 'function') {
                    let value = defaultSelect.value();
                    if (u.isDate(value)) {
                        if (['date', 'datetime'].indexOf(this.type) > -1) {
                            this.setDate(value);
                        }
                    }
                    else if (u.isArray(value) && value.length === 2 && u.isDate(value[0]) && u.isDate(value[1])) {
                        if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                            this.setDate(value[0], value[1]);
                        }
                    }
                    this.dateChange();
                }
                else if (!this.value){
                    this.defaultInition();
                }
            }
            else if (!this.value){
                this.defaultInition();
            };
            this.initOptions();
        },
        initOptions() {
            let minYear, maxYear;
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                let date = this.dateValue.selectedDate || this.dateValue.startDate;
                minYear = date.getFullYear();
                maxYear = date.getFullYear();
            }
            else if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                let startDate = this.dateValue.startSelectedDate || this.dateValue.startDate;
                let endDate = this.dateValue.endSelectedDate || this.dateValue.endDate;
                minYear = u.min([startDate.getFullYear(), endDate.getFullYear()]);
                maxYear = u.max([startDate.getFullYear(), endDate.getFullYear()]);
            }
            else {
                return;
            }
            
            let from = minYear - 3;
            let to = maxYear + 2;
            let leftYears = [];
            let rightYears = [];
            for (let i = from; i <= to; i++) {
                leftYears[i-from] = i;
                rightYears[i-from] = i;
            }
            this.$set(this.dateOptions, 'leftYears', leftYears);
            this.$set(this.dateOptions, 'rightYears', rightYears);
            for (let i = 0; i < 24; i++) {
                this.dateOptions.hours[i] = i;
            }
            for (let i = 0; i < 60; i++) {
                this.dateOptions.minutes[i] = i;
                this.dateOptions.secondes[i] = i;
            }
        },
        defaultInition() {
            let now = new Date();
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                this.dateValue.startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                let updateStartKeys = [
                    'startYear',
                    'startMonth',
                    'startDay',
                    'startHour',
                    'startMinute',
                    'startSecond'
                ];
                this.updateDateValue(this.dateValue, updateStartKeys, this.dateValue.startDate);
            }
            else if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                if (now.getMonth() >= 11) {
                    this.dateValue.endYear = now.getFullYear() + 1;
                    this.dateValue.endMonth = 0;
                }
                else {
                    this.dateValue.endYear = now.getFullYear();
                    this.dateValue.endMonth = now.getMonth() + 1;
                }
                this.dateValue.startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                this.dateValue.endDate = new Date(this.dateValue.endYear, this.dateValue.endMonth, 1);
                let updateStartKeys = [
                    'startYear',
                    'startMonth',
                    'startDay',
                    'startHour',
                    'startMinute',
                    'startSecond'
                ];
                let updateEndKeys = [
                    'endYear',
                    'endMonth',
                    'endDay',
                    'endHour',
                    'endMinute',
                    'endSecond'
                ];
                this.updateDateValue(this.dateValue, updateStartKeys, this.dateValue.startDate);
                this.updateDateValue(this.dateValue, updateEndKeys, this.dateValue.endDate);
            }
        },
        /**
         * 抛出on-change事件
         * 只有是内部发起的改变会触发
         */
        dateChange() {
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                this.$emit('on-change', this.dateValue.selectedDate);
                if (this.$refs['saDatePickerDatePanel' + this.postfix]) {
                    this.$refs['saDatePickerDatePanel' + this.postfix].headerChange('left');
                }
            }
            if (['daterange', 'daterangetime'].indexOf(this.type) > -1){
                if (
                    (this.dateValue.startSelectedDate && this.dateValue.endSelectedDate)
                    || (!this.dateValue.startSelectedDate && !this.dateValue.endSelectedDate)
                ) {
                    this.$emit('on-change', [this.dateValue.startSelectedDate, this.dateValue.endSelectedDate]);
                }
                if (this.$refs['saDatePickerDatePanel' + this.postfix]) {
                    this.$refs['saDatePickerDatePanel' + this.postfix].headerChange('left');
                }
            }
        },
        isDifferent(value) {
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                return !u.isEqual(this.turnToDate(value), this.dateValue.selectedDate);
            }
            else if (['daterange', 'daterangetime'].indexOf(this.type) > -1 && u.isArray(value) && value.length === 2) {
                return !u.isEqual(this.turnToDate(value), [this.dateValue.startSelectedDate, this.dateValue.endSelectedDate]); 
            }
            return false;
        },
        turnToDate(value) {
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                if (u.isDate(value)) {
                    return value;
                }
                else if (this.isDateString(value)) {
                    return new Date(value);
                }
                else {
                    return '';
                }
            }
            else if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                if (u.isDate(value[0]) && u.isDate(value[1])) {
                    return value;
                }
                else if (this.isDateString(value[0]) && this.isDateString(value[1])) {
                    let startDate = new Date(value[0]);
                    let endDate = new Date(value[1]);
                    return [startDate, endDate];
                }
                else {
                    return ['', ''];
                }
            }
        },
        isDateString(dateString) {
            return new Date(dateString).toString() !== 'Invalid Date';
        },
        /**
         * 同步prop的value值到内部时间对象
         *
         * @param {Object} value 最新的value值
         */
        valueUpdate(value) {
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                if (u.isDate(this.turnToDate(value))) {
                    this.setDate(this.turnToDate(value));
                }
            }
            else if (['daterange', 'daterangetime'].indexOf(this.type) > -1 && u.isArray(value) && value.length === 2) {
                let date = this.turnToDate(value) || ['', ''];
                if (u.isDate(date[0]) && u.isDate(date[1])) {
                    this.setDate(date[0], date[1]);
                }
            }
        },
        /**
         * 格式化日期字符串
         *
         * @param {Object} dateSet 需要格式化的日期集合
         * @return {string} 返回格式化后的日期字符串
         */
        getFormatDate(dateSet) {
            let date = '';
            let startDate = dateSet[0] || '';
            let endDate = dateSet[1] || '';
            let fommater = ['date', 'daterange'].indexOf(this.type) > -1 ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
            if (startDate && ['date', 'datetime'].indexOf(this.type) > -1) {
                try {
                    date = moment(startDate).format(this.dateFormat || fommater);
                }
                catch (e) {
                }
                return date;
            }
            else if (startDate && endDate && ['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                try {
                    date = moment(startDate).format(this.dateFormat || fommater)
                        + ' - '
                        + moment(endDate).format(this.dateFormat || fommater);
                }
                catch (e) {
                }
                return date;
            }
            else {
                return date;
            }
        },
        /**
         * 获取显示的日期字符串
         *
         * @return {string} 返回格式化后的时间选项字符串
         */
        getShownDateStr() {
            try {
                if (['date', 'datetime'].indexOf(this.type) > -1) {
                    return this.setShownTxt
                        ? this.setShownTxt(this.getFormatDate([this.dateValue.selectedDate]))
                        : this.getFormatDate([this.dateValue.selectedDate]);
                }
                else {
                    return this.setShownTxt
                        ? this.setShownTxt(this.getFormatDate([this.dateValue.startSelectedDate, this.dateValue.endSelectedDate]))
                        : this.getFormatDate([this.dateValue.startSelectedDate, this.dateValue.endSelectedDate]);
                }
            }
            catch (e) {
                return '';
            }
        },
        /**
         * 设置日期和时间
         *
         * @param {Object} startDate 开始时间
         * @param {Object} endDate 结束时间
         */
        setDate(startDate, endDate) {
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                if (startDate && u.isDate(startDate)) {
                    if (this.isDisabledHandler(startDate)) {
                        //cann't set disabled date
                        return;
                    }
                    else {
                        this.$set(this.dateValue, 'selectedDate', startDate);
                        let updateKeys = [
                            'startYear',
                            'startMonth',
                            'startDay',
                            'startHour',
                            'startMinute',
                            'startSecond'
                        ];
                        this.updateDateValue(this.dateValue, updateKeys, this.dateValue.selectedDate);
                    }
                }
            }
            else if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                if (startDate && endDate && u.isDate(startDate) && u.isDate(endDate)) {
                    if (this.isDisabledHandler(startDate) || this.isDisabledHandler(endDate)) {
                        // cann't set disabled date
                        return;
                    }
                    else {
                        this.$set(this.dateValue, 'startSelectedDate', startDate);
                        this.$set(this.dateValue, 'endSelectedDate', endDate);
                        let updateStartKeys = [
                            'startYear',
                            'startMonth',
                            'startDay',
                            'startHour',
                            'startMinute',
                            'startSecond'
                        ];
                        let updateEndKeys = [
                            'endYear',
                            'endMonth',
                            'endDay',
                            'endHour',
                            'endMinute',
                            'endSecond'
                        ];
                        this.updateDateValue(this.dateValue, updateStartKeys, this.dateValue.startSelectedDate);
                        this.updateDateValue(this.dateValue, updateEndKeys, this.dateValue.endSelectedDate);
                    }
                }
            }
            if (this.showPickerPanel) {
                this.$refs['saDatePickerDatePanel' + this.postfix].headerChange('left');
            }
        },
        /**
         * 获取日期和时间
         *
         * @return {Object} 返回当前选中的日期对象
         */
        getDate() {
            let dateMap = {};
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                dateMap['selectDate'] = this.dateValue.selectedDate;
            }
            else if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                if (this.dateValue.startSelectedDate && this.dateValue.endSelectedDate) {
                    dateMap['selectDate'] = [this.dateValue.startSelectedDate, this.dateValue.endSelectedDate];
                }
                else {
                    dateMap['selectDate'] = [];
                }
            }
            return dateMap;
        },
        /**
         * 处理不可选日期
         *
         * @param {Date} date 当前日期
         * @return {boolean} 返回当前日期是否可选
         */
        isDisabledHandler(date) {
            if (this.options && this.options.disabledHandler && typeof this.options.disabledHandler === 'function') {
                let selectedDate = ['date', 'datetime'].indexOf(this.type) > -1 ? this.dateValue.selectedDate : {
                    "startSelectedDate": this.dateValue.startSelectedDate,
                    "endSelectedDate": this.dateValue.endSelectedDate
                };
                return this.options.disabledHandler(date, selectedDate);
            }
            else {
                return false;
            }
        },
        /**
         * 日期维护逻辑
         *
         * @param {Object} items 被更改的对象
         * @param {Object} keys 被更改的键值
         * @param {Object} date 赋值的对象
         */
        updateDateValue(items, keys, date) {
            keys.forEach(value => {
                let key = value.toLowerCase();
                if (key.indexOf('year') > -1) {
                    items[value] = date.getFullYear();
                }
                else if (key.indexOf('month') > -1) {
                    items[value] = date.getMonth();
                }
                else if (key.indexOf('day') > -1 && key.indexOf('week') === -1) {
                    items[value] = date.getDate();
                }
                else if (key.indexOf('hour') > -1) {
                    items[value] = date.getHours();
                }
                else if (key.indexOf('minute') > -1) {
                    items[value] = date.getMinutes();
                }
                else if (key.indexOf('second') > -1) {
                    items[value] = date.getSeconds();
                }
                else if (key.indexOf('week') > -1) {
                    items[value] = date.getDay();
                }
            });
        },
        /**
         * 更新显示的时间字符串
         */
        updateShownDateStr() {
            this.shownDateStr = this.getShownDateStr();
        },
        /**
         * 点击面板外部的区域
         *
         */
        clickOuterArea(e) {
            // 面板关闭状态下，不执行判断逻辑
            if (!this.showPickerPanel) {
                return;
            }
            let event = e || window.event;
            let target = event.target || event.srcElement;
            let domWrapper = this.$refs['date-picker-wrapper-refs'];
            if (domWrapper && !domWrapper.contains(target)) {
                this.closePicker();
            }
            event.stopPropagation();
        },
        /**
         * 鼠标滑过时的效果控制逻辑
         *
         */
        iconMouseOver() {
            if (this.shownDateStr) {
                this.iconType = 'close-circle';
            }
        },
        /**
         * 鼠标滑出时的效果控制逻辑
         */
        iconMouseOut() {
            this.iconType = this.theme === 'console' ? 'calendar-c' : 'calendar';
        },
        /**
         * 点击清除图标时的处理逻辑
         *
         * @parmas {Object} event 点击事件对象
         */
        iconClickHandler(event) {
            let e = event || window.event;
            if (this.iconType === 'close-circle') {
                this.$set(this.dateValue, 'selectedDate', '');
                this.$set(this.dateValue, 'startSelectedDate', '');
                this.$set(this.dateValue, 'endSelectedDate', '');
                this.resetTimePanel();
                if (this.showPickerPanel) {
                    this.clearClickHandler();
                }
            }
            window.event.cancelBubble ? window.event.cancelBubble = true : e.stopPropagation();
        },
        /**
         * 点击清空按钮时的附带处理逻辑
         *
         */
        clearClickHandler() {
            if (this.showPickerPanel) {
                this.clearDateTable();
            }
            if (this.hotKeyCtrl.inner) {
                this.clearSideBar();
            }
            else if (this.hotKeyCtrl.outer) {
                this.clearHotKeys();
            }
            else if (this.hotKeyCtrl.top) {
                this.clearTopBar();
            }
            this.$emit('on-clear');
        },
        /**
         * 点击清空按钮时，清空日历面板
         *
         */
        clearDateTable() {
            this.$refs['saDatePickerDatePanel' + this.postfix].clearDateTable();
        },
        /**
         * 点击清空按钮时的附带处理逻辑
         *
         */
        clearHotKeys() {
            if (this.hotKeyCtrl.outer) {
                this.$refs['saDatePickerHotKeys' + this.postfix].resetHotKeys();
            }
        },
        /**
         * 点击清空按钮时的附带处理逻辑
         *
         */
        clearSideBar() {
            if (this.hotKeyCtrl.inner) {
                this.$refs['saDatePickerSidebar' + this.postfix].resetSidebar();
            }
        },
        /**
         * 点击清空按钮时的附带处理逻辑
         *
         */
        clearTopBar() {
            if (this.hotKeyCtrl.top) {
                this.$refs['saDatePickerTopBar' + this.postfix].resetTopBar();
            }
        },
        /**
         * 重置时间面板
         *
         */
        resetTimePanel() {
            this.$set(this.dateValue, 'selectedDate', '');
            this.$set(this.dateValue, 'startSelectedDate', '');
            this.$set(this.dateValue, 'endSelectedDate', '');
            this.$set(this.dateValue, 'startHour', 0);
            this.$set(this.dateValue, 'startMinute', 0);
            this.$set(this.dateValue, 'startSecond', 0);
            this.$set(this.dateValue, 'endHour', 0);
            this.$set(this.dateValue, 'endMinute', 0);
            this.$set(this.dateValue, 'endSecond', 0);
            this.dateChange();
        },
        /**
         * 打开面板
         */
        openPicker() {
            this.showPickerPanel = true;
            this.$nextTick(() => {
                if (['date', 'datetime'].indexOf(this.type) > -1 && this.dateValue.selectedDate) {
                    this.setDate(this.dateValue.selectedDate);
                }
                else if (['daterange', 'daterangetime'].indexOf(this.type) > -1 && this.dateValue.startSelectedDate && this.dateValue.endSelectedDate) {
                    this.setDate(this.dateValue.startSelectedDate, this.dateValue.endSelectedDate);
                }
                this.$emit('on-open');
            });
        },
        /**
         * 根据不同的风格选择不同的icon
         */
        getIconType() {
            this.iconType = this.theme === 'console' ? 'calendar-c' : 'calendar';
        },
        /**
         * 暴露快捷面板高亮事件
         *
         * @param {String} id 快捷选择项
         */
        highLightShortCut(id) {
            let shortcuts = this.options.shortcuts;
            if (shortcuts && shortcuts.length) {
                this.$nextTick(() => {
                    for (let i in shortcuts) {
                        if (shortcuts.hasOwnProperty(i) && shortcuts[i].hasOwnProperty('id')) {
                            if (shortcuts[i]['id'] === id) {
                                this.$set(shortcuts[i], 'selected', true);
                            }
                            else {
                                this.$set(shortcuts[i], 'selected', false);
                            }
                        }
                    }
                });
            }
        },
        /**
         * 暴露快捷面板点击事件
         *
         * @param {Object} item 快捷选择项
         */
        shortCutClickHandler(item) {
            if (['date', 'datetime'].indexOf(this.type) > -1) {
                this.$emit('on-shortcut-click', item, this.dateValue.selectedDate);
            }
            else if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                this.$emit(
                    'on-shortcut-click',
                    item, [this.dateValue.startSelectedDate, this.dateValue.endSelectedDate]
                );
            }
        },
        /**
         * 暴露确定按钮点击事件
         */
        confirmHandler() {
            this.$emit('on-confirm');
        },
        /**
         * 关闭面板
         */
        closePicker() {
            this.showPickerPanel = false;
            this.$emit('on-ok');
        }
    }
};
</script>

