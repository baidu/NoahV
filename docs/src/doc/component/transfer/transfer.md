
## 概述

穿梭框控件，支持通过移动条目表征选择逻辑等
<ul>
    <li>支持简单移动选择场景</li>
    <li>支持分组移动选择场景</li>
</ul>
<br/>
<br/>


## 基础示例

<br/>
<br/>

<template>
    <Card>
        <p class="card-title">基础用法示例</p>
        <template>
            <div class="transfer-doc">
                <div class="example">
                    <normalTransferExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="normalTransferExampleCode">
        </nv-code>
    </Card>
</template>

<br/>
<br/>



## 组合示例

构建一个复杂的穿梭框示例
<br/>
<br/>

<template>
    <Card>
        <p class="card-title">组合用法示例</p>
        <template>
            <div class="transfer-doc">
                <div class="example">
                    <complexTransferExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="complexTransferExampleCode">
        </nv-code>
    </Card>
</template>



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


<script>
import normalTransferExample from  '../../../example/transfer/normal.vue';
import complexTransferExample from  '../../../example/transfer/complex.vue';

// 基础用法示例代码
const normalTransferExampleCode = ``;


// 组合示例
const complexTransferExampleCode = ``;

export default {
    name: 'transferDoc',
    components: {
        normalTransferExample,
        complexTransferExample
    },
    data() {
        return {
            normalTransferExampleCode: normalTransferExampleCode,
            complexTransferExampleCode: complexTransferExampleCode
        }
    }
};
</script>

<style lang="less" >
    .transfer-doc {
        .example {
            margin: 20px 0;
        }
    }
    .card-title {
        font-weight: 600;
    }
</style>
