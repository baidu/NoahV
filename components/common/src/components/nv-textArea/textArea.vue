<template>
    <div :class="getCls('text-area-wrapper')">
        <pre
            :ref="mirrorId"
            contenteditable="true"
            user-modify="read-write-plaintext-only"
            :placeholder="placeholder"
            @focus="changeFocus"
            @blur="changeBlur"
            @input="changeText"
        ></pre>
    </div>
</template>
<script>
import getClassName from '../utils.js';
export default {
    data() {
        return {
            mirrorId: ''
        };
    },
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        highLight: {
            type: String | Array,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        maxLength: {
            type: Number,
            default: 0
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
        },
        highLight: {
            handler(val) {
                if (this.highLight) {
                    this.$nextTick(() => {
                        this.changeHighLight(val);
                    });
                }
            }
        }
    },
    methods: {
        getCls(postfix) {
            return getClassName.getComponentWrapperCls(postfix);
        },
        changeFocus() {
            this.$refs[this.mirrorId].innerText = this.$refs[this.mirrorId].innerText;
        },
        changeBlur() {},
        changeText() {
            // 超出最大范围，重新定位光标
            if (this.maxLength && this.$refs[this.mirrorId].innerText.length > this.maxLength) {
                this.$refs[this.mirrorId].innerText = this.$refs[this.mirrorId].innerText.substr(0, this.maxLength);
                this.$refs[this.mirrorId].focus();
                let range = window.getSelection();
                range.selectAllChildren(this.$refs[this.mirrorId]);
                range.collapseToEnd();
            }
        },
        // 处理高亮
        changeHighLight(val) {
            let domStr = '';
            if (!(val instanceof Array)) {
                val = [val];
            }
            domStr = this.$refs[this.mirrorId].innerText;
            val.forEach(item => {
                if (item) {
                    let exp = new RegExp(item, 'g');
                    domStr = domStr.replace(exp, `<span>${item}</span>`);
                }
            });
            this.$refs[this.mirrorId].innerHtml = '';
            this.$refs[this.mirrorId].innerText = '';
            let node = new DOMParser().parseFromString(domStr, 'text/html').body.childNodes;
            new Array(node.length).fill(1, 0).forEach(() => {
                this.$refs[this.mirrorId].appendChild(node[0]);
            });
        }
    }
};
</script>
