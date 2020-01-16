[[TOC]]

## 接口含义
更新仪表盘部分元信息，主要是仪表盘名称、是否开启自动刷新配置

## 请求参数

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| title |  仪表盘名称| string | ''    |
| configure | 是否自动刷新，当开启自动刷新时 值为：`{"refresh": true}`  | string | '{}' |


## 返回数据参数

返回数据整体格式参考[接口规范](#/guide/specification)中的请求成功接口。


res.data

空


## 示例


```json
{
    data: {
    }
    success: true,
    message: 'ok'
}
```
