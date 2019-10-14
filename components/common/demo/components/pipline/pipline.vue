<template>
    <div class="pipline-wrapper">
        <Button @click="addNode" style="margin-bottom: 20px;">点击添加步骤</Button>
        <Button @click="getData" style="margin-bottom: 20px;">获取数据</Button>
        <NvPipline 
            ref="piplineNodeRef"
            :data="pipLineNodes"
            :nodeTitle="nodeTitle"
            :nodeTemplate="nodeTemplate"
            :cardTemplate="cardTemplate"
            :cardTitle="cardTitle"
        >
            <template v-slot:cardContent="slotProps">
                <div class="card-body">
                    <p>
                        <label>脚本名：</label>
                        <Input v-model="slotProps.card.name" />
                    </p>
                    <p>
                        <label>执行账户：</label>
                        <Input v-model="slotProps.card.account" />
                    </p>
                    <p>
                        <label>超时时间(s)：</label>
                        <Input v-model="slotProps.card.timeout" />
                    </p>
                    <p>
                        <label>脚本描述：</label>
                        <Input v-model="slotProps.card.description"/>
                    </p>
                </div>
            </template>
        </NvPipline>
    </div>
</template>

<script>
    export default {
        name: 'piplineDemo',
        data() {
            return {
                pipLineNodes: [
                    {
                        cardSet: [
                            {
                                account: 'work',
                                timeout: '600',
                                name: '升级基础环境',
                                description: '用于升级机器基础环境'
                            }
                        ]
                    }
                ],
                nodeTitle: '步骤',
                cardTitle: '并行脚本',
                nodeTemplate: {
                    cardSet: [
                        {
                            account: '',
                            timeout: '',
                            name: '',
                            description: ''
                        }
                    ]
                },
                cardTemplate: {
                    account: '',
                    timeout: '',
                    name: '',
                    description: ''
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
    @import './pipline.less';
</style>
