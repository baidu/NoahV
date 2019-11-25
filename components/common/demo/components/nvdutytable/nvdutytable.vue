<template>
    <div>
        <Form :label-width="80" label-position="left">
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
            <FormItem label="工作日：">
                <CheckboxGroup v-model="workingDay">
                    <Checkbox v-for="item in workingDayArr" :key="item.name" :label="item.name" :disabled="mustBeWorkingDay(item.name)">{{item.alias}}</Checkbox>
                </CheckboxGroup>
            </FormItem>    
            <FormItem label="值班人员未填写文本：">
                <Input v-model="emptyText" style="width: 200px" />
            </FormItem>
            <FormItem label="休息日文本">
                <Input v-model="restDayText" style="width: 200px" />
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
                     :empty-text="emptyText"
                     :rest-day-text="restDayText"
                     :hand-over-time="handOverTime"
                     :style="{fontSize: '12px'}"
                     :working-day="workingDay"
        ></NvDutyTable>
    </div>
</template>

<script>
export default {
    name: "nvDutyTableComplexDemo",
    data() {
        return {
            nameArr: ['东皇;公孙离', '李白;陈独秀;孙尚香', '伽罗;孙悟空', '后羿', '是谁'],
            nameLists: [],
            cycle: 1,
            emptyText: '我也不知道写啥',
            restDayText: '休息日',
            handOverTime: '00:00',
            workingDayArr: [
                {
                    name: 1,
                    alias: '星期一'
                },
                {
                    name: 2,
                    alias: '星期二'
                },
                {
                    name: 3,
                    alias: '星期三'
                },
                {
                    name: 4,
                    alias: '星期四'
                },
                {
                    name: 5,
                    alias: '星期五'
                },
                {
                    name: 6,
                    alias: '星期六'
                },
                {
                    name: 0,
                    alias: '星期日'
                }
            ],
            workingDay: [0, 1, 2, 3, 4, 5, 6]
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
        },
        mustBeWorkingDay(day) {
            return new Date().getDay() === day;
        }
    },
    watch: {
    }
};
</script>

<style lang="less">
    li {
        list-style: none;
    }
</style>