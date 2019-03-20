<template>
    <div :class="getCls('dialog-tpl')">
        <template v-if="type === 'dialog'">
            <Modal
                v-model="dialog.value"
                :title="dialog.title"
                :width="dialogWidth"
                :mask-closable="!dialog.forbidMaskClose"
                @on-ok="dialogOk"
                @on-cancel="dialogCancel">
                <slot></slot>
                <div v-if="dialog.footer || dialog.hideFooter" slot="footer">
                    <Button v-for="(item, index) in dialog.footer"
                        :key="index"
                        :type="item.type"
                        :size="item.size"
                        @click="footerClick(item, dialog.form)"
                    >
                        {{item.content}}
                    </Button>
                </div>
             </Modal>
         </template>
    </div>
</template>
<script>
import getClassName from '../utils.js';

export default {
    name: 'nvDialogTpl',
    created() {
        this.confirmAction();
    },
    watch: {
        dialog: {
            handler(current) {
                if (this.type === 'confirm' && current.value) {
                    this.confirmAction();
                }
            },
            deep: true
        }
    },
    props: {
        type: String,
        dialog: Object
    },
    data() {
        const self = this;
        return {
            dialogWidth: self.dialog.width ? self.dialog.width : 520
        };
    },
    methods: {
        /**
         * 获取类名
         *
         * @param {String} postfix 后缀名称
         * @return {Object} 样式集合
         */
        getCls(postfix) {
            return getClassName.getComponentWrapperCls(postfix);
        },
        confirmAction() {
            if (this.type === 'confirm' && this.dialog.value) {
                this.$Modal.confirm({
                    title: this.dialog.title ? this.dialog.title : 'title',
                    content: this.dialog.content ? this.dialog.content : '',
                    width: this.dialogWidth,
                    onOk: () => {
                        this.dialogOk();
                    },
                    onCancel: () => {
                        this.dialogCancel();
                    }
                });
            }
        },
        /**
         * 获取发送请求的配置
         *
         * @return {Object} 请求配置
         */
        getAjaxConfig() {
            let config = this.dialog.ok.ajax ? this.dialog.ok.ajax : {};
            let ajaxConfig = {
                url: config.url ? config.url : '',
                showLoading: typeof config.showLoading === 'undefined' ? true : config.showLoading,
                params: config.params ? config.params : {},
                parhArgs: config.parhArgs ? config.parhArgs : {},
                method: config.method ? config.method.toLowerCase() : 'get',
                successCallback: config.successCallback ? config.successCallback : () => null,
                failCallback: config.failCallback ? config.failCallback : () => null
            };
            return ajaxConfig;
        },
        dialogOk() {
            if (this.dialog.ok) {
                // type 为callback
                if (this.dialog.ok.type === 'callback' && this.dialog.ok.callback) {
                    this.dialog.ok.callback();
                }
                // type 为ajax
                else {
                    const config = this.getAjaxConfig(this.switchValue);
                    let ajaxConfig = {
                        showLoading: config.showLoading,
                        url: config.url,
                        method: config.method
                    };
                    if (config.method === 'get') {
                        ajaxConfig.params = config.params;
                    }
                    else {
                        ajaxConfig.data = config.params;
                    }
                    this.$request(ajaxConfig).then(res => {
                        const data = res.data;
                        if (data.success) {
                            config.successCallback(data.data);
                            this.dialog.value = false;
                        }
                        else {
                            config.failCallback(data.message);
                            this.$Message.error(data.message);
                            this.dialog.value = false;
                        }
                    });
                }
            }
        },
        dialogCancel() {
            if (this.dialog.cancel) {
                this.dialog.cancel();
                this.dialog.value = false;
            }
            else {
                this.dialog.value = false;
            }
        },
        footerClick(config) {
            if (config.callback) {
                config.callback();
            }
            // 未设置不关闭dialog
            if (!config.notCloseDialog) {
                this.dialog.value = false;
            }
        }
    }
};
</script>

