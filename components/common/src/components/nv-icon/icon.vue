<template>
  <i :class="classes"></i>
</template>

<script>
import getClassName from '../utils.js';

export default {
    name: 'NvIcon',
    props: {
        type: String
    },
    computed: {
        classes() {
            let classConfig = [
                {
                    postfix: 'icon',
                    condition: true
                },
                {
                    postfix: 'icon-' + this.type,
                    condition: true
                }
            ];
            return getClassName.getConditionCls(classConfig);
        }
    }
};
</script>

