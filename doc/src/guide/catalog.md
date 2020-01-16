[[TOC]]
## 概述
本章主要介绍NoahV的目录结构，在 [快速开始](#/guide/quickstart) 中大家对框架应该有了大体的了解，对使用工具生成的项目的目录结构一定很好奇，这里将着重介绍各个目录的作用和一些规范。

## 目录结构


```shell
noahv-project
├── mockup
├── node_modules
├── scripts
├── src
│   ├──conmmon
│   │   ├── assets
│   │   │   ├── css
│   │   │   │    ├── components (部分基础组件样式)
│   │   │   │    ├── global.less (全局样式)
│   │   │   │    ├── header.less (头部样式)
│   │   │   │    └── main.less  (样式文件入口)     
│   │   │   └── img
│   │   │        ├── logo.png (默认的logo文件，请根据需要替换)
│   │   │        └── favicon.ico (默认浏览器tab栏的icon，请根据需要替换)
│   │   ├── hook
│   │   │    └── ajax.js (hook文件，可以通过hook的方式介入数据请求，详见数据请求介绍)
│   │   ├── layout
│   │   │    ├── 404.vue (默认404页面)
│   │   │    ├── footer.vue (自定义页脚文件，可以在main.js中引用)
│   │   │    └── layout.vue (自定义布局文件，可以在main.js中引用)
│   │   ├── config.js (保留文件)
│   │   ├── devProxy.js (代理配置文件，详见代理介绍)
│   │   ├── header.js (导航栏配置，当使用系统自带导航时有效)
│   │   └── router.js (路由配置文件)
│   ├── demo (运行demo文件目录，正式发布时可以删除) 
│   ├── store (vuex目录，具体请参考vuex官网)
│   ├── tools (工具模块)
│   │     └── utils.js 通用工具文件
│   └── view (仪表盘目录，仅通过脚手架工具创建仪表盘项目时含有此目录，详情查看仪表盘使用说明部分)
│
├── build.sh (编译脚本)
├── index.html (静态模板)
├── package.json (依赖管理)
└── README.md 
```

## 各目录作用

如上，为框架约定的项目目录，他们的作用分别是：

* `mockup` 该目录为模拟数据文件所在目录
* `scripts` webpack脚本文件，编译脚本文件
* `build.sh` 是项目编译脚本，具体请参考 [构建部署](#/guide/deploy) 
* `src` 该目录为项目代码所在，可以在这里编写配置、编写代码、接入数据
* `src/common` 公共配置/代码，该目录下各个文件的作用见下文。
* `src/Custom directory` 该目录不是真实存在的，通过脚手架工具创建的配置默认是放到该目录下。



## config/common 目录作用

config/common 目录下的各个子目录的作用分别是：

* `assets` 公共的静态文件，如图片、样式等
* `assets/css/header.less` 导航栏样式文件，可以再这儿编写css代码改变导航的样式
* `assets/css/main.less ` 自定义样式文件入口，可以在这儿编写css或者import其他css文件
* `config.js` 预留的配置文件
* `devProxy.js` 开发环境代理配置文件，如果想在开发环境请求不同域下数据，可以在该文件下配置代理，详见 [开发环境代理配置](#/guide/proxy)
* `header.js` 页面头部配置文件、详见 [导航配置](#/guide/menu)
* `router.js` 路由配置文件，通过脚手架命令 `noahv create` 



创建的页面不需要在手动配置路由，如果是自己手动创建的目录或者文件，需要手动添加路由才能访问

另外我们建议在src目录下建立业务目录，将不同模块功能放到不同目录下，如将业务监控相关页面放置到 `src/bussiness` ,将站点监控相关页面放置到 `src/website` 中。
