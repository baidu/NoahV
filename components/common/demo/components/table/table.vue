<template>
<div>
<h3>常规表格</h3>
<div style="overflow: hidden;">
<nv-table :columns="columns1" :data="data1"></nv-table>
<div style="float: right; margin-top: 10px;"><nv-page :total="data1.length" show-elevator /></div>
</div>

<h3>无数据表格</h3>
<nv-table :columns="columns1" :data="data" no-text="暂无数据"></nv-table><br />
<nv-table :columns="columns1" :data="data" :no-text="noText"></nv-table><br />
<h3>嵌套正文</h3>
<nv-table :columns="columns1" :data="data1"></nv-table><br />
<h3>嵌套表格</h3>
<nv-table :columns="columns1" :data="data1"></nv-table><br />
</div>
</template>
<script>
export default {
    data() {
        return {
            columns1: [
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
                    key: 'age',
                    filters: [
                        {
                            label: 'Greater than 25',
                            value: 1
                        },
                        {
                            label: 'Less than 25',
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterMethod(value, row) {
                        if (value === 1) {
                            return row.age > 25;
                        }
                        else if (value === 2) {
                            return row.age < 25;
                        }
                    }
                },
                {
                    title: 'Weight',
                    key: 'weight',
                    sortable: true
                },
                {
                    title: 'Address',
                    key: 'address',
                    filters: [
                        {
                            label: 'New York',
                            value: 'New York'
                        },
                        {
                            label: 'London',
                            value: 'London'
                        },
                        {
                            label: 'Sydney',
                            value: 'Sydney'
                        }
                    ],
                    filterMethod(value, row) {
                        return row.address.indexOf(value) > -1;
                    }
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return <a>删除</a>;
                    }
                }
            ],
            data: [],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    weight: 10,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'

                },
                {
                    name: 'Jim Green',
                    age: 24,
                    weight: 20,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    weight: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    weight: 40,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
            noText: '<a href="#">自定义文案，默认是暂无数据</a></a>'
        };
    }
};
</script>
<style scoped>
h3 {
    margin-bottom: 10px;
}
</style>
