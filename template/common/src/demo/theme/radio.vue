<template>
    <div class="theme-demo">
        <h3>正常样式</h3>
        <Radio>Radio</Radio>
        <Radio v-model="radio">Radio</Radio>
        <h3>禁用样式</h3>
        <Radio disabled>Radio</Radio>
        <Radio v-model="radio" disabled>Radio</Radio>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio: true
        };
    }
};
</script>

<style lang="less">
.theme-demo {
    h3 {
        margin: 10px 0;
    }
}
</style>
