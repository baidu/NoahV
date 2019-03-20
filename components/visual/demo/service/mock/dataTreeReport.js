/* eslint-disable */
const Mock = require('mockjs');

const report = function() {
    return {
        "data": [{
            "name": "plat",
            "value": "bid",
            "alias": null,
            "metrics": {
                "alias1": null,
                "alias2": null,
                "alias3": null,
            },
            "children": [{
                "name": "im_module",
                "value": "adplusserver",
                "alias": null,
                "metrics": {
                    "alias1": 90,
                    "alias2": null,
                    "alias3": 92,
                },
                "children": [{
                    "name": "im_module1",
                    "value": "adplusserver1",
                    "alias": null,
                    "metrics": {
                        "alias1": 90,
                        "alias2": null,
                        "alias3": 85
                    }
                }, {
                    "name": "im_module2",
                    "value": "adplusserver2",
                    "alias": null,
                    "metrics": {
                        "alias1": 70,
                        "alias2": null,
                        "alias3": 75
                    }
                }]
            },
            {
                "name": "im_module",
                "value": "imbsproxy",
                "alias": null,
                "metrics": {
                    "alias1": null,
                    "alias2": 85,
                    "alias3": 92
                }
            },
            {
                "name": "im_module",
                "value": "indexserver",
                "alias": null,
                "metrics": {
                    "alias1": 90,
                    "alias2": null,
                    "alias3": 98
                }
            }]
        }],
        success: true
    }

}
 
Mock.mock('/mock/dataTreeReport', 'post', report);