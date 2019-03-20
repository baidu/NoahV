/* eslint-disable */
const Mock = require('mockjs');
const custombox = function() {
    return '<style>#CUSTOM-DEMO p { padding: 10px;} #CUSTOM-DEMO iframe {display: block;width: 100%;height: 500px;}</style><div id="CUSTOM-DEMO"><p>嵌入百度首页：</p><iframe src="https://www.baidu.com/"></iframe></div>'
}
Mock.mock('/mock/customBox', 'post', custombox);