/* eslint-disable */
const Mock = require('mockjs');
const circle = function() {
    return {
        data: {
            configure : '{"title":"模块B可用性","data":[{"namespace":["forDemoNamespace"],"metric":"#{metric1}/#{metric2}","statistics":"avg"}],"style":{"decimals":4,"unit":"%","max":100,"min":0,"threshold":[[90,99,"yellow"],[0,90,"red"],[99,99.99,"green"]]},"link":"http://www.baidu.com","timeType":"fixed","time":"before(2h)"}',
            title: "仪表图配置path"
        },
        success: true
    };
}
Mock.mock('/mock/circle', 'post', circle);
