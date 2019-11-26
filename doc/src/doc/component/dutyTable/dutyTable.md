
## 概述

值班表日历组件，支持配置多值班人员，多周期配置
<br>
<br>

## 基础示例

构建一个基础使用示例
<br>
<br>

<template>
    <Card>
        <p class="card-title">基础用法示例</p>
        <br>
        <template>
            <div class="steps-doc">
                <div class="example">
                    <nvDutyTableNormalDemo />
                </div>
            </div>
        </template>
        <br>
        <br>
        <nv-code :content="nvDutyTableNormalDemoCode" />
    </Card>
</template>
<br>
<br>
<template>
    <Card>
        <p class="card-title">完整用法示例</p>
        <br>
        <template>
            <div class="steps-doc">
                <div class="example">
                    <nvDutyTableComplexDemo />
                </div>
            </div>
        </template>
        <br>
        <br>
        <nv-code :content="nvDutyTableComplexDemoCode" />
    </Card>
</template>

## API

### props

| 属性          | 说明                                     | 类型              | 默认值      |
| ----------   | ----------------------------------------| ----------------  | ----------- |
| defaultSelectedYear  | 默认选择年份                       | [Number, String]  | today.getFullYear() 当前时间年         |
| defaultSelectedMonth  | 默认选择月份                      | [Number, String]  | today.getMonth() 当前时间月        |
| defaultMaxDate  | 最大时间限制                            | [Date, String]    | new Date(today + 50, 11, 31) 当前时间+50年         |
| defaultMinDate  | 最小时间限制                            | [Date, String]    | new Date(today - 5, 0, 1) 当前时间-5年         |
| defaultStartTime     | 开始时间                          | String             | new Date().forMate(YYYY-MM-DD 00:00:00)           |
| styleConfig  | 样式配置                                  | Object            | {}           |
| nameList     | 值班名单                                  | Array             | []           |
| currentDutyGroup     | 当前值班组                                  | Array             | []           |
| cycle        | 值班周期                                  | Number            | 1           |
| handOverTime | 换班时间                                  | String            | 00:00      |
| emptyText    | 值班人员为空展示文字                         | String            | 待添加      |
| colors       | 值班组颜色                                 |  Array            | ['#108CEE', '#8A58BC', '#545FC8', '#F38800', '#EA2E2E', '#5FB333', '#FBBE04', '#04C1BA']      |
| colorBlockMinWidth | 值班组色块最小宽度                     | [String、Number]  | 0          |
| splitShow    | 值班色块是否需要分割展示（一般用于长周期）        | Boolean           | false      |
| workingDay    | 工作日        | Array           | [0, 1, 2, 3, 4, 5, 6] 分别对应周日、周一……周六      |
| restDayText    | 非工作日文案展示        | String           | 休息日      |
<br>
<div style="font-weight: bold;">可能出现的问题: </div>
<div>1.<b style="font-weight: bold">currentDutyGroup</b> 当前值班组 与 <b style="font-weight: bold">defaultStartTime</b> 开始值班时间，<span style="color: red">两者不建议同时传入，会产生歧义</span></div>
<div>2.<b style="font-weight: bold">workingDay</b> 工作日可能与 <b style="font-weight: bold">defaultStartTime</b> 开始值班时间冲突。例如 11 月25日星期一开始值班，但星期一是非工作日 </div>
<div>3. <b style="font-weight: bold">cycle</b> 值班周期，不包含非工作日。例如：<b style="font-weight: bold">cycle</b> 为 7 天，周一开始值班，周末非工作日不值班。则持续到下周二换班。</div>
<br />
<div style="font-weight: bold">使用建议：</div>
<div>1.传入<b style="font-weight: bold">defaultStartTime</b>，通过组件方法获取 <b style="font-weight: bold">currentDutyGroup</b>
；只传入<b style="font-weight: bold">currentDutyGroup</b>，<b style="font-weight: bold">defaultStartTime</b> 默认为今天</div>
<div>2.<span style="color: red">避免内部逻辑冲突，开始时间与非工作日不要有交集。</span>组件内部现有的检验逻辑，如果出现交集，会自动修正，并触发 <b style="font-weight: bold">ACWorkingDay</b> 事件（auto-correct-working-day）。例如：11月25 日星期一开始值班，但星期一是非工作日，组件内部会自动添加星期一为工作日。建议参考该示例，在业务代码中去做限制</div>
<div>3. 设置 <b style="font-weight: bold">cycle</b> 为 5天，周末为非工作日。</div>

### nameList
| 属性       | 说明                                               | 类型             | 默认值      |
| ---------- | --------------------------------------------------| --------------  | ----------- |
| name       | 值班人员名称                                           | String          | -           |
| id       | 值班人员id                                           | String          | -           |



### events
| 名称        | 说明                                   | 参数             |
| ---------- | ---------------------------------------| --------------  |
| on-change  | 时间改变事件                             | 获得选择后的{year, month}    |
| ACWorkingDay  | 触发自动修正工作日事件（可用于添加友好交互）                             | 无    |
| getCurrentDutyGroup  | 组件内方法                             | 调用获得当前值班组[{name, id}]    |

<script>
import nvDutyTableNormalDemo from '../../../example/dutyTable/nvDutyTableNormalDemo.vue';
import nvDutyTableComplexDemo from '../../../example/dutyTable/nvDutyTableComplexDemo.vue'

const nvDutyTableNormalDemoCode =
`<template>
    <NvDutyTable :name-list="nameList" />
<\/template>

<script>
export default {
    name: 'nvDutyTableNormalDemo',
    data() {
        return {
            nameList: [
                [{name: '东皇', id: 'donghuang'}, {name: '公孙离', id: 'gongsunli'}],
                [{name: '李白', id: 'libai'}, {name: '陈独秀', id: 'chenduxiu'}, {name: '孙尚香', id: 'sunshangxiang'}],
                [{name: '伽罗', id: 'jialuo'}, {name: '孙悟空', id: 'sunwukong'}],
                []
            ]
        };
    }
};
<\/script>`;

const nvDutyTableComplexDemoCode = `<template>
    <div class="nv-duty-demo">
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
            <FormItem label="休息日文本：">
                <Input v-model="restDayText" style="width: 200px"></Input>
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
<\/template>

<script>
export default {
    name: "nvDutyTableComplexDemo",
    data() {
        return {
            nameArr: ['东皇;公孙离', '李白;陈独秀;孙尚香', '', '伽罗;孙悟空', '后羿'],
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
<\/script>`;

export default {
    name: 'nvDutyDemo',
    components: {
        nvDutyTableNormalDemo,
        nvDutyTableComplexDemo
    },
    data() {
        return {
            nvDutyTableNormalDemoCode,
            nvDutyTableComplexDemoCode
        }
    }
}
</script>

