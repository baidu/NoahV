/**
 * @file javascript datePicker
 * @author nimingdexiaohai(nimingdexiaohai@163.com)
 */

let datePickerUtils = {};

/**
 * get offset with utc
 *
 * @param {string} timezone the timezone like UTC+8:45
 * @return the offset with utc
 */
function getOffset(timezone) {
    // timezone: UTC+8:00
    let offset = 0;
    let flag = timezone.slice(4, timezone.length);
    let tags = flag.split(':');
    for (let i = 0; i < tags.length; i++) {
        if (i === 0) {
            offset += Number.parseInt(tags[i], 10) * 60;
        }
        else if (i === 1) {
            offset += Number.parseInt(tags[i], 10);
        }
    }
    // return ms
    return timezone.slice(3, 4) === '+' ? offset * 60000 : -(offset * 60000);
};

/**
 * get time at special timezone
 *
 * @param {string} timezone the timezone like UTC+8:45
 * @return the time at special timezone
 */
function getDateByTimezone(date, timezone) {
    if (!date || !timezone) {
        return;
    }
    let utc = date.getTime() + date.getTimezoneOffset() * 60000;
    let timeAtZone = getOffset(timezone) + utc;
    return new Date(timeAtZone);
};

/**
 * 获取某个月份的所有日期
 *
 * @param {Object} vue vue实例
 * @param {number} year 年份
 * @param {number} month 月份
 * @param {Function} disabledHandler 不可选日期处理器
 * @return {Object} 所有的日期集合
 */
datePickerUtils.getMonthData = (vue, year, month, disabledHandler) => {
    let ret = [];
    let today = datePickerUtils.getCurrent(vue);
    if (!year || !month) {
        if (month !== 0) {
            year = today.getFullYear();
            month = today.getMonth();
        }
    }
    // get the first day of this month
    let firstDay = new Date(year, month, 1);
    let firstDayWeekDay = firstDay.getDay();
    if (firstDayWeekDay === 0) {
        firstDayWeekDay = 7;
    }
    // get the last day of last month
    let lastDateOfLastMonth = new Date(year, month, 0);
    let lastDayOfLastMonth = lastDateOfLastMonth.getDate();
    let preMonthDayCount = firstDayWeekDay;
    // get the last day of this month
    let lastDateOfCurrentMonth = '';
    if (month >= 11) {
        lastDateOfCurrentMonth = new Date(year + 1, 0, 0);
    }
    else {
        lastDateOfCurrentMonth = new Date(year, month + 1, 0);
    }
    let lastDayOfCurrentMonth = lastDateOfCurrentMonth.getDate();
    for (let i = 0; i < 7 * 6; i++) {
        let date = i + 1 - preMonthDayCount;
        let showDate = date;
        let thisMonth = month;
        let thisYear = year;
        let type = '';
        let isToday = false;
        let isDisabled = false;
        if (date <= 0) {
            // last month
            thisMonth = month - 1;
            showDate = lastDayOfLastMonth + date;
            type = 'prev-month';
        }
        else if (date > lastDayOfCurrentMonth) {
            // next month
            thisMonth = month + 1;
            showDate = showDate - lastDayOfCurrentMonth;
            type = 'next-month';
        }
        else {
            type = 'current-month';
            if (thisYear === today.getFullYear()
                && thisMonth === today.getMonth()
                && showDate === today.getDate()
            ) {
                isToday = true;
            }
        }
        if (thisMonth < 0) {
            thisMonth = 11;
            thisYear -= 1;
        }
        if (thisMonth > 11) {
            thisMonth = 0;
            thisYear += 1;
        }
        if (disabledHandler && disabledHandler(new Date(thisYear, thisMonth, showDate))) {
            isDisabled = true;
        }
        ret.push({
            year: thisYear,
            month: thisMonth,
            date: date,
            showDate: showDate,
            type: type,
            isToday: isToday,
            isDisabled: isDisabled,
            isSelected: false,
            inSelectedSection: false
        });
    }
    return {
        days: ret
    };
};

/**
 * 设置时分秒为0
 *
 * @param {Date} date 传入的时间对象
 * @return {Date} 时分秒置零后的时间对象
 */
datePickerUtils.clearHours = date => {
    const cloneDate = new Date(date);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate.getTime();
};

/**
 * 获取特定时区的当前时间
 *
 * @param {Object} vue vue实例 
 * @return {Date} 特定时区的时间
 */
datePickerUtils.getCurrent = vue => {
    const timezone = vue && vue.$noahvI18n ? vue.$noahvI18n.getTimezone() : undefined;
    return timezone ? getDateByTimezone(new Date(), timezone) : new Date();
};

/**
 * 切换时间点选中效果逻辑
 *
 * @param {Array} items 待修改的对象集合
 * @param {boolean} isSelected 是否呈现选中效果
 * @param {boolean} inSelectedSection 是否呈现区间选中效果
 * @param {Function} selectedCondition 是否选中逻辑回调函数
 * @param {Function} selectedRangeCondition 是否区间选中逻辑回调函数
 *
 */
datePickerUtils.toggleSelectedHandler = (
    items, isSelected, inSelectedSection,
    selectedCondition, selectedRangeCondition
) => {
    for (let i = 0, len = items.length; i < len; i++) {
        if (items[i].type === 'current-month') {
            if (selectedCondition(items[i])) {
                items[i].isSelected = isSelected;
            }
            else {
                items[i].isSelected = !isSelected;
            }
            if (selectedRangeCondition(items[i])) {
                items[i].inSelectedSection = inSelectedSection;
            }
            else {
                items[i].inSelectedSection = !inSelectedSection;
            }
        }
    }
};

export default datePickerUtils;
