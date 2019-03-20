<template>
    <div class="table-demo">
        <NvForm
            :items="items"
            :action="action"
            position="left"
            :labelwidth="80"
            url="/api/demo/form/default"
            ref="formDemo"
        />
    </div>
</template>

<script>
export default {
    name: 'formDemo',
    data() {
        return {
            items: [
                {
                    name: 'username',
                    title: '模板名称',
                    type: 'input',
                    placeholder: '输入模板名称',
                    required: true,
                    width: '400px'
                },
                {
                    name: 'detail',
                    title: '模板说明',
                    type: 'input',
                    placeholder: '输入模板说明',
                    width: '400px'
                },
                {
                    name: 'department',
                    title: '模板命令',
                    type: 'input',
                    types: 'textarea',
                    rows: 5,
                    placeholder: '输入命令行',
                    width: '400px'
                },
                {
                    name: 'model',
                    title: '模板',
                    type: 'select',
                    required: true,
                    width: '400px',
                    validateType: 'number',
                    option: [
                        {
                            name: '模板1',
                            value: 1
                        },
                        {
                            name: '模板2',
                            value: 2
                        }
                    ]
                }
            ],
            action: [
                {
                    name: 'reset',
                    type: 'ghost',
                    title: '取消',
                    link: '#/tableDemo'
                },
                {
                    name: 'submit',
                    type: 'primary',
                    title: '保存',
                    submitUrl: '/api/demo/form/submit',
                    args: {},
                    callback: () => {
                        this.$Message.success('提交成功');
                    }
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
