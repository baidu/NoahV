/* eslint-disable */
const Mock = require('mockjs');
const column = function() {
    return {
        "aggrNames": [{
            "name": "dd",
            "value": "cc",
            "alias": "login",
            "product": "online:nuomi",
            "dimensions": [
                {
                    "name": "noah_namespace",
                    "values": [
                        "cluster.xx.nuomi.all"
                    ]
                }
            ],
            "metrics": [
                {
                    "metric": "oo_session_pv",
                    "alias": "pv",
                    "statistics": "sum"
                }
            ]
        }],
        "display": [{
            name: 'login_pv',
            data: [{
                "alias": "17年10月22日",
                "y": 26090,
                "x": 1509206400000
            }, {
                "alias": "17年10月23日",
                "y": 28090,
                "x": 1509292800000
            }, {
                "alias": "17年10月24日",
                "y": 29090,
                "x": 1509379200000
            }]
        }],
        "title": "我是mdColumn",
        "threshold": 28010,
        "minOffset": 0.05,
        "time": "week()",
        "period": "day"
    };
}
 
Mock.mock('/api/mdcolumn', 'post', column);