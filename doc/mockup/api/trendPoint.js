/* eslint-disable */
const Mock = require('mockjs');

const trend = function() {
    return {
	    "success": true,
		"data": [{
			"name": "异常点",
			"ruleName": 'error',
			"color": "#f00",
			// "symbol": "circle",
			"size": 8,
			"data": [
				[1529409780000, 172382],
				[1529409720000, 144181]
			]
		}, {
			"name": "超时点",
			"ruleName": 'overtime',
			"color": "#F90",
			"data": [
				[1529410860000, 124365],
				[1529412060000, 122014]
			]
		}]
	};
}
 
Mock.mock('/mock/trendPoint', 'post', trend);