## 概述

对比趋势图

## 基础示例

构建一个对比趋势图

:::demo 构建一个对比趋势图
```html
<template>
    <nv-contrast-trend :options="options" :title="title" :url="url" :params="params" :show-loading="showLoading" :items="items" :layout="layout" />
</template>

<script>
    export default {
        name: 'contrastTrendDemo',
        data() {
            return {
                // title 可选
                title: '我是title',
                // api 必选
                url: '/api/trend',
                params: {
                    test: true
                },
                // showLoading 可选
                showLoading: 'Loading...',
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
            };
        }
    };
</script>

<style lang="less" >
</style>

```
:::

## API

### props

| 属性          | 说明                     | 类型          | 默认值      |
| ---------- | ------------------------ | ------------ | -----------  |
| title        | 趋势图名称           | String       | -            |
| url    | 趋势图数据请求地址 | String        | -            |
| params | 参数对象，与url结合请求 | Object  | {} |
| showLoading      | 图表加载提示信息                   | String       | - |
| options    | highcharts的配置| Object       | {} |
| layout | 图表的布局方式| String       | inline |
| items     | 每个数组元素为object，同表单的配置参数item| Array       | - |

