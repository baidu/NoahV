<template>
    <Button v-bind="$attrs" v-on="$listeners" :class="nvClasses"><slot></slot></Button>
</template>
<script>
import {Button} from 'view-design';
const prefixCls = 'noahv-btn';

export default {
    name: 'nv-button',
    components: {
        Button
    },
    props: {

    },
    computed: {
        nvClasses () {
            const _this = this.$attrs;
            return [
                `${prefixCls}`,
                `${prefixCls}-${_this.type}`,
                {
                    [`${prefixCls}-long`]: _this.long,
                    [`${prefixCls}-${_this.shape}`]: !!_this.shape,
                    [`${prefixCls}-${_this.size}`]: _this.size !== 'default',
                    [`${prefixCls}-loading`]: _this.loading != null && _this.loading,
                    [`${prefixCls}-icon-only`]: !_this.showSlot && (!!_this.icon || !!_this.customIcon || _this.loading),
                    [`${prefixCls}-ghost`]: _this.ghost
                }
            ];
        }
    }
}
</script>