<template>
    <div class="filter-item-multi">
        <Select :style="selectStyle" :placeholder="placeholder"
            @on-open-change="togglePanel($event)" ref="multiDimensionItem">
            <Input search :placeholder="searchInputPlaceholder"
                v-model="searchInputValue"
                v-if="hasSearchInput"
                @on-keyup="onKeyUpSearch" />
            <Checkbox v-if="hasAll" v-model="isAll" class="is-all" @on-change="isAllChange($event)">
                {{allText}}</Checkbox>
            <Checkbox :indeterminate="indeterminate" :value="checkAll"
                @click.prevent.native="handleCheckAll($event)">{{checkAllText}}</Checkbox>
            <CheckboxGroup v-model="value" @on-change="checkAllGroupChange($event)">
                <Checkbox :key="dim.name" :label="dim.name" v-for="dim in resultList">{{dim.comment}}</Checkbox>
            </CheckboxGroup>
        </Select>
        <span class="checked-list" v-if="hasAll && isAll">{{allText}}</span>
        <span class="checked-list" v-else>
            <i>{{resultTitle}}</i>
            <i class="number-of-total">
                <template v-if="showTotalNumber">({{value.length}}/{{data.length}})</template>
                <template v-else>({{value.length}})</template>
            </i>
        </span>
    </div>
</template>

<script>
import $ from 'jquery';
import {t} from '../../locale';

function handlerResultTitle(text, params) {
    if (/\{.*?\}/g.test(text)) {
        let matches = text.match(/\{.*?\}/g);
        matches.forEach(item => {
            let key = item.substring(1, item.length - 1);
            text = text.replace(item, params[key]);
        });
    }
    return text;
}
export default {
    name: 'MultiSelect',
    props: {
        hasAll: {
            type: Boolean,
            default: false
        },
        allText: {
            type: String,
            default() {
                return t('multiSelect.allText');
            }
        },
        list: {
            type: Array,
            default: () => []
        },
        searchInputPlaceholder: {
            type: String,
            default() {
                return t('multiSelect.placeholder');
            }
        },
        hasSearchInput: {
            type: Boolean,
            default: false
        },
        resultText: {
            type: String,
            default() {
                return t('multiSelect.resultText');
            }
        },
        width: {
            type: [String, Number],
            default: '200px'
        },
        showTotalNumber: {
            type: Boolean,
            default: false
        },
        isUnfoldLabel: {
            type: Boolean,
            default: false
        },
        pageNo: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            dafault: 10
        },
        distanceToBottom: {
            type: Number,
            dafault: 20
        }
    },
    data() {
        return {
            placeholder: '',
            isAll: this.hasAll === true,
            indeterminate: false,
            checkAll: false,
            value: [],
            searchInputValue: '',
            data: this.list || [],
            resultTitle: handlerResultTitle(this.resultText, {
                selectNumber: 0
            }),
            isPageRender: this.list.length > 1000,
            result: {},
            resultList: [],
            timeId: '',
            pageNumber: this.pageNo,
            checkAllText: t('multiSelect.checkAllText')
        };
    },
    computed: {
        selectStyle() {
            let width = 0;
            if (typeof this.width === 'number') {
                width = this.width + 'px';
            }
            else if (this.width.indexOf('px') > -1) {
                width = this.width;
            }
            else {
                width = this.width + 'px';
            }
            const style = {width};
            return style;
        },
        totalPage() {
            if (this.list.length < this.pageSize) {
                return 1;
            }
            return Math.ceil(this.list.length / this.pageSize);
        }
    },
    mounted() {
        this.setPageResult();
        this.bindScrollEvent();
    },
    beforeDestroy() {
        let index = 0;
        let container = $($('.filter-items-item .ivu-select-dropdown')[index]);
        container.off('scroll');
    },
    watch: {
        list: {
            handler() {
                this.setPageResult();
                this.value = this.hasAll === true ? [] : (this.list.length ? [this.list[0].name] : []);
                this.indeterminate = this.hasAll === true ? false : this.list.length > this.value.length;
                this.checkAll = this.hasAll === true
                    ? false : this.list.length === this.value.length && this.list.length !== 0;
            },
            deep: true
        },
        value(val) {
            if (val.length === this.list.length) {
                this.indeterminate = false;
                this.checkAll = true;
            }
            else if (val.length < this.list.length) {
                if (val.length === 0) {
                    this.indeterminate = false;
                }
                else {
                    this.indeterminate = true;
                }
                this.checkAll = false;
            }
            else {
                this.indeterminate = false;
                this.checkAll = false;
            }
            if (this.isUnfoldLabel) {
                this.resultTitle = this.value.join('、');
            }
            else {
                this.resultTitle = handlerResultTitle(this.resultText, {
                    selectNumber: this.value.length
                });
            }
            this.$emit('on-change', {
                value: this.value,
                isAll: this.isAll
            });
        }
    },
    methods: {
        setPageResult() {
            if (this.isPageRender) {
                let pageNo = 0;
                for (let i = 0; i < this.list.length; i++) {
                    if (i % this.pageSize === 0) {
                        pageNo++;
                        this.result[pageNo] = [];
                    }
                    this.result[pageNo].push(this.list[i]);
                }
                this.resultList = this.result[this.pageNo];
            }
            else {
                this.resultList = this.list;
            }
        },
        bindScrollEvent() {
            if (this.isPageRender) {
                const me = this;
                let index = 0;
                let container = $($('.filter-item-multi .ivu-select-dropdown')[index]);
                container.on('scroll', () => {
                    clearTimeout(me.timeId);
                    me.timeId = setTimeout(() => {
                        let scrollHeight = container[0].scrollHeight || 0;
                        let scrollTop = container[0].scrollTop || 0;
                        let divHeight = container.height();
                        if (scrollHeight > 0 && scrollTop > 0) {
                            if (scrollTop + divHeight + me.distanceToBottom >= scrollHeight) {
                                if (me.pageNumber < me.totalPage) {
                                    me.pageNumber++;
                                    me.resultList = me.resultList.concat(me.result[me.pageNumber]);
                                }
                            }
                        }
                    }, 500);
                });
            }
        },
        togglePanel(e) {
            this.$emit('on-toggle-panel', e);
        },
        isAllChange(e) {
            if (e) {
                this.checkAll = false;
                this.indeterminate = false;
                this.value = [];
            }
        },
        handleCheckAll() {
            this.isAll = false;
            if (this.indeterminate) {
                this.checkAll = false;
            }
            else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;
            if (this.checkAll) {
                this.value = this.list && this.list.map(item => item.name);
            }
            else {
                this.value = [];
            }
        },
        checkAllGroupChange() {
            this.isAll = false;
            // this.$emit('on-change', {
            //    value: this.value,
            //    isAll: this.isAll
            // });
        },
        onKeyUpSearch() {
            this.data = this.list.filter(item => item.comment.indexOf(this.searchInputValue) > -1);
            this.$emit('on-keyup', {
                value: this.searchInputValue,
                result: this.data
            });
        }
    }
};
</script>

<style lang="less">
.filter-item-multi {
    .is-all {
        .ivu-checkbox-checked {
            .ivu-checkbox-inner {
                background-color: #fff !important;
                &:after {
                    content: '';
                    display: table;
                    width: 8px;
                    height: 8px;
                    position: absolute;
                    border-radius: 50%;
                    background: #108cee;
                    top: 2px;
                    left: 2px;
                    border: 0;
                    border-top: 0;
                    border-left: 0;
                    opacity: 1;
                    -webkit-transform: scale(1);
                    transform: scale(1);
                    transition: all .2s ease-in-out;
                }
            }
        }
        .ivu-checkbox-inner {
            display: inline-block;
            width: 14px;
            height: 14px;
            position: relative;
            top: 0;
            left: 0;
            background-color: #fff;
            border: 1px solid #bbbbbb;
            border-radius: 50% !important;
            transition: all .2s ease-in-out;
            &:after {
                position: absolute;
                width: 10px;
                height: 10px;
                left: 2px;
                top: 2px;
                border-radius: 6px;
                display: table;
                border-top: 0;
                border-left: 0;
                content: " ";
                background-color: #2d8cf0;
                opacity: 0;
                transition: all .2s ease-in-out;
                -webkit-transform: scale(0);
                transform: scale(0);
            }
        }
    }
    position: relative;
    float: left;
    margin-right: 15px;
    .ivu-select-single {
        position: relative;
        z-index: 2;
        &:hover {
            & + .checked-list {
                border-color: #999;
            }
        }
        .ivu-select-dropdown {
            padding-bottom: 10px;
            .dimension-button {
                margin-left: 15px;
                margin-top: 5px;
            }
            margin: 5px 0;
            .ivu-select-dropdown-list {
                .ivu-checkbox-inner {
                    border-radius: 0;
                }
                .ivu-checkbox-checked {
                    .ivu-checkbox-inner {
                        border-color: #108cee;
                        background-color: #108cee;
                    }
                }
                .ivu-checkbox-wrapper {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:hover {
                        color: #108cee;
                        background: #eaf6fe;
                    }
                }
            }
        }
        .ivu-icon-ios-arrow-down {
            color: #666;
            font-size: calc(1em - 4px);
        }
        .ivu-select-selection {
            background: transparent;
        }
    }

    .loading {
        font-size: 12px;
        text-align: center;
        padding-top: 5px;
        padding-bottom: 5px;
        transition: padding .5s;
        .ivu-scroll-loader-wrapper {
            padding: 5px 0;
            height: 0;
            background-color: inherit;
            transform: scale(0);
            transition: opacity .3s,transform .5s,height .5s;
        }
        .ivu-scroll-loader-wrapper-active {
            height: 40px;
            transform: scale(1);
        }
    }

    .ivu-select-dropdown {
        max-height: 300px;
    }
}
.ivu-checkbox-wrapper {
    display: block;
    height: 30px;
    line-height: 30px;
    color: #515a6e;
    padding-left: 16px;
    &:hover {
        color: #3a62ca;
        background: #f7f8fc;
        transition: background 0.2s ease-in-out;
    }
}
.checked-list {
    display: block;
    position: absolute;
    height: 30px;
    line-height: 30px;
    background: #fff;
    z-index: 1;
    top: 0;
    left: 0;
    width: 200px;
    padding-left: 10px;
    padding-right: 30px;
    color: #333;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    width: 100%;
    i {
        font-style: normal;
    }
    .number-of-total {
        position: absolute;
        right: 30px;
    }
}
</style>
