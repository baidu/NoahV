/* eslint-disable */
const Mock = require('mockjs');

const pie = function() {
    return [{
        name: 'Microsoft Internet Explorer',
        y: 56.33
    }, {
        name: 'Chrome',
        y: 24.03
    }, {
        name: 'Firefox',
        y: 10.38
    }, {
        name: 'Safari',
        y: 4.77
    }, {
        name: 'Opera',
        y: 0.91
    }, {
        name: 'Proprietary or Undetectable',
        y: 0.2
    }];
}
 
Mock.mock('/mock/pieData', 'post', pie);