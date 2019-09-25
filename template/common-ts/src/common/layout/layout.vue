<template>
    <div class="noahv-layout">
        <div class="noahv-layout-header">
            dasdsadadasd
            <!-- you can diy header in this content -->
        </div>
        <!-- pleas keep this node -->
        <div class="noahv-layout-content">
            <div class="noahv-layout-content-main">
                <router-view></router-view>
            </div>
        </div>
        <div class="noahv-layout-footer">
            dddsa
            <!-- you can diy footer in this content -->
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class NvLayout extends Vue {
};
</script>