<template>
    <div>
        <div class="usage-item">
            <h2>概述</h2>
            <p>图表组件将请求后的数据转化成图表</p>
        </div>

        <div class="usage-item">
            <nv-chart method="post" type="pie" :options="optionsChart" title="图表1：饼图" :url="urlPie" :params="params" show-loading="数据加载中..."/>
            <nv-code :content="pieCode"></nv-code><br/>
        </div>

        <div class="usage-item">
            <nv-chart method="post" type="pie" :options="optionsChart" title="图表2：环状图" :url="urlPie" :params="params" :dataFilter="dataFilter" show-loading="数据加载中..."/>
            <nv-code :content="circleCode"></nv-code><br/>
        </div>

        <div class="usage-item">
            <nv-chart method="post" type="column" :options="optionsChart" title="图表3：柱状图" :url="url" :params="params"/>
            <nv-code :content="columnCode"></nv-code><br/>
        </div>

        <div class="usage-item">
            <nv-chart method="post" :options="optionsChart" title="图表4：折线图" :url="url" :params="params"/>
            <nv-code :content="lineCode"></nv-code><br/>
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
            <h2>request请求返回数据格式——饼图/环图</h2>
            <nv-code :content="responcePie"></nv-code><br/>
            <h2>request请求返回数据格式——折线图/柱状图</h2>
            <nv-code :content="responceColumn"></nv-code><br/>
        </div>
    </div>
</template>

<script>
const PIE_CODE = `
<template>
   <nv-chart method="post" type="pie" :options="optionsChart" title="图表1：饼图" :url="url" :params="params" show-loading="数据加载中..."/> 
<\/template>
<script>
export default {
    data() {
        return {
            params: {
                test: 'chart'
            },
            optionsChart: {

            },
            url: '/api/chart'
        }
    }
}
<\/script>
`;
const CIRCLE_CODE = `
<template>
   <nv-chart method="post" type="pie" :options="optionsChart" title="图表2：环状图" :url="url" :params="params" :dataFilter="dataFilter" show-loading="数据加载中..."/> 
<\/template>
<script>

export default {
    data() {
        return {
            params: {
                test: 'chart'
            },
            optionsChart: {

            },
            url: '/api/chart'
        }
    },
    methods: {
        dataFilter(data) {
            data.data.forEach(function (item) {
                item.innerSize = 100;
                item.depth = 45;
            });
            return data;
        }
    }
}
<\/script>
`;
const COLUMN_CODE = `
<template>
   <nv-chart method="post" type="column" :options="optionsChart" title="图表3：柱状图" :url="url" :params="params"/> 
<\/template>
<script>
export default {
    data() {
        return {
            params: {
                test: 'chart'
            },
            optionsChart: {

            },
            url: '/api/column'
        }
    }
}
<\/script>
`;
const LINE_CODE = `
<template>
   <nv-chart method="post" :options="optionsChart" title="图表4：折线图" :url="url" :params="params"/> 
<\/template>
<script>
export default {
    data() {
        return {
            params: {
                test: 'chart'
            },
            optionsChart: {

            },
            url: '/api/column'
        }
    }
}
<\/script>
`;
const RESPONCE_PIE = `
{
    success: true,
    message: 'ok',
    data: {
        data: [{
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]
        }]
    }
}
`;
const RESPONCE_COLUMN = `
{
    success: true,
    message: 'ok',
    data: {
        title: '我是column',
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        data: [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
            }, {
                name: 'London',
                "data": [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
            }]
        }      
    }
}
`;

export default {
    data() {
        return {
            params: {
                test: 'pie'
            },
            optionsChart: {

            },
            urlPie: '/api/chart',
            url: '/api/column',
            pieCode: PIE_CODE,
            circleCode: CIRCLE_CODE,
            lineCode: LINE_CODE,
            columnCode: COLUMN_CODE,
            responcePie: RESPONCE_PIE,
            responceColumn: RESPONCE_COLUMN,
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
                    comment: '图表标题',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'type',
                    comment: '图表类型(default：默认类型，pie：饼图/环， column：柱状图，不写为折线图)',
                    type: 'String',
                    initValue: 'default'
                },
                {
                    properties: 'url',
                    comment: 'request请求',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'params',
                    comment: 'request请求参数',
                    type: 'Object',
                    initValue: '-'
                },
                {
                    properties: 'method',
                    comment: 'request请求类型',
                    type: 'String',
                    initValue: 'post'
                },
                {
                    properties: 'showLoading',
                    comment: 'request请求loading文字',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'options',
                    comment: '图表配置',
                    type: 'Object',
                    initValue: ''
                },
                {
                    properties: 'dataFilter',
                    comment: '环状图适配',
                    type: 'Function',
                    initValue: '-'
                }
            ]
        };
    },
    methods: {
        dataFilter(data) {
            data.data.forEach(function (item) {
                item.innerSize = 100;
                item.depth = 45;
            });
            return data;
        }
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
