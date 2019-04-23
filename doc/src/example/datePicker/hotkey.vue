<template>
    <div>
        <NvDatePicker :language="language" :theme="theme" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" ref="hotKeySaDatePickerRef"></NvDatePicker>
    </div>
</template>

<script>
export default {
    name: 'nvDatePickerHotKeyDemo',
    data() {
        const self = this;
        return {
            language: 'cn',
            theme: 'common',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            options: {
                // position=outer，可配置外部快捷面板
                position: 'inner',
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

