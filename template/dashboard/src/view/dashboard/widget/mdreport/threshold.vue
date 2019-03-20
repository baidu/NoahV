<template>
    <div class="threshold-holder">
        <Row>
            <Col span="6">
                <div class="common-tip">
                    <span>阈值</span>
                    <colorPicker v-model="stepColor" :bColor="bColor" v-on:change="headleChangeColor"></colorPicker>
                </div>
            </Col>
            <Col span="4">
                <InputNumber :max="stepEnd" v-model="stepStart"></InputNumber>
            </Col>
            <Col span="4">
                <InputNumber :min="stepStart" v-model="stepEnd"></InputNumber>
            </Col>
            <Col span="5">
                <Button type="primary" class="color-add" @click="addStep()">
                    <sa-icon type="plus"></sa-icon>
                </Button>
            </Col>
            <Col span="20">
                <ul class="threadhold-list">
                    <li v-for="step in stepColors" :style="{background: step.color}">
                        <span>{{step.start}}-{{step.end}}</span>
                        <a href="javascript:;" @click="deleteStep(step.index)">
                            <sa-icon type="close"></sa-icon>
                        </a>
                    </li>
                </ul>
            </Col>
        </Row>
    </div>
</template>
<script>
import colorPicker from '../common/colorPicker';
export default {
    props: {
        threshold: Array
    },
    components: {
        colorPicker
    },
    watch: {
        threshold(val) {
            let stepColors = [];
            if (val) {
                val.forEach((item, index) => {
                    stepColors.push({
                        index: index + 1,
                        color: item[2],
                        start: item[0],
                        end: item[1]
                    });
                });
            }
            this.stepColors = stepColors;
        }
    },
    data() {
        let stepColors = [];
        let threshold = this.threshold || [];
        threshold.forEach((item, index) => {
            stepColors.push({
                index: index + 1,
                color: item[2],
                start: item[0],
                end: item[1]
            });
        });
        return {
            colors: ['#2ecb73', '#ffc91b', '#ff5d4c', '#37a3fb', '#4d63f7', '#4d63f7', '#914df7', '#914df7'],
            stepColor: '#2ecb73',
            stepStart: 0,
            stepEnd: 0,
            bColor: ['#2ecb73', '#ffc91b', '#ff5d4c', '#37a3fb', '#4d63f7', '#914df7', '#f74df1'],
            stepColors: stepColors

        };
    },
    methods: {
        headleChangeColor() {
            // handle color change
        },
        addStep() {
            let length = this.stepColors.length;
            let index = this.stepColors[length - 1] ? this.stepColors[length - 1].index : 0;
            this.stepColors.push({
                index: index + 1,
                color: this.stepColor,
                start: this.stepStart,
                end: this.stepEnd
            });
        },
        deleteStep(index) {
            let cIndex = 0;
            this.stepColors.forEach((item, colorIndex) => {
                if (item.index === index) {
                    cIndex = colorIndex;
                }
            });
            this.stepColors.splice(cIndex, 1);
        },

        /**
         * 获取阈值列表
         *
         * @return {[type]} [description]
         */
        getThreshold() {
            let threshold = [];
            this.stepColors.forEach(item => {
                threshold.push([item.start, item.end, item.color]);
            });
            return threshold;
        }
    }
};
</script>
<style lang="less">
    .threshold-holder {
        .common-tip {
            .m-colorPicker {
                margin-left: -5px;
                margin-top: 3px;
                vertical-align: top;
                .colorBtn {
                    border-left: none;
                    width: 72px;
                    height: 26px;
                    cursor: pointer;
                    .colorRectangle {
                        margin: 0px 4px 13px 14px;
                    }
                    .noahv-icon {
                        position: relative;
                        top: -3px;
                        font-size: 12px;
                    }
                }
            }
        }
        .color-add {
            padding: 0;
            margin-top: 12px;
            background: #55abf9;
            width: 26px;
            height: 26px;
        }
        .threadhold-list {
            margin-top: 9px;
            li {
                position: relative;
                float: left;
                height: 23px;
                margin-right: 10px;
                margin-bottom: 10px;
                padding: 0 12px;
                border:1px solid #e5e8ec;
                border-radius:2px;
                color: #fff;
                line-height: 22px;
                a {
                    margin-left: 30px;
                    font-size: 12px;
                    color: #fff;
                }
            }
        }
        .ivu-input-number {
            height: 26px;
            margin-top: 12px;
            .ivu-input-number-handler {
                height: 13px;
            }
            .ivu-input-number-input-wrap,
            .ivu-input-number-input {
                height: 26px;
                line-height: 26px;
            }
        }
    }
</style>
