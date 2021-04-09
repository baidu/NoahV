<template>
    <i-switch v-bind="$attrs" v-on="$listeners" :class="nvWrapClasses">
        <span slot="open">{{openText}}</span>
        <span slot="close">{{closeText}}</span>
    </i-switch>
</template>

<script>
import {Switch} from 'view-design';
const prefixCls = 'noahv-switch';

export default {
    name: 'nvSwitch',
    props: {
        // open 的相关的参数
        open: Object,
        // close 的相关的参数
        close: Object,
    },
    components: {
        'i-switch': Switch
    },
    computed: {
        nvWrapClasses() {
            return `${prefixCls}`;
        }
    },
    data() {
        const open = (this.open && this.open.text) ? this.open.text : '';
        const close = (this.close && this.close.text) ? this.close.text : '';

        return {
            openText: open,
            closeText: close
        };
    }
};
</script>

