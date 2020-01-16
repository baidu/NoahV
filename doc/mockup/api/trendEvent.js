/* eslint-disable */
const Mock = require('mockjs');

const trend = function() {
    return {
        data: [{
            "name": "平台上线",
            "type": "deploy",
            "events": [ {
                "startTime": 1529409720,
                "endTime": 1529409900,
                "detail": "2018年6月平台常规上线"
            },  {
                "startTime": 1529411040,
                "endTime": 1529411280,
                "detail": "切换数据库配置"
            }]
        }, {
            "name": "容量变更",
            "type": "capacity",
            "color": '#f90',
            "events": [ {
                "startTime": 1529410800,
                "endTime": 1529410920,
                "detail": "容量操作"
            },  {
                "startTime": 1529412360,
                "endTime": 1529412540,
                "detail": "容量操作"
            }]
        }],
        success: true
    };
}
 
Mock.mock('/mock/trendEvent', 'post', trend);