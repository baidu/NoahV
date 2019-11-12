<template>
    <div class="nv-datepicker-demo">
        <NvDatePicker
            ref="refPicker"
            :type="type"
            :width="350"
            :theme="theme"
            :options="options"
            :language="language"
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
            theme: 'console',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            disabledDateClickTip: '每月18日为记账日，系统关闭，不可选择',
            options: {
                position: 'top',
                yearRange: [],
                autoClose: false,
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
                 */
                disabledHandler: function(date, dateValue) {
                    // Demo1. 限制每月18号不可选择
                    if (date.getDate() === 18) {
                        return true;
                    }

                    // Demo2. 限制选择时间跨度不得超过70天
                    // 注意：使用该功能时，或者其他禁止日期动态变化的逻辑，请自行保证快捷面板的配置、默认时间等，与禁止策略保持一致性条件约束。
                    // 比如，这里限制了时间跨度不超过70天，快捷面板中配置的最大跨度也不要超过70天；如果有初始时间，也不要超过70天。
                    // let selectedDate = ['date', 'datetime'].indexOf(self.type) > -1 ? dateValue : dateValue['startSelectedDate'];
                    // if (selectedDate && m(date).diff(m(selectedDate).add(70, 'days')) > 0) {
                    //     return true;
                    // }
                    // else {
                    //     return false;
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