/**
 * Created by noahv-cli.
 */

/* eslint-disable  no-undef,no-unused-vars */
let mockup = require('noahv-mockup').mockupTool;

exports.response = (path, params) => {

    return mockup.ok(
        {
            title: '浏览器市场占用率',
            data: [
                {
                    data: [
                        {
                            name: 'Microsoft Internet Explorer',
                            y: 56.33
                        }, {
                            name: 'Chrome',
                            y: 24.03
                        }, {
                            name: 'Firefox',
                            y: 10.38
                        }, {
                            name: 'Safari',
                            y: 4.77
                        }, {
                            name: 'Opera',
                            y: 0.91
                        }, {
                            name: 'Proprietary or Undetectable',
                            y: 0.2
                        }
                    ]
                }
            ]
        }
    );

};
/* eslint-enable */
