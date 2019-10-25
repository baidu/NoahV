<template>
    <div class="noraml-table">
        <tableTpl
            :columns="columns"
            :tdata="tdata"
            :pagination="false"
            :border="false"
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
            tdata: [
                {
                    name: '任务1',
                    description: 'xx机房调度',
                    startTime: '2017-10-22 10:00:00',
                    endTime: '2017-10-22 20:00:00',
                    taskId: '1'
                },
                {
                    name: '任务2',
                    description: 'xx机房调度',
                    startTime: '2017-10-22 10:00:00',
                    endTime: '2017-10-22 20:00:00',
                    taskId: '2'
                },
                {
                    name: '任务3',
                    description: 'xx机房调度',
                    startTime: '2017-10-22 10:00:00',
                    endTime: '2017-10-22 20:00:00',
                    taskId: '3'
                }
            ]
        };
    }
};
</script>
<style lang="less" >
    .noraml-table {

    }
</style>
