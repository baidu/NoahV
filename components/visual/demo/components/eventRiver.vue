<template>
   <div class="demo-holder">
       <h1>概述</h1>
       <p>可视化组件中的事件流图组件，分为事件流图与事件列表两种展现形式对事件的分布情况进行展示。提供了一种方便直观的图形展示方式，用来查看一段时间范围内所有相关事件的概要信息</p>
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
           <NvMDEventRiverView
               :conf="conf"
               :dataUrl="dataUrl"
               :params="param" />
       </div>
       <h1>demo</h1>
       <p>组件调用</p>
       <div class="code">
            <pre>&lt;NvMDEventRiverView
                :path="eventRiverPathName"
                :url="url"
                :dataUrl="dataUrl"
                :params="param" /></pre>
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
                        url: '/mock/eventRiver',
                        dataUrl: '/mock/dataBillboard',
                        eventRiverPathName: 'eventRiverPathName'
                    };
                }
            }
            </pre>
       </div>
       <div class="common-box">
           <NvMDEventRiverView
                   :path="eventRiverPathName"
                   :url="confUrl"
                   :dataUrl="dataUrl"
                   :params="param" />
       </div>
       <p>配置代码格式</p>
       <div class="code">
            <pre>
            {
            "title": "事件流图1",
            "data": {
                "schema": [{
                    "name": "机房1",
                    "type": "NJ01error",
                    "checked": true   "name": "NJ01error"
                    }
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
            "timeType": "fixed",
            "time": "before(2h)"
        }
            </pre>
       </div>
       <p>返回代码格式 <Button type="primary" @click="toggleCode('codeFormat')">显示代码</Button></p>
       <div class="code" v-if="codeFormat">
            <pre>
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
                        "product": {
                            "operator": ["app", "app2", "app3"]
                        },
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503564300
                }, {
                    "startTime": 1503564390,
                    "display": {
                        "type": "BJYZ2机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503564510
                }, {
                    "startTime": 1503562230,
                    "display": {
                        "type": "BJYZ3机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503562320
                }, {
                    "startTime": 1503562730,
                    "display": {
                        "type": "BJYZ4机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503562860
                }, {
                    "startTime": 1503563700,
                    "display": {
                        "type": "BJYZ5机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503563790
                }, {
                    "startTime": 1503564000,
                    "display": {
                        "type": "BJYZ6机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503564060
                }]
            }, {
                "name": "NJ01warning",
                "eventLevel": "warning",
                "eventType": "single",
                "eventList": [{
                    "startTime": 1503563160,
                    "display": {
                        "type": "NJ01机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503563190
                }, {
                    "startTime": 1503563040,
                    "display": {
                        "type": "NJ01机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503563100
                }, {
                    "startTime": 1503561300,
                    "display": {
                        "type": "NJ01机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503561390
                }]
            }, {
                "name": "NJ01error",
                "eventLevel": "error",
                "display": "NJ01机房异常",
                "eventType": "single",
                "eventList": [{
                    "startTime": 1503563100,
                    "endTime": 1503563160
                }]
            }, {
                "name": "GZNSwarning",
                "eventLevel": "warning",
                "display": "GZNS机房异常",
                "eventType": "single",
                "eventList": [{
                    "startTime": 1503561630,
                    "endTime": 1503561660
                }]
            }, {
                "name": "GZHXYerror",
                "eventLevel": "error",
                "display": "GZHXY机房异常",
                "eventType": "single",
                "eventList": [{
                    "startTime": 1503561630,
                    "endTime": 1503561660
                }]
            }]
        },
        success: true
    }
};
            </pre>
       </div>
       <h1>事件列表</h1>
       <p>事件流图可以通过添加一个属性的方式，转换成为事件列表。事件列表是将不同的事件按照时间发生的开始时间进行争取排列，以列表的形式进行展示的图表。</p>
       <div class="common-box">
           <NvMDEventRiverView
               type="list"
               :conf="conf"
               :params="param"
               :dataUrl="dataUrl"/>
       </div>
       <div class="code">
           <pre>
           &lt;NvMDEventRiverView
            type=&quot;list&quot;
            :conf=&quot;conf&quot;
            :dataUrl=&quot;dataUrl&quot;
            :params=&quot;params&quot; /&gt;</pre>
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
           <h1>data数据详细说明,主要介绍事件类型相关配置</h1>
           <Table
                   :columns="columns"
                   :data="dataDetail"
           />
           <h1>eventDetailMap详情配置说明，用户可以根据业务需求自定义配置需要展示的字段和形式</h1>
           <Table
                   :columns="columns"
                   :data="eventDetailMap"
           />
           <h1>time说明</h1>
           <Table
                   :columns="columns"
                   :data="timeData"
           />
           <h1>获取的数据说明</h1>
           <p>数据字段说明：</p>
           <Table
                   :columns="columns"
                   :data="dataConf"
           />
           <p>数据-event详细说明：</p>
           <Table
                   :columns="columns"
                   :data="eventsConf"
           />
           <p>数据-eventlist详细说明：</p>
           <Table
                   :columns="columns"
                   :data="eventlistsConf"
           />
           <p>数据-示例：</p>
           <div class="code">
                <pre>
{
            "extra": [{
                "name": "相关人员",
                "key": "operator"
            }],
            "events": [{
                "name": "BJYZwarning",
                "eventType": "single",
                "eventList": [{
                    "startTime": 1503562250,
                    "display": {
                        "type": "BJYZ1机房异常",
                        "product": {
                            "operator": ["app", "app2", "app3"]
                        },
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503564300
                }, {
                    "startTime": 1503564390,
                    "display": {
                        "type": "BJYZ2机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503564510
                }, {
                    "startTime": 1503562230,
                    "display": {
                        "type": "BJYZ3机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503562320
                }, {
                    "startTime": 1503562730,
                    "display": {
                        "type": "BJYZ4机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503562860
                }, {
                    "startTime": 1503563700,
                    "display": {
                        "type": "BJYZ5机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503563790
                }, {
                    "startTime": 1503564000,
                    "display": {
                        "type": "BJYZ6机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
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
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503563190
                }, {
                    "startTime": 1503563040,
                    "display": {
                        "type": "NJ01机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
                    },
                    "endTime": 1503563100
                }, {
                    "startTime": 1503561300,
                    "display": {
                        "type": "NJ01机房异常",
                        "operator": "app",
                        "url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"
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
        }
                </pre>
           </div>
       </div>
   </div>
</template>
<script>
import api from '../service/api/index';
const param = {
    start: '2017-08-24 15:41:00',
    end: '2017-08-24 17:51:00'
};
export default {
    data() {
        return {
            dataUrl: api.eventRiver.data,
            param: param,
            conf: {},
            eventRiverPathName: 'eventRiverPathName',
            confUrl: api.eventRiver.conf,
            type: 'list',
            times: '',
            codeFormat: false,
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
                    demo: 'eventriverPathName'
                }, {
                    properties: 'conf',
                    comment: '组件配置,可以直接根据配置进行渲染,详情可看「配置代码格式」，详细字段说明见高级配置',
                    type: 'object',
                    initValue: '-',
                    demo: '{}'
                }, {
                    properties: 'url',
                    comment: '获取组件配置的API接口，可在visualWidgetConf中统一配置',
                    type: 'string',
                    initValue: '-',
                    demo: '/mock/eventRiver.js'
                }, {
                    properties: 'dataUrl',
                    comment: '获取数据路径，可在visualWidgetConf中统一配置',
                    type: 'string',
                    initValue: '-',
                    demo: '/eventriverDataUrl/demo.json'
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
                    properties: 'data',
                    comment: '查询数据所需配置，需要包含图表中需要展示的事件类型配置(这个配置也可以随着数据一同返回，数据返回的事件类型优先级最高)',
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
                    properties: 'schema',
                    comment: '配置该要表,下面介绍schema内部字段',
                    type: 'object',
                    initValue: '{}',
                    demo: '{}'
                }, {
                    properties: 'name',
                    comment: '该事件展示名称',
                    type: 'string',
                    initValue: '-',
                    demo: '事件一'
                }, {
                    properties: 'type',
                    comment: '匹配事件关键字，唯一标识',
                    type: 'string',
                    initValue: '-',
                    demo: 'NJ01error'
                }, {
                    properties: 'checked',
                    comment: '图表初始化时，是否为选中状态',
                    type: 'boolean',
                    initValue: 'true',
                    demo: 'true'
                },
                {
                    properties: 'eventDetailMap',
                    comment: '详情字段自定义配置，用户可以根据查询的结果，自定义配置展示字段的展示与关键字对照',
                    type: '[{}]',
                    initValue: '-',
                    demo: '[{"name": "创造者",\n'
                        + '"key": "product.operator",\n'
                        + '"type": "arr"}]'
                },
                {
                    properties: 'eventDetailMap',
                    comment: '详情字段自定义配置，用户可以根据查询的结果，自定义配置展示字段的展示与关键字对照',
                    type: '[{}]',
                    initValue: '-',
                    demo: '[{"name": "创造者",\n'
                        + '"key": "product.operator",\n'
                        + '"type": "arr"}]'
                }
            ],
            eventDetailMap: [
                {
                    properties: 'name',
                    comment: '展示名称，对返回字段展示相应字符串',
                    type: 'string',
                    initValue: '-',
                    demo: '创建者'
                },
                {
                    properties: 'key',
                    comment: '匹配查询事件的字段，展示其真实数值，可以配置为对象的属性',
                    type: 'string',
                    initValue: '-',
                    demo: 'product.operator'
                },
                {
                    properties: 'type',
                    comment: '展示数据的类别，可选类别有：arr（数组）,text（文本）, link（链接）',
                    type: 'string',
                    initValue: '-',
                    demo: 'text'
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
            dataConf: [
                {
                    properties: 'events',
                    comment: '事件值，包含每种事件的相关信息以及每种事件下的子事件信息',
                    type: '[{}]',
                    initValue: '[{}]',
                    demo: '详情看下表'
                },
                {
                    properties: 'dataSchema',
                    comment: '事件类型列表（可选字段），如果在conf中配置过schema可不传，如果传该字段，则优先级高于conf中的schema',
                    type: '[{}]',
                    initValue: '[{}]',
                    demo: '详情见schema说明'
                },
                {
                    properties: 'extra',
                    comment: '事件列表的额外字段，事件列表默认展示字段："事件描述"，"事件类型", "开始时间", "结束时间",如果想要展示额外字段，需要配置该字段进行映射展示',
                    type: '[{}]',
                    initValue: '[{}]',
                    demo: '"name": "相关人员",\n'
                        + '"key": "operator"'
                }
            ],
            eventsConf: [
                {
                    properties: 'name',
                    comment: '事件名称，事件唯一标识，用于与事件列表schema匹配',
                    type: 'string',
                    initValue: '-',
                    demo: 'NJ01warning'
                },
                {
                    properties: 'eventType',
                    comment: '事件类型，标识事件的类型，有single和combine两种事件',
                    type: 'string',
                    initValue: 'single',
                    demo: 'single'
                },
                {
                    properties: 'eventList',
                    comment: '子事件列表，展示该种事件类型包含哪些子事件',
                    type: '[{}]',
                    initValue: '-',
                    demo: '[{}]'
                }
            ],
            eventlistsConf: [
                {
                    properties: 'startTime',
                    comment: '子事件开始时间,单位：秒',
                    type: 'string',
                    initValue: '-',
                    demo: '1503563160'
                },
                {
                    properties: 'endTime',
                    comment: '子事件结束时间,单位：秒',
                    type: 'string',
                    initValue: '-',
                    demo: '1503563160'
                },
                {
                    properties: 'display',
                    comment: '事件详情字段，这里会返回该事件的详细信息，但展示哪些需要结合eventDetailMap进行展示',
                    type: 'Object',
                    initValue: '{}',
                    demo: '"type": "NJ01机房异常",\n'
                        + '"operator": "app",\n'
                        + '"url": "http://www.mkt.nuomi.com/oam/#/allActivityDetail/780639"'
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
        toggleCode(el) {
            this[el] = !this[el];
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
