<template>
    <div class="theme-demo">
        <Button type="primary" @click="modal1 = true">Display dialog box</Button>
        <Modal
            v-model="modal1"
            title="Common Modal dialog box title"
            width="400"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal></br></br>
        <Button @click="instance('info')">Info</Button>
        <Button @click="instance('success')">Success</Button>
        <Button @click="instance('warning')">Warning</Button>
        <Button @click="instance('error')">Error</Button>
        <Button @click="instance('confirm')">confirm</Button></br></br>
        注：表单样式在项目/组件库中自定义.
    </div>
</template>
<script>
export default {
    data() {
        return {
            modal1: false
        };
    },
    methods: {
        ok() {
            this.$Message.info('Clicked ok');
        },
        cancel() {
            this.$Message.info('Clicked cancel');
        },
        instance(type) {
            const title = '操作类型';
            const content = '<p>Content of dialog</p>';
            switch (type) {
                case 'info':
                    this.$Modal.info({
                        title: title,
                        content: content,
                        width: 400
                    });
                    break;
                case 'success':
                    this.$Modal.success({
                        title: title,
                        content: content,
                        width: 400
                    });
                    break;
                case 'warning':
                    this.$Modal.warning({
                        title: title,
                        content: content,
                        width: 400
                    });
                    break;
                case 'error':
                    this.$Modal.error({
                        title: title,
                        content: content,
                        width: 400
                    });
                    break;
                case 'confirm':
                    this.$Modal.confirm({
                        title: title,
                        content: content,
                        width: 400,
                        onOk: () => {
                            this.$Message.info('Clicked ok');
                        },
                        onCancel: () => {
                            this.$Message.info('Clicked cancel');
                        }
                    });
                    break;
            }
        }
    }
};
</script>

<style lang="less">
.theme-demo {
    h3 {
        margin: 10px 0;
    }
}
</style>
