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
                disabledHandler: function (date) {
                    if (date.getDate() === 18) {
                        return true;
                    }
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
