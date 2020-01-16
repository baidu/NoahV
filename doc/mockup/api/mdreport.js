/* eslint-disable */
const Mock = require('mockjs');

const report = function() {
    return {
    	"data": {
        	configure : '{"title":"服务B可用性报表","data":{"caption":"子服务","namespace":["2.case-basic.service","1.case-basic.service"],"comments":"说明：可以配置报表相关说明，如指标含义等","columns":[{"source":"origin","metric":"#{metric1}-#{metric2}","statistics":"sum","header":"指标1","alias":"alias1","unit":"%","decimals":3,"threshold":[[0,90,"#ff0000"],[90,95,"#0000ff"],[99,100,"green"]],"timeType":"relative","time":"before(2h)","total":"sum","use":true,"offset":"-1d"},{"source":"origin","metric":"#{metric1}-#{metric2}","statistics":"sum","group":"指标组","header":"指标2","alias":"alias2","unit":"%","decimals":3,"threshold":[[0,90,"#ff0000"],[90,95,"#0000ff"],[99,100,"green"]],"timeType":"relative","time":"before(2h)","total":null,"use":true,"offset":"-1d"},{"source":"origin","group":"指标组","header":"指标3","alias":"alias3","metric":"#{metric1}-#{metric2}","unit":"%","decimals":3,"threshold":[[0,90,"#ff0000"],[90,95,"#0000ff"],[99,100,"green"]],"total":"avg"},{"source":"column","header":"指标计算(求平均)","metric":"(#{alias1}+#{alias3})/2","unit":"%","decimals":3,"threshold":[[null,90,"red"],[90,null,"yellow"],[99,100,"green"]],"total":"avg","use":true}]}}'
        },
    	success: true
    };
}
 
Mock.mock('/mock/mdreport', 'post', report);