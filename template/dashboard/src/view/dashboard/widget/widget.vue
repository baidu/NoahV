<template>
    <div class="dashboard-widget">
        <ul class="widget-icon">
            <li v-for="item in iconList" @click="widgetAction(item.name)">
                <sa-icon :type="item.icon"/>
            </li>
        </ul>
        <div class="widget-content">
            <div class="tips no-data" v-if="!title">未绑定数据，点击编辑修改</div>
            <div class="tips" v-else>
                <div class="icon" :class="type"></div>
                <div class="info" :title="title">
                    <p>名称：{{title}}</p>
                    <p>类型：{{widgetType}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const typeMap = {
    'mdtrend': '趋势图',
    'mdtable': '报表',
    'mdcircle': '仪表图',
    'billboard': '面板',
    'Billboard': '面板',
    'eventRiver': '事件流图'
};
export default {
    name: 'dashboardWidget',
    props: {
        path: String,
        title: String,
        type: String
    },
    data() {
        return {
            iconList: [
                {
                    icon: 'pencil',
                    name: 'edit'
                },
                {
                    icon: 'copy',
                    name: 'copy'
                },
                {
                    icon: 'trash-alias',
                    name: 'delete'
                }
            ]
        };
    },
    methods: {
        widgetAction(action) {
            if (action === 'edit') {
                window.location.href = '#/dashboard/widget/edit?id='
                    + this.path;
            }
            else if (action === 'copy') {
                this.$emit('on-copy');
            }
            else if (action === 'delete') {
                this.$emit('on-delete');
            }
        }
    },
    computed: {
        widgetType() {
            return typeMap[this.type] || '';
        }
    }
};
</script>

<style lang="less">
    .dashboard-widget {
        width: 100%;
        height: 120px;
        position: relative;
        border: #dbe5ef solid 1px;
        border-radius: 3px;
        cursor: move;
        .widget-icon {
            position: absolute;
            top: 10px;
            right: 20px;
            z-index: 1;
            li {
                margin-left: 15px;
                float: left;
                font-size: 12px;
                color: #55abf9;
                cursor: pointer;
            }
        }
        .widget-content {
            text-align: center;
            font-size: 12px;
            .tips {
                margin-top: 39px;
                display: inline-block;
                overflow: hidden;
                &.no-data {
                    display: flex;
                    justify-content: center;
                    margin-top: 0;
                    height: 120px;
                    align-items: center;
                    word-break: break-all;
                }
                .icon {
                    float: left;
                    width: 52px;
                    height: 42px;
                    &.mdcircle {
                        background: url(../../../common/assets/img/dashboard/widget/mdcircle.png) no-repeat;
                        background-size: auto 42px;
                    }
                    &.billboard {
                        background: url(../../../common/assets/img/dashboard/widget/billboard.png) no-repeat;
                        background-size: auto 42px;
                    }
                    &.mdtable {
                        background: url(../../../common/assets/img/dashboard/widget/mdtable.png) no-repeat;
                        background-size: auto 42px;
                        margin-right: -10px;
                    }
                    &.mdtrend {
                        background: url(../../../common/assets/img/dashboard/widget/mdtrend.png) no-repeat;
                        background-size: auto 42px;
                        margin-right: 5px;
                    }
                    &.eventRiver {
                        background: url(../../../common/assets/img/dashboard/widget/eventriver.png) no-repeat;
                        background-size: auto 42px;
                        margin-right: 5px;
                    }
                }
                .info {
                    float: left;
                    p {
                        line-height: 21px;
                        text-align: left;
                        font-size: 12px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        word-break: break-all;
                    }
                }

            }
        }

    }
</style>
