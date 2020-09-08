<template>
    <div class="dashboard-list">
        <Card :bordered="false" class="table-card">
            <div class="btn" @click="addDashboard">新建仪表盘
            </div>
            <filterTableTpl
                :items="items"
                :columns="columns"
                :url="tableUrl"
                method="get"
                :params="tableParams"
                :pagination="pagination"
                :action="action"
                :dataMap="dataMap"
                ref="dashboardList"
            />
        </Card>
        <!-- 新增仪表盘弹窗 -->
        <Modal
            title="添加仪表盘"
            v-model="newDashboard"
            :width="400"
        >
            <Form ref="newDashboard" :model="dashboardInfo" :rules="rule">
                <FormItem prop="name" label="仪表盘名称">
                    <Input
                        type="text"
                        v-model="dashboardInfo.name"
                        placeholder="以字母开头，字母下划线数字组成"
                    >
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer" style="margin-top: -20px;">
                <Button type="ghost" @click="addCancel">取消</Button>
                <Button type="primary" @click="addAction" style="margin-right: 0">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import apiConfig from './api/config';
import util from './util/util';
export default {
    name: 'dashboardList',
    data() {
        return {
            newDashboard: false,
            tableUrl: util.getApi(apiConfig.dashboardList),
            dashboardInfo: {
                name: ''
            },
            rule: {
                name: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            items: [
                {
                    name: 'title',
                    title: '仪表盘名称',
                    type: 'input'
                }
            ],
            columns: [
                {
                    title: '仪表盘名称',
                    link: '#/dashboard/view?id={id}',
                    key: 'title'
                },
                {
                    title: '最后更新人',
                    key: 'updator'
                },
                {
                    title: '更新时间',
                    key: 'lastupdate'
                }
            ],
            action: {
                title: '操作',
                list: [
                    {
                        type: 'sa-icon',
                        icon: 'pencil',
                        className: 'edit',
                        style: {
                            color: '#55abf9'
                        },
                        // label和icon只能展示一个
                        link: '#/dashboard/edit?id={id}'
                        // target: '_blank'
                    },
                    {
                        type: 'sa-icon',
                        icon: 'copy',
                        className: 'edit',
                        style: {
                            color: '#55abf9',
                            margin: '0 5px'
                        },
                        event: {
                            clickHandler: data => {
                                this.copyDashboard(data.id);
                            }
                        }
                    },
                    {
                        type: 'sa-icon',
                        icon: 'trash-alias',
                        className: 'edit',
                        style: {
                            color: '#55abf9',
                            marginLeft: '10px'
                        },
                        confirm: {
                            title: '删除仪表盘',
                            content: '仪表盘删除后不可恢复，确认删除吗？',
                            okText: '删除',
                            cancelText: '我再想想',
                            api: util.getApi(apiConfig.dashboardDelete),
                            item: {
                                id: '{id}'
                            },
                            successTip: '删除成功',
                            autoFresh: true,
                            callback: () => {
                                this.$refs.dashboardList.reload();
                            }
                        }
                    }
                ]
            },
            pagination: {
                remote: true,
                defaultPageSize: 10,
                pageSizeOptions: [10, 20, 50, 100]
            },
            dataMap: {
                data: '@data.content',
                pageNo: '@data.pageNumber',
                totalCount: '@data.totalElements',
                pageSize: '@data.pageSize'
            },
            tableParams: {
            }
        };
    },
    methods: {
        addDashboard() {
            this.newDashboard = true;
        },
        addAction() {
            this.$refs.newDashboard.validate(valid => {
                if (valid) {
                    this.submitAdd();
                }
            });
        },
        addCancel() {
            this.$refs.newDashboard.resetFields();
            this.newDashboard = false;
        },
        submitAdd() {
            this.$request({
                url: util.getApi(apiConfig.dashboardCreate),
                method: 'post',
                data: {
                    title: this.dashboardInfo.name
                }
            }).then(res => {
                if (res.data.success) {
                    this.$router.push({
                        path: '/dashboard/edit',
                        query: {
                            id: res.data.data.id
                        }
                    });
                }
                else {
                    this.$Message.error(res.data.message);
                }
            });
        },
        copyDashboard(id) {
            this.$request({
                url: util.getApi(apiConfig.dashboardCopy),
                method: 'post',
                data: {
                    id: id
                }
            }).then(res => {
                if (res.data.success) {
                    this.$Message.success('复制成功！');
                    this.$refs.dashboardList.reload();
                }
                else {
                    this.$Message.error(res.data.message);
                }
            });
        }
    },
    computed: {
    }
};
</script>

<style lang="less">
.dashboard-list {
    position: relative;
    margin: -20px;
    background: #f5f7f9;
    .table-card:hover {
        box-shadow: none;
    }
    .filter-table-tpl {
        .ivu-form-item {
            margin-bottom: 24px;
        }
    }
    .btn {
        position: absolute;
        right: 20px;
        top: 20px;
        background: #2389ff;
        border-radius: 3px;
        cursor: pointer;
        color: #fff;
        padding: 5px 10px;
        font-size: 12px;
    }
    .ivu-table-row {
        a {
            color: #55abf9;
        }
    }
    a {
        display: block;
    }
    .crumb-nav {
        position: relative;
        top: -12px;
        width: 100%;
        z-index: 10;
        padding: 0 24px;
        margin: 0 -24px;
        box-sizing: content-box;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        .ivu-card-body {
            float: right;
            span {
                display: inline-block;
                font-size: 12px;
            }
            .type-list {
                display: inline-block;
                width: 150px;
            }
        }

    }
    .clearfix:after {
        content: " ";
        display: block;
        clear: both;
        height: 0;
    }
    .clearfix {
        zoom: 1;
    }
}
</style>
