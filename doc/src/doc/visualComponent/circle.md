[[TOC]]

## 概述

可视化组件中的仪表图组件，可以根据指标数据决定显示颜色。适合于可用性、容量等数值展示。一个仪表图只能展示一个数据。该数据可以是一个指标、也可以是同一个namespace下多个指标运算后结果。

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
        <div class="row">
            <NvMDCircle
                :conf="circleConf"
                :dataUrl="dataUrl"
                :params="params"
                class="row-3" />
            <NvMDCircle
                :conf="circleConf"
                :dataUrl="dataUrl"
                :params="params"
                class="row-3" />
            <NvMDCircle
                :conf="circleConf"
                :dataUrl="dataUrl"
                :params="params"
                class="row-3" />
        </div>
    </div>
</template>
<script>
import m from 'moment';
const DateFormat = "YYYY-MM-DD HH:mm:ss";
export default {
    data() {
        return {
            params: {},
            dataUrl: '/mock/circleData',
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
            circleConf: {
                'title': '服务可用性',
                'data': [
                    {
                        'namespace': ['forDemoNamespace'],
                        'metric': '#{metric1}/#{metric2}',
                        'statistics': 'avg'
                    }
                ],
                'style': {
                    'decimals': 4,
                    'unit': '%',
                    'max': 100,
                    'min': 0,
                    'threshold': [
                        [
                            80,
                            85,
                            'yellow'
                        ],
                        [
                            0,
                            80,
                            'red'
                        ],
                        [
                            85,
                            100,
                            'green'
                        ]
                    ]
                },
                'link': 'http://www.baidu.com',
                'timeType': 'fixed',
                'time': 'before(2h)'
            }
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
<style lang="less">
    .row {
        display: flex;
        .row-3 {
            width: 33.333333333%;
            margin: 0 0.5%;
        }
    }
</style>
```
:::

### 直接配置数据展示
:::demo 
```html
<template>
    <NvMDCircle :conf="circleConf" />
</template>
<script>
export default {
    data() {
        return {
            circleConf: {
                title: '模块A可用性', // 可选字段
                display: 40,
                style: {
                    threshold: [],
                    unit: '%'
                }
            }
        };
    }
}
</script>
```
:::

### 配置path从API获取conf配置信息
:::demo 
```html
<template>
    <NvMDCircle
        :path="circlePath"
        :url="confUrl"
        :dataUrl="dataUrl"
        :params="params"/>
</template>
<script>
export default {
    data() {
        return {
            params: {
                start: '2018-01-30 17:26:00',
                end: '2018-01-30 18:26:00'
            },
            confUrl: '/mock/circle',
            dataUrl: '/mock/circleData',
            circlePath: 'circlePathName'
        };
    }
};
</script>
```
:::

### 配置conf,再通过dataUrl获取展示数据

:::demo 
```html
<template>
    <NvMDCircle
        :conf="circleConf"
        :dataUrl="dataUrl"
        :params="params"/>
</template>
<script>
export default {
    data() {
        return {
            circleConf: {
                "title": "模块C可用性",
                "data": [{
                    "namespace": [
                        "forDemoNamespace"
                    ],
                    "metric": "#{metric1}/#{metric2}",
                    "statistics": "avg"
                }],
                "style": {
                    "decimals": 4,
                    "unit": "%",
                    "max": 100,
                    "min": 0,
                    "threshold": [[
                        90,
                        99,
                        "yellow"
                    ],
                    [
                        0,
                        90,
                        "red"
                    ],
                    [
                        99,
                        100,
                        "green"
                    ]]
                },
                "link": "http://www.baidu.com",
                "timeType": "fixed",
                "time": "before(2h)"
            },
            dataUrl: '/mock/circleData',
            params: {
                start: '2018-01-30 17:26:00',
                end: '2018-01-30 18:26:00'
            }
        };
    }
}
</script>
```
:::

### 在conf中配置获取展示数据的API

:::demo 
```html
<template>
     <NvMDCircle :conf="circleConf" :params="params"/>
</template>
<script>
export default {
    data() {
        return {
            params: {
                start: '2018-01-30 17:26:00',
                end: '2018-01-30 18:26:00'
            },
            circleConf: {
                "title": "模块D可用性",
                style: {
                    threshold: [],
                    unit: '%'
                },
                // 数据源配置
                "datasource": {
                    "api": '/mock/circleData',
                    "method": 'post'
                }
            }
        };
    }
};
</script>
```
:::

## API

### props

| 属性        | 说明                                         | 类型                 | 默认值 | 例子                                                     |
| ----------- | -------------------------------------------- | -------------------- | ------ | -------------------------------------------------------- |
| path        | 组件path，组件会自行查询配置                 | string               | -      | circlePathName                                           |
| conf        | 组件配置，可以直接根据配置进行渲染           | object               | -      | {}                                                       |
| url         | 根据path获取conf配置的接口                                   | string               | -      | /mock/circle  |
| dataUrl     | 获取数据路径，可在visualWidgetConf中统一配置 | string               | -      | /circleDataUrl/demo.json                                 |
| params      | 组件时间，组件高度等配置信息                                    | object               | -      | {start:   2018-01-15 13:46:00, end: 2018-01-15 15:46:00} |
| extraParams | 请求所需多余参数                             | object               | -      | {category:   "noahEE"}                                   |
| confMethod  | 获取conf的请求方式                           | post   \| get \| put | post   | get                                                      |

### props.conf配置说明

| 属性       | 说明                                                         | 类型                            | 默认值     | 例子                                       |      |      |
| ---------- | ------------------------------------------------------------ | ------------------------------- | ---------- | ------------------------------------------ | ---- | ---- |
| title      | 组件标题                                                     | string                          | 仪表图     | 仪表图标题                                 |      |      |
| display    | 直接展示数据                                                 | number                          | -          | 99                                         |      |      |
| data       | 查询数据所需配置，会透传给后端进行查询                       | object/array                    | -          | {}                                         |      |      |
| style      | 样式配置，下面会详细介绍                                 | object                          | -          | {}                                         |      |      |
| link       | 标题链接                                                     | string                          | -          | {http://www.baidu.com}                     |      |      |
| timeType   | 时间类型：1）relative 组件时间跟随仪表盘时间变动(只在仪表盘配置场景中使用)（2）absolute 组件时间绝对定位 （3）fixed 组件固定时间段，时间段可随仪表盘endtime进行偏移 | relative   \| absolute \| fixed | relative   | relative                                   |      |      |
| time       | 时间配置。可以通过两种形式配置：时间和函数，详情请看time     | string                          | before(2h) | before(2h)                                 |      |      |
| datasource | 数据源配置，包含数据源地址api和请求类型method                | object                          | -          | {api:   "circleDataSource", method: "get"} |      |      |


### props.style说明

| 属性      | 说明                                                | 类型   | 默认值 | 例子           |
| --------- | --------------------------------------------------- | ------ | ------ | -------------- |
| decimals  | 小数点后保留位数                                    | number | 2      | 4              |
| unit      | 单位                                                | string | %      | W              |
| threshold | 颜色区间,配置顺序：最小值，最大值，颜色（支持色值）如配置style，必须配置threshold，可以为一个空数组| array  | -      | [[0,90,"red"]] |
| min       | 最小值                                              | number | 0      | 90             |
| max       | 最大值                                              | number | 100    | 99.99          |

### props.time说明

| 属性     | 说明                                    | 类型                                        | 默认值     | 例子       |
| -------- | --------------------------------------- | ------------------------------------------- | ---------- | ---------- |
| before   | 最近多长时间，如before(1h)表示最近1小时 | m:分钟；d：天；h: 小时；M：月；w：周；y：年 | -          | before(2d) |
| today    | 今天                                    | string                                      | today()    | today()    |
| yestoday | 昨天                                    | string                                      | yestoday() | yestoday() |
| week     | 本周                                    | string                                      | week()     | week()     |
| month    | 本月                                    | string                                      | month()    | month()    |
| quarter  | 本季                                    | string                                      | quarter()  | quarter()  |
| year     | 本年                                    | string                                      | year()     | year()     |


## 数据格式

### 配置path名称获取conf配置

和直接配置conf在功能和字段结构上没有差异，只是提供一个可以从API获取conf的途径，获取conf的时候会传递`pathname`信息，API后端逻辑可以根据pathname筛选出对应需要的conf，返回的`configure`字段需要转译成字符串。


 ```json
{
    data: {
        configure : "{"title":"网络模块","data":[{"name":"usability","alias":"异常率","unit":"%","decimals":4},{"name":"abnormal","alias":"异常率","unit":"%","decimals":4}],"link":"http://www.baidu.com","timeType":"relative","time":"before(2h)"}"
    },
    success: true
}
```
 ### 获取展示数据的数据格式

```json
{
    data: [{
        name: 'usability',
        value: 98.2535,
        warning: true
    },
    {
        name: 'overtime',
        value: 2.3852
    }, {
        name: 'abnormal',
        value: 3.8581
    }],
    success: true
}
```