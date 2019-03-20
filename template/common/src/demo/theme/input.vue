<template>
    <div class="theme-demo">
        <h3>默认/输入中样式</h3>
        <Input style="width: 300px"></Input>
        <Input style="width: 300px" placeholder="请输入内容"></Input>
        <h3>错误反馈/校验样式</h3>
        项目中自定义
        <h3>禁用样式</h3>
        <Input disabled placeholder="Enter something..." style="width: 300px"/>
        <h3>多行文本样式</h3>
        <Input v-model="text" type="textarea" placeholder="Enter something..." style="width: 300px"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            text: '多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本'
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
