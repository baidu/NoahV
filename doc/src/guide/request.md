[[TOC]]

## 概述

上一章我们介绍了NoahV统一的接口规范，本章我们介绍NoahV统一的数据请求工具NoahV-request。

NoahV-request是基于Axios请求工具来扩展的，Axios是Vue.js作者尤雨溪推荐在Vue.js项目中使用的数据请求库，Axios本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范。

NoahV-request在Axios的基础上做了如下处理：

* 1.统一的接口错误处理
* 2.全局的加载提示
* 3.支持restful风格接口定义
* 4.支持请求各个阶段的hook

## 如何使用
NoahV-request的数据请求对象`$request`已经绑定到了Vue实例上，所以在Vue实例的生命周期内都可以通过`this.$request`来调用数据请求方法。

数据请求方法支持的常见参数如下：

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| url |    目标URL | string | ''    |
| method |   请求方法 | string | 'get'    |
| data |   请求参数，仅仅适用于`PUT`、 `POST`、`PATCH`，GET方法请使用params| object | -    |
| params |   请求URL参数 | object | ''    |
| showLoading |  是否展示全局Loading | boolean | true   |
| pathArgs |  用于替换restful风格接口中的变量 | object | -   |


除上述参数外，还支持其他的一些额外参数，请参考[Axios文档](https://github.com/axios/axios#request-config)。

### 使用示例

```javascript
this.$request({
    url: '/api/test',
    method: 'post',
    data: {
        dev: true
    },
    showLoading: true
}).then(function(data) {
    // do with data
})
```



## NoahV-request工具功能

### 统一的接口错误处理
NoahV-request会为每一个请求匹配默认的接口返回处理程序，如果接口返回非200状态码，会自动全局弹出错误提示，如果希望自定义错误处理，请参考`beforeFailure`相关hook。

### 全局的加载提示
默认情况下，每个接口都会触发覆盖全屏幕的加载提示，如果不希望有,可以在接口请求配置中设置`showLoading`为`false`,如果希望所有接口都不默认触发加载提示，请参考`showGlobalLoading`、`hideGlobalLoading`相关hook。

### 支持Restful风格接口定义
如果接口中含有大括号包含的变量，NoahV-request会在接口请求之前进行变量替换，如`{name}`,替换的真实值来自于`pathArgs`、`params`、`data`，优先使用`pathArgs`,也建议需要替换的时候提供`pathArgs`，避免和请求参数混淆。
也可以自定义Restful处理规则，请参考`handlerRestfulUrl`相关hook。

### 支持hooks全局处理

在项目根目录`src/common/hook/`下有一个`ajax.js`文件，请在该文件中添加hook。示例如下，记得检查`src/common/hook/ajax.js`文件是否在`src/main.js`中import，如果没有，请手动添加下`import 'src/common/hook/ajax'`。


```javascript
import request from 'noahv-request';
request.hooks.beforeRequest = function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config;
}
```


支持hooks信息如下
* 1.beforeRequest （在请求发出前触发，参数为当前的config,如需对config做变换处理，请将处理之后的数据return）
* 2.beforeSuccess（在请求回来后触发，参数为当前的response,如需对response做变换处理，请将处理之后的数据return）
* 3.beforeFailure（在请求失败后触发，参数为error信息，如果希望默认的错误弹出不出现，请将`error.isSilent`的值设置为true）
* 4.beforeResponse（在请求成功后，即将调用回调函数前触发，参数为response信息，如需对response做变换处理，请将处理之后的数据return）
* 5.beforeAdapter（在请求参数处理阶段触发，具体请参考Axios的adapter方法）
* 6.showGlobalLoading（在请求发出前触发）
* 7.hideGlobalLoading（在请求回来后触发）
* 8.handlerRestfulUrl（在请求参数处理阶段触发）
