<template>
    <i-tooltip v-bind="$attrs" v-on="$listeners" :class="nvWrapClasses">
        <slot v-for="(name) in Object.keys(this.$slots)" :name="name" :slot="name"></slot>
    </i-tooltip>
</template>

<script>
import {Tooltip} from 'view-design';
import getClassName from '../utils.js';

const prefixCls = 'noahv-tooltip';

export default {
    name: 'nvTooltip',
    components: {
        'i-tooltip': Tooltip
    },
    props: {
    },
    data() {
        return {
        };
    },
    computed: {
        nvWrapClasses() {
            return `${prefixCls}`;
        }
    },
    methods: {
        /**
         * 获取类名
         *
         * @param {String} postfix 后缀名称
         * @return {Object} 样式集合
         */
        getCls(postfix) {
            return getClassName.getComponentWrapperCls(postfix);
        },
    }
};
</script>
