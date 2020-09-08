/**
 * Created by noahv-cli.
 */
/* eslint-disable  no-undef,no-unused-vars,max-len */
let mockup = require('noahv-mockup').mockupTool;

exports.response = (path, params) => {
    let configure = '';
    let title = '';
    let type = '';
    if (params.id === '_1678352_1678353' || params.name === '_1678352_1678353') {
        configure = '{"style":{"displayType":"line","unit":"","nullPointMode":"zero","threshold":"150000"},"datasource":{"api":"/api/get/trend","method":"POST","params":{"dev":true}},"title":"下游模块可用性监控-指标1趋势图","data":{"params":{"dev":true}}}';
        title = '下游模块可用性监控-指标1趋势图';
        type = 'mdtrend';
    }
    else if (params.id === '_1678352_1678358' || params.name === '_1678352_1678358') {
        configure = '{"style":{"decimals":2,"unit":"%","max":100,"min":0,"threshold":[[0,100,"#ffc91b"]]},"datasource":{"api":"/api/get/mdcircle","method":"POST","params":{"dev":true}},"title":"下游模块可用性监控-指标1仪表图","data":{"params":{"dev":true}}}';
        title = '下游模块可用性监控-指标1仪表图';
        type = 'mdcircle';
    }
    else if (params.id === '_1678352_1678359' || params.name === '_1678352_1678359') {
        configure = '{"style":{"decimals":3,"unit":"%","max":100,"min":0,"threshold":[[0,100,"#2ecb73"]]},"datasource":{"api":"/api/get/mdcircle","method":"POST","params":{"dev":true}},"title":"下游模块可用性监控-指标2仪表图","data":{"params":{"dev":true}}}';
        title = '下游模块可用性监控-指标2仪表图';
        type = 'mdcircle';
    }
    else if (params.id === '_1678352_1678354' || params.name === '_1678352_1678354') {
        configure = '{"style":{"displayType":"line","unit":"","nullPointMode":"zero","threshold":""},"datasource":{"api":"/api/get/billboard","method":"POST","params":""},"title":"下游模块可用性监控-指标1面板","data":{}}';
        title = '下游模块可用性监控-指标1面板';
        type = 'billboard';
    }
    else if (params.id === '_1678352_1678355' || params.name === '_1678352_1678355') {
        configure = '{"style":{"displayType":"line","unit":"","nullPointMode":"zero","threshold":""},"datasource":{"api":"/api/get/billboard","method":"POST","params":""},"title":"下游模块可用性监控-指标2面板","data":{}}';
        title = '下游模块可用性监控-指标2面板';
        type = 'billboard';
    }
    else if (params.id === '_1678352_1678356' || params.name === '_1678352_1678356') {
        configure = '{"style":{"displayType":"line","unit":"","nullPointMode":"zero","threshold":""},"datasource":{"api":"/api/get/report","method":"POST","params":""},"title":"下游模块可用性监控-指标1报表","data":{"namespace":[],"columns":[{"source":"origin","metric":"","statistics":"avg","header":"数据1","alias":"alias1","decimals":2,"threshold":[],"timeType":"relative","time":"before(2h)","use":"true","id":1},{"source":"origin","metric":"","statistics":"avg","header":"数据2","alias":"alias2","decimals":2,"threshold":[],"timeType":"relative","time":"before(2h)","use":"true","id":2},{"source":"column","metric":" #{alias2}+10","statistics":"avg","header":"数据2+10","unit":"","decimals":2,"threshold":[],"timeType":"relative","time":"before(2h)","total":"","id":3}],"comments":"","caption":"维度名"}}';
        title = '下游模块可用性监控-指标1报表';
        type = 'mdtable';
    }
    else if (params.id === '_1678352_1678357' || params.name === '_1678352_1678357') {
        configure = '{"datasource":{"api":"api/get/eventRiver","method":"GET","params":{"dev":true}},"data":{"schema":[{"name":"机房1","type":"NJ01error","checked":true},{"name":"机房二","type":"GZHXYerror","checked":true},{"name":"机房三","type":"GZNSwarning","checked":true},{"name":"机房四","type":"BJYZwarning","checked":true},{"name":"机房五","type":"NJ01warning","checked":true,"eventDetailMap":[{"name":"创造者","key":"product.operator","type":"arr"},{"name":"异常类型","key":"type","type":"text"},{"name":"详情","key":"url","type":"link"}]}],"params":{"dev":true}},"timeType":"relative","time":"","style":{"type":"image"},"title":"新建组件"}';
        title = '下游模块可用性监控-事件流图';
        type = 'eventRiver';
    }
    else {
        configure = '{}';
        title = '新建组件';
        type = 'mdtrend';
    }
    return mockup.ok(
        {
            configure: configure,
            title: title,
            type: type
        }
    );

};
/* eslint-disable  no-undef,no-unused-vars */
