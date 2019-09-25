<template>
    <div class="common-404">
        <Nv404
            :title="title"
            :tips="tips"
            :href="href"
        />
    </div>
</template>

</script>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class common404 extends Vue {
    title: string = '404';
    tips: string = '啊嘞，找不到路了~';
    href: string = '#/';
};
</script>

<style lang="less">
.common-404 {

}
</style>
