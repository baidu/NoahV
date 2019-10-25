/* eslint-disable */
const Mock = require('mockjs');
const data = function() {
    return {
        data: {
            username: '右右右',
            email: 'darren@gmail.com'
        },
        success: true
    }
}
Mock.mock('/api/tpl/form/get', 'post', data);