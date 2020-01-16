[[TOC]]

## 概述

图标名称参考font awesome命名习惯

## 如何使用

:::demo icon示例
```html
<template>
    <div class="icon-demo">
        <nv-icon type="user-o" content="用户名" />
        <i class="noahv-icon noahv-icon-user"></i>
    </div>
</template>
```
:::

## API

| 属性      | 说明                                                         | 类型           | 默认值 |
| --------- | ------------------------------------------------------------ | -------------- | ------ |
| type      | 图标名称                                                     | string         | -      |
| content   | 显示的内容，若配置该属性则自动展示tooltip，否则不展示        | string         |        |
| placement | 提示框出现的位置，可选值有top、top-start、top-end、bottom、bottom-start、bottom-end、left、left-start、left-end、right、right-start、right-end | string         | bottom |
| delay     | 延迟显示tooltip                                              | string\|number | 0      |
| always    | 是否总显示tooltip                                            | boolean        | false  |
| maxWidth  | tooltip的最大宽度，超出内容会换行                            | string\|number | -      |
| offset    | tooltip的偏移量                                              | number         | 0      |



:::demo icon列表
```html
<template>
    <div class="icon-list">
        <div class="icon-operation">
            <Input v-model="value" placeholder="请输入英文或中文关键词" style="width: 300px" v-on:input="getIcon()"></Input>
            <p class="icon-comment" v-if="result.length > 0 && value.length > 0">筛选出来的图表名称为： {{value}}， 共{{result.length}}个</p>
            <p class="icon-comment" v-else-if="result.length === 0 && value.length > 0">无相应图标， 共0个</p>
            <p class="icon-comment" v-else>展示所有图标，共{{iconList.length}}个</p>
        </div>
        <div class="icon" v-for="item in result">
            <nv-icon :type="item[0]" :content="item[0]"/>
            <p>{{item[0]}}</p>
        </div>
    </div>
</template>
<script>
import {iconConfig} from './iconConfig';
let iconArr = iconConfig.iconList;
let iconChObj = {};
let extraIconChArr = [];
let lowerChar;
let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
iconArr.map((item, index) => {
    extraIconChArr = [];
    item.map(char => {
        if (char.length > 1) {
            char.split('').map(c => {
                // 中文：直接拆开
                if (reg.test(char)) {
                    if (extraIconChArr.indexOf(c) === -1) {
                        extraIconChArr.push(c);
                    }
                }
                else {
                    lowerChar = c.toLowerCase();
                    if (extraIconChArr.indexOf(lowerChar) === -1) {
                        extraIconChArr.push(lowerChar);
                    }
                }
            });
        }
        else if (extraIconChArr.indexOf(char) === -1) {
            extraIconChArr.push(char);
        }
    });
    iconChObj[item[0]] = extraIconChArr.concat(item);
});
export default {
    name: 'iconDemo',
    data() {
        return {
            value: '',
            result: iconArr,
            iconList: iconArr,
            iconChObj
        };
    },
    methods: {
        getIcon: function () {
            let value = this.value.toLowerCase();
            let result = [];
            let name;
            let nameCh;
            let nameEnArr = [];
            if (value.length) {
                for (var key in iconChObj) {
                    nameCh = iconChObj[key];
                    nameCh.map(item => {
                        if (item.indexOf(value) !== -1
                                && nameEnArr.indexOf(key) === -1
                        ) {

                            nameEnArr.push(key);
                        }
                    });
                }
                iconArr.map(item => {
                    name = item[0];
                    if (nameEnArr.indexOf(name) !== -1) {
                        result.push(item);
                    }
                });
                this.result = result;
            }
            else {
                this.result = iconArr;
            }
        }
    }
};   
</script>
<style lang="less" >
    .icon-list {
        .icon {
            display: inline-block;
            text-align: center;
            margin-right: 1%;
            margin-bottom: 15px;
            width: 10%;
            min-height: 100px;
            vertical-align: middle;
            i {
                font-size: 35px;
            }
        }
        .icon-operation {
            margin-bottom: 30px;
            text-align: center;
            .icon-comment {
            }
            .ivu-input {
                margin-bottom: 15px;
            }
        }
    }
</style>
```
:::
