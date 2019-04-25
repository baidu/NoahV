<template>
    <div>
        <NvDatePicker :language="language" :theme="theme" :width="350" type="date" :dateFormat="dateFormat"></NvDatePicker>
    </div>
</template>

<script>
export default {
    name: 'nvDatePickerNormalDemo',
    data() {
        const self = this;
        return {
            language: 'cn',
            dateFormat: 'YYYY-MM-DD',
            theme: 'common'
        };
    }
};
</script>

<style lang="less">
</style>
