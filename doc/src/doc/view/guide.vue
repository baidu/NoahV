
<template>
    <div class="table-doc">
        <h2>概述</h2>
        <div class="table-doc-item">
            仪表盘是NoahV主要的组成部分，也是我们提供的运维场景组件，只需按照格式提供相应的数据接口就能让你的项目拥有一整套可视化仪表盘功能，目前仪表盘提供功能主要有：
            <ul>
                <li>1.仪表盘管理，包含创建、编辑、删除、检索等功能</li>
                <li>2.仪表盘布局拖动管理</li>
                <li>3.可视化组件UI配置，目前支持趋势图、仪表图、数据面板、数据报表四种常见可视化组件</li>
                <li>4.仪表盘刷新、全屏展示等功能</li>
            </ul>
            如下图所示为示例Dashboard,支持阈值和自定义颜色样式展示，轻松定位数据异常。
            <br>
            <img src="../../common/assets/img/dashboard.png" width="400" @click="amplificate()">
        </div>
        <h2>使用概览</h2>
        <div class="table-doc-item">
            目前仪表盘是作为场景组件整合在NoahV的仪表盘项目模板中，只包括展现层相关功能，所以如果需要接入仪表盘使用，需要按照格式提供仪表盘对应的数据接口，需要的数据接口列表以及格式参考<a href="#/doc/view/api/api">API接口</a>部分文档。
            <br>

            得力于数据模拟的功能，我们的仪表盘示例配置好了完善的模拟数据，您可以直接使用模拟数据体验仪表盘的方便快捷和实用。具体请参考<a href="#/doc/view/quickstart">快速使用</a>部分文档
            <br>

            仪表盘现支持趋势图、仪表图、数据面板、数据报表四种常见可视化组件，四种组件配置和使用方式请参考<a href="#/doc/view/conf">可视化组件UI配置</a>部分文档
        </div>
        <Modal v-model="amplification" width="950" :closable="false" :footer-hide="true" class="model-img">
            <slot name="header"></slot>
            <img src="../../common/assets/img/dashboard.png" width="900">
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'TableDemo',
    data() {
        return {
            amplification: false
        };
    },

    methods: {
        amplificate() {
            this.amplification = true;
        }
    }
};
</script>

<style lang="less" >
    .table-doc {
        font-size: 14px;
        line-height: 30px;
        h2 {
            font-size: 20px;
            margin-bottom: 12px;
            border-left: 6px solid #eee;
            padding-left: 10px;
            color: #333;
        }
        .table-doc-item {
            margin: 20px 0;
            color: #314659;
            font-size: 14px;
            line-height: 30px;
            img {
                padding-left: 10px;
            }
            .opdt-img {
                padding-left: 20px;
                margin-top: 20px;
            }
            .title {
                font-size: 16px;
                margin: 10px 0;
            }
            ul {
                margin-top: 20px;
                padding-left: 20px;
                li {
                    list-style: circle inside;
                }
            }
        }
        .sub-title {
            font-size: 16px;
            line-height: 40px;
            font-weight: bold;
        }
        .code {
            padding: 12px 20px;
            margin: 16px 0;
            overflow: auto;
            background: #f2f4f5;
            border-radius: 2px;
            font-size: 13px;
            color: #314659;
        }
    }
    .model-img {
        .ivu-modal-mask {
            z-index: 999999999;
        }
        .ivu-modal-wrap {
            z-index: 9999999999;
            .ivu-modal-content {
                background: transparent;
            }
        }
    }
</style>
