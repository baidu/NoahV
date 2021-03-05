<template>
    <div>
        <NvTree :items="items" :search="search" :checkbox="checkbox" @on-check-change="onCheckChangeHandler"></NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeCheckedDemo',
    data() {
        const self = this;
        return {
            search: true,
            checkbox: true,
            items: [
                {
                    title: 'node1',
                    name: 'node1',
                    icon: 'star',
                    children: [
                        {
                            title: 'node1-2',
                            name: 'node1-2',
                            icon: 'star'
                        },
                        {
                            title: 'node1-3',
                            name: 'node1-3',
                            icon: 'star'
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
        onCheckChangeHandler: function () {
            this.$Message.info('check changed');
        }
    }
};
</script>

<style lang="less">
</style>

