/**
 * @file visual widget config
 *
 * @author wang_jing13@163.com
 */
export default {
    mons: {
        dataApi: {
            nvMdCircle: '/api/index.php?r=MetricNew/circle',
            nvMdBillboard: '/api/index.php?r=MetricNew/billboard',
            nvMdTrend: '/api/index.php?r=MetricNew/trend',
            nvMdReport: '/api/index.php?r=MetricNew/report',
            nvMdEventRiver: '/api/index.php?r=MetricNew/eventRiver'
        },
        confApi: {
            nvMdCircle: '/api/?r=conf/get',
            nvMdBillboard: '/api/?r=conf/get',
            nvMdTrend: '/api/?r=conf/get',
            nvMdReport: '/api/?r=conf/get',
            nvMdEventRiver: '/api/?r=conf/get'
        }
    },
    getAPI(api) {
        return api;
    }
};
