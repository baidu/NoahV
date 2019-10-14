<template>
    <span :class="getCls()" @click="click($event)">
        <label class="checkbox"></label>
        <span v-if="$slots.default" class="slot"><slot></slot></span>
    </span>
</template>

<script>
const prefixCls = 'noahv-checkbox';

export default {
    name: 'NvCheckbox',
    props: {
        value: Boolean,
        partial: Boolean,
        disabled: Boolean
    },
    data() {
        return {
            checked: this.value
        }
    },
    watch: {
        value(val) {
            this.checked = val;
        }
    },
    methods: {
        getCls() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-checked`]: this.value,
                    [`${prefixCls}-partial-checked`]: this.partial && !this.value,
                    [`${prefixCls}-disabled`]: this.disabled
                }
            ];
        },
        click(event) {
            if (this.disabled) {
                return;
            }
            this.checked = !this.checked;
            this.$emit('input', this.checked);
            this.$emit('on-change', this.checked, event);

        }
    }
};
</script>

