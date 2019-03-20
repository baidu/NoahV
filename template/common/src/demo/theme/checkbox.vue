<template>
    <div class="theme-demo">
        <h3>正常样式</h3>
        <Checkbox>Checkbox</Checkbox>
        <Checkbox v-model="checkbox">Checkbox</Checkbox>
        <h3>禁用样式</h3>
        <Checkbox disabled>Checkbox</Checkbox>
        <Checkbox v-model="checkbox" disabled>Checkbox</Checkbox>
    </div>
</template>
<script>
export default {
    data() {
        return {
            checkbox: true
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
