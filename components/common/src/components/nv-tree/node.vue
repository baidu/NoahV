<template>
    <ul
        :class="{'hidden': item.hidden}"
        :draggable="draggable"
        @dragstart="dragStartHandler($event, item)"
        @dragover="dragOverHandler($event, item)"
        @drop="dragDropHandler($event, item)"
        @dragend="dragEndHandler($event, item)"
    >
        <li>
            <div :class="getNodeCls(item)">
                <div class="node-body">
                    <span>
                        <div class="node-arrow">
                            <span
                                v-if="(item.children && item.children.length) || item.lazyable"
                                :class="getArrowCls(item)"
                                @click="expandHandler(item)"
                            >
                            </span>
                        </div>
                        <span v-if="item.hasOwnProperty('checkbox') ? item.checkbox : checkbox" class="node-checkbox">
                            <label
                                :class="getCheckBoxCls(item)"
                                @click="checkedClickHandler($event, item)"
                            >
                            </label>
                        </span>
                        <nv-icon
                            v-if="item.icon"
                            :type="item.icon"
                            class="tree-icon"
                        >
                        </nv-icon>
                    </span>
                    <span
                        v-if="!item.editing"
                        :class="getTitleCls(item)"
                        @click="titleClick(item)"
                    >
                        {{item.title}}
                    </span>
                    <input
                        v-focus
                        v-if="editMode && item.editing"
                        v-model="item.title"
                        class="edit-input"
                        @blur="blurHandler(item)"
                    />
                </div>
                <NvTreeNodeEditPanel
                    v-if="item.editMode || editMode"
                    :data="item"
                    :appendIcon="appendIcon"
                    :removeIcon="removeIcon"
                    :editIcon="editIcon"
                    :appendLabel="appendLabel"
                    :removeLabel="removeLabel"
                    :editLabel="editLabel"
                    :nodeTemplate="nodeTemplate"
                >
                </NvTreeNodeEditPanel>
            </div>
            <NvTreeNode
                v-if="item.children && item.spread"
                v-for="(subItem, i) in item.children"
                :key="i"
                :data="subItem"
                :icon="item.icon"
                :checkbox="checkbox"
                :lazyLoad="lazyLoad"
                :loadData="loadData"
                :draggable="draggable"
                :editMode="editMode"
                :appendIcon="appendIcon"
                :removeIcon="removeIcon"
                :editIcon="editIcon"
                :appendLabel="appendLabel"
                :removeLabel="removeLabel"
                :editLabel="editLabel"
                :nodeTemplate="nodeTemplate"
            >
            </NvTreeNode>
        </li>
    </ul>
</template>
<script>
import tree from './tree.js';
import NvTreeNodeEditPanel from './editPanel';

export default {
    name: 'NvTreeNode',
    mixins: [tree],
    components: {
        NvTreeNodeEditPanel
    },
    props: {
        data: {
            type: Object,
            default() {
                return {};
            }
        },
        checkbox: {
            type: Boolean,
            default: false
        },
        draggable: {
            type: Boolean,
            default: false
        },
        editMode: {
            type: Boolean,
            default: false
        },
        lazyLoad: {
            type: Boolean,
            default: false
        },
        loadData: {
            type: Function
        },
        nodeTemplate: {
            type: Function
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
        }
    },
    data() {
        return {
            item: []
        };
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler(val) {
                this.item = val;
            }
        }
    },
    methods: {
        /**
         * 获得节点的样式
         *
         * @param {Object} item 节点对象
         * @return {Object} 返回节点样式集合
         */
        getNodeCls(item) {
            return [
                'tree-node',
                {
                    'node-dragging': item.status === 'dragging',
                    'node-dragging-enter': item.status === 'dragenter',
                    'node-dragging-leave': item.status === 'dragleave',
                    'node-dragging-over': item.status === 'dragover'
                }
            ];
        },
        /**
         * 获得节点title样式
         *
         * @param {Object} item 节点对象
         * @return {Object} 返回节点样式集合
         */
        getTitleCls(item) {
            return [
                'node-title',
                {
                    'node-disabled': item.disabled,
                    'node-selected': item.selected && !item.disabled
                }
            ];
        },
        /**
         * 获得节点的展开样式
         *
         * @param {Object} item 节点对象
         * @return {Object} 返回节点展开样式集合
         */
        getArrowCls(item) {
            return [
                {
                    'arrow-normal': !item.spread && !item.loading,
                    'arrow-expand': item.spread && !item.loading,
                    'loading': item.loading
                }
            ];
        },
        /**
         * 获得节点的选中样式
         *
         * @param {Object} item 节点对象
         * @return {Object} 返回节点选中样式集合
         */
        getCheckBoxCls(item) {
            let showCheckBox = item.hasOwnProperty('checkbox') ? item.checkbox : this.checkbox;
            return [
                {
                    'node-checked': showCheckBox && !item.disabled && item.checked && !item.partChecked,
                    'node-part-checked': showCheckBox && !item.disabled && !item.disabledCheckbox && !item.checked && item.partChecked,
                    'node-disabled': showCheckBox && item.disabled,
                    'node-disabled-checked': showCheckBox && item.disabled && item.checked && !item.partChecked,
                    'node-disabled-part-checked': showCheckBox && item.disabled && !item.checked && item.partChecked,
                    'node-disabled-checked-box': showCheckBox && item.disabledCheckbox
                }
            ];
        },
        /**
         * 展开处理逻辑
         *
         * @param {Object} item 节点对象
         */
        expandHandler(item) {
            if (this.lazyLoad && this.loadData && item.lazyable && (!item.children || !item.children.length)) {
                this.$set(item, 'loading', true);
                this.loadData(item, children => {
                    this.dispatch('NvTree', 'lazy-load-handler', [item, children]);
                });
            }
            if (item.children && item.children.length) {
                this.dispatch('NvTree', 'expand-change-handler', item);
            }
        },
        /**
         * checkbox勾选状态处理逻辑
         *
         * @param {Object} item 节点对象
         */
        checkedClickHandler(event, item) {
            if (item.disabled || item.disabledCheckbox) {
                return;
            }
            this.$set(item, 'checked', !item.checked);
            this.$set(item, 'partChecked', false);
            // 更新子节点状态
            this.updateSubNodeCheckedHandler(item);
            // 处理祖先节点的勾选逻辑
            this.updateAncestorNodeCheckedHandler(item);
            // 派发事件
            this.dispatch('NvTree', 'check-click-handler', [event, item]);
        },
        /**
         * 点击节点文本选择节点逻辑
         *
         * @param {Object} item 节点对象
         */
        titleClick(item) {
            if (item.disabled) {
                return;
            }
            this.dispatch('NvTree', 'title-click-handler', item);
        },
        /**
         * 关闭title编辑框
         *
         * @param {Object} item 节点对象
         */
        blurHandler(item) {
            this.$set(item, 'editing', false);
        },
        /**
         * 拖动开始处理逻辑
         *
         * @param {Object} event 拖动开始事件
         * @param {Object} item 拖动开始的节点对象
         */
        dragStartHandler(event, item) {
            event.stopPropagation();
            this.dispatch('NvTree', 'drag-start-handler', [event, item]);
        },
        /**
         * 拖动覆盖处理逻辑
         *
         * @param {Object} event 拖动覆盖事件
         * @param {Object} item 覆盖节点对象
         */
        dragOverHandler(event, item) {
            event.preventDefault();
            event.stopPropagation();
            this.dispatch('NvTree', 'drag-over-handler', [event, item]);
        },
        /**
         * 拖动放置处理逻辑
         *
         * @param {Object} event 拖动放置事件
         * @param {Object} item 放置节点对象
         */
        dragDropHandler(event, item) {
            event.preventDefault();
            event.stopPropagation();
            this.dispatch('NvTree', 'drag-drop-handler', [event, item]);
        },
        /**
         * 拖动结束处理逻辑
         *
         */
        dragEndHandler() {
            event.preventDefault();
            event.stopPropagation();
            this.dispatch('NvTree', 'drag-end-handler');
        }
    }
};
</script>
