<template>
    <div>
        <NvDatePicker :theme="theme" :language="language" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" ref="hotKeySaDatePickerRef"></NvDatePicker>
    </div>
</template>

<script>
export default {
    name: 'nvDatePickerConsoleDemo',
    data() {
        const self = this;
        return {
            // 默认值，可以不需要设置
            theme: 'console',
            language: 'cn',
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
                    },
                    {
                        text: '2个月',
                        value() {
                            return [
                                new Date(2018, 1, 23),
                                new Date(2018, 3, 23)
                            ];
                        },
                        onClick: function () {
                            self.$Message.info('you click the hotkey');
                        }
                    }
                ]
            }
        };
    }
};
</script>

