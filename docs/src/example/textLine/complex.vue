<template>
    <NvTextLine
    :width="width"
    :height="height"
    :value="value"
    :options="options"
    @on-change="onChangeHandler">
    </NvTextLine>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            width: 600,
            height: 200,
            value: `<!DOCTYPE html>
<html>
<body>
<h1>This is a complex sa-textLine demo<\/h1>
<script>
<\/script>
    document.write('replace body content');
<\/body>
<\/html>`,
            options: {
                lineNumbers: true,
                lineWrapping: true,
                styleActiveLine: true,
                mode: 'text/html',
                theme: 'monokai'
            }
        };
    },
    methods: {
        onChangeHandler: function (val) {
            this.$Message.info('value changed');
        }
    }
};
</script>

<style lang="less" >
</style>
