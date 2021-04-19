<template>
    <CheckboxGroup v-bind="$attrs" v-on="$listeners" :class="nvClasses"><slot></slot></CheckboxGroup>
</template>
<script>
import {CheckboxGroup} from 'view-design';
const prefixCls = 'noahv-checkbox-group';

export default {
    name: 'nv-checkbox-group',
    components: {
        CheckboxGroup
    },
    computed: {
        nvClasses() {
            return `${prefixCls}`;
        }
    }
};
</script>
