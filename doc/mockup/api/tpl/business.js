/* eslint-disable */
const Mock = require('mockjs');
const data = function() {
    return {
        success: true,
        message: 'ok',
        data: {
            
        }
    }
}
Mock.mock('/api/xxx', 'post', data);