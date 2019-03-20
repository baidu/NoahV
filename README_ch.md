# NoahV

[English](./README.md) | 简体中文

NoahV是一个基于vue开发的前端应用框架，主要适用于运维监控、数据分析等场景，同时也适用于常见的后台管理系统。

特性：

* 上手简单，提供常用的各类组件，快速开始前端开发
* 导航栏、页面布局JSON配置，无需代码逻辑开发
* API数据模拟和API数据代理，让前后端不再耦合，联调更简单，效率更高 
* 数据仪表盘功能，满足常见的数据可视化需求，助力数据分析场景
* 实用的脚手架功能，项目初始化、模板复用、模拟数据创建、调试server启动、框架升级一行命令通通搞定



## 快速开始

NoahV框架依赖Nodejs 6.0，在执行如下步骤之前，请确保已经安装 <a href="https://nodejs.org/en/">Node.js</a> v6.0 或以上。

1.安装脚手架工具

```shell
# 安装noahv-cli
$   npm install noahv-cli -g

# 查看使用帮助
$   noahv --help
```

2.初始化一个项目

```shell
# 创建一个空目录，进入目录中，运行noahv init 命令创建一个通用项目
$   mkdir project && cd project && noahv init

# 运行noahv init --dashboard 命令创建一个包含仪表盘功能的项目
$   mkdir project && cd project && noahv init --dashboard
```

3.运行项目

```shell
# 在项目根目录启动调试server
$   noahv start 
```

4.复用模板

```shell
# 在项目根目录复用模板创建页面
$   noahv create 

# 根据提示选择需要创建的页面类型，目前支持form、list、filterList、chart四种模板类型
```


## License

Apache License 2.0

