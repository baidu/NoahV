[[TOC]]

## 概述

穿梭框控件，支持通过移动条目表征选择逻辑等
<ul>
    <li>支持简单移动选择场景</li>
    <li>支持分组移动选择场景</li>
</ul>
<br/>
<br/>


## 基础示例

:::demo 基础用法示例
```html
<template>
    <div class="transfer-wrapper">
        <NvTransfer
            leftTitle="源列表"
            rightTitle="目标列表"
            :options="options1"
            :leftDisabled="false"
            :rightDisabled="false"
            @on-change="transChange"
            @on-checked-change="checkedChange"
        >
        </NvTransfer>
    </div>
</template>

<script>
export default {
    name: 'transferNormalDemo',
    data () {
        return {
            options1: []
        }
    },
    created() {
        let group = [];
        for (let j = 1; j< 10; j++) {
            let node = {};
            node.name = j;
            node.title = j + '.app1.bidtest.com';
            node.checkbox = true;
            group.push(node);
        }
        this.options1 = group;
    },
    methods: {
        transChange(leftOptions, rightOptions) {
            console.log('移动事件');
            console.log(leftOptions);
            console.log(rightOptions);
        },
        checkedChange(leftChecked, rightChecked) {
            console.log('勾选事件');
            console.log(leftChecked);
            console.log(rightChecked);
        }
    }
};
</script>
<style lang="less">
    .transfer-wrapper {
        .noahv-transfer {
            .noahv-pool {
                .noahv-tree {
                    padding: 10px 6px;
                }
                .noahv-tree .node-wrapper .panel  ul {
                    margin-bottom: 5px;
                }
            }
            .noahv-checkbox-checked .checkbox:after {
                top: 6px;
            }
            .noahv-checkbox-partial-checked .checkbox:after {
                top: 9px;
            }
        }
    }
</style>


```
:::


<br/>
<br/>



## 组合示例

构建一个复杂的穿梭框示例

:::demo 组合用法示例
```html
<template>
    <div class="transfer-wrapper">
        <NvTransfer
            leftTitle="源列表"
            rightTitle="目标列表"
            :options="options2"
            :leftDisabled="false"
            :rightDisabled="false"
            @on-change="transChange"
            @on-checked-change="checkedChange"
        >
        </NvTransfer>
    </div>
</template>

<script>
export default {
    name: 'transferComplexDemo',
    data () {
        return {
            options2: [],
        }
    },
    created() {
        let serviceGroup = [];
        for (let i = 1; i < 20; i++) {
            let service = {};
            service.id = i;
            service.name = i;
            service.title = 'service' + i;
            service.children = [];
            for (let j = 1; j< 10; j++) {
                let node = {};
                node.name = i + '-' + j;
                node.title = j + '.app1.bidtest.com';
                node.checkbox = false;
                service.children.push(node);
            }
            serviceGroup.push(service);
        }
        this.options2 = serviceGroup;
    },
    methods: {
        transChange(leftOptions, rightOptions) {
            console.log('移动事件');
            console.log(leftOptions);
            console.log(rightOptions);
        },
        checkedChange(leftChecked, rightChecked) {
            console.log('勾选事件');
            console.log(leftChecked);
            console.log(rightChecked);
        }
    }
};
</script>
<style lang="less">
    .transfer-wrapper {
        .noahv-transfer {
            .noahv-pool {
                .noahv-tree {
                    padding: 10px 6px;
                }
                .noahv-tree .node-wrapper .panel  ul {
                    margin-bottom: 5px;
                }
            }
            .noahv-checkbox-checked .checkbox:after {
                top: 6px;
            }
            .noahv-checkbox-partial-checked .checkbox:after {
                top: 9px;
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
| leftTitle  | 左侧选择框的title                         | String            | -           |
| rightTitle | 右侧选择框的title                         | String            | - |
| options    | 左侧选择框的数据源                         | Array             | -            |
| leftDisabled  | 左侧全选是否禁止点击                     | Boolean           | false      |
| rightDisabled | 右侧全选是否禁止点击                     | Boolean           | false      |


### events

| 名称       | 说明                                     | 参数         |        返回值      |
| ---------- | -----------------------------------------| ------------ |------------------- |
| on-change          | 监听节点移动事件                    | leftOptions, rightOptions        | - |
| on-checked-change  | 监听节点勾选变化事件                 | leftChecked, rightChecked        | - |


### methods

| 名称       | 说明                                     | 参数         |        返回值      |
| ---------- | -----------------------------------------| ------------ |------------------- |
| getAllChecked | 获取右侧框中的数据                       | -        | 右侧框中的数据            |
