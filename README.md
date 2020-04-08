# NoahV

简体中文 | [English](./README_EN.md)

<a href="https://travis-ci.com/baidu/NoahV">
	<img src="https://img.shields.io/travis/com/baidu/NoahV?style=flat-square"  alt="build">
</a>

<a href="https://github.com/baidu/NoahV/blob/master/LICENSE">
	<img src="https://img.shields.io/github/license/baidu/NoahV.svg?style=popout-square" alt="license">
</a>

<a href="https://github.com/baidu/NoahV/issues">
	<img src="https://img.shields.io/github/issues/baidu/NoahV.svg?style=flat-square" alt="open issues">
</a>

<a href="https://github.com/baidu/NoahV/commits/master">
	<img src="https://img.shields.io/github/commit-activity/w/baidu/NoahV.svg?style=flat-square" alt="commit">
</a>

NoahV是一个基于vue开发的前端应用框架，主要适用于常见的后台管理系统，文档地址：[https://baidu.github.io/NoahV](https://baidu.github.io/NoahV), 如访问速度较慢，可尝试访问如下地址：[https://noahv.gitee.io/](https://noahv.gitee.io/)

特性：

* 上手简单，提供常用的各类组件，快速开始前端开发
* 导航栏、页面布局JSON配置，无需代码逻辑开发
* API数据模拟和API数据代理，让前后端不再耦合，联调更简单，效率更高 
* 数据仪表盘功能，满足常见的数据可视化需求，助力数据分析场景
* 内置模版，只需简单配置就可以开发出想要的页面，非前端同学也能快速上手开发
* 实用的脚手架功能，项目初始化、模板复用、模拟数据创建、调试server启动、框架升级一行命令通通搞定

## 快速开始

NoahV框架依赖Nodejs 6.0，在执行如下步骤之前，请确保已经安装 <a href="https://nodejs.org/en/">Node.js</a> v6.0 或以上。

1.安装脚手架工具

```shell
# 安装noahv-cli
$ npm install noahv-cli -g

# 查看使用帮助
$ noahv --help
```

2.初始化一个项目

```shell
# 创建一个空目录，进入目录中，运行noahv init 命令创建一个通用项目
$ mkdir project && cd project && noahv init

# 运行noahv init --dashboard 命令创建一个包含仪表盘功能的项目
$ mkdir project && cd project && noahv init --dashboard
```

3.运行项目

```shell
# 在项目根目录启动调试server
$ noahv start 
```

4.复用模板

```shell
# 在项目根目录复用模板创建页面
$ noahv create 

# 根据提示选择需要创建的页面类型，目前支持form、list、filterList、chart四种模板类型
```

详细信息请查看 [模板使用](https://baidu.github.io/NoahV/#/guide/tpl)

更多关于框架的使用请查看 [NoahV开发指南](https://baidu.github.io/NoahV/#/guide/about)


## 讨论

| 微信群 |    GitHub issues                                               |
| ---------- | ------------------------------------------------------------ |
| <img src="https://noahv.cdn.bcebos.com/github%2Ff414efb2572218cd6756ca483.jpg" width="120px"> | [issues](https://github.com/baidu/NoahV/issues) |

## 参与共建

欢迎大家一起参与NoahV的共建，详情请参考[贡献指南](./CONTRIBUTING.md).

## License

Apache License 2.0

