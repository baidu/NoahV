/* eslint-disable */
const Mock = require('mockjs');
const qs = require('qs');
const data = function(arg) {
    var params = qs.parse(arg.body);
    var data = [
        {
            id: '01',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:01',
            person: '李小明'
        },
        {
            id: '02',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:02',
            person: '李小明'
        },
        {
            id: '03',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:03',
            person: '李小明'
        },
        {
            id: '04',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:04',
            person: '李小明'
        },
        {
            id: '05',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:05',
            person: '李小明'
        },
        {
            id: '06',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:06',
            person: '李小明'
        },
        {
            id: '07',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:07',
            person: '李小明'
        },
        {
            id: '08',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:08',
            person: '李小明'
        },
        {
            id: '09',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:09',
            person: '李小明'
        },
        {
            id: '10',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:10',
            person: '李小明'
        },
        {
            id: '11',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:11',
            person: '李小明'
        },
        {
            id: '12',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:12',
            person: '李小明'
        }
    ];

    var arr = [];

    var name = params.name;
    var startTime = params.startTime;
    var endTime = params.endTime;
    data.forEach(function (item) {
        if ((item.name === name || name === 'all') && (item.date > startTime && item.date < endTime)) {
           arr.push(item);
        }
    });

    var pageSize = params.pageSize || 10;
    var pageNo = params.pageNo || 1;

    currentArr = arr.slice(pageSize * (pageNo - 1), pageSize * pageNo);
    return {
        data: currentArr,
        success: true,
        page: {
            totalCount: arr.length || 0,
            pageSize: parseInt(pageSize, 10),
            pageNo: parseInt(pageNo, 10)
        }
    }
}
Mock.mock('/api/tpl/filterTable', 'post', data);