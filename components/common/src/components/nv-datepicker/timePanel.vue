<template>
    <div :class="getClassName()" v-if="['datetime', 'daterangetime'].indexOf(type) > -1 || confirm">
        <component 
            v-bind:is="componentName"
            :type="type"
            :confirm="confirm"
            :dateValue="dateValue"
            :dateOptions="dateOptions"
            :timePickerCtrl="timePickerCtrl"
            @on-reset="reset"
            @on-confirm="confirmClick"
            @on-date-change="dateChange"
        >
        </component>
    </div>
</template>

<script>
import getClassName from '../utils.js';
import commonTimePanel from './commonTimePanel';
import consoleTimePanel from './consoleTimePanel';

export default {
    name: 'NvDatePickerTimePanel',
    components: {
        'commonTimePanel': commonTimePanel,
        'consoleTimePanel': consoleTimePanel
    },
    data() {
        return {
            // component name
            componentName: 'consoleTimePanel'
        };
    },
    props: {
        theme: String,
        confirm: Boolean,
        dateValue: Object,
        // 日期时间候选项
        dateOptions: Object,
        timePickerCtrl: Object,
        type: {
            type: String,
            default: 'datetime'
        }
    },
    created() {
        this.componentName = this.theme === 'console' ? 'consoleTimePanel' : 'commonTimePanel';
    },
    methods: {
        /**
         * 获取类名
         *
         * @param {String} postfix 后缀名称
         * @return {Object} 样式集合
         */
        getClassName(postfix) {
            return [
                'date-picker-footer',
                {
                    'single-panel': ['date', 'datetime'].indexOf(this.type) > -1,
                    'double-panel': ['daterange', 'daterangetime'].indexOf(this.type) > -1
                }
            ];
        },
        /**
         * 清空按钮处理逻辑
         *
         */
        reset() {
            this.$emit('on-reset');
            this.$emit('on-clear');
        },
        /**
         * 确认按钮处理逻辑
         *
         */
        confirmClick() {
            this.$emit('on-confirm');
            this.$emit('on-close');
        },
        /**
         * 触发chang事件
         *
         */
        dateChange() {
            this.$emit('on-date-change');
        }
    }
};
</script>

