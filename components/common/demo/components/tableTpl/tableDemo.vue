<template>
    <nv-table-tpl
        :columns="columns"
        :tips="tips"
        :pagination="pagination"
        url="/api/table"
        rowSelect="true"
        title="表格示例"
        :action="action"
        :showelevator="showelevator"
    ></nv-table-tpl >
</template>

<script>
export default {
    name: 'TableDemo',
    data() {
        return {
            /**
             * 表格配置项目
             *
             * @const
             * @type {array}
             *
             * @property {string}  title      表头文字
             * @property {string}  width      所占宽度，不设置会根据内容自动调整
             * @property {string}  dataIndex  配置项目字段名称，和API中保持一致
             * @property {string}  link       链接地址,如果希望动态将表格当前行的数据传递到url中，可以使用{dataIndex}，其中dataIndex为对应数据的key
             * @property {string}  target     如果希望链接在新页面打开，请配置target的值为_blank，不配置默认为当前页打开
             * @property {string}  color      配置文字的颜色
             *
             * @property {function(string | array):string}  render  渲染方法，在显示单元格的时候会调用该方法，需要return，注意，配置render之后链接和颜色的配置都会无效
             */
            showelevator: true,
            columns: [
                {
                    title: '姓名',
                    key: 'name',
                    filters: [
                        {
                            label: '王xx',
                            value: '王'
                        },
                        {
                            label: '李xx',
                            value: '李'
                        }
                    ],
                    filterMethod(value, row) {
                        return row.name.indexOf(value) > -1;
                    }
                },
                {
                    title: '年龄',
                    key: 'age',
                    showError: true,
                    link: 'https://www.baidu.com',
                    color: '#0f0'
                },
                {
                    title: '性别',
                    key: 'sex',
                    render: function (h, obj) {
                        return h('span',
                            {
                                on: {
                                    click: () => {
                                        console.log(222);
                                    }
                                },
                                style: {
                                    cursor: 'pointer'
                                }
                            },
                            [
                                h('Icon', {
                                    props: {
                                        type: 'edit'
                                    }
                                })
                            ]);
                    }
                },
                {
                    title: '个人主页',
                    key: 'page',
                    sortable: 'custom',
                    render(h, obj) {
                        if (obj) {
                            return <a href="https://www.baidu.com">baidu</a>;
                        }
                        else {
                            return <a href="https://www.google.com">google</a>;
                        }
                    }
                },
                {
                    title: '学历',
                    key: 'education',
                    link: 'https://www.baidu.com?id={hangzhou}',
                    target: '_blank',
                    color: 'blue'
                },
                /*
                 * {
                 *     title: 'shanghai',
                 *     key: 'shanghai'
                 * },
                 */
                {
                    title: '操作',
                    label: '查看详情',
                    link: 'https://www.baidu.com?id={hangzhou}'
                }
            ],
            tips: '提示说明: 表格中为经过首轮考核的学员信息',

            pagination: {
                remote: false,
                defaultPageSize: 10,
                pageSizeOptions: [10, 20, 30, 100]
            },
            action: {
                title: '操作',
                list: [
                    {
                        type: 'sa-icon',
                        icon: 'edit',
                        className: 'delete-icon',
                        // label和icon只能展示一个
                        label: '编辑',
                        link: 'https://www.baidu.com?id={hangzhou}',
                        target: '_blank'
                    },
                    {
                        type: 'Button',
                        btnType: 'primary',
                        // label和icon只能展示一个
                        label: '查看',
                        link: 'https://www.baidu.com?id={hangzhou}'
                    },
                    {
                        type: 'nv-icon',
                        btnType: 'error',
                        className: 'delete-icon',
                        /*
                         * icon: 'edit',
                         * style: {} ,
                         * label和icon只能展示一个
                         * label: '删除',
                         */
                        confirm: {
                            title: '删除策略',
                            content: 'xx删除后不可恢复，确认删除吗？',
                            okText: '删除',
                            cancelText: '我再想想',
                            api: '/api/table',
                            item: {
                                id: '{hnb}',
                                name: '{name}'
                            },
                            successTip: '删除成功',
                            params: {xx: 'xx'},
                            // 暂未实现
                            autoFresh: true,
                            callback(item) {

                            }
                        }
                    }
                ]
            }

        };
    }
};
</script>

<style lang="less" >

</style>
