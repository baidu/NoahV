<template>
    <div>
        <NvTree
        :items="items"
        :editMode="editMode"
        :appendIcon="appendIcon"
        :removeIcon="removeIcon"
        :editIcon="editIcon"
        :width="300">
        </NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeEditDemo',
    data() {
        const self = this;
        return {
            editMode: true,
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
                            name: 'node1-2'
                        },
                        {
                            title: 'node1-3',
                            name: 'node1-3'
                        }
                    ]
                },
                {
                    title: 'node2',
                    name: 'node2',
                    children: [
                        {
                            title: 'node2-1',
                            name: 'node2-1'
                        },
                        {
                            title: 'node2-2',
                            name: 'node2-2'
                        }
                    ]

                },
                {
                    title: 'node3',
                    name: 'node3'
                }
            ]
        };
    }
};
</script>

<style lang="less">
</style>
