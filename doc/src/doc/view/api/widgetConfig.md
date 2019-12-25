[[TOC]]

## 接口含义
获取组件配置信息

## 请求参数

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| id |  组件id，对应新增中的name字段| string|number | ''    |


## 返回数据参数

返回数据整体格式参考[接口规范](#/guide/specification)中的请求成功接口。


res.data

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| configure |  组件详细配置信息，是个字符串化的JSON数据，这部分数据只需在前后端之间透传，无需后端逻辑处理 | ''    |
| title |  组件名称 | stringr | ''    |
| type |  组件类型 | string| ''  |


## 示例


```json
{
    data: {
        title: '下游模块可用性监控',
        type:  'mdcircle'
        configure: '{"style":{"decimals":2,"unit":"%","max":100,"min":0,"threshold":[[0,100,"#ffc91b"]]},
        "datasource":{"api":"/api/get/mdcircle","method":"POST","params":{"dev":true}},
        "title":"下游模块可用性监控-指标1仪表图","data":{"params":{"dev":true}}}'
    }
    success: true,
    message: 'ok'
}
```
