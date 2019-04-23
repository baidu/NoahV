<template>
    <div >
        <formTpl
        :items="items"
        :action="action"
        position="left"
        :labelwidth="60"
        url="/api/tpl/form/get"
        method="post"
        :args="args"
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
                }
            ],
            action: [],
            args: {
                dev: true
            }
        };
    }
};
</script>

<style lang="less" >

</style>
