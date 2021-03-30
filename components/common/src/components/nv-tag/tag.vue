<template>
    <div :style="getWrapperStyle()" :class="getCls('tag-wrapper')">
        <div :style="getPanelStyle()" :class="getCls('tag-panel')">
            <span v-for="(item, key) in items" :class="getCls('tag-tag')" :title="item.label" :style="getTagStyle()">
                <span :style="getTagTextStyle()" :class="getCls('tag-tag-text')">{{item.label}}</span>
                <span v-if="closeable" :class="getCls('tag-tag-remove-btn')" @click="tagRemoveHandler(item, key)">
                    <span :style="getRemoveBtnStyle()" :class="getCls('tag-btn-left')"></span>
                    <span :style="getRemoveBtnStyle()" :class="getCls('tag-btn-right')"></span>
                </span>
            </span>
            <input
                autofocus
                v-model="inputValue"
                :style="getInputStyle()"
                :class="getCls('tag-input')"
                :placeholder="placeholder"
                @keydown="keyDownHandler($event)"
                @input="inputHandler($event)"
                @focus="focusHandler"
                @blur="blurHandler"
            />
        </div>
        <span :class="getCls('tag-tips')">{{tips}}</span>
    </div>
</template>

<script>
import getClassName from '../utils.js';
import {t} from '../../locale';
import mixin from '../../mixins';

// 配色集合
const colors = {
    'purple': '#9b7bff',
    'blue': '#2d8cf0',
    'green': '#19be6b',
    'red': '#ed4014',
    'orange': '#f90',
    'grey': '#f7f7f7'
};

export default {
    name: 'NvTag',
    mixins: [mixin],
    data() {
        return {
            // 标签集合
            items: [],
            // inpute的值
            inputValue: '',
            // wrapper初始宽度
            wrapperWidth: 600,
            // input初始宽度
            inputWidth: 400,
            // 标签的max-length
            maxLen: 100,
            // 初始的背景框高度
            height: 40,
            // 输入的color
            inputColor: '#9b7bff',
            // 输入的type
            inputType: 'default'
        };
    },
    props: {
        // 默认文本
        placeholder: {
            type: String,
            default() {
                return t('tag.placeholder')
            }
        },
        // 宽度
        width: {
            type: Number,
            default: 600
        },
        // 标签集合
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        // 标签个数限制
        maxNum: {
            type: Number,
            default: 5
        },
        // 标签最大长度限制
        maxLength: {
            type: Number,
            default: 105
        },
        // 标签颜色
        color: {
            type: String,
            default: 'purple'
        },
        // 标签样式
        type: {
            type: String,
            default: 'default'
        },
        // 标签是否可以关闭
        closeable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // 提示信息
        tips() {
            let num = this.maxNum - this.count;
            return this.t('tag.addTip', {num: num});
        },
        // 已有的标签个数
        count() {
            return this.items.length;
        }
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler(val) {
                this.items = val;
            }
        }
    },
    created() {
        // 容错处理
        if (this.width < 300) {
            this.wrapperWidth = 300;
            this.inputWidth = 100;
        }
        else {
            this.wrapperWidth = this.width;
            this.inputWidth = this.wrapperWidth - 300;
        }
        if (this.inputWidth < 100) {
            this.inputWidth = 100;
        }
        this.maxLen = this.maxLength;
        this.inputColor = this.getTagColor() || '#9b7bff';
        if (this.type !== 'default' && this.type !== 'border') {
            this.inputType = 'default';
        }
        else {
            this.inputType = this.type;
        }
    },
    methods: {
        /**
         * 获取类名
         *
         * @param {String} postfix 后缀名称
         * @return {Object} 样式集合
         */
        getCls(postfix) {
            return getClassName.getComponentWrapperCls(postfix);
        },
        /**
         * 获取wrapper的样式
         *
         * @return {Object} 样式集合
         */
        getWrapperStyle() {
            return {
                width: this.wrapperWidth + 'px'
            };
        },
        /**
         * 获取panel的样式
         *
         * @return {Object} 样式集合
         */
        getPanelStyle() {
            return {
                width: this.wrapperWidth + 'px',
                minHeight: this.height + 'px',
                lineHeight: this.height + 'px'
            };
        },
        /**
         * 获取tag的样式
         *
         * @return {Object} 样式集合
         */
        getTagStyle() {
            return {
                maxWidth: this.maxLen + 'px',
                background: this.inputType === 'border' ? '#fff' : this.inputColor,
                border: this.inputType === 'border' ? '1px solid ' + this.inputColor : 'none'
            };
        },
        /**
         * 获取tag的文本域样式
         *
         * @return {Object} 样式集合
         */
        getTagTextStyle() {
            let textColor = '#fff';
            if (this.color === 'grey' || this.color === 'white' || this.color === '#ffffff') {
                textColor = '#515a6e';
            }
            else if (this.inputType && this.inputType !== 'default') {
                textColor = this.inputColor;
            }
            else {
                textColor = '#fff';
            }
            return {
                color: textColor,
                maxWidth: this.closeable ? this.maxLen - 50 + 'px' : this.maxLen + 'px',
            };
        },
        /**
         * 获取tag的移除按钮样式
         *
         * @return {Object} 样式集合
         */
        getRemoveBtnStyle() {
            if (this.closeable) {
                if (this.inputType === 'border') {
                    return {
                        background: this.inputColor
                    };
                }
                else if (this.color === 'grey' || this.color === 'white' || this.color === '#ffffff'){
                    return {
                        background: '#515a6e'
                    };
                }
                else {
                    return {
                        background: '#fff'
                    };
                }
            }
            else {
                return {};
            }
        },
        /**
         * 获取input的样式
         *
         * @return {Object} 样式集合
         */
        getInputStyle() {
            let height = this.height - 2;
            return {
                width: this.inputWidth + 'px',
                height: height + 'px',
                lineHeight: height + 'px'
            };
        },
        /**
         * 按键事件监听处理逻辑
         *
         * @param {Object} event 按键事件
         */
        keyDownHandler(event) {
            event = event || window.event;
            if (event.keyCode === 13) {
                // enter press down
                this.enterPressHandler();
            }
            if (event.keyCode === 32) {
                // space press down
                this.spacePressHandler();
            }
            if (event.keyCode === 8) {
                // backspace press down
                this.backSpacePressHandler();
            }
        },
        /**
         * enter按键事件处理逻辑
         */
        enterPressHandler() {
            if (this.count >= this.maxNum) {
                return;
            }
            if (!this.isValid()) {
                this.inputValue = '';
                return;
            }
            let tag = {};
            tag.label = this.inputValue;
            tag.name = (new Date()).getTime();
            this.items.push(tag);
            this.inputValue = '';
            this.$emit('on-change', this.items);
        },
        /**
         * space按键事件处理逻辑
         *
         */
        spacePressHandler() {
            if (this.count >= this.maxNum) {
                return;
            }
            if (!this.isValid()) {
                this.inputValue = '';
                return;
            }
            let tag = {};
            tag.label = this.inputValue;
            tag.name = (new Date()).getTime();
            this.items.push(tag);
            this.inputValue = '';
            this.$emit('on-change', this.items);
        },
        /**
         * backspace按键事件处理逻辑
         *
         */
        backSpacePressHandler() {
            if (this.inputValue === '' && this.count > 0) {
                if (this.items.length) {
                    this.items.pop();
                    this.$emit('on-change', this.items);
                }
            }
        },
        /**
         * 获取tag的颜色
         *
         * @return {String} 返回颜色
         */
        getTagColor() {
            let color = '';
            for (let item in colors) {
                if (colors.hasOwnProperty(item) && item === this.color) {
                    color = colors[item];
                    break;
                }
            }
            if (!color && /^#[0-9a-fA-F]{6}$/.test(this.color)) {
                color = this.color;
            }
            return color || '#9b7bff';
        },
        /**
         * 按键事件监听处理逻辑
         *
         * @param {Object} event 按键事件
         */
        inputHandler() {
            if (!this.isValid() || this.count >= this.maxNum) {
                this.inputValue = '';
                return;
            }
            // 只有合法输入时，触发on-input事件
            this.$emit('on-input', this.inputValue);
        },
        /**
         * 获取标签集合
         *
         * @return {Array} 标签集合
         */
        getTags() {
            return this.items;
        },
        /**
         * 设置标签集合
         *
         * @param {Array} items 传入的标签集合
         */
        setTags(items) {
            if (items && items instanceof Array) {
                this.items = items;
            }
        },
        /**
         * 添加标签
         *
         * @param {Object} item 传入的标签
         */
        addTag(item) {
            if (this.data.length === this.maxNum) {
                this.$Message.warning('标签个数已达最大限制');
                return;
            }
            if (item && item.hasOwnProperty('name') && item.hasOwnProperty('label')) {
                this.items.push(item);
            }
        },
        /**
         * 移除某个标签
         *
         * @param {Object} item 传入的标签
         */
        removeTag(item) {
            if (item && item.hasOwnProperty('name') && item.hasOwnProperty('label')) {
                for (let i in this.items) {
                    if (this.items.hasOwnProperty(i)) {
                        if (this.items[i].name === item.name && this.items[i].label === item.label) {
                            this.items.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        },
        /**
         * 清空标签集合
         *
         */
        clear() {
            this.items = [];
            this.inputValue = '';
        },
        /**
         * 点击按钮移除标签
         *
         * @param {String} item 标签值
         * @param {number} inx 下标值
         */
        tagRemoveHandler(item, inx) {
            this.items.splice(inx, 1);
            this.$emit('on-change', this.items);
        },
        /**
         * 检验当前输入是否合法
         *
         * @return {Boolean} isValid 是否合法
         */
        isValid() {
            return !(this.inputValue === '' || (/\s/.test(this.inputValue)));
        },
        /**
         * 暴露获得焦点事件
         */
        focusHandler() {
            this.$emit('on-focus');
        },
        /**
         * 暴露失去焦点事件
         */
        blurHandler() {
            this.$emit('on-blur');
        }
    }
};
</script>

