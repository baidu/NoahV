
## 概述

标签组件，支持配置颜色和格式

## 基础示例

<br/>
<br/>

<template>
    <Card>
        <p class="card-title">基础用法示例</p>
        <template>
            <div class="tag-doc">
                <div class="example">
                    <nvTagNormalDemo/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="nvTagNormalDemoCode">
        </nv-code>
    </Card>
</template>


<br/>
<br/>

<template>
    <Card>
        <p class="card-title">type用法示例</p>
        <template>
            <div class="tag-doc">
                <div class="example">
                    <nvTagBorderDemo/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="nvTagBorderDemoCode">
        </nv-code>
    </Card>
</template>



## 组合示例

构建一个复杂的行号框
<br/>
<br/>

<template>
    <Card>
        <p class="card-title">组合用法示例</p>
        <template>
            <div class="tag-doc">
                <div class="example">
                    <nvTagComplexDemo/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="nvTagComplexDemoCode">
        </nv-code>
    </Card>
</template>

## API

### props

| 属性            | 说明                                                    | 类型              | 默认值      |
| -------------- | --------------------------------------------------------| --------------    | ---------- |
| data           | 标签数据集合                                              | Array            | -          |
| type           | 标签样式，可设置default/border两种值，详见示例               | String           | default    |
| width          | 容器的宽度，单位为像素                                      | Number           | 600         |
| color          | 标签的颜色，支持配置purple/blue/green/red/orange/grey或其他形如#xxxxxx的六位十六进制有效色彩值      | String           | purple          |
| maxNum         | 标签个数限制                                              | Number           | 5          |
| maxLength      | 单个标签字符长度限制，超过部分隐藏，鼠标hover可以看到全部信息    | String          | 105          |
| closeable      | 是否开启可关闭按钮                                         | Boolean         | false         |
| placeholder    | 输入框默认提示文本                                         | String         | 输入文本，点击回车或空格添加标签         |


### data
| 属性        | 说明                                     | 类型              | 
| ---------- | ----------------------------------------| --------------    | 
| name       | 标签标识，须全局唯一                       | String            |
| label      | 标签文本                                 | String            |



### methods

| 名称       | 说明                                     | 参数类型     | 返回值          |
| ---------- | --------------------------------------- | ----------- | -------------- |
| setTags    | 设置标签集合                              | Array       |
| getTags    | 获取标签集合                              | 无          |
| addTag     | 添加标签                                 |          |
| removeTag  | 删除标签                                 | 无          |
| clear      | 清空标签                                 | 无          |


### events
| 名称        | 说明                                   | 参数             |
| ---------- | ---------------------------------------| --------------  |
| on-input   | 输入事件                                |  当前输入的值     |
| on-change  | 标签变化事件                             |  变化后的标签全集 |
| on-focus   | 输入获取焦点事件                         |  无             |
| on-blur    | 失去焦点事件                             |  无             |



<script>
import nvTagNormalDemo from  '../../../example/tag/normal.vue';
import nvTagBorderDemo from  '../../../example/tag/border.vue';
import nvTagComplexDemo from  '../../../example/tag/complex.vue';

// 基础示例代码
const nvTagNormalDemoCode = `<template>
    <div class="tag-wrapper">
          <NvTag :data="datas" :maxNum="max" :width="width" :placeholder="placeholder"><\/NvTag>
    <\/div>
<\/template>

<script>

    export default {
        name: 'nvTagNormalDemo',
        data() {
            return {
                max: 5,
                width: 900,
                placeholder: '输入文本，点击回车或空格添加标签',
                datas: [
                    {
                        name: '101',
                        label: '百度'
                    },
                    {
                        name: '102',
                        label: '百度云'
                    }
                ]
            };
        },
        methods: {
            
        }
    };
<\/script>
<style lang="less">
<\/style>`;

// border使用示例代码
const nvTagBorderDemoCode = `<template>
    <div class="tag-wrapper">
          <NvTag :data="datas" :type="type" :color="color" :closeable="closeable" :maxNum="max" :width="width" :placeholder="placeholder"><\/NvTag>
    <\/div>
<\/template>

<script>

    export default {
        name: 'nvTagBorderDemo',
        data() {
            return {
                max: 5,
                width: 900,
                type: 'border',
                color: 'green',
                closeable: true,
                placeholder: '输入文本，点击回车或空格添加标签',
                datas: [
                    {
                        name: '101',
                        label: '百度'
                    },
                    {
                        name: '102',
                        label: '百度App'
                    }
                ]
            };
        },
        methods: {
            
        }
    };
<\/script>
<style lang="less">
<\/style>`;

// 复杂示例代码
const nvTagComplexDemoCode = `<template>
    <div class="tag-wrapper">
          <NvTag class="tag-complex-demo-wrapper" :data="datas" :maxNum="max" :type="type" :color="color" :closeable="closeable" :maxLength="length" :width="width" :placeholder="placeholder" @on-change="changeHandler" @on-input="inputHandler" @on-focus="focusHandler" @on-blur="blurHandler" ref="tagDemo"><\/NvTag>
          <Button type="primary" @click="getDatas">获取标签<\/Button>
          <Button type="primary" @click="setDatas">设置标签<\/Button>
          <Button type="primary" @click="addTags">添加标签<\/Button>
          <Button type="primary" @click="removeTags">移除标签<\/Button>
          <Button type="primary" @click="clear">清除标签<\/Button>
    <\/div>
<\/template>

<script>

    export default {
        name: 'nvTagComplexDemo',
        data() {
            return {
                max: 9,
                type: 'default',
                width: 900,
                length: 200,
                color: 'orange',
                closeable: true,
                placeholder: '输入文本，点击回车或空格添加标签',
                datas: [
                    {
                        name: '101',
                        label: '百度'
                    },
                    {
                        name: '102',
                        label: '百度云'
                    },
                    {
                        name: '103',
                        label: '百度贴吧'
                    },
                    {
                        name: '104',
                        label: '百度地图'
                    },
                    {
                        name: '105',
                        label: '百度搜索'
                    },
                    {
                        name: '106',
                        label: '百度大脑'
                    },
                    {
                        name: '107',
                        label: '百度无人车'
                    }
                ]
            };
        },
        methods: {
            focusHandler: function () {
                console.log('on-focus');
            },
            blurHandler: function () {
                console.log('on-blur');
            },
            inputHandler: function (value) {
                console.log('on-input');
                console.log(value);
            },
            changeHandler: function (items) {
                console.log('on-change');
                console.log(items);
            },
            getDatas: function () {
                let tags = this.$refs['tagDemo'].getTags();
                console.log(tags);
            },
            setDatas: function () {
                let tags = [
                    {
                        name: '101',
                        label: '百度云'
                    },
                    {
                        name: '102',
                        label: '阿里云'
                    },
                    {
                        name: '103',
                        label: '腾讯云'
                    },
                    {
                        name: '104',
                        label: '华为云'
                    }
                ];
                this.$refs['tagDemo'].setTags(tags);
            },
            addTags: function () {
                let tag = {
                    name: '110',
                    label: '百度时代'
                };
                this.$refs['tagDemo'].addTag(tag);
            },
            removeTags: function () {
                let tag = {
                    name: '103',
                    label: '百度贴吧'
                };
                this.$refs['tagDemo'].removeTag(tag);
            },
            clear: function () {
                this.$refs['tagDemo'].clear();
            }
        }
    };
<\/script>
<style lang="less">
    .tag-complex-demo-wrapper {
        margin-bottom: 10px;
    }
<\/style>`;


export default {
    name: 'tagDoc',
    components: {
        nvTagNormalDemo,
        nvTagBorderDemo,
        nvTagComplexDemo
    },
    data () {
        return {
            nvTagNormalDemoCode: nvTagNormalDemoCode,
            nvTagBorderDemoCode: nvTagBorderDemoCode,
            nvTagComplexDemoCode: nvTagComplexDemoCode
        }
    }
};
</script>

<style lang="less" >
    .tag-doc {
        .example {
            margin: 20px 0;
        }
    }
    .card-title {
        font-weight: 600;
    }
</style>
