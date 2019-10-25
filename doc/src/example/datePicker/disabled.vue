<template>
    <div>
        <NvDatePicker :language="language" :theme="theme" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" ref="disabledPicker"></NvDatePicker>
    </div>
</template>

<script>
export default {
    name: 'nvDatePickerDisabledDemo',
    data() {
        const self = this;
        return {
            language: 'cn',
            theme: 'common',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            options: {
                position: 'top',
                shortcuts: [
                    {
                        text: '7天',
                        value() {
                            return [
                                new Date(2018, 1, 23),
                                new Date(2018, 1, 30)
                            ];
                        }
                    },
                    {
                        text: '15天',
                        value() {
                            return [
                                new Date(2018, 1, 15),
                                new Date(2018, 1, 30)
                            ];
                        }
                    },
                    {
                        text: '30天',
                        value() {
                            return [
                                new Date(2018, 1, 15),
                                new Date(2018, 2, 15)
                            ];
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
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
</style>
