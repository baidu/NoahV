
## 概述

使用NoahV框架搭建应用，提供接口需要遵从以下格式


## 请求成功接口格式
<pre>
{
    "success": true,   // 成功接口必须返回success为true
    "message": "ok"   // message信息为提供的额外信息，如果请求成功的情况下可以为空
    "data":  {name: "liming"}                        // object
             [{name: "liming"}, {name: "fengchengcheng"}]  //数组
             {}      // 如果是提交表单这类API，没有数据需要返回的话，可以返回空的object
}
</pre>
<br>
<br>

## 请求失败接口格式
<pre>
{
    "success": false,        // 失败接口必须返回success为false
    "message": "错误信息"     // message是用来提示用户那里出错的信息
    "data": []              //  data可为空数组或者空的object 
}
</pre>
<br>
<br>

## 表格分页数据接口（适用于需要后端分页的情况）
<pre>
{
    "success": true,
    "message": "ok",          // 可省略
    "page" {
        "totalCount": Number  // 总的条数
        "pageNo": Number      // 当前页码
        "pageSize": Number    // 每页显示条数
    }
    "data": []                // 当前页码的数据，格式必须是数组
}
</pre>

## 登录跳转接口
当接口有鉴权，前端请求数据发现权限校验不通过是，需要让用户跳转到登录地址，因为是ajax请求，如果直接返回302，登录地址和当前地址不一致时候，可能存在跨域问题。这时候要求接口按照如下格式返回数据，前端在收到对应数据格式之后，在前端做跳转，绕过跨域问题。
<pre>
{
    "success": true,
    "message": "ok",          // 可省略
    "data": [
        redirect: 'http://xx.baidu.com' // 需要跳转到的登录页
    ]                
}
</pre>

## 获取右上角用户名接口格式
<pre>
{
    "success": true,
    "message": "ok",          // 可省略
    "data": {
       userName: '张三' // 当前登录用户
    }
}
</pre>

<style lang="less" scoped>
pre {
     background: #f6f6f6;
}
</style>