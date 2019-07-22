<template>
    <div>
        <div class="usage-item">
            <h2>概述</h2>
            <p>弹框组件</p>
        </div>

        <div class="usage-item">
            <h2>使用：</h2>
            <div class="code">
                <pre><code><span>&lt;<span>Button type="primary" @click="dialogClick"</span>&gt;dialog&gt;&lt;/Button&gt;</span></code></pre>
                <pre><code><span>&lt;<span>NvDialog :type="type" :dialog="dialog"</span>&gt;&lt;<span>div slot</span>&gt;dialog&lt;/div&gt;&lt;/NvDialog&gt;</span></code></pre>
            </div>
        </div>

        <div class="usage-item">
            <h2>API</h2>
            <NvTable
                :columns="columns"
                :pagination="false"
                :tdata="tdata"
            />
        </div>

        <div class="usage-item">
            <h2>例子</h2>
            <div class="code"><pre><code>
                dialog: {
                    value: false,
                    title: 'dialog title',
                    ok: {
                        type: 'ajax',
                        ajax: {
                            url: '/xxx',
                            showLoading: false,
                            params: {
                                params1: 'xx'
                            },
                            method: 'post',
                            successCallback: () => {
                                this.$Message.info('dialog ajax success');
                            },
                            failCallback: () => {
                                this.$Message.info('dialog ajax fail');
                            }
                        }
                    }, 
                    cancel: () => {
                        this.$Message.info('cancel click');
                    }
                },
            </code></pre></div>
            <h4>效果</h4>
            <Button type="primary" @click="dialogClick">dialog</Button>
            <NvDialog type="dialog" :dialog="dialog">           
                <div slot>
                    dialog
                </div>
            </NvDialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: 'success',
            type: 'info',
            size: 'default',
            icon: 'social-googleplus',
            disabled: false,
            dialog: {
                value: false, // 是显示还是隐藏
                title: 'dialog title',
                ok: {
                    type: 'ajax',
                    ajax: {
                        url: '/api/dialog',
                        showLoading: false,
                        params: {
                            params1: 'xx'
                        },
                        method: 'post',
                        successCallback: () => {
                            this.$Message.info('dialog ajax success');
                        },
                        failCallback: () => {
                            this.$Message.info('dialog ajax fail');
                        }
                    }
                }, 
                cancel: () => {
                    this.$Message.info('cancel click');
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
                    type: 'Object',
                    initValue: '-'
                }
            ]
        }
    },
    methods: {
        dialogClick() {
            this.dialog.value = true;
        }
    }
}
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
