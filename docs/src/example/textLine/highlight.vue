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
            value: 'var now = new Date();',
            options: {
                lineNumbers: true,
                mode: 'text/javascript'

            }
        };
    }
};
</script>
