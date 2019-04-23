<template>
    <div>
        <NvSteps :datas="datas" :step="step" :distance="distance"></NvSteps>
    </div>
</template>

<script>
export default {
    name: 'saStepNormalDemo',
    data() {
        return {
            step: 7,
            distance: 7,
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
                },
                {
                    name: '阶段9',
                    status: 'ready'
                },
                {
                    name: '阶段10',
                    status: 'ready'
                }
            ]
        };
    }
};
</script>

<style lang="less" >
</style>
