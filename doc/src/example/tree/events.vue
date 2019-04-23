<template>
    <div>
        <NvTree
        :items="items"
        :width="300"
        @on-select-change="onSelectChangeHandler"
        @on-expand-change="onExpandChangeHandler"
        >
        </NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeEventsDemo',
    data() {
        const self = this;
        return {
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
    },
    methods: {
        onSelectChangeHandler: function () {
            this.$Message.info('select changed');
        },
        onExpandChangeHandler: function () {
            this.$Message.info('expand changed');
        }
    }
};
</script>

<style lang="less">
</style>
