/* eslint-disable */
const Mock = require('mockjs');
const billboardData = function() {
    return {
        data: [{
            name: 'name1',
            value: 12306,
            warning: true
        },
        {
            name: 'name2',
            value: 91
        }, {
            name: 'name3',
            value: 99.99875 
        }],
        success: true
    };
}
Mock.mock('/mock/dataBillboard', 'post', billboardData);