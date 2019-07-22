<template>
    <div>
        <div class="usage-item">
            <h2>概述</h2>
            <p>该业务组件提供自定义表单对话框</p>
        </div>

        <div class="usage-item">
            <h2>点击直接发送ajax请求按钮</h2>
            <div class="code">
                <pre><code><span>&lt;<span>NvButton :type="type" :content="content" :size="size" :icon="icon" :disabled="disabled" :action="action"</span>&gt;&lt;/NvButton&gt;</span></code></pre>
            </div>
            <h2>点击弹出自定义dialog后发送ajax请求按钮</h2>
            <div class="code">
                <pre><code><span>&lt;<span>NvButton :type="type" :content="content" :size="size" :icon="icon" :disabled="disabled" @click.native="click"</span>&gt;&lt;/NvButton&gt;</span></code></pre>
                <pre><code><span>&lt;<span>NvDialog  type="dialog" :dialog="dialog"</span>&gt;&lt;/NvDialog&gt;</span></code></pre>
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
            <h4>点击发送ajax请求按钮:</h4>
            <div class="code"><pre><code>
                {
                    type: 'info',
                    content: 'success',
                    size: 'default',
                    icon: 'social-googleplus',
                    disabled: 'false',
                    action: {
                        url: '/xxx',
                        params: {
                            params1: 'xxx'
                        },
                        method: 'post',
                        successCallback: (data) => {
                            this.$Message.info('click ajax button success!');
                        },
                        failCallback: (data) => {
                            this.$Message.info('click ajax button error!');
                        }
                    }
                }
            </code></pre></div>
            <h4>效果</h4>
            <NvButton :content="content" :type="type" :size="size" :icon="icon" :disabled="disabled" :action="action">
            </NvButton>

        </div>

        <div class="usage-item">
            <h4>自定义dialog按钮</h4>
            <div class="code"><pre><code>
                data() {
                    dialog: {
                        value: false,
                        title: '我是自定义dialog按钮的title',
                        ok: {
                            type: 'ajax',
                            ajax: {
                                url: '/xxx',
                                params: {
                                    params1: 'xxx'
                                },
                                method: 'post',
                                successCallback: () => {
                                    this.$Message.info('dialog ajax success');
                                },
                                failCallback: () =>  {
                                    this.$Message.info('dialog ajax fail');
                                }
                            }
                        }, 
                        cancel: () => {
                            this.$Message.info('cancel');
                        }
                    }
                },
                methods: {
                    click() {
                        this.dialog.value = true;
                    }
                }
            </code></pre></div>
            <h4>自定义dialog按钮</h4>
            <NvButton content="dialog" @click.native="click">
            </NvButton>
            <nv-dialog type="dialog" :dialog="dialog">           
                <div slot>
                    我是dialog自定义插槽，点击确定会发送ajax请求
                </div>
            </nv-dialog>
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
            action: {
                url: '/api/button',
                params: {
                    params1: 'xxx'
                },
                method: 'get',
                successCallback: (data) => {
                    this.$Message.info('click ajax button success!');
                },
                failCallback: (data) => {
                    this.$Message.info('click ajax button error!');
                }
            },
            actionError: {
                url: '/api/columnError',
                params: {
                    path: '123'
                },
                method: 'post',
                successCallback: (data) => {
                    this.$Message.info('click button success! data is: ', data);
                },
                failCallback: (data) => {
                    this.$Message.info('click button error!', data);
                }
            },
            dialog: {
                value: false,
                title: '我是自定义dialog按钮的title',
                ok: {
                    type: 'ajax',
                    ajax: {
                        url: '/api/button/dialog',
                        params: {
                            params1: 'xxx'
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
                    this.$Message.info('cancel');
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
                    comment: '弹框内容',
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
            ]
        }
    },
    methods: {
        click() {
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
