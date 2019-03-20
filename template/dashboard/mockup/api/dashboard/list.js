/**
 * Created by noahv-cli.
 */

/* eslint-disable  no-undef,no-unused-vars */
let mockup = require('noahv-mockup').mockupTool;

exports.response = (path, params) => {
    let data = [
        {
            id: 123456,
            title: '上游模块可用性监控',
            updator: '张三',
            lastupdate: '2018-05-21 10:00:00'
        },
        {
            id: 223456,
            title: '下游模块可用性监控1',
            updator: '张三',
            lastupdate: '2018-05-21 10:00:00'
        },
        {
            id: 323456,
            title: '下游模块可用性监控2',
            updator: '张三',
            lastupdate: '2018-05-21 10:00:00'
        },
        {
            id: 423456,
            title: '下游模块可用性监控3',
            updator: '张三',
            lastupdate: '2018-05-21 10:00:00'
        }
    ];
    let response = [];
    if (params.title !== '') {
        data.forEach(item => {
            if (item.title.indexOf(params.title) !== -1) {
                response.push(item);
            }
        });
    }
    else {
        response = data;
    }
    return mockup.list(response, {
        totalCount: 4,
        pageSize: params.pageSize,
        pageNo: params.pageNo
    });

};
/* eslint-enable */
