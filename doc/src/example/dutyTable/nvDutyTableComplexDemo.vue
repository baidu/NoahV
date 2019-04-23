<template>
    <div>
        <Form :label-width="80">
            <FormItem label="值班人员：">
                <FormItem v-for="(list, index) in nameArr"
                          :label="index + 1 + '组：'"
                          :key="index"
                >
                    <Input style="width: 200px"
                           v-model="nameArr[index]"
                           @on-blur="formatNameArr"
                    /></FormItem>
            </FormItem>
            <FormItem label="值班周期：">
                <Select v-model="cycle" style="width: 200px">
                    <Option :value="1">日</Option>
                    <Option :value="7">周</Option>
                    <Option :value="30">月</Option>
                </Select>
            </FormItem>
            <FormItem label="空文本：">
                <Input v-model="emptyText" style="width: 200px" />
            </FormItem>
            <FormItem label="换班时间：">
                <TimePicker :value="handOverTime"
                            @on-change="changeTime"
                            format="HH:mm"
                            placeholder="选择换班时间"
                            style="width: 200px"
                ></TimePicker>

            </FormItem>
        </Form>
        <NvDutyTable :name-list="nameLists"
                     :cycle="cycle"
                     :emptyText="emptyText"
                     :hand-over-time="handOverTime"
                     :style="{fontSize: '12px'}"
        ></NvDutyTable>
    </div>
</template>

<script>
export default {
    name: "nvDutyTableComplexDemo",
    data() {
        return {
            nameArr: ['东皇;公孙离', '李白;陈独秀;孙尚香', '伽罗;孙悟空', '后羿', ''],
            nameLists: [],
            cycle: 1,
            emptyText: '我也不知道写啥',
            handOverTime: '00:00'
        };
    },
    mounted() {
        this.formatNameArr();
    },
    methods: {
        formatNameArr() {
            this.nameLists = this.nameArr.map(list => list ? list.split(';').map(item => ({name: item, id: item})) : []);
        },
        changeTime(time) {
            this.handOverTime = time;
        }
    },
    watch: {
    }
};
</script>
