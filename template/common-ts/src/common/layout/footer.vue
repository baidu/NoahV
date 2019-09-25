<template>
    <div class="noahv-layout-footer">
        <!-- warning:
            if you run useHeader() this components Will not be useed,
            you can diy footer in header commponet
        -->
        <div class="copyright">
            ©2019 NoahV团队 出品
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class NvFooter extends Vue {
};
</script>

<style>
    .copyright {
        line-height: 50px;
        text-align: center;
    }
</style>
