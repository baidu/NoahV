<template lang="html">
    <div class="m-colorPicker" ref="colorPicker" v-on:click="event => { event.stopPropagation() }">
        <!-- 颜色显示小方块 -->
        <div class="colorBtn"
            v-on:click="showColorPanel"
            v-bind:class="{ disabled: disabled }">
            <div
                v-bind:style="`background-color: ${showColor}`"
                class="colorRectangle"></div>
            <sa-icon type="sort-desc"/>
        </div>

        <!-- 用以激活HTML5颜色面板 -->
        <input type="color"
          ref="html5Color"
          v-model="html5Color"
          v-on:change="updataValue(html5Color)">
        <!-- 颜色色盘 -->
        <div class="box" v-bind:class="{ open: openStatus }">
            <!-- <div class="hd">
                <div class="colorView" v-bind:style="`background-color: ${showPanelColor}`"></div>
            </div> -->
            <div class="bd">
                <ul class="tColor">
                    <li
                        v-for="color of bColor"
                        v-bind:style="{ backgroundColor: color }"
                        v-on:mouseover="hoveColor = color"
                        v-on:mouseout="hoveColor = null"
                        v-on:click="updataValue(color)"
                    ></li>
                    <li class="auto-color" v-on:click="triggerHtml5Color"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'colorPicker',
    props: {
        // 当前颜色值
        value: {
            type: String,
            required: true
        },
        // 默认颜色
        defaultColor: {
            type: String,
            default: '#000'
        },
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        // 默认主题颜色列表
        bColor: {
            type: Array,
            default: ['#2ecb73', '#ffc91b', '#ff5d4c', '#37a3fb', '#4d63f7', '#914df7', '#f74df1']
        }
    },
    data() {
        return {
            // 面板打开状态
            openStatus: false,
            // 鼠标经过的颜色块
            hoveColor: null,
            // 主题颜色
            tColor: [
                '#000', '#fff', '#eeece1', '#1e497b',
                '#4e81bb', '#e2534d', '#9aba60',
                '#8165a0', '#47acc5', '#f9974c'
            ],
            // 颜色面板
            colorConfig: [
                ['#7f7f7f', '#f2f2f2'],
                ['#0d0d0d', '#808080'],
                ['#1c1a10', '#ddd8c3'],
                ['#0e243d', '#c6d9f0'],
                ['#233f5e', '#dae5f0'],
                ['#632623', '#f2dbdb'],
                ['#4d602c', '#eaf1de'],
                ['#3f3150', '#e6e0ec'],
                ['#1e5867', '#d9eef3'],
                ['#99490f', '#fee9da']
            ],
            html5Color: this.value
        };
    },
    computed: {
        // 显示面板颜色
        showPanelColor() {
            if (this.hoveColor) {
                return this.hoveColor;
            }
            else {
                return this.showColor;
            }
        },
        // 显示颜色
        showColor() {
            if (this.value) {
                return this.value;
            }
            else {
                return this.defaultColor;
            }
        },
        // 颜色面板
        colorPanel() {
            let colorArr = [];
            for (let color of this.colorConfig) {
                colorArr.push(this.gradient(color[1], color[0], 5));
            }
            return colorArr;
        }
    },
    methods: {
        showColorPanel() {
            this.openStatus = !this.openStatus;
        },
        triggerHtml5Color() {
            this.$refs.html5Color.click();
        },
        // 更新组件的值 value
        updataValue(value) {
            this.$emit('input', value);
            this.$emit('change', value);
            this.openStatus = false;
        },
        // 设置默认颜色
        handleDefaultColor() {
            this.updataValue(this.defaultColor);
        },
        // 格式化 hex 颜色值
        parseColor(hexStr) {
            if (hexStr.length === 4) {
                hexStr = '#' + hexStr[1] + hexStr[1] + hexStr[2] + hexStr[2] + hexStr[3] + hexStr[3];
            }
            else {
                return hexStr;
            }
        },
        // RGB 颜色 转 HEX 颜色
        rgbToHex(r, g, b) {
            let hex = ((r << 16) | (g << 8) | b).toString(16);
            return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
        },
        // HEX 转 RGB 颜色
        hexToRgb(hex) {
            hex = this.parseColor(hex);
            let rgb = [];
            for (let i = 1; i < 7; i += 2) {
                rgb.push(parseInt('0x' + hex.slice(i, i + 2), 16));
            }
            return rgb;
        },
        // 计算渐变过渡颜色
        gradient(startColor, endColor, step) {
            // 讲 hex 转换为 rgb
            let sColor = this.hexToRgb(startColor);
            let eColor = this.hexToRgb(endColor);

            // 计算R\G\B每一步的差值
            let rStep = (eColor[0] - sColor[0]) / step;
            let gStep = (eColor[1] - sColor[1]) / step;
            let bStep = (eColor[2] - sColor[2]) / step;

            let gradientColorArr = [];
            // 计算每一步的hex值
            for (let i = 0; i < step; i++) {
                gradientColorArr.push(this.rgbToHex(
                    parseInt(rStep * i + sColor[0], 10),
                    parseInt(gStep * i + sColor[1], 10),
                    parseInt(bStep * i + sColor[2], 10)
                ));
            }
            return gradientColorArr;
        }
    },
    mounted() {
        // 点击页面上其他地方，关闭弹窗
        document.onclick = () => {
            this.openStatus = false;
        };
    }
};
</script>

<style lang="less" scoped>
.m-colorPicker {
    position: relative;
    text-align: left;
    font-size: 14px;
    display: inline-block;
    vertical-align: middle;
    ul,li,ol {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    input {
        display: none;
    }
    .colorBtn {
        border: 1px solid #e2e2e2;
        border-radius: 2px;
        width: 72px;
        height: 25px;
        vertical-align: middle;
        .colorRectangle {
            display: inline-block;
            margin: 10px 4px 10px 10px;
            width: 28px;
            height: 4px;
        }
        .noahv-icon {
            vertical-align: text-bottom;
            color: #55abf9;
        }
    }

    .colorBtn.disabled {
        cursor: no-drop;
    }
    .box {
        position: absolute;
        width: 104px;
        background: #fff;
        border: 1px solid #ddd;
        visibility: hidden;
        border-radius: 2px;
        margin-top: 2px;
        padding: 10px;
        padding-bottom: 5px;
        box-shadow: 0 0 5px rgba(0,0,0,.15);
        opacity: 0; transition: all .3s ease;
        z-index: 10;
        h3 {
            margin: 0;
            font-size: 14px;
            font-weight: normal;
            margin-top: 10px;
            margin-bottom: 5px;
            line-height: 1;
        }
    }
    .box.open {
        visibility: visible;
        opacity: 1;
    }
    .hd {
        overflow: hidden;
        line-height: 29px;
        .colorView {
            width: 100px;
            height: 30px;
            float: left;
            transition: background-color .3s ease;
        }
        .defaultColor {
            width: 80px;
            float: right;
            text-align: center;
            border: 1px solid #ddd;
            cursor: pointer;
        }
    }
    .tColor {
        li {
            width: 15px; height: 15px; display: inline-block; margin: 0 2px; transition: all .3s ease;
            &.auto-color {
                background: url('../../assets/img/auto-color.png') no-repeat;
                background-size: 100%;
                margin: 0 -2px;
            }
        }
        li:hover {
            box-shadow: 0 0 5px rgba(0,0,0,.4); transform: scale(1.3);
        }
    }
    .bColor {
        li {
            width: 15px;
            display: inline-block;
            margin: 0 2px;
            li {
                display: block;
                width: 15px;
                height: 15px;
                transition: all .3s ease;
                margin: 0;
            }
            li:hover {
                box-shadow: 0 0 5px rgba(0,0,0,.4);
                transform: scale(1.3);
            }
        }
    }
}
</style>
