[[TOC]]


## 概述

级联选择控件，支持选择一级菜单和勾选二级菜单
<ul>
    <li>支持选择一级菜单</li>
    <li>支持勾选二级菜单</li>
    <li>支持配置二级菜单弹出方式</li>
    <li>支持配置选中项文本分隔符</li>
</ul>
<br/>
<br/>


## 基础示例

构建一个简单的级联选择示例

:::demo 基础用法示例
```html
<template>
    <div>
        <NvCascaderSelect :data="data"></NvCascaderSelect>
    </div>
</template>

<script>
export default {
    name: 'nvCascaderSelectSimpleDemo',
    data() {
        return {
            data: [
                {
                    label: '山东省',
                    value: 'shandong',
                    children: [
                        {
                            label: '济南市',
                            value: 'jinan',
                        },
                        {
                            label: '青岛市',
                            value: 'qingdao',
                        },
                        {
                            label: '烟台市',
                            value: 'yantai',
                        }
                    ]
                },
                {
                    label: '广东省',
                    value: 'guangdong',
                    children: [
                        {
                            label: '广州市',
                            value: 'guangzhou',
                        },
                        {
                            label: '佛山市',
                            value: 'foshan',
                        },
                        {
                            label: '惠州市',
                            value: 'huizhou'
                        }
                    ]
                }
            ]
        };
    }
};
</script>
```
:::

<br/>
<br/>

## 组合示例

构建一个复杂的级联选择示例

:::demo
```html
<template>
    <div>
        <NvCascaderSelect ref="nvCascaderSelectComplexDemo" :data="list" :splitCharacter="splitCharacter" :trigger="trigger" @on-change="changeHandler"></NvCascaderSelect>
    </div>
</template>

<script>
export default {
    name: 'nvCascaderSelectComplexDemo',
    data() {
        return {
            // 二级菜单展开触发方式
            // trigger支持hover/click
            trigger: 'hover',
            splitCharacter: ',',
            list: [
                {
                    label: '美食',
                    value: 'meishi'
                },
                {
                    label: '酒水',
                    value: 'jiushui'
                },
                {
                    label: '水果',
                    value: 'shuiguo',
                    children: [
                        {
                            label: '苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果',
                            value: 'pingguo'
                        },
                        {
                            label: '香蕉',
                            value: 'xiangjiao'
                        },
                        {
                            label: '橘子',
                            value: 'juzi'
                        }
                    ]
                    
                },
                {
                    label: '干果',
                    value: 'ganguo',
                    children: [
                        {
                            label: '核桃',
                            value: 'hetao'
                        },
                        {
                            label: '花生',
                            value: 'huasheng'
                        },
                        {
                            label: '瓜子',
                            value: 'guazi'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        changeHandler(data) {
            console.log(data);
        },
        getSelectedValues() {
            console.log(this.$refs['nvCascaderSelectComplexDemo'].getActiveItems());
        }
    }
};
</script>

```
:::


## API

### props

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| data       | 源数据                                  | Array      | []          |
| splitCharacter      | 分隔符，当选择多项时，使用该属性指定的字符连接多个值|  String |  / |
| trigger    | 二级菜单展开的触发方式，支持click/hover      | String            | click           |



### data

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| label   | 必填，菜单项显示文本            | String          | -
| value   | 必填，菜单项唯一标识            | String             | -           |
| children| 二级菜单项配置，结构与一级菜单配置相同，详见示例              | Array          | -           |


### events

| 名称       | 说明                                     | 参数         |        返回值      |
| ---------- | -----------------------------------------| ------------ |------------------- |
| on-change  | 监听选择变化，仅当操作为有效操作时触发           | - |  selectedValues，选中的菜单项的value值集合 |


### methods

| 名称       | 说明                                     | 参数         |        返回值      |
| ---------- | -----------------------------------------| ------------ |------------------- |
| getActiveItems | 获取选中的菜单项的value值集合 | 无 | selectedValues，选中的菜单项的value值集合 | 

