[[TOC]]

## 接口含义
获取已创建仪表盘元信息

## 请求参数

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| title | 仪表盘名称    | String | ''    |
| pageNo  | 当前页码    | number  | 1      |
| pageSize| 当前页显示条数 | number  | 10    |


## 返回数据参数

返回数据整体格式参考[接口规范](#/guide/specification)中的表格分页数据接口。


res.data

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| id | 仪表盘唯一id    | number | -  |
| lastupdate | 上次更新时间    | string  | -    |
| title| 仪表盘名称 | string  | -   |
| updator| 更新人 | string  | -   |


## 示例



```json
{
    data: [
        {
            id: 1801,
            lastupdate: "2018-05-21 10:00:00",
            title: "上游模块可用性监控",
            updator: "张三"
        },
        {
            id: 1802,
            lastupdate: "2018-05-21 11:00:00",
            title: "下游模块可用性监控",
            updator: "李四"
        }
    ],
    page: {
        pageNo: 1
        pageSize: 10
        totalcount: 2
    },
    success: true
}
```
