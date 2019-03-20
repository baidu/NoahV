<template>
    <div class="theme-demo">
        <h3>单选菜单</h3>
        <Select v-model="model1" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select :disabled="true" style="width:100px">
        </Select>
        <h3>多选菜单</h3>
        <Select v-model="model2" multiple style="width:140px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <h3>与搜索框结合</h3>
        <Select v-model="model3" filterable style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model4" filterable multiple style="width:300px;vertical-align: top;">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select></br></br>
        特殊样式， 组件/项目自定义
    </div>
</template>
<script>
export default {
    data() {
        return {
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            model1: '',
            model2: [],
            model3: '',
            model4: []
        };
    },
    methods: {
        info() {
            this.$Message.info({content: 'This is a info tip', duration: 3, closable: false});
        }
    }
};
</script>

<style lang="less">
.theme-demo {
    h3 {
        margin: 10px 0;
    }
}
</style>
