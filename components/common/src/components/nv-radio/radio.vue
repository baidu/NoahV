<template>
    <Radio v-bind="$attrs" v-on="$listeners" :class="nvWrapClasses"><slot></slot></Radio>
</template>
<script>
import {Radio} from 'view-design';
const prefixCls = 'noahv-radio';

export default {
    name: 'nvRadio',
    components: {
        Radio
    },
    computed: {
        nvWrapClasses() {
            const _this = this.$attrs;
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-group-item`]: _this.group,
                    [`${prefixCls}-wrapper-checked`]: _this.currentValue,
                    [`${prefixCls}-wrapper-disabled`]: _this.itemDisabled,
                    [`${prefixCls}-${this.size}`]: !!_this.size,
                    [`${prefixCls}-focus`]: _this.focusWrapper,
                    [`${prefixCls}-border`]: _this.border
                }
            ];
        }
    }
};
</script>
