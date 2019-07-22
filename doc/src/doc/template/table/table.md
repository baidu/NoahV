
## 概述

集数据处理、排序、筛选、自定义操作，前端分页、API分页、数据值填充、数据过滤、自定义展示、Icon展示等功能与一体的表格模板


## 基础示例

<template>
    
<Card>

<p slot="title">API获取数据综合示例</p>

<template>
    <div class="table-doc">
        <div class="example">
            <tableDemo />
        </div>
    </div>
</template>

<nv-code :content="tableDemoTpl">
</nv-code>

</Card>
</template>

<br>
<br>

<template>
    
<Card>

<p slot="title">tdata直接填充数据</p>

<template>
    <div class="table-doc">
        <div class="example">
            <normalTableExample />
        </div>
    </div>
</template>

<nv-code :content="normalDemoTpl">
</nv-code>

</Card>
</template>

<br>
<br>

<template>
    
<Card>

<p slot="title">loading使用示例</p>

<template>
    <div class="table-doc">
        <div class="example">
            <loadingTableExample />
        </div>
    </div>
</template>

<nv-code :content="loadingDemoTpl">
</nv-code>

</Card>
</template>

<br>
<br>


## API

### props

| 属性          | 说明                                                  | 类型          | 默认值      |
| ------------- | ---------------------------------------------------- | ------------ | ----------- |
| url           | 获取数据的API地址                                      | String       | -            |
| columns       | 表格的表头及各列展示配置，详见下方说明                     | Array        | -            |
| pagination    | 分页配置，详见下方说明                                   | Object       | 见下方说明   |
| title         | 表格标题                                               | String       | -            |
| tips          | 表格页脚提示                                            | String       | -            |
| method        | 请求数据的方法，支持get,post,put,delete...等方法          | String       | post         |
| rowSelect     | 表格第一列展示多选框，配合getSelectItem方法使用            | Boolean       | false        |
| tdata         | 表格数据，可以不配置url，直接给表格填充数据                 | String       | -            |
| showsizer     | 是否显示每页展示多少条的下拉框                             | Boolean      |  true        |
| showLoading   | 是否单独在表格区域展示加载中图标，而不是全页面展示            | Boolean      | true         |
| loading       | 显示加载中图标,  showLoading配置为true才有效,参看示例       | Boolean      | false
| params        | 表格请求数据的参数，如果配置了，会随其他参数一块儿传递给url    | Object       | -            |
| action        | 表格最后一列自定义配置                                    | Object       | -            |
| dataFilter    | 数据过滤器，在展示每页数据时会调用该方法                     | Function     | -            |
| page          | 表格分页信息                                             | Object       | -            |
| border        | 是否展示每个单元格的边框                                   | Boolean      | false         |
| stripe        | 是否各行间隔展示不同颜色                                   | Boolean      | true         |
| showelevator |    是否显示跳转到某一页功能    | Boolean      | false         |
| highlightRow  |    是否支持高亮选中的行，即单选    | Boolean      | false         |

<br>

### columns
| 属性         | 说明                                                         | 类型             | 默认值 |
| ------------ | ------------------------------------------------------------ | ---------------- | ------ |
| title        | 列头显示文字                                                 | String           | -      |
| key          | 对应列内容的字段名(需和API中字段进行对应，否则无法填充数据)  | Array            | String |
| width        | 列宽                                                         | Object           | Number |
| label        | 直接显示的内容，可以配合link使用                             | String           | -      |
| link         | 链接地址,可以使用当前行的数据替换,如: https://www.baidu.com?id={id}，会从当前行取id替换{id} | String           | -      |
| target       | 设置为_blank时在新窗口打开链接                               | String           | -      |
| color        | 显示颜色,如: #f00                                            | String           | -      |
| showError    | 飘红展示错误信息，需要数据配合提供["value", true/false]      | Boolean          | -      |
| render       | 自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引，也可以使用jsx语法，详见上述示例 | Function         | -      |
| sortable     | 对应列是否可以排序，如果设置为 custom，则代表用户希望远程排序，将重新请求数据，如果是Boolean值，则在前端进行字符排序(当前页) | String / Boolean | false  |
| filters      | 过滤数据的选项，格式为数组，数组中每项包含 label 和 value 属性，使用过滤，必须同时配置 filterMethod，参看上述示例 | Array            | -      |
| filterMethod | 数据过滤使用的方法，返回true就会展示，参看上述综合示例           | Function         | -      |

<br>

### pagination

如无需展示分页标签，请将pagination的值设置为false


| 属性            | 说明                     | 类型          | 默认值      |
| ----------------| ------------------------ | ------------- | ----------- |
| remote          | 是否远程分页，若使用远程分页，后端接口须符合[接口规范](#/quickstart/specification)，当设置为true时为远程分页，如果为false，将根据数据条数和每页展示条数进行前端分页展示处理        | Boolean        | false      |
| currentPage | 当前页码   | Number        | 1            | 
| defaultPageSize | 每页默认展示的数据条数   | Number        | 10           | 
| pageSizeOptions | 每页展示的数据条数可选集 | Array         | [10, 20, 30, 40] |

<br>

### action

action可以在表格的最后附加一列操作列，操作列需要展示的内容可以在list中配置

| 属性  | 说明                                   | 类型   | 默认值 |
| ----- | -------------------------------------- | ------ | ------ |
| title | 表头展示的字段                         | String | -      |
| list  | 列展示内容，可以是icon、button、文字等 | Array  | -      |

<br>

### action > list

操作列具体配置

| 属性      | 说明                                                         | 类型   | 默认值  |
| --------- | ------------------------------------------------------------ | ------ | ------- |
| type      | 展示类型、可选值为`sa-icon`、`Button`、`label`               | string | -       |
| icon      | 当type为sa-icon时有效，[icon列表](/#/doc/component/icon)     | string | -       |
| btnType   | 当type为Button时有效，可选值为 `primary`、`ghost`、`dashed`、`text`、`info`、`success`、`warning`、`error` | string | primary |
| size      | 当type为Button时有效，button的大小，可选值为： `large`、`small`、`default` | string | small   |
| label     | 当type为label时有效，设置直接展示的问题，如`编辑`、`修改`等  | string | -       |
| className | 当设置link时有效，可以进行自定义样式                         | -      | -       |
| style     | 可对当前展示的icon、button、link、label 等定义样式           | object | -       |
| link      | 给当前真是内容添加跳转链接，可以使用{key}获取当前行数据中的值 | string | -       |
| target    | 新窗口打开 当设置为 _target                                  | string | -       |
| event     | 可以设置clickHandler属性为一个function，当点击的时候，执行该方法，参数为当前行数据 | object | -       |
| confirm   | 弹出提示框，可以进行删除、确认等操作，详见下方confirm的API   | object | -       |

<br>

### action > list > confirm

confirm具体配置，可以基础示例

| 属性       | 说明                                                         | 类型     | 默认值   |
| ---------- | ------------------------------------------------------------ | -------- | -------- |
| title      | 表头展示的字段                                               | String   | 确认操作 |
| content    | 列展示内容，可以是icon、button、文字等                       | Array    | 操作提示 |
| okText     | 确认操作按钮文字                                             | String   | 确认     |
| cancelText | 取消操作按钮文字                                             | String   | 取消     |
| api        | 请求地址                                                     | String   |          |
| method     | 请求发送方式，可选值为`post`、`get`、`put`、`delete`、       | String   | post     |
| item       | 参数，可以使用当前行数据进行替换，如`item: {id: '{id}',name: '{name}'}` 将使用数据中的id和那么附加到请求参数中 | Object   | -        |
| successTip | 请求成功的提示                                               | String   | 操作成功 |
| params     | 额外的请求参数，不能使用数据填充功能                         | Object   | {}       |
| autoFresh  | 操作完成后是否需要刷新                                       | Boolean  | -        |
| callback   | 回调，在请求成功或者不配置请求api时都会调用，参数为当前行数据 | Function | -        |


<br>

### methods

| 方法名          | 说明                     | 参数      |返回值类型          | 
| ---------- | ------------------------ | ------------ | -----------  |
| reload        | 重新加载表格数据           |  无            |String       |
| getSelectItem    | 获取当前选中的行的数据 |  无           |Array        |

<br>

### events

| 方法          | 说明                     | 返回值         |
| ---------- | ------------------------ | ------------ |
| on-page-change        | 页面发生变化时触发           | 页码信息       |
| on-page-size-change    | 每页展示条数发生变化时触发 | 每页展示条数发生变化时触发        |
| on-column-sort | 当column的sortable设为custom后排序时触发| key和order等信息 |
| on-selection-change | 当选择项发生变化时触发 | 已选项 |
| on-data-change | 当前表格展示数据变化时触发(请在this.$nextTick中处理dom) | 变化后的展示数据 |



## API获取数据综合示例中接口数据格式
<nv-code :content="tableDataApi"  title="查看接口数据" closeTitle="收起接口数据" copyTitle="复制接口数据">
</nv-code>

<script>
import tableConfig from './tableConfig';
import normalTableExample from  '../../../example/table/normal.vue';
import tableDemo from  '../../../example/table/table-demo.vue';
import loadingTableExample from '../../../example/table/loadingTable.vue'
const tableDemoTpl = `
<template>
    <div class="table-demo">
        <NvTable
            :columns="columns" 
            :action="action"
            :pagination="pagination"
            url="/api/tpl/table"
            :rowSelect="true"
            :title="title"
            :tips="tips"
        \/>
    <\/div>
 <\/template>
 <script>
 export default {
    name: 'TableDemo',
    data () {
        return {
            title: '表格示例',
            tips: '说明: 本表格只包含最简单功能示例，详见说明文档： 模板 -> 表格模板',
            /** 
             * 表格配置项目
             *
             * @const
             * @type {array}
             *
             * @property {string}  title      表头文字
             * @property {string}  width      所占宽度，不设置会根据内容自动调整
             * @property {string}  key        配置项目字段名称，和API中保持一致
             * @property {string}  link       链接地址,如果希望动态将表格当前行的数据传递到url中，可以使用{key}，其中key为对应数据的key
             * @property {string}  target     如果希望链接在新页面打开，请配置target的值为_blank，不配置默认为当前页打开
             * @property {string}  color      配置文字的颜色
             *
             * @property {function(string | array):string}  render  渲染方法，在显示单元格的时候会调用该方法，需要return，注意，配置render之后链接和颜色的配置都会无效
             */
            columns: [
                {
                    title: 'ID',
                    key: 'id',
                    link: 'https://www.baidu.com?id={id}',
                    width: 60
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
                                    alert('您点击了模板名称')
                                }
                            },
                            style: {
                                cursor: 'pointer',
                                color: '#495060'
                            },
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
                            return <span style="color: red">{obj.row.detail}</span>
                        }
                        else {
                            return <span>{obj.row.detail}</span>
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
                    filterMethod (value, row) {
                        return row.cmd.indexOf(value) > -1;
                    }
                },
                {
                    title: '创建日期',
                    key: 'date',
                    width: 200,
                    sortable: true
                },
                {
                    title: '创建人',
                    key: 'person',
                    link: 'https://www.baidu.com/s?wd={person}',
                    target: '_blank'
                }
            ],

            pagination: {
                // 不适用远端分页
                remote: false,
                defaultPageSize: 10,
                pageSizeOptions: [10, 20, 30, 100]
            },
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
                        } ,
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
                            autoFresh: true,
                            callback(item){

                            }
                        }
                    }
                ]
            }

        }
    }
};
<\/script>
<style lang="less" >
    .table-demo {   
    }
<\/style>`;

const normalDemoTpl = `
<template>
    <div class="noraml-table">
        <NvTable
            :columns="columns" 
            :tdata="tdata"
            :pagination="false"
            :border="false"
        />
    </div>
</template>
<script>
export default {
    data () {
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
        }
    }
};
<\/script>
<style lang="less" >
    .noraml-table {
        
    }
<\/style>
`;
const loadingDemoTpl = `
<template>
    <div class="loading-table">
        <div class="btn" @click="show()">展示loading</div>
        <div class="btn" @click="hide()">隐藏loading</div>
        <NvTable
            :columns="columns" 
            :tdata="tdata"
            :pagination="false"
            :loading="loading"
        />
    </div>
</template>
<script>
export default {
    data () {
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
            ],
            loading: false
        }
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
<\/script>
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
<\/style>
`;
const tableDataApi = `
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
        },
        {
            id: '11',
            name: '通用上线模板',
            detail: '非云上产品请使用该模板',
            cmd: 'empty',
            date: '2018-06-17 00:00:11',
            person: '李小明'
        },
        {
            id: '12',
            name: '云上产品上线模板',
            detail: '云上产品请使用该模板',
            cmd: 'sh release.sh',
            date: '2018-06-17 00:00:12',
            person: '李小明'
        }
    ],
    success: true
}
`;

export default {
    components: {
        normalTableExample,
        tableDemo,
        loadingTableExample
    },
    data () {
        return {
            tableDemoTpl: tableDemoTpl,
            normalDemoTpl: normalDemoTpl,
            loadingDemoTpl: loadingDemoTpl,
            tableDataApi: tableDataApi
        };
    }
};

</script>

<style lang="less" >
    .table-doc {
        .example {
            margin: 20px 0;
        }
    }
</style>
