<template>
    <RadioGroup v-bind="$attrs" v-on="$listeners" :class="nvClasses" :buttonType="currentButtonType"><slot></slot></RadioGroup>
</template>
<script>
import {RadioGroup} from 'view-design';
const prefixCls = 'noahv-radio-group';
const prefixClsR = 'noahv-radio';

export default {
    name: 'nv-radio-group',
    components: {
        RadioGroup
    },
    props: {
        buttonType: {
            type: String,
            default: 'default' // 'strong', 'default'
        }
    },
    data() {
        return {
            currentButtonType: this.buttonType
        }
    },
    computed: {
        nvClasses () {
            const _this = this.$attrs;
            _this.buttonType === 'strong' ? 'strong' : 'default';
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-${_this.size}`]: !!_this.size,
                    [`${prefixClsR}-${_this.size}`]: !!_this.size,
                    [`${prefixCls}-${_this.type}`]: !!_this.type,
                    [`${prefixCls}-${this.buttonType}`]: _this.type === 'button' && _this.buttonStyle !== 'default',
                    [`${prefixCls}-button-${_this.buttonStyle}`]: _this.type === 'button' && _this.buttonStyle !== 'default',
                    [`${prefixCls}-vertical`]: _this.vertical
                }
            ];
        }
    }
}
</script>