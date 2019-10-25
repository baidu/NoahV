<template>
    <div>
        <NvSearch
            v-model="value"
            :data="options"
            :cascader="true"
            :clearable="true"
            :placeholder="placeholder"
            @on-change="changeHandler"
        >
        </NvSearch>
    </div>
</template>

<script>
export default {
    name: 'nvSearchComplexDemo',
    data() {
        return {
            cascader: true,
            clearable: true,
            placeholder: '请输入地点名称搜索',
            value: {
                searchName: ['beijing', 'gugong'],
                searchValue: '门票'
            },
            options: [
                {
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
                    ]
                }
            ]
        };
    },
    methods: {
        changeHandler(val) {
            // console.log(val);
        }
    }
};
</script>

<style lang="less">
</style>
