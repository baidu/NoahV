/* eslint-disable */
const Mock = require('mockjs');

const pie = function() {
    return {
        success: true,
        data: [{
            name: 'Microsoft Internet Explorer',
            value: 56.33
        }, {
            name: 'Chrome',
            value: 24.03
        }, {
            name: 'Firefox',
            value: 10.38
        }, {
            name: 'Safari',
            value: 4.77
        }, {
            name: 'Opera',
            value: 0.91
        }, {
            name: 'Proprietary or Undetectable',
            value: 0.2
        }]
    };
}
 
Mock.mock('/mock/dataPie', 'post', pie);