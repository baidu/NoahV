<template>
    <TabPane v-bind="$attrs" v-on="$listeners" :class="nvClasses"><slot></slot></TabPane>
</template>
<script>
import {TabPane} from 'view-design';
const prefixCls = 'noahv-tabPane';

export default {
    name: 'nv-tabs-tabPane',
    components: {
        TabPane
    },
    computed: {
        nvClasses() {
            return `${prefixCls}`;
        }
    }
};
</script>
