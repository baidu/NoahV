<template>
    <checkbox v-bind="$attrs" v-on="$listeners" :class="nvClasses"><slot></slot></checkbox>
</template>
<script>
import {Checkbox} from 'view-design';
const prefixCls = 'noahv-checkbox';

export default {
    name: 'nv-checkbox',
    components: {
        Checkbox
    },
    computed: {
        nvClasses() {
            const _this = this.$attrs;
            return [
                `${prefixCls}-wrapper`,
                {
                    [`${prefixCls}-group-item`]: _this.group,
                    [`${prefixCls}-wrapper-checked`]: _this.currentValue,
                    [`${prefixCls}-wrapper-disabled`]: _this.itemDisabled,
                    [`${prefixCls}-${_this.size}`]: !!_this.size,
                    [`${prefixCls}-border`]: _this.border
                }
            ];
        }
    }
};
</script>
