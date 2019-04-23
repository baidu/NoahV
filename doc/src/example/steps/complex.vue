<template>
    <div class="steps-wrapper">
          <NvSteps :datas="datas" :step="step" :distance="distance" :panelShow="show" @on-change="changeHandler">
              <div slot="detail">
                  <div class="detail-main-panel">
                      <h3>{{content}}</h3>
                  </div>
              </div>
          </NvSteps>
    </div>
</template>

<script>

export default {
    name: 'saStepComplexDemo',
    data() {
        return {
            step: 1,
            distance: 7,
            show: true,
            content: 'This is a detail for "阶段2"',
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
    },
    methods: {
        changeHandler: function (item) {
            this.content = 'This is a detail for "' + item.name + '"';
        }
    }
};
</script>
<style lang="less">
    .detail-main-panel {
        padding: 10px 10px;
    }
</style>
