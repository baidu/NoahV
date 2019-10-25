## 接口含义
更新仪表盘布局，拖动页面触发

## 请求参数

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| widgets |  仪表盘布局配置，格式为JSON，但在提交时转换成了string | string | ''    |


### widgets参数示例

widgets参数为一个二维数组，分表表示行和列。


| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| path |  对应新增中的name字段 | string|number | ''    |
| type |  仪表盘类型 | string | ''    |
| id |  对应仪表盘id | number | ''    |
| title |  组件展示名称 | string | ''    |


<div class="normal-code">


```
[
    [
        {
            "path": "1678359_1678360",
            "type": "WIDGETS",
            "id": "1678360"
        }
    ],
    [
        {
            "path": "_1678352_1678358",
            "type": "mdcircle",
            "id": "1678358"
        },
        {
            "path": "1678359_1678361",
            "type": "mdcircle",
            "id": "1678360"
        },
        {
            "path": "_1678352_1678359",
            "type": "mdcircle",
            "id": "1678359"
        }
    ],
    [
        {
            "path": "_1678352_1678355",
            "type": "billboard",
            "id": "1678355"
        }
    ],
    [
        {
            "path": "_1678352_1678354",
            "type": "billboard",
            "id": "1678354"
        },
        {
            "path": "_1678352_1678356",
            "type": "mdtable",
            "id": "1678356"
        }
    ]
]
```
</div>



## 返回数据参数

返回数据整体格式参考[接口规范](#/guide/specification)中的请求成功接口。


res.data

空


### 示例

<div class="normal-code">

```
{
    data: {
    }
    success: true,
    message: 'ok'
}
```
</div>
