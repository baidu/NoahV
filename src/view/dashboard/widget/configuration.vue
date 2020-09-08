<template>
    <div class="widget-config">
        <slot></slot>
        <ul>
            <li class="widget-config-item" v-for="item in configItemList">
                <div class="config-title" @click="toggleShow($event)">{{item.name}}</div>
                <div class="config-box">
                    <slot :name="item.slot"></slot>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import $ from 'jquery';
const defaultItemList = [
    {
        name: '数据源配置',
        slot: 'datasource'
    },
    {
        name: '样式配置',
        slot: 'style'
    },
    {
        name: '时间配置',
        slot: 'time'
    },
    {
        name: '链接配置',
        slot: 'link'
    }
];
export default {
    name: 'widget-config',
    props: {
        itemlist: Array
    },
    data() {
        return {
            configItemList: this.itemlist ? this.itemlist : defaultItemList
        };
    },
    methods: {
        toggleShow(e) {
            $(e.target).toggleClass('active');
        }
    },
    computed: {
    }
};
</script>

<style lang="less">
.widget-config {
    .widget-config-item {
        margin-bottom: 20px;
    }
    .config-title {
        color: #333;
        font-size: 12px;
        border-bottom: 1px solid #dbe5ef;
        line-height: 24px;
        cursor: pointer;
        &:after {
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            border-width: 5px;
            border-color: transparent  transparent transparent #7db0e3;
            border-style: solid;
            margin-left: 10px;
            transition: all 0.2s;
        }
        &.active {
            &:after {
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border-width: 5px;
                border-color: transparent  transparent #7db0e3 transparent;
                border-style: solid;
                margin-left: 10px;
            }
            & + .config-box  {
                display: block;
            }
        }
    }
    .config-box {
        display: none;
    }
}
</style>
