/**
 * Created by noahv-cli.
 */

/* eslint-disable  no-undef,no-unused-vars */
let mockup = require('noahv-mockup').mockupTool;

exports.response = function (req, res) {
    let [startTime, endTime] = res.time.split('|');
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    const diff = endTime - startTime;
    const data = {
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
                    "product": {
                        "operator": ["app", "app2", "app3"]
                    },
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
            "eventLevel": "warning",
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
            "eventLevel": "error",
            "display": "NJ01机房异常",
            "eventType": "single",
            "eventList": [{
                "startTime": 1503563100,
                "endTime": 1503563160
            }]
        }, {
            "name": "GZNSwarning",
            "eventLevel": "warning",
            "display": "GZNS机房异常",
            "eventType": "single",
            "eventList": [{
                "startTime": 1503561630,
                "endTime": 1503561660
            }]
        }, {
            "name": "GZHXYerror",
            "eventLevel": "error",
            "display": "GZHXY机房异常",
            "eventType": "single",
            "eventList": [{
                "startTime": 1503561630,
                "endTime": 1503561660
            }]
        }]
    };

    data.events.forEach(event => {
        event.eventList.forEach(item => {
            item.startTime = (Math.random() * diff + +startTime) / 1000;
            item.endTime = (endTime - (Math.random() * diff)) / 1000
        });
    });
    return mockup.ok(data)
};
/* eslint-enable */
