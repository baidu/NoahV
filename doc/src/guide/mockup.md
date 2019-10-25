
## 概述

在前后端分离的开发实践中，我们发现前端在和后端接口联调数据之前，先使用模拟数据进行开发会加快开发进度。

本章主要介绍如何在框架中使用模拟数据的功能，注意如果在后端接口已经准备好的情况下，也可以直接使用代理功能连接API server开发。

## 如何开启模拟数据功能

框架中已经内置模拟数据的功能，只需在请求的URL中加入标识符`?em`,即为enable mockup的缩写。

如我们要访问`http://127.0.0.1:8088/#/test/list`页面，如果希望该页面中发起的ajax请求走模拟数据，只需在`#`号前面加上?em参数即可

示例：

```
http://127.0.0.1:8088/?em#/test/list
```
## 如何创建模拟数据
在前面的章节中我们介绍了脚手架可以创建页面，同样的脚手架也可以创建模拟数据

运行`noahv create`命令，可以看到有个api选项，输入api之后会要求输入路径，这个路径可以保持和你代码中ajax的请求路径一致。

假设现在需要请求`/api/table`这个地址的模拟数据，path只需输入`api/table`即可。

输入完路径之后需要选择模拟数据的模板，当前主要支持三种：
* 1.ok 这种为通用的请求成功接口模板，数据部分可以是数组，也可以是对象
* 2.list 这种为表格分页数据接口模板，主要多了page字段信息，
* 3.fail 这种为通用的请求失败接口模板


输入完类型之后，会在mockup目录下创建对应的文件，可以实时修改对应文件中的数据部分，刷新页面查看请求数据。

```
➜  noahv-doc git:(master) ✗ noahv create
noahv-cli INFO please enter <type> for `noahv create`
? action | list | filterList | chart | form | api | test
 api
noahv-cli INFO please enter <path> for `noahv create`
? <path> such as `api/table` api/table
? ok | list | fail
 ok
+ mockup/api/table.js
noahv-cli ok creat success! 

```


<style lang="less" scoped>
pre {
     background: #f6f6f6;
}
</style>