/* eslint-disable */
const Mock = require('mockjs');
const billboard = function() {
    return {
        data: {
            configure : '{"title":"面板配置path","data":[{"namespace":["forDemoNamespace1"],"metric":"#{metric1}/#{metric2}","statistics":"avg","name":"name3","unit":"%","decimals":4},{"namespace":["forDemoNamespace2"],"metric":"#{metric3}","statistics":"avg","name":"name4","unit":"%","decimals":4}],"link":"http://sia.baidu.com","timeType":"relative","time":"before(2h)"}',
            title: "面板配置path"
        },
        success: true
    };
};
Mock.mock('/mock/billboard', 'post', billboard);
