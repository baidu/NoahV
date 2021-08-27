<template>
    <div style="width:420px; overflow-x: auto; border: 1px solid #000;">
        <NvTree
            ref="nvTreeRef"
            :width="400"
            :tip="data.tip"
            :items="data.items"
            :search="data.search"
            :editMode="data.editable"
            :checkbox="data.checkbox"
            :multiple="data.multiple"
            :accordion="data.accordion"
            :draggable="data.draggable"
            :appendIcon="data.appendIcon"
            :removeIcon="data.removeIcon"
            :editIcon="data.editIcon"
            :autoCheckBox="data.autoCheckBox"
            :mouseDown="data.useMouseDownEvent"
            @on-mousedown="onMouseDown"
            @on-check-change="onCheckChange"
            @on-select-change="onSelectChange"
            @on-expand-change="onExpandChange">
        </NvTree>
    </div>
</template>

<script>
export default {
    name: 'treeDemo',
    data() {
        const self = this;
        return {
            data: {
                tip: '未获取到数据',
                search: true,
                accordion: false,
                draggable: false,
                editable: false,
                checkbox: false,
                multiple: false,
                autoCheckBox: false,
                useMouseDownEvent: false,
                appendLabel: 'Append',
                removeLabel: 'Delete',
                editLabel: 'Edit',
                appendIcon: 'plus-small-square-o',
                removeIcon: 'minus-small-square-o',
                editIcon: 'edit-o',
                items: [
                    {
                        title: 'node1',
                        name: 'node1',
                        children: [
                            {
                                title: 'node1-2',
                                name: 'node1-2',
                                children: [
                                    {
                                        title: 'node1-2-1',
                                        name: 'node1-2-1',
                                        children: [
                                            {
                                                title: 'node1-2-1-1',
                                                name: 'node1-2-1-1',
                                                children: [
                                                    {
                                                        title: 'node1-2-1-1-1',
                                                        name: 'node1-2-1-1-1'
                                                    }
                                                ]
                                            },
                                            {
                                                title: 'node1-2-1-2',
                                                name: 'node1-2-1-2'
                                            }
                                        ]
                                    },
                                    {
                                        title: 'node1-2-2',
                                        name: 'node1-2-2'
                                    }
                                ]
                            },
                            {
                                title: 'node1-3',
                                name: 'node1-3',
                                children: [
                                    {
                                        title: 'node1-3-1',
                                        name: 'node1-3-1'
                                    },
                                    {
                                        title: 'node1-3-2',
                                        name: 'node1-3-2'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'node2',
                        name: 'node2',
                        children: [
                            {
                                title: 'node2-1',
                                name: 'node2-1',
                                icon: 'star'
                            },
                            {
                                title: 'node2-2',
                                name: 'node2-2',
                                icon: 'star'
                            }
                        ]

                    },
                    {
                        title: 'node3',
                        name: 'node3'
                    }
                ]
            }

        };
    },
    methods: {
        onMouseDown(event, item, dataList) {
            console.log('on-mousedown watched');
        },
        onSelectChange(item, items) {
            console.log('on-select-change watched');
        },
        onCheckChange(event, item, items) {
            console.log('on-check-change watched');
        },
        onExpandChange(item) {
            console.log('on-expand-change watched');
        }
    }
};
</script>

<style lang="less">
    .node-wrapper .panel ul {
        margin-bottom: 0;
    }
</style>
