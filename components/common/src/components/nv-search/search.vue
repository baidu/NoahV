<template>
    <div :class="[prefixCls + '-wrapper']">
        <div v-if="cascader" :class="[prefixCls + '-cascader-label']">
            <Cascader :data="options" :clearable="clearable" v-model="value.searchName"></Cascader>
        </div>
        <div v-else :class="[prefixCls + '-label']">
            <Select v-model="value.searchName">
                <Option v-for="(item, key) in options" :key="key" :value="item.value">
                    {{item.label}}
                </Option>
            </Select>
        </div>
        <div :class="[prefixCls + '-value']">
            <Input v-model="value.searchValue" :clearable="clearable" :maxlength="maxlength" :placeholder="placeholder" @on-enter="enter($event)"></Input>
        </div>
    </div>
</template>

<script>
import {t} from '../../locale';
// 组件样式前缀名
const prefixCls = 'noahv-search';

export default {
    name: 'NvSearch',
    data() {
        return {
            // 样式前缀
            prefixCls: prefixCls,
            // 搜索项集合
            options: [],
            // 绑定的数据
            modelData: {}
        };
    },
    props: {
        maxlength: Number,
        // 是否开启级联选择
        cascader: {
            type: Boolean,
            default: false
        },
        // 可选择项数据集
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        // 默认提示
        placeholder: {
            type: String,
            default() {
                return t('search.placeholder')
            }
        },
        // 是否支持关闭按钮
        clearable: {
            type: Boolean,
            default: false
        },
        // v-model绑定的数据
        value: {
            type: Object,
            default() {
                return {
                    searchName: this.cascader ? [] : '',
                    searchValue: ''
                };
            }
        }
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler(val) {
                this.options = val;
            }
        },
        'value.searchName': {
            deep: true,
            handler(val) {
                this.updateHandler();
            }
        },
        'value.searchValue': {
            handler(val) {
                this.updateHandler();
            }
        }
    },
    methods: {
        enter(event) {
            this.$emit('on-enter', event);
        },
        /**
         * 更新v-model对象
         */
        updateHandler() {
            this.$emit('on-change', this.value);
        }
    }
};
</script>
