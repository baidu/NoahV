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
                lineNumbers: true,
                theme: 'solarized light',
                mode: 'text/plain'
            }
        };
    }
};
</script>
