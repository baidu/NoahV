<template>
    <div class="theme-demo">
        <h3>单行提示</h3>
        <Tooltip content="单行提示" placement="top-start" theme="light">
            <Button>单行提示</Button>
        </Tooltip>
        <h3>多行样式</h3>
        <p>组件/项目 使用自定义slot 或 自定义样式 方式实现;</p>
        <p>也可以通过使用iview 3.x 版本 max-width方式实现；</p>
        <h3>主题颜色</h3>
        <p>组件/项目通过 自定义样式 方式实现；</p>
        <p>也可以通过使用iview 3.x 版本 theme方式实现；</p>
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
