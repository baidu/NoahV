<template>
   <div class="demo-holder">
        <h1>概述</h1>
        <p>可视化组件中的趋势图组件，可以多维度数据提供数据对比、数据补全处理、异常数据提示、多种数据样式转换等功能。支持展示多维度数据以及非多维度数据。并且提供多表联动，支持多个趋势图相同时间点的数据对比。</p>
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
            <NvMDTrend
                :conf="trendConf"
                :dataUrl="dataUrl"
                :params="params"
                :extraStyle="extraStyle"
                :extraParams="extraParams"/>
        </div>
        <div class="common-box">
            <NvMDTrend
                :conf="trendConf"
                :dataUrl="dataUrl"
                :params="params"
                :extraUrls="extraUrls"
                :extraParams="extraParams"/>
        </div>
        <h1>demo</h1>
        <p>组件调用</p>
        <div class="code">
            <pre>&lt;NvMDTrend
                :path=&quot;trendConf&quot;
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
                        url: '/mock/trendConf',
                        dataUrl: '/mock/trendData',
                        trendPath: 'trendPathName'
                    };
                }
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDTrend
                :path="trendPath"
                :url="confUrl"
                :dataUrl="dataUrl"
                :params="params"
                :extraParams="extraParams"/>
        </div>
        <p>无配置调用</p>
        <div class="code">
            <pre>&lt;NvMDTrend/&gt;</pre>
        </div>
        <p>配置数据展示</p>
        <div class="code">
            <pre>&lt;NvMDTrend :conf=&quot;trendConf&quot;/&gt;</pre>
        </div>
        <div class="code">
            <pre>
            export default {
                data() {
                    return {
                        trendConf: {
                            display: [{
                                name: 'serie1',
                                data: [[1501220160000, 30], [1501220600000, 100], [1501220680000, 300]]
                            },
                            {
                                name: 'serie2',
                                data: [[1501220160000, 70], [1501220600000, 150], [1501220680000, 200]]
                            }]
                        }
                    };
                }
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDTrend
                :path="trendPath"
                :conf="trendDisplayConf"
                :params="params"
                :extraParams="extraParams"/>
        </div>
        <p>多数据源配置方式</p>
        <div class="code">
            <pre>&lt;NvMDTrend :conf=&quot;trendDataSource&quot; :params=&quot;params&quot;/&gt;</pre>
        </div>
        <div class="code">
            <pre>
            export default {
                data() {
                    return {
                        trendDataSource: {
                            "title": "多数据源获取趋势图数据",
                            "data": {},
                            "datasource": {
                                "api": '/mock/trendData',
                                "method": 'post'
                            }
                        }
                    };
                }
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDTrend :conf="trendDataSource" :params="params"/>
        </div>
        <h1>API</h1>
        <Table
            :columns="columns"
            :data="tdata"
        />
        <i-button class="higher-btn" type="primary" @click="openHighSetting()">高级功能</i-button>
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
    configure: '{"title":"趋势图标题Conf","data":[{"namespace":["forDemoNamespace1","forDemoNamespace2"],"product":"noahEE","monitoringType":"instance","metric":"#{metric1}/#{metric2}","statistics":"avg","period":5,"name":"name1","contrast":["1d","1w"]},{"namespace":["forDemoNamespace3","forDemoNamespace4"],"product":"noahEE","monitoringType":"instance","metric":"#{metric3}","statistics":"avg","period":5,"name":"name2","contrast":["1d"]}],"style":{"displayType":"line","unit":"个","nullPointMode":"zero","threshold":99},"link":"http://www.baidu.com","timeType":"relative","time":"before(2h)"}'
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
            extraStyle: {
                dataZoom: {
                    show: false
                },
                series: {
                    symbol: 'emptyCircle',
                    showSymbol: false
                }
            },
            extraUrls: {
                customEventsUrl: '/mock/trendEvent',
                warningEventsUrl: '/mock/trendWarning',
                trendPointsUrl: '/mock/trendPoint'
            },
            params: {},
            confUrl: api.trend.conf,
            dataUrl: api.trend.data,
            times: '',
            trendPath: 'trendPathName',
            trendDataSource: {
                'title': '多数据源获取趋势图数据',
                'data': {},
                'datasource': {
                    'api': api.trend.data,
                    'method': 'post'
                }
            },
            trendConf: {
                'title': '趋势图标题',
                eventList: [
                    {
                        'checked': true,
                        'datasource': {
                            'dsId': 12,
                            'extraParams': {
                                'productName': [
                                    'searchbox',
                                    'vp',
                                    'vp-other'
                                ]
                            },
                            'index': '',
                            'name': 'searchbox_orpLaunch',
                            'type': 'orpLaunch',
                            'url': 'http://www.noahv.org'
                        },
                        'dimensionList': [],
                        'display': true,
                        'displayCheckbox': true,
                        'displayDimension': true,
                        'dsId': 12,
                        'id': 12,
                        'maxNum': 500,
                        'name': 'ORP上线',
                        'needTimeLine': true
                    }
                ],
                'data': [
                    {
                        'namespace': [
                            'forDemoNamespace1',
                            'forDemoNamespace2'
                        ],
                        ruleNames: ['group.mobile-ux-orp-logstream.MAP.all:group:android-crash率报警'],
                        cycle: '111',
                        'product': 'noahEE',
                        'monitoringType': 'instance',
                        'metric': '#{metric1}/#{metric2}',
                        'statistics': 'avg',
                        'period': 5,
                        'name': 'name1',
                        'contrast': [
                            '1d',
                            '1w'
                        ]
                    },
                    {
                        'namespace': [
                            'forDemoNamespace3',
                            'forDemoNamespace4'
                        ],
                        'product': 'noahEE',
                        'monitoringType': 'instance',
                        'metric': '#{metric3}',
                        'statistics': 'avg',
                        'period': 5,
                        'name': 'name2',
                        'contrast': ['1d']
                    }
                ],
                'style': {
                    'displayType': 'line',
                    'unit': '个',
                    'nullPointMode': 'zero',
                    // 'threshold': 99.9990,
                    'decimals': 4
                },
                'link': 'http://www.baidu.com',
                'timeType': 'relative',
                'time': 'before(2h)'
            },
            trendDisplayConf: {
                display: [
                    {
                        name: 'serie1',
                        data: [[1501220160000, 0], [1501220600000, 0], [1501220680000, 0]]
                    },
                    {
                        name: 'serie2',
                        data: [[1501220160000, 0], [1501220600000, 0], [1501220680000, 0]]
                    }
                ]
            },
            extraParams: {},
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
                    demo: 'trendPathName'
                }, {
                    properties: 'conf',
                    comment: '组件配置,可以直接根据配置进行渲染',
                    type: 'object',
                    initValue: '-',
                    demo: '{}'
                }, {
                    properties: 'dataUrl',
                    comment: '获取数据路径，用户可统一配置',
                    type: 'string',
                    initValue: '-',
                    demo: '/trendDataUrl/demo.json'
                }, {
                    properties: 'params',
                    comment: '组件时间',
                    type: 'object',
                    initValue: '-',
                    demo: '{start: 2018-01-15 13:46:00, end: 2018-01-15 15:46:00}'
                }, {
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
                    initValue: '趋势图标题',
                    demo: '趋势图标题'
                }, {
                    properties: 'display',
                    comment: '直接展示数据',
                    type: 'array',
                    initValue: '-',
                    demo: '[]'
                }, {
                    properties: 'data',
                    comment: '查询数据所需配置，会透传给后端进行查新',
                    type: 'array',
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
                    demo: '{api: "trendDataSource", method: "get"}'
                }
            ],
            styleData: [
                {
                    properties: 'displayType',
                    comment: '默认趋势图展示类型',
                    type: 'line | area | column | stack | normal',
                    initValue: 'line',
                    demo: 'area'
                }, {
                    properties: 'unit',
                    comment: '单位',
                    type: 'string',
                    initValue: '',
                    demo: '%'
                }, {
                    properties: 'nullPointMode',
                    comment: '断点处理方式',
                    type: 'zero | connect | null',
                    initValue: 'zero',
                    demo: 'connect'
                }, {
                    properties: 'threshold',
                    comment: '警示阈值',
                    type: 'number',
                    initValue: '0',
                    demo: '90'
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
