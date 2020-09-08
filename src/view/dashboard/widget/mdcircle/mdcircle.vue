<template>
    <div class="mdcircle-config">
        <baseConfig>
            <div slot="datasource" class="mdcircle-data">
                <defaultDatasource />
            </div>
            <div slot="style" class="mdcircle-style">
                <Form :model="style" :label-width="50">
                    <FormItem label="小数位">
                        <Input class="input-class" v-model="style.decimals" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="单位">
                        <Input class="input-class" v-model="style.unit" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="最大值">
                        <Row>
                            <Col span="6">
                                <Input class="input-class" v-model="style.max" placeholder="">
                                </Input>
                            </Col>
                            <Col span="12">
                                <span class="label-class">最小值</span>
                                <Input class="input-class" v-model="style.min" placeholder="">
                                </Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="阈值">
                        <Row>
                            <Col span="5">
                                <colorPicker
                                    v-model="stepColor"
                                    :bColor="bColor"
                                    v-on:change="headleChangeColor">
                                </colorPicker>
                            </Col>
                            <Col span="5">
                                <InputNumber :max="style.max" :min="style.min" v-model="stepStart"></InputNumber>
                            </Col>
                            <Col span="5">
                                <InputNumber :max="style.max" :min="style.min" v-model="stepEnd"></InputNumber>
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
                    </FormItem>
                </Form>
            </div>
            <div slot="time">
                <defaultTime type="fixed" timevalue="before(20d)" ref="defaultTime"/>
            </div>
            <div slot="link">
                <defaultLink />
            </div>
        </baseConfig>
    </div>
</template>

<script>
import u from 'underscore';
import baseConfig from '../configuration';
import defaultDatasource from '../common/defaultDatasource';
import defaultLink from '../common/defaultLink';
import defaultTime from '../common/defaultTime';
import colorPicker from '../common/colorPicker';
const refs = ['defaultTime'];
export default {
    name: 'mdcircle-config',
    components: {
        baseConfig,
        defaultDatasource,
        defaultLink,
        defaultTime,
        colorPicker
    },
    props: {
        type: String,
        product: String
    },
    created() {
        let style = this.initData(this.$store.state.dashboard.widgetConfig.style || {
            decimals: 2,
            unit: '%',
            max: 100,
            min: 0,
            threshold: []
        });
        this.style = style;
        this.stepColors = this.initColors(style);

    },
    data() {
        return {
            style: {},
            colors: ['#2ecb73', '#ffc91b', '#ff5d4c', '#37a3fb', '#4d63f7', '#4d63f7', '#914df7', '#914df7'],
            stepColor: '#2ecb73',
            stepColors: [],
            stepStart: 0,
            stepEnd: 0,
            bColor: ['#2ecb73', '#ffc91b', '#ff5d4c', '#37a3fb', '#4d63f7', '#914df7', '#f74df1']
        };
    },
    methods: {

        headleChangeColor(color) {
            // eslint-disable-next-line no-console
            console.log(`颜色值改变事件：${color}`);
        },
        getValue() {
            u.each(refs, item => {
                // eslint-disable-next-line no-console
                console.log(this.$refs[item].getValue());
            });
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
            this.style.threshold.push([this.stepStart, this.stepEnd, this.stepColor]);
        },
        deleteStep(index) {
            let cIndex = 0;
            this.stepColors.forEach((item, colorIndex) => {
                if (item.index === index) {
                    cIndex = colorIndex;
                }
            });
            this.stepColors.splice(cIndex, 1);
            this.style.threshold.splice(cIndex, 1);
        },

        /**
         * 初始化颜色阈值段
         *
         * @param  {[type]} style [description]
         * @return {[type]}       [description]
         */
        initColors(style) {
            let stepColors = [];
            if (style.threshold) {
                style.threshold.forEach((item, index) => {
                    stepColors.push({
                        index: index + 1,
                        color: item[2],
                        start: item[0],
                        end: item[1]
                    });
                });
            }
            return stepColors;
        },
        initData(style) {
            style.min = parseInt(style.min, 10);
            style.max = parseInt(style.max, 10);
            return style;
        }
    },
    watch: {
        style: {
            handler(val) {
                val.min = parseInt(val.min || 0, 10);
                val.max = parseInt(val.max || 0, 10);
                this.$store.commit('UPDATE_CONFIG', {style: val});
            },
            deep: true
        }
    }
};
</script>

<style lang="less">
@import '../../assets/css/style.less';
.mdcircle-config {
    .mdcircle-style {
        padding-top: 24px;
        .ivu-form-item {
            margin-bottom: 10px;
        }
        .ivu-form-item-label {
            padding: 0 12px 0 0;
            line-height: 25px;
        }
        .ivu-form-item-content {
            line-height: 25px;
            .input-class {
                width: 72px;
                height: 25px;
                .ivu-input {
                    height: 25px;
                }
            }
            .label-class {
                margin-right: 10px;
            }
            .ivu-color-picker-color {
                top: 8px;
                height: 4px;
                width: 28px;
            }
            .ivu-input-number {
                margin-right: 4px;
                width: 72px;
                height: 25px;
                .ivu-input-number-input,
                .ivu-input-number-input-wrap {
                    height: 25px;
                    line-height: 25px;
                }
                .ivu-input-number-handler {
                    height: 12px;
                }
            }
            .color-add {
                margin: 0 5px;
                padding: 4px;
                width: 28px;
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
        }
    }
}
</style>
