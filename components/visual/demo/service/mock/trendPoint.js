/* eslint-disable */
const Mock = require('mockjs');

const trend = function() {
    return [
        [1543566240000, 11431.2, 7620.8, 100],
        [1543558620000, 11328.7, 7552.48, 99.999972477382]
    ]
}
 
Mock.mock('/mock/trendPoint', 'post', trend);