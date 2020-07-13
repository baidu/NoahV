[[TOC]]

## 概述

可视化组件中的事件流图组件，分为事件流图与事件列表两种展现形式对事件的分布情况进行展示。提供了一种方便直观的图形展示方式，用来查看一段时间范围内所有相关事件的概要信息


## 示例

### 基础使用示例
:::demo 
```html
<template>
    <div>
        <NvDatePicker
            type="daterangetime"
            placeholder="选择日期"
            :width="300"
            :dateFormat="dateFormat"
            :options="options"
            :value="value"
            @on-change="saveTime"
            @on-confirm="changeTime">
        </NvDatePicker>
        <br />
        <br />
        <NvMDEventRiverView
             :conf="conf"
             :dataUrl="dataUrl"
             :params="params" />
    </div>
</template>
<script>
import m from 'moment';
const DateFormat = "YYYY-MM-DD HH:mm:ss";
const param = {
    start: '2017-08-24 15:41:00',
    end: '2017-08-24 17:51:00'
};
export default {
    data() {
        return {
            params: param,
            dataUrl: '/mock/eventlist',
            dateFormat: DateFormat,
            value: [],
            options: {
                position: 'top',
                shortcuts: [
                    {
                        text: '2小时',
                        defaultSelected: true,
                        value() {
                            return [
                                m().subtract(2, 'hours').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '6小时',
                        value() {
                            return [
                                m().subtract(6, 'hours').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '12小时',
                        value() {
                            return [
                                m().subtract(12, 'hours').toDate(),
                                m().toDate()
                            ];
                        }
                    }
                ]
            },
            conf: {}
        };
    },
    methods: {
        saveTime(times) {
            this.times = times;
        },
        changeTime() {
            if (this.times && Array.isArray(this.times) && this.times.length > 1) {
                this.params = {
                    start: this.times[0],
                    end: this.times[1]
                };
            }
        }
    }
};
</script>
```
:::

### 配置path从API获取conf配置信息
:::demo 
```html
<template>
    <div>
        <NvMDEventRiverView
             :path="eventRiverPathName"
             :url="url"
             :dataUrl="dataUrl"
             :params="params" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            params: {
                start: '2017-08-24 15:41:00',
                end: '2017-08-24 17:51:00'
            },
            dataUrl: '/mock/eventlist',
            eventRiverPathName: 'eventRiverPathName',
            url: '/mock/eventRiver',
        };
    }
};
</script>
```
:::

### 事件列表
:::demo 
```html
<template>
    <div>
        <NvMDEventRiverView
            :conf="conf"
            :dataUrl="dataUrl"
            :params="params" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            params: {
                start: '2017-08-24 15:41:00',
                end: '2017-08-24 17:51:00'
            },
            conf: {
              style: {
                type: 'list'
              }
            },
            dataUrl: '/mock/eventlist',
            eventRiverPathName: 'eventRiverPathName',
            url: '/mock/eventRiver',
        };
    }
};
</script>
```
:::

## API

### props

| 属性        | 说明                                                         | 类型                 | 默认值 | 例子                                                     |
| ----------- | ------------------------------------------------------------ | -------------------- | ------ | -------------------------------------------------------- |
| path        | 组件id,组件唯一标识,组件会自行查询配置                       | string               | -      | eventriverPathName                                       |
| conf        | 组件配置,可以直接根据配置进行渲染,详情可看「配置代码格式」，详细字段说明见高级配置 | object               | -      | {}                                                       |
| url         | 获取组件配置的API接口，可在visualWidgetConf中统一配置        | string               | -      | /mock/eventRiver                                         |
| dataUrl     | 获取数据路径，可在visualWidgetConf中统一配置                 | string               | -      | /mock/eventlist                                          |
| params      | 组件时间                                                     | object               | -      | {start:   2018-01-15 13:46:00, end: 2018-01-15 15:46:00} |
| extraParams | 请求所需多余参数                                             | object               | -      | -                                                        |
| confMethod  | 获取conf的请求方式                                           | post \|   get \| put | post   | get                                                      |



### props.conf

| 属性       | 说明                                                         | 类型                            | 默认值     | 例子                                          |
| ---------- | ------------------------------------------------------------ | ------------------------------- | ---------- | --------------------------------------------- |
| data       | 查询数据所需配置，需要包含图表中需要展示的事件类型配置(这个配置也可以随着数据一同返回，数据返回的事件类型优先级最高) | object/array                    | -          | {}                                            |
| style      | 样式配置，可以配置为列表模式                                 | object                          | -          | {type: 'list'}                                |
| timeType   | 时间类型：1）relative 组件时间跟随仪表盘时间变动（2）absolute 组件时间绝对定位 （3）fixed 组件固定时间段，时间段可随仪表盘endtime进行偏移 | relative   \| absolute \| fixed | relative   | relative                                      |
| time       | 时间配置。可以通过两种形式配置：时间和函数，详情请看time     | string                          | before(2h) | before(2h)                                    |
| datasource | 数据源配置，包含数据源地址api和请求类型method                | object                          | -          | {api:   "billboardDataSource", method: "get"} |

### props.conf.time

| 属性     | 说明                                    | 类型                                        | 默认值     | 例子       |
| -------- | --------------------------------------- | ------------------------------------------- | ---------- | ---------- |
| before   | 最近多长时间，如before(1h)表示最近1小时 | m:分钟；d：天；h: 小时；M：月；w：周；y：年 | -          | before(2d) |
| today    | 今天                                    | string                                      | today()    | today()    |
| yestoday | 昨天                                    | string                                      | yestoday() | yestoday() |
| week     | 本周                                    | string                                      | week()     | week()     |
| month    | 本月                                    | string                                      | month()    | month()    |
| quarter  | 本季                                    | string                                      | quarter()  | quarter()  |
| year     | 本年                                    | string                                      | year()     | year()     |

## 配置数据格式
### 配置数据详细说明,主要介绍事件类型相关配置

| 属性           | 说明                                                         | 类型    | 默认值 | 例子                                                         |
| -------------- | ------------------------------------------------------------ | ------- | ------ | ------------------------------------------------------------ |
| schema         | 配置该要表，下面介绍schema内部字段                           | object  | {}     | {}                                                           |
| name           | 该事件展示名称                                               | string  | -      | 事件一                                                       |
| type           | 匹配事件关键字，唯一标识                                     | string  | -      | NJ01error                                                    |
| checked        | 图表初始化时，是否为选中状态                                 | boolean | true   | true                                                         |
| eventDetailMap | 详情字段自定义配置，用户可以根据查询的结果，自定义配置展示字段的展示与关键字对照 | [{}]    | -      | [{"name":   "创造者", "key": "product.operator",   "type": "arr"}] |
| eventDetailMap | 详情字段自定义配置，用户可以根据查询的结果，自定义配置展示字段的展示与关键字对照 | [{}]    | -      | [{"name":   "创造者", "key": "product.operator",   "type": "arr"}] |

eventDetailMap详情配置说明，用户可以根据业务需求自定义配置需要展示的字段和形式

| 属性 | 说明                                                         | 类型   | 默认值 | 例子             |
| ---- | ------------------------------------------------------------ | ------ | ------ | ---------------- |
| name | 展示名称，对返回字段展示相应字符串                           | string | -      | 创建者           |
| key  | 匹配查询事件的字段，展示其真实数值，可以配置为对象的属性     | string | -      | product.operator |
| type | 展示数据的类别，可选类别有：arr（数组），text（文本），link（链接） | string | -      | text             |



## 获取的展示数据说明

| 属性       | 说明                                                         | 类型 | 默认值 | 例子                                    |
| ---------- | ------------------------------------------------------------ | ---- | ------ | --------------------------------------- |
| events     | 事件值，包含每种事件的相关信息以及每种事件下的子事件信息     | [{}] | [{}]   | 详情看下表                              |
| dataSchema | 事件类型列表（可选字段），如果在conf中配置过schema可不传，如果传该字段，则优先级高于conf中的schema | [{}] | [{}]   | 详情见schema说明                        |
| extra      | 事件列表的额外字段，事件列表默认展示字段："事件描述"，"事件类型", "开始时间", "结束时间",如果想要展示额外字段，需要配置该字段进行映射展示 | [{}] | [{}]   | "name":   "相关人员", "key": "operator" |

数据-event详细说明：

| 属性      | 说明                                                | 类型   | 默认值 | 例子        |
| --------- | --------------------------------------------------- | ------ | ------ | ----------- |
| name      | 事件名称，事件唯一标识，用于与事件列表schema匹配    | string | -      | NJ01warning |
| eventList | 子事件列表，展示该种事件类型包含哪些子事件          | [{}]   | -      | [{}]        |

数据-eventlist详细说明：

| 属性      | 说明                                                         | 类型   | 默认值 | 例子                                                         |
| --------- | ------------------------------------------------------------ | ------ | ------ | ------------------------------------------------------------ |
| startTime | 子事件开始时间,单位：秒                                      | string | -      | 1503563160                                                   |
| endTime   | 子事件结束时间,单位：秒                                      | string | -      | 1503563160                                                   |
| display   | 事件详情字段，这里会返回该事件的详细信息，但展示哪些需要结合eventDetailMap进行展示 | Object | {}     | "type":   "NJ01机房异常", "operator": "app", "url":   "http://www.noahv.org" |

## 返回数据格式示例
### 配置接口示例
```json
{
    data: {
        "configure": '{"title":"事件流图1","data":{"schema":[{"name":"机房1","type":"NJ01error","checked":true},{"name":"机房二","type":"GZHXYerror","checked":true},{"name":"机房三","type":"GZNSwarning","checked":true},{"name":"机房四","type":"BJYZwarning","checked":true},{"name":"机房五","type":"NJ01warning","checked":true,"eventDetailMap":[{"name":"创造者","key":"product.operator","type":"arr"},{"name":"异常类型","key":"type","type":"text"},{"name":"详情","key":"url","type":"link"}]}]},"timeType":"fixed","time":"before(2h)"}'
    },
    success: true
}
```

### 展示数据接口示例
```josn
{
    data: {
        "extra": [{
            "name": "相关人员",
            "key": "operator"
        }],
        "events": [{
            "name": "BJYZwarning",
            "eventLevel": "warning",
            "eventType": "single",
            "eventList": [{
                "startTime": 1503562250,
                "display": {
                    "type": "BJYZ1机房异常",
                    "product": 'app',
                    "url": "http://www.noahv.org"
                },
                "endTime": 1503564300
            }, {
                "startTime": 1503564390,
                "display": {
                    "type": "BJYZ2机房异常",
                    "operator": "app",
                    "url": "http://www.noahv.org"
                },
                "endTime": 1503564510
            }, {
                "startTime": 1503562230,
                "display": {
                    "type": "BJYZ3机房异常",
                    "operator": "app",
                    "url": "http://www.noahv.org"
                },
                "endTime": 1503562320
            }, {
                "startTime": 1503562730,
                "display": {
                    "type": "BJYZ4机房异常",
                    "operator": "app",
                    "url": "http://www.noahv.org"
                },
                "endTime": 1503562860
            }, {
                "startTime": 1503563700,
                "display": {
                    "type": "BJYZ5机房异常",
                    "operator": "app",
                    "url": "http://www.noahv.org"
                },
                "endTime": 1503563790
            }, {
                "startTime": 1503564000,
                "display": {
                    "type": "BJYZ6机房异常",
                    "operator": "app",
                    "url": "http://www.noahv.org"
                },
                "endTime": 1503564060
            }]
        }, {
            "name": "NJ01warning",
            "eventType": "single",
            "eventList": [{
                "startTime": 1503563160,
                "display": {
                    "type": "NJ01机房异常",
                    "operator": "app",
                    "url": "http://www.noahv.org"
                },
                "endTime": 1503563190
            }, {
                "startTime": 1503563040,
                "display": {
                    "type": "NJ01机房异常",
                    "operator": "app",
                    "url": "http://www.noahv.org"
                },
                "endTime": 1503563100
            }, {
                "startTime": 1503561300,
                "display": {
                    "type": "NJ01机房异常",
                    "operator": "app",
                    "url": "http://www.noahv.org"
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
        }, {
            "name": "GZNSwarning",
            "display": "GZNS机房异常",
            "eventType": "single",
            "eventList": [{
                "startTime": 1503561630,
                "endTime": 1503561660
            }]
        }, {
            "name": "GZHXYerror",
            "display": "GZHXY机房异常",
            "eventType": "single",
            "eventList": [{
                "startTime": 1503561630,
                "endTime": 1503561660
            }]
        }],
        "dataSchema": [{
            "name": "机房1",
            "type": "NJ01error",
            "checked": true
        }, {
            "name": "机房二",
            "type": "GZHXYerror",
            "checked": true
        }, {
            "name": "机房三",
            "type": "GZNSwarning",
            "checked": true
        }, {
            "name": "机房四",
            "type": "BJYZwarning",
            "checked": true
        }, {
            "name": "机房五",
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
    success: true
}
```


 