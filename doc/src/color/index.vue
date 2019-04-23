<template>
    <div class="color-index">
        <h2>概述</h2>
        <div class="color-index-item">
            推荐使用以下调色板的颜色作为设计和开发规范，以保证页面和组件之间的视觉一致。
        </div>
        <h2>主色</h2>
        <div class="color-index-item">
            <div class="title">以蓝色为主色调， Light Primary 常用于 hover，Dark Primary 常用于 active。</div>
            <div class="color-block">
                <ul>
                    <li v-for="color in colors.main">
                        <div class="color-panel" :style="{background: color.value}"></div>
                        <div class="color-desc">
                            <span class="name">{{color.name}}</span>
                            <span class="value">{{color.value}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <h2>辅助色</h2>
        <div class="color-index-item">
            <div class="title">信息提示，比如成功、警告和失败时的色彩。</div>
            <div class="color-block">
                <ul>
                    <li v-for="color in colors.assistant">
                        <div class="color-panel" :style="{background: color.value}"></div>
                        <div class="color-desc">
                            <span class="name">{{color.name}}</span>
                            <span class="value">{{color.value}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <h2>中性色</h2>
        <div class="color-index-item">
            <div class="title">常用于文本、背景、边框、阴影等</div>
            <div class="color-block">
                <ul>
                    <li v-for="color in colors.neutrals">
                        <div class="color-panel" :style="{background: color.value}"></div>
                        <div class="color-desc">
                            <span class="name">{{color.name}}</span>
                            <span class="value">{{color.value}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TableDemo',
    data() {
        return {
            colors: {
                main: [
                    {
                        name: 'Primary',
                        value: '#2389FF'
                    },
                    {
                        name: 'Light Primary',
                        value: '#62ABFF'
                    },
                    {
                        name: 'Dark Primary',
                        value: '#2b85e4'
                    },
                    {
                        name: 'Background',
                        value: '#EBF4FE'
                    }
                ],
                assistant: [
                    {
                        name: 'Info',
                        value: '#53A3FF'
                    },
                    {
                        name: 'Light Info',
                        value: '#71B3FF'
                    },
                    {
                        name: 'Dark Info',
                        value: '#2F85E8'
                    },
                    {
                        name: 'Success',
                        value: '#08D464'
                    },
                    {
                        name: 'Light Success',
                        value: '#37E987'
                    },
                    {
                        name: 'Dark Success',
                        value: '#00C358'
                    },
                    {
                        name: 'Warning',
                        value: '#FFC935'
                    },
                    {
                        name: 'Light Warning',
                        value: '#FFD768'
                    },
                    {
                        name: 'Dark Warning',
                        value: '#EFB71F'
                    },
                    {
                        name: 'Error',
                        value: '#FF4948'
                    },
                    {
                        name: 'Light Error',
                        value: '#FF6867'
                    },
                    {
                        name: 'Dark Error',
                        value: '#ED2625'
                    }
                ],
                neutrals: [
                    {
                        name: '标题 Title',
                        value: '#333333'
                    },
                    {
                        name: '正文 Content',
                        value: '#535353'
                    },
                    {
                        name: '辅助/图标 Sub Color',
                        value: '#B1B1B1'
                    },
                    {
                        name: '失效(文字) Disabled',
                        value: '#DDDEE1'
                    },
                    {
                        name: '边框 Border',
                        value: '#DEDEDE'
                    },
                    {
                        name: '分割线 Divider',
                        value: '#EEEEEE'
                    }
                ]
            }
        };
    }
};
</script>

<style lang="less" >
    .color-index {
        h2 {
            font-size: 20px;
            margin-bottom: 20px;
            border-left: 6px solid #eee;
            padding-left: 10px;
        }
        .color-index-item {
            margin: 20px 0;
            margin-bottom: 30px;
            .title {
                font-size: 12px;
                color: #888;
                margin: 10px 0;
            }
            .color-block {
                overflow: hidden;
                margin: 20px 0;
                li {
                    float: left;
                    margin-right: 50px;
                    margin-bottom: 20px;
                    .color-panel {
                        width: 150px;
                        height: 108px;
                        border-radius: 3px 3px 0 0;
                    }
                    .color-desc {
                        border:1px solid #dedede;
                        border-top: none;
                        border-radius:0 0 3px 3px;
                        line-height: 20px;
                        .name {
                            font-size: 12px;
                            color: #444;
                            display: block;
                            padding: 5px 10px;
                        }
                        .value {
                            font-size: 12px;
                            color: #777;
                            display: block;
                            padding: 5px 10px;
                        }
                    }
                }
            }
        }
    }
</style>
