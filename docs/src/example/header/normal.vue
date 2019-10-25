<template>
    <div class="normal-header-example">
        <Menu mode="horizontal" active-name="1">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    内容管理
                </template>
                <MenuItem name="1-1">文章管理</MenuItem>
                <MenuItem name="1-2">评论管理</MenuItem>
                <MenuItem name="1-3">举报管理</MenuItem>
            </Submenu>
            <MenuItem name="2">
                <Icon type="ios-people"></Icon>
                用户管理
            </MenuItem>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    统计分析
                </template>
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="4">
                <Icon type="settings"></Icon>
                综合设置
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    }
};
</script>

<style lang="less" >
    .normal-header-example {
        .ivu-menu {
            background: #495060;
            .ivu-menu-item {
                color: hsla(0,0%,100%,.7);
            }
            .ivu-menu-item:hover{
                color: #fff;
            }
            .ivu-menu-submenu {
                display: block;
                color: hsla(0,0%,100%,.7);
                .ivu-menu-item{
                    color: #000;
                }
            }
            .ivu-menu-submenu:hover{
                color: #fff;
            }
            .ivu-menu-item-active {
                color: #fff;
            }
            .ivu-menu-item-selected {
                color: #fff !important;
            }
        }
        .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
            color: #fff;
        }
    }
</style>
