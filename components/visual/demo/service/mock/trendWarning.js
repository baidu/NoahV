/* eslint-disable */
const Mock = require('mockjs');

const trend = function() {
    return [{
        count: 4,
        events: [{
            startTime: 1543548509,
            endTime: 1543548941,
            itemValues: "crash_rate=0.208039 ",
            tags: ["os=android", "statistics=avg"]
        },
        {
            startTime: 1543552922,
            endTime: 1543553354
        }]
    }]
}
 
Mock.mock('/mock/trendWarning', 'post', trend);