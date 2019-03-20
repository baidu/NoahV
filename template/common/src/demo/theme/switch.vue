<template>
    <div class="theme-demo">
        <h3>正常样式</h3>
        <i-switch :value="true">
            <span slot="open">ON</span>
            <span slot="close">OFF</span>
        </i-switch>
        <i-switch>
            <span slot="open">ON</span>
            <span slot="close">OFF</span>
        </i-switch>
        <h3>禁用样式</h3>
        <i-switch :value="true" :disabled="true">
            <span slot="open">ON</span>
            <span slot="close">OFF</span>
        </i-switch>
        <i-switch :disabled="true">
            <span slot="open">ON</span>
            <span slot="close">OFF</span>
        </i-switch>
    </div>
</template>
<script>
export default {
};
</script>

<style lang="less">
.theme-demo {
    h3 {
        margin: 10px 0;
    }
}
</style>
