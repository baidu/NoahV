<template>
    <div class="theme-demo">
        <h3>线式标签</h3>
        <Tabs size="small">
            <TabPane label="我是一个很长很长很长的标签" v-if="tab0">标签一的内容</TabPane>
            <TabPane label="标签二" v-if="tab1">标签二的内容</TabPane>
            <TabPane label="标签三" v-if="tab2">标签三的内容</TabPane>
        </Tabs>
        <h3>卡片标签</h3>
        <Tabs type="card">
            <TabPane label="标签一" v-if="tab0">标签一的内容</TabPane>
            <TabPane label="标签二" v-if="tab1">标签二的内容</TabPane>
            <TabPane label="标签三" v-if="tab2">标签三的内容</TabPane>
        </Tabs>
        <h3>特殊样式标签</h3>
        <Tabs type="card" closable @on-tab-remove="handleTabRemove">
            <TabPane label="标签一" v-if="tab3">标签一的内容</TabPane>
            <TabPane label="标签二" v-if="tab4">标签二的内容</TabPane>
            <TabPane label="标签三" v-if="tab5">标签三的内容</TabPane>
        </Tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tab0: true,
            tab1: true,
            tab2: true,
            tab3: true,
            tab4: true,
            tab5: true
        };
    },
    methods: {
        handleTabRemove(name) {
            this['tab' + name] = false;
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
