/* eslint-disable */
const Mock = require('mockjs');
const data = function() {
    return {
        data: 'NoahV',
        success: true
    }
}
Mock.mock('/api/tpl/ajax', 'post', data);