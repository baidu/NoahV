## 概述
仪表盘整体功能需要提供12个接口，其中仪表盘管理页面4个、仪表盘综合配置页面5个、组件配置页面2个、仪表盘查看页面1个。

在项目目录 `src/view/api/config.js` 文件中维护了仪表盘所有的接口配置信息，可根据需要替换接口路径，但请保留key值不变。

<div class="normal-code">

```
// 仪表盘管理页面

// 1.获取已有仪表盘信息
dashboardList: '/api/dashboard/list',
// 2.新建仪表盘
dashboardCreate: '/api/dashboard/create',
// 3.复制仪表盘
dashboardCopy: '/api/conf/copy',
// 4.删除仪表盘
dashboardDelete: '/api/dashboard/delete',


// 仪表盘综合配置页面

// 1.更新仪表盘基础信息(名称&是否自动刷新)
updateMeta: '/api/dashboard/updateMeta',
// 2.新增组件(点击加号)
widgetCreate: '/api/dashboard/widgetscreate',
// 3.删除组件
widgetDelete: '/api/dashboard/widgetsdelete',
// 4.拷贝组件
widgetCopy: '/api/dashboard/widgetscopy',
// 5.更改仪表盘布局(拖动时)
dashboardUpdate: '/api/dashboard/updatelayout',

// 组件配置页面

// 1.获取组件配置信息
widgetConfig: '/api/conf/get',

// 2.保存组件配置
widgetSave: '/api/conf/update',


// 仪表盘查看页面

// 1.获取仪表盘配置
dashboardGet: '/api/dashboard/get'
```
</div>


## 各接口格式和参数

参考各个接口配置。

