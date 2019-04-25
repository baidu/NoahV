<template>
    <div>
        <NvDatePicker :theme="theme" :language="language" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" @on-change="changeHandler($event)" ref="reverseRef">
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
                        id: '1440',
                        text: '1天',
                        key: 1440,
                        value() {
                            return [
                                m().subtract(1, 'days').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        id: '10080',
                        text: '7天',
                        key: 10080,
                        value() {
                            return [
                                m().subtract(7, 'days').toDate(),
                                m().toDate()
                            ];
                        }
                    }
                ]
            }
        };
    },
    methods: {
        // 实现反向高亮功能。
        // 当选择的时间和快捷面板中的某一项对应时，快捷面板这项高亮起来
        changeHandler: function (event) {
            const self = this;
            if (event && event.length && event[0] && event[1]) {
                let diff = m(event[1]).diff(m(event[0]), 'minutes');
                let shortCuts = self.options.shortcuts;
                for (let i in shortCuts) {
                    if (shortCuts.hasOwnProperty(i)) {
                        if (shortCuts[i].key === diff) {
                            self.$refs['reverseRef'].highLightShortCut(shortCuts[i].id);
                        }
                    }
                }
            }
        }
    }
};
</script>

<style lang="less">
</style>
