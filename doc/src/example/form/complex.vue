<template>
    <div >
        <formTpl
        :items="items"
        :action="action"
        position="left"
        :labelwidth="60"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: '输入用户名',
                    width: '400px',
                    required: true
                },
                {
                    name: 'age',
                    title: '年龄',
                    type: 'inputNumber',
                    validateType: 'number',
                    max: 150,
                    min: 1,
                    step: 1,
                    required: true
                },
                {
                    name: 'location',
                    title: '籍贯',
                    type: 'Select',
                    placeholder: '请选择',
                    width: '400px',
                    option: [
                        {
                            name: '北京',
                            value: '1',
                            title: '北京是中国的首都'
                        },
                        {
                            name: '乌镇',
                            value: '2',
                            title: '乌镇是一个美丽的南方小镇'
                        },
                        {
                            name: '成都',
                            value: '3',
                            title: '成都的美食享誉天下'
                        }
                    ],
                    required: true
                },
                {
                    name: 'married',
                    title: '婚否',
                    label: '已婚',
                    type: 'checkBox',
                    required: true
                },
                {
                    name: 'sex',
                    title: '性别',
                    type: 'radioGroup',
                    option: [
                        {
                            name: '男',
                            value: '1'
                        },
                        {
                            name: '女',
                            value: '2'
                        }
                    ],
                    required: true
                },
                {
                    // options未设置的情况下，快捷面板的默认显示示例
                    name: 'birthDay',
                    title: '生日',
                    type: 'time',
                    format: 'yyyy-MM-dd',
                    required: true
                },
                {
                    // 自定义快捷面板
                    name: 'entry',
                    title: '入职时间',
                    type: 'time',
                    options: {
                        shortcuts: [
                            {
                                text: '今天',
                                value: function () {
                                    return new Date();
                                },
                                onClick: function () {
                                    //do something
                                }
                            },
                            {
                                text: '昨天',
                                value: function () {
                                    let today = new Date();
                                    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
                                }
                            },
                            {
                                text: '2017.1.1',
                                value: function () {
                                    return new Date(2017, 0, 1);
                                }
                            }
                        ],
                        disabledDate: function (date) {
                            // 示例：设置每个周五不可选
                            return date && date.getDay() === 5;
                        }
                    }
                },
                {
                    name: 'hobby',
                    title: '爱好',
                    type: 'checkBoxGroup',
                    option: [
                        {
                            name: '篮球'
                        },
                        {
                            name: '音乐'
                        },
                        {
                            name: '跑步'
                        },
                        {
                            name: '电影'
                        }
                    ]
                },
                {
                    // options未设置的情况下，快捷面板的默认显示示例
                    name: 'springHoliday',
                    title: '春季假期',
                    type: 'timeRange',
                    format: 'yyyy-MM-dd HH:mm:ss'
                },
                {
                    name: 'fallHoliday',
                    title: '秋季假期',
                    type: 'timeRange',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    options: {
                        shortcuts: [
                            {
                                text: '7天',
                                value: function () {
                                    let now = new Date();
                                    let afterAWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
                                    return [now, afterAWeek];
                                }
                            },
                            {
                                text: '两周',
                                value: function () {
                                    let now = new Date();
                                    let afterAWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);
                                    return [now, afterAWeek];
                                }
                            }
                        ]
                    }
                },
                {
                    name: '条件查询',
                    title: '查询',
                    type: 'search',
                    cascader: false,
                    clearable: false,
                    placeholder: '请输入关键字进行查询',
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
                    ]
                },
                {
                    name: 'address',
                    type: 'cascader',
                    title: '家庭住址',
                    data: [
                        {
                            value: 'beijing',
                            label: '北京',
                            children: [
                                {
                                    value: 'haidian',
                                    label: '海淀区'
                                },
                                {
                                    value: 'chaoyang',
                                    label: '朝阳区'
                                },
                                {
                                    value: 'xicheng',
                                    label: '西城区'
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
                                            value: 'xuanwu',
                                            label: '玄武区'
                                        },
                                        {
                                            value: 'qinhuai',
                                            label: '秦淮区'
                                        }
                                    ]
                                },
                                {
                                    value: 'suzhou',
                                    label: '苏州',
                                    children: [
                                        {
                                            value: 'wuzhong',
                                            label: '吴中区'
                                        },
                                        {
                                            value: 'huqiu',
                                            label: '虎丘区'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'note',
                    title: '',
                    type: 'input',
                    types: 'textarea',
                    rows: 4,
                    placeholder: '备注信息',
                    width: '100%'
                }
            ],
            action: [
                {
                    name: 'reset',
                    type: 'default',
                    title: '取消',
                    link: '#/doc/template/basic-table'
                },
                {
                    name: 'submit',
                    type: 'primary',
                    title: '保存',
                    submitUrl: '/api/tpl/form/submit',
                    args: {}
                    // callback(fieldsValue, responseData) {
                    // @param {object} fieldsValue  表单数据
                    // @param {object} responseData 请求响应结果，如果有配置submitUrl的话
                    // do something
                    // }
                }
            ]
        };
    }
};
</script>

<style lang="less" >
</style>
