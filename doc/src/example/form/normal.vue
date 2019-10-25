<template>
    <div >
        <formTpl
        :items="items"
        :action="action"
        position="left"
        :labelwidth="60"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: '输入用户名',
                    width: '400px',
                    required: true
                },
                {
                    name: 'email',
                    title: '邮箱',
                    type: 'input',
                    placeholder: '输入邮箱地址',
                    width: '400px',
                    required: true
                },
                {
                    name: 'text',
                    title: '备注信息',
                    type: 'input',
                    types: 'textarea',
                    rows: 10,
                    labelwidth: 0,
                    placeholder: '输入备注信息',
                    value: '',
                    width: '100%'
                }
            ],
            action: [
                {
                    name: 'reset',
                    type: 'ghost',
                    title: '取消',
                    link: '#/doc/template/basic-table'
                },
                {
                    name: 'submit',
                    type: 'primary',
                    title: '保存',
                    submitUrl: '/api/tpl/form/submit',
                    args: {}
                    // linkTo: '',
                    // callback(fieldsValue, responseData) {
                    // @param {object} fieldsValue  表单数据
                    // @param {object} responseData 请求响应结果，如果有配置submitUrl的话
                    // do something
                    // }
                }
            ]
        };
    }
};
</script>

<style lang="less" >

</style>
