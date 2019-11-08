<template>
    <div :class="getCls('button-tpl')">
        <i-button :type="type" :size="size" :icon="icon" :disabled="buttonDisabled" @click="click">
            {{content}}
        </i-button>
    </div>
</template>
<script>
import getClassName from '../utils.js';

export default {
    name: 'nvButtonTpl',
    props: {
        // 内容
        content: {
            type: String,
            default: 'button'
        },
        // 类型
        type: {
            type: String,
            default: 'default'
        },
        // 大小
        size: String,
        // 是否disabled
        disabled: {
            type: [String, Boolean],
            default: false
        },
        // TODO: 支持sa-icon(暂时仅iview图标类型)
        icon: String,
        // 点击行为，不传时点击按钮则不发送ajax请求
        action: Object
    },
    data() {
        return {
        };
    },
    computed: {
        buttonDisabled() {
            return (typeof this.disabled !== 'undefined') ? this.disabled : false;
        }
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
        /**
         * 获取发送请求的配置
         *
         * @return {Object} axios请求/处理配置
         */
        getConfig() {
            let action = this.action;
            let config = {
                url: action.url ? action.url : '',
                params: action.params ? action.params : {},
                parhArgs: action.parhArgs ? action.parhArgs : {},
                method: action.method ? action.method.toLowerCase() : 'get',
                successCallback: action.successCallback ? action.successCallback : () => null,
                failCallback: action.failCallback ? action.failCallback : () => null
            };
            return config;
        },
        click() {
            if (!this.action) {
                return;
            }
            const config = this.getConfig();
            let ajaxConfig = {
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
                }
                else {
                    config.failCallback(data.message);
                    this.$Message.error(data.message);
                }
            });
        }
    }
};
</script>

