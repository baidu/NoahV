<template>
    <nv-switch :value="type" :open="open" :close="close" :size="size" :disabled="disabled"></nv-switch>
</template>

<script>
export default {
    data() {
        return {
            type: true,
            size: 'default',
            disabled: false,
            open: {
                text: '开'
            },
            close: {
                text: '关'
            }
        }
    }
}
</script>

<style lang="less">

</style>
