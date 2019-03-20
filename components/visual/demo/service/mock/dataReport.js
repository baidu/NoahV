/* eslint-disable */
const Mock = require('mockjs');

const report = function() {
    return {
        "data": [{
            "name":"noah_namespace",
            "value":"2.case-astream-basic.servicization",
            "alias":null,
            "metrics":{"alias3":90,"alias2":95, "alias1": null}
        }, {
            "name":"noah_namespace",
            "value":"1.case-astream-basic.servicization",
            "alias":null,
            "metrics":{"alias3":100,"alias2": 80, "alias1": null}
        }],
        success: true
    };
}
 
Mock.mock('/mock/dataReport', 'post', report);