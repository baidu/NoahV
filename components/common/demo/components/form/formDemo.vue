<template>
    <div class="form-demo">
        <div class="page-title"><span>新建操作模板</span></div>
        <NvForm
            :items="items" 
            :action="action"
            position="left"
            :labelwidth="80"
            url="/api/form"
            :data="formData"
        />
    </div>
</template>

<script>
let defaultCode = '';
export default {
    name: 'formDemo',
    created () {
    },
    data () {
        return {
            items: [
                {
                    name: 'username',
                    title: '模板名称',
                    type: 'input',
                    placeholder: '输入姓名',
                    width: '400px',
                    required: true
                },
                {
                    name: 'detail',
                    title: '模板说明',
                    type: 'input',
                    placeholder: '输入姓名',
                    width: '400px'
                },
                {
                    name: 'address',
                    title: '条件选择',
                    type: 'search',
                    cascader: false,
                    clearable: false,
                    placeholder: '条件选择',
                    required: true,
                    data: [
                        {
                            label: '产品线',
                            value: 'products'
                        },
                        {
                            label: '应用名',
                            value: 'taskName'
                        }
                    ],
                    data1: [{
                        value: 'beijing',
                        label: '北京',
                        children: [
                            {
                                value: 'gugong',
                                label: '故宫'
                            },
                            {
                                value: 'tiantan',
                                label: '天坛'
                            },
                            {
                                value: 'wangfujing',
                                label: '王府井'
                            }
                        ]
                    }, 
                    {
                        value: 'jiangsu',
                        label: '江苏',
                        children: [
                            {
                                value: 'nanjing',
                                label: '南京',
                                children: [
                                    {
                                        value: 'fuzimiao',
                                        label: '夫子庙',
                                    }
                                ]
                            },
                            {
                                value: 'suzhou',
                                label: '苏州',
                                children: [
                                    {
                                        value: 'zhuozhengyuan',
                                        label: '拙政园',
                                    },
                                    {
                                        value: 'shizilin',
                                        label: '狮子林',
                                    }
                                ]
                            }
                        ],
                    }]
                },
                {
                    name: 'department',
                    title: '',
                    type: 'input',
                    types: 'textarea',
                    rows: 10,
                    labelwidth: 0,
                    placeholder: '输入命令行',
                    required: true,
                    value:"sadadadadssd",
                    width: "100%"
                },
                {
                    name: 'sexy',
                    title: '性别',
                    type: 'radiogroup',
                    required: true,
                    types: 'button',
                    width: 300,
                    option: [
                        {
                            name: '男',
                            value: 'male'
                        },
                        {
                            name: '女',
                            value: 'female'
                        }
                    ]
                },
                {
                    name: 'time',
                    title: '时间',
                    type: 'NVTIMERANGE',
                    nvType: 'daterangetime',
                    dateFormat: 'YYYY-MM-DD HH:mm:ss',
                    required: true,
                    options: {
                        position: 'inner',
                        yearRange: [],
                        shortcuts: [
                            {
                                text: '最近2个月',
                                value () {
                                    return [
                                        new Date(2018, 1, 23, 0, 0, 0),
                                        new Date(2018, 3, 22, 0, 0, 0)
                                    ];
                                    // return new Date(2018, 0, 23, 1, 2, 3);
                                }
                            },
                            {
                                text: '7天',
                                value () {
                                    return [
                                        new Date(2018, 0, 23, 1, 2, 3),
                                        new Date(2018, 0, 29, 4, 5, 6)
                                    ];
                                    // return new Date(2018, 0, 23, 1, 2, 3);
                                }
                            },
                            {
                                text: '15天',
                                value () {
                                    return [
                                        new Date(2018, 0, 15),
                                        new Date(2018, 0, 29)
                                    ];
                                    //return new Date(2018, 5, 15);
                                }
                            },
                            {
                                text: '30天',
                                value () {
                                    return [
                                        new Date(2018, 1, 15),
                                        new Date(2018, 2, 14)
                                    ];
                                }
                            }
                        ],
                        disabledHandler: function(date) {
                            if (date.getDate() === 18) {
                                return true;
                            }
                        }
                    }

                },
                {
                    name: 'sexy1',
                    title: '性别',
                    type: 'select',
                    required: true,
                    value: 'male',
                    width: 300,
                    option: [
                        {
                            name: '男',
                            value: 'male'
                        },
                        {
                            name: '女',
                            value: 'female'
                        },
                        {
                            name: '第三性别',
                            value: 'no'
                        }
                    ],
                    event: {
                        onChange: function(value) {
                            console.log(value);
                        }
                    }
                }
            ],
            action: [
                {
                    name: 'reset',
                    type: 'ghost',
                    title: '取消',
                    link: '#/'
                },
                {
                    name: 'submit',
                    type: 'primary',
                    title: '保存',
                    submitUrl: '/api/form',
                    args: {},
                    // linkTo: '',
                    callback(fieldsValue, responseData) {
                        // @param {object} fieldsValue  表单数据
                        // @param {object} responseData 请求响应结果，如果有配置submitUrl的话
                        // do something
                        alert('保存成功');
                    }
                }
            ],
            formData: {
                username: 'test',
                detail: 'this is a test!',
                department: 'iop',
                sexy: 'male',
                time: ['2017-12-25 12:21:09', '2017-12-29 12:21:09']
            }
        };
    },
    methods: {
        getContent: function () {
            console.log(this.items);
        }
    },
    mounted() {
        // setTimeout(() => {
            this.items.push({
                    name: 'sexy2',
                    title: '性别2',
                    type: 'select',
                    required: true,
                    width: 300,
                    option: [
                        {
                            name: '男',
                            value: 'male'
                        },
                        {
                            name: '女',
                            value: 'female'
                        },
                        {
                            name: '第三性别',
                            value: 'no'
                        }
                        
                    ],
                    event: {
                        onChange: function(value) {
                            console.log(value);
                        }
                    }
                });
            // this.items[this.items.length - 1].value = 'male'
        // }, 0)
        
    }
};
</script>

<style lang="less" >

</style>
