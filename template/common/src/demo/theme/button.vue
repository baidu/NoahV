<template>
    <div class="theme-demo">
        <h3>普通按钮</h3>
        <Button>取消</Button>
        <Button disabled>取消</Button>
        <Button>多个文字测试</Button>
        <h3>强调按钮</h3>
        <Button type="primary">取消</Button>
        <Button type="primary" disabled>取消</Button>
        <Button type="primary">多个文字测试</Button>
        <h3>大按钮</h3>
        <Button size="large" type="primary">新建</Button>
        <Button size="large">取消</Button>
        <Button size="large" type="primary">多个文字测试</Button>
        <h3>图标按钮</h3>
        <Button icon="ios-search"></Button>
        <Button><i class="noahv-icon noahv-icon-plus"></i></Button>
        <Button type="primary"><i class="noahv-icon noahv-icon-plus"></i>新建任务</Button>
    </div>
</template>
<script>
export default {
    data() {
        return {

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
