/* eslint-disable */
const Mock = require('mockjs');
const mapData = function() {
    return {
        success: true,
        data: [
            {name:'黑龙江', value: 0, toolTipData: [
                {
                    name: '可用率',
                    value: 10,
                    unit: '%'
                },
                {
                    name: '响应时间',
                    value: 1000,
                    unit: 'ms'
                }
            ]},
            {name:'河北', value: 0.9},
        ],
        message: 'ok',
        traceInfo: null
    };
}
Mock.mock('/mock/dataMap', 'post', mapData);