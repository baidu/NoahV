/* eslint-disable */
const Mock = require('mockjs');
const billboard = function() {
	const CONF = {
		"title": "网络模块",
		"data": [{
			"namespace": ["forDemoNamespace1"],
			"metric": "#{metric1}/#{metric2}",
			"statistics": "avg",
			"name": "usability",
			"alias": '异常率',
			"unit": "%",
			"decimals": 4
		}, {
			"namespace": ["forDemoNamespace2"],
			"metric": "#{metric3}",
			"statistics": "avg",
			"name": "abnormal",
			"alias": '异常率',
			"unit": "%",
			"decimals": 4
		}],
		"link": "http://www.baidu.com",
		"timeType": "relative",
		"time": "before(2h)"
	};
    return {
        data: {
            configure : JSON.stringify(CONF)
        },
        success: true
    };
};
Mock.mock('/mock/billboard', 'post', billboard);
