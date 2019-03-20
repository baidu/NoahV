/* eslint-disable */
const Mock = require('mockjs');

const dashboardConfig = function() {
    return {
        success: true,
        message: 'ok',
        data: {
            widgets: [
                [
                    {
                        'path': '_1677534_1677535',
                        'type': 'WIDGETS',
                        'id': '1677535',
                        'title': '111'
                    },
                    {
                        'path': '_1677534_1677536',
                        'type': 'WIDGETS',
                        'id': '1677536',
                        'title': ''
                    }
                ],
                [
                    {
                        'path': '_1677534_1677537',
                        'type': 'WIDGETS',
                        'id': '1677537',
                        'title': ''
                    },
                    {
                        'path': '_1677534_1677538',
                        'type': 'WIDGETS',
                        'id': '1677538',
                        'title': ''
                    }
                ]
            ]
        }        
    }
}
 
Mock.mock('/api/dashboardconfig', 'post', dashboardConfig);