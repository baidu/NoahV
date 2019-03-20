<template>
    <div class="theme-demo">
        <h2>列表</h2>
        <h3>基础样式/表内操作</h3>
        <Table :columns="columns1" :data="data1"></Table>
        <h4>外边框设置</h4>
        <div class="outer-border"><Table :columns="columns1" :data="data1"></Table></div>
        注意:<br/>
        外边框需同时设置4个属性控制<br/>
            @noahv-table-outer-border,<br/>
            @noahv-table-outer-border-after,<br/>
            @noahv-table-outer-border-before,<br/>
            @noahv-table-outer-border-bg<br/>
        header 纵向边框设置@noahv-table-inner-border-right
        <h3>单选/多选按钮</h3>
        <h4>单选</h4>
        组件库/项目自定义
        <h4>多选</h4>
        <Table ref="selection" :columns="columns3" :data="data1"></Table>
        <h3>横向滚动</h3>
        <Table width="550" height="200" :columns="columns2" :data="data4"></Table>
    </div>
</template>
<script>
export default {
    data() {
        const self = this;
        return {
            columns1: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (h) => {
                        return h('div',
                            [
                                h('a', {
                                    on: {
                                        click: () => {
                                            self.$Message.info('edit');
                                        }
                                    },
                                    style: {
                                        cursor: 'pointer'
                                    }
                                },
                                [<span>编辑</span>]),
                                h('a', {
                                    on: {
                                        click: () => {
                                            self.$Message.info('delete');
                                        }
                                    },
                                    style: {
                                        cursor: 'pointer'
                                    }
                                },
                                [<span>删除</span>])
                            ]
                        );
                    }
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
            columns2: [
                {
                    title: 'Name',
                    key: 'name',
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: 'Age',
                    key: 'age',
                    width: 100
                },
                {
                    title: 'Province',
                    key: 'province',
                    width: 100
                },
                {
                    title: 'City',
                    key: 'city',
                    width: 100
                },
                {
                    title: 'Address',
                    key: 'address',
                    width: 200
                },
                {
                    title: 'Postcode',
                    key: 'zip',
                    width: 100
                },
                {
                    title: 'Action',
                    key: 'action',
                    fixed: 'right',
                    width: 120,
                    render: (h) => {
                        return h('div',
                            [
                                h('a', {
                                    on: {
                                        click: () => {
                                            self.$Message.info('edit');
                                        }
                                    },
                                    style: {
                                        cursor: 'pointer'
                                    }
                                },
                                [<span>编辑</span>]),
                                h('a', {
                                    on: {
                                        click: () => {
                                            self.$Message.info('delete');
                                        }
                                    },
                                    style: {
                                        cursor: 'pointer'
                                    }
                                },
                                [<span>删除</span>])
                            ]
                        );
                    }
                }
            ],
            columns3: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            data4: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    province: 'America',
                    city: 'New York',
                    zip: 100000
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'Washington, D.C. No. 1 Lake Park',
                    province: 'America',
                    city: 'Washington, D.C.',
                    zip: 100000
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    province: 'Australian',
                    city: 'Sydney',
                    zip: 100000
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    province: 'Canada',
                    city: 'Ottawa',
                    zip: 100000
                },
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    province: 'America',
                    city: 'New York',
                    zip: 100000
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'Washington, D.C. No. 1 Lake Park',
                    province: 'America',
                    city: 'Washington, D.C.',
                    zip: 100000
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    province: 'Australian',
                    city: 'Sydney',
                    zip: 100000
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    province: 'Canada',
                    city: 'Ottawa',
                    zip: 100000
                }
            ]
        };
    }
};
</script>

<style lang="less">
@noahv-table-outer-border1: none;
@noahv-table-outer-border-after1: 0px;
.theme-demo {
    h3, h4 {
        margin: 10px 0;
    }
    .outer-border {
        .ivu-table-wrapper {
            border: @noahv-table-outer-border1;
        }
        .ivu-table:after {
            width: @noahv-table-outer-border-after1;
        }
    }

}
</style>
