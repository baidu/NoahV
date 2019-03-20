<template>
    <div class="demo-holder">
        <h1>概述</h1>
        <p>可视化组件中的数据面板组件，主要功能为展示某指标在一段时间内的统计值。</p>
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
            <NvMDBillboard
                :dataUrl="dataUrl"
                :params="params"
                :conf="billboardConf" />
        </div>
        <h1>demo</h1>
        <p>组件调用</p>
        <div class="code">
            <pre>&lt;NvMDBillboard
                :path=&quot;billboardPath&quot;
                :url=&quot;url&quot;
                :dataUrl=&quot;dataUrl&quot;
                :params=&quot;params&quot; /&gt;</pre>
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
                        url: '/mock/billboard',
                        dataUrl: '/mock/dataBillboard',
                        billboardPath: 'billboardPathName'
                    };
                }
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDBillboard
                :path="billboardPath"
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
                        billboardConf: {
                            "title": "面板标题Conf",
                            "data": [{
                                "namespace": [
                                    "forDemoNamespace1"
                                ],
                                 "metric": "#{metric1}/#{metric2}",
                                "statistics": "avg",
                                "name": "name1",
                                "unit": "%",
                                "decimals": 4
                            },
                            {
                                "namespace": [
                                    "forDemoNamespace2"
                                ],
                                "metric": "#{metric3}",
                                "statistics": "avg",
                                "name": "name2",
                                "unit": "%",
                                "decimals": 4
                            }],
                            "link": "http://sia.baidu.com",
                            "timeType": "relative",
                            "time": "before(2h)"
                        },
                        dataUrl: '/mock/dataBillboard',
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
            <NvMDBillboard
                :conf="billboardConf"
                :dataUrl="dataUrl"
                :params="params"/>
        </div>
        <p>无配置调用</p>
        <div class="code">
            <pre>&lt;NvMDBillboard :params=&quot;params&quot;/&gt;</pre>
        </div>
        <p>配置数据展示</p>
        <div class="code">
            <pre>&lt;NvMDBillboard :conf=&quot;billboardDisplay&quot;/&gt;</pre>
        </div>
        <div class="code">
            <pre>
            export default {
                data() {
                    return {
                        billboardDisplay: {
                            display: [{
                                name: 'title1',
                                value: '88%'
                            }]
                        }
                    };
                }
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDBillboard
                :conf="billboardDisplay"
                :params="params"/>
        </div>
        <p>多数据源配置方式</p>
        <div class="code">
            <pre>&lt;NvMDBillboard :conf=&quot;billboardDataSource&quot; :params=&quot;params&quot;/&gt;</pre>
        </div>
        <div class="code">
            <pre>
            export default {
                data() {
                    return {
                        billboardDataSource: {
                            "title": "多数据源获取面板数据",
                            "data": {},
                            "datasource": {
                                "api": '/mock/dataBillboard',
                                "method": 'post'
                            }
                        }
                    };
                }
            }
            </pre>
        </div>
        <div class="common-box">
            <NvMDBillboard
                :conf="billboardDataSource"
                :params="params"/>
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
            <h1>data数据详细说明</h1>
            <Table
                :columns="columns"
                :data="dataDetail"
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
    configure : '{"title":"面板配置path","data":[{"namespace":["forDemoNamespace1"],"metric":"#{metric1}/#{metric2}","statistics":"avg","name":"name3","unit":"%","decimals":4},{"namespace":["forDemoNamespace2"],"metric":"#{metric3}","statistics":"avg","name":"name4","unit":"%","decimals":4}],"link":"http://sia.baidu.com","timeType":"relative","time":"before(2h)"}',
    title: "面板配置path"
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
            confUrl: api.billboard.conf,
            dataUrl: api.billboard.data,
            times: '',
            billboardPath: 'billboardPathName',
            billboardConf: {
                'title': '面板标题Conf',
                'data': [
                    {
                        'namespace': ['forDemoNamespace1'],
                        'metric': '#{metric1}/#{metric2}',
                        'statistics': 'avg',
                        'name': 'name1',
                        'unit': '%',
                        'decimals': 4
                    },
                    {
                        'namespace': ['forDemoNamespace2'],
                        'metric': '#{metric3}',
                        'statistics': 'avg',
                        'name': 'name2',
                        'unit': '%',
                        'decimals': 4
                    }
                ],
                'link': 'http://sia.baidu.com',
                'timeType': 'relative',
                'time': 'before(2h)'
            },
            billboardDisplay: {
                display: [
                    {
                        name: 'title1',
                        value: '88%'
                    }
                ]
            },
            billboardDataSource: {
                'title': '多数据源获取面板数据',
                'data': {},
                'datasource': {
                    'api': api.billboard.data,
                    'method': 'post'
                }
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
                    demo: 'billboardPathName'
                }, {
                    properties: 'conf',
                    comment: '组件配置,可以直接根据配置进行渲染',
                    type: 'object',
                    initValue: '-',
                    demo: '{}'
                }, {
                    properties: 'url',
                    comment: '获取组件配置的API接口，可在visualWidgetConf中统一配置',
                    type: 'string',
                    initValue: '-',
                    demo: '/mock/billboard.js'
                }, {
                    properties: 'dataUrl',
                    comment: '获取数据路径，可在visualWidgetConf中统一配置',
                    type: 'string',
                    initValue: '-',
                    demo: '/billboardDataUrl/demo.json'
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
                    initValue: '数据面板',
                    demo: '数据面板'
                }, {
                    properties: 'display',
                    comment: '需要展示的子数据列表对象',
                    type: 'object',
                    initValue: '-',
                    demo: '[{name: "子标题",value: 0,unit: "%"}]'
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
                    demo: '{api: "billboardDataSource", method: "get"}'
                }
            ],
            dataDetail: [
                {
                    properties: 'name',
                    comment: '子标题题目',
                    type: 'string',
                    initValue: '-',
                    demo: 'name1'
                }, {
                    properties: 'unit',
                    comment: '单指标数据单位',
                    type: 'string',
                    initValue: '%',
                    demo: 'W'
                }, {
                    properties: 'decimals',
                    comment: '单指标数据保留小数点的位数',
                    type: 'number',
                    initValue: '2',
                    demo: '4'
                }, {
                    properties: 'params',
                    comment: '多数据源API配置时，请求的额外参数，只有配置多数据源时会带有的参数',
                    type: 'object',
                    initValue: '{}',
                    demo: '{extraDataSource: {}}'
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
