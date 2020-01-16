/* eslint-disable */
const Mock = require('mockjs');
const Random = Mock.Random;
const billboardData = function() {
    const usability = Random.float(90, 99, 5, 5);
    const overtime = Random.float(1, 3, 5, 5);
    const abnormal = 100 - usability;
    return {
        data: [{
            name: 'usability',
            value: usability,
            warning: usability < 95 ? true : false
        },
        {
            name: 'overtime',
            value: overtime
        }, {
            name: 'abnormal',
            value: abnormal
        }],
        success: true
    };
}
Mock.mock('/mock/dataBillboard', 'post', billboardData);