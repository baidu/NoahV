<template>
    <div>
        <NvTree
        :items="items"
        :search="search"
        :accordion="accordion"
        :draggable="draggable"
        :editMode="editMode"
        :checkbox="checkbox"
        :multiple="multiple"
        :appendIcon="appendIcon"
        :removeIcon="removeIcon"
        :editIcon="editIcon"
        :lazyLoad="lazyLoad"
        :loadData="loadData"
        :width="320"
        @on-check-change="onCheckChange"
        @on-select-change="onSelectChange"
        @on-expand-change="onExpandChange"
        >
        </NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeComplexDemo',
    data() {
        return {
            search: true,
            accordion: false,
            draggable: false,
            editMode: true,
            checkbox: true,
            multiple: false,
            lazyLoad: false,
            appendIcon: 'plus-small-square-o',
            removeIcon: 'minus-small-square-o',
            editIcon: 'edit-o',
            items: [
                {
                    title: 'node1',
                    name: 'node1',
                    icon: 'star',
                    children: [
                        {
                            title: 'node1-2',
                            name: 'node1-2',
                            icon: 'star',
                            children: [
                                {
                                    title: 'node1-2-1',
                                    name: 'node1-2-1',
                                    icon: 'star',
                                    children: [
                                        {
                                            title: 'node1-2-1-1',
                                            name: 'node1-2-1-1',
                                            icon: 'star',
                                            children: [
                                                {
                                                    title: 'node1-2-1-1-1',
                                                    name: 'node1-2-1-1-1',
                                                    icon: 'star'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'node1-2-1-2',
                                            name: 'node1-2-1-2',
                                            icon: 'star'
                                        }
                                    ]
                                },
                                {
                                    title: 'node1-2-2',
                                    name: 'node1-2-2',
                                    icon: 'star'
                                }
                            ]
                        },
                        {
                            title: 'node1-3',
                            name: 'node1-3',
                            icon: 'star',
                            children: [
                                {
                                    title: 'node1-3-1',
                                    name: 'node1-3-1',
                                    icon: 'star'
                                },
                                {
                                    title: 'node1-3-2',
                                    name: 'node1-3-2',
                                    icon: 'star'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'node2',
                    name: 'node2',
                    icon: 'star',
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
                    name: 'node3',
                    icon: 'star'
                }
            ]
        };
    },
    methods: {
        onSelectChange(item, items) {
            //console.log('on-select-change watched');
        },
        onCheckChange(item, items) {
            //console.log('on-check-change watched');
        },
        onExpandChange(item) {
            //console.log('on-expand-change watched');
        },
        loadData(item, callback) {
            // setTimeout(() => {
            //     const data = [
            //         {
            //             title: 'children1',
            //             children: []
            //         },
            //         {
            //             title: 'children2',
            //             children: []
            //         }
            //     ];
            //     callback(data);
            // }, 1000);
        }
    }
};
</script>

<style lang="less">
</style>
