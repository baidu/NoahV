<template>
    <NvTextLine :width="width" :height="height" :value="value" :options="options"></NvTextLine>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            width: 600,
            height: 200,
            value: '只读文本框',
            options: {
                // 设置为'nocursor'时，无光标显示
                // 设置为true时，无法编辑，但有光标显示
                readOnly: 'nocursor',
                lineNumbers: true,
                mode: 'text/plain'
            }
        };
    }
};
</script>
