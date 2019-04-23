
## 概述

提供时序数据多指标展示、时间筛选、阈值展示等功能

## 基础示例


<template>
    
<Card>

<p slot="title">时序趋势图示例</p>
<template>
    <div class="filter-table-doc">
        <div class="example">
            <normalTrendExample />
        </div>
    </div>
</template>


<nv-code :content="filterTableDemoTplCode">
</nv-code>

</Card>
</template>

## API


参考[日历组件](#/doc/component/date-picker)和[趋势图组件](#/doc/component/business/trend)



## 示例中接口返回数据

<nv-code :content="filterTableDemoTplApi"  title="查看接口数据" closeTitle="收起接口数据" copyTitle="复制接口数据">
</nv-code>

<script>
import normalTrendExample from  '../../../example/trend/trend.vue';
const filterTableDemoTpl = `
<template>
    <div class="example-trend-trend">
        <div class="time-filter-area">
            <NvDatePicker
                :width="350"
                type="daterangetime"
                :dateFormat="time.dateFormat"
                v-model="time.value"
                :options="time.dateOptions"
                @on-change="timeChange"
            />
        </div>
        <NvTrend
            method="post"
            :options="trendConf.options"
            :title="trendConf.title"
            :url="trendConf.url"
            :params="trendConf.params"
            :show-loading="trendConf.showLoading"
        />
    </div>
</template>

<script>
import m from 'moment';
import _ from 'lodash';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DEFAULT_TIME = {
    startTime: m().subtract(2, 'hour'),
    endTime: m()
};
export default {
    name: 'example-trend-trend',
    data() {
        return {
            time: {
                dateFormat: DATE_FORMAT,
                value: [
                    DEFAULT_TIME.startTime.toDate(),
                    DEFAULT_TIME.endTime.toDate()
                ],
                dateOptions: {
                    position: 'outer',
                    shortcuts: [
                        {
                            text: '30分钟',
                            value() {
                                return [
                                    m().subtract(30, 'minute').toDate(),
                                    m().toDate()
                                ];
                            }
                        },
                        {
                            text: '1小时',
                            value() {
                                return [
                                    m().subtract(1, 'hour').toDate(),
                                    m().toDate()
                                ];
                            }
                        },
                        {
                            text: '2小时',
                            defaultSelected: true,
                            value() {
                                return [
                                    m().subtract(2, 'hour').toDate(),
                                    m().toDate()
                                ];
                            }
                        },
                        {
                            text: '1天',
                            value() {
                                return [
                                    m().subtract(1, 'day').toDate(),
                                    m().toDate()
                                ];
                            }
                        },
                        {
                            text: '7天',
                            value() {
                                return [
                                    m().subtract(7, 'day').toDate(),
                                    m().toDate()
                                ];
                            }
                        }
                    ]
                }
            },
            trendConf: {
                // title 可选
                title: '趋势图',
                // api 必选
                url: '/api/tpl/trend/get',
                params: {
                    startTime: DEFAULT_TIME.startTime.format(DATE_FORMAT),
                    endTime: DEFAULT_TIME.endTime.format(DATE_FORMAT)
                },
                // showLoading 可选
                showLoading: '数据加载中...',
                // options 可选
                options: {
                    threshold: 150000
                }
            }
        };
    },
    computed: {
    },
    methods: {
        timeChange(time) {
            if (Array.isArray(time) && time.length === 2) {
                if (time[0] && time[1]) {
                    let params = Object.assign({}, this.trendConf.params, {
                        startTime: m(time[0]).format(DATE_FORMAT),
                        endTime: m(time[1]).format(DATE_FORMAT)
                    });
                    if (!_.isEqual(this.trendConf.params, params)) {
                        this.trendConf.params = params;
                    }
                }
            }

        }
    }
};
<\/script>

<style lang="less" >
    .example-trend-trend {
        .time-filter-area {
            border: none;
            padding: 0;
            margin-bottom: 20px;
        }
    }
<\/style>

`;
const filterTableDemoTplApi = `
{
    data: {
        title: 'QPS',
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
        ]
    },
    success: true
}
`
export default {
    name: 'trendDoc',
    components: {
        normalTrendExample
    },
    data() {
        return {
            filterTableDemoTplCode: filterTableDemoTpl,
            filterTableDemoTplApi: filterTableDemoTplApi
        }
    }
};
</script>

<style lang="less" >
    .filter-table-doc {
        .example {
            margin: 20px 0;
        }
    }
    .filter-table-tip:before{
        content: '*';
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed3f14;
    }
</style>
