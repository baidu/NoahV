<template>
    <div class="theme-demo">
        <h3>普通提示</h3>
        <Button @click="info">info</Button>
        <h3>成功/错误/警告反馈</h3>
        特殊样式， 组件/项目自定义
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
    h3 {
        margin: 10px 0;
    }
}
</style>
