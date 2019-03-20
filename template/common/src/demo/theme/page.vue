<template>
    <div class="theme-demo">
        <Page :total="100"></Page></br>
        <Page :total="100" show-sizer></Page>
        <p>注意：页面显示数量特殊样式在组件/项目中自定义实现</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    methods: {
        info() {
            this.$Message.info({content: 'This is a info tip', duration: 3, closable: false});
        }
    }
};
</script>

<style lang="less">
.theme-demo {
    h3, p {
        margin: 10px 0;
    }
}
</style>
