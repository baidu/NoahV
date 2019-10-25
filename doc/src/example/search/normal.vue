<template>
    <div>
        <NvSearch :data="options"></NvSearch>
    </div>
</template>

<script>
export default {
    name: 'nvSearchNormalDemo',
    data() {
        return {
            options: [
                {
                    label: '产品线',
                    value: 'products'
                }, 
                {
                    label: '应用名称',
                    value: 'taskName'
                }
            ]
        };
    }
};
</script>

<style lang="less">
</style>
