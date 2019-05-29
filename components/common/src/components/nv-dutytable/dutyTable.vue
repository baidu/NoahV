<template>
    <div :class="prefix" :style="styleConfig">
        <!--date-picker 逻辑在 data-picker.js 中-->
        <div class="date-picker">
            <span :class="['pre-month', 'change-btn', {'change-btn-disabled': preBtnDisabled}]"
                  @click.stop="preBtnDisabled || changeTime(null, 'pre')">
                <Icon type="ios-arrow-back" />
            </span>
            <Select class="select-year" v-model="selectedYear" @on-change="changeTime($event, 'year')">
                <Option v-for="year in yearArr" :value="year" :key="`${year}-year`">{{year}}</Option>
            </Select>
            <Select class="select-month" v-model="selectedMonth" @on-change="changeTime($event, 'month')">
                <Option v-for="month in monthArr" :value="month" :key="`${month}-month`"
                        :disabled="monthDisabled(month)">{{month}}</Option>
            </Select>
            <span :class="['next-month', 'change-btn', {'change-btn-disabled': nextBtnDisabled}]"
                  @click.stop="nextBtnDisabled || changeTime(null, 'next')">
                <Icon type="ios-arrow-forward" />
            </span>
        </div>
        <div class="date-container">
            <ul class="week-header">
                <li class="week-date"
                    v-for="date in weekArr"
                    :title="date"
                    :key="`data-${date}`">{{date}}</li>
            </ul>
            <div class="date-body">
                <div class="data-row"
                     v-for="(row, rowIndex) in tableArr"
                     :key="`row-${rowIndex}-${Math.random()}`">
                    <ul class="date-col">
                        <li v-for="(col, colIndex) in row.time"
                            class="col-item"
                            :title="col.date"
                            :key="`col-${colIndex}-${Math.random()}`"
                        >{{col.date}}</li>
                    </ul>
                    <ul class="name-col">
                        <li class="time-line" :style="calculateTimeLineStyle(row)">
                            <span>{{getTimeFormatHourMinute()}}</span>
                        </li>
                        <li v-for="col in row.duty"
                            v-if="col.nameArr"
                            :class="['col-item', {'col-item-no-data': !col.nameArr.length}]"
                            :title="dutyShowText(col)"
                            :style="calculateDutyItemStyle(col)"
                        >{{dutyShowText(col)}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import datePicker from './date-picker';
import CONSTANTS from './CONSTANTS';

const prefix = 'noahv-duty-table';

export default {
    name: 'dutyTable',
    mixins: [datePicker],
    props: {
        styleConfig: {
            type: Object,
            required: false,
            default: () => ({})
        },
        // 值班名单
        nameList: {
            type: Array,
            required: false,
            default: () => ([])
        },
        currentDutyGroup: {
            type: Array,
            required: false,
            default: () => ([])
        },
        // 值班周期
        cycle: {
            type: Number,
            required: false,
            default: CONSTANTS.cycle
        },
        // 交接时间
        handOverTime: {
            type: String,
            required: false,
            default: CONSTANTS.handOverTime
        },
        // 值班组颜色
        colors: {
            type: Array,
            required: false,
            default: () => (CONSTANTS.colors)
        },
        // 值班组空的代替文案
        emptyText: {
            type: String,
            required: false,
            default: CONSTANTS.emptyText
        },
        // 色块最小宽度
        colorBlockMinWidth: {
            type: [String, Number],
            required: false,
            default: CONSTANTS.colorBlockMinWidth
        },
        // 色块是否需要分割展示
        splitShow: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            prefix,
            tableArr: []
        };
    },
    mounted() {
        this.calculateTableData();
    },
    computed: {
        // 值班轮询组
        loop: {
            get() {
                // 如果设置了当前值班组，遍历查找，将 nameList 重新排序
                if (this.currentDutyGroup.length) {
                    let firstIndex = 0;
                    this.nameList.forEach((list, index) => {
                        const isOnDuty = list.length
                            ? list.every(item => this.currentDutyGroup.some(curItem => item.id === curItem.id
                                && item.name === curItem.name
                            )) : false;
                        firstIndex = isOnDuty ? index : firstIndex;
                    });
                    return this.nameList.slice(firstIndex).concat(this.nameList.slice(0, firstIndex));
                }
                else {
                    return this.nameList.slice();
                }
            }
        },
        // 值班颜色轮询组
        loopColor: {
            get() {
                const max = Math.max(this.loop.length, this.colors.length);
                let loopColor = this.colors.slice();
                while (loopColor.length < max) {
                    loopColor = loopColor.concat(loopColor).slice(0, max);
                }
                loopColor = loopColor.slice(0, this.loop.length);
                return loopColor;
            }
        },
        // 监听所有 props 对象
        watchProps() {
            const {styleConfig, cycle, handOverTime, loop, loopColor, emptyText, colorBlockMinWidth, splitShow} = this;
            return {styleConfig, cycle, handOverTime, loop, loopColor, emptyText, colorBlockMinWidth, splitShow};
        }
    },
    watch: {
        'watchProps': {
            handler() {
                this.calculateTableData();
            },
            deep: true
        }
    },
    methods: {
        /**
         * 获取一个月的日期数组（默认获取选中月）
         *
         * @param {number} monthDiff 月份差
         */
        getDateInfo(monthDiff = 0) {
            const date = new Date(+this.selectedYear, +this.selectedMonth + monthDiff, 0);
            return {
                dateArr: new Array(date.getDate())
                    .fill(0)
                    .map((date, index) => index + 1),
                date
            };
        },

        /**
         * 渲染日历组件的核心函数
         */
        calculateTableData() {
            // time 存储日历时间 duty 存储值班组信息
            let tableArr = [{time: [], duty: []}];

            // dateArr 选中当月天数 date 选中当月最后一天
            const {dateArr, date} = this.getDateInfo();
            // preDateArr 选中前一个月天数 preDate 选中前一个月最后一天
            const {dateArr: preDateArr, date: preDate} = this.getDateInfo(-1);
            // nextDateArr 选中后一个月天数 nextDate 选中后一个月最后一天
            const {dateArr: nextDateArr, date: nextDate} = this.getDateInfo(1);

            // 获取选中年月当月1号星期几
            const startDay = new Date(this.selectedYear, this.selectedMonth - 1, 1).getDay();

            // 以当月1号为分界线，1号之前的是上个月，之后的是本月
            for (let i = startDay - 1; i >= 0; i--) {
                tableArr[0].time[i] = {
                    date: preDateArr.pop(),
                    year: preDate.getFullYear(),
                    month: preDate.getMonth()
                };
            }
            for (let i = startDay; i < 7; i++) {
                tableArr[0].time[i] = {
                    date: dateArr.shift(),
                    year: date.getFullYear(),
                    month: date.getMonth()
                };
            }
            while (dateArr.length) {
                const rowArr = [];
                while (rowArr.length < 7) {
                    const curInfo = dateArr.length
                        ? {
                            date: dateArr.shift(),
                            year: date.getFullYear(),
                            month: date.getMonth()
                        }
                        : {
                            date: nextDateArr.shift(),
                            year: nextDate.getFullYear(),
                            month: nextDate.getMonth()
                        };
                    rowArr.push(curInfo);
                }
                tableArr.push({time: rowArr, duty: []});
            }

            tableArr = this.calculateOnDutyGroup(tableArr);
            this.tableArr = tableArr;
        },

        /**
         * 根据日历计算当天值班人
         *
         * @param {Array} tableArr 日历数组
         * @return {Array} 处理之后的日历数组
         */
        calculateOnDutyGroup(tableArr) {
            const loopLength = this.loop.length;
            if (loopLength) {
                tableArr.forEach(row => {
                    row.duty = [];
                    row.time.forEach(col => {
                        // 遍历日期，获取每个日期下的值班组的商数，默认 flex 为 1，均分
                        const diffDay = this.calculateDiffDay(col);
                        const quotient = Math.floor(diffDay / this.cycle);
                        row.duty.push({quotient, flex: 1, diffDay});
                    });
                    if (this.handOverTime !== '00:00') {
                        // 如果交接时间不为 0 点，必然出现上一行末尾，便宜到这一行的组，unshift 推入
                        const firstWeekDay = row.time[0];
                        const diffDay = this.calculateDiffDay({
                            ...firstWeekDay,
                            date: firstWeekDay.date - 1
                        });
                        const quotient = Math.floor(diffDay / this.cycle);
                        row.duty.unshift({quotient, flex: this.calculateRatio(), diffDay});

                        // 修改本行最后一组的 flex 占比。
                        row.duty.push({
                            ...row.duty.pop(),
                            flex: 1 - this.calculateRatio()
                        });
                    }

                    const formatDuty = [];
                    row.duty.forEach((item, index) => {
                        if (index === 0) {
                            formatDuty.push(row.duty[0]);
                        }
                        // 如果相邻的商数 quotient 相同，且 splitShow 为 false，则进行合并相同组的操作
                        else if (!this.splitShow
                            && item.quotient === formatDuty.slice(-1)[0].quotient) {
                            const pre = formatDuty.pop();
                            formatDuty.push({
                                ...pre,
                                flex: pre.flex + item.flex
                            });
                        }
                        else {
                            formatDuty.push(item);
                        }
                    });
                    row.duty = formatDuty.map(item => ({
                        ...item,
                        nameArr: this.loop.slice(item.quotient % this.loop.length).shift(),
                        color: this.loopColor.slice(item.quotient % this.loopColor.length).shift()
                    }));
                });
            }
            return tableArr;
        },

        /**
         * 计算某天与今天的时间差
         *
         * @param {number} year 年
         * @param {number} month 月
         * @param {number} date 日
         * @return {number} 时间差
         */
        calculateDiffDay({year, month, date}) {
            const someDay = new Date(year, month, date);
            return (someDay - this.startTime) / 1000 / 60 / 60 / 24;
        },

        /**
         * 计算交接时间在 24 小时占比
         *
         * @return {number} 占比值
         */
        calculateRatio() {
            const time = this.handOverTime.split(':');
            const wholeDay = 24 * 60 * 60;
            const handOverTime = +time[0] * 60 * 60 + +time[1] * 60;
            return handOverTime / wholeDay;
        },

        /**
         * 计算时间线状态、位置
         * display 判断方式是当前时间是否在该行区间内。（大于起始时间，小于结尾时间）
         * left 则是当前时间相对于整个 7 天的一个占比
         *
         * @param {Object} row 当前横排信息
         * @return {Object} 处理之后的横排信息
         */
        calculateTimeLineStyle(row) {
            if (!row.time) {
                return false;
            }
            let timeConfig = row.time[0].isHidden ? row.time[1] : row.time[0];
            const {year, month, date} = timeConfig;
            const currentTime = new Date();
            const firstWeekDay = new Date(year, month, date);
            const lastWeekDay = new Date(year, month, date + 6, 23, 59, 59);
            return {
                display: currentTime - firstWeekDay > 0 && currentTime - lastWeekDay < 0
                    ? 'block'
                    : 'none',
                left: (currentTime - firstWeekDay) / (lastWeekDay - firstWeekDay) * 100 + '%'
            };
        },

        /**
         * 获取当前时间，时间格式为 HH:mm
         *
         * @return {string} 当前时间
         */
        getTimeFormatHourMinute() {
            let hours = ('00' + new Date().getHours()).slice(-2);
            let minutes = ('00' + new Date().getMinutes()).slice(-2);
            return hours + ':' + minutes;
        },

        /**
         * 值班组显示文本
         *
         * @param {Object} col 当前纵列
         * @return {string} 显示文本
         */
        dutyShowText(col) {
            return col.nameArr.length ? col.nameArr.map(item => item.name).join('、') : this.emptyText;
        },

        /**
         * 计算当前值班模块状态
         * visibility 用于处理小于 minDate 不展示的情况。一般预览用。
         * background 返回相应的背景色
         * flex 返回相应占比
         *
         * @param {Object} col 当前纵列
         * @return {{backgroundColor: *, visibility: string, flex: string}} style 对象
         */
        calculateDutyItemStyle(col) {
            const diffSeconds = col.diffDay * 24 * 3600 * 1000;
            return {
                visibility: +this.startTime + diffSeconds >= +this.minDate
                && +this.startTime + diffSeconds <= +this.maxDate
                    ? 'visible'
                    : 'hidden',
                backgroundColor: col.nameArr.length && col.color,
                flex: col.flex
            };
        },

        /**
         * 获取当前值班组
         *
         * @return {Array} 当前值班组
         */
        getCurrentDutyGroup() {
            if (this.currentDutyGroup.length) {
                return this.currentDutyGroup;
            }
            try {
                const diffDay = (CONSTANTS.today - this.startTime) / 1000 / 3600 / 24;
                for (let row = 0; row < this.tableArr.length; row++) {
                    for (let col = 0; this.tableArr[row].duty; col++) {
                        if (this.tableArr[row].duty[col].diffDay === diffDay) {
                            return this.tableArr[row].duty[col].nameArr;
                        }
                    }
                }
            }
            catch (e) {
                return [];
            }
            return [];
        }
    }
};
</script>
