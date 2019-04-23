/* eslint-disable */
const Mock = require('mockjs');
const circleData = function() {
    return {
        data: 99.999999,
        success: true
    }
}
Mock.mock('/mock/circleData', 'post', circleData);