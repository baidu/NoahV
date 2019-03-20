/* eslint-disable */
const Mock = require('mockjs');

const pie = function() {
    return {
        success: true,
        message: 'ok',
        data: {
            title: '我是饼图',
            data: [{
                data: [{
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
                }]
            }]
        }        
    }
}
 
Mock.mock('/api/pie', 'post', pie);