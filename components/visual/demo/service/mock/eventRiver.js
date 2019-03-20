/* eslint-disable */
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
    return {
        data: {
            "configure": '{"title":"事件流图1","data":{"schema":[{"name":"机房1","type":"NJ01error","checked":true},{"name":"机房二","type":"GZHXYerror","checked":true},{"name":"机房三","type":"GZNSwarning","checked":true},{"name":"机房四","type":"BJYZwarning","checked":true},{"name":"机房五","type":"NJ01warning","checked":true,"eventDetailMap":[{"name":"创造者","key":"product.operator","type":"arr"},{"name":"异常类型","key":"type","type":"text"},{"name":"详情","key":"url","type":"link"}]}]},"timeType":"fixed","time":"before(2h)"}'
        },
        success: true
    }
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/mock/eventRiver', 'post', produceNewsData);
