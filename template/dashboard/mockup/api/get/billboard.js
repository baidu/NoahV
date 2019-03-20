/**
 * Created by noahv-cli.
 */

/* eslint-disable  no-undef,no-unused-vars */
let mockup = require('noahv-mockup').mockupTool;

exports.response = (path, params) => {

    return mockup.ok(
        [
            {
                name: '请求平均时长(秒)',
                data: 10,
                warning: true
            },
            {
                name: '请求失败量(个)',
                data: 91
            }, {
                name: '请求成功率(%)',
                data: 99.99875
            }
        ]
    );

};
/* eslint-enable */
