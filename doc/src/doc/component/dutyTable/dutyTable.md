
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
<br>
<div style="color: red;font-weight: bolder">*注意: currentDutyGroup 当前值班组 与 defaultStartTime 开始值班时间，两者不建议同时传入，会产生歧义</div>
<div style="color: red;">使用建议：<div>1.传入defaultStartTime，通过组件方法获取currentDutyGroup</div><div>2.只传入currentDutyGroup，defaultStartTime 默认为今天</div></div>

### nameList
| 属性       | 说明                                               | 类型             | 默认值      |
| ---------- | --------------------------------------------------| --------------  | ----------- |
| name       | 值班人员名称                                           | String          | -           |
| id       | 值班人员id                                           | String          | -           |



### events
| 名称        | 说明                                   | 参数             |
| ---------- | ---------------------------------------| --------------  |
| on-change  | 时间改变事件                             | 获得选择后的{year, month}    |
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
                    />
                </FormItem>
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
        ></NvDutyTable>
    </div>
<\/template>

<script>
export default {
    name: "nvDutyTableComplexDemo",
    components: {
        watchList
    },
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

