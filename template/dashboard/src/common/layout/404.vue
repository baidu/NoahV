<template>
    <div class="common-404">
        <Nv404
            :title="title"
            :tips="tips"
            :href="href"
        />
    </div>
</template>
<script>
export default {
    name: 'common-404',
    data() {
        return {
            title: '404',
            tips: '啊嘞，找不到路了~',
            href: '#/'
        };
    }
};
</script>

<style lang="less">
.common-404 {

}
</style>
