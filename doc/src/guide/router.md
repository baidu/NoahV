[[TOC]]

## 概述

本章节主要介绍router.js文件，通常情况下我们创建了一个页面，如果需要在浏览器中通过不同路径访问到不同的页面，这时候我们就需要在访问路径和页面之间建立一个映射，router.js中就是保存这种映射关系，使用`noahv create`创建的页面会自动创建路由映射。

## 基础示例
如下所示为示例文件，该文件是一个数据，保存着一条条的映射关系，每一条映射关系都是一个object.

object中主要包含如下字段：
* 1.component 主要是对应我们创建的页面文件，可以是个数组，必需参数
* 2.path 浏览器中的访问路径，必需参数
* 3.entry 标识该条路由是否是系统默认路由，如果设置为true页面加载完成后自动进入该条路由，当所有映射都未添加该参数时，默认进入数组中第一条路由，可选参数


```javascript

export default [
    // Keep this line if you want auto add router by noahv create
    {
        // file path，string or object
        component: r => require.ensure([], () => r(require('src/demo/table/tableDemo')), 'tableDemo'),
        // hash name,unique
        path: '/tableDemo'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/form/formDemo')), 'formDemo'),
        path: '/formDemo'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/table/filterTableDemo')), 'filterTableDemo'),
        path: '/filterTableDemo'
    }
];
```

### router.js 配置说明

| 属性         | 说明                                   | 示例              |默认值      |
| ------------ | -------------------------------------- | --------------    |-|
| path         | 必需，路由地址，须全局唯一                   | path: '/home'     |-|
| component    | 必需，路由指向的文件或页面                   | component: r => require.ensure([], () => r(require('../../demo/home')), 'home')            |-|
| meta         | 配置点击选中效果的连带效应，详见组合示例| -                |-|
| entry         | 是否是默认入口，当为true的时候，该条路由为默认路由| entry:true                |-|

