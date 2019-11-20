
## 概述

省略组件，根据父级宽度动态展示内容。多余部分，以省略号展示，并以浮窗展示完整内容，可支持一键复制。
<br>
<br>

## 基础示例
<br>
<br>
<template>
    <Card>
        <p class="card-title">基础用法示例</p>
        <br>
        <template>
            <div class="steps-doc">
                <div class="example">
                    <div style="width: 100px">
                    <NvEllipsis content="我是nv-ellipsis，我的内容特别多，用户只能看到部分信息，通过悬浮窗可以查看到完成内容，并支持一键复制" />
                    </div>
                </div>
            </div>
        </template>
        <br>
        <nv-code :content="baseCode"></nv-code>
    </Card>
    <br>
    <br>
    <Card>
        <p class="card-title">当点击这段文字时，会自动唤起拨打电话的应用</p>
        <br>
        <template>
            <div class="steps-doc">
                <div class="example">
                    <NvEllipsis content="10086" content-type="tel"/>
                </div>
            </div>
        </template>
        <br>
        <nv-code :content="telCode"></nv-code>
    </Card>
    <br>
    <br>
    <Card>
        <p class="card-title">当点击这段文字时，会自动唤起发邮件的应用</p>
        <br>
        <template>
            <div class="steps-doc">
                <div class="example">
                    <NvEllipsis content="NoahV@baidu.com" content-type="email"/>
                </div>
            </div>
        </template>
        <br>
        <nv-code :content="emailCode"></nv-code>
    </Card>
    <br>
    <br>
    <Card>
        <p class="card-title">当点击这段文字时，会自动跳转到配置的链接</p>
        <br>
        <template>
            <div class="steps-doc">
                <div class="example">
                    <NvEllipsis
                        :content="{
                            'href': 'https://www.baidu.com',
                            'target': '_blank,',
                            'text': '百度一下，你就知道'
                        }"
                        tool-tip="我是nv-ellipsis，这是一个链接"
                        content-type="link" />
                </div>
            </div>
        </template>
        <br>
        <nv-code :content="linkCode"></nv-code>
    </Card>
    <br>
    <br>
    <Card>
        <p class="card-title">支持传入自定义 HTML</p>
        <br>
        <template>
            <div class="steps-doc">
                <div class="example">
                    <NvEllipsis
                        :isHTML="true"
                        content="<h1>我是nv-ellipsis，我支持html，这是h1</h1>"
                        tool-tip="<h2>我是nv-ellipsis，我支持html，这是h2</h2>" />
                </div>
            </div>
        </template>
        <br>
        <nv-code :content="htmlCode"></nv-code>
    </Card>
    <span style="color:red">注意：自定义内容，可能会导致省略(点点点)样式效果失效，需要自行补充 CSS 样式</span>
    <br>
    <br>
    <Card>
        <p class="card-title">在表格中的应用场景</p>
        <br>
        <template>
            <div class="steps-doc">
                <div class="example">
                    <Table :columns="columns" :data="tableData" style="width: 300px"></Table>
                </div>
            </div>
        </template>
    </Card>
</template>
<br>

## API

### props

| 属性          | 说明                                     | 类型              | 默认值      |
| ----------   | ----------------------------------------| ----------------  | ----------- |
| copy         | 是否支持复制功能                           | Boolean          | true        |
| content      | 展示文案                                   | [String, Object]  | 无        |
| contentType  | 文案类型。支持 tel、email、link、普通类型。前 3 项具有默认行为。    | String            |  普通类型          |
| placement    | 提示框出现的位置，可选值为top、top-start、top-end、bottom、bottom-start、bottom-end、left、left-start、left-end、right、right-start、right-end                            | String    | bottom                |
| toolTip     | 提示框文案。支持设置与content不同的内容，默认为 content 值          | String             | content 值           |
| maxWidth     | 最大宽度，超出最大值后，文本将自动换行          | Number             300           |
| copySuccessText     | 复制成功提示文案                      | String           | 复制成功           |
| copyErrorText     | 复制失败提示是文案                       | String          | light          |
| theme        | 主题色调。支持 dark 和 light双色调。           | Number          | 1           |
| isHTML       | 是否为HTML。content、toolTip支持自定义内容。    | Boolean         | false      |
<br>


### events
| 名称        | 说明                                   | 参数             |
| ---------- | ---------------------------------------| --------------  |
| copy-success  | 复制成功回调事件                       | 无    |
| copy-error  | 复制失败回调事件                         | 无    |

<script>

const baseCode = `<div style="width: 100px">
    <NvEllipsis content="我是nv-ellipsis，我的内容特别多，用户只能看到部分信息，通过悬浮窗可以查看到完成内容，并支持一键复制" />
</div>`;
const telCode = `<NvEllipsis content="10086" content-type="tel" />`;
const emailCode = `<NvEllipsis content="NoahV@baidu.com" content-type="email"/>`;
const linkCode = `
<NvEllipsis
    :content="{
                'href': 'https://www.baidu.com',
                'target': '_blank,',
                'text': '百度一下，你就知道'
          }"
    tool-tip="我是nv-ellipsis，这是一个链接"
    content-type="link" />`;
const htmlCode = `
<NvEllipsis
    :isHTML="true"
    content="<h1>我是nv-ellipsis，我支持html，这是h1</h1>"
    tool-tip="<h2>我是nv-ellipsis，我支持html，这是h2</h2>" />`;

export default {
    name: 'nvDutyDemo',
    data() {
        return {
            baseCode,
            telCode,
            emailCode,
            linkCode,
            htmlCode,
            tableData: [
                {
                    name: 'a',
                    age: 1,
                    addr: 'xxx'
                },
                {
                    name: 'b',
                    age: 2,
                    addr: 'xxx'
                },
                {
                    name: 'c',
                    age: 3,
                    addr: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
                },
                {
                    name: 'd',
                    age: 4,
                    addr: ''
                },
                {
                    name: 'e',
                    age: 5,
                    addr: 'xx'
                }
            ]
        }
    },
    computed: {
        columns() {
            return [
                {
                    title: '名字',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '地址',
                    render: (h, {row}) => h('NvEllipsis', {
                        props: {
                            content: row.addr
                        }
                    })
                }
            ];
        }
    }
}
</script>

