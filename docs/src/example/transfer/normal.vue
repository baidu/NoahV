<template>
    <div class="transfer-wrapper">
        <NvTransfer
            leftTitle="源列表"
            rightTitle="目标列表"
            :options="options1"
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
    name: 'transferNormalDemo',
    data () {
        return {
            options1: []
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
