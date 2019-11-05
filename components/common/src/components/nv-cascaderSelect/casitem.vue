<template>
    <li class="sub-menu-item">
        <Checkbox v-model="data.active" @on-change="change"></Checkbox>
        <span :title="data.label">{{ data.label }}</span>
    </li>
</template>
<script>
    export default {
        name: 'Casitem',
        props: {
            data: Object
        },
        methods: {
            change() {
                this.$emit('on-change', this.data);
            }
        }
    };
</script>
