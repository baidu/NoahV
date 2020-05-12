<template>
    <div>
        <NvCascaderSelect :value="value" :data="list" :splitCharacter="splitCharacter" trigger="click" :disabled="disabled" @on-change="changeHandler"></NvCascaderSelect>
    </div>
</template>

<script>
export default {
    name: 'CascaderSelectDemo',
    data () {
        const self = this;
        return {
            value: [],
            disabled: true,
            splitCharacter: ',',
            list: [
                {
                    label: '美食',
                    value: 'meishi',
                    selected: true
                },
                {
                    label: '酒水',
                    value: 'jiushui'
                },
                {
                    label: '水果',
                    value: 'shuiguo',
                    children: [
                        {
                            label: '苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果苹果',
                            value: 'pingguo'
                        },
                        {
                            label: '香蕉',
                            value: 'xiangjiao'
                        },
                        {
                            label: '橘子',
                            value: 'juzi'
                        }
                    ]
                    
                },
                {
                    label: '干果',
                    value: 'ganguo',
                    children: [
                        {
                            label: '核桃',
                            value: 'hetao'
                        },
                        {
                            label: '花生',
                            value: 'huasheng'
                        },
                        {
                            label: '瓜子',
                            value: 'guazi'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        changeHandler(data) {
            console.log(data);
        }
    }
};
</script>

<style lang="less" >

</style>
