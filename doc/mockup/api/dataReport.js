/* eslint-disable */
const Mock = require('mockjs');

const report = function() {
    return {
        "data": [{
            "name":"noah_namespace",
            "value":"2.case-basic.service",
            "alias":'metric1',
            "metrics":{"alias3":90,"alias2":null, "alias1": 95}
        }, {
            "name":"noah_namespace",
            "value":"1.case-basic.service",
            "alias":'metric2',
            "metrics":{"alias3":100,"alias2": null, "alias1": 80}
        }],
        success: true
    };
}
 
Mock.mock('/mock/dataReport', 'post', report);