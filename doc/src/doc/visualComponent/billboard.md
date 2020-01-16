[[TOC]]

## 概述
可视化组件中的数据面板组件，主要功能为展示某指标在一段时间内的统计值。

## 示例

### 基础使用实例
:::demo 
```html
<template>
    <div
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
            <NvMDBillboard
                :dataUrl="dataUrl"
                :params="params"
                :conf="billboardConf"
                class="row-3" />
            <NvMDBillboard
                :dataUrl="dataUrl"
                :params="params"
                :conf="billboardConf"
                class="row-3" />
            <NvMDBillboard
                :dataUrl="dataUrl"
                :params="params"
                :conf="billboardConf"
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
            dataUrl: '/mock/dataBillboard',
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
            billboardConf: {
                'title': '入口模块(BFE)',
                'data': [
                    {
                        'namespace': ['forDemoNamespace1'],
                        'metric': '#{metric1}/#{metric2}',
                        'statistics': 'avg',
                        'name': 'usability',
                        'alias': '可用性',
                        'unit': '%',
                        'decimals': 4
                    },
                    {
                        'namespace': ['forDemoNamespace2'],
                        'metric': '#{metric3}',
                        'statistics': 'avg',
                        'name': 'overtime',
                        'alias': '超时率',
                        'unit': '%',
                        'decimals': 4
                    },
                    {
                        'namespace': ['forDemoNamespace2'],
                        'metric': '#{metric3}',
                        'statistics': 'avg',
                        'name': 'abnormal',
                        'alias': '异常率',
                        'unit': '%',
                        'decimals': 4
                    }
                ],
                // 'link': 'http://www.baidu.com',
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
        .row-3 {
            width: 33.333333333%;
            margin: 0 0.5%;
        }
    }
</style>
```
:::

### 直接配置展示数据

:::demo 
```html
<template>
    <NvMDBillboard :conf="billboardDisplay" class="billboard-single-demo" />
</template>
<script>
export default {
    data() {
        return {
            billboardDisplay: {
                title: '地图导航模块', // 可选字段
                display: [
                    {
                        name: '可用性',
                        value: 99.99998,
                        warning: true,
                        decimals: 5,
                        unit: '%'
                    },
                    {
                        name: '超时率',
                        value: 0.00001,
                        decimals: 5,
                         unit: '%'
                    }, {
                        name: '异常率',
                        value: 0.00002,
                        decimals: 5,
                        unit: '%'
                    }
                ]
            }
        };
    }
}
</script>
<style lang="less">
    .billboard-single-demo {
        width: 400px;
    }
</style>
```
:::

### 配置path从API获取conf配置信息

:::demo 
```html
<template>
    <NvMDBillboard
        :path="billboardPath"
        :url="confUrl"
        :dataUrl="dataUrl"
        :params="params"
        class="billboard-single-demo" />
</template>
</template>
<script>
export default {
    data() {
        return {
            params: {
                start: '2018-01-30 17:26:00',
                end: '2018-01-30 18:26:00'
            },
            billboardPath: 'networkmodue',
            confUrl: '/mock/billboard',
            dataUrl: '/mock/dataBillboard',
        };
    }
};
</script>
<style lang="less">
    .billboard-single-demo {
        width: 400px;
    }
</style>
```
:::

### 配置conf，再通过dataUrl获取展示数据

:::demo 
```html
<template>
    <NvMDBillboard
        :conf="billboardConf"
        :dataUrl="dataUrl"
        class="billboard-single-demo" />
</template>
</template>
<script>
export default {
    data() {
        return {
            billboardConf: {
                'title': '下游模块A',
                'data': [
                    {
                        'namespace': ['forDemoNamespace1'],
                        'metric': '#{metric1}/#{metric2}',
                        'statistics': 'avg',
                        'name': 'usability',
                        alias: '可用性',
                        'unit': '%',
                        'decimals': 4
                    },
                    {
                        'namespace': ['forDemoNamespace2'],
                        'metric': '#{metric3}',
                        'statistics': 'avg',
                        'name': 'abnormal',
                         alias: '异常率',
                        'unit': '%',
                        'decimals': 4
                    }
                ],
                'link': 'http://www.baidu.com',
                'timeType': 'fixed',
                'time': 'before(1d)'
            },
            confUrl: '/mock/billboard',
            dataUrl: '/mock/dataBillboard',
        };
    }
};
</script>
<style lang="less">
    .billboard-single-demo {
        width: 400px;
    }
</style>
```
:::

### conf中配置单独的数据源获取展示数据
:::demo 
```html
<template>
    <NvMDBillboard
        :conf="billboardConf"
        class="billboard-single-demo" />
</template>
</template>
<script>
export default {
    data() {
        return {
            billboardConf: {
                'title': '下游模块B',
                'data': [
                    {
                        'namespace': ['forDemoNamespace1'],
                        'metric': '#{metric1}/#{metric2}',
                        'statistics': 'avg',
                        'name': 'usability',
                        alias: '可用性',
                        'unit': '%',
                        'decimals': 4
                    },
                    {
                        'namespace': ['forDemoNamespace2'],
                        'metric': '#{metric3}',
                        'statistics': 'avg',
                        'name': 'abnormal',
                         alias: '异常率',
                        'unit': '%',
                        'decimals': 4
                    }
                ],
                datasource: {
                    'api': '/mock/dataBillboard',
                    "method": 'post'
                }
            },
            confUrl: '/mock/billboard',
            dataUrl: '/mock/dataBillboard'
        };
    }
};
</script>
<style lang="less">
    .billboard-single-demo {
        width: 400px;
    }
</style>
```
:::


## API

### props

| 属性        | 说明                                                         | 类型                 | 默认值 | 例子                                                     |
| ----------- | ------------------------------------------------------------ | -------------------- | ------ | -------------------------------------------------------- |
| path        | 组件path，组件会自行查询配置                                 | string               | -      | billboardPathName                                        |
| conf        | 组件配置，可以直接根据配置进行渲染                           | object               | -      | {}                                                       |
| url         | 根据path获取conf配置的接口                                   | string               | -      | /mock/billboard  |
| dataUrl     | 获取数据路径，可在visualWidgetConf中统一配置  ，也可对单个组件单独指定 | string               | -      | /billboardDataUrl/demo.json                              |
| params      | 组件时间,高度等配置信息    | object               | -      | {start:   2018-01-15 13:46:00, end: 2018-01-15 15:46:00} |
| extraParams | 请求conf配置是所需其他参数，如无需求，不需要配置             | object               | -      | {category:   "noahEE"}                                   |
| confMethod  | 获取conf的请求方式                                           | post \|   get \| put | post   | get                                                      |



### props.conf

| 属性       | 说明                                                         | 类型                            | 默认值     | 例子                                          |
| ---------- | ------------------------------------------------------------ | ------------------------------- | ---------- | --------------------------------------------- |
| title      | 组件标题                                                     | string                          | 数据面板   | 数据面板                                      |
| display    | 需要展示的子数据列表对象                                     | object                          | -          | [{ name: '可用性', value: 99.99998, decimals: 5, unit: '%'}]       |
| data       | 查询数据所需配置，会透传给后端进行查新                       | object/array                    | -          | {}                                            |
| link       | 标题链接                                                     | string                          | -          | {http://www.baidu.com}                        |
| timeType   | 时间类型：1）relative 组件时间跟随仪表盘时间变动(只在仪表盘配置场景中使用)（2）absolute 组件时间绝对定位 （3）fixed 组件固定时间段，时间段可随仪表盘endtime进行偏移 | relative   \| absolute \| fixed | relative   | relative                                      |
| time       | 时间配置。可以通过两种形式配置：时间和函数，详情请看time     | string                          | before(2h) | before(2h)                                    |
| datasource | 数据源配置，包含数据源地址api和请求类型method                | object                          | -          | {api:   "billboardDataSource", method: "get"} |

### props.conf.data

| 属性     | 说明                                                         | 类型   | 默认值 | 例子                            |
| -------- | ------------------------------------------------------------ | ------ | ------ | ------------------------------- |
| name     | 子标题和数据项key值，如不一致，可以借助alias表示子标题，name用来指定数据key值 | string | -      | 'usability\|overtime\|abnormal' |
| unit     | 单指标数据单位                                               | string | %      | W                               |
| alias    | 子标题别称                                                   | String | -      | '可用性\|异常率\|超时率'        |
| decimals | 单指标数据保留小数点的位数                                   | number | 2      | 4                               |
| params   | 早conf中进行数据源API配置时，请求的额外参数，只有配置多数据源时会带有的参数 | object | {}     | {extraDataSource:   {}}         |

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
    data: {
        configure : '{"title":"模块B可用性","data":[{"namespace":["forDemoNamespace"],"metric":"#{metric1}/#{metric2}","statistics":"avg"}],"style":{"decimals":4,"unit":"%","max":100,"min":0,"threshold":[[90,99,"yellow"],[0,90,"red"],[99,99.99,"green"]]},"link":"http://www.baidu.com","timeType":"fixed","time":"before(2h)"}',
    },
    success: true
}
```
 ### 获取展示数据的数据格式

```json
{
    data: 99.99999,
    success: true
}
```


