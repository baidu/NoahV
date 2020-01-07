/* eslint-disable */
const Mock = require('mockjs');

const pie = function() {
    return {
        "title": "饼图测试",
        "time": "before(2h)",
        "statistics": "count",
        "unit": "%",
        "nodata": "无请求时段",
        "offset": 0,
        "combine": false,
        // "display": [{
        //     name: 'Microsoft Internet Explorer',
        //     y: 56.33
        // }, {
        //     name: 'Chrome',
        //     y: 24.03
        // }, {
        //     name: 'Firefox',
        //     y: 10.38
        // }, {
        //     name: 'Safari',
        //     y: 4.77
        // }, {
        //     name: 'Opera',
        //     y: 0.91
        // }, {
        //     name: 'Proprietary or Undetectable',
        //     y: 0.2
        // }],
        "aggrNames": {
            "product": "online",
            "metrics": "test",
            "scope": "test",
            "dimensions": []
        },
        "extra": {}
    };
}
 
Mock.mock('/mock/mdpie', 'post', pie);