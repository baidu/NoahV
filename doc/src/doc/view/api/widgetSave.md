[[TOC]]
## 接口含义
保存组件配置信息

## 请求参数

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| id |  组件id，对应新增中的name字段| string|number | ''    |
| type |  组件类型 | string| | ''    |
| configure |  组件详细配置，具体字段含义可以查看[可视化UI配置](#/doc/view/conf)部分文档 | string| | ''    |

## 返回数据参数

返回数据整体格式参考[接口规范](#/guide/specification)中的请求成功接口。


res.data
空


## 示例


```json
{
    data: {}
    success: true,
    message: 'ok'
}
```
