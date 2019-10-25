## 概述
本章主要介绍NoahV项目的构建部署相关知识。

在本地开发时，我们使用 `noahv start` 命令启动服务，但在应用部署的时候不可以再这样使用，`noahv start`会针对本地开发做很多处理，而生产运行需要一个更加简单稳定的方式。所以本章主要讲解如何部署你的应用。

## 构建
 
项目初始化后目录中会自带一个 `build.sh` 的文件，该文件主要是执行的代码编译框架的过程，经过该脚本构建之后会将所有的配置文件和依赖进行压缩合并，在output目录下产出一个 `noahv.tar.gz` 的包，压缩包中的文件结构如下所示：

<div class="normal-code">

```bash
noahv.tar.gz
├── static (js/css/image)
└── index.html (入口文件)
```
</div>


<!-- 对于百度内部的项目，一般是通过 AGILE 平台来构建，在初始化的项目根目录中加入 AGILE 平台的 `BCLOUD` 文件，然后在该文件中执行 `sh build.sh` 即可，如下所示为示例的BCLOUD内容：
<div class="normal-code">

```bash
BUILD_SUBMITTER -e UBUNTU -x -m baidu/path/code -c "cd baidu/path/code && sh build.sh" -u ./
```

其中`baidu/path/code` 为你的代码路径

</div> -->

<!-- 关于AGILE和BCLOUD如有更多的疑问，可以参考[AGILE用户手册]() 或者咨询AGILE客服。 -->

## 部署

目前NoahV构建之后暂不支持独立部署，而是作为静态文件随API server一起部署，一般是将上述静态文件放到对应的后端框架的指定目录中


如对于 java spring 框架，将压缩包解压到 `static` 目录中，将入口指到 `static/index.html` 即可。



