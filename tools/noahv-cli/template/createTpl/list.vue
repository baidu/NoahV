<template>
    <div class="${class}">
        <NvTable
            :columns="columns"
            :action="action"
            :pagination="pagination"
            url="/api/demo/table/get"
            :rowSelect="true"
            :title="title"
            :tips="tips"
        />
    </div>
</template>

<script>
export default {
    name: '${class}-list',
    data() {
        return {
            title: '表格模板',
            tips: '说明: 本表格只包含部分功能示例，详见说明文档： 模板 -> 表格模板',
            // table columns config
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
                    render: (h, obj) => {
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
            // page info
            pagination: {
                // 不使用远端分页
                remote: false,
                defaultPageSize: 10,
                pageSizeOptions: [10, 20, 30, 100]
            },
            // table action config, detail see documention:
            action: {
                title: '操作',
                list: [
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
                        confirm: {
                            title: '删除模板',
                            content: '数据删除后不可恢复，确认删除吗？',
                            okText: '删除',
                            cancelText: '我再想想',
                            api: '/api/demo/table/delete',
                            item: {
                                id: '{id}',
                                name: '{name}'
                            },
                            successTip: '删除成功',
                            params: {extra: 'extra params'},
                            autoFresh: true
                        }
                    }
                ]
            }

        };
    }
};
</script>

<style lang="less" >
    .${class} {

    }
</style>
