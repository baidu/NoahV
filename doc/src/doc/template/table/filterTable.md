[[TOC]]

## 概述

在表格模板的基础上附加条件筛选功能，主要是结合表格和表单模板，从而实现条件筛选列表页面

## 使用示例

:::demo 筛选表格示例
```html
<template>
    <div class="filter-table-demo">
        <nvFilterTable
            :items="items"
            :columns="columns"
            :action="action"
            url="/api/tpl/filterTable"
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
                    width: '200px',
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
                    type: 'nvTimeRange',
                    nvType: 'daterangetime',
                    validateType: 'array',
                    dateFormat: 'YYYY-MM-DD HH:mm:ss',
                    value: ['2018-06-13 00:00:03', '2018-06-18 00:00:15'],
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
                    width: 160,
                    render: function (h, obj) {
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
                                h('sa-icon', {
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
                    width: 200,
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
                    width: 120,
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
                    width: 160,
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
                    // {
                    //     type: 'Button',
                    //     btnType: 'primary',
                    //     // label和icon只能展示一个
                    //     label: '查看',
                    //     link: 'https://www.baidu.com?id={id}'
                    // },
                    {
                        type: 'sa-icon',
                        icon: 'edit',
                        className: 'delete-icon',
                        // label和icon只能展示一个
                        label: '编辑',
                        link: 'https://www.baidu.com?id={id}',
                        target: '_blank'
                    },
                    {
                        type: 'sa-icon',
                        btnType: 'error',
                        className: 'delete-icon',
                        icon: 'trash-alias',
                        style: {
                            color: '#2d8cf0'
                        },
                        // label和icon只能展示一个
                        // label: '删除',
                        confirm: {
                            title: '删除模板',
                            content: '数据删除后不可恢复，确认删除吗？',
                            okText: '删除',
                            cancelText: '我再想想',
                            api: '/api/tpl/tabledelete',
                            item: {
                                id: '{id}',
                                name: '{name}'
                            },
                            successTip: '删除成功',
                            params: {extra: 'extra params'},
                            // 暂未实现
                            autoFresh: true,
                            callback(item){

                            }
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
    .noahv-date-picker-console-wrapper {
        line-height: 30px;
    }
}


</style>

```
:::


## API

### props

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| url        | 获取数据的API地址                        | String            | -           |
| method | 请求发送的方式 | String | post |
| params | 请求需要携带的参数信息 | Object | - |
| items      | 表单的配置项，详见表单模板说明         | Array             | -           |
| layout     | 表单项是否行内水平布局显示，详见表单模板说明  | String            | inline      |
| lalelWidth | 表单项标签的宽度，若items中无单独指定，继承整个组件的labelWidth值，详见表单模板说明 | Number        | 80    |
| columns    | 表格的列配置，详见表格模板说明       | Array             | -           |
| action | 表格支持添加自定义渲染组件，详见表格模板说明 | Object | - |
| tips       | 表格底部的提示信息，详见表格模板说明 | String            | -           |
| title      | 表格名称，详见表格模板说明         | String            | -           |
| pagination | 表格分页设置,筛选表格只支持后端分页或者不分页，不支持前端分页    | [Object， Boolean] | - |
| rowSelect  | 表格支持选中行功能，详见表格模板说明 | Boolean         | -           |
| border | 表格列边框，详见表格模板说明 | Boolean | false |
| showLoading | 是否展示表格自有loading | Boolean | true |
| stripe | 是否以斑马线方式展示表格行 | Boolean | false |
| dataFilter    | 数据过滤器，在展示每页数据时会调用该方法  | Function     | -            |
| showsizer     | 是否显示每页展示多少条的下拉框    | Boolean      |  true        |
| autoLoadData  | 是否页面载入时就发起数据查询    | Boolean      |  true        |
| showelevator  | 是否显示跳转到某一页功能    | Boolean      |  false        |

### methods

| 属性       | 说明                                     | 参数         |返回值类型|
| ---------- | -----------------------------------------| ------------ | -------|
| reload     | 刷新表格                                 | 无           |-|
| getSelectItem | 获取已经选中的列，详见示例            | 无           |Array|

### events

| 方法          | 说明                     | 参数          |
| ---------- | ------------------------ | ------------ |
| on-page-change        | 页面发生变化时触发           | 页码信息       |
| on-page-size-change    | 每页展示条数发生变化时触发 | 每页展示条数发生变化时触发        |
| on-column-sort | 当column的sortable设为custom后排序时触发| key和order等信息 |
| on-selection-change | 当选择项发生变化时触发 | 已选项 |
| on-data-change | 当前表格展示数据变化时触发(请在this.$nextTick中处理dom) | 变化后的展示数据 |



## 筛选示例中接口返回数据
:::demo 接口示例
```json
{
    data: [
        {
            id: '01',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:01',
            person: '李小明'
        },
        {
            id: '02',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:02',
            person: '李小明'
        },
        {
            id: '03',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:03',
            person: '李小明'
        },
        {
            id: '04',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:04',
            person: '李小明'
        },
        {
            id: '05',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:05',
            person: '李小明'
        },
        {
            id: '06',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:06',
            person: '李小明'
        },
        {
            id: '07',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:07',
            person: '李小明'
        },
        {
            id: '08',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:08',
            person: '李小明'
        },
        {
            id: '09',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:09',
            person: '李小明'
        },
        {
            id: '10',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:10',
            person: '李小明'
        }
    ],
    success: true,
    page: {
        totalCount: 12,
        pageSize: 10,
        pageNo: 2
    }
}
```
:::
