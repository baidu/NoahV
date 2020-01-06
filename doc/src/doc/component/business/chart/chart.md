[[TOC]]

## 概述

图表组件将请求后的数据转化成图表

## 示例

:::demo 1.饼图
```html
<template>
   <nv-chart
    title="图表1：饼图" 
    method="post"
    type="pie"
    :options="optionsChart"
    :url="url"
    :params="params"
    show-loading="数据加载中..." /> 
</template>
<script>
export default {
    data() {
        return {
            params: {
                test: 'chart'
            },
            optionsChart: {},
            url: '/api/chart'
        }
    }
}
</script>
```
:::

:::demo 2.环状图
```html
<template>
   <nv-chart
    title="图表2：环状图" 
    method="post"
    type="pie"
    :options="optionsChart"
    :url="url"
    :params="params"
    :dataFilter="dataFilter"
    show-loading="数据加载中..." /> 
</template>
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
</script>
```
:::

:::demo 3.柱状图
```html
<template>
   <nv-chart
    title="图表3：柱状图"
    method="post"
    type="column"
    :options="optionsChart"
    :url="url"
    :params="params"/> 
</template>
<script>
export default {
    data() {
        return {
            params: {
                test: 'chart'
            },
            optionsChart: {},
            url: '/api/column'
        }
    }
}
</script>
```
:::

:::demo 4.折线图
```html
<template>
   <nv-chart
    method="post"
    title="图表4：折线图"
    :options="optionsChart"
    :url="url"
    :params="params" /> 
</template>
<script>
export default {
    data() {
        return {
            params: {
                test: 'chart'
            },
            optionsChart: {},
            url: '/api/column'
        }
    }
}
</script>
```
:::

## API

| 属性        | 说明                                                         | 类型     | 默认值  |
| ----------- | ------------------------------------------------------------ | -------- | ------- |
| title       | 图表标题                                                     | String   | -       |
| type        | 图表类型(default：默认类型，pie：饼图/环， column：柱状图，不写为折线图) | String   | default |
| url         | request请求                                                  | String   | -       |
| params      | request请求参数                                              | Object   | -       |
| method      | request请求类型                                              | String   | post    |
| showLoading | request请求loading文字                                       | String   | -       |
| options     | 图表配置                                                     | Object   | -       |
| dataFilter  | 环状图适配                                                   | Function | -       |



## 数据格式

1.request请求返回数据格式——饼图/环图

```json
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
```

2.request请求返回数据格式——折线图/柱状图

```json
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
```