/**
 * Created by noahv-cli.
 */

/* eslint-disable  no-undef,no-unused-vars,max-len */
let mockup = require('noahv-mockup').mockupTool;

exports.response = (path, params) => {
    let data = {
        'id': '223456',
        'title': '下游模块可用性监控',
        'comment': ' ',
        'configure': '{"widgets":[[{"path":"_1678352_1678353","type":"mdtrend","id":"1678353","title":"趋势图demo"}, {"path":"_1678352_1678357", "type":"eventRiver", "id":"1678357","title": "下游模块可用性监控-事件流图"}], [{"path":"_1678352_1678358","type":"mdcircle","id":"1678358","title":"下游模块可用性监控-指标1仪表图"},{"path":"_1678352_1678359","type":"mdcircle","id":"1678359","title":"下游模块可用性监控-指标2仪表图"}],[{"path":"_1678352_1678354","type":"billboard","id":"1678354","title":"下游模块可用性监控-指标1面板"},{"path":"_1678352_1678355","type":"billboard","id":"1678355","title":"下游模块可用性监控-指标2面板"}],[{"path":"_1678352_1678356","type":"mdtable","id":"1678356","title":"下游模块可用性监控-指标1报表"}]]}',
        'lastupdate': '2018-05-30 14:53:24',
        'updator': 'admin'
    };
    let newCreateData = {
        'id': '31245312',
        'title': '创建示例',
        'comment': ' ',
        'configure': '{}',
        'lastupdate': '2018-05-30 14:53:24',
        'updator': 'admin'
    };
    if (params.id === '31245312') {
        response = newCreateData;
    }
    else {
        response = data;
    }
    return mockup.ok(
        response
    );
};
/* eslint-enable */
