<template>
    <div>
        <div class="usage-item">
            <h2>概述</h2>
            <p>该业务组件提供自定义表单对话框</p>
        </div>

        <div class="usage-item">
            <h2>例子:点击发送ajax请求按钮</h2>
            <nv-button
                :content="content"
                :type="type"
                :size="size"
                :icon="icon"
                :disabled="disabled"
                :action="action"
            ></nv-button>
            <br/><br/>
            <nv-code :content="codeButton"></nv-code>
        </div>

        <div class="usage-item">
            <h2>例子：自定义dialog按钮</h2>
            <nv-button content="dialog" @click.native="click">
            </nv-button>
            <nv-dialog type="dialog" :dialog="dialog">
                <div slot>
                    我是dialog自定义插槽，点击确定会发送ajax请求
                </div>
            </nv-dialog><br/>
            <nv-code :content="codeDialog"></nv-code>
        </div>

        <div class="usage-item">
            <h2>API</h2>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdata"
            />
            <h2>action</h2>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdataAction"
            />
        </div>
    </div>
</template>

<script>
const CODE_DIALOG = `
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
<\/script>
`;
const CODE_BUTTON = `
<template>
   <nv-button :content="content" :type="type" :size="size" :icon="icon" :disabled="disabled" :action="action"><\/nv-button>
</template>
<script>
export default {
    data() {
        return {
            type: 'info',
            content: 'success',
            size: 'default',
            icon: 'social-googleplus',
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
<\/script>
`;
export default {
    data() {
        const self = this;
        return {
            codeButton: CODE_BUTTON,
            codeDialog: CODE_DIALOG,
            content: 'success',
            type: 'info',
            size: 'default',
            icon: 'social-googleplus',
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
            },
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
                        successCallback() {
                            self.$Message.info('click ajax button success!');
                        },
                        failCallback() {
                            self.$Message.info('click ajax button error!');
                        }
                    }
                },
                cancel: function () {
                    self.$Message.info('cancle click!');
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
                    comment: 'button类型(primary、ghost、dashed、text、info、success、warning、error)',
                    type: 'String',
                    initValue: 'ghost'
                },
                {
                    properties: 'content',
                    comment: 'button内容',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'size',
                    comment: '大小',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'disabled',
                    comment: '是否禁用',
                    type: 'String、Boolean',
                    initValue: 'false'
                },
                {
                    properties: 'icon',
                    comment: 'button图标',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'action',
                    comment: '点击行为，不传时点击按钮则不发送ajax请求',
                    type: 'Object',
                    initValue: '-'
                }
            ],
            tdataAction: [
                {
                    properties: 'url',
                    comment: '目标url',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'params',
                    comment: '请求参数',
                    type: 'Object',
                    initValue: '-'
                },
                {
                    properties: 'method',
                    comment: '请求方法，支持put、 post、patch，get方法',
                    type: 'String、Boolean',
                    initValue: 'get'
                },
                {
                    properties: 'successCallback',
                    comment: '请求成功后的回调函数',
                    type: 'Function',
                    initValue: '-'
                },
                {
                    properties: 'failCallback',
                    comment: '请求失败后的回调函数',
                    type: 'Function',
                    initValue: '-'
                }
            ]
        };
    },
    methods: {
        click() {
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
