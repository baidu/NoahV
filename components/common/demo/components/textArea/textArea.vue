<template>
    <div>
        <NvTextArea
            placeholder="请复制一段日志作为提取样例，便于验证日志提取规则是否正确，行数上限100，字符上限10000"
            :highLight="arr"
            :value='value'
        />
        <Button type="primary" @click="changeHighLight">数据提取</Button>
        <Button type="primary"  @click="addData">数据添加</Button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            arr: [],
            value: ''
        };
    },
    methods: {
        changeHighLight() {
            this.arr = ['num3:115, num4:3'];
        },
        addData() {
            this.value = '2021-09-27 13:38:31.353255 test.go] dimension_one:c, dimension_two:a ,dimension_three:a ,dimension_four:b ,dimension_five:c ,dimension_A:c ,dimension_B:a ,dimension_C:b ,dimension_D:a ,dimension_F:c ,method: PUT, status:, num1:34, num2:77, num3:115, num4:3, num5:46, num6:4, num7:2,num8:3,bj:beijing_hw0,ip:1.9.0.0';
        }
    }
};
</script>
