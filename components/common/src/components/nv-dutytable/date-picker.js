/**
 * @file 值班表 date-picker 组件
 * @author tanrich@foxmail.com
 */

import CONSTANTS from './CONSTANTS';

function isDate(date) {
    return Object.prototype.toString.call(date) === '[object Date]';
}

export default {
    props: {
        defaultSelectedYear: {
            type: [Number, String],
            required: false,
            default: CONSTANTS.currentYear
        },
        defaultSelectedMonth: {
            type: [Number, String],
            required: false,
            default: CONSTANTS.currentMonth + 1
        },
        defaultMaxDate: {
            type: [Date, String, Object],
            required: false,
            default: () => CONSTANTS.maxDate
        },
        defaultMinDate: {
            type: [Date, String, Object],
            required: false,
            default: () => CONSTANTS.minDate
        },
        defaultStartTime: {
            type: [Date, String, Object],
            required: false,
            default: () => CONSTANTS.today
        }
    },
    data() {
        return {
            selectedYear: +this.defaultSelectedYear,
            selectedMonth: +this.defaultSelectedMonth
        };
    },
    computed: {
        preBtnDisabled: {
            get() {
                return this.selectedYear === this.minYear && this.selectedMonth === this.minMonth;
            }
        },
        nextBtnDisabled: {
            get() {
                return this.selectedYear === this.maxYear && this.selectedMonth === this.maxMonth;
            }
        },
        monthArr: {
            get() {
                return new Array(12).fill(0).map((month, index) => index + 1);
            }
        },
        weekArr: {
            get() {
                return CONSTANTS.weekArr;
            }
        },
        yearArr: {
            get() {
                const yearArr = [];
                for (let i = this.minYear; i <= this.maxYear; i++) {
                    yearArr.push(i);
                }
                return yearArr.length ? yearArr : CONSTANTS.yearArr;
            }
        },
        maxDate: {
            get() {
                return isDate(this.defaultMaxDate)
                    ? this.defaultMaxDate
                    : new Date(new Date(this.defaultMaxDate).getFullYear(),
                        new Date(this.defaultMaxDate).getMonth(),
                        new Date(this.defaultMaxDate).getDate());
            }
        },
        minDate: {
            get() {
                return isDate(this.defaultMinDate)
                    ? this.defaultMinDate
                    : new Date(new Date(this.defaultMinDate).getFullYear(),
                        new Date(this.defaultMinDate).getMonth(),
                        new Date(this.defaultMinDate).getDate());
            }
        },
        maxYear: {
            get() {
                return isDate(this.defaultMaxDate)
                    ? this.defaultMaxDate.getFullYear()
                    : new Date(this.defaultMaxDate).getFullYear();
            }
        },
        minYear: {
            get() {
                return isDate(this.defaultMinDate)
                    ? this.defaultMinDate.getFullYear()
                    : new Date(this.defaultMinDate).getFullYear();
            }
        },
        maxMonth: {
            get() {
                return isDate(this.defaultMaxDate)
                    ? this.defaultMaxDate.getMonth() + 1
                    : new Date(this.defaultMaxDate).getMonth() + 1;
            }
        },
        minMonth: {
            get() {
                return isDate(this.defaultMinDate)
                    ? this.defaultMinDate.getMonth() + 1
                    : new Date(this.defaultMinDate).getMonth() + 1;
            }
        },
        startTime: {
            get() {
                return isDate(this.defaultStartTime)
                    ? this.defaultStartTime
                    : new Date(new Date(this.defaultStartTime).getFullYear(),
                        new Date(this.defaultStartTime).getMonth(),
                        new Date(this.defaultStartTime).getDate());
            }
        },
        // 监听所有 props 对象
        watchTime() {
            const {defaultSelectedYear, defaultSelectedMonth, defaultMaxDate, defaultMinDate, startTime} = this;
            return {defaultSelectedYear, defaultSelectedMonth, defaultMaxDate, defaultMinDate, startTime};
        }
    },
    watch: {
        watchTime: {
            handler() {
                this.calculateTableData();
            },
            deep: true
        },
        defaultSelectedYear(defaultSelectedYear) {
            this.selectedYear = +defaultSelectedYear;
        },
        defaultSelectedMonth(defaultSelectedMonth) {
            this.selectedMonth = +defaultSelectedMonth;
        }
    },
    methods: {

        /**
         * 时间改变函数
         *
         * @param {number} value 改变后的年/月
         * @param {string} symbol 标识
         */
        changeTime(value, symbol) {
            switch (symbol) {
                case 'pre': {
                    if (this.selectedMonth === 1) {
                        this.selectedYear--;
                        this.selectedMonth = 12;
                    }
                    else {
                        this.selectedMonth--;
                    }
                    break;
                }
                case 'next': {
                    if (this.selectedMonth === 12) {
                        this.selectedYear++;
                        this.selectedMonth = 1;
                    }
                    else {
                        this.selectedMonth++;
                    }
                    break;
                }
                case 'year': {
                    this.selectedYear = value || CONSTANTS.currentYear;

                    // 防止例如 2019 3 不可选 选择2020 3 切回 2019 选中的情况
                    if (this.monthDisabled(this.selectedMonth)) {
                        this.selectedMonth = CONSTANTS.currentMonth + 1;
                    }
                    break;
                }
                case 'month': {
                    this.selectedMonth = value || CONSTANTS.currentMonth + 1;
                }
            }
            this.$emit('on-change', {year: this.selectedYear, month: this.selectedMonth});
            this.calculateTableData();
        },

        /**
         * 判断哪些月份不可点击
         *
         * @param {number} month 月份
         * @return {boolean} 月份下拉框是否可点击状态
         */
        monthDisabled(month) {
            return this.selectedYear === this.minYear && month < this.minMonth
                || this.selectedYear === this.maxYear && month > this.maxMonth;
        }
    }
};
