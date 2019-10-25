<template>
    <div class="transfer-wrapper">
        <NvTransfer
            leftTitle="源列表"
            rightTitle="目标列表"
            :options="options2"
            :leftDisabled="false"
            :rightDisabled="false"
            @on-change="transChange"
            @on-checked-change="checkedChange"
        >
        </NvTransfer>
    </div>
</template>

<script>
export default {
    name: 'transferComplexDemo',
    data () {
        return {
            options2: [],
        }
    },
    created() {
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
        transChange(leftOptions, rightOptions) {
            console.log('移动事件');
            console.log(leftOptions);
            console.log(rightOptions);
        },
        checkedChange(leftChecked, rightChecked) {
            console.log('勾选事件');
            console.log(leftChecked);
            console.log(rightChecked);
        }
    }
};
</script>
<style lang="less">
    .transfer-wrapper {
        .noahv-transfer {
            .noahv-pool {
                .noahv-tree .node-wrapper .panel  ul {
                    margin-bottom: 5px;
                }
            }
            .noahv-checkbox-checked .checkbox:after {
                top: 6px;
            }
            .noahv-checkbox-partial-checked .checkbox:after {
                top: 9px;
            }
        }
    }
</style>
