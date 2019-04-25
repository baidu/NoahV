<template>
    <div>
        <div class="usage-item">
            <h2>概述</h2>
            <p>弹框组件</p>
        </div>

        <div class="usage-item">
            <h2>例子</h2>
            <Button type="primary" @click="dialogClick">dialog</Button>
            <nv-dialog type="dialog" :dialog="dialog">
                <div slot>
                    dialog
                </div>
            </nv-dialog><br/>
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
   <div>
        <Button type="primary" @click="dialogClick">dialog</Button>
        <nv-dialog type="dialog" :dialog="dialog">           
            <div slot>
                dialog
            </div>
        </nv-dialog>
   </div>
<\/template>
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
<\/script>
`;
export default {
    data() {
        const self = this;
        return {
            code: CODE,
            dialog: {
                value: false, // 是显示还是隐藏
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
                    properties: 'type',
                    comment: 'dialog类型',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'dialog',
                    comment: '弹窗配置',
                    type: 'Object',
                    initValue: '-'
                },
                {
                    properties: 'dialog.width',
                    comment: '弹窗宽',
                    type: 'Number',
                    initValue: '-'
                },
                {
                    properties: 'dialog.title',
                    comment: '弹窗标题',
                    type: 'String',
                    initValue: '没有将不展示标题栏'
                },
                {
                    properties: 'dialog.content',
                    comment: '弹窗内容',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'dialog.value',
                    comment: '是否展示弹窗',
                    type: 'Boolean',
                    initValue: '-'
                }
            ]
        };
    },
    methods: {
        dialogClick() {
            const self = this;
            self.dialog.value = true;
        }
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
