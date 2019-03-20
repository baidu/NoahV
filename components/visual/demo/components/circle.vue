<template>
   <div class="demo-holder">
        <h1>概述</h1>
        <p>可视化组件中的仪表图组件，可以根据指标数据决定显示颜色。
        适合于可用性、容量等数值展示。一个仪表图只能展示一个数据。
        该数据可以是一个指标、也可以是同一个namespace下多个指标运算后结果。</p>
        <h1>组件实例</h1>
        <Date-picker
            confirm
            type="datetimerange"
            placeholder="选择日期"
            style="width: 300px"
            :value="times"
            @on-change="formatTime"
            @on-ok="changeTime"></Date-picker>
        <div class="common-box">
            <NvMDCircle
                :conf="circleConf"
                :dataUrl="dataUrl"
                :params="params"/>
        </div>
        <h1>demo</h1>
        <p>组件调用</p>
        <div class="code">
            <pre>&lt;NvMDCircle
                :path=&quot;circlePath&quot;
                :url=&quot;url&quot;
                :dataUrl=&quot;dataUrl&quot;
                :params=&quot;params&quot;/&gt;</pre>
        </div>
        <p>数据配置:配置path获取数据</p>
        <div class="code">
            <pre>
            export default {
                data() {
                    return {
                        params: {
                            start: '2018-01-30 17:26:00',
                            end: '2018-01-30 18:26:00'
                        },
                        url: '/mock/circle',
                        dataUrl: '/mock/circleData',
                        circlePath: 'circlePathName'
                    };
                }
            };
            </pre>
        </div>
        <div class="common-box">
            <NvMDCircle
                :path="circlePath"
                :url="confUrl"
                :dataUrl="dataUrl"
                :params="params"/>
        </div>
        <p>数据配置:配置conf,再通过dataUrl获取数据</p>
        <div class="code">
            <pre>
            export default {
                data() {
                    return {
                        circleConf: {
                            "title": "仪表图标题",
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
                            "link": "http://sia.baidu.com",
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
            </pre>
        </div>
        <div class="common-box">
            <NvMDCircle
                :conf="circleConf"
                :dataUrl="dataUrl"
                :params="params"/>
        </div>
        <p>无配置调用</p>
        <div class="code">
            <pre>&lt;NvMDCircle/&gt;</pre>
        </div>
        <p>配置数据展示</p>
        <div class="code">
            <pre>&lt;NvMDCircle :conf=&quot;circleConf&quot;/&gt;</pre>
        </div>
        <div class="code">
            <pre>
            export default {
                data() {
                    return {
                        circleDisplay: {
                            title: '只展示数据的仪表图', // 可选字段
                            display: 40
                        }
                    };
                }
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDCircle
                :conf="circleDisplay"
                :params="params"/>
        </div>
        <p>多数据源配置方式</p>
        <div class="code">
            <pre>&lt;NvMDCircle :conf=&quot;circleDataSource&quot; :params=&quot;params&quot;/&gt;</pre>
        </div>
        <div class="code">
            <pre>
            export default {
                data() {
                    return {
                        circleDataSource: {
                            "title": "多数据源获取仪表图数据",
                            "data": {},
                            "datasource": {
                                "api": '/mock/circleData',
                                "method": 'post'
                            }
                        }
                    };
                }
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDCircle
                :conf="circleDataSource"
                :params="params"/>
        </div>
        <h1>API</h1>
        <Table
            :columns="columns"
            :data="tdata"
        />
        <i-button
            class="higher-btn"
            type="primary"
            @click="openHighSetting()">高级功能</i-button>
        <div v-show="highSetting">
            <h1>conf配置说明</h1>
            <Table
                :columns="columns"
                :data="confData"
            />
            <h1>style说明</h1>
            <Table
                :columns="columns"
                :data="styleData"
            />
            <h1>time说明</h1>
            <Table
                :columns="columns"
                :data="timeData"
            />
            <h1>获取的配置文件数据格式</h1>
            <p>需要将conf转译为字符串作为"configure"的值，格式如下：</p>
            <div class="code">
                <pre>
{
    configure : '{"title":"仪表图配置path","data":[{"namespace":["forDemoNamespace"],"metric":"#{metric1}/#{metric2}","statistics":"avg"}],"style":{"decimals":4,"unit":"%","max":100,"min":0,"threshold":[[90,99,"yellow"],[0,90,"red"],[99,99.99,"green"]]},"link":"http://sia.baidu.com","timeType":"fixed","time":"before(2h)"}',
    title: "仪表图配置path"
}
                </pre>
            </div>
        </div>
   </div>
</template>
<script>
import api from '../service/api/index';
export default {
    data() {
        return {
            params: {},
            confUrl: api.circle.conf,
            dataUrl: api.circle.data,
            times: '',
            circlePath: 'circlePathName',
            circleDisplay: {
                title: '只展示数据的仪表图',
                display: 40
            },
            circleDataSource: {
                'title': '多数据源获取仪表图数据',
                'data': {},
                'datasource': {
                    'api': api.circle.data,
                    'method': 'post'
                }
            },
            circleConf: {
                'title': '仪表图标题conf',
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
                            90,
                            99,
                            'yellow'
                        ],
                        [
                            0,
                            90,
                            'red'
                        ],
                        [
                            99,
                            100,
                            'green'
                        ]
                    ]
                },
                'link': 'http://sia.baidu.com',
                'timeType': 'fix',
                'time': 'before(2h)'
            },
            highSetting: false,
            columns: [
                {
                    title: '属性',
                    key: 'properties'
                },
                {
                    title: '说明',
                    key: 'comment'
                },
                {
                    title: '类型',
                    key: 'type'
                },
                {
                    title: '默认值',
                    key: 'initValue'
                },
                {
                    title: '例子',
                    key: 'demo'
                }
            ],
            tdata: [
                {
                    properties: 'path',
                    comment: '组件id,组件唯一标识,组件会自行查询配置',
                    type: 'string',
                    initValue: '-',
                    demo: 'circlePathName'
                }, {
                    properties: 'conf',
                    comment: '组件配置,可以直接根据配置进行渲染',
                    type: 'object',
                    initValue: '-',
                    demo: '{}'
                }, {
                    properties: 'dataUrl',
                    comment: '获取数据路径，可在visualWidgetConf中统一配置',
                    type: 'string',
                    initValue: '-',
                    demo: '/circleDataUrl/demo.json'
                }, {
                    properties: 'params',
                    comment: '组件时间',
                    type: 'object',
                    initValue: '-',
                    demo: '{start: 2018-01-15 13:46:00, end: 2018-01-15 15:46:00}'
                },
                {
                    properties: 'extraParams',
                    comment: '请求所需多余参数',
                    type: 'object',
                    initValue: '-',
                    demo: '{category: "noahEE"}'
                },
                {
                    properties: 'confMethod',
                    comment: '获取conf的请求方式',
                    type: 'post | get | put',
                    initValue: 'post',
                    demo: 'get'
                }
            ],
            confData: [
                {
                    properties: 'title',
                    comment: '组件标题',
                    type: 'string',
                    initValue: '仪表图',
                    demo: '仪表图标题'
                }, {
                    properties: 'display',
                    comment: '直接展示数据',
                    type: 'number',
                    initValue: '-',
                    demo: '99'
                }, {
                    properties: 'data',
                    comment: '查询数据所需配置，会透传给后端进行查新',
                    type: 'object/array',
                    initValue: '-',
                    demo: '{}'
                }, {
                    properties: 'style',
                    comment: '样式配置,下面会详细介绍',
                    type: 'object',
                    initValue: '-',
                    demo: '{}'
                }, {
                    properties: 'link',
                    comment: '标题链接',
                    type: 'string',
                    initValue: '-',
                    demo: '{http://www.baidu.com}'
                }, {
                    properties: 'timeType',
                    comment: '时间类型：1）relative 组件时间跟随仪表盘时间变动（2）absolute 组件时间绝对定位 （3）fixed 组件固定时间段，时间段可随仪表盘endtime进行偏移',
                    type: 'relative | absolute | fixed',
                    initValue: 'relative',
                    demo: 'relative'
                }, {
                    properties: 'time',
                    comment: '时间配置。可以通过两种形式配置：时间和函数，详情请看time',
                    type: 'string',
                    initValue: 'before(2h)',
                    demo: 'before(2h)'
                }, {
                    properties: 'datasource',
                    comment: '数据源配置，包含数据源地址api和请求类型method',
                    type: 'object',
                    initValue: '-',
                    demo: '{api: "circleDataSource", method: "get"}'
                }
            ],
            styleData: [
                {
                    properties: 'decimals',
                    comment: '小数点后保留位数',
                    type: 'number',
                    initValue: '2',
                    demo: '4'
                }, {
                    properties: 'unit',
                    comment: '单位',
                    type: 'string',
                    initValue: '%',
                    demo: 'W'
                }, {
                    properties: 'threshold',
                    comment: '颜色区间,配置顺序：最小值，最大值，颜色（支持色值）',
                    type: 'array',
                    initValue: '-',
                    demo: '[[0,90,"red"]]'
                }, {
                    properties: 'min',
                    comment: '最小值',
                    type: 'number',
                    initValue: '0',
                    demo: '90'
                }, {
                    properties: 'max',
                    comment: '最大值',
                    type: 'number',
                    initValue: '100',
                    demo: '99.99'
                }
            ],
            timeData: [
                {
                    properties: 'before',
                    comment: '最近多长时间，如before(1h)表示最近1小时',
                    type: 'm:分钟；d：天；h: 小时；M：月；w：周；y：年',
                    initValue: '-',
                    demo: 'before(2d)'
                }, {
                    properties: 'today',
                    comment: '今天',
                    type: 'string',
                    initValue: 'today()',
                    demo: 'today()'
                }, {
                    properties: 'yestoday',
                    comment: '昨天',
                    type: 'string',
                    initValue: 'yestoday()',
                    demo: 'yestoday()'
                }, {
                    properties: 'week',
                    comment: '本周',
                    type: 'string',
                    initValue: 'week()',
                    demo: 'week()'
                }, {
                    properties: 'month',
                    comment: '本月',
                    type: 'string',
                    initValue: 'month()',
                    demo: 'month()'
                }, {
                    properties: 'quarter',
                    comment: '本季',
                    type: 'string',
                    initValue: 'quarter()',
                    demo: 'quarter()'
                }, {
                    properties: 'year',
                    comment: '本年',
                    type: 'string',
                    initValue: 'year()',
                    demo: 'year()'
                }
            ]
        };
    },
    methods: {
        changeTime() {
            this.params = {
                start: this.times[0],
                end: this.times[1]
            };
        },
        formatTime(time) {
            this.times = time;
        },
        openHighSetting() {
            this.highSetting = !this.highSetting;
        }
    }
};
</script>
<style lang="less">
    @import '../assets/css/style.less';
</style>
