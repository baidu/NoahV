<template>
   <div class="demo-holder">
        <h1>概述</h1>
        <p>可视化组件中的报表组件，可以根据指标数据决定显示颜色。适合于可用性、容量等数值展示。一个仪表图只能展示一个数据。该数据可以是一个指标、也可以是同一个namespace下多个指标运算后结果。</p>
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
            <NvMDReport
                :conf="reportConf"
                :dataUrl="dataUrl"
                :params="params"/>
        </div>
        <h1>demo</h1>
        <p>组件调用</p>
        <div class="code">
            <pre>&lt;NvMDReport
                :path=&quot;reportPath&quot;
                :url=&quot;confUrl&quot;
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
                        confUrl: '/mock/report',
                        dataUrl: '/mock/reportData',
                        reportPath: 'reportPathName'
                    };
                }
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDReport
                :path="reportPath"
                :url="confUrl"
                :dataUrl="dataUrl"
                :params="params"/>
        </div>
        <p>数据展开情况</p>
        <div class="code">
            <pre>&lt;NvMDReport
                :path=&quot;reportPath&quot;
                :url=&quot;confUrl&quot;
                :dataUrl=&quot;dataTreeUrl&quot;/&gt;</pre>
        </div>
        <div class="code">
            <pre>
            export default {
                data() {
                    return {
                        params: {
                            start: '2018-01-30 17:26:00',
                            end: '2018-01-30 18:26:00'
                        },
                        confUrl: '/mock/report',
                        dataTreeUrl: '/mock/reportTreeData',
                        reportPath: 'reportPathName'
                    };
                }
            }
            </pre>
        </div>
        <p>报表数据信息</p>
        <div class="code">
            <pre>
            return {
                "data": [{
                    "name": "plat",
                    "value": "bid",
                    "alias": null,
                    "metrics": {
                        "alias1": null,
                        "alias2": null,
                        "alias3": null,
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
                            "alias1": null,
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
                }],
                success: true
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDReport
                :path="reportPath"
                :url="confUrl"
                :dataUrl="dataTreeUrl"
                :params="params"/>
        </div>
        <p>多数据源配置方式</p>
        <div class="code">
            <pre>&lt;NvMDReport :conf=&quot;reportDataSource&quot; :params=&quot;params&quot;/&gt;</pre>
        </div>
        <div class="code">
            <pre>
            export default {
                data() {
                    return {
                        reportDataSource: {
                            "title": "多数据源获取报表数据",
                            "data": {
                                "caption": "多数据源列标题",
                                "namespace": [
                                    "forDemoNamespace"
                                ],
                                "comments": "说明",
                                "columns": [{
                                    "source": "origin", // 使用原始数据
                                    "metric": "#{metric1}-#{metric2}",
                                    "statistics": "sum",
                                    "group": "",
                                    "header": "列名1",
                                    "alias": "alias3", // 别名，列计算时用到
                                    "unit": "%",
                                    "decimals": 3,
                                    "threshold": [
                                      [
                                        0,
                                        90,
                                        "#ff0000"     // 表示小于90，红色
                                      ],
                                      [
                                        90,
                                        95,
                                        "#0000ff"  // 表示大于90，黄色
                                      ],
                                      [
                                        99,
                                        100,
                                        "green"       // 表示处于[99,100]区间，绿色
                                      ]
                                    ],
                                    "timeType":"relative",
                                    "time":"before(2h)",
                                    "total": 'sum',
                                    "use":true,
                                    "offset":"-1d"
                                }, {
                                    "source": "column", // 使用列数据，选择该模式时，use必须为true，没有时间选择和offset，没有alias
                                    "group": "group",
                                    "header": "列计算",
                                    "metric": "#{alias3}+#{alias2}",
                                    "unit": "",
                                    "decimals": 3,
                                    "threshold": [
                                      [
                                        null,
                                        90,
                                        "red"     // 表示小于90，红色
                                      ],
                                      [
                                        90,
                                        null,
                                        "yellow"  // 表示大于90，黄色
                                      ],
                                      [
                                        99,
                                        100,
                                        "green"       // 表示处于[99,100]区间，绿色
                                      ]
                                    ],
                                    "total": 'avg',
                                    "use": true
                                }]
                            },
                            "datasource": {
                                "api": api.report.data,
                                "method": 'post'
                            }
                        }
                    };
                }
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDReport
                :conf="reportDataSource"
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
            <h1>date说明</h1>
            <Table
                :columns="columns"
                :data="dataInfo"
            />
            <h1>time说明</h1>
            <Table
                :columns="columns"
                :data="timeData"
            />
            <h1>columns说明</h1>
            <Table
                :columns="columns"
                :data="columnsData"
            />
            <h1>获取的配置文件数据格式</h1>
            <p>需要将conf转译为字符串作为"configure"的值，格式如下：</p>
            <div class="code">
                <pre>
{
    "title": "资源报表名称",
    configure : '{"title":"资源报表名称","data":{"namespace":["forDemoNamespace"],"comments":"说明","columns":[{"source":"origin","metric":"#{metric1}-#{metric2}","statistics":"sum","group":"","header":"数据1","alias":"alias3","unit":"%","decimals":3,"threshold":[[0,90,"#ff0000"],[90,95,"#0000ff"],[99,100,"green"]],"timeType":"relative","time":"before(2h)","total":"sum","use":true,"offset":"-1d"},{"source":"origin","metric":"#{metric1}-#{metric2}","statistics":"sum","group":"综合数据","header":"数据1","alias":"alias1","unit":"%","decimals":3,"threshold":[[0,90,"#ff0000"],[90,95,"#0000ff"],[99,100,"green"]],"timeType":"relative","time":"before(2h)","total":null,"use":true,"offset":"-1d"},{"source":"origin","group":"综合数据","header":"数据2","alias":"alias2","metric":"#{metric1}-#{metric2}","unit":"%","decimals":3,"threshold":[[0,90,"#ff0000"],[90,95,"#0000ff"],[99,100,"green"]],"total":null,"use":true},{"source":"column","group":"综合数据","header":"列计算","metric":"#{alias3}+#{alias2}","unit":"","decimals":3,"threshold":[[null,90,"red"],[90,null,"yellow"],[99,100,"green"]],"total":"avg","use":true}]},"link":"http://www.baidu.com"}'
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
            confUrl: api.report.conf,
            dataUrl: api.report.data,
            dataTreeUrl: api.report.treeData,
            times: '',
            reportPath: 'reportPathName',
            reportDataSource: {
                'title': '多数据源获取报表数据',
                'data': {
                    'caption': '多数据源列标题',
                    'namespace': ['forDemoNamespace'],
                    'comments': '说明',
                    'columns': [
                        {
                            'source': 'origin',
                            'metric': '#{metric1}-#{metric2}',
                            'statistics': 'sum',
                            'group': '',
                            'header': '列名1',
                            'alias': 'alias3',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000'
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff'
                                ],
                                [
                                    99,
                                    100,
                                    'green'
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': 'sum',
                            'use': true,
                            'offset': '-1d'
                        }, {
                            'source': 'column',
                            'group': 'group',
                            'metric': '#{alias3}+#{alias2}',
                            'header': '列计算',
                            'alias': 'alias3',
                            'unit': '',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000'
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff'
                                ],
                                [
                                    99,
                                    100,
                                    'green'
                                ]
                            ],
                            'total': 'avg',
                            'use': true
                        }
                    ]
                },
                'datasource': {
                    'api': api.report.data,
                    'method': 'post'
                }
            },
            reportConf: {
                'title': '表格标题1',
                'data': {
                    'caption': '列标题',
                    'namespace': ['forDemoNamespace'],
                    'comments': '说明',
                    'columns': [
                        {
                            'source': 'origin',
                            'metric': '#{metric1}-#{metric2}',
                            'statistics': 'sum',
                            'group': '',
                            'header': '列名1',
                            'alias': 'alias3',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000'
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff'
                                ],
                                [
                                    99,
                                    100,
                                    'green'
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': 'sum',
                            'use': true,
                            'offset': '-1d'
                        }, {
                            'source': 'origin',
                            'metric': '#{metric1}-#{metric2}',
                            'statistics': 'sum',
                            'group': '',
                            'header': '列名1',
                            'alias': 'alias3',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000'
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff'
                                ],
                                [
                                    99,
                                    100,
                                    'green'
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': 'sum',
                            'use': true,
                            'offset': '-1d'
                        },
                        {
                            'source': 'origin',
                            'metric': '#{metric1}-#{metric2}',
                            'statistics': 'sum',
                            'group': '',
                            'header': '列名1',
                            'alias': 'alias3',
                            'unit': '%',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000'
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff'
                                ],
                                [
                                    99,
                                    100,
                                    'green'
                                ]
                            ],
                            'timeType': 'relative',
                            'time': 'before(2h)',
                            'total': 'sum',
                            'use': true,
                            'offset': '-1d'
                        },
                        {
                            'source': 'column',
                            'group': 'group',
                            'metric': '#{alias3}+#{alias2}',
                            'header': '列计算',
                            'alias': 'alias3',
                            'unit': '',
                            'decimals': 3,
                            'threshold': [
                                [
                                    0,
                                    90,
                                    '#ff0000'
                                ],
                                [
                                    90,
                                    95,
                                    '#0000ff'
                                ],
                                [
                                    99,
                                    100,
                                    'green'
                                ]
                            ],
                            'total': 'avg',
                            'use': true
                        }
                    ]
                },
                'link': 'http://www.baidu.com'
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
                    demo: 'reportPathName'
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
                    demo: '/reportDataUrl/demo.json'
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
                }, {
                    properties: 'confMethod',
                    comment: '获取conf的请求方式',
                    type: 'post | get | put',
                    initValue: 'post',
                    demo: 'get'
                }
            ],
            confData: [
                {
                    properties: 'caption',
                    comment: '列名标题',
                    type: 'string',
                    initValue: '监控对象',
                    demo: '列名'
                }, {
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
                    demo: '{api: "reportDataSource", method: "get"}'
                }
            ],
            dataInfo: [
                {
                    properties: 'comments',
                    comment: '表格说明',
                    type: 'String',
                    initValue: '-',
                    demo: '这里是这个表格的说明文字'
                }, {
                    properties: 'columns',
                    comment: '列信息',
                    type: 'array',
                    initValue: '[]',
                    demo: '详细介绍看columns'
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
            ],
            columnsData: [
                {
                    properties: 'source',
                    comment: '列类型。分为origin：源数据和column：列计算',
                    type: 'string',
                    initValue: 'origin',
                    demo: 'source: origin '
                }, {
                    properties: 'group',
                    comment: '列分组，可以把多个列分到相同的组内',
                    type: 'string',
                    initValue: '-',
                    demo: '数据综合 '
                }, {
                    properties: 'header',
                    comment: '列名成，显示的文字',
                    type: 'string',
                    initValue: '-',
                    demo: '列名1'
                }, {
                    properties: 'alias',
                    comment: '用户匹配数据的key值；也可以用作列计算的派生计算key',
                    type: 'string',
                    initValue: '-',
                    demo: 'alias1'
                }, {
                    properties: 'metric',
                    comment: '后端用户计算的字段，可以根据后端环境进行配置',
                    type: 'string',
                    initValue: '-',
                    demo: 'metric1'
                }, {
                    properties: 'unit',
                    comment: '单位',
                    type: 'string',
                    initValue: '-',
                    demo: '%'
                }, {
                    properties: 'decimals',
                    comment: '保留的小数点位数',
                    type: 'number',
                    initValue: '-',
                    demo: '2'
                }, {
                    properties: 'threshold',
                    comment: '阈值设置，用于将不同的数据根据阈值展示相应的颜色',
                    type: 'array',
                    initValue: '-',
                    demo: '[[null,90,"red"]]'
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
