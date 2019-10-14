<template>
    <div class="transfer-wrapper">
        <h3 style="margin: 40px 0 20px 0;">一、简单穿梭框</h3>
        <NvTransfer
            leftTitle="源列表"
            rightTitle="目标列表"
            :options="options1"
            :leftSearch="true"
            :rightSearch="true"
            :leftDisabled="false"
            :rightDisabled="false"
            @on-change="change"
        >
        </NvTransfer>

        <h3 style="margin: 40px 0 20px 0;">二、支持分组的穿梭框</h3>
        <NvTransfer
            leftTitle="源列表"
            rightTitle="目标列表"
            :options="options2"
            :leftSearch="true"
            :rightSearch="true"
            :leftDisabled="false"
            :rightDisabled="false"
            @on-change="change"
        >
        </NvTransfer>
    </div>
</template>

<script>
export default {
    name: 'transferDemo',
    data () {
        return {
            options1: [],
            options2: [],
        }
    },
    created() {

        let group = [];
        for (let j = 1; j< 10; j++) {
            let node = {};
            node.name = j;
            node.title = j + '.app1.bidtest.com';
            node.checkbox = true;
            group.push(node);
        }
        this.options1 = group;
            

        let serviceGroup = [];
        for (let i = 1; i < 20; i++) {
            let service = {};
            service.id = i;
            service.name = i;
            service.title = 'service' + i;
            service.children = [];
            for (let j = 1; j< 10; j++) {
                let node = {};
                node.name = i + '-' + j;
                node.title = j + '.app1.bidtest.com';
                node.checkbox = false;
                service.children.push(node);
            }
            serviceGroup.push(service);
        }
        this.options2 = serviceGroup;
    },
    methods: {
        change() {

        }
    }
};
</script>
<style lang="less">
    @import './transfer.less';
</style>
