<template>
    <div :class="getCls('text-line-wrapper')" :ref="'wrapper-' + mirrorId" :style="getSaTextLineWrapperCls()">
        <codemirror
            v-model="content"
            :ref="mirrorId"
            :options="configOptions"
            @input="onChangeHandler"
            @ready="onReadyHandler"
            @focus="onFocusHandler"
            @blur="onBlurHandler"
        >
        </codemirror>
    </div>
</template>

<script>
// 引入主依赖
import { codemirror } from 'vue-codemirror';

// 插件依赖
import 'codemirror/addon/display/placeholder.js';

// language
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/vue/vue.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/php/php.js';
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/mode/markdown/markdown.js';

// active-line.js
import 'codemirror/addon/selection/active-line.js';
// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js';
import 'codemirror/addon/search/searchcursor.js';
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/match-highlighter.js';

import getClassName from '../utils.js';

export default {
    name: 'NvTextLine',
    components: {
        codemirror
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: Number,
            default: 200
        },
        options: {
            type: Object,
            default() {
                return {
                    tabSize: 4,
                    line: true,
                    lineNumbers: true,
                    readyOnly: false,
                    lineWrapping: 'wrap',
                    styleActiveLine: true
                };
            }
        }
    },
    data() {
        return {
            // 文本内容
            content: this.value,
            // 编辑框uuid
            mirrorId: '',
            // codeMirror实例
            codeMirrorInstance: '',
            // 默认配置项
            defaultOptions: {
                tabSize: 4,
                line: true,
                lineNumbers: true,
                readyOnly: false,
                lineWrapping: 'wrap',
                styleActiveLine: true
            },
            // 配置项
            configOptions: Object.assign({}, this.defaultOptions, this.getLowerCaseOptions(this.options))
        };
    },
    beforeCreate() {
        this.mirrorId = (new Date()).getTime() + '-' + Math.random();
    },
    mounted() {
        let mirrorWrapper = this.$refs[this.mirrorId];
        if (mirrorWrapper) {
            let textLineWrapper = this.$refs['wrapper-' + this.mirrorId];
            let codeMirror = mirrorWrapper.$el.children[1];
            let border = this.getClassValue(textLineWrapper, 'border-width') || this.getClassValue(textLineWrapper, 'border-bottom-width');
            border = border ? border : 0;
            codeMirror.style.height = this.height - 2 * border + 'px';
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(val) {
                if (val !== null && val !== undefined) {
                    this.content = val;
                }
            }
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
         * 获取文本框的样式
         *
         * @return {String} 返回文本框内的样式
         */
        getSaTextLineWrapperCls() {
            return {
                width: this.width + 'px',
                height: this.height + 'px'
            };
        },
        /**
         * 获取某个元素的真实样式
         *
         * @param {Object} element 目标元素
         * @param {String} className 样式名
         * @return {String} 返回真实样式值
         */
        getClassValue(element, className) {
            let value = 0;
            if (window.getComputedStyle) {
                value = window.getComputedStyle(element, null)[className];
            }
            else {
                value = element.currentStyle[className];
            }
            value = parseInt(value, 10);
            return value;
        },
        /**
         * 处理大小写，codemirror对大小写敏感
         *
         * @param {Object} items 用户配置项
         * @return {Object} 返回小写格式
         */
        getLowerCaseOptions(items) {
            for (let item in items) {
                if (items.hasOwnProperty(item) && typeof items[item] === 'string') {
                    items[item] = items[item].toLowerCase();
                }
            }
            return items;
        },
        /**
         * 暴露给用户的接口，触发on-change
         *
         */
        onChangeHandler(val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        /**
         * 暴露给用户的接口，触发on-ready
         *
         */
        onReadyHandler(codeMirrorInstance) {
            this.codeMirrorInstance = codeMirrorInstance;
            this.$emit('on-ready', codeMirrorInstance);
        },
        /**
         * 暴露给用户的接口，触发on-focus
         *
         */
        onFocusHandler(codeMirrorInstance) {
            this.$emit('on-focus', codeMirrorInstance);
        },
        /**
         * 暴露给用户的接口，触发on-blur
         *
         */
        onBlurHandler(codeMirrorInstance) {
            this.$emit('on-blur', codeMirrorInstance);
        },
        /**
         * 暴露给用户的接口，获取文本内容
         *
         */
        getText() {
            return this.content;
        },
        /**
         * 暴露给用户的接口，设置文本内容
         *
         */
        setText(val) {
            this.content = val;
        },
        /**
         * 暴露给用户的接口，获取行数
         *
         */
        getLineCount() {
            let count = this.codeMirrorInstance.lineCount();
            return count;
        }
    }
};
</script>

