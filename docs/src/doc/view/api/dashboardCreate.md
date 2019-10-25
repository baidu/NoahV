## 接口含义
新建仪表盘接口

## 请求参数

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| title |   仪表盘名称  | String | ''    |


## 返回数据参数

返回数据整体格式参考[接口规范](#/guide/specification)中的请求成功接口。


res.data

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| id | 仪表盘唯一id    | number | -  |


### 示例

<div class="normal-code">

```
{
    data: {
        id: 1803
    }
    success: true,
    message: 'ok'
}
```
</div>
