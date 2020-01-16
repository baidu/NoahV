/* eslint-disable */
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

// mock一组数据
const produceNewsData = function() {
    return {
        data: {
            "extra": [{
                "name": "相关人员",
                "key": "operator"
            }],
            "events": [{
                "name": "BJYZwarning",
                "eventLevel": "warning",
                "eventType": "single",
                "eventList": [{
                    "startTime": 1503562250,
                    "display": {
                        "type": "BJYZ1机房异常",
                        "product": 'app',
                        "url": "http://www.noahv.org"
                    },
                    "endTime": 1503564300
                }, {
                    "startTime": 1503564390,
                    "display": {
                        "type": "BJYZ2机房异常",
                        "operator": "app",
                        "url": "http://www.noahv.org"
                    },
                    "endTime": 1503564510
                }, {
                    "startTime": 1503562230,
                    "display": {
                        "type": "BJYZ3机房异常",
                        "operator": "app",
                        "url": "http://www.noahv.org"
                    },
                    "endTime": 1503562320
                }, {
                    "startTime": 1503562730,
                    "display": {
                        "type": "BJYZ4机房异常",
                        "operator": "app",
                        "url": "http://www.noahv.org"
                    },
                    "endTime": 1503562860
                }, {
                    "startTime": 1503563700,
                    "display": {
                        "type": "BJYZ5机房异常",
                        "operator": "app",
                        "url": "http://www.noahv.org"
                    },
                    "endTime": 1503563790
                }, {
                    "startTime": 1503564000,
                    "display": {
                        "type": "BJYZ6机房异常",
                        "operator": "app",
                        "url": "http://www.noahv.org"
                    },
                    "endTime": 1503564060
                }]
            }, {
                "name": "NJ01warning",
                "eventType": "single",
                "eventList": [{
                    "startTime": 1503563160,
                    "display": {
                        "type": "NJ01机房异常",
                        "operator": "app",
                        "url": "http://www.noahv.org"
                    },
                    "endTime": 1503563190
                }, {
                    "startTime": 1503563040,
                    "display": {
                        "type": "NJ01机房异常",
                        "operator": "app",
                        "url": "http://www.noahv.org"
                    },
                    "endTime": 1503563100
                }, {
                    "startTime": 1503561300,
                    "display": {
                        "type": "NJ01机房异常",
                        "operator": "app",
                        "url": "http://www.noahv.org"
                    },
                    "endTime": 1503561390
                }]
            }, {
                "name": "NJ01error",
                "display": "NJ01机房异常",
                "eventType": "single",
                "eventList": [{
                    "startTime": 1503563100,
                    "endTime": 1503563160
                }]
            }, {
                "name": "GZNSwarning",
                "display": "GZNS机房异常",
                "eventType": "single",
                "eventList": [{
                    "startTime": 1503561630,
                    "endTime": 1503561660
                }]
            }, {
                "name": "GZHXYerror",
                "display": "GZHXY机房异常",
                "eventType": "single",
                "eventList": [{
                    "startTime": 1503561630,
                    "endTime": 1503561660
                }]
            }],
            "dataSchema": [{
                "name": "机房1",
                "type": "NJ01error",
                "checked": true
            }, {
                "name": "机房二",
                "type": "GZHXYerror",
                "checked": true
            }, {
                "name": "机房三",
                "type": "GZNSwarning",
                "checked": true
            }, {
                "name": "机房四",
                "type": "BJYZwarning",
                "checked": true
            }, {
                "name": "机房五",
                "type": "NJ01warning",
                "checked": true,
                "eventDetailMap": [{
                    "name": "创造者",
                    "key": "product.operator",
                    "type": "arr"
                }, {
                    "name": "异常类型",
                    "key": "type",
                    "type": "text"
                }, {
                    "name": "详情",
                    "key": "url",
                    "type": "link"
                }]
            }]
        },
        success: true
    }
};
 
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/mock/eventlist', 'post', produceNewsData);
