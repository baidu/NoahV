/**
 * @file api
 * @author mohaiyan(mohaiyan2005@163.com)
 */
/* eslint-disable */
require('../mock/billboard');
require('../mock/dataBillboard');
require('../mock/circle');
require('../mock/dataCircle');
require('../mock/mdtrend');
require('../mock/dataMdTrend');
require('../mock/mdreport');
require('../mock/dataReport');
require('../mock/dataTreeReport');
require('../mock/eventlist');
require('../mock/eventRiver');

require('../mock/trendEvent');
require('../mock/trendWarning');

require('../mock/trendPoint');

require('../mock/dataMap');
require('../mock/pie');
require('../mock/dataPie');

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
    },
    pie: {
        conf: '/mock/pie',
        data: '/mock/dataPie'
    }
};

