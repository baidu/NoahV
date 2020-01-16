/* eslint-disable */
const Mock = require('mockjs');
const circleData = function() {
	return Mock.mock({
		"data|75-99.1-5": 1,
		success: true
	});
}
Mock.mock('/mock/circleData', 'post', circleData);