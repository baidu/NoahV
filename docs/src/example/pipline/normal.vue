<template>
    <div class="pipline-wrapper">
        <Button @click="addNode" style="margin-bottom: 20px;">点击添加节点</Button>
        <Button @click="getData" style="margin-bottom: 20px;">获取数据</Button>
        <NvPipline 
            ref="piplineNodeRef"
            :cardMax="5"
            :data="pipLineNodes"
            :nodeTemplate="nodeTemplate"
            :cardTemplate="cardTemplate"
        >
            <template v-slot:cardContent="slotProps">
                <div class="card-body">
                    <p>卡片名称：{{slotProps.card.name}} </p>
                    <p>{{slotProps.card.description}}</p>
                </div>
            </template>
        </NvPipline>
    </div>
</template>

<script>
export default {
    name: 'piplineNormalDemo',
    data() {
        return {
            pipLineNodes: [
                {
                    cardSet: [
                        {
                            name: '卡片',
                            description: '这是一个可以自定义内容的卡片'
                        }
                    ]
                }
            ],
            nodeTemplate: {
                cardSet: [
                    {
                        name: '卡片',
                        description: '这是一个可以自定义内容的卡片'
                    }
                ]
            },
            cardTemplate: {
                name: '卡片',
                description: '这是一个可以自定义内容的卡片'
            }
        }
    },
    methods: {
        addNode() {
            this.$refs['piplineNodeRef'].addNode();
        },
        getData() {
            // 获取数据
            console.log(this.$refs['piplineNodeRef'].getNodeData());
            this.$Message.info('请到控制台查看数据');
        }
        
    }
};
</script>
<style lang="less">
    .pipline-wrapper {
        .card-body {
            padding: 0 5px;
            font-size: 12px;
            p {
                padding-left: 10px;
            }
            p:not(last-child){
                margin-bottom: 10px;
            }
            p label {
                width: 75px;
                display: inline-block;
            }
            p .ivu-input-wrapper {
                width: 185px;
            }
        }
    }
</style>
