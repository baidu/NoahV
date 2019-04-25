<template>
    <div>
        <div class="usage-item">
            <h2>概述</h2>
            <p>图表组件将请求后的数据转化成图表</p>
        </div>

        <div class="usage-item">
            <nv-contrast-trend
                title="对比趋势图"
                show-loading="数据加载中..."
                :options="options"
                :url="url"
                :params="params"
                :items="items"
                :layout="layout"
            />
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
    <nv-contrast-trend
        title="对比趋势图"
        show-loading="数据加载中..."
        :options="options"
        :url="url"
        :params="params"
        :items="items"
        :layout="layout"
    />
</template>
<script>
export default {
    data() {
        return {
            url: '/api/trend',
            params: {
                test: 'trend'
            },
            // options 可选
            options: {
                colors: ['red', 'blue', '#90ed7d', '#f7a35c', '#8085e9',
                    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1']
            },
            layout: 'inline',
            items: [
                {
                    name: 'namespace',
                    title: '类别',
                    type: 'checkboxgroup',
                    required: true,
                    width: 300,
                    contrast: true,
                    option: [
                        {
                            name: 'QPS',
                            value: 'qps'
                        },
                        {
                            name: '吞吐',
                            value: 'tun'
                        },
                        {
                            name: '数据量',
                            value: 'num'
                        },
                        {
                            name: '队列请求',
                            value: 'request'
                        }
                    ]
                },
                {
                    name: 'timeRange',
                    title: '时间区间',
                    type: 'timeRange',
                    format: 'yyyy-MM-DD HH:mm:ss',
                    width: 360,
                    required: true
                }
            ]
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
            {name: 'read', 
                data: [[1501220160000, 30], [1501220600000, 100], [1501220680000, 300]]
            }, 
            {
                name: 'write', 
                data: [[1501220160000, 10], [1501220600000, 200], [1501220680000, 100]]
            }
        ]
    }     
}
`;

export default {
    data() {
        return {
            url: '/api/trend',
            params: {
                test: 'trend'
            },
            // options 可选
            options: {
                colors: [
                    'red', 'blue', '#90ed7d', '#f7a35c', '#8085e9',
                    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
                ]
            },
            layout: 'inline',
            items: [
                {
                    name: 'namespace',
                    title: '类别',
                    type: 'checkboxgroup',
                    required: true,
                    width: 300,
                    contrast: true,
                    option: [
                        {
                            name: 'QPS',
                            value: 'qps'
                        },
                        {
                            name: '吞吐',
                            value: 'tun'
                        },
                        {
                            name: '数据量',
                            value: 'num'
                        },
                        {
                            name: '队列请求',
                            value: 'request'
                        }
                    ]
                },
                {
                    name: 'timeRange',
                    title: '时间区间',
                    type: 'timeRange',
                    format: 'yyyy-MM-DD HH:mm:ss',
                    width: 360,
                    required: true
                }
            ],
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
                    comment: '标题',
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
                    properties: 'params',
                    comment: 'request请求参数',
                    type: 'Object',
                    initValue: '-'
                },
                {
                    properties: 'showLoading',
                    comment: 'request请求loading文字',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'layout',
                    comment: '对比项表单展现形式，参考formTpl layout字段',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'items',
                    comment: '对比项配置',
                    type: 'Array',
                    initValue: '-'
                },
                {
                    properties: 'options',
                    comment: '趋势图配置',
                    type: 'Object',
                    initValue: '-'
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
