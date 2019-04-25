<template>
    <div>
        <div class="usage-item">
            <h2>概述</h2>
            <p>该业务组件以平铺／流程方式展示列表中各元素</p>
        </div>

        <div class="usage-item">
            <h2>例子:平铺</h2>
            <nv-list :action="products.action" :type="products.type" :templates="products.templates" :data="products.data">
            </nv-list><br/><br/>
            <nv-code :content="flatCode"></nv-code>
        </div>

        <div class="usage-item">
            <h2>例子:流程</h2>
            <nv-list :action="currentStatus.action" :type="currentStatus.type" :templates="currentStatus.templates" :data="currentStatus.data">
            </nv-list><br/>
            <nv-code :content="processCode"></nv-code>
        </div>

        <div class="usage-item">
            <h2>API</h2>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdata"
            />
        </div>
    </div>
</template>

<script>
const FLAT_CODE = `
<template>
    <nv-list :action="products.action" :type="products.type" :templates="products.templates" :data="products.data">
    </nv-list>
<\/template>
<script>
export default {
    data() {
        return {
            products: {
                type: 'flat',
                templates: {
                    name: '\${name}',
                    link: '/#/\${name}',
                },
                action: {
                    url: '/api/v1/products',
                    method: 'get',
                    params: {}
                },
                data: [
                    {
                        "id": 1,
                        "uid": "b598b424-1d7b-328e-a8fd-af9acb457f54",
                        "name": "im"
                    },
                    {
                        "id": 2,
                        "uid": "f7dd5720-4dca-3e92-a24d-8ba37e096293",
                        "name": "pay"
                    },
                    {
                        "id": 2,
                        "uid": "f7dd5720-4dca-3e92-a24d-8ba37e096293",
                        "name": "pay"
                    },
                    {
                        "id": 2,
                        "uid": "f7dd5720-4dca-3e92-a24d-8ba37e096293",
                        "name": "pay"
                    },
                    {
                        "id": 2,
                        "uid": "f7dd5720-4dca-3e92-a24d-8ba37e096293",
                        "name": "pay"
                    },
                    {
                        "id": 2,
                        "uid": "f7dd5720-4dca-3e92-a24d-8ba37e096293",
                        "name": "pay"
                    }
                ]
            },
        }
    }
}
<\/script>
`;

const PROCESS_CODE = `
<template>
    <nv-list :action="currentStatus.action" :type="currentStatus.type" :templates="currentStatus.templates" :data="currentStatus.data"><\/nv-list>
<\/template>
<script>
export default {
    data() {
        return {
            currentStatus: {
                type: 'process',
                templates: {
                    name: '\${status}',
                    time: '\${time}',
                    detail: '\${detail}'
                },
                action: {
                    url: '/api/v1/tasks/100/currentStatus',
                    method: 'get',
                    params: {}
                },
                data: [
                    {
                        "status": "任务开始",
                        "time": "2018-04-10 14:00:00",
                        "detail": "任务启动"
                    },
                    {
                        "status": "监听异常",
                        "time": "2018-04-10 14:00:10",
                        "detail": "所有指标正常，这里是多出去的文字"
                    },
                    {
                        "status": "监听异常",
                        "time": "2018-04-10 14:00:10",
                        "detail": "所有指标正常，这里是多出去的文字"
                    },
                    {
                        "status": "监听异常",
                        "time": "2018-04-10 14:00:10",
                        "detail": "所有指标正常，这里是多出去的文字"
                    },
                    {
                        "status": "监听异常",
                        "time": "2018-04-10 14:00:10",
                        "detail": "所有指标正常，这里是多出去的文字"
                    },
                    {
                        "status": "监听异常",
                        "time": "2018-04-10 14:00:10",
                        "detail": "所有指标正常，这里是多出去的文字"
                    }
                ]
            }
        }
    }
}
<\/script>
`;
export default {
    data() {
        return {
            flatCode: FLAT_CODE,
            processCode: PROCESS_CODE,
            currentStatus: {
                type: 'process',
                templates: {
                    name: '${status}',
                    time: '${time}',
                    detail: '${detail}'
                },
                action: {
                    url: '/api/v1/tasks/100/currentStatus',
                    method: 'get',
                    params: {}
                },
                data: [
                    {
                        'status': '任务开始',
                        'time': '2018-04-10 14:00:00',
                        'detail': '任务启动'
                    },
                    {
                        'status': '监听异常',
                        'time': '2018-04-10 14:00:10',
                        'detail': '所有指标正常，这里是多出去的文字'
                    },
                    {
                        'status': '监听异常',
                        'time': '2018-04-10 14:00:10',
                        'detail': '所有指标正常，这里是多出去的文字'
                    },
                    {
                        'status': '监听异常',
                        'time': '2018-04-10 14:00:10',
                        'detail': '所有指标正常，这里是多出去的文字'
                    },
                    {
                        'status': '监听异常',
                        'time': '2018-04-10 14:00:10',
                        'detail': '所有指标正常，这里是多出去的文字'
                    },
                    {
                        'status': '监听异常',
                        'time': '2018-04-10 14:00:10',
                        'detail': '所有指标正常，这里是多出去的文字'
                    }
                ]
            },
            products: {
                type: 'flat',
                templates: {
                    name: '${name}',
                    link: '/#/${name}'
                },
                action: {
                    url: '/api/v1/products',
                    method: 'get',
                    params: {}
                },
                data: [
                    {
                        'id': 1,
                        'uid': 'b598b424-1d7b-328e-a8fd-af9acb457f54',
                        'name': 'im'
                    },
                    {
                        'id': 2,
                        'uid': 'f7dd5720-4dca-3e92-a24d-8ba37e096293',
                        'name': 'pay'
                    },
                    {
                        'id': 2,
                        'uid': 'f7dd5720-4dca-3e92-a24d-8ba37e096293',
                        'name': 'pay'
                    },
                    {
                        'id': 2,
                        'uid': 'f7dd5720-4dca-3e92-a24d-8ba37e096293',
                        'name': 'pay'
                    },
                    {
                        'id': 2,
                        'uid': 'f7dd5720-4dca-3e92-a24d-8ba37e096293',
                        'name': 'pay'
                    },
                    {
                        'id': 2,
                        'uid': 'f7dd5720-4dca-3e92-a24d-8ba37e096293',
                        'name': 'pay'
                    }
                ]
            },
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
                    properties: 'type',
                    comment: '展示类型(平铺：flat，流程：process)',
                    type: 'String',
                    initValue: 'flat'
                },
                {
                    properties: 'data',
                    comment: '列表数据，当data和action同时具备时，以data数据为准',
                    type: 'Array',
                    initValue: '-'
                },
                {
                    properties: 'templates',
                    comment: '元素展示模版，可配置显示项name、time、detail及跳转项link',
                    type: 'Object',
                    initValue: '-'
                },
                {
                    properties: 'actions',
                    comment: '列表数据(通过请求方式获取列表数据，同时使用data和actions方式，以data数据为准)',
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
