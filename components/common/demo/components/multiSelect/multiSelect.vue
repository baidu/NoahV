<template>
    <NvMultiSelect :list="list"
        :hasAll="true"
        allText="汇聚"
        searchInputPlaceholder="请输入..."
        :hasSearchInput="true"
        width="300px"
        :showTotalNumber="true"
        :pageSize="50"
        :pageNo="1"
        :distanceToBottom="50"
        @on-keyup="onKeyupSearchValue"
        @on-change="onChangeSelect"
    />
</template>
<script>
export default {
    data() {
        const list = [];
        const totalCount = 1001;
        for (let i = 0; i < totalCount; i++) {
            list.push({
                "name":"name" + i,
                "product":"product" + i,
                "comment":"comment" + i,
            });
        }
        return {
            list: list
        };
    },
    methods: {
        onKeyupSearchValue(e) {
            console.log(e)
        },
        onChangeSelect(e) {
            console.log(e)
        }
    }
};
</script>

<style lang="less">
</style>
