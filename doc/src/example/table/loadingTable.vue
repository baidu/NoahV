<template>
    <div class="loading-table">
        <div class="btn" @click="show()">展示loading</div>
        <div class="btn" @click="hide()">隐藏loading</div>
        <tableTpl
            :columns="columns"
            :tdata="tdata"
            :pagination="false"
            :loading="loading"
        />
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: '任务名称',
                    key: 'name'
                },
                {
                    title: '描述',
                    key: 'description'
                },
                {
                    title: '开始时间',
                    key: 'startTime'
                },
                {
                    title: '结束时间',
                    key: 'endTime'
                },
                {
                    title: '详情',
                    label: '查看详情',
                    link: 'https://www.baidu.com?id={taskId}'
                }
            ],
            tdata: [],
            loading: false
        };
    },
    methods: {
        show() {
            this.loading = true;
        },
        hide() {
            this.loading = false;
        }
    }
};
</script>
<style lang="less" >
    .loading-table {
        .btn {
            width: 80px;
            height: 30px;
            line-height: 28px;
            text-align: center;
            border-radius: 2px;
            background-color: #f7f7f7;
            border: 1px solid #dddee1;
            color: #555;
            font-size: 12px;
            cursor: pointer;
            -webkit-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
            margin-right: 20px;
            display: inline-block;
            margin-bottom: 10px;
        }
    }
</style>
