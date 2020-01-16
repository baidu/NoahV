[[TOC]]

## 概述
该业务组件以平铺／流程方式展示列表中各元素


## 使用示例
:::demo 平铺示例
```html
<template>
    <nv-list
        :action="products.action"
        :type="products.type"
        :templates="products.templates"
        :data="products.data">
    </nv-list>
</template>
<script>
export default {
    data() {
        return {
            products: {
                type: 'flat',
                templates: {
                    name: '${name}',
                    link: '/#/${name}',
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
</script>
```
:::


:::demo 流程示例
```html
<template>
    <nv-list
        :action="currentStatus.action"
        :type="currentStatus.type"
        :templates="currentStatus.templates"
        :data="currentStatus.data">
    </nv-list>
</template>
<script>
export default {
    data() {
        return {
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
</script>
```
:::

## API

| 属性      | 说明                                                         | 类型   | 默认值 |
| --------- | ------------------------------------------------------------ | ------ | ------ |
| type      | 展示类型(平铺：flat，流程：process)                          | String | flat   |
| data      | 列表数据，当data和action同时具备时，以data数据为准           | Array  | -      |
| templates | 元素展示模版，可配置显示项name、time、detail及跳转项link     | Object | -      |
| actions   | 列表数据(通过请求方式获取列表数据，同时使用data和actions方式，以data数据为准) | Object | -      |

