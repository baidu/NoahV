<template>
    <div class="noahv-layout">
        <div class="noahv-layout-header noahv-layout-header-sidebar">
            <div class="noahv-layout-header-inner">
                <Logo :logo="logo"></Logo>
                <headerLink
                    :header="header"
                    @header-item-event="changeHeaderItem"
                    @has-children-event="changeHeaderHasChildren"
                >
                </headerLink>
                <Login :login="login"></Login>
            </div>
        </div>
        <div class="noahv-layout-content noahv-layout-content-header-sidebar">
            <div class="noahv-layout-content-wrapper">
                <div class="noahv-layout-breadcrumb" v-if="hasBread">
                    <Breadcrumb :separator="separatorString">
                        <template v-for="(item, index) in breadcrumb">
                            <BreadcrumbItem>
                                {{item.label}}
                            </BreadcrumbItem>
                        </template>
                    </Breadcrumb>
                </div>
                <Row class="noahv-layout-content-sidebar">
                    <sidebarLink :header="header" :span="hasChildrenFlag ? 4 : 0"></sidebarLink>
                    <Col class="noahv-layout-content-main-root" :span="hasChildrenFlag ? 20 : 24">
                        <div class="noahv-layout-content-main">
                            <router-view></router-view>
                        </div>
                    </Col>
                </Row>

            </div>
        </div>
        <router-view name="footer"/>
    </div>
</template>
<script>
import headerLink from './headerLink';
import sidebarLink from './sidebarLink';
import Login from '../header/login';
import _ from 'lodash';
import Logo from '../header/logo';

export default {
    name: 'sa-header-sidebar',
    components: {
        headerLink,
        sidebarLink,
        Logo,
        Login
    },
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

    data() {
        return {
            isShow: false,
            defaultRouter: true,
            hasChildrenFlag: false,
            breadcrumb: [],
            tempBreadCrumb: [],
            separatorString: this.separator ? this.separator : '/',
            header: this.headerConf ? this.headerConf : []
        };
    },
    created() {
        this.getDefaultBreadcrumb();
        this.selectItemByNotInHeader();
    },
    watch: {
        // '$route': 'getDefaultBreadcrumb'
        '$route': 'routerChange'
    },
    computed: {},
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
                this.fullPath = [];
                this.getFullRouterPath(path);
                const fullPath = this.fullPath.join(';');
                this.changeSidebarItem(item, fullPath);
            }
        },
        getFullRouterPath(path) {
            if (!path) {
                return;
            }
            const item = this.getCurrentItem('key', path);
            if (item && item.key) {
                this.fullPath.unshift(item.key);
                if (item.parent !== null) {
                    this.getFullRouterPath(item.parent);
                }
            }
        },
        changeBreadcrumb(item) {
            const list = this.getCurrentItem('key', item);

            if (Object.keys(list).length) {
                this.breadcrumb.unshift(list);
            }

            if (list.parent !== null) {
                this.changeBreadcrumb(list.parent);
            }
        },
        selectItemByNotInHeader() {
            if (this.$route.meta.root) {
                const root = this.$route.meta.root.replace(/[\^/]/, '');
                const item = this.getCurrentItem('link', root);
                this.changeHeaderItem(item);
            }
        },
        getDefaultBreadcrumb() {
            const path = this.$route.path.replace(/[\^/]/, '');

            if (path !== '') {
                const item = this.getCurrentItem('link', path);

                this.breadcrumb = [];
                if (Object.keys(item).length) {
                    this.breadcrumb.unshift(item);
                }

                if (item.parent && item.parent !== null) {
                    this.changeBreadcrumb(item.parent);
                }

                const breadcrumb = [];
                this.breadcrumb.forEach(breadItem => {
                    breadcrumb.push(breadItem.key);
                });

                const key = breadcrumb.join(';');

                if (key === '') {
                    return;
                }
                this.changeSidebarItem(item, key);

                // change the hasChildrenFlag
                const topItem = this.getCurrentItem('key', this.breadcrumb[0].key);
                if (topItem.children) {
                    this.hasChildrenFlag = true;
                }
            }
        },
        changeHeaderItem(item) {
            this.header.forEach(headerItem => {
                headerItem.selected = false;
                if (headerItem.key === item.key) {
                    headerItem.selected = true;

                    // header click is router, change the breadcrumb
                    if (headerItem.link) {
                        this.breadcrumb = [headerItem];
                    }
                }
            });

            // the new property can't be watched, so set the new header for watch
            this.header = this.header.slice(0);

        },
        changeHeaderHasChildren(flag) {
            this.hasChildrenFlag = flag;
        },
        selectedItemsBySidebarClick(item, selectedKey) {
            item.forEach(curItem => {
                if (_.indexOf(selectedKey, curItem.key) !== -1) {
                    curItem.selected = true;

                    if (_.indexOf(this.tempBreadCrumb, curItem) === -1) {
                        this.tempBreadCrumb.push(curItem);
                    }
                    if (curItem.children) {
                        this.selectedItemsBySidebarClick(curItem.children, selectedKey);
                    }
                }
            });
        },
        changeSidebarItem(item, key) {
            const selectedKey = key.split(';');
            this.unSelectedItem(this.header);

            // when header map set the tempBreadCrumb empty
            this.header.forEach(curItem => {
                this.tempBreadCrumb = [];
                if (_.indexOf(selectedKey, curItem.key) !== -1) {
                    curItem.selected = true;
                    this.tempBreadCrumb.push(curItem);

                    if (curItem.children) {
                        this.selectedItemsBySidebarClick(curItem.children, selectedKey);
                    }

                }
            });
            this.selectedItemsBySidebarClick(this.header, selectedKey);
            this.header = this.header.slice(0);

            // update the breadcrumb
            this.breadcrumb = this.tempBreadCrumb;
        }
    }
};
</script>
