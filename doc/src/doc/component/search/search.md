
## 概述

选择搜索控件，支持条件搜索和级联条件搜索
<ul>
    <li>支持条件搜索</li>
    <li>支持级联条件搜索</li>
    <li>支持监听搜索项和搜索值变化</li>
    <li>支持日期v-model双向绑定搜索条件</li>
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
            <div class="search-doc">
                <div class="example">
                    <normalSearchExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="normalSearchExampleCode">
        </nv-code>
    </Card>
</template>

<br/>
<br/>



## 组合示例

构建一个复杂的时间选择器示例
<br/>
<br/>

<template>
    <Card>
        <p class="card-title">组合用法示例</p>
        <template>
            <div class="search-doc">
                <div class="example">
                    <complexSearchExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="complexSearchExampleCode">
        </nv-code>
    </Card>
</template>



## API

### props

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| data       | 选择条件的集合                           | Array            | -           |
| placeholer | 输入框的默认提示                         | String           | 请输入关键字搜索 |
| maxlength  | 输入框的可输入最大长度                      | Number            | -         |
| clearable  | 是否显示条件选择框和输入框的清除按钮        | Boolean           | false |
| cascader   | 配置条件选择框的级联选择功能               | Boolean           | false |
| value      | 条件选择值和输入值的集合对象，支持v-model，详见示例  | Boolean           | false |


### events

| 名称       | 说明                                     | 参数         |        返回值      |
| ---------- | -----------------------------------------| ------------ |------------------- |
| on-enter   | 监听enter键盘事件                          | event         | -                 |
| on-change  | 监听条件项和输入值变化，使用方法详见示例      | -            | 条件项和输入值的集合对象，{searchName: String/Array, searchValue: String} |



<script>
import normalSearchExample from  '../../../example/search/normal.vue';
import complexSearchExample from '../../../example/search/complex.vue';

// 基础用法示例代码
const normalSearchExampleCode = `
<template>
    <div>
        <NvSearch :data="options"><\/NvSearch>
    <\/div>
<\/template>

<script>
export default {
    name: 'nvSearchNormalDemo',
    data() {
        return {
            options: [
                {
                    label: '产品线',
                    value: 'products'
                }, 
                {
                    label: '应用名称',
                    value: 'taskName'
                }
            ]
        };
    }
};
<\/script>
<style lang="less">
<\/style>
`;


// 组合示例
const complexSearchExampleCode = `
<template>
    <div>
        <NvSearch
            v-model="value"
            :data="options"
            :cascader="true"
            :clearable="true"
            :placeholder="placeholder"
            @on-change="changeHandler"
        >
        <\/NvSearch>
    <\/div>
<\/template>

<script>
export default {
    name: 'nvSearchComplexDemo',
    data() {
        return {
            cascader: true,
            clearable: true,
            placeholder: '请输入地点名称搜索',
            value: {
                searchName: ['beijing', 'gugong'],
                searchValue: '门票'
            },
            options: [
                {
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, 
                {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        changeHandler(val) {
            // console.log(val);
        }
    }
};
<\/script>

<style lang="less">
<\/style>

`;

export default {
    name: 'datePickerDoc',
    components: {
        normalSearchExample,
        complexSearchExample
    },
    data() {
        return {
            normalSearchExampleCode: normalSearchExampleCode,
            complexSearchExampleCode: complexSearchExampleCode
        }
    }
};
</script>

<style lang="less" >
    .search-doc {
        .example {
            margin: 20px 0;
        }
    }
    .card-title {
        font-weight: 600;
    }
</style>
