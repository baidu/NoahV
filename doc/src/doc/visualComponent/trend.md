
[[TOC]]

## 概述
可视化组件中的趋势图组件，可以多维度数据提供数据对比、数据补全处理、异常数据提示、多种数据样式转换等功能。支持展示多维度数据以及非多维度数据。并且提供多表联动，支持多个趋势图相同时间点的数据对比。

## 示例

### 基础示例

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
            @on-change="saveTime"
            @on-confirm="changeTime">
        </NvDatePicker>
        <br>
        <br>
        <div class="row">
            <NvMDTrend
                :conf="trendConfWithPoint"
                :dataUrl="dataUrl"
                :params="params"
                :extraUrls="pointsUrl"
                class="row-2" />
            <NvMDTrend
                :conf="trendConfWithCustom"
                :dataUrl="dataUrl"
                :params="params"
                :extraUrls="customUrl"
                class="row-2" />
        </div>
        <br>
        <span class="tips">
            本示例趋势图数据使用的是固定数据，所以在切换时间时，数据并不会更新。
            <br>
            本示例中给趋势图加上了标注点和标注区间的功能，如不需要参考下述案例，去除extraUrls配置就可以，参考下述extraUrls配置
        </span>
    </div>
</template>
<script>
import m from 'moment';
const DateFormat = "YYYY-MM-DD HH:mm:ss";
export default {
    data() {
        return {
            params: {
                start: '2018-01-15 13:46:00', 
                end: '2018-01-15 15:46:00',
                height: 260
            },
            dataUrl: '/mock/dataTrend',
            dateFormat: DateFormat,
            pointsUrl: {
                trendPointsUrl: '/mock/trendPoint'
            },
            customUrl: {
                customEventsUrl: '/mock/trendEvent'
            },
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
            trendConfWithPoint: {
                'title': '指标数据',
                // data值将会传递给dataUrl，可以在data中指定想要传递的参数
                'data': [
                    {
                        // 在配置了trendPointsUrl的情况下，以下三个参数将会在请求点数据时候传递给trendPointsUrl
                        // 如果希望展示标注点，必须配置以下字段
                        ruleNames: ["error", "overtime"],
                        cycle: '10',
                        dimensions: []
                    }
                ],
                'style': {
                    'displayType': 'line',
                    // 'unit': '个',
                    'nullPointMode': 'zero',
                    'threshold': 140 * 1000
                },
                'timeType': 'relative',
                'time': 'before(2h)'
            },
            trendConfWithCustom: {
                'title': '指标数据',
                // 在配置了customEventsUrl的情况下，会将eventList配置信息传递给customEventsUrl，后端可以根据这个筛选数据
                eventList: [
                    {
                        eventType: 'deploy',
                        dimensions: []
                    }, {
                        eventType: 'capacity',
                        dimensions: []
                    }
                ],
                // data值将会传递给dataUrl，可以在data中指定想要传递的参数
                // 如果希望展示自定事件的区块，必须配置data字段，可以为一个包含空对象的数组
                'data': [
                    {
                    }
                ],
                'style': {
                    'displayType': 'line',
                    // 'unit': '个',
                    'nullPointMode': 'zero',
                    'threshold': 140 * 1000
                },
                'timeType': 'relative',
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
        .row-2 {
            width: 50%;
            margin: 0 0.5%;
        }
    }
    .tips {
        font-size: 12px;
    }
</style>
```
:::

### 直接配置展示数据

:::demo 
```html
<template>
    <div>
        <NvMDTrend :conf="trendConf" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            trendConf: {
                'title': '指标数据',
                'display': [
                    {
                        name: '指标1',
                        data: [
                            [1529409600000, 99],
                            [1529409660000, 98],
                            [1529409720000, 99],
                            [1529409780000, 96],
                            [1529409840000, 95],
                            [1529409900000, 99]
                        ]
                    },
                    {
                        name: '指标2',
                        data: [
                            [1529409600000, 96],
                            [1529409660000, 97],
                            [1529409720000, 98],
                            [1529409780000, 96],
                            [1529409840000, 95],
                            [1529409900000, 95]
                        ]
                    }
                ],
                'style': {
                    'displayType': 'column',
                    // 'unit': '个',
                    'nullPointMode': 'zero',
                    'threshold': 98
                }
            }
        };
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
        <NvMDTrend :path="trendPath" :url="confUrl" :dataUrl="dataUrl" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            trendPath: 'network',
            confUrl: '/mock/mdtrend',
            dataUrl: '/mock/dataTrend'
        };
    }
};
</script>
```
:::

### 配置conf，再通过dataUrl获取展示数据

:::demo 
```html
<template>
    <div>
        <NvMDTrend :conf="trendConf" :dataUrl="dataUrl" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            trendConf: {
                'title': '指标数据',
                'style': {
                    'displayType': 'area',
                    // 'unit': '个',
                    'nullPointMode': 'zero',
                    'threshold': 140 * 1000
                }
            },
            dataUrl: '/mock/dataTrend'
        };
    }
};
</script>
```
:::

### conf中配置单独的数据源获取展示数据

:::demo 
```html
<template>
    <div>
        <NvMDTrend :conf="trendConf" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            trendConf: {
                'title': '指标数据',
                'style': {
                    'displayType': 'line',
                    'unit': '个',
                    'nullPointMode': 'zero',
                },
                datasource: {
                    'api': '/mock/dataTrend',
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

| 属性        | 说明                                                         | 类型                 | 默认值 | 例子                                                         |
| ----------- | ------------------------------------------------------------ | -------------------- | ------ | ------------------------------------------------------------ |
| path        | 组件path，需要提供url查询对应path名称的组件配置              | string               | -      | network                                                      |
| conf        | 组件配置，可以直接根据配置进行渲染                           | object               | -      | 详见示例                                                     |
| dataUrl     | 获取数据路径，可单独组件配置，也可以在在visualWidgetConf中统一配置 | string               | -      | /mock/dataTrend                                              |
| url         | 根据path获取conf配置的接口                                   | string               | -      | /mock/mdtrend                                                |
| params      | 组件参数，可以指定组件的高度，也可以指定组件数据的开始时间和结束时间(会传递给dataUrl) | object               | -      | { start: '2018-01-15 13:46:00', end: '2018-01-15 15:46:00',height: 300} |
| extraParams | 请求conf所需的其他参数，用于扩展                             | object               | -      | {category:   "noahEE"}                                       |
| confMethod  | 获取conf的请求方式                                           | post \|   get \| put | post   | -                                                            |

### props.conf

| 属性       | 说明                                                         | 类型                            | 默认值     | 例子                                                         |
| ---------- | ------------------------------------------------------------ | ------------------------------- | ---------- | ------------------------------------------------------------ |
| title      | 组件标题                                                     | string                          | 趋势图标题 | 指标数据                                                     |
| display    | 需要展示的子数据列表对象                                     | array                           | -          | 详见示例2                                                    |
| data       | 查询数据所需配置，会透传给后端进行查询                       | object/array                    | -          | {}                                                           |
| style      | 样式配置，下面会详细介绍                                     | object                          | -          | {                    'displayType': 'line',        'nullPointMode': 'zero','threshold': 140 * 1000} |
| timeType   | 时间类型：1）relative 组件时间跟随仪表盘时间变动(只在仪表盘配置场景中使用)（2）absolute 组件时间绝对定位 （3）fixed 组件固定时间段，时间段可随仪表盘endtime进行偏移 | relative   \| absolute \| fixed | relative   | relative                                                     |
| time       | 时间配置。可以通过两种形式配置：时间和函数，详情请看time配置 | string                          | before(2h) | before(2h)                                                   |
| link       | 标题链接，点击可跳转到某个自定义详情页面                     | string                          | -          | -                                                            |
| datasource | 数据源配置，包含数据源地址api和请求类型method                | object                          | -          | {api:   "/mock/dataTrend", method: "get"}                    |
| eventList  | 用于展示事件区块，如果需要展示事件区块，必须包含此配置       | Array                           | -          | [                    {eventType: 'deploy',dimensions: []}, {eventType: 'capacity',dimensions: []}] |

### props.conf.data

data配置在趋势图中主要是用于请求dataUrl的传递参数，正常使用可以根据dataUrl的逻辑，添加想要的配置，如果是需要展示标注点，需要按照如下配置，将data配置为数组，数组的第一项为对象，包含如下三个字段值。详见示例1。

| 属性       | 说明                                           | 类型   | 默认值 | 例子                  |
| ---------- | ---------------------------------------------- | ------ | ------ | --------------------- |
| ruleNames  | 标注点类型名称，展示标注点必须                 | Array  | -      | ["error", "overtime"] |
| cycle      | 标注点周期，保留字段，展示展示标注点必须       | string | -      | '10'                  |
| dimensions | 查询标注点信息的参数，保留字段，展示标注点必须 | array  | -      | []                    |

**style****说明**

| **属性**      | **说明**           | **类型**                                    | **默认值** | **例子** |
| ------------- | ------------------ | ------------------------------------------- | ---------- | -------- |
| displayType   | 默认趋势图展示类型 | line \| area \| column \| stack   \| normal | line       | area     |
| unit          | 单位               | string                                      |            | %        |
| nullPointMode | 断点处理方式       | zero \| connect \| null                     | zero       | connect  |
| threshold     | 警示阈值           | number                                      | 0          | 140000   |
| decimals      | 小数位个数         | number                                      | 0          | 4        |

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

 

 ## 接口数据格式

 ### 配置path名称获取conf配置

和直接配置conf在功能和字段结构上没有差异，只是提供一个可以从API获取conf的途径，获取conf的时候会传递`pathname`信息，API后端逻辑可以根据pathname筛选出对应需要的conf，返回的`configure`字段需要转译成字符串。


 ```json
{
    {
        "data": {
            configure: '{"title":"网络指标","data":[],"style":{"displayType":"line","unit":"个","nullPointMode":"zero","threshold":99},"link":"http://www.baidu.com","timeType":"relative","time":"before(2h)"}'
        },
        success: true
    }
}
```
 ### 获取展示数据的数据格式

```json
{
    data: [
        {
            name: '指标1',
            data: [
                [1529409600000, 130424],
                [1529409660000, 134748],
                [1529409720000, 144181],
                [1529409780000, 172382],
                [1529409840000, 129517],
                [1529409900000, 123698],
                [1529409960000, 121405],
                [1529410020000, 119301],
                [1529410080000, 119844],
                [1529410140000, 120037],
                [1529410200000, 119438],
                [1529410260000, 119643],
                [1529410320000, 118741],
                [1529410380000, 118377],
                [1529410440000, 116942],
                [1529410500000, 116924],
                [1529410560000, 117692],
                [1529410620000, 117866],
                [1529410680000, 117684],
                [1529410740000, 115287],
                [1529410800000, 117207],
                [1529410860000, 124365],
                [1529410920000, 123296],
                [1529410980000, 122052],
                [1529411040000, 118856],
                [1529411100000, 117202],
                [1529411160000, 116981],
                [1529411220000, 118927],
                [1529411280000, 115803],
                [1529411340000, 117259],
                [1529411400000, 118964],
                [1529411460000, 117716],
                [1529411520000, 116544],
                [1529411580000, 117684],
                [1529411640000, 115080],
                [1529411700000, 114624],
                [1529411760000, 116830],
                [1529411820000, 116642],
                [1529411880000, 115601],
                [1529411940000, 114469],
                [1529412000000, 112347],
                [1529412060000, 122014],
                [1529412120000, 120417],
                [1529412180000, 115089],
                [1529412240000, 112815],
                [1529412300000, 116324],
                [1529412360000, 114670],
                [1529412420000, 112497],
                [1529412480000, 116774],
                [1529412540000, 119257],
                [1529412600000, 121955],
                [1529412660000, 121690],
                [1529412720000, 121432],
                [1529412780000, 118179],
                [1529412840000, 116440],
                [1529412900000, 114253],
                [1529412960000, 116167],
                [1529413020000, 119214],
                [1529413080000, 117041]
            ]
        },
        {
            name: '指标2',
            data: [
                [1529409600000, 68592],
                [1529409660000, 66443],
                [1529409720000, 68637],
                [1529409780000, 68697],
                [1529409840000, 68716],
                [1529409900000, 67119],
                [1529409960000, 68135],
                [1529410020000, 67068],
                [1529410080000, 65789],
                [1529410140000, 65779],
                [1529410200000, 65777],
                [1529410260000, 65879],
                [1529410320000, 65800],
                [1529410380000, 66000],
                [1529410440000, 66008],
                [1529410500000, 67277],
                [1529410560000, 66987],
                [1529410620000, 66771],
                [1529410680000, 66943],
                [1529410740000, 64825],
                [1529410800000, 66635],
                [1529410860000, 67960],
                [1529410920000, 66948],
                [1529410980000, 67606],
                [1529411040000, 64638],
                [1529411100000, 63868],
                [1529411160000, 65210],
                [1529411220000, 66572],
                [1529411280000, 66151],
                [1529411340000, 67589],
                [1529411400000, 66340],
                [1529411460000, 66191],
                [1529411520000, 66504],
                [1529411580000, 67385],
                [1529411640000, 65806],
                [1529411700000, 65614],
                [1529411760000, 66191],
                [1529411820000, 65664],
                [1529411880000, 65783],
                [1529411940000, 64951],
                [1529412000000, 64353],
                [1529412060000, 68035],
                [1529412120000, 67170],
                [1529412180000, 66725],
                [1529412240000, 64843],
                [1529412300000, 65341],
                [1529412360000, 64871],
                [1529412420000, 64194],
                [1529412480000, 65090],
                [1529412540000, 65905],
                [1529412600000, 68489],
                [1529412660000, 67083],
                [1529412720000, 66888],
                [1529412780000, 65622],
                [1529412840000, 63742],
                [1529412900000, 63152],
                [1529412960000, 63549],
                [1529413020000, 64021],
                [1529413080000, 62980]
            ]
        }
    ],
    "success": true
}
```

### 标注点数据格式
```json
{
    "success": true,
    "data": [{
        "name": "异常点",
        "ruleName": 'error',
        "color": "#f00",
        // "symbol": "circle",
        "size": 8,
        "data": [
            [1529409780000, 172382],
            [1529409720000, 144181]
        ]
    }, {
        "name": "超时点",
        "ruleName": 'overtime',
        "color": "#F90",
        "data": [
            [1529410860000, 124365],
            [1529412060000, 122014]
        ]
    }]
}
```

### 标注区间数据格式
需要注意的是，标注区间的时间戳是秒格式的，上述所以接口，涉及时间的都是毫秒格式的
```json
{
    data: [{
        "name": "平台上线",
        "type": "deploy",
        "events": [ {
            "startTime": 1529409720,
            "endTime": 1529409900,
            "detail": "2018年6月平台常规上线"
        },  {
            "startTime": 1529411040,
            "endTime": 1529411280,
            "detail": "切换数据库配置"
        }]
    }, {
        "name": "容量变更",
        "type": "capacity",
        "color": '#f90',
        "events": [ {
            "startTime": 1529410800,
            "endTime": 1529410920,
            "detail": "容量操作"
        },  {
            "startTime": 1529412360,
            "endTime": 1529412540,
            "detail": "容量操作"
        }]
    }],
    success: true
}
```


