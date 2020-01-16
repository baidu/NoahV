[[TOC]]

## 概述

该组件支持switch切换并发送ajax请求

## 使用示例

:::demo 示例
```html
<template>
    <nv-switch
        :value="type"
        :open="open"
        :close="close"
        :size="size"
        :disabled="disabled">
    </nv-switch>
</template>
<script>
export default {
    data() {
        const self = this;
        return {
            type: true,
            size: 'default',
            disabled: false,
            open: {
                url: '/api/xxx',
                params: {
                    params1: 'open'
                },
                method: 'post',
                text: '开',
                successCallback: function (data) {
                    self.$Message.info('open ajax success!');
                },
                failCallback: function (data) {
                    self.$Message.info('open ajax fail!');
                }
            },
            close: {
                url: '/api/xxx',
                params: {
                    params1: 'close'
                },
                text: '关',
                method: 'post',
                successCallback: function (data) {
                    self.$Message.info('close ajax success!');
                },
                failCallback: function (data) {
                    self.$Message.info('close ajax fail!');
                }
            }
        }
    }
}
</script>
```
:::

## API

| 属性     | 说明                               | 类型              | 默认值  |
| -------- | ---------------------------------- | ----------------- | ------- |
| value    | switch状态(open:true, close:false) | String,   Boolean | false   |
| open     | open状态相关配置                   | Object            | -       |
| close    | close状态相关配置                  | Object            | -       |
| size     | 大小                               | String            | default |
| disabled | 是否禁用                           | String,   Boolean | false   |