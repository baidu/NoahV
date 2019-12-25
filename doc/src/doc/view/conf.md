[[TOC]]

## 概述
仪表盘目前支持4种可视化组件，分别是趋势图、仪表图、面板、表格，这四种组件展示的数据也需要通过接口获取，都是比较简单的通用接口格式，只需要约定下字段格式。


## 请求参数

4个可视化组件的请求参数是一样的

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| data | 请求数据 | number | -    |
| time | 时间区间，格式为`2018-09-17 19:00|2018-09-17 21:00` | string | -    |


## 返回数据参数

返回数据整体格式参考[接口规范](#/guide/specification)中的请求成功接口。4种组件的参数和示例如下：


### 趋势图

res.data(Array)

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| data | 详细数据，格式为二维数组, 数组第一项为毫秒时间戳，第二项为具体数据 | Array | -    |
| name | 数据对应名称 | string | -    |

示例


```json
{
    data: [
        {
            name: '指标1,
            data: [
                [1529412540000, 100],
                [1529412600000, 200],
                [1529412660000, 300],
                [1529412720000, 400],
                [1529412840000, 500],
                [1529413080000, 600],
                [1529413090000, 700]
            ]
        },
        {
            name: '指标2,
            data: [
                [1529412540000, 200],
                [1529412600000, 300],
                [1529412660000, 400],
                [1529412720000, 500],
                [1529412840000, 500],
                [1529413080000, 600],
                [1529413090000, 700]

            ]
        }
    ]
    success: true,
    message: 'ok'
}
```


### 仪表图

res(object)

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| data | 数据值，百分比数据值 | number | -    |

示例


```json
{
    data: 99.999999
    success: true,
    message: 'ok'
}
```

### 数据面板

res.data(array)

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| name | 指标性名称 | string | -    |
| value | 指标性数值 | number | -    |
| warning | 是否飘红展示 | boolean | false   |

示例


```json
{
    data: [
        {
            name: '请求平均时长(秒)'
            value: 10,
            warning: true
        },
        {
            name: '请求失败量(个)'
            value: 0
        },
        {
            name: '请求成功率(%)'
            value: 99.9999999
        }
    ],
    success: true,
    message: 'ok'
}
```

### 报表

res.data(array)

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| alias | 维度别名 | string | -    |
| metrics | 指标信息 | object | -    |
| value | 维度真实名称 | string | -   |

示例


```json
{
    data: [
        {
            alias: '维度1'
            metrics: {
                alias1: '维度1下指标1值'
                alias2: '维度1下指标2值'
                alias3: '维度1下指标3值'
            },
            value: '维度1真实名称'
        },
        {
            alias: '维度2'
            metrics: {
                alias1: '维度2下指标1值'
                alias2: '维度下指标2值'
                alias3: '维度2下指标3值'
            },
            value: '维度2真实名称'
        }
    ],
    success: true,
    message: 'ok'
}
```

### 饼图

res.data(array)

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| name | 项目名称 | string | -    |
| value | 项目数值 | number | -   |

示例


```json
{
    data: [{
        name: 'Microsoft Internet Explorer',
        value: 56.33
    }, {
        name: 'Chrome',
        value: 24.03
    }, {
        name: 'Firefox',
        value: 10.38
    }, {
        name: 'Safari',
        value: 4.77
    }, {
        name: 'Opera',
        value: 0.91
    }, {
        name: 'Proprietary or Undetectable',
        value: 0.2
    }],
    success: true,
    message: 'ok'
}
```

### 事件流图

res.data(array)

| 属性  | 说明         | 类型   | 默认值 |
| ----- | ----------- | ------ | ------ |
| events | 事件信息 | array | -    |
| dataSchema | 事件元信息 | array | -   |

示例


```json
{
    "data": {
        "events": [{
            "name": "NJ01warning",
            "eventType": "single",
            "eventList": [{
                "startTime": 1503563160,
                "display": {
                    "type": "NJ01机房异常",
                    "operator": "app",
                    "url": "https://www.noahv.org"
                },
                "endTime": 1503563190
            }, {
                "startTime": 1503563040,
                "display": {
                    "type": "NJ01机房异常",
                    "operator": "app",
                    "url": "https://www.noahv.org"
                },
                "endTime": 1503563100
            }, {
                "startTime": 1503561300,
                "display": {
                    "type": "NJ01机房异常",
                    "operator": "app",
                    "url": "https://www.noahv.org"
                },
                "endTime": 1503561390
            }]
        }, {
            "name": "NJ01error",
            "display": "NJ01机房异常",
            "eventType": "single",
            "eventList": [{
                "startTime": 1503563100,
                "endTime": 1503563160
            }]
        }],
        "dataSchema": [{
            "name": "机房1",
            "type": "NJ01error",
            "checked": true
        },  {
            "name": "机房二",
            "type": "NJ01warning",
            "checked": true,
            "eventDetailMap": [{
                "name": "创造者",
                "key": "product.operator",
                "type": "arr"
            }, {
                "name": "异常类型",
                "key": "type",
                "type": "text"
            }, {
                "name": "详情",
                "key": "url",
                "type": "link"
            }]
        }]
    },
    "success": true
}
```
