<template>
    <div :class="getCls('switch')">
        <i-switch v-model="switchValue" @on-change="changeSwitch" :size="size" :disabled="switchDisabled">
            <span slot="open">{{openText}}</span>
            <span slot="close">{{closeText}}</span>
        </i-switch>
    </div>
</template>

<script>
import getClassName from '../utils.js';

export default {
    name: 'nvSwitch',
    props: {
        // 是open: true, close: false
        value: {
            type: [String, Boolean],
            default: false
        },
        // open 的相关的参数
        open: Object,
        // close 的相关的参数
        close: Object,
        // 大小
        size: {
            type: String,
            default: 'default'
        },
        // 是否disabled
        disabled: {
            type: [String, Boolean],
            default: false
        }
    },
    watch: {
        value(current) {
            this.switchValue = current;
        }
    },
    computed: {
        switchDisabled() {
            return (typeof this.disabled !== 'undefined') ? this.disabled : false;
        }
    },
    created() {
        this.switchValue = this.value;
        this.changeSwitchAction();
    },
    data() {
        const open = (this.open && this.open.text) ? this.open.text : '';
        const close = (this.close && this.close.text) ? this.close.text : '';
        return {
            switchValue: false,
            openText: open,
            closeText: close
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
        changeSwitch(type) {
            this.switchValue = type;
            this.changeSwitchAction();
        },
        /**
         * 获取发送请求的配置
         *
         * @return {Object} 请求配置
         */
        getAjaxConfig(type) {
            const actionType = type ? 'open' : 'close';
            let config = this[actionType];
            let ajaxConfig = {
                url: config.url ? config.url : '',
                params: config.params ? config.params : {},
                parhArgs: config.parhArgs ? config.parhArgs : {},
                method: config.method ? config.method.toLowerCase() : 'get',
                successCallback: config.successCallback ? config.successCallback : () => null,
                failCallback: config.failCallback ? config.failCallback : () => null
            };

            return ajaxConfig;
        },
        changeSwitchAction() {
            const config = this.getAjaxConfig(this.switchValue);

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

