[[TOC]]

## 概述
本章主要介绍NoahV中业务模板的复用，在 [快速开始](#/guide/quickstart) 中初步介绍了下创建页面配置的功能，这里再展开介绍下模板使用。

## 模板是什么？

模板是根据一定的使用场景将前端的基础组件/功能通过一定的逻辑组合而成，对于相同或相似的场景可以直接复用模板，修改部分参数配置。

如表单模板，将输入框、选择框、时间日历框、提交按钮等组合到一起，加上参数的校验逻辑和提交表单的逻辑以及布局的逻辑就形成了表单模板，如下图所以为通过表单模板组合而成的基本示例：

<!-- <img src="../common/assets/img/form.png" width="900px"> -->


## 已有模板列表

* 1.通用表单模板(form)
* 2.通用表格模板(list)
* 3.通用筛选表格模板(filterList)
* 3.时序趋势图模版(chart)
<!-- * 4.对比趋势图模板(contrastTrend) -->


可以参看 [模板文档](#/doc/template/basic-table) 了解模板的作用和适用场景。


## 如何复用模板

在 [快速开始](#/guide/quickstart) 第一步安装的脚手架工具包含有复用模板的功能，通过运行 `noahv create` 命令可以复用已有的模板，目前支持的模板请参考已有模板列表。

举例：

如想使用通用表单模板，请在初始化之后的项目跟目录中运行 `noahv create form` 命令

以此类推

如想使用通用表格模板，只要运行 `noahv create list`命令

运行上述命令之后会需要输入复用模板到那个地址，请根据实际情况输入路径即可。

## 如何在模板中发起ajax请求
表单模板、表格模板、通用筛选表格模板中已经对业务请求做好了封装处理，无需再额外发起ajax请求，如果基于业务需要需要发起请求，可参照如下方法：
框架中集成了axios工具，并且注入到了vue示例上，在模板中，可以使用如下方式发起请求


```javascript
// post
this.$request({
    url: '/api/table/post',
    method: 'post',
    // 请求数据时展示全局loading
    showLoading: true,
    data: {
        name: 'dev',
        dev: true
    }
}).then(function() {
}) ;
// get
this.$request({
    url: '/api/table/get',
    method: 'get',
    params: {
        name: 'dev',
        dev: true
    }
}).then(function(data) { 
});
// 直接调用get、post方法
this.$request.get('/api/table/get', {
    params: {
        name: 'dev',
        dev: true
    }
}).then(function(data) {
});
this.$request.post('/api/table/post', {
    data: {
        name: 'dev',
        dev: true
    }
}).then(function(data) {
});
```


上述示例中只给出了get、post, restful中的put、delete方法同样是支持的，更多关于请求参数、格式可以参考 [axios官网](https://github.com/axios/axios)

## 示例

:::demo ajax示例
```html
<template>
    <div class="demo-list">ajax请求回的数据为： {{ajaxData}}</div>
</template>
<script>
export default {
    name: 'demo-list',
    created() {
        const self = this;
        self.$request({
            url: '/api/tpl/ajax',
            method: 'post',
            // 请求数据时展示全局loading
            showLoading: true,
            data: {
                name: 'dev',
                dev: true
            }
        }).then(function (res) {
            const data = res.data;
            if (data.success) {
                self.ajaxData = data.data;
            }
            else {
                self.$Message.error(data.message)
            }
        });
    },
    data () {
        return {
            ajaxData: ''
        }
    }
};
</script>
<style lang="less">
    .demo-list {
        padding: 10px;
        border: 1px solid #ccc;
    }
</style>
```
:::

