/**
 * @file api
 * @author Joannamo(joannamo123@163.com)
 */

/* eslint-disable no-undef */
require('mock/api/billboard');
require('mock/api/dataBillboard');
require('mock/api/circle');
require('mock/api/dataCircle');
require('mock/api/mdtrend');
require('mock/api/dataMdTrend');
require('mock/api/mdreport');
require('mock/api/dataReport');
require('mock/api/dataTreeReport');
require('mock/api/eventlist');
require('mock/api/eventRiver');
/* eslint-enable */

export default {
    billboard: {
        conf: '/mock/billboard',
        data: '/mock/dataBillboard'
    },
    circle: {
        conf: '/mock/circle',
        data: '/mock/circleData'
    },
    trend: {
        conf: '/mock/mdtrend',
        data: '/mock/dataTrend'
    },
    report: {
        conf: '/mock/mdreport',
        data: '/mock/dataReport',
        treeData: '/mock/dataTreeReport'
    },
    eventRiver: {
        conf: '/mock/eventRiver',
        data: '/mock/eventlist'
    }
};

