<template>
    <div>
        <NvTree
        :items="items"
        :draggable="draggable"
        :width="300">
        </NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeDragDemo',
    data() {
        const self = this;
        return {
            draggable: true,
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
