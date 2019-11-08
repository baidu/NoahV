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
                    submitAlias: 'name',
                    title: '用户名',
                    type: 'input',
                    placeholder: 'username',
                    width: '400px',
                    required: true
                },
                {
                    name: 'email',
                    submitAlias: 'mail',
                    title: '邮箱',
                    type: 'input',
                    placeholder: 'email',
                    width: '400px',
                    required: true
                }
            ],
            action: [
                {
                    name: 'reset',
                    type: 'default',
                    title: '取消',
                    link: '#/doc/template/basic-table'
                },
                {
                    name: 'submit',
                    type: 'primary',
                    title: '保存',
                    submitUrl: '/api/tpl/form/submit',
                    args: {},
                    // linkTo: '',
                    filterData(submitData) {
                        alert(JSON.stringify(submitData));
                    }
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
