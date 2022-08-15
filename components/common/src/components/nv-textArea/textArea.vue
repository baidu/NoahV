<template>
    <div :class="getCls('text-area-wrapper')">
        <div :class="disabled?'disabled':''" @click.stop="autoFocus">
            <pre
                :ref="mirrorId"
                :contenteditable="!disabled"
                user-modify="read-write-plaintext-only"
                :placeholder="placeholder"
                @focus="changeFocus"
                @blur="changeBlur"
                @input="changeText"
            ></pre>
        </div>
        <p>{{columnNum}}：{{colNum}}/100，{{rowNum}}：{{contentLength}}/10000</p>
    </div>
</template>
<script>
import {t} from '../../locale';
import getClassName from '../utils.js';
export default {
    data() {
        return {
            mirrorId: '',
            contentLength: 0,
            colNum: 0,
            focusType: false,
            columnNum: t('textArea.columnNum'),
            rowNum: t('textArea.rowNum')
        };
    },
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        highLightRule: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        maxLength: {
            type: Number,
            default: 0
        },
        rule: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    beforeCreate() {
        this.mirrorId = (new Date()).getTime() + '-' + Math.random();
    },
    watch: {
        value: {
            handler(val) {
                this.$nextTick(() => {
                    this.$refs[this.mirrorId].innerText = '';
                    this.$refs[this.mirrorId].innerText = val;
                });
            },
            immediate: true
        }
    },
    methods: {
        getCls(postfix) {
            return getClassName.getComponentWrapperCls(postfix);
        },
        autoFocus() {
            if (!this.focusType && !this.$refs[this.mirrorId].innerText) {
                let range = window.getSelection();
                range.selectAllChildren(this.$refs[this.mirrorId]);
                range.collapseToEnd();
            }
            this.focusType = true;
        },
        changeFocus() {
            this.$refs[this.mirrorId].innerText = this.$refs[this.mirrorId].innerText;
        },
        changeBlur() {
            this.focusType = false;
            this.$emit('changeValue', this.$refs[this.mirrorId].innerText);
        },
        changeText() {
            // 超出最大范围，重新定位光标
            const contentText = this.$refs[this.mirrorId].innerText;
            if (this.maxLength && contentText.length > this.maxLength) {
                this.$refs[this.mirrorId].innerText = contentText.substr(0, this.maxLength);
                this.$refs[this.mirrorId].focus();
                let range = window.getSelection();
                range.selectAllChildren(this.$refs[this.mirrorId]);
                range.collapseToEnd();
            }
            if (!contentText) {
                this.colNum = 0;
            }
            else {
                this.colNum = Math.floor(this.$refs[this.mirrorId].offsetHeight / 20 - 1, 10);
            }
            this.contentLength = contentText.trim().length;
        },
        // 处理高亮
        changeHighLight(val) {
            let domStr;
            domStr = this.$refs[this.mirrorId].innerText;
            try {
                let highLightArr = domStr.match(new RegExp(val, 'g'));
                if (!highLightArr) {
                    return;
                }
                domStr = domStr.replace(new RegExp(val, 'g'), `<span>$&</span>`);
                this.$refs[this.mirrorId].innerHtml = '';
                this.$refs[this.mirrorId].innerText = '';
                let node = new DOMParser().parseFromString(domStr, 'text/html').body.childNodes;
                new Array(node.length).fill(1, 0).forEach(() => {
                    this.$refs[this.mirrorId].appendChild(node[0]);
                });
            }
            catch (err) {
                throw new Error('提取规则格式报错');
            }
        }
    }
};
</script>
