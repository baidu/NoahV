[[TOC]]

## 概述

趋势图组件将请求后的数据转化成趋势图

:::
```html
<template>
   <nv-trend method="post" :options="optionsTrend" title="趋势图" :url="url" :params="params" show-loading="数据加载中..."  />
</template>
<script>
export default {
    data() {
        return {
            params: {
                test: 'trend'
            },
            optionsTrend: {

            },
            url: '/api/trend'
        }
    }
}
</script>
```
:::

        <div class="usage-item">
            <nvTrend method="post" :options="optionsTrend" title="趋势图" :url="url" :params="params" show-loading="数据加载中..."  />
            <nv-code :content="code"></nv-code><br/>
        </div>

        <div class="usage-item">
            <h2>API</h2>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdata"
            />
        </div>

        <div class="usage-item">
            <h2>request请求返回数据格式</h2>
            <nv-code :content="responce"></nv-code><br/>
        </div>
    </div>
</template>

<script>
const CODE = `
<template>
   <nv-trend method="post" :options="optionsTrend" title="趋势图" :url="url" :params="params" show-loading="数据加载中..."  />
<\/template>
<script>
export default {
    data() {
        return {
            params: {
                test: 'trend'
            },
            optionsTrend: {

            },
            url: '/api/trend'
        }
    }
}
<\/script>
`;
const RESPONCE = `
{
    success: true,
    message: 'ok',
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
    }
}
`;

export default {
    data() {
        return {
            params: {
                test: 'trend'
            },
            optionsTrend: {

            },
            url: '/api/trend',
            code: CODE,
            responce: RESPONCE,
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
                }
            ],
            tdata: [
                {
                    properties: 'title',
                    comment: '趋势图标题',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'url',
                    comment: 'request请求',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'method',
                    comment: 'request请求类型',
                    type: 'String',
                    initValue: 'post'
                },
                {
                    properties: 'params',
                    comment: 'request请求参数',
                    type: 'Object',
                    initValue: '-'
                },
                {
                    properties: 'options',
                    comment: 'Echarts 趋势图配置',
                    type: 'Object',
                    initValue: ''
                },
                {
                    properties: 'requestConfig',
                    comment: '可以将url和params、method等参数合并到requestConfig中',
                    type: 'Object',
                    initValue: '{}'
                },
                {
                    properties: 'trendData',
                    comment: '可以直接将已经获取好的数据交给趋势图来渲染',
                    type: 'Object',
                    initValue: '{}'
                },
                {
                    properties: 'seriesFilter',
                    comment: '数据线条后置处理钩子，参数为当前有的数据线条，必须要返回需要展示的线条数据',
                    type: 'Function',
                    initValue: '-'
                },
                {
                    properties: 'dataFilter',
                    comment: '数据后置处理钩子，可在数据请求完成后对数据进行封装处理，参数为请求到的数据，必须要有返回值',
                    type: 'Function',
                    initValue: '-'
                },
                {
                    properties: 'showLoading',
                    comment: 'request请求loading文字',
                    type: 'String',
                    initValue: '数据加载中...'
                },
                {
                    properties: 'noDataTip',
                    comment: '无数据提示，支持HTML',
                    type: 'String',
                    initValue: '无数据'
                }
            ]
        };
    }
};
</script>

<style lang="less">
h2 {
    margin-bottom: 10px;
}
h4 {
    margin-bottom: 10px;
}
.usage-item {
    margin-bottom: 30px;
    .code {
        border: 1px solid #ededed;
        border-radius: 2px;
        background: #f7f7f7;
        padding-left: 15px;
        margin-bottom: 10px;
    }
    .show-icon {
        margin-bottom: 20px;
    }
}
</style>
