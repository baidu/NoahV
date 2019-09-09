<template>
    <div class="noahv-layout">
        <div class="noahv-layout-header">
            <div class="noahv-layout-header-inner">
                <div>
                    <Logo :logo="logo"></Logo>
                    <Menu mode="horizontal" theme="dark" class="noahv-layout-nav" >
                        <MenuItem :name="item.key ? item.key : '|'" :key="index" v-for="(item, index) in header">
                            <headerLink :item="item" :parent="null"></headerLink>
                        </MenuItem>
                    </Menu>
                    <div class="noahv-layout-nav-more" v-show="moreShow">
                        <div class="more-dot" title="部分导航暂无空间展示，已隐藏">...</div>
                    </div>
                    <Login :login="login"></Login>
                </div>
            </div>
        </div>
        <div class="noahv-layout-content">
            <router-view name="sidebar" v-show="hasSidebar"></router-view>
            <div class="noahv-layout-content-wrapper " :class="{'noahv-layout-content-wrapper-has-aside': hasSidebar}">
                <div class="noahv-layout-breadcrumb" v-if="hasBread">
                    <Breadcrumb :separator="separatorString">
                        <template v-for="(item, index) in breadcrumb">
                            <BreadcrumbItem>{{item.label}}</BreadcrumbItem>
                        </template>
                    </Breadcrumb>
                </div>
                <div class="noahv-layout-content-main">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <router-view name="footer"/>
    </div>
</template>
<script>
import $ from 'jquery';
import _ from 'lodash';
import Logo from './logo';
import Login from './login';
import headerLink from './headerLink';
import {eventBus} from '../../util/eventBus';
export default {
    name: 'sa-header',
    props: [
        'unSelectedItem',
        'getCurrentItem',
        'linkInHeader',
        'headerConf',
        'login',
        'hasBread',
        'logo',
        'routerConf',
        'separator'
    ],
    components: {
        headerLink,
        Logo,
        Login
    },

    data() {
        return {
            breadcrumb: [],
            isShow: false,
            hasSidebar: false,
            separatorString: this.separator ? this.separator : '/',
            header: this.headerConf ? this.headerConf : [],
            moreShow: false
        };
    },
    created() {
        this.routerChange();
        this.getDefaultBreadcrumb();
        this.unSelectedItem(this.header);
        this.selectedItemHeaderClick();
        this.selectItemByNotInHeader();
        eventBus.$on('header-item-event', this.changeHeaderItem);
    },
    watch: {
        '$route': 'routerChange'
    },
    mounted() {
        this.$nextTick(() => {
            // 默认执行
            this.caclNavWidth();
            // resize window执行
            window.addEventListener('resize', this.caclNavWidth, false);                     
        });
    },
    destroyed() {
        window.removeEventListener('resize', this.caclNavWidth, false);
    },
    methods: {
        routerChange() {
            const path = this.$route.path.replace(/[\^/]/, '');
            const flag = this.linkInHeader(path);
            if (!flag) {
                this.unSelectedItem(this.header);
                this.selectItemByNotInHeader();
            }
            else {
                const item = this.getCurrentItem('link', path);
                this.changeHeaderItem(item);
            }
            this.hasSidebarByRouter();
        },
        hasSidebarByRouter() {
            const self = this;
            const path = self.$route.path;
            self.hasSidebar = false;
            this.routerConf.forEach(item => {
                if (item.components) {
                    if (item.path === path && item.components.sidebar) {
                        self.hasSidebar = true;
                    }
                }
            });
        },
        selectItemByNotInHeader() {
            const self = this;
            if (self.$route.meta.root) {
                const root = self.$route.meta.root.replace(/[\^/]/, '');
                const item = this.getCurrentItem('link', root);
                this.changeHeaderItem(item);
            }
        },
        changeBreadcrumb(item) {
            const self = this;
            const list = this.getCurrentItem('key', item);

            if (Object.keys(list).length) {
                self.breadcrumb.unshift(list);
            }

            if (list.parent && list.parent !== null) {
                self.changeBreadcrumb(list.parent);
            }
        },
        getDefaultBreadcrumb() {
            const self = this;
            const path = self.$route.path.replace(/[\^/]/, '');

            if (path !== '') {
                const item = this.getCurrentItem('link', path);

                self.breadcrumb = [];
                if (Object.keys(item).length) {
                    self.breadcrumb.unshift(item);
                }

                if (item.parent && item.parent !== null) {
                    self.changeBreadcrumb(item.parent);
                }
            }
        },
        selectedItem(list, breadArry) {
            list.forEach(item => {
                if (_.indexOf(breadArry, item.key) !== -1) {
                    item.selected = true;
                    if (item.children) {
                        this.selectedItem(item.children, breadArry);
                    }
                }
            });
        },
        selectedItemHeaderClick() {
            this.unSelectedItem(this.header);

            const breadcrumb = this.breadcrumb;
            const breadArry = [];
            breadcrumb.forEach(item => {
                breadArry.push(item.key);
            });

            this.selectedItem(this.header, breadArry);
        },
        changeHeaderItem(item) {
            this.unSelectedItem(this.header);
            this.breadcrumb = [];
            const list = this.getCurrentItem('key', item.key);
            if (Object.keys(list).length) {
                this.breadcrumb.unshift(list);
            }

            if (item.parent && item.parent !== null) {
                this.changeBreadcrumb(item.parent);
            }
            this.selectedItemHeaderClick();
        },
        /**
         * nav宽度重计算
         */
        caclNavWidth() {
            const nav = $('.noahv-layout-nav');
            const navLeft = parseInt(nav.css('left'), 10);
            const navRight = parseInt(nav.css('right'), 10);
            const newWidth = $(window).width() - navLeft - navRight;

            let allWidth = 0;
            nav.width(newWidth);

            [...$('.noahv-layout-nav > li')].map((item, i) => {
                allWidth += parseInt($(item).width(), 10) + 20;

                const display = allWidth > newWidth ? 'none' : 'block';
                $(item).css('display', display);
            });

            this.moreShow = allWidth > newWidth ? true : false;
        }
    }
};
</script>
