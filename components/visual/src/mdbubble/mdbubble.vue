<template>
    <div class="nv-mdbubble">
        <div class="legend" v-show="showLegend">
            <div class="status">
                <ul>
                    <li class="status-item"
                        v-for="(item, index) in legendStatus"
                        :key="index"
                        :style="{color: item.color}"
                    >
                        <Icon v-if="item.icon" :type="item.icon"/>{{item.name}}
                    </li>
                </ul>
            </div>
            <div class="groups">
                <ul>
                    <li v-for="(item, index) in groups"
                        :key="index"
                        :style="{color: item.color}"
                        class="groups-item"
                        @click.stop="changeAxis(item.name)"
                    >
                        <Icon v-if="groupsIcon" :type="groupsIcon" />
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </div>
        <MDBubbleCore :axis="curAxis"
                      :axis-status="curAxisStatus"
                      :legend-status="legendStatus"
                      :groups-colors="groupsColors"
                      v-bind="$attrs"
                      v-on="$listeners"
                      ref="bubbleCore"
        ></MDBubbleCore>
    </div>
</template>

<script>
import MDBubbleCore from './mdbubbleCore';
import mdutil from '../util/util';
import {COLORS, LEGEND_STATUS} from './CONSTANTS';

export default {
    name: 'mdbubble',
    components: {
        MDBubbleCore
    },
    props: {
        // 图例地域颜色
        groupsColors: {
            type: Array,
            default: () => mdutil.deepClone(COLORS),
            required: false
        },
        // x y 轴展示内容
        axis: {
            type: Object,
            default: () => ({}),
            required: false
        },
        // 坐标轴状态内容
        axisStatus: {
            type: Object,
            default: () => ({}),
            required: false
        },
        // 图例分组前 icon
        groupsIcon: {
            type: [String, Boolean],
            default: 'search',
            required: false
        },
        // 是否展示图例
        showLegend: {
            type: Boolean,
            default: true,
            required: false
        },
        // 图例分为几个状态
        legendStatus: {
            type: Array,
            default: () => LEGEND_STATUS,
            required: false
        },
        dataUrl: {
            type: String,
            default: '',
            required: false
        },
        dataMethod: {
            type: String,
            default: 'GET',
            required: false
        },
        extraParams: {
            type: Object,
            default: () => ({}),
            required: false
        }
    },
    data() {
        return {
            // 用于存储 props 传入的 AreaObj, 进行增加删除
            curAxis: {},
            curAxisStatus: {}
        };
    },
    computed: {
        // axis 中分类的组
        groups() {
            const groups = [];
            let colors = COLORS.slice();
            Object.keys(this.curAxis).forEach(item => {
                const color = colors.shift() || (colors = this.groupsColors.slice()) && colors.shift();
                groups.push({name: item, color});
            });
            return groups;
        }
    },
    created() {
        this.curAxis = mdutil.deepClone(this.axis);
        if (this.dataUrl) {
            const options = {
                url: this.dataUrl,
                method: this.dataMethod
            };
            this.dataMethod.toLowerCase() === 'get'
                ? options.params = this.extraParams
                : options.data = this.extraParams;
            this.$request(options).then(res => {
                if (res.data && res.data.data) {
                    this.curAxis = res.data.data.axis;
                    this.curAxisStatus = res.data.data.axisStatus;
                }
            });
        }
    },
    methods: {
        /**
         * 选择展示的 axis
         *
         * @param {string} regionName
         * @private
         */
        changeAxis(regionName) {
            if (mdutil.isEmpty(this.curAxis[regionName])) {
                this.$set(this.curAxis, regionName, this.axis[regionName]);
            }
            else {
                this.$set(this.curAxis, regionName, []);
            }
        },
        resize() {
            this.$refs.bubbleCore.resize();
        }
    },
    watch: {
        axis: {
            handler(axis) {
                this.curAxis = axis;
            },
            deep: true
        }
    }
};
</script>

<style lang="less">
.nv-mdbubble {
    .legend {
        position: relative;
        top: 10px;
        right: 20px;
        overflow: hidden;
        z-index: 99;

        .status {
            overflow: hidden;
            .status-item {
                display: inline-block;
                position: relative;
                padding-left: 23px;
                min-width: 67px;
                float: right;
            }
        }

        .groups {
            display: block;
            float: right;

            .groups-item {
                display: inline-block;
                margin-left: 17px;
                cursor: pointer;

                &:first-child {
                    margin-left: 0;
                }

                .noahv-icon-location-o {
                    margin-right: 4px;
                    font-size: 10px;
                }
            }
        }
    }
}
</style>
