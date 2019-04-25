## 接口含义
在仪表盘综合管理页面中新增组件，点击加号新增


## 请求参数

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| line | 新增组件所在仪表盘的行数，应该在当前行的后面追加，也就是说如果当前行已经有组件了，应该在已有的基础上新增 | number | -    |


## 返回数据参数

返回数据整体格式参考[接口规范](#/guide/specification)中的请求成功接口。


res.data

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| id | 组件对应的仪表盘id | number | -    |
| name | 组件名称，应保证唯一性 | number|string | -    |
| title | 组件展示名称 | string | 'WIDGETS'   |
| type | 组件类型 | string | 'WIDGETS'    |

### 示例

<div class="normal-code">

```
{
    data: {
        id: 1803,
        name: '1803_1011',
        title: '-',
        type: 'WIDGETS'
    }
    success: true,
    message: 'ok'
}
```
</div>
