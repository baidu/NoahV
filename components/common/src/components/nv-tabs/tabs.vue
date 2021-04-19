<template>
    <Tabs v-bind="$attrs" v-on="$listeners" :class="nvClasses"><slot></slot></Tabs>
</template>
<script>
import {Tabs} from 'view-design';
const prefixCls = 'noahv-tabs';

export default {
    name: 'nv-tabs',
    components: {
        Tabs
    },
    computed: {
        nvClasses() {
            const _this = this.$attrs;
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-card`]: _this.type === 'card',
                    [`${prefixCls}-mini`]: _this.size === 'small' && _this.type === 'line',
                    [`${prefixCls}-no-animation`]: !_this.animated
                }
            ];
        }
    }
};
</script>
