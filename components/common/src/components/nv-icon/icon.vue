<template>
    <Tooltip :content="content"
             :placement="placement"
             :disabled="!hasTooltip"
             :delay="delay"
             :always="always"
             :theme="theme"
             :max-width="maxWidth"
             :offset="offset"
             :transfer="transfer">
        <i :class="classes" :style="{cursor: cursor}"></i>
    </Tooltip>
</template>

<script>
import getClassName from '../utils.js';

export default {
    name: 'NvIcon',
    props: {
        type: String,
        content: {
            type: String,
            default: ''
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        delay: {
            type: Number,
            default: 0
        },
        always: {
            type: Boolean,
            default: false
        },
        theme: {
            type: String,
            default: 'light'
        },
        maxWidth: {
            type: [String, Number],
            default: 100
        },
        offset: {
            type: Number,
            default: 0
        },
        transfer: {
            type: Boolean,
            default: false
        },
        cursor: {
            type: String,
            default: 'default'
        }
    },
    data() {
        return {
            hasTooltip: this.content.length !== 0
        };
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

