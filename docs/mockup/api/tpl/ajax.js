/* eslint-disable */
const Mock = require('mockjs');
const data = function() {
    return {
        data: '右右右',
        success: true
    }
}
Mock.mock('/api/tpl/ajax', 'post', data);