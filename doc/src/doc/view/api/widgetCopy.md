
## 接口含义
在仪表盘综合管理页面中复制组件


## 请求参数

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| widgetsname | 组件名称，对应新增中的name字段 | number|string | -    |


## 返回数据参数

返回数据整体格式参考[接口规范](#/guide/specification)中的请求成功接口。


res.data

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| id | 新复制组件对应的仪表盘id | number | -    |
| name | 新复制组件名称，应保证唯一性 | number|string | -    |
| title | 新复制组件展示名称 | string | 'WIDGETS'   |
| type | 新复制组件类型 | string | 'WIDGETS'    |

### 示例

<div class="normal-code">

```
{
    data: {
        id: 1803,
        name: '1803_1012',
        title: '-',
        type: 'WIDGETS'
    }
    success: true,
    message: 'ok'
}
```
</div>
