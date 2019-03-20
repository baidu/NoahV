const Mock = require('mockjs');
const column = function() {
    return [{
        name: 'login_pv',
        data: [{
            "alias": "17年10月22日",
            "y": 26090,
            "x": 1509206400000
        }, {
            "alias": "17年10月23日",
            "y": 28090,
            "x": 1509292800000
        }, {
            "alias": "17年10月24日",
            "y": 29090,
            "x": 1509379200000
        }]
    }];
}
 
Mock.mock('/mock/dataMdColumn', 'post', column);