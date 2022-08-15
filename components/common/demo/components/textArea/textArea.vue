<template>
    <div>
        <NvTextArea
            ref="textarea"
            placeholder="请复制一段日志作为提取样例，便于验证日志提取规则是否正确，行数上限100，字符上限10000"
            :highLightRule="rule"
            v-model='content'
        />
        <Button type="primary" @click="changeHighLight">数据提取</Button>
        <Button type="primary"  @click="addData">数据添加</Button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rule: '',
            content: ''
        };
    },
    methods: {
        changeHighLight() {
            this.rule = '(?<NumA>num1):(?<NumAValue>[0-9]+).*(?<NumB>num2):(?<NumBValue>[0-9]+).*(?<NumC>num3):(?<NumCValue>[0-9]+).*(?<NumD>num4):(?<NumDValue>[0-9]+).*(?<NumE>num5):(?<NumEValue>[0-9]+).*(?<Num6>num6):(?<Num6Value>[0-9]+).*(?<Num7>num7):(?<Num7Value>[0-9]+).*(?<Num8>num8):(?<Num8Value>[0-9]+).*(?<BJ>bj):(?<beijing>[a-z]+.*[0-9]).*(?<Ip>ip):(?<logstreamIsp>[0-9]+.[0-9]+.[0-9]+.[0-9]+)';
            this.$refs.textarea && this.$refs.textarea.changeHighLight(this.rule);
        },
        addData() {
            this.content = '2021-09-14 19:56:34.402535  test.go] method: DELETE, status:fail, num1:17, num2:6, num3:5, num4:19, num5:49, num6:0, num7:5, num8:9,bj:beijing_hw2,ip:1.0.32.0\n2021-09-14 19:56:37.405409  test.go] method: GET, status:fail, num1:16, num2:18, num3:5, num4:31, num5:64, num6:6, num7:4, num8:5,bj:beijing_hw2,ip:1.12.1.0';
        }
    },
    watch: {
        content: function () {
            console.log(this.content);
        }
    }
};
</script>
