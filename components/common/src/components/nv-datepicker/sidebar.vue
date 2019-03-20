<template>
    <div class="sidebar-wrapper" v-if="hotKeyCtrl.inner">
        <span
            v-for="(item, i) in items"
            :key="i"
            :data-hash="item.hash"
            :class="getSidebarCls(item)"
            @click="sidebarClickHandler(item, $event)"
        >
            {{item.text}}
        </span>
    </div>
</template>

<script>
import u from 'underscore';

export default {
    name: 'NvDatePickerSidebar',
    data() {
        return {
            // 快捷面板配置数据集合
            items: []
        };
    },
    props: {
        confirm: Boolean,
        // 外部快捷面板的自定义配置对象
        options: Object,
        dateValue: Object,
        type: {
            type: String,
            default: 'datetime'
        },
        hotKeyCtrl: Object,
        autoClose: Boolean
    },
    created() {
        if (this.hotKeyCtrl.inner && this.options && this.options.shortcuts) {
            this.items = this.options.shortcuts;
            let defaultSelected = false;
            for (let i in this.items) {
                if (this.items.hasOwnProperty(i)) {
                    this.$set(this.items[i], 'selected', false);
                    this.items[i].hash = (new Date()).getTime() + i;
                    if (!defaultSelected && this.items[i].defaultSelected) {
                        this.items[i].selected = true;
                        defaultSelected = true;
                    }
                }
            }
        }
    },
    methods: {
        /**
         * 样式控制逻辑
         *
         * @param {Object} cell 日期单元
         * @return {Array} 该日期单元的样式集合
         */
        getSidebarCls(cell) {
            return [
                'sidebar-hotkey',
                {
                    'date-picker-selected': cell.selected
                }
            ];
        },
        /**
         * 内部sidebar面板的点击处理逻辑
         *
         * @param {Object} item 用户自定义的配置项
         * @param {Object} event 点击事件对象
         */
        sidebarClickHandler(item, event) {
            if (event) {
                let e = event || window.event;
                let element = e.target || e.srcElement;
                // 切换选中效果
                for (let i in this.items) {
                    if (this.items.hasOwnProperty(i)) {
                        if (element.getAttribute('data-hash') === this.items[i].hash) {
                            this.$set(this.items[i], 'selected', true);
                        }
                        else {
                            this.$set(this.items[i], 'selected', false);
                        }
                    }
                }
            }
            // 配置用户自定义的value
            if (item.value && typeof item.value === 'function') {
                let value = item.value();
                if (u.isDate(value)) {
                    if (['date', 'datetime'].indexOf(this.type) > -1) {
                        this.$emit('set-date-handler', value, '');
                    }
                }
                if (u.isArray(value) && value.length === 2 && u.isDate(value[0]) && u.isDate(value[1])) {
                    if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                        this.$emit('set-date-handler', value[0], value[1]);
                    }
                }
            }
            // 调用用户自定义的点击事件函数
            if (item.onClick && typeof item.onClick === 'function') {
                item.onClick(item);
            }
            // 如果配置了快捷面板点击自动关闭
            if (this.autoClose && !this.confirm) {
                this.$emit('auto-close-picker');
            }
            // 暴露对外点击接口
            this.$emit('on-shortcut-click', item);
            this.$emit('on-date-change');
        },
        /**
         * 重置内部sidebar快捷面板
         *
         */
        resetSidebar() {
            for (let i in this.items) {
                if (this.items.hasOwnProperty(i)) {
                    this.$set(this.items[i], 'selected', false);
                }
            }
        }
    }
};
</script>

