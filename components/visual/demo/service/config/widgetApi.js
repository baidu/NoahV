/**
 * @file visual widget config
 *
 * @author wang_jing13@163.com
 */

require('../mock/billboard');
require('../mock/dataBillboard');
require('../mock/circle');
require('../mock/dataCircle');
require('../mock/mdtrend');
require('../mock/dataMdTrend');
require('../mock/mdreport');
require('../mock/dataReport');
require('../mock/dataTreeReport');

export default {
    mons: {
        dataApi: {
            nvMdCircle: '/mock/circleData',
            nvMdBillboard: '/mock/dataBillboard',
            nvMdTrend: '/mock/dataTrend',
            nvMdReport: '/mock/dataReport'
        },
        confApi: {
            nvMdCircle: '/mock/circle',
            nvMdBillboard: '/mock/billboard',
            nvMdTrend: '/mock/mdtrend',
            nvMdReport: '/mock/mdreport'
        }
    },
    getAPI(api) {
        return api;
    }
};
