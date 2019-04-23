<template>
    <div>
        <div class="usage-item">
            <h2>概述</h2>
            <p>该组件支持switch切换并发送ajax请求</p>
        </div>

        <div class="usage-item">
            <h2>例子</h2>
            <nv-switch :value="type" :open="open" :close="close" :size="size" :disabled="disabled">
	        </nv-switch><br/>
            <nv-code :content="code"></nv-code>
        </div>

        <div class="usage-item">
            <h2>API</h2>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdata"
            />
        </div>
    </div>
</template>

<script>
const CODE = `
<template>
    <nv-switch :value="type" :open="open" :close="close" :size="size" :disabled="disabled"></nv-switch>
<\/template>
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
<\/script>
`;
export default {
    data() {
        const self = this;
        return {
            code: CODE,
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
            },
            columns: [
                {
                    title: '属性',
                    key: 'properties'
                },
                {
                    title: '说明',
                    key: 'comment'
                },
                {
                    title: '类型',
                    key: 'type'
                },
                {
                    title: '默认值',
                    key: 'initValue'
                }
            ],
            tdata: [
                {
                    properties: 'value',
                    comment: 'switch状态(open:true, close:false)',
                    type: 'String, Boolean',
                    initValue: 'false'
                },
                {
                    properties: 'open',
                    comment: 'open状态相关配置',
                    type: 'Object',
                    initValue: '-'
                },
                {
                    properties: 'close',
                    comment: 'close状态相关配置',
                    type: 'Object',
                    initValue: '-'
                },
                {
                    properties: 'size',
                    comment: '大小',
                    type: 'String',
                    initValue: 'default'
                },
                {
                    properties: 'disabled',
                    comment: '是否禁用',
                    type: 'String, Boolean',
                    initValue: 'false'
                }
            ]
        };
    }
};
</script>

<style lang="less">
h2 {
    margin-bottom: 10px;
}
h4 {
    margin-bottom: 10px;
}
.usage-item {
    margin-bottom: 30px;
    .code {
        border: 1px solid #ededed;
        border-radius: 2px;
        background: #f7f7f7;
        padding-left: 15px;
        margin-bottom: 10px;
    }
    .show-icon {
        margin-bottom: 20px;
    }
}
</style>
