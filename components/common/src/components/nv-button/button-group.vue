<template>
    <ButtonGroup v-bind="$attrs" v-on="$listeners" :class="nvClasses"><slot></slot></ButtonGroup>
</template>
<script>
import {ButtonGroup} from 'view-design';
const prefixCls = 'noahv-btn-group';

export default {
    name: 'nv-button-group',
    components: {
        ButtonGroup
    },
    computed: {
        nvClasses () {
            const _this = this.$attrs;
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-${_this.size}`]: !!_this.size,
                    [`${prefixCls}-${_this.shape}`]: !!_this.shape,
                    [`${prefixCls}-vertical`]: _this.vertical
                }
            ];
    }
    }
}
</script>