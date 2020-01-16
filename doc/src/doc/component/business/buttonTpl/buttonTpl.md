[[TOC]]
## 概述

该业务组件提供自定义表单对话框

## 使用示例

:::demo 点击发送ajax请求按钮
```html
<template>
   <nv-button :content="content" :type="type" :size="size" :icon="icon" :disabled="disabled" :action="action"></nv-button>
</template>
<script>
export default {
    data() {
        return {
            type: 'info',
            content: 'success',
            size: 'default',
            icon: 'ios-refresh',
            disabled: false,
            action: {
                url: '/api/xxx',
                params: {
                    params1: 'xxx'
                },
                method: 'post',
                successCallback: function (data) {
                    self.$Message.info('click ajax button success!');
                },
                failCallback: function (data) {
                    self.$Message.info('click ajax button error!');
                }
            }
        }
    }
}
</script>
```
:::


:::demo 自定义dialog按钮
```html
<template>
   <div>
        <nv-button content="dialog" @click.native="click">
        </nv-button>
        <nv-dialog type="dialog" :dialog="dialog">           
            <div slot>
                我是dialog自定义插槽，点击确定会发送ajax请求
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
                title: '我是自定义dialog按钮的title',
                ok: {
                    type: 'ajax',
                    ajax: {
                        url: '/api/xxx',
                        params: {
                            params1: 'xxx'
                        },
                        method: 'post',
                        successCallback: function (data) {
                            self.$Message.info('click ajax button success!');
                        },
                        failCallback: function (data) {
                            self.$Message.info('click ajax button error!');
                        }
                    }
                }, 
                cancel: function () {
                    self.$Message.info('cancle click!');
                }
            }
        }
    },
    methods: {
        click() {
            const self = this;
            self.dialog.value = true;
        }
    }
}
</script>
```
:::


## API

### props

| 属性     | 说明                                                         | 类型            | 默认值 |
| -------- | ------------------------------------------------------------ | --------------- | ------ |
| type     | button类型(primary、ghost、dashed、text、info、success、warning、error) | String          | ghost  |
| content  | button内容                                                   | String          | -      |
| size     | 大小                                                         | String          | -      |
| disabled | 是否禁用                                                     | String、Boolean | false  |
| icon     | button图标                                                   | String          | -      |
| action   | 点击行为，不传时点击按钮则不发送ajax请求                     | Object          | -      |

### props.action

| 属性            | 说明                                       | 类型            | 默认值 |
| --------------- | ------------------------------------------ | --------------- | ------ |
| url             | 目标url                                    | String          | -      |
| params          | 请求参数                                   | Object          | -      |
| method          | 请求方法，支持put、   post、patch，get方法 | String、Boolean | get    |
| successCallback | 请求成功后的回调函数                       | Function        | -      |
| failCallback    | 请求失败后的回调函数                       | Function        | -      |

 