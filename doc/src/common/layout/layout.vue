<template>
    <div class="saasv-layout">
        <div class="saasv-layout-header">
            dasdsadadasd
            <!-- you can diy header in this content -->
        </div>
        <!-- pleas keep this node -->
        <div class="saasv-layout-content">
            <div class="saasv-layout-content-main">
                <router-view></router-view>
            </div>
        </div>
        <div class="saasv-layout-footer">
            dddsa
            <!-- you can diy footer in this content -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'SaHeader'
};
</script>
