<template>
    <div>
        <NvDatePicker :theme="theme" :language="language" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" :setShownTxt="setShownText">
        </NvDatePicker>
    </div>
</template>

<script>
import m from 'moment';

export default {
    name: 'nvDatePickerShownTextDemo',
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
                        // 1天转换成1440分钟
                        key: 1440,
                        text: '1天',
                        value() {
                            return [
                                new Date(2018, 7, 23),
                                new Date(2018, 7, 24)
                            ];
                        }
                    },
                    {
                        key: 2880,
                        text: '2天',
                        value() {
                            return [
                                new Date(2018, 7, 23),
                                new Date(2018, 7, 25)
                            ];
                        }
                    },
                    {
                        key: 4320,
                        text: '3天',
                        value() {
                            return [
                                new Date(2018, 7, 23),
                                new Date(2018, 7, 26)
                            ];
                        }
                    }
                ]
            }
        };
    },
    methods: {
        /**
         * 干预显示字符串
         *
         * @param {String} val 选中的时间字符串
         * @return {String} 干预后的字符串
         */
        setShownText: function (val) {
            // 示列，拼接快捷项的文本在时间字符串之前
            const self = this;
            let text = '';
            let match = false;
            let time = val.split(' - ');
            let diff = m(time[1]).diff(m(time[0]), 'minutes');
            let shortCuts = self.options.shortcuts;
            for (let i in shortCuts) {
                if (shortCuts.hasOwnProperty(i)) {
                    if (shortCuts[i].key === diff) {
                        match = true;
                        text = shortCuts[i].text + ' ';
                        break;
                    }
                }
            }
            if (!match) {
                text = '';
            }
            return text + val;
        }
    }
};
</script>

<style lang="less">
</style>
