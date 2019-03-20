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
                disabledHandler: function(date) {
                    if (date.getDate() === 18) {
                        return true;
                    }
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