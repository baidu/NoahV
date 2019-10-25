<template>
    <div class="sa-text-line-set-get-wrapper">
        <div class="btn-wrapper">
            <Button type="primary" @click="setText">设置数据</Button>
            <Button type="primary" @click="getText">获取数据</Button>
            <Button type="primary" @click="getLineCount">获取行数</Button>
        </div>
        <NvTextLine :width="width" :height="height" :options="options" ref="saTextLineDemo"></NvTextLine>
    </div>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            width: 600,
            height: 200,
            options: {
                lineNumbers: true,
                mode: 'text/plain'
            }
        };
    },
    methods: {
        setText: function () {
            this.$refs['saTextLineDemo'].setText('set data for this textarea');
        },
        getText: function () {
            let text = this.$refs['saTextLineDemo'].getText();
            this.$Message.info(text);
        },
        getLineCount: function () {
            let count = this.$refs['saTextLineDemo'].getLineCount();
            this.$Message.info(count + '行');
        }
    }
};
</script>
<style lang="less" >
    .sa-text-line-set-get-wrapper {
        .btn-wrapper {
            margin: 30px 0 15px 0;
        }
    }
</style>
