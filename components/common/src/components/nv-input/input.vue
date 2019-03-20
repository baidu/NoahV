<template>
    <div :class="getCls('input')">
        <input
            :id="elementId"
            :autocomplete="autocomplete"
            :class="inputClasses"
            :placeholder="placeholder"
            :disabled="disabled"
            :style="inputStyle"
            ref="input"
            v-model="inputValue"
            :type="type"
            :readonly="readonly"
            @keyup.enter="handleEnter"
            @keyup="keyupHandler">
        <div :class="getCls('input-suggest-box')" v-if="suggestData.length > 0" :style="suggestStyle">
            <ul>
                <li v-for="item in suggestData" @click="setSuggestItem(item.name)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import u from 'underscore';
import getClassName from '../utils.js';

export default {
    name: 'NvInput',
    props: {
        elementId: {
            type: String
        },
        autocomplete: {
            type: String,
            default: 'off'
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number],
            default: ''
        },
        suggestserver: {
            type: String
        },
        suggestlist: {
            type: Array
        },
        handleKeyup: {
            type: Function
        }
    },
    data() {
        return {
            inputValue: this.value || '',
            suggestData: []
        };
    },
    computed: {
        inputClasses() {
            let classConfig = [
                {
                    postfix: 'input-input',
                    condition: true
                },
                {
                    postfix: 'input-' + this.size,
                    condition: !!this.size
                },
                {
                    postfix: 'input-disabled',
                    condition: this.disabled
                }
            ];
            return getClassName.getConditionCls(classConfig);
        },
        suggestStyle() {
            let style = '';
            style += u.isNumber(this.width) ? 'width: '
                + this.width + 'px;' : '';
            return style;
        },
        inputStyle() {
            let style = '';
            style += u.isNumber(this.width) ? 'width: '
                + this.width + 'px;' : '';
            style += u.isNumber(this.height) ? 'height: '
                + this.height + 'px;' : '';
            return style;
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
        handleEnter(event) {
            this.$emit('on-enter', event);
        },
        keyupHandler() {
            if (this.inputValue === '') {
                return;
            }
            if (this.suggestserver) {
                this.getSuggest(this.inputValue);
            }
            if (this.suggestlist && this.suggestlist.length > 0) {
                let similarList = [];
                u.each(this.suggestlist, item => {
                    if (item.name.indexOf(this.inputValue) > -1) {
                        similarList.push(item);
                    }
                });
                this.suggestData = similarList;
            }
            if (this.handleKeyup && typeof this.handleKeyup === 'function') {
                this.handleKeyup();
            }
        },
        getSuggest(value) {
            this.$request({
                method: 'post',
                url: this.suggestserver,
                data: {key: value}
            }).then(response => {
                this.suggestData = response.data.data;
            });
        },
        setSuggestItem(value) {
            this.inputValue = value;
            this.suggestData = [];
        }
    }
};
</script>

