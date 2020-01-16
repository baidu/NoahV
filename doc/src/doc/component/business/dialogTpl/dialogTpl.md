[[TOC]]

## 概述

自定义弹框组件，支持弹框自定义配置

## 使用示例

:::demo 普通dialog
```html
<template>
   <div>
        <Button type="primary" @click="dialogClick">dialog</Button>
        <nv-dialog type="dialog" :dialog="dialog">           
            <div slot>
                dialog
            </div>
        </nv-dialog>
   </div>
</template>
<script>
export default {
    data() {
        const self = this;
        return {
            dialog: {
                value: false,
                title: 'dialog title',
                ok: {
                    type: 'ajax',
                    ajax: {
                        url: '/api/xxx',
                        params: {
                            params1: 'xx'
                        },
                        method: 'post',
                        successCallback() {
                            self.$Message.info('dialog ajax success');
                        },
                        failCallback() {
                            self.$Message.info('dialog ajax fail');
                        }
                    }
                }, 
                cancel: function () {
                    self.$Message.info('cancel click');
                }
            }
        }
    },
    methods: {
        dialogClick() {
            const self = this;
            self.dialog.value = true;
        }
    }
}
</script>
```
:::


:::demo 自定义页脚
```html
<template>
    <div>
        <Button type="primary" @click="dialogFooterClick">dialogFooter</Button>
        <nv-dialog type="dialog" :dialog="dialogFooter">
            <div slot>
                Write Something You Want!
            </div>
        </nv-dialog>
    </div>
</template>
<script>
export default {
    data() {
        const self = this;
        return {
            dialogFooter: {
                value: false, // 是显示还是隐藏
                title: 'dialog 自定义配置',
                footer: [
                    {
                        type: 'primary',
                        size: 'small',
                        content: '我是自定义的按钮1',
                        notCloseDialog: false,
                        callback: function() {
                            alert('这里是用来自定义按钮响应函数');
                        }
                    },
                    {
                        type: 'ghost',
                        size: 'large',
                        content: '我是自定义的按钮2',
                        notCloseDialog: true,
                        callback: function() {
                            self.$Message.success('我被按下了');
                        }
                    }
                ]
            }
        }
    },
    methods: {
        dialogFooterClick() {
            const self = this;
            self.dialogFooter.value = true;
        }
    }
}
</script>
```
:::

## API
### props

| 属性   | 说明                                                         | 类型   | 默认值 |
| ------ | ------------------------------------------------------------ | ------ | ------ |
| type   | 弹框类型，confirm或dialog；当取值为confirm时，页脚对应确定和取消按钮；当取值为dialog式，可启用自定义弹框，配置相应的页脚 | String | -      |
| dialog | 弹窗配置                                                     | Object | -      |

### dialog公共配置项

| 属性    | 说明         | 类型    | 默认值                                                       |
| ------- | ------------ | ------- | ------------------------------------------------------------ |
| width   | 弹窗宽度     | Number  | -                                                            |
| title   | 弹窗标题     | String  | type取值为dialog时，默认值为空，不展示标题栏；type取值为confirm时，默认值为title |
| content | 弹窗内容     | String  | -                                                            |
| value   | 是否展示弹窗 | Boolean | -                                                            |


### type=confirm,或type=dialog且无自定义页脚时对应的dialog配置项

| 属性   | 说明                   | 类型     | 默认值 |
| ------ | ---------------------- | -------- | ------ |
| cancel | 点击取消对应的回调函数 | Function | -      |
| ok     | 确定按钮的自定义配置   | Object   | -      |

#### ok配置参数

| 属性     | 说明                                                         | 类型     | 默认值 |
| -------- | ------------------------------------------------------------ | -------- | ------ |
| type     | 取值为callback或ajax,分别对应回调函数和发送Ajax请求          | String   | -      |
| callback | type取值为callback时对应的回调函数                           | Function | -      |
| ajax     | type取值为ajax时对应的ajax配置,主要包括url、method、params、showLoading、successCallback、failCallback等参数，详情见ajax配置 | Object   | -      |

#### ajax请求配置参数

| 属性            | 说明                                     | 类型            | 默认值 |
| --------------- | ---------------------------------------- | --------------- | ------ |
| url             | 目标url                                  | String          | -      |
| params          | 请求参数                                 | Object          | -      |
| method          | 请求方法，支持put、 post、patch，get方法 | String、Boolean | get    |
| successCallback | 请求成功后的回调函数                     | Function        | -      |
| failCallback    | 请求失败后的回调函数                     | Function        | -      |

### type取值为dialog时存在自定义页脚对应的dialog配置项

| 属性       | 说明                                           | 类型    | 默认值 |
| ---------- | ---------------------------------------------- | ------- | ------ |
| footer     | 自定义页脚的按钮配置,可选,若无则隐藏页脚       | Array   | -      |
| hideFooter | 是否隐藏页脚,当配置了footer属性的时候,忽略该值 | Boolean | -      |

### 自定义页脚Footer

| 属性           | 说明                         | 类型     | 默认值                    |
| -------------- | ---------------------------- | -------- | ------------------------- |
| type           | 按钮类型                     | String   | -                         |
| size           | 按钮大小                     | String   | -                         |
| content        | 按钮内容                     | String   | -                         |
| callback       | 按钮点击对应的回调函数       | Function | -                         |
| notCloseDialog | 回调函数调用之后是否关闭弹框 | Boolean  | true：不关闭，false：关闭 |

