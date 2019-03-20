/* eslint-disable */
const Mock = require('mockjs');

const report = function() {
    return {
    	"data": {
    		"title": "资源报表conf",
        	configure : '{"title":"资源报表conf","data":{"namespace":["forDemoNamespace"],"comments":"说明","columns":[{"source":"origin","metric":"#{metric1}-#{metric2}","statistics":"sum","group":"","header":"数据1","alias":"alias3","unit":"%","decimals":3,"threshold":[[0,90,"#ff0000"],[90,95,"#0000ff"],[99,100,"green"]],"timeType":"relative","time":"before(2h)","total":"sum","use":true,"offset":"-1d"},{"source":"origin","metric":"#{metric1}-#{metric2}","statistics":"sum","group":"综合数据","header":"数据1","alias":"alias1","unit":"%","decimals":3,"threshold":[[0,90,"#ff0000"],[90,95,"#0000ff"],[99,100,"green"]],"timeType":"relative","time":"before(2h)","total":null,"use":true,"offset":"-1d"},{"source":"origin","group":"综合数据","header":"数据2","alias":"alias2","metric":"#{metric1}-#{metric2}","unit":"%","decimals":3,"threshold":[[0,90,"#ff0000"],[90,95,"#0000ff"],[99,100,"green"]],"total":null,"use":true},{"source":"column","group":"综合数据","header":"列计算","metric":"#{alias3}+#{alias2}","unit":"","decimals":3,"threshold":[[null,90,"red"],[90,null,"yellow"],[99,100,"green"]],"total":"avg","use":true}]},"link":"http://sia.baidu.com"}'
    	},
    	success: true
    };
}
 
Mock.mock('/mock/mdreport', 'post', report);