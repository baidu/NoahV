/* eslint-disable */
const Mock = require('mockjs');

const conf = {
    "title": "饼图配置模拟数据",
    "data": [{
        "namespace": ["forDemoNamespace"],
        "metric": "#{metric1}/#{metric2}",
        "statistics": "avg"
    }],
    "style": {
        "decimals": 4,
        "unit": "%",
        "threshold": [
            // [0.9, 1, "yellow"],
            // [0.2, 0.7, "red"],
            // [0.7, 0.9, "green"]
        ]
    },
    "link": "http://www.baidu.com",
    "timeType": "fixed",
    "time": "before(2h)"
};

const pie = function() {
    return {
        data: {
            configure: JSON.stringify(conf),
            title: "饼图配置模拟数据"
        },
        success: true
    };
}
 
Mock.mock('/mock/pie', 'post', pie);