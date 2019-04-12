/**
 * @file Constant storage
 * @author tanrich@foxmail.com
 */

let today = new Date();
today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
// today = new Date(2019, 2, 24);
const yearArr = new Array(6).fill(0).map((year, index) => today.getFullYear() - 3 + index);
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();
const currentDay = today.getDay();
const maxDate = new Date(currentYear + 50, 11, 31);
const minDate = new Date(currentYear - 5, 0, 1);
const colors = ['#108CEE', '#8A58BC', '#545FC8', '#F38800', '#EA2E2E', '#5FB333', '#FBBE04', '#04C1BA'];
const emptyText = '待添加';
const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const handOverTime = '00:00';
const colorBlockMinWidth = 0;
const cycle = 1;

/* eslint-disable */
export default {
    today,
    yearArr,
    currentYear,
    currentMonth,
    currentDate,
    currentDay,
    maxDate,
    minDate,
    colors,
    emptyText,
    weekArr,
    handOverTime,
    colorBlockMinWidth,
    cycle
};
