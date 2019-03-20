/**
 * @file visual widget config
 *
 * @author wang_jing13@163.com
 */
export default {
    mons: {
        dataApi: {
            saMdCircle: '/api/index.php?r=MetricNew/circle',
            saMdBillboard: '/api/index.php?r=MetricNew/billboard',
            saMdTrend: '/api/index.php?r=MetricNew/trend',
            saMdReport: '/api/index.php?r=MetricNew/report'
        },
        confApi: {
            saMdCircle: '/api/?r=conf/get',
            saMdBillboard: '/api/?r=conf/get',
            saMdTrend: '/api/?r=conf/get',
            saMdReport: '/api/?r=conf/get'
        }
    },
    getAPI(api) {
        return api;
    }
};
