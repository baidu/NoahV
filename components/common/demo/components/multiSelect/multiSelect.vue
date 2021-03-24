<template>
    <div>
        <NvMultiSelect
            v-model="model"
            :list="list"
            :hasAll="true"
            allText="全部"
            allValue="allname"
            searchPlaceHolder="请输入..."
            :hasSearch="true"
            width="300"
            :showTotalNumber="true"
            :pageSize="20"
            :pageNo="1"
            :distanceToBottom="50"
            :showAllLabel="true"
            :defaultNumber="50"
            @on-keyup="onKeyupSearchValue"
            @on-change="onChangeSelect"
        />
         <NvMultiSelect
            v-model="model2"
            :list="list2"
            :hasAll="true"
            allText="全部"
            allValue="allname2"
            searchPlaceHolder="请输入..."
            :hasSearch="true"
            width="300"
            :showTotalNumber="true"
            :pageSize="20"
            :pageNo="1"
            :distanceToBottom="50"
            :showAllLabel="true"
            :defaultNumber="50"
            @on-keyup="onKeyupSearchValue"
            @on-change="onChangeSelect"
        />
    </div>
</template>
<script>
import ButtonTpl from '../../../src/components/nv-button/buttonTpl.vue';
import button from '../button/button.vue';
export default {
    components: { button, ButtonTpl },
    data() {
        const list = [];
        const totalCount = 200;
        for (let i = 0; i < totalCount; i++) {
            list.push({
                'label': 'label' + i,
                'value': 'value' + i
            });
        }
        const list2 = [];
        for (let i = 0; i < totalCount; i++) {
            list2.push({
                'label': 'label-two-' + i,
                'value': 'value-two-' + i
            });
        }
        return {
            list: list,
            model: ['value1'],
            list2: list2,
            model2: ['value-two-2', 'value-two-3']
        };
    },
    methods: {
        onKeyupSearchValue(e) {
            // console.log(e);
        },
        onChangeSelect(e) {
            // console.log(e);
        }
    }
};
</script>

<style lang="less">
</style>
