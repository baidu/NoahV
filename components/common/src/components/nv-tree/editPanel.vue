<template>
    <div class="edit-panel">
        <span v-if="editIcon" @click="editClickHandler(data)">
            <nv-icon :type="editIcon"></nv-icon>
        </span>
        <span v-else-if="editLabel" @click="editClickHandler(data)">
            {{editLabel}}
        </span>
        <span v-if="appendIcon" @click="appendClickHandler(data)">
            <nv-icon :type="appendIcon"></nv-icon>
        </span>
        <span v-else-if="appendLabel" @click="appendClickHandler(data)">
            {{appendLabel}}
        </span>
        <span v-if="removeIcon" @click="removeClickHandler(data)">
            <nv-icon :type="removeIcon"></nv-icon>
        </span>
        <span v-else-if="removeLabel" @click="removeClickHandler(data)">
            {{removeLabel}}
        </span>
    </div>
</template>
<script>
import tree from './tree.js';

export default {
    name: 'NvTreeNodeEditPanel',
    mixins: [tree],
    props: {
        data: {
            type: Object,
            default() {
                return {};
            }
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
        nodeTemplate: {
            type: Function
        }
    },
    data() {
        return {
        };
    },
    methods: {
        /**
         * 编辑按钮点击处理逻辑
         *
         * @param {Object} item 结点对象
         */
        editClickHandler(item) {
            this.dispatch('NvTree', 'edit-click-handler', item);
        },
        /**
         * 添加按钮点击处理逻辑
         *
         * @param {Object} item 结点对象
         */
        appendClickHandler(item) {
            let node = this.getNewNode(item);
            this.dispatch('NvTree', 'append-node-handler', [item, node]);
        },
        /**
         * 移除按钮点击处理逻辑
         *
         * @param {Object} item 结点对象
         */
        removeClickHandler(item) {
            this.dispatch('NvTree', 'remove-node-handler', item);
        },
        getNewNode(item) {
            let hash = (new Date()).getTime();
            let node = {};
            if (this.nodeTemplate) {
                node = this.nodeTemplate();
            }
            else {
                node = {
                    title: 'new node',
                    name: hash,
                    selected: false,
                    disabled: false,
                    disabledCheckbox: false,
                    checkbox: item.checkbox,
                    checked: false,
                    partChecked: false,
                    editMode: item.editMode,
                    editing: false,
                    spread: false,
                    level: item.level + 1,
                    parent: item,
                    appendLabel: item.appendLabel,
                    removeLabel: item.removeLabel,
                    editLabel: item.editLabel,
                    appendIcon: item.appendIcon,
                    removeIcon: item.removeIcon,
                    editIcon: item.editIcon,
                    status: 'static',
                    lazy: true,
                    children: []
                };
            }
            return node;
        }
    }
};
</script>
