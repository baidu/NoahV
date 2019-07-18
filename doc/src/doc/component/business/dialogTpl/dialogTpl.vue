<template>
    <div>
        <div class="usage-item">
            <h2>概述</h2>
            <h3>自定义弹框组件，支持弹框自定义配置</h3>
        </div>

        <div class="usage-item">
            <h2>例子1:普通dialog</h2>
            <Button type="primary" @click="dialogClick">dialog</Button>
            <nv-dialog type="dialog" :dialog="dialog">
                <div slot>
                    dialog
                </div>
            </nv-dialog><br/>
            <nv-code :content="code"></nv-code>
        </div>

        <div class="usage-item">
            <h2>例子2:自定义页脚</h2>
            <Button type="ghost" @click="dialogFooterClick">dialogFooter</Button>
            <nv-dialog type="dialog" :dialog="dialogFooter">
                <div slot>
                    Write Something You Want!
                </div>
            </nv-dialog><br/>
            <nv-code :content="codeFooter"></nv-code>
        </div>

        <div class="usage-item">
            <h2>API</h2>
            <h3>props</h3>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdata"
            />
            <h3>dialog公共配置项</h3>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdataDialogCommon"
            />
            <h3>1. type=confirm,或type=dialog且无自定义页脚时对应的dialog配置项</h3>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdataDialogConfirm"
            />
            <h3>ok配置参数</h3>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdataDialogConfirmOk"
            />
            <h3>ajax请求配置参数</h3>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdataAction"
            />
            <h3>2. type取值为dialog时存在自定义页脚对应的dialog配置项</h3>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdataDialog"
            />
            <h3>自定义页脚Footer</h3>
            <tableTpl
                :columns="columns"
                :pagination="false"
                :tdata="tdataDialogFooter"
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
const CodeFooter = `
<template>
    <div>
        <Button type="primary" @click="dialogFooterClick">dialogFooter</Button>
        <nv-dialog type="dialog" :dialog="dialogFooter">
            <div slot>
                Write Something You Want!
            </div>
        </nv-dialog><br/>
    </div>
<\/template>
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
<\/script>
`;
export default {
    data() {
        const self = this;
        return {
            code: CODE,
            codeFooter: CodeFooter,
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
                    comment: '弹框类型，confirm或dialog；当取值为confirm时，页脚对应确定和取消按钮；当取值为dialog式，可启用自定义弹框，配置相应的页脚',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'dialog',
                    comment: '弹窗配置',
                    type: 'Object',
                    initValue: '-'
                }
            ],
            tdataDialogCommon: [
                {
                    properties: 'width',
                    comment: '弹窗宽度',
                    type: 'Number',
                    initValue: '-'
                },
                {
                    properties: 'title',
                    comment: '弹窗标题',
                    type: 'String',
                    initValue: 'type取值为dialog时，默认值为空，不展示标题栏；type取值为confirm时，默认值为title'
                },
                {
                    properties: 'content',
                    comment: '弹窗内容',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'value',
                    comment: '是否展示弹窗',
                    type: 'Boolean',
                    initValue: '-'
                }
            ],
            tdataDialogConfirm: [
                {
                    properties: 'cancel',
                    comment: '点击取消对应的回调函数',
                    type: 'Function',
                    initValue: '-'
                },
                {
                    properties: 'ok',
                    comment: '确定按钮的自定义配置',
                    type: 'Object',
                    initValue: '-'
                }
            ],
            tdataDialogConfirmOk: [
                {
                    properties: 'type',
                    comment: '取值为callback或ajax,分别对应回调函数和发送Ajax请求',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'callback',
                    comment: 'type取值为callback时对应的回调函数',
                    type: 'Function',
                    initValue: '-'
                },
                {
                    properties: 'ajax',
                    comment: 'type取值为ajax时对应的ajax配置,主要包括url、method、params、showLoading、successCallback、failCallback等参数，详情见ajax配置',
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
            ],
            tdataDialog: [
                {
                    properties: 'footer',
                    comment: '自定义页脚的按钮配置,可选,若无则隐藏页脚',
                    type: 'Array',
                    initValue: '-'
                },
                {
                    properties: 'hideFooter',
                    comment: '是否隐藏页脚,当配置了footer属性的时候,忽略该值',
                    type: 'Boolean',
                    initValue: '-'
                }
            ],
            tdataDialogFooter: [
                {
                    properties: 'type',
                    comment: '按钮类型',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'size',
                    comment: '按钮大小',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'content',
                    comment: '按钮内容',
                    type: 'String',
                    initValue: '-'
                },
                {
                    properties: 'callback',
                    comment: '按钮点击对应的回调函数',
                    type: 'Function',
                    initValue: '-'
                },
                {
                    properties: 'notCloseDialog',
                    comment: '回调函数调用之后是否关闭弹框',
                    type: 'Boolean',
                    initValue: 'true：不关闭，false：关闭'
                }
            ]
        };
    },
    methods: {
        dialogClick() {
            const self = this;
            self.dialog.value = true;
        },
        dialogFooterClick() {
            const self = this;
            self.dialogFooter.value = true;
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
    h3 {
        margin: 10px 0;
    }
    h2 {
        margin: 10px 0;
        border-left: 6px solid #eee;
        padding-left: 10px;
    }
}
</style>
