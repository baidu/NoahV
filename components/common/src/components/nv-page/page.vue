<template>
    <Page v-bind="$attrs" v-on="$listeners" :class-name="nvWrapClasses" show-elevator show-sizer></Page>
</template>

<script>
import {Page} from 'view-design';
const prefixCls = 'noahv-page';

export default {
    name: 'nvPage',
    components: {
        Page
    },
    computed: {
        nvWrapClasses() {
            return `${prefixCls}`;
        }
    },
    methods: {
    }
};
</script>

