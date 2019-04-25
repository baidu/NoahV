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
        const self = this;
        return {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: 'username',
                    width: '400px',
                    required: true
                },
                {
                    name: 'sexy',
                    title: '性别',
                    type: 'select',
                    width: '400px',
                    option: [
                        {
                            name: '男',
                            value: '男'
                        },
                        {
                            name: '女',
                            value: '女'
                        }
                    ],
                    event: {
                        onChange(args) {
                            self.$Message.info('您选择了性别：' + args);
                        }
                    },
                    required: true
                }
            ],
            action: []
        };
    }
};
</script>

<style lang="less" >

</style>
