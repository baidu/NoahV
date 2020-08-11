/**
 * Created by noahv-cli.
 */

/* eslint-disable  no-undef,no-unused-vars */
let mockup = require('noahv-mockup').mockupTool;

exports.response = (path, params) => {

    return mockup.ok(
        [
            {
                id: '01',
                name: '通用上线模板',
                detail: '非云上产品请使用该模板',
                cmd: 'empty',
                date: '2018-06-17 00:00:01',
                person: '张三'
            },
            {
                id: '02',
                name: '云上产品上线模板',
                detail: '云上产品请使用该模板',
                cmd: 'sh release.sh',
                date: '2018-06-17 00:00:02',
                person: '张三'
            },
            {
                id: '03',
                name: '通用上线模板',
                detail: '非云上产品请使用该模板',
                cmd: 'empty',
                date: '2018-06-17 00:00:03',
                person: '张三'
            },
            {
                id: '04',
                name: '云上产品上线模板',
                detail: '云上产品请使用该模板',
                cmd: 'sh release.sh',
                date: '2018-06-17 00:00:04',
                person: '张三'
            },
            {
                id: '05',
                name: '通用上线模板',
                detail: '非云上产品请使用该模板',
                cmd: 'empty',
                date: '2018-06-17 00:00:05',
                person: '张三'
            },
            {
                id: '06',
                name: '云上产品上线模板',
                detail: '云上产品请使用该模板',
                cmd: 'sh release.sh',
                date: '2018-06-17 00:00:06',
                person: '张三'
            },
            {
                id: '07',
                name: '通用上线模板',
                detail: '非云上产品请使用该模板',
                cmd: 'empty',
                date: '2018-06-17 00:00:07',
                person: '张三'
            },
            {
                id: '08',
                name: '云上产品上线模板',
                detail: '云上产品请使用该模板',
                cmd: 'sh release.sh',
                date: '2018-06-17 00:00:08',
                person: '张三'
            },
            {
                id: '09',
                name: '通用上线模板',
                detail: '非云上产品请使用该模板',
                cmd: 'empty',
                date: '2018-06-17 00:00:09',
                person: '张三'
            },
            {
                id: '10',
                name: '云上产品上线模板',
                detail: '云上产品请使用该模板',
                cmd: 'sh release.sh',
                date: '2018-06-17 00:00:10',
                person: '张三'
            },
            {
                id: '11',
                name: '通用上线模板',
                detail: '非云上产品请使用该模板',
                cmd: 'empty',
                date: '2018-06-17 00:00:11',
                person: '张三'
            },
            {
                id: '12',
                name: '云上产品上线模板',
                detail: '云上产品请使用该模板',
                cmd: 'sh release.sh',
                date: '2018-06-17 00:00:12',
                person: '张三'
            }
        ]
    );

};
/* eslint-enable */
