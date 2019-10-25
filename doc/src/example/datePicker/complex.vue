<template>
    <div>
        <NvDatePicker :language="language" :theme="theme" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" ref="complexPicker" v-model="value" @on-change="value=$event"></NvDatePicker>
    </div>
</template>

<script>
export default {
    name: 'nvDatePickerComplexDemo',
    data() {
        const self = this;
        return {
            value: ['2017/12/25 12:21:09', '2017/12/27 13:11:07'],
            language: 'cn',
            theme: 'common',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            options: {
                position: 'outer',
                yearRange: [],
                disabledDate: '',
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
                disabledDate: function (date) {
                    if (date.getDate() === 18) {
                        return true;
                    }
                }
            }
        };
    }
};
</script>

