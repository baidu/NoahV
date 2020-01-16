[[TOC]]
## 概述

省略组件，根据父级宽度动态展示内容。多余部分，以省略号展示，并以浮窗展示完整内容，可支持一键复制。
<br>
<br>

## 使用示例
<br>
<br>

:::demo 基础示例
```html
<template>
    <div style="width: 100px">
        <NvEllipsis content="我是nv-ellipsis，我的内容特别多，用户只能看到部分信息，通过悬浮窗可以查看到完成内容，并支持一键复制" />
    </div>
</template>
```
:::

:::demo 当点击这段文字时，会自动唤起拨打电话的应用
```html
<template>
    <NvEllipsis content="10086" content-type="tel"/>
</template>
```
::: 


:::demo 当点击这段文字时，会自动唤起发邮件的应用
```html
<template>
    <NvEllipsis content="NoahV@baidu.com" content-type="email"/>
</template>
```
:::


:::demo 当点击这段文字时，会自动跳转到配置的链接
```html
<template>
    <NvEllipsis
        :content="{
                'href': 'https://www.baidu.com',
                'target': '_blank,',
                'text': '百度一下，你就知道'
          }"
        tool-tip="我是nv-ellipsis，这是一个链接"
        content-type="link" />
</template>
```
:::

:::demo 支持传入自定义 HTML
```html
<template>
    <NvEllipsis
        :isHTML="true"
        content="<h1>我是nv-ellipsis，我支持html，这是h1</h1>"
        tool-tip="<h2>我是nv-ellipsis，我支持html，这是h2</h2>" />
</template>
```
:::

<span style="color:red">注意：自定义内容，可能会导致省略(点点点)样式效果失效，需要自行补充 CSS 样式</span>

:::demo 在表格中应用场景
```html
<template>
    <nvTable
        :columns="columns"
        :tdata="tableData"
        :pagination="false"
        style="width: 300px"></nvTable>
</template>
<script>
export default {
    data() {
        return {
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
```
:::


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

