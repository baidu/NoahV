<template>
    <NvDutyTable :name-list="nameList" :emptyText="emptyText" :default-start-time="startTime"/>
</template>

<script>
export default {
    name: 'test-calender',
    data() {
        return {
            nameList: [
                [{name: 'a', id: '1'}],
                [{name: 'b', id: '2'}],
                [{name: 'c', id: '3'}],
                [{name: 'd', id: '4'}],
                [{name: 'e', id: '5'}]
            ],
            emptyText: '轮空',
            startTime: '2019-11-11 00:00:00'
        };
    }
};
</script>
<style lang="less">
    li {
        list-style: none;
    }
</style>