<template>
    <nv-switch :value="type" :size="size" :disabled="disabled"></nv-switch>
</template>

<script>
export default {
    data() {
        return {
            type: true,
            size: 'default',
            disabled: false
        }
    }
}
</script>

<style lang="less">

</style>
