<template>
    <div class="filter-table-demo">
        <NvFilterTable
            :items="items"
            :columns="columns"
            :action="action"
            url="/api/demo/table/filter/get"
            method="get"
            :pagination="pagination"
        />
    </div>
</template>

<script>
export default {
    name: 'filterTableDemo',
    data() {
        return {
            items: [
                {
                    name: 'name',
                    title: '模板名称',
                    type: 'select',
                    option: [
                        {
                            name: '全部',
                            value: 'all'
                        },
                        {
                            name: '通用上线模板',
                            value: '通用上线模板'
                        },
                        {
                            name: '云上产品上线模板',
                            value: '云上产品上线模板'
                        }
                    ],
                    value: 'all',
                    required: true
                },
                {
                    name: 'date',
                    submitAlias: ['startTime', 'endTime'],
                    title: '创建日期',
                    theme: 'console',
                    option: 'top',
                    type: 'nvTimeRange',
                    nvType: 'daterangetime',
                    validateType: 'array',
                    dateFormat: 'YYYY-MM-DD HH:mm:ss',
                    value: ['2018-06-17 00:00:00', '2018-06-17 00:00:15'],
                    required: true
                }
            ],
            columns: [
                {
                    title: 'ID',
                    key: 'id',
                    link: 'https://www.baidu.com?id={id}',
                    width: 100
                },
                {
                    title: '模板名称',
                    key: 'name',
                    render(h, obj) {
                        return h('span',
                            {
                                on: {
                                    click: () => {
                                        alert('您点击了模板名称');
                                    }
                                },
                                style: {
                                    cursor: 'pointer',
                                    color: '#495060'
                                }
                            },
                            [
                                h('nv-icon', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    props: {
                                        type: 'cube'
                                    }
                                }),
                                obj.row.name
                            ]);
                    }
                },
                {
                    title: '模板说明',
                    key: 'detail',
                    render(h, obj) {
                        if (obj.row.detail === '云上产品请使用该模板') {
                            return <span style="color: red">{obj.row.detail}</span>;
                        }
                        else {
                            return <span>{obj.row.detail}</span>;
                        }
                    }
                },
                {
                    title: '模板命令',
                    key: 'cmd',
                    color: '#00f',
                    filters: [
                        {
                            label: 'empty',
                            value: 'empty'
                        },
                        {
                            label: 'release',
                            value: 'release'
                        }
                    ],
                    filterMethod(value, row) {
                        return row.cmd.indexOf(value) > -1;
                    }
                },
                {
                    title: '创建日期',
                    key: 'date',
                    sortable: true
                },
                {
                    title: '创建人',
                    key: 'person',
                    link: 'https://www.baidu.com/s?wd={person}',
                    target: '_blank'
                }
            ],
            action: {
                title: '操作',
                list: [
                    /*
                     * {
                     *     type: 'Button',
                     *     btnType: 'primary',
                     *     // label和icon只能展示一个
                     *     label: '查看',
                     *     link: 'https://www.baidu.com?id={id}'
                     * },
                     */
                    {
                        type: 'nv-icon',
                        icon: 'edit',
                        className: 'delete-icon',
                        // label和icon只能展示一个
                        label: '编辑',
                        link: 'https://www.baidu.com?id={id}',
                        target: '_blank'
                    },
                    {
                        type: 'nv-icon',
                        btnType: 'error',
                        className: 'delete-icon',
                        icon: 'trash-alias',
                        style: {
                            color: '#2d8cf0'
                        },
                        /*
                         * label和icon只能展示一个
                         * label: '删除',
                         */
                        confirm: {
                            title: '删除模板',
                            content: '数据删除后不可恢复，确认删除吗？',
                            okText: '删除',
                            cancelText: '我再想想',
                            api: '/api/demo/table/filter/delete',
                            item: {
                                id: '{id}',
                                name: '{name}'
                            },
                            successTip: '删除成功',
                            params: {extra: 'extra params'},
                            // 暂未实现
                            autoFresh: true
                        }
                    }
                ]
            },
            pagination: {
                remote: true,
                defaultPageSize: 10,
                pageSizeOptions: [10, 20, 30, 100]
            }
        };
    }
};
</script>

<style lang="less" >
.filter-table-demo {
    .noahv-date-picker-wrapper {
        margin-top: 5px;
    }
}


</style>
