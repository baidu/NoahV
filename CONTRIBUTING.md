# NoahV贡献指南

感谢使用NoahV，NoahV是一个基于Vue技术栈的前端开发框架，旨在通过工程化(脚手架、开发联调工具、编译构建等)和组件化(业务组件、页面模版、仪表盘)两个维度来帮助开发者提升前端开发效率，主要适用于运维、监控、数据报表等常见的后台管理系统。

如果你愿意为 NoahV 贡献代码或提供建议，请阅读以下内容。

## 1.前言

在贡献代码或提供建议前请先了解下NoahV开源代码的目录结构：

NoahV开源代码主要包括5个大块，分别是：组件库、功能模块(导航栏/页面布局配置功能、多语言、数据模拟、数据请求、运行统计)、项目模版、脚手架、使用文档，他们分别对应的目录是：

- components(组件库)
	- common (包含业务组件和模版)
	- visual (可视化组件)
	-
- packages (功能模块)
	- noahv-core (处理框架的启动相关功能)
	- noahv-i18n (多语言)
	- noahv-mockup (处理模拟数据)
	- noahv-request (封装数据请求)
	- noahv-tongji (数据统计)
	-
- template (项目模板)
	- common (通用项目模版)
	- dashboard (包含仪表盘功能的项目模版)
	- common-ts  (通用项目模版 typescript版本)
	-
- tools/noahv-cli (脚手架)
- doc (使用文档)

## 2.Pull Request 规范

- 1.fork 一份 NoahV 的完整代码到自己的 Github 上。
- 2.将 fork 的代码 clone 到本地，进行修改。
- 3.按照[commit信息填写规范](./COMMIT.md)填写 commit 信息。
- 4.提交 PR 前请 rebase。
- 5.PR 请提交到 dev 分支，直接提交到 master 分支的 PR 会被 drop。
- 6.请在 PR 中尽可能详细的描述提交代码解决的问题。


## 3.Issue 规范

- 1.在提交 issue 可以先搜索下是否已有相关的 issue。
- 2.如果是程序运行报错，请提供下使用的 NoahV 的版本以及当前系统的版本信息。


