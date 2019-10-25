/**
 * 表格文档配置
 *
 */

export default {
    props: [
        {
            prop: 'url',
            description: '获取数据的API地址',
            type: 'String',
            default: '-'
        },
        {
            prop: 'columns',
            description: '表格的列配置',
            type: 'Array',
            default: '-'
        },
        {
            prop: 'pagination',
            description: '分页配置，如无需分页，请设置为false',
            type: 'Object | Boolean',
            default: 'true'
        },
        {
            prop: 'title',
            description: '表格标题',
            type: 'String',
            default: '-'
        },
        {
            prop: 'tips',
            description: '表格页脚提示',
            type: 'String',
            default: '-'
        },
        {
            prop: 'method',
            description: '请求数据的方法，主要用一下集中方法：get,post,put,delete...',
            type: 'String',
            default: 'post'
        },
        {
            prop: 'rowSelect',
            description: '表格第一列展示多选框',
            type: 'Boolean',
            default: 'false'
        },
        {
            prop: 'tdata',
            description: '表格数据，可以不配置url，直接给表格塞数据',
            type: 'Array',
            default: '-'
        },
        {
            prop: 'showsizer',
            description: '是否显示每页展示多少条的下拉框',
            type: 'Boolean',
            default: 'true'
        },
        {
            prop: 'params',
            description: '表格请求数据的参数，如果配置了，会随其他参数一块儿传递给url',
            type: 'Object',
            default: '-'
        },
        {
            prop: 'action',
            description: '表格最后一列自定义配置',
            type: 'Object',
            default: '-'
        },
        {
            prop: 'dataFilter',
            description: '数据过滤器，在展示每页数据时会调用改方法',
            type: 'Function',
            default: '-'
        },
        {
            prop: 'page',
            description: '表格分页信息',
            type: 'Object',
            default: '-'
        }
    ],
    methods: [
        {
            name: 'reload',
            description: '重新加载表格数据',
            params: '无'
        },
        {
            name: 'getSelectItem',
            description: '获取当前选中的行的数据',
            params: 'params(Array)，当前选中的行'
        }
    ],
    events: [
        {
            name: 'on-page-change',
            description: '页面发生变化时触发',
            params: '页码信息'
        },
        {
            name: 'on-page-size-change',
            description: '每页展示条数发生变化时触发',
            params: '页码信息'
        },
        {
            name: 'on-column-sort',
            description: '当column的sortable设为custom后排序时触发',
            params: 'key和order等信息'
        }
    ],
    columns: [
        {
            name: 'title',
            description: '列头显示文字',
            type: 'String',
            default: '-'
        },
        {
            name: 'key',
            description: '对应列内容的字段名',
            type: 'String',
            default: '-'
        },
        {
            name: 'width',
            description: '列宽',
            type: 'Number',
            default: '-'
        },
        {
            name: 'label',
            description: '显示的内容',
            type: 'String',
            default: '-'
        },
        {
            name: 'link',
            description: '链接地址,可以使用当前行的数据替换,如: https://www.baidu.com?id={id}，会从当前行取id替换{id}',
            type: 'String',
            default: '-'
        },
        {
            name: 'color',
            description: '显示颜色,如: #f00',
            type: 'String',
            default: '-'
        },
        {
            name: 'showError',
            description: '飘红展示错误信息，需要数据配合提供["value", true/false]',
            type: 'Boolean',
            default: '-'
        },
        {
            name: 'render',
            description: '自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引。也可以使用jsx语法',
            type: 'Function',
            default: '-'
        },
        {
            name: 'sortable',
            description: '对应列是否可以排序，如果设置为 custom，则代表用户希望远程排序',
            type: 'String | Boolean',
            default: 'false'
        },
        {
            name: 'filters',
            description: '过滤数据的选项，格式为数组，数组中每项包含 label 和 value 属性，使用过滤，必须同时配置 filterMethod',
            type: 'Array',
            default: '-'
        },
        {
            name: 'filterMethod',
            description: '数据过滤使用的方法，返回true就会展示',
            type: 'Function',
            default: '-'
        }
    ]
};
