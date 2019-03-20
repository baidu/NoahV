<template>
    <div class="steps-wrapper">
        <NvSteps
            :step="step"
            :datas="datas"
            :panelShow="show"
            :distance="distance"
            @on-change="changeHandler"
        >
            <div slot="detail">
              <div>
                  <h1>This is a demo for nv-steps</h1>
              </div>
            </div>
        </NvSteps>
    </div>
</template>

<script>
    export default {
        name: 'stepsDemo',
        data() {
            return {
                step: 7,
                distance: 7,
                show: true,
                datas: [
                    {
                        name: '阶段1',
                        status: 'finished'
                    },
                    {
                        name: '阶段2',
                        status: 'running'
                    },
                    {
                        name: '阶段3',
                        status: 'ready'
                    },
                    {
                        name: '阶段4',
                        status: 'ready'
                    },
                    {
                        name: '阶段5',
                        status: 'ready'
                    },
                    {
                        name: '阶段6',
                        status: 'ready'
                    },
                    {
                        name: '阶段7',
                        status: 'ready'
                    },
                    {
                        name: '阶段8',
                        status: 'ready'
                    }
                ]
            };
        },
        methods: {
            changeHandler: function () {
                
            }
        }
    };
</script>
<style lang="less">
</style>