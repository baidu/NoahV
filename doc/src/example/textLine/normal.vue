<template>
    <NvTextLine :width="width" :height="height" :options="options"></NvTextLine>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            width: 600,
            height: 200,
            options: {
                placeholder: '请输入文本内容',
                mode: 'text/plain'
            }
        };
    }
};
</script>
