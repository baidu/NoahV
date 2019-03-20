<template>
    <filterTableTpl :items="items" :columns="columns" url="/api/filtertable" :pagination="pagination"/>
</template>

<script>
export default {
    name: 'filterTableDemo',
    data () {
        return {
            items: [
                {
                    name: 'date1',
                    title: '时间',
                    type: 'time',
                    format: 'yyyy-MM-dd',
                    value:"2017-10-01",
                    required: true
                },
                {
                    name: 'date',
                    submitAlias: ['startTime', 'endTime'],
                    title: '时间区间',
                    type: 'timeRange',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    value: ['2017-10-08 12:22:23', '2017-10-20 12:22:59'],
                    required: true
                }
            ],
            columns: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '性别',
                    key: 'sex',
                    showError: true,
                    link: 'https://www.baidu.com',
                    color: '#0f0'
                },
                {
                    title: '籍贯',
                    key: 'hometown',
                    showError: true
                },
                {
                    title: '外语水平',
                    key: 'english',
                    sortable: true
                },
                {
                    title: '学历',
                    key: 'education',
                    link: 'https://www.baidu.com?id={hangzhou}',
                    target: '_blank',
                    color: 'blue'
                },
                {
                    title: '家庭住址',
                    key: 'address'
                },
                {
                    title: '工作类别',
                    key: 'job',
                    render: function (h, obj) {
                        return h('span', {
                            attrs: {
                                color: 'red'
                            }
                        }, obj.row.job);
                    }
                },
                {
                    title: '年收入',
                    key: 'earning'
                },
                {
                    title: '操作',
                    label: '查看详情',
                    link: 'https://www.baidu.com?id={hangzhou}'
                }
            ],
            pagination: {
                remote: true,
                defaultPageSize: 10,
                pageSizeOptions: [10, 20, 30, 100]
            },
        };
    }
};
</script>

<style lang="less" >
</style>
