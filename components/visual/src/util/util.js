/**
 * @file Tool class method
 * @author wangjing68(wang_jing13@163.com)
 */
/* eslint-disable */
import moment from 'moment';
import $ from 'jquery';

const timeFormatter = 'YYYY-MM-DD HH:mm:00';
const template = {
    evaluate: /<\?([\s\S]+?)\?>/g,
    interpolate: /#\{([\s\S]+?)\}/g
};

let viewRoot = document.compatMode === 'BackCompat'
    ? body
    : document.documentElement;

function isArray(data) {
    return Object.prototype.toString.call(data) === '[object Array]';
}

export default {
    timetransfer(time, formatter, currentTime) {
        const self = this;
        formatter = formatter || timeFormatter;
        time = time.constructor === Array ? time.join('|') : time;
        let mt = time.match(/(\w+)\((\w*)\)/);
        if (mt) {
            let func = mt[1];
            let arg = mt[2];
            let ret;
            let m = moment(currentTime);
            let endTime = m.format(formatter);
            let startTime;
            switch (func) {
                case 'before':
                    ret = self.timeparse(arg, currentTime);
                    break;
                case 'today':
                    startTime = m.startOf('day').format(formatter);
                    ret = [startTime, endTime];
                    break;
                case 'week':
                case 'month':
                case 'quarter':
                case 'year':
                    startTime = m.startOf(func).format(formatter);
                    // 将配置的结束事件打开为区间结束时间
                    endTime = m.endOf(func).format(formatter);
                    ret = [startTime, endTime];
                    break;
                case 'yestoday':
                    m.subtract(1, 'd');
                    startTime = m.startOf('day').format(formatter);
                    endTime = m.endOf('day').format(formatter);
                    ret = [startTime, endTime];
                    break;
            }
            if (ret) {
                return ret;
            }
        }
        return time.split('|');
    },
    timeparse(time, currentTime) {
        let mt = time.match(/(\d+)(\w+)/);
        let value = mt[1];
        let unit = mt[2];
        let m = moment(currentTime);
        let endTime = m.format(timeFormatter);
        let startTime = m.subtract(value, unit).format(timeFormatter);
        return [startTime, endTime];
    },
    parsePeriod(period) {
        if (!/^[\-]?\d+$/.test(period)) {
            let mt = period.match(/([\-\+])?(\d+)(\w+)/);
            let value = mt[2];
            let unit = mt[3];
            let m = moment();
            let endTime = m.unix();
            let startTime = m.clone().subtract(value, unit).unix();
            if (mt[1] === '-') {
                return startTime - endTime;
            }
            return endTime - startTime;
        }
        return period;
    },
    template(str) {
        let tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};'
            + 'with(obj||{}){__p.push(\''
            + str.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')
            .replace(template.interpolate, function (match, code) {
                let modifier = '';
                let args = [];
                let arr = code.split(/[|:]/);
                code = arr[0];
                if (typeof arr[1] !== 'undefined') {
                    if (/^@.+?/.test(arr[1])) {
                        modifier = arr[1].substr(1);
                    }
                    else {
                        modifier = 'require(\'mons/modifier\').' + arr[1];
                    }
                    for (let i = 2; i < arr.length; i++) {
                        args.push(',"' + arr[i].replace(/"/g, '\\"') + '"');
                    }
                }
                if (modifier) {
                    return '\',' + modifier + '.call(this,' + code.replace(/\\'/g, '\'') + args.join('') + '),\'';
                }
                return '\',(' + code.replace(/\\'/g, '\'') + args.join('') + '),\'';
            }).replace(template.evaluate || null, function (match, code) {
                return '\');' + code.replace(/\\'/g, '\'').replace(/[\r\n\t]/g, ' ') + '__p.push(\'';
            }).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + '\');}return __p.join(\'\');';
        return new Function('obj', tmpl);
    },
    numberFormat(number, cent) {
        if (number === null) {
            return '--';
        }
        cent = cent !== null ? +cent : 4;
        number = number.toString();
        let arr = number.split('.');
        let intNum = arr[0];
        let decimal = arr[1];
        let t = intNum.split('').reverse();
        let r = [];
        $.each(t, function (i, v) {
            if (i !== 0 && i % 3 === 0 && v !== '-') {
                r.unshift(',');
            }
            r.unshift(v);
        });
        if (decimal) {
            let end = Math.min(cent, decimal.length);
            decimal = decimal.substring(0, end).replace(/0*$/, '');
            if (decimal.length > 0) {
                return r.join('') + '.<small>' + decimal + '</small>';
            }
        }
        return r.join('');
    },
    getScrollTop () {
        return window.pageYOffset
            || document.documentElement.scrollTop
            || document.body.scrollTop
            || 0;
    },
    getViewHeight () {
        return viewRoot ? viewRoot.clientHeight : 0;
    },
    getViewWidth () {
        return viewRoot ? viewRoot.clientWidth : 0;
    },
    getOffset (element) {
        if (!element) {
            return;
        }
        let rect = element.getBoundingClientRect();
        let offset = {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        };
        let clientTop = document.documentElement.clientTop
            || document.body.clientTop
            || 0;
        let clientLeft = document.documentElement.clientLeft
            || document.body.clientLeft
            || 0;
        let scrollTop = window.pageYOffset
            || document.documentElement.scrollTop;
        let scrollLeft = window.pageXOffset
            || document.documentElement.scrollLeft;
        offset.top = offset.top + scrollTop - clientTop;
        offset.bottom = offset.bottom + scrollTop - clientTop;
        offset.left = offset.left + scrollLeft - clientLeft;
        offset.right = offset.right + scrollLeft - clientLeft;

        return offset;
    },
    guid() {
        let guid = 1;
        return (function () {
            return 'omon_widgets_' + (guid++).toString(36);
        })();
    },
    setTime(type, paramTime, confTime) {
        let time = '';

        // base on dashboard time
        if (type === 'relative') {
            if (paramTime && paramTime.start) {
                time = paramTime.start + '|' + paramTime.end;
            }
            else {
                time = this.timetransfer(confTime).join('|');
            }
        }

        // absolute time
        else if (confTime && type === 'absolute') {
            time = this.timetransfer(confTime, timeFormatter).join('|');
        }

        // relative time
        else if (confTime && type === 'fixed') {
            time = this.timetransfer(confTime, timeFormatter, paramTime.end).join('|');
        }
        return time;
    },
    setDecimal(data, decimals) {
        decimals = (typeof decimals === 'number') ? decimals : 2;
        data = data.toString();
        if (data.indexOf('.') > -1) {
            // manage the number of decimal.
            data = data.substring(0, data.indexOf('.') + parseInt(decimals, 10) + 1);
        }
        return Number(data).toFixed(decimals);
    },
    deepClone(data) {
        return JSON.parse(JSON.stringify(data));
    },
    isEmpty(data) {
        if (isArray(data)) {
            return data.length < 1;
        }
        return Object.keys(data).length < 1;
    },
    isArray,
    upFirstWord(words) {
        return words.slice(0, 1).toUpperCase() + words.slice(1);
    }
};
