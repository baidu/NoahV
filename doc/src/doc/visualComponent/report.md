[[TOC]]
## 概述

可视化组件中的报表组件，可以根据指标数据决定显示颜色。适合于可用性、容量等数值展示。

## 使用示例

:::demo 基础示例
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
        <NvMDReport
            :conf="reportConf"
            :dataUrl="dataUrl"
            :params="params"
        />
    </div>
</template>
<script>
import m from 'moment';
const DateFormat = "YYYY-MM-DD HH:mm:ss";
export default {
    data() {
        return {
            dateFormat: DateFormat,
            params: {},
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
            reportConf: {
                'title': '服务可用性报表',
                'data': {
                    'caption': '子服务',
                    'namespace': ['2.case-basic.service', '1.case-basic.service'],
                    'comments': '说明：可以配置报表相关说明，如指标含义等',
                    'columns': [
                        {
                            'source': 'origin', // 使用源数据
                            'metric': '#{metric1}-#{metric2}', // 可以指定服务端做指标计算
                            'statistics': 'sum', // 数据统计类型，透传给API处理
                            'header': '指标1', // 展示名称
                            'alias': 'alias1', // 别名，列计算时可以用到
                            'unit': '%', // 单位
                            'decimals': 3, // 小数点位数
                            // 阈值配置，可以配置不同数据区间展示不同的颜色
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': 'avg', // 合值的统计方式，支持sum和avg两种
                            'use': true, // 是否展示，配置为false将隐藏
                            'offset': '-1d'
                        }, {
                            'source': 'origin', // 使用源数据
                            'metric': '#{metric1}-#{metric2}',
                            'statistics': 'sum',
                            'group': '指标组', // 将多列指定同一个group，将会展示到一个组下面
                            'header': '指标2',
                            'alias': 'alias2', // 别名，列计算时用到
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': null,
                            'use': true,
                            'offset': '-1d' //传递给API的时间的偏移值，需要设置source为origin才有效
                        },
                        {
                            'source': 'origin', // 使用源数据
                            'group': '指标组',
                            'header': '指标3',
                            'alias': 'alias3',
                            'metric': '#{metric1}-#{metric2}',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'total': 'avg',
                        },
                        {
                            'source': 'column', // 使用列数据，选择该模式时，use必须为true，没有时间选择和offset，没有alias
                            'header': '指标计算(求平均)',
                            'metric': '(#{alias1}+#{alias3})/2',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    null,
                                    90,
                                    'red' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    null,
                                    'yellow' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'total': 'avg',
                            'use': true // 是否展示，需要指定source为origin或column
                        }
                    ]
                },
            },
            dataUrl: '/mock/dataReport'
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

:::demo 对象层级
```html
<template>
    <div>
         <NvMDReport :conf="reportConf" :dataUrl="dataUrl" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            reportConf: {
                'title': '资源报表',
                'data': {
                    'caption': '监控对象',
                    'namespace': ['2.case-basic.service', '1.case-basic.service'],
                    'comments': '说明：可以配置报表相关说明，如指标含义等',
                    'columns': [
                        {
                            'source': 'origin', // 使用源数据
                            'metric': '#{metric1}-#{metric2}', // 可以指定服务端做指标计算
                            'statistics': 'sum', // 数据统计类型，透传给API处理
                            'header': '指标1', // 展示名称
                            'alias': 'alias1', // 别名，列计算时可以用到
                            'unit': '%', // 单位
                            'decimals': 3, // 小数点位数
                            // 阈值配置，可以配置不同数据区间展示不同的颜色
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': 'avg', // 合值的统计方式，支持sum和avg两种
                            'use': true, // 是否展示，配置为false将隐藏
                            'offset': '-1d'
                        }, {
                            'source': 'origin', // 使用源数据
                            'metric': '#{metric1}-#{metric2}',
                            'statistics': 'sum',
                            'group': '指标组', // 将多列指定同一个group，将会展示到一个组下面
                            'header': '指标2',
                            'alias': 'alias2', // 别名，列计算时用到
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': null,
                            'use': true,
                            'offset': '-1d' //传递给API的时间的偏移值，需要设置source为origin才有效
                        },
                        {
                            'source': 'origin', // 使用源数据
                            'group': '指标组',
                            'header': '指标3',
                            'alias': 'alias3',
                            'metric': '#{metric1}-#{metric2}',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'total': 'avg',
                        },
                        {
                            'source': 'column', // 使用列数据，选择该模式时，use必须为true，没有时间选择和offset，没有alias
                            'header': '指标计算(求平均)',
                            'metric': '(#{alias1}+#{alias3})/2',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    null,
                                    90,
                                    'red' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    null,
                                    'yellow' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'total': 'avg',
                            'use': true // 是否展示，需要指定source为origin或column
                        }
                    ]
                },
            },
            dataUrl: '/mock/dataTreeReport'
        };
    }
};
</script>
```
:::

:::demo 直接配置展示数据
```html
<template>
    <div>
         <NvMDReport :conf="reportConf" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            reportConf: {
                'title': '服务A可用性报表',
                'data': {
                    'caption': '子服务',
                    'namespace': ['2.case-basic.service', '1.case-basic.service'],
                    'comments': '说明：可以配置报表相关说明，如指标含义等',
                    'columns': [
                        {
                            'source': 'origin', // 使用源数据
                            'metric': '#{metric1}-#{metric2}', // 可以指定服务端做指标计算
                            'statistics': 'sum', // 数据统计类型，透传给API处理
                            'header': '指标1', // 展示名称
                            'alias': 'alias1', // 别名，列计算时可以用到
                            'unit': '%', // 单位
                            'decimals': 3, // 小数点位数
                            // 阈值配置，可以配置不同数据区间展示不同的颜色
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': 'avg', // 合值的统计方式，支持sum和avg两种
                            'use': true, // 是否展示，配置为false将隐藏
                            'offset': '-1d'
                        }, {
                            'source': 'origin', // 使用源数据
                            'metric': '#{metric1}-#{metric2}',
                            'statistics': 'sum',
                            'group': '指标组', // 将多列指定同一个group，将会展示到一个组下面
                            'header': '指标2',
                            'alias': 'alias2', // 别名，列计算时用到
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': null,
                            'use': true,
                            'offset': '-1d' //传递给API的时间的偏移值，需要设置source为origin才有效
                        },
                        {
                            'source': 'origin', // 使用源数据
                            'group': '指标组',
                            'header': '指标3',
                            'alias': 'alias3',
                            'metric': '#{metric1}-#{metric2}',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'total': 'avg',
                        },
                        {
                            'source': 'column', // 使用列数据，选择该模式时，use必须为true，没有时间选择和offset，没有alias
                            'header': '指标计算(求平均)',
                            'metric': '(#{alias1}+#{alias3})/2',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    null,
                                    90,
                                    'red' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    null,
                                    'yellow' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'total': 'avg',
                            'use': true // 是否展示，需要指定source为origin或column
                        }
                    ]
                },
                'link': 'http://www.baidu.com',
                'display': [
                    {
                        "name":"noah_namespace",
                        "value":"2.case-basic.service",
                        "alias":null,
                        "metrics":{"alias3":90,"alias2":null, "alias1": 95}
                    },
                    {
                        "name":"noah_namespace",
                        "value":"1.case-basic.service",
                        "alias":null,
                        "metrics":{"alias3":100,"alias2": null, "alias1": 80}
                    }
                ]
            }
        };
    }
};
</script>
```
:::

:::demo 配置path从API获取conf配置信息
```html
<template>
    <div>
         <NvMDReport :path="trendPath" :url="confUrl" :dataUrl="dataUrl" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            trendPath: 'serviceB',
            confUrl: '/mock/mdreport',
            dataUrl: '/mock/dataReport'
        };
    }
};
</script>
```
:::


:::demo 配置conf，再通过dataUrl获取展示数据
```html
<template>
    <div>
         <NvMDReport :conf="reportConf" :dataUrl="dataUrl" :params="params"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            params: {
                height: 210
            },
            reportConf: {
                'title': '服务可用性报表',
                'data': {
                    'caption': '子服务',
                    'namespace': ['2.case-basic.service', '1.case-basic.service'],
                    'comments': '说明：可以配置报表相关说明，如指标含义等',
                    'columns': [
                        {
                            'source': 'origin', // 使用源数据
                            'metric': '#{metric1}-#{metric2}', // 可以指定服务端做指标计算
                            'statistics': 'sum', // 数据统计类型，透传给API处理
                            'header': '指标1', // 展示名称
                            'alias': 'alias1', // 别名，列计算时可以用到
                            'unit': '%', // 单位
                            'decimals': 3, // 小数点位数
                            // 阈值配置，可以配置不同数据区间展示不同的颜色
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            // 'total': 'avg', // 合值的统计方式，支持sum和avg两种
                            'use': true, // 是否展示，配置为false将隐藏
                            'offset': '-1d'
                        }, {
                            'source': 'origin', // 使用源数据
                            'metric': '#{metric1}-#{metric2}',
                            'statistics': 'sum',
                            'group': '指标组', // 将多列指定同一个group，将会展示到一个组下面
                            'header': '指标2',
                            'alias': 'alias2', // 别名，列计算时用到
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': null,
                            'use': true,
                            'offset': '-1d' //传递给API的时间的偏移值，需要设置source为origin才有效
                        },
                        {
                            'source': 'origin', // 使用源数据
                            'group': '指标组',
                            'header': '指标3',
                            'alias': 'alias3',
                            'metric': '#{metric1}-#{metric2}',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            // 'total': 'avg',
                        },
                        {
                            'source': 'column', // 使用列数据，选择该模式时，use必须为true，没有时间选择和offset，没有alias
                            'header': '指标计算(求平均)',
                            'metric': '(#{alias1}+#{alias3})/2',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    null,
                                    90,
                                    'red' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    null,
                                    'yellow' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            // 'total': 'avg',
                            'use': true // 是否展示，需要指定source为origin或column
                        }
                    ]
                },
            },
            dataUrl: '/mock/dataReport'
        };
    }
};
</script>
```
:::

:::demo conf中配置单独的数据源获取展示数据
```html
<template>
    <div>
         <NvMDReport :conf="reportConf" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            reportConf: {
                'title': '服务可用性报表',
                'data': {
                    'caption': '子服务',
                    'namespace': ['2.case-basic.service', '1.case-basic.service'],
                    'comments': '说明：可以配置报表相关说明，如指标含义等',
                    'columns': [
                        {
                            'source': 'origin', // 使用源数据
                            'metric': '#{metric1}-#{metric2}', // 可以指定服务端做指标计算
                            'statistics': 'sum', // 数据统计类型，透传给API处理
                            'header': '指标1', // 展示名称
                            'alias': 'alias1', // 别名，列计算时可以用到
                            'unit': '%', // 单位
                            'decimals': 3, // 小数点位数
                            // 阈值配置，可以配置不同数据区间展示不同的颜色
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': 'avg', // 合值的统计方式，支持sum和avg两种
                            'use': true, // 是否展示，配置为false将隐藏
                            'offset': '-1d'
                        },
                        {
                            'source': 'origin', // 使用源数据
                            'header': '指标3',
                            'alias': 'alias3',
                            'metric': '#{metric1}-#{metric2}',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'total': 'avg',
                        },
                        {
                            'source': 'column', // 使用列数据，选择该模式时，use必须为true，没有时间选择和offset，没有alias
                            'header': '指标计算(求平均)',
                            'metric': '(#{alias1}+#{alias3})/2',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    null,
                                    90,
                                    'red' // 表示小于90，红色
                                ],
                                [
                                    90,
                                    null,
                                    'yellow' // 表示大于90，黄色
                                ],
                                [
                                    99,
                                    100,
                                    'green' // 表示处于[99,100]区间，绿色
                                ]
                            ],
                            'total': 'avg',
                            'use': true // 是否展示，需要指定source为origin或column
                        }
                    ]
                },
                datasource: {
                    'api': '/mock/dataReport',
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
| path        | 组件path，需要提供url查询对应path名称的组件配置              | string               | -      | serviceB                                                     |
| conf        | 组件配置，可以直接根据配置进行渲染                           | object               | -      | 详见示例                                                     |
| url         | 根据path获取conf配置的接口                                   | string               | -      | /mock/mdreport                                               |
| dataUrl     | 获取数据路径，可单独组件配置，也可以在在visualWidgetConf中统一配置 | string               | -      | /mock/dataReport                                             |
| params      | 组件时间，高度等配置信息                                     | object               | -      | {start:   2018-01-15 13:46:00, end: 2018-01-15 15:46:00，height: 300} |
| extraParams | 请求conf配置是所需其他参数，如无需求，不需要配置             | object               | -      | -                                                            |
| confMethod  | 获取conf的请求方式                                           | post \|   get \| put | post   | get                                                          |

### props.conf

| 属性       | 说明                                                         | 类型                            | 默认值     | 例子                                       |      |      |
| ---------- | ------------------------------------------------------------ | ------------------------------- | ---------- | ------------------------------------------ | ---- | ---- |
| title      | 组件标题                                                     | string                          | 仪表图     | 仪表图标题                                 |      |      |
| display    | 直接展示数据                                                 | number                          | -          | 99                                         |      |      |
| data       | 查询数据所需配置，会透传给后端进行查新                       | object                          | -          | {}                                         |      |      |
| link       | 标题链接                                                     | string                          | -          | {http://www.baidu.com}                     |      |      |
| timeType   | 时间类型：1）relative 组件时间跟随仪表盘时间变动（2）absolute 组件时间绝对定位 （3）fixed 组件固定时间段，时间段可随仪表盘endtime进行偏移 | relative   \| absolute \| fixed | relative   | relative                                   |      |      |
| time       | 时间类型：1）relative 组件时间跟随仪表盘时间变动(只在仪表盘配置场景中使用)（2）absolute 组件时间绝对定位 （3）fixed 组件固定时间段，时间段可随仪表盘endtime进行偏移 | string                          | before(2h) | before(2h)                                 |      |      |
| datasource | 数据源配置，包含数据源地址api和请求类型method                | object                          | -          | {api:   "reportDataSource", method: "get"} |      |      |
|            |                                                              |                                 |            |                                            |      |      |

### props.conf.data说明

| 属性      | 说明                                   | 类型   | 默认值   | 例子                                              |
| --------- | -------------------------------------- | ------ | -------- | ------------------------------------------------- |
| caption   | 列名标题                               | string | 监控对象 | 列名                                              |
| namespace | 筛选字段，非必须，可以用于后端筛选数据 | all    | -        | ['2.case-basic.service', '1.case-basic.service'], |
| comments  | 表格说明                               | String | -        | 这里是这个表格的说明文字                          |
| columns   | 列信息                                 | array  | []       | 详细介绍看columns                                 |


### props.conf.data.columns

| 属性      | 说明                                                         | 类型    | 默认值 | 例子               |
| --------- | ------------------------------------------------------------ | ------- | ------ | ------------------ |
| source    | 列类型。分为origin：源数据和column：列计算                   | string  | origin | source:   origin   |
| group     | 列分组，可以把多个列分到相同的组内                           | string  | -      | 指标组             |
| header    | 列名成，显示的文字                                           | string  | -      | 指标1              |
| alias     | 用户匹配数据的key值；也可以用作列计算的派生计算key           | string  | -      | alias1             |
| metric    | 后端用户计算的字段，可以根据后端环境进行配置                 | string  | -      | metric1            |
| unit      | 单位                                                         | string  | -      | %                  |
| decimals  | 保留的小数点位数                                             | number  | -      | 2                  |
| threshold | 阈值设置，用于将不同的数据根据阈值展示相应的颜色             | array   | -      | [[0,90,"#ff0000"]] |
| total     | 合值计算方式，可以为avg或者sum，如所有列都不配置将不展示合值行 | string  | -      | 'avg'              |
| use       | 是否展示，配置为false将隐藏                                  | boolean | true   | true               |
| offset    | 数据偏移，相对于整个组件的时间，某一列可以取一个偏移值，需要后端接口支持，只在source为origin的时候有效 | string  | -      | '-1d'              |
| timeType  | 列时间类型，格式同conf.timeType，需要后端处理，只在source为origin的时候有效 | string  | -      | relative           |
| time      | 列时间，含义为获取相对组件时间的偏移值，同offset，格式同conf.time，需要后端处理，只在source为origin的时候有效 | string  | -      | before(2h)         |

### conf.time说明

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

1.不需要层级展开的数据

```json
{
    "data": [{
        "name":"noah_namespace",
        "value":"2.case-basic.service",
        "alias":null,
        "metrics":{"alias3":90,"alias2":95, "alias1": null}
    }, {
        "name":"noah_namespace",
        "value":"1.case-basic.service",
        "alias":null,
        "metrics":{"alias3":100,"alias2": 80, "alias1": null}
    }],
    success: true
}
```
2.需要层级展开的数据
```json
{
    "data": [{
        "name": "plat",
        "value": "bid",
        "alias": null,
        "metrics": {
            "alias1": 90,
            "alias2": 100,
            "alias3": 80,
        },
        "children": [{
            "name": "im_module",
            "value": "adplusserver",
            "alias": null,
            "metrics": {
                "alias1": 90,
                "alias2": null,
                "alias3": 92,
            },
            "children": [{
                "name": "im_module1",
                "value": "adplusserver1",
                "alias": null,
                "metrics": {
                    "alias1": 90,
                    "alias2": null,
                    "alias3": 85
                }
            }, {
                "name": "im_module2",
                "value": "adplusserver2",
                "alias": null,
                "metrics": {
                    "alias1": 70,
                    "alias2": null,
                    "alias3": 75
                }
            }]
        },
        {
            "name": "im_module",
            "value": "imbsproxy",
            "alias": null,
            "metrics": {
                "alias1": 100,
                "alias2": 85,
                "alias3": 92
            }
        },
        {
            "name": "im_module",
            "value": "indexserver",
            "alias": null,
            "metrics": {
                "alias1": 90,
                "alias2": null,
                "alias3": 98
            }
        }]
    },{
        "name": "plat",
        "value": "bcm",
        "alias": null,
        "metrics": {
            "alias1": 90,
            "alias2": 100,
            "alias3": 80,
        },
        children: [{
            "name": "im_module",
            "value": "bcmchildrenmodule1",
            "alias": null,
            "metrics": {
                "alias1": 100,
                "alias2": 85,
                "alias3": 92
            }
        },
        {
            "name": "im_module",
            "value": "bcmchildrenmodule2",
            "alias": null,
            "metrics": {
                "alias1": 90,
                "alias2": null,
                "alias3": 98
            }
        }]
    }],
    success: true
}
```