<template>
    <div :class="prefixCls">
        <div v-if="search" class="search-wrapper">
            <div class="search-btn" @click="searchHandler">
                <nv-icon type="search"></nv-icon>
            </div>
            <input
                v-model="searchValue"
                class="search-input"
                :placeholder="t('tree.placeholder')"
                @keyup="enterSearchHandler($event)"
            />
        </div>
        <div class="node-wrapper">
            <div class="panel">
                <span v-if="!dataSet.length && tip">{{tip}}</span>
                <NvTreeNode
                    v-for="(item, i) in dataSet"
                    :key="i"
                    :data="item"
                    :lazyLoad="lazyLoad"
                    :loadData="loadData"
                    :icon="item.icon"
                    :checkbox="checkbox"
                    :draggable="draggable"
                    :editMode="editMode"
                    :appendIcon="appendIcon"
                    :removeIcon="removeIcon"
                    :editIcon="editIcon"
                    :appendLabel="appendLabel"
                    :removeLabel="removeLabel"
                    :editLabel="editLabel"
                    :autoCheckBox="autoCheckBox"
                    :nodeTemplate="nodeTemplate"
                >
                </NvTreeNode>
            </div>
        </div>
    </div>
</template>
<script>
import uuidV4 from 'uuid/v4';
import tree from './tree.js';
import NvTreeNode from './node.vue';
import mixin from '../../mixins';

const prefixCls = "noahv-tree";

export default {
    name: 'NvTree',
    mixins: [tree, mixin],
    components: {
        NvTreeNode
    },
    props: {
        // 提示语，仅当传入数据为空时显示
        tip: String,
        // 是否开启搜索功能
        search: {
            type: Boolean,
            default: false
        },
        // 是否开启手风琴效果
        accordion: {
            type: Boolean,
            default: false
        },
        // 是否支持拖动功能
        draggable: {
            type: Boolean,
            default: false
        },
        // 是否支持编辑功能
        editMode: {
            type: Boolean,
            default: false
        },
        // 是否开启勾选框
        checkbox: {
            type: Boolean,
            default: false
        },
        // 点击文本，同时勾选
        autoCheckBox: {
            type: Boolean,
            default: false
        },
        // 是否支持多项选择（非勾选）
        multiple: {
            type: Boolean,
            default: false
        },
        // 添加节点按钮文本
        appendLabel: {
            type: String,
            default: 'Append'
        },
        // 删除节点按钮文本
        removeLabel: {
            type: String,
            default: 'Delete'
        },
        // 编辑节点按钮文本
        editLabel: {
            type: String,
            default: 'Edit'
        },
        // 添加节点图标，支持nv-icon
        appendIcon: {
            type: String,
            default: 'plus-small-square-o'
        },
        // 删除节点图标，支持nv-icon
        removeIcon: {
            type: String,
            default: 'minus-small-square-o'
        },
        // 编辑节点图标，支持nv-icon
        editIcon: {
            type: String,
            default: 'edit-o'
        },
        // 节点数据对象
        items: {
            type: Array,
            default() {
                return [];
            }
        },
        // 是否支持异步加载
        lazyLoad: {
            type: Boolean,
            default: false
        },
        // 异步加载方法
        loadData: {
            type: Function
        },
        // 新增节点模版
        nodeTemplate: {
            type: Function
        }
    },
    data() {
        return {
            prefixCls: prefixCls,
            // 数据配置项
            dataSet: {},
            // 搜索关键字
            searchValue: '',
            // 拖动过程数据
            transferData: {},
            // 函数防抖计时器
            timer: new Date(),
            // 选中状态的项
            selectedItems: [],
            // 勾选状态的项
            checkedItems: []
        };
    },
    created() {
        // 挂载监听事件
        this.$on('title-click-handler', item => {
            this.titleClickHandler(item);
        });
        this.$on('expand-change-handler', item => {
            this.expandChangeHandler(item);
        });
        // 如果启用勾选功能
        this.$on('check-click-handler', (event, item) => {
            this.checkBoxCheckedHandler(event, item);
        });
        // 如果启用编辑功能
        if (this.editMode) {
            this.$on('edit-click-handler', item => {
                this.editClickHandler(item);
            });
            this.$on('append-node-handler', (item, node) => {
                this.appendNodeHandler(item, node);
            });
            this.$on('remove-node-handler', item => {
                this.removeNodeHandler(item);
            });
        }
        // 如果启用懒加载功能
        if (this.lazyLoad) {
            this.$on('lazy-load-handler', (item, children) => {
                this.lazyLoadHandler(item, children);
            });
        }
        // 如果启用拖动功能
        if (this.draggable) {
            this.$on('drag-start-handler', (event, item) => {
                this.dragStartHandler(event, item);
            });
            this.$on('drag-over-handler', (event, item) => {
                // 函数防抖，降低执行频率
                let now = new Date();
                let interval = now.getTime() - this.timer.getTime();
                if (interval > 100) {
                    this.dragOverHandler(event, item);
                    this.timer = now;
                }
            });
            this.$on('drag-drop-handler', (event, item) => {
                this.dragDropHandler(event, item);
            });
            this.$on('drag-end-handler', () => {
                this.dragEndHandler();
            });
        }
    },
    watch: {
        items: {
            deep: true,
            immediate: true,
            handler(val) {
                this.dataSet = val;
                // improve performance
                if (this.editMode) {
                    this.buildTree(this.dataSet, 0);
                }
                if (this.checkbox || this.lazyLoad || this.search || this.accordion || this.editMode || this.draggable) {
                    this.getLinkedTree(this.dataSet);
                }                
            }
        }
    },
    methods: {
        /**
         * 构建树结构
         *
         * @param {Array} items 所有节点对象集合
         * @param {number} level 当前节点的层级
         */
        buildTree(items, level) {
            items.forEach(node => {
                this.$set(node, 'level', level);
                if (node.children && node.children.length) {
                    this.buildTree(node.children, level + 1);
                }
            });
        },
        /**
         * 构建父子关系
         *
         * @param {Array} items 待修改的对象集合
         *
         */
        getLinkedTree(items) {
            // 原始for循环性能更好
            for (let i = 0, len = items.length; i < len; i++) {
                if (items[i].level === 0) {
                    items[i].parent = null;
                }
                if (items[i].children && items[i].children.length > 0) {
                    items[i].children.forEach(value => {
                        value.parent = items[i];
                    });
                    this.getLinkedTree(items[i].children);
                }
            }
        },
        /**
         * 搜索功能处理，回车键执行搜索功能
         *
         * @param {Object} event 回车事件
         */
        enterSearchHandler(event) {
            let e = event || window.event;
            if (this.search && e.keyCode === 13) {
                this.searchHandler();
            }
            event.stopPropagation();
        },
        /**
         * 搜索功能处理，点击按钮执行搜索
         *
         */
        searchHandler() {
            if (this.searchValue !== '') {
                this.searchSubNodeHandler(this.dataSet);
            }
        },
        /**
         * 搜索符合条件的节点，并展开路径
         *
         * @param {Array} items 节点对象集合
         */
        searchSubNodeHandler(items) {
            items.forEach(node => {
                if (node.title.indexOf(this.searchValue) > -1) {
                    this.$set(node, 'selected', true);
                    let parent = node.parent;
                    while (parent) {
                        this.$set(parent, 'spread', true);
                        parent = parent.parent;
                    }
                }
                else {
                    this.$set(node, 'selected', false);
                }
                if (node.children && node.children.length) {
                    this.searchSubNodeHandler(node.children);
                }
            });
        },
        /**
         * 勾选节点处理
         *
         * @param {Object} item 结点对象
         */
        checkBoxCheckedHandler(event, item) {
            this.$emit('on-check-change', event, item, this.getCheckedNodes());
        },
        /**
         * 节点展开变化
         *
         * @param {Object} item 结点对象
         */
        expandChangeHandler(item) {
            this.$set(item, 'spread', !item.spread);
            if (this.accordion) {
                this.accordionExpandControl(item);
            }
            this.$emit('on-expand-change', item);
        },
        /**
         * 手风琴处理
         *
         * @param {Object} item 结点对象
         */
        accordionExpandControl(item) {
            let parentItem = item.parent || this.dataSet;
            let type = Object.prototype.toString.call(parentItem).toLowerCase();
            if (type === '[object array]') {
                parentItem.forEach(node => {
                    if (node !== item) {
                        this.$set(node, 'spread', false);
                    }
                });
            }
            if (type === '[object object]') {
                parentItem.children.forEach(node => {
                    if (node !== item) {
                        this.$set(node, 'spread', false);
                    }
                });
            }
        },
        /**
         * 点击节点文本选择节点
         *
         * @param {Object} item 结点对象
         */
        titleClickHandler(item) {
            if (!item.disabled) {
                if (this.multiple) {
                    if (item.selected) {
                        // 先剔除，再更新，顺序不可更换
                        this.updateSelectedItems(item);
                        this.$set(item, 'selected', !item.selected);
                    }
                    else {
                        // 先更新，再添加，顺序不可更换
                        this.$set(item, 'selected', !item.selected);
                        this.selectedItems.push(item);
                    }
                }
                else {
                    this.selectHandler(this.dataSet, item);
                }
            }
            this.$emit('on-select-change', item, this.selectedItems);
        },
        /**
         * 更新选中集合
         *
         * @param {Object} 当前变更的项
         */
        updateSelectedItems(item) {
            for (let i = 0, len = this.selectedItems.length; i < len; i++) {
                if (item === this.selectedItems[i]) {
                    this.selectedItems.splice(i, 1);
                    break;
                }
            }
        },
        /**
         * 选择逻辑处理
         *
         * @param {Array} datas 结点集合
         * @param {Object} item 节点对象
         */
        selectHandler(datas, item) {
            datas.forEach(node => {
                if (item === node) {
                    this.$set(node, 'selected', !node.selected);
                    if (node.selected) {
                        this.selectedItems[0] = node;
                    }
                    else {
                        this.selectedItems = [];
                    }
                }
                else {
                    this.$set(node, 'selected', false);
                }
                if (node.children && node.children.length) {
                    this.selectHandler(node.children, item);
                }
            });
        },
        /**
         * 显示title编辑框
         *
         * @param {Object} item 当前节点对象
         */
        editClickHandler(item) {
            this.$set(item, 'editing', true);
        },
        /**
         * 添加节点处理逻辑
         *
         * @param {Object} item 要添加子节点的当前节点
         * @param {Object} node 将添加的子节点
         */
        appendNodeHandler(item, node) {
            this.$set(item, 'children', item.children || []);
            item.children.push(node);
            this.$set(item, 'spread', true);
            // 当父节勾选中时，处理祖先节点的勾选逻辑
            if (node.parent && (node.parent.checked || node.parent.partChecked)) {
                this.updateAncestorNodeCheckedHandler(node);
            }
        },
        /**
         * 删除节点处理逻辑
         *
         * @param {Object} item 要删除的节点
         */
        removeNodeHandler(item) {
            if (item.parent) {
                let children = item.parent.children;
                let index = children.indexOf(item);
                children.splice(index, 1);
                if (!children.length) {
                    this.$set(item.parent, 'spread', false);
                }
            }
            else {
                let index = this.dataSet.indexOf(item);
                this.dataSet.splice(index, 1);
            }
            // 当父节勾选中时，处理祖先节点的勾选逻辑
            if (item.parent && (item.parent.checked || item.parent.partChecked)) {
                this.updateAncestorNodeCheckedHandler(item);
            }
        },
        /**
         * 懒加载处理逻辑
         *
         * @param {Object} item 要处理的节点对象
         * @param {Array} children 添加的子节点对象
         */
        lazyLoadHandler(item, children) {
            if (item) {
                if (children && children.length) {
                    this.$set(item, 'children', children);
                    this.$set(item, 'spread', true);
                    this.$set(item, 'loading', false);
                    if (this.editMode) {
                        // improve performance
                        this.buildTree(item.children, item.level + 1);
                    }
                    this.getLinkedTree(item.children);
                }
                else {
                    this.$set(item, 'lazyable', false);
                    this.$set(item, 'loading', false);
                }
            }
        },
        /**
         * 拖动开始处理逻辑
         *
         * @param {Object} event 拖动开始事件
         * @param {Object} item 拖动的原节点
         */
        dragStartHandler(event, item) {
            this.$set(item, 'status', 'dragging');
            this.transferData.dragSource = item;
        },
        /**
         * 拖动过程处理逻辑
         *
         * @param {Object} event 拖动过程事件
         * @param {Object} node 当前滑过的节点
         */
        dragOverHandler(event, node) {
            let sourceItem = this.transferData.dragSource;
            this.setDragStatusHandler(this.dataSet);
            this.$set(sourceItem, 'status', 'dragging');
            if (node !== sourceItem) {
                if (node === this.dataSet[0]) {
                    // 处理顶部节点的特殊情况
                    if (event.offsetY > 0 && event.offsetY <= 5) {
                        this.$set(node, 'status', 'dragenter');
                    }
                }
                if (event.offsetY > 5 && event.offsetY <= 15) {
                    this.$set(node, 'status', 'dragover');
                }
                else if (event.offsetY > 15) {
                    this.$set(node, 'status', 'dragleave');
                }
            }
        },
        /**
         * 拖动放置处理逻辑
         *
         * @param {Object} event 拖动放置事件
         * @param {Object} node 拖动结束的放置节点
         */
        dragDropHandler(event, node) {
            let sourceItem = this.transferData.dragSource;
            let rawParent = sourceItem.parent;
            let isAncestorNode = this.isAncestorNode(sourceItem, node);
            if (!isAncestorNode) {
                if (node.status === 'dragover') {
                    this.removeNodeHandler(sourceItem);
                    this.$set(node, 'children', node.children || []);
                    node.children.push(sourceItem);
                    this.$set(node, 'spread', true);
                }
                else if (node.status === 'dragenter') {
                    // 处理顶部节点的特殊情况
                    this.removeNodeHandler(sourceItem);
                    this.dataSet.splice(0, 0, sourceItem);
                }
                else if (node.status === 'dragleave') {
                    this.removeNodeHandler(sourceItem);
                    let containerItem = node.parent ? node.parent.children : this.dataSet;
                    let index = containerItem.indexOf(node);
                    containerItem.splice(index + 1, 0, sourceItem);
                }
                if (this.editMode) {
                    // improve performance
                    this.buildTree(this.dataSet, 0);
                }
                
                this.getLinkedTree(this.dataSet);

                // 处理原位置祖先节点的选中逻辑
                if (rawParent && rawParent.children && rawParent.children.length) {
                    this.updateAncestorNodeCheckedHandler(rawParent.children[0]);
                }
                // 处理现位置祖先节点的选中逻辑
                this.updateAncestorNodeCheckedHandler(sourceItem);
            }
        },
        /**
         * 拖动结束处理逻辑，处理拖动位置处于拖动区域外的情况
         *
         * @param {Object} event 拖动结束事件
         * @param {Object} node 拖动结束的放置节点
         */
        dragEndHandler() {
            this.setDragStatusHandler(this.dataSet);
        },
        /**
         * 获取被选中的节点集合，对外暴露的接口
         *
         * @return {Array} 获取被选中的节点集合
         */
        getSelectedNodes() {
            return this.selectedItems;
        },
        /**
         * 获取被勾选的节点集合，对外暴露的接口
         *
         * @return {Array} 被勾选的节点集合
         */
        getCheckedNodes() {
            this.checkedItems = [];
            this.getAllCheckedNodes(this.dataSet);
            return this.checkedItems;
        },
        /**
         * 获取被勾选的节点集合
         *
         * @return {Array} items 节点集合
         */
        getAllCheckedNodes(items) {
            items.forEach(node => {
                if (node.checked && !node.partChecked && !(node.disabled || node.disabledCheckbox)) {
                    this.checkedItems.push(node);
                }
                if (node.children && node.children.length) {
                    this.getAllCheckedNodes(node.children);
                }
            });
        }
    }
};
</script>

