<template>
    <div class="search-wrapper">
        <NvSearch
            v-model="value"
            :data="options"
            :cascader="false"
            :clearable="true"
            @on-enter="enter"
            @on-change="changeHandler"
        >
        </NvSearch>
    </div>
</template>

<script>
    export default {
        name: 'stepsDemo',
        data() {
            return {
                value: {
                    searchName: 'products',
                    searchValue: '产品线1'
                },
                options: [
                    {
                        label: '产品线',
                        value: 'products'
                    },
                    {
                        label: '应用名',
                        value: 'taskName'
                    }
                ],
                options1: [{
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
            }
        },
        methods: {
            changeHandler(val) {
                // console.log(val);
            },
            enter(e) {
                // onsole.log(e);
            }
        }
    };
</script>
