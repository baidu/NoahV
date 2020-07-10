[[TOC]]
## 概述

NoahV致力于解决运维领域中运维平台研发上手难、周期长、效果不佳；重复造轮子；没有统一的规范，UI风格、交互各不相同，造成维护成本高而且用户体验差等问题

在开始之前，推荐先学习 <a href="https://cn.vuejs.org/" target="_blank">vuejs</a> 的相关知识，并确保正确安装和配置了 <a href="https://nodejs.org/en/" target="_blank">Node.js</a> v6.5 或以上。

## 标准开发
实际项目中，对代码有构建、调试、代理、打包部署等一系列工程化的需求。我们提供了一准套的工具：提供了统一的研发部署、构建调试功能。
### 安装脚手架工具

noahv-cli 是为了提高开发效率而基于NoahV开发的的脚手架工具，请按照以下步骤安装使用：

```shell
$  npm install noahv-cli -g
$  noahv --help
```

### 创建项目
使用命令行工具初始化一个项目

```shell
$  mkdir project && cd project && noahv init
```
工具会自动获取框架的最新版本代码并自动安装依赖，关于各个目录的作用请参考目录结构章节。

### 创建页面
使用`noahv create list`命令创建一个基础的列表页面

```shell
$  noahv create list
```

运行命令后需要输入新增加页面的路径，输入`test/list`，该命令会在src目录下创建test目录，并生成list.vue文件，该文件中是该示例表格页面的配置信息，同时会自动添加路由信息以及添加该vue文件对应的单测模板文件。

目前noahv create可选的创建类型有：

* action (普通的空白页面)
* list (列表页面)
* filterList (带筛选表单的列表页面)
* form (表单页面)
* chart (时序趋势图页面)
* api (模拟数据文件，详见<a href="#/guide/mockup">模拟数据创建</a>)
* test (单测模板)

### 开发调试
执行如下命令一键启动调试，访问 <a href="http://127.0.0.1:8088?em" target="_blank">http://127.0.0.1:8088?em</a> 查看效果。

访问 <a href="http://127.0.0.1:8088/?em#/test/list" target="_blank">http://127.0.0.1:8088/?em#/test/list</a>查看上述创建的`test/list`页面，

```
$  noahv start
```

如果希望改变启动端口，可以在`noahv start`命令后加端口号，如：`noahv start 8089`

### 修改创建的模板页面

创建好的模板页面能够直接运行，根据需要可以调整模板页面，不同的模板页面有不同的功能，详情请参考[模板文档](#/doc/template/basic-table)，保存之后浏览器会自动刷新。

### 配置顶部菜单栏

将上述创建的test/list页面配置到顶部菜单栏中，可以通过点击菜单栏直接访问该页面打开src/common目录下的header.js文件，在header字段中加入如下配置，既可以在导航栏中看到创建的页面
```
export default {
    header: [
        {
            label: '快速开始示例',
            key: 'test/list',
            link: 'test/list'
        }
    ]
}
```
菜单栏详细配置，请参考文档 <a href="#/guide/menu">菜单栏配置</a> 。
