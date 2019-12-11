<template>
    <div class="hot-keys-wrapper">
        <ul>
            <li
                v-for="(item, i) in items"
                :key="i"
                :data-hash="item.hash"
                :class="getHotKeysCls(item)"
                @click="hotKeyClickHandler(item, $event)"
            >
                {{item.text}}
            </li>
        </ul>
    </div>
</template>

<script>
import u from 'underscore';

export default {
    name: 'NvDatePickerHotKeys',
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
        if (this.hotKeyCtrl.outer && this.options && this.options.shortcuts) {
            this.items = this.options.shortcuts;
            this.items.forEach((item, inx) => {
                item.hash = new Date().getTime() + inx + 1;
            });
        }
    },
    methods: {
        /**
         * 样式控制逻辑
         *
         * @param {Object} cell 日期单元
         * @return {Array} 该日期单元的样式集合
         */
        getHotKeysCls(cell) {
            return [
                'hot-key',
                {
                    'date-picker-selected': cell.selected
                }
            ];
        },
        /**
         * 外部hotKeys面板的点击处理逻辑
         *
         * @param {Object} item 用户自定义的配置项
         * @param {Object} event 点击事件对象
         */
        hotKeyClickHandler(item, event) {
            if (event) {
                let e = event || window.event;
                let element = e.target || e.srcElement;
                // 切换选中效果
                for (let i in this.items) {
                    if (this.items.hasOwnProperty(i)) {
                        if (element.getAttribute('data-hash') + '' === this.items[i].hash + '') {
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
                else if (u.isArray(value) && value.length === 2 && u.isDate(value[0]) && u.isDate(value[1])) {
                    if (['daterange', 'daterangetime'].indexOf(this.type) > -1) {
                        this.$emit('set-date-handler', value[0], value[1]);
                    }
                }
            }
            // 调用用户自定义的点击事件函数
            if (item.onClick && typeof item.onClick === 'function') {
                this.$nextTick(function() {
                    item.onClick(item);
                });
            }
            // 如果配置了快捷面板点击自动关闭
            if (this.autoClose && !this.confirm) {
                this.$emit('auto-close-picker');
            }
            // 暴露对外点击接口
            this.$emit('on-shortcut-click', item);
            this.$emit('on-date-change');
        }
    }
};
</script>

