## ChangeLog

## 1.1.9
* [功能优化] 趋势图组件，纵坐标轴缩写优化，默认保留一位小数点，可以调用函数自定义保留的小数点的位数

## 1.1.8
* [功能优化] 时间组件，暴露更多参数到disabledHandler，支持更细粒度对禁止时间的控制。

## 1.1.7
* [功能优化] NvIcon组件，支持添加tooltip文字提示的功能。
* [功能优化] 时间组件，优化时间选择交互与提示信息等用户体验类问题。

## 1.1.6
* [功能优化] 时间组件，优化时间选择交互与提示信息等用户体验类问题。

## 1.1.5
* [功能修复] 修复趋势图组件在刷新数据的时候原始数据会保留的问题。

## 1.1.4
* [功能新增] NvDutyTable组件，支持自定义配置工作日、休息日。

## 1.1.3
* [功能优化] NvEllipsis组件，content 和 toolTip 支持传入html。

## 1.1.2
* [功能优化] NvTrend组件，添加refresh方法，支持趋势图组件重新渲染新数据。

## 1.1.1
* [功能优化] NvDatePicker组件，支持禁止日期点击时的提示信息可配置化。
* [功能修复] NvTree组件，修复子节点取消勾选时，祖先节点的状态更新错误问题。

## 1.1.0
* [功能新增] 组件库新增NvEllipsis组件
* [功能更新] 依赖组件库iview升级到3.5.1

## 1.0.21
* [功能优化] NvTree组件，扩展收起/展开图标可点击区域。

## 1.0.20
* [功能修复] 修复nv-cascaderSelect组件中，文件路径引用兼容问题。

## 1.0.19
* [功能新增] 组件库新增nv-cascaderSelect组件。

## 1.0.18
* [功能新增] nv-trend组件新增支持展示无数据提示。

## 1.0.17
* [新增功能] nv-icon组件，新增noahv-icon-web-mo、noahv-icon-manage、noahv-icon-room-mo三个图标

## 1.0.16
* [功能优化] NvPipline组件暴露cardMax、nodeMax配置项；NvTransfer组件暴露勾选、移动事件；

## 1.0.15
* [功能新增] 组件库新增NvPipline、NvTransfer组件。

## 1.0.14
* [功能新增] 趋势图组件：支持配置 requestConfig，可设置种请求头；支持传入trendData直接渲染；支持传入 seriesFilter 函数，在趋势图渲染前，对数据进行操作。

## 1.0.13
* [功能修复] NvTextline组件，修复firefox浏览器下的样式计算错误问题。

## 1.0.12
* [功能修复] NvTrend组件，优化性能问题

## 1.0.11
* [功能修复] NvDatePicker组件，修复面板关闭状态下，错误触发on-ok事件问题

## 1.0.10
* [功能新增] NvTrend组件支持自定义请求配置requestConfig
* [功能修复] NvForm组件中select标签中slot位置错误问题修复

## 1.0.9
* [功能新增] NvTrend组件新增dataFilter属性，可以在请求到数据之后对数据做格式转换
* [功能新增] NvTrend组件新增header-right，可以在标题页插入插槽自定义内容
* [功能新增] NvTrend组件新增懒加载和tooltip同步功能

## 1.0.8
* [修复] NvTable组件，修复必须填写url，之后data才能生效的问题
* [功能新增] NvTable组件items属性新增slot插槽，支持项后增加自定义内容
* [功能新增] NvForm组件新增highlight-row属性与on-current-row-click事件，支持高亮选中的行，即单选

## 1.0.7
* [修复] NvDutyTable组件最大日期和最小日期计算

## 1.0.6
* [修复] NvDutyTable组件时间计算异常

## 1.0.5
* [修复] NvTree组件，补充单元测试用例
* [修复] NvDatePicker组件，修复双向绑定时取消按钮清除日期不符合预期问题
* [功能新增] NvDatePicker组件，添加支持限制时间选择跨度的配置功能
* [功能新增] NvSearch组件，添加maxlength字段用于限制最大输入长度

## 1.0.4
* [修复] 升级依赖版本和优化Webpack配置
* [功能新增] 新增值班表组件
* [功能新增] 接入coveralls单元测试检查


## 1.0.3
* [修复] 修复uuid依赖信息缺失问题

## 1.0.2
* [修复] 梳理dev依赖，升级依赖到最新版本

## 1.0.1 
* [修复] 修改文件元信息

## 1.0.0 
* [NPM发布] 在NPM上首次发布该模块代码


