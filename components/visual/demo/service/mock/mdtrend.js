/* eslint-disable */
const Mock = require('mockjs');

const trend = function() {
    return {
        "data": {
            configure: '{"title":"趋势图标题Conf","data":[{"namespace":["forDemoNamespace1","forDemoNamespace2"],"product":"noahEE","monitoringType":"instance","metric":"#{metric1}/#{metric2}","statistics":"avg","period":5,"name":"name1","contrast":["1d","1w"]},{"namespace":["forDemoNamespace3","forDemoNamespace4"],"product":"noahEE","monitoringType":"instance","metric":"#{metric3}","statistics":"avg","period":5,"name":"name2","contrast":["1d"]}],"style":{"displayType":"line","unit":"个","nullPointMode":"zero","threshold":99},"link":"http://sia.baidu.com","timeType":"relative","time":"before(2h)"}'
        },
        success: true
    };
}
 
Mock.mock('/mock/mdtrend', 'post', trend);