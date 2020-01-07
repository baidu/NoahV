/**
 * NoahV
 * Copyright (c) 2016 Baidu, Inc. All Rights Reserved.
 *
 * @file options.js
 * @author darren(darrenywyu@gmail.com)
 */

import _ from 'lodash';
import util from './chartUtil';


const commonOption = {
    color: [
        '#3A62CA', '#3AC7CA', '#73CA3A', '#F4971E', '#F62727',
        '#E93CB8', '#892DE5', '#2E8EC7', '#2C6B51', '#304068'
    ],
    grid: {
        top: 30,
        left: 50,
        right: 30,
        bottom: 60
    },
    legend: {
        show: true,
        bottom: 5,
        icon: 'line'
    },
    xAxis: {
        type: 'category',
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        },
        axisLabel: {
            color: '#333'
        },
        axisTick: {
            show: false
        }
    },
    yAxis: {
        splitLine: {
            color: '#eee'
        },
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        },
        axisLabel: {
            color: '#333',
            formatter(value) {
                return util.numberFormat(value);
            }
        },
        axisTick: {
            show: false
        }
    }
};

/**
 * [lineChartOption description]
 * @type {Object}
 */
const lineChartOption = {
    tooltip: {
        backgroundColor: '#fff',
        trigger: 'axis',
        padding: [10, 20, 10, 10],
        textStyle: {
            color: '#666',
            fontSize: 12
        },
        axisPointer: {
            lineStyle: {
                color: '#3a62ca'
            }
        },
        extraCssText: 'border-radius:0;'
            + 'padding:0;'
            + 'background-color:rgba(255,255,255,.95);'
            + 'box-shadow:2px 2px 4px 2px rgba(58,98,202,.3);',
        formatter(params) {
            let seriesList = [];
            if (Array.isArray(params)) {
                _.each(params, item => {
                    seriesList.push(`<dd style="padding: 3px 10px;color: ${item.color};">`
                        + item.seriesName
                        + ': '
                        + item.value
                        + '</dd>');
                });
            }
            else {
                seriesList.push(`<dd style="padding: 3px 10px;color: ${params.color};">`
                    + params.seriesName
                    + ': '
                    + params.value
                    + '</dd>');
            }
            return '<dl style="min-width: 150px;padding-bottom: 3px">'
                + '<dt style="background-color: #3a62ca;padding: 5px 10px;color: #fff;margin-bottom: 3px;">'
                + (Array.isArray(params) ? params[0].axisValueLabel : params.axisValueLabel)
                + '</dt>'
                + seriesList.join('')
                + '</dl>';
        }

    }
};

/**
 * [barChartOption description]
 * @type {Object}
 */
const barChartOption = {
    tooltip: {
        backgroundColor: 'rgba(0,0,0, 0.3)',
        textStyle: {
            color: '#666',
            fontSize: 12,
            lineHeight: 20
        },
        extraCssText: 'border-radius:0;'
            + 'padding:0;'
            + 'background-color:rgba(255,255,255,.95);'
            + 'box-shadow:2px 2px 4px 2px rgba(58,98,202,.3);',
        formatter(params) {
            let html = '<dl style="min-width: 150px;padding-bottom: 3px;">'
                + `<dt style="background-color: ${params.color};padding: 5px 10px;color: #fff;margin-bottom: 3px;">`
                + params.name
                + '</dt>'
                + `<dd  style="padding: 3px 10px; color: ${params.color};">${params.seriesName}：`
                + params.value
                + '</dd></dl>';
            return html;
        }
    },
    legend: {
        show: true,
        bottom: 5,
        icon: 'square'
    }
};

/**
 * [pieChartOption description]
 * @type {Object}
 */
const pieChartOption = {
    grid: {
        top: 100
    },
    xAxis: {
        show: false
    },
    yAxis: {
        show: false
    },
    title: {
        x: 'center'
    },
    legend: {
        show: true,
        bottom: 5,
        icon: 'square'
    },
    tooltip: {
        backgroundColor: '#fff',
        textStyle: {
            color: '#666',
            fontSize: 12,
            lineHeight: 20
        },
        extraCssText: 'border-radius:0;'
            + 'padding:0;'
            + 'background-color:rgba(255,255,255,.95);'
            + 'box-shadow:2px 2px 4px 2px rgba(58,98,202,.3);',
        formatter(params) {
            let html = '<dl style="min-width: 150px;padding-bottom: 3px">'
                + `<dt style="background-color: ${params.color};padding: 5px 10px;color: #fff;margin-bottom: 3px;">`
                + params.name
                + '</dt>'
                + `<dd  style="padding: 3px 10px;color: ${params.color};">占比：`
                + params.percent
                + `%</dd><dd  style="padding: 3px 10px;color: ${params.color};">数值：`
                + params.value
                + '</dd></dl>';
            return html;
        }
    },
    animation: false,
    textStyle: {
        color: '#333'
    }
};

/**
 * [ringChartOption description]
 * @type {Object}
 */
const ringChartOption = {
    tooltip: {
        show: false
    }
};

/**
 * [scatterChartOption description]
 * @type {Object}
 */
const scatterChartOption = {
};

export default {
    lineChart: Object.assign({}, commonOption, lineChartOption),
    barChart: Object.assign({}, commonOption, barChartOption),
    columnChart: Object.assign({}, commonOption, barChartOption),
    pieChart: Object.assign({}, commonOption, pieChartOption),
    ringChart: Object.assign({}, commonOption, ringChartOption),
    scatterChart: Object.assign({}, commonOption, scatterChartOption)
};
