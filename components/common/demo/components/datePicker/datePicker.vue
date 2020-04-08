<template>
    <div class="nv-datepicker-demo">
        <NvDatePicker
            ref="refPicker"
            :type="type"
            :width="350"
            :theme="theme"
            :options="options"
            :language="language"
            :autoClose="autoClose"
            :dateFormat="dateFormat"
            :setShownTxt="setShownStr"
            :disabledDateClickTip="disabledDateClickTip"
        >
        </NvDatePicker>
        <Button @click="setDate" type="primary">设置日期</Button>
        <Button @click="getDate" type="primary">获取日期</Button>
    </div>
</template>

<script>

import m from 'moment';


export default {
    name: 'datePickerDemo',
    data () {
        const self = this;
        let startDate = new Date(2018, 1, 23, 7, 8, 9);
        let endDate = new Date(2018, 3, 23, 10, 11, 12);
        return {
            type: 'daterangetime',
            language: 'cn',
            // 时间显示风格
            mode: 'console',
            // 面板皮肤风格
            theme: 'console',
            // 当开始时间小于结束时间时，是否自动修正
            autoFix: false,
            // 当没有配置confirm时，是否开启自动关闭
            autoClose: false,
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            disabledDateClickTip: '每月18日为记账日，系统关闭，不可选择',
            options: {
                position: 'top',
                yearRange: [],
                // 时间输入框的触发方式，可选项change/blur
                trigger: 'blur',
                shortcuts: [
                    {
                        text: '10天',
                        //defaultSelected: true,
                        value () {
                            let now = new Date();
                            let before = new Date(
                                            now.getFullYear(),
                                            now.getMonth(),
                                            now.getDate() - 10,
                                            now.getHours(),
                                            now.getMinutes(),
                                            now.getSeconds()
                                        );
                            return [before, now];
                        }
                    },
                    {
                        text: '最近2个月',
                        value () {
                            let startDate = new Date(2018, 1, 23, 7, 8, 9);
                            let endDate = new Date(2018, 3, 23, 10, 11, 12);
                            return [startDate, endDate];
                        },
                        onClick: function() {
                            // do callback
                            // console.log('click');
                        }
                    }
                ],
                /**
                 * 禁止选择日期判断策略
                 * @params {Date} date 要被判断的日期对象
                 * @params {Date/Object} dateValue 如果type为'date/datetime',为选中的日期对象；
                 *                       如果type为'daterange/daterangetime',为选中的时间段集合,结构如下：
                 *                      {"startSelecteDate": 开始时间, "endSelectedDate": 结束时间}，注意每个属性字段都可能为空
                 * @params {Array} targetDate 目标生效时间，如：点击快捷面板时，
                 *                      会将快捷面板配置的时间传递过来做判断，这个时间就是目标生效时间
                 */
                disabledHandler: function(date, dateValue, targetDate) {
                    // Demo1. 限制每月18号不可选择
                    if (date.getDate() === 18) {
                        return true;
                    }

                    // Demo2. 限制选择时间跨度不得超过70天
                    // 注意：使用该功能时，或者其他禁止日期动态变化的逻辑，请自行保证快捷面板的配置、默认时间等，与禁止策略保持一致性条件约束。
                    // 比如，这里限制了时间跨度不超过70天，快捷面板中配置的最大跨度也不要超过70天；如果有初始时间，也不要超过70天。
                    // 这里应该设置为69，因为只限制天的跨度，加上时间点最长刚好70天的跨度。如2019.10.07 00:00:01 ～ 2019.11.06 23:59:59
                    // 当然，你也可以按照秒等更小的粒度做控制，完全取决于你的业务需求。
                    // let selectedDate = ['date', 'datetime'].indexOf(self.type) > -1 ? dateValue : dateValue['startSelectedDate'];
                    // if (targetDate.length && targetDate.length === 2) {
                    //     return m(targetDate[1]).diff(m(targetDate[0]).add(69, 'days')) > 0;
                    // }
                    // else {
                    //     return selectedDate && m(date).diff(m(selectedDate).add(69, 'days')) > 0;
                    // }
                }
            }
        }
    },
    methods: {
        setDate: function() {
            
        },
        getDate: function() {

        },
        setShownStr: function (val) {
            return val;
        }
    }
};
</script>

<style lang="less" scoped>
    .nv-datepicker-demo {
        .ivu-btn-primary {
            width: 80px;
            height: 28px;
            line-height: 1.5;
            border-radius: 2px;
        }
    }
</style>