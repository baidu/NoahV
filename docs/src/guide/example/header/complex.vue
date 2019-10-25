<template>
    <div class="normal-header-example">
        <Menu mode="horizontal" active-name="1">
            <MenuItem name="0" class="logo-wrapper">
                <img :src="img" alt="百度云" title="百度云" />
            </MenuItem>
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
            <Submenu name="5" class="login-wrapper">
                <template slot="title">
                    <Icon type="person"></Icon>
                    xiaodu
                </template>
                <MenuItem name="5-1">个人中心</MenuItem>
                <MenuItem name="5-2">账户管理</MenuItem>
                <MenuItem name="5-3">智能客服</MenuItem>
                <MenuItem name="5-4">退出</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            img: 'data:image/jpeg;base64,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'
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
            .logo-wrapper {
                padding: 0 50px 0 0;
            }
            .login-wrapper {
                float: right;
            }
        }
    }
</style>
