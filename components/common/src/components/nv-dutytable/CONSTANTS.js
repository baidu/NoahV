/**
 * @file Constant storage
 * @author tanrich@foxmail.com
 */

let today = getDateByTimezone(new Date());
today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
// const yearArr = new Array(6).fill(0).map((year, index) => today.getFullYear() - 3 + index);
// const currentYear = today.getFullYear();
// const currentMonth = today.getMonth();
// const currentDate = today.getDate();
// const currentDay = today.getDay();
// const maxDate = new Date(currentYear + 50, 11, 31);
// const minDate = new Date(currentYear - 5, 0, 1);

const colors = ['#108CEE', '#8A58BC', '#545FC8', '#F38800', '#EA2E2E', '#5FB333', '#FBBE04', '#04C1BA'];
const emptyText = 'dutytable.emptyText';
const restDayText = 'dutytable.restDay';
const weekArr = 'dutytable.weekArr';
const handOverTime = '00:00';
const colorBlockMinWidth = 0;
const cycle = 1;
const defaultWorkingDay = [0, 1, 2, 3, 4, 5, 6];

function getDateByTimezone(date = new Date()) {
    date = date instanceof Date ? date : new Date(date);
    if (window.i18nTool) {
        let timezone = (this.$noahvI18n && this.$noahvI18n.getTimezone())
            || (() => {
                const arr = window.localStorage.timezone.match(/UTC\+\d+:\d+/);
                if (arr && arr instanceof Array && arr.length) return arr[0];
                return false;
            })()
            || 'UTC+08:00';
        return window.i18nTool.getDateByTimezone(date, timezone);
    }
    return date;
}

/* eslint-disable */
export default {
    today,
    // yearArr,
    // currentYear,
    // currentMonth,
    // currentDate,
    // currentDay,
    // maxDate,
    // minDate,
    colors,
    emptyText,
    restDayText,
    weekArr,
    handOverTime,
    colorBlockMinWidth,
    cycle,
    defaultWorkingDay,
    getDateByTimezone
};
