<template>
    <div :class="prefix">
        <Select
            :style="selectStyle"
            :placeholder="placeholder"
            @on-open-change="togglePanel($event)"
            ref="multiDimensionItem">
            <Input
                search
                :placeholder="searchPlaceHolder"
                v-model="searchValue"
                v-if="hasSearch"
                @on-keyup="onKeyUpSearch" />
            <Checkbox
                v-if="hasAll"
                v-model="isAll"
                class="is-all"
                @on-change="allChangeAction($event)">
                {{allText}}
            </Checkbox>
            <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll($event)">
                {{checkAllText}}
            </Checkbox>
            <CheckboxGroup
                v-model="value"
                @on-change="checkAllGroupChange($event)"
                >
                <Checkbox
                    v-for="dim in resultList"
                    :key="dim.value"
                    :label="dim.value"
                    >
                    {{dim.label}}
                </Checkbox>
            </CheckboxGroup>
        </Select>
        <span class="checked-list" v-if="hasAll && isAll">{{allText}}</span>
        <span class="checked-list" v-else>
            <i>{{resultTitle}}</i>
            <i class="number-of-total">
                <template v-if="showTotalNumber">({{value.length}}/{{list.length}})</template>
                <template v-else>({{value.length}})</template>
            </i>
        </span>
    </div>
</template>

<script>
import {t} from '../../locale';

const prefix = 'noahv-filter-item-multi';

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
    name: 'NvMultiSelect',
    model: {
        prop: 'model',
        event: 'on-change'
    },
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
        allValue: {
            type: String,
            default: 'all'
        },
        list: {
            type: Array,
            default: () => []
        },
        searchPlaceHolder: {
            type: String,
            default() {
                return t('multiSelect.placeholder');
            }
        },
        hasSearch: {
            type: Boolean,
            default: false
        },
        selectedText: {
            type: String,
            default() {
                return t('multiSelect.selectedText');
            }
        },
        width: {
            type: [String, Number],
            default: '200px'
        },
        model: {
            type: [String, Array],
            default: () => []
        },
        showTotalNumber: {
            type: Boolean,
            default: false
        },
        showAllLabel: {
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
        defaultNumber: {
            type: Number,
            default: 50
        },
        distanceToBottom: {
            type: Number,
            dafault: 20
        }
    },
    data() {
        return {
            prefix,
            placeholder: '',
            isAll: false,
            indeterminate: false,
            checkAll: false,
            value: [],
            searchValue: '',
            data: this.list || [],
            resultTitle: handlerResultTitle(this.selectedText, {
                selectNumber: 0
            }),
            isPageRender: this.list.length > this.defaultNumber,
            result: {},
            resultList: [],
            timeId: '',
            pageNumber: this.pageNo,
            checkAllText: t('multiSelect.checkAllText'),
            container: null
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
        this.container = this.$refs.multiDimensionItem.$el.children[1];
        this.setDefaultValue();
        this.setPageResult();
        this.bindScrollEvent();
    },
    beforeDestroy() {
        this.container.removeEventListener('scroll', this.scrollAction);
        this.container = null;

    },
    watch: {
        list: {
            handler() {
                this.setPageResult();
                this.value = this.hasAll === true ? [] : (this.list.length ? [this.list[0].value] : []);
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
                this.indeterminate = val.length !== 0;
                this.checkAll = false;
            }
            else {
                this.indeterminate = false;
                this.checkAll = false;
            }
            if (this.showAllLabel) {
                this.resultTitle = this.value.join('、');
            }
            else {
                this.resultTitle = handlerResultTitle(this.selectedText, {
                    selectNumber: this.value.length
                });
            }

            let value = this.isAll ? this.allValue : this.value;
            this.$emit('on-change', value);
        }
    },
    methods: {
        setDefaultValue() {
            if (Array.isArray(this.model)) {
                this.value = this.model;
            }
            else {
                this.isAll = this.model === this.allValue;
            }
        },
        setPageResult(list = [], showEmpty = false) {
            const tempList = list.length > 0 ? list : (showEmpty ? [] : this.list);
            if (this.isPageRender) {
                let pageNo = 0;
                for (let i = 0; i < tempList.length; i++) {
                    if (i % this.pageSize === 0) {
                        pageNo++;
                        this.result[pageNo] = [];
                    }
                    this.result[pageNo].push(tempList[i]);
                }
                this.resultList = this.result[this.pageNo];
            }
            else {
                this.resultList = tempList;
            }
        },
        bindScrollEvent() {
            if (this.isPageRender) {
                this.container.addEventListener('scroll', this.scrollAction);
            }
        },
        scrollAction() {
            clearTimeout(this.timeId);
            this.timeId = setTimeout(() => {
                let scrollHeight = this.container.scrollHeight || 0;
                let scrollTop = this.container.scrollTop || 0;
                let divHeight = this.container.offsetHeight;
                if (scrollHeight > 0 && scrollTop > 0) {
                    if (scrollTop + divHeight + this.distanceToBottom >= scrollHeight) {
                        if (this.pageNumber < this.totalPage) {
                            this.pageNumber++;
                            this.resultList = this.resultList.concat(this.result[this.pageNumber]);
                        }
                    }
                }
            }, 500);
        },
        togglePanel(e) {
            this.$emit('on-toggle-panel', e);
        },
        allChangeAction(e) {
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
                this.value = this.list && this.list.map(item => item.value);
            }
            else {
                this.value = [];
            }

        },
        checkAllGroupChange() {
            this.isAll = false;
            this.$emit('on-change', this.value);
        },
        onKeyUpSearch() {
            this.data = this.list.filter(item => item.label.indexOf(this.searchValue) > -1);
            this.setPageResult(this.data, true);
            this.$emit('on-keyup', {
                value: this.searchValue,
                result: this.data
            });
        }
    }
};
</script>

