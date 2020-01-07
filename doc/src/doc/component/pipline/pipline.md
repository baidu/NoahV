[[TOC]]


## 概述

流程控件，支持配置事务流程，增删节点等
<ul>
    <li>支持配置流程</li>
    <li>支持流程中增删节点</li>
    <li>支持通过插槽自定义卡片内容</li>
</ul>
<br/>
<br/>


## 基础示例

:::demo 基础用法示例
```html
<template>
    <div class="pipline-wrapper">
        <Button @click="addNode" style="margin-bottom: 20px;">点击添加节点</Button>
        <Button @click="getData" style="margin-bottom: 20px;">获取数据</Button>
        <NvPipline 
            ref="piplineNodeRef"
            :cardMax="5"
            :data="pipLineNodes"
            :nodeTemplate="nodeTemplate"
            :cardTemplate="cardTemplate"
        >
            <template v-slot:cardContent="slotProps">
                <div class="card-body">
                    <p>卡片名称：{{slotProps.card.name}} </p>
                    <p>{{slotProps.card.description}}</p>
                </div>
            </template>
        </NvPipline>
    </div>
</template>

<script>
export default {
    name: 'piplineNormalDemo',
    data() {
        return {
            pipLineNodes: [
                {
                    cardSet: [
                        {
                            name: '卡片',
                            description: '这是一个可以自定义内容的卡片'
                        }
                    ]
                }
            ],
            nodeTemplate: {
                cardSet: [
                    {
                        name: '卡片',
                        description: '这是一个可以自定义内容的卡片'
                    }
                ]
            },
            cardTemplate: {
                name: '卡片',
                description: '这是一个可以自定义内容的卡片'
            }
        }
    },
    methods: {
        addNode() {
            this.$refs['piplineNodeRef'].addNode();
        },
        getData() {
            // 获取数据
            console.log(this.$refs['piplineNodeRef'].getNodeData());
            this.$Message.info('请到控制台查看数据');
        }
        
    }
};
</script>
<style lang="less">
    .pipline-wrapper {
        .card-body {
            padding: 0 5px;
            font-size: 12px;
            p {
                padding-left: 10px;
            }
            p:not(last-child){
                margin-bottom: 10px;
            }
            p label {
                width: 75px;
                display: inline-block;
            }
            p .ivu-input-wrapper {
                width: 185px;
            }
        }
        .noahv-pipline .node .node-content {
            width: 865px;
            .add-card, .card {
                width: 260px;
            }
        }
    }
</style>

```
:::

<br/>
<br/>

## 组合示例

构建一个复杂的流程组件示例

:::demo 组合用法示例
```html
<template>
    <div class="pipline-wrapper">
        <Button @click="addNode" style="margin-bottom: 20px;">点击添加步骤</Button>
        <Button @click="getData" style="margin-bottom: 20px;">获取数据</Button>
        <NvPipline 
            ref="piplineNodeRef"
            :cardMax="cardMax"
            :nodeMax="nodeMax"
            :data="pipLineNodes"
            :nodeTitle="nodeTitle"
            :cardTitle="cardTitle"
            :nodeTemplate="nodeTemplate"
            :cardTemplate="cardTemplate"
        >
            <template v-slot:cardContent="slotProps">
                <div class="card-body">
                    <p>
                        <label>脚本名：</label>
                        <Input v-model="slotProps.card.name" />
                    </p>
                    <p>
                        <label>执行账户：</label>
                        <Input v-model="slotProps.card.account" />
                    </p>
                    <p>
                        <label>超时时间(s)：</label>
                        <Input v-model="slotProps.card.timeout" />
                    </p>
                    <p>
                        <label>脚本描述：</label>
                        <Input v-model="slotProps.card.description"/>
                    </p>
                </div>
            </template>
        </NvPipline>
    </div>
</template>

<script>
export default {
    name: 'piplineComplexDemo',
    data() {
        return {
            cardMax: 3,
            nodeMax: 2,
            nodeTitle: '步骤',
            cardTitle: '并行脚本',
            pipLineNodes: [
                {
                    cardSet: [
                        {
                            account: 'work',
                            timeout: '600',
                            name: '升级基础环境',
                            description: '用于升级机器基础环境'
                        }
                    ]
                }
            ],
            nodeTemplate: {
                cardSet: [
                    {
                        account: '',
                        timeout: '',
                        name: '',
                        description: ''
                    }
                ]
            },
            cardTemplate: {
                account: '',
                timeout: '',
                name: '',
                description: ''
            }
        }
    },
    methods: {
        addNode() {
            this.$refs['piplineNodeRef'].addNode();
        },
        getData() {
            // 获取数据
            console.log(this.$refs['piplineNodeRef'].getNodeData());
            this.$Message.info('请到控制台查看数据');
        }
        
    }
};
</script>
<style lang="less">
    .pipline-wrapper {
        .card-body {
            padding: 0 5px;
            font-size: 12px;
            p {
                padding-left: 10px;
            }
            p:not(last-child){
                margin-bottom: 10px;
            }
            p label {
                width: 75px;
                display: inline-block;
            }
            p .ivu-input-wrapper {
                width: 185px;
            }
        }
        .noahv-pipline .node .node-content {
            width: 865px;
            .add-card, .card {
                width: 260px;
            }
            .card-body p .ivu-input-wrapper {
                width: 150px;
            }
        }
    }
</style>

```
:::



## API

### props

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| data       | 节点集合数据，详见示例                      | Array            | -           |
| nodeMax    | 允许添加的最大节点个数                      | Number            | 3          |
| cardMax    | 单个节点允许添加的最大卡片个数                | Number            | 5          |
| nodeTitle  | 节点的名称前缀(最终形式为：nodeTitle + i， 如“节点1”)| String           | 节点 |
| cardTitle  | 卡片的名称前缀(cardTitle + i， 如“卡片1”)| String           | 卡片 |
| nodeTemplate| 节点模版，新增节点时的默认数据结构，详见示列| Object           | {}, 必填项 |
| cardTemplate| 卡片模版，新增卡片时的默认数据结构，详见示列| Object           | {}, 必填项 |




### methods

| 名称       | 说明                                     | 参数         |        返回值      |
| ---------- | -----------------------------------------| ------------ |------------------- |
| getNodeData | 获取节点数据                          | 无         | 节点数据                |
