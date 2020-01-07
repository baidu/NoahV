[[TOC]]

## 概述

步骤组件，支持配置阶段详情展示
<br/>
<br/>

## 基础示例

构建一个基础的使用示例

:::demo 基础用法示例
```html
<template>
    <div>
        <NvSteps :datas="datas" :step="step" :distance="distance"></NvSteps>
    </div>
</template>

<script>
export default {
    name: 'nvStepNormalDemo',
    data() {
        return {
            step: 7,
            distance: 7,
            datas: [
                {
                    name: '阶段1',
                    status: 'finished'
                },
                {
                    name: '阶段2',
                    status: 'running'
                },
                {
                    name: '阶段3',
                    status: 'ready'
                },
                {
                    name: '阶段4',
                    status: 'ready'
                },
                {
                    name: '阶段5',
                    status: 'ready'
                },
                {
                    name: '阶段6',
                    status: 'ready'
                },
                {
                    name: '阶段7',
                    status: 'ready'
                },
                {
                    name: '阶段8',
                    status: 'ready'
                },
                {
                    name: '阶段9',
                    status: 'ready'
                },
                {
                    name: '阶段10',
                    status: 'ready'
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


<br/>
<br/>

## 组合示例

构建一个复杂的使用示例

:::demo 组合用法示例
```html
<template>
    <div class="steps-wrapper">
          <NvSteps :datas="datas" :step="step" :distance="distance" :panelShow="show" @on-change="changeHandler">
              <div slot="detail">
                  <div class="detail-main-panel">
                      <h3>{{content}}</h3>
                  </div>
              </div>
          </NvSteps>
    </div>
</template>

<script>

export default {
    name: 'nvStepComplexDemo',
    data() {
        return {
            step: 1,
            distance: 7,
            show: true,
            content: 'This is a detail for "阶段2"',
            datas: [
                {
                    name: '阶段1',
                    status: 'finished'
                },
                {
                    name: '阶段2',
                    status: 'running'
                },
                {
                    name: '阶段3',
                    status: 'ready'
                },
                {
                    name: '阶段4',
                    status: 'ready'
                },
                {
                    name: '阶段5',
                    status: 'ready'
                },
                {
                    name: '阶段6',
                    status: 'ready'
                },
                {
                    name: '阶段7',
                    status: 'ready'
                },
                {
                    name: '阶段8',
                    status: 'ready'
                },
                {
                    name: '阶段9',
                    status: 'ready'
                },
                {
                    name: '阶段10',
                    status: 'ready'
                }
            ]
        };
    },
    methods: {
        changeHandler: function (item) {
            this.content = 'This is a detail for "' + item.name + '"';
        }
    }
};
</script>
<style lang="less">
    .detail-main-panel {
        padding: 10px 10px;
    }
</style>

```
:::


## API

### props

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | ----------------------------------------| ---------------- | ----------- |
| datas      | 数据集合                                 | Array            | -           |
| step       | 每次步进的幅度                            | Number           | 1           |
| distance   | 同时展示的最大步骤数                       | Number           | 7           |
| panelShow  | 是否展示步骤详情面板                       | Boolean          | false      |


### datas
| 属性       | 说明                                               | 类型             | 默认值      |
| ---------- | --------------------------------------------------| --------------  | ----------- |
| name       | 步骤名字                                           | String          | -           |
| status     | 状态标识，支持finished/running/ready/pause四种状态   | String          | -           |



### events
| 名称        | 说明                                   | 参数             |
| ---------- | ---------------------------------------| --------------  |
| on-click   | 点击事件                                |  点击的步骤对象     |
| on-change  | 步骤变化事件                             | 变化后的步骤对象    |
