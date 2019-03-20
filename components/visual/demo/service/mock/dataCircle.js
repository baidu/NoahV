/* eslint-disable */
const Mock = require('mockjs');
const circleData = function() {
    return {
        success: true,
        data: [
            {
                name: 'shiyu2_netric',
                data: [
                    [
                        1539587554000,
                        52.50842289082938
                    ]
                ]
            }
        ],
        message: 'ok',
        traceInfo: null
    };
}
Mock.mock('/mock/circleData', 'post', circleData);