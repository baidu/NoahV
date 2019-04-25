const Mock = require('mockjs');
const trend = function() {
    return {
        "data": [{
            name: 'read', 
            data: [[1501220160000, 30], [1501220600000, 100], [1501220680000, 300]]
        }, 
        {
            name: 'write', 
            data: [[1501220160000, 10], [1501220600000, 200], [1501220680000, 100]]
        },
        {
            name: 'black', 
            data: [[1501220160000, 70], [1501220600000, 230], [1501220680000, 200]]
        }],
        "success": true
    };
}
 
Mock.mock('/mock/dataTrend', 'post', trend);