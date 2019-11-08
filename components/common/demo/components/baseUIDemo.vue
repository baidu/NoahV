<template>
    <div>
        <p>输入框</p>
        <NvInput :disabled="false" :readonly="false" autocomplete="true" value="1312eqsa" :suggestlist="suggestlist"></NvInput>
        <br><br>
        <p>普通按钮</p>
        <Button type="default">Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
        <br><br>
        <p>颜色按钮</p>
        <Button type="info">Info</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="error">Error</Button>
        <br><br>
        <p>禁用按钮</p>
        <Button disabled>Default</Button>
        <Button disabled>Primary</Button>
    </div>
</template>

<script>
export default {
    name: 'baseUIDemo',
    data () {
        const self = this;
        return {
            suggestlist: [
                {
                    name: '吉娃娃',
                    value: '1'  
                },
                {
                    name: '中华田园犬',
                    value: '2'  
                },
                {
                    name: '泰迪',
                    value: '3'  
                }
            ]
        };
    },
    methods: {
        
    }
};
</script>

<style lang="less" >

</style>
