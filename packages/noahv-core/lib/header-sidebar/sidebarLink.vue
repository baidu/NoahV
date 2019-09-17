<template>
    <div class="noahv-layout-sidebar-root">
        <Col
            :span="item.children ? 24 : 0"
            v-show="item.selected"
            class="noahv-layout-sidebar"
            v-for="(item, index) in curHeader"
            :key="item"
        >
            <template
                v-if="item.children"
                v-for="(subItem, subIndex) in item.children"
            >
                <template v-if="subItem.children">
                    <Menu
                        width="auto"
                        :open-names="subItem.selected ? [subItem.key] : []"
                        :active-name="openNames[index].join('-')"
                        ref="headerSidebarBarMenu"
                    >
                        <Submenu :name="subItem.key">
                            <template slot="title">
                                <template v-if="subItem.type">
                                    <i
                                        :class="['noahv-icon', 'noahv-icon-' + subItem.type]"
                                        v-if="subItem.type ? true : false"
                                    >
                                    </i>
                                </template>
                                {{subItem.label}}
                            </template>
                            <template v-if="subItem.children" v-for="(lastItem, lastKey) in subItem.children">
                                <MenuItem :name="item.key + '-' + subItem.key + '-' + lastItem.key">
                                    <template>
                                        <div class="menu-div submenu-div">
                                            <template v-if="lastItem.link">
                                                <router-link
                                                    :to="'/' + lastItem.link"
                                                    @click.native="sidebarClick(lastItem, (item.key + ';'
                                                    + subItem.key
                                                    + ';'
                                                    + lastItem.key))">
                                                    <template v-if="lastItem.type">
                                                        <i
                                                            :class="['noahv-icon', 'noahv-icon-' + lastItem.type]"
                                                            v-if="lastItem.type ? true : false"
                                                        >
                                                        </i>
                                                    </template>
                                                    {{lastItem.label}}
                                                </router-link>
                                            </template>
                                            <template v-else="lastItem.linkTarget" >
                                                <a :href="lastItem.linkTarget" target="_blank">
                                                    <template v-if="lastItem.type">
                                                        <i
                                                            :class="['noahv-icon', 'noahv-icon-' + lastItem.type]"
                                                            v-if="lastItem.type ? true : false"
                                                        >
                                                        </i>
                                                    </template>
                                                    {{lastItem.label}}
                                                </a>
                                            </template>
                                        </div>
                                    </template>
                                </MenuItem>
                            </template>
                        </Submenu>
                    </Menu>
                </template>

                <!-- only one level child -->
                <template v-else>
                    <Menu width="auto" :active-name="openNames[index].join('-')">
                        <MenuItem :name="item.key + '-' + subItem.key">
                            <template>
                                <div class="menu-div">
                                    <template v-if="subItem.link">
                                        <router-link
                                            :to="'/' + subItem.link"
                                            @click.native="sidebarClick(subItem, (item.key + ';' + subItem.key))">
                                            <template v-if="subItem.type">
                                                <i
                                                    :class="['noahv-icon', 'noahv-icon-' + subItem.type]"
                                                    v-if="subItem.type ? true : false"
                                                >
                                                </i>
                                            </template>
                                            {{subItem.label}}
                                        </router-link>
                                    </template>
                                    <template v-else="subItem.linkTarget" >
                                        <a :href="subItem.linkTarget" target="_blank">
                                            <template v-if="subItem.type">
                                                <i
                                                    :class="['noahv-icon', 'noahv-icon-' + subItem.type]"
                                                    v-if="subItem.type ? true : false"
                                                >
                                                </i>
                                            </template>
                                            {{subItem.label}}
                                        </a>
                                    </template>
                                </div>
                            </template>
                        </MenuItem>
                    </Menu>
                </template>
            </template>
        </Col>
    </div>
</template>

<script>
export default {
    name: 'sidebarLink',
    props: ['header'],
    data() {
        return {
            curHeader: {},
            openNames: []
        };
    },
    mounted() {
        this.curHeader = this.header;
        this.getOpenNames();
    },
    watch: {
        header: {
            handler() {
                this.curHeader = this.header;
                this.getOpenNames();
                this.$nextTick(() => {
                    const headerSidebarBarMenu = this.$refs.headerSidebarBarMenu;
                    if (Array.isArray(headerSidebarBarMenu)
                            && headerSidebarBarMenu.length > 0
                    ) {
                        headerSidebarBarMenu.forEach(item => {
                            item.updateOpened();
                        });

                    }
                    else if (headerSidebarBarMenu) {
                        headerSidebarBarMenu.updateOpened();
                    }
                });
            },
            deep: true
        }
    },
    methods: {
        sidebarClick(item, key) {
            // sidebar click change the sidebar item
            this.$emit('sidebar-item-event', item, key);
        },
        getOpenNames() {
            this.curHeader.forEach((item, key) => {
                this.openNames[key] = [];
                if (item.selected) {
                    this.openNames[key].push(item.key);

                    if (item.children) {
                        this.itemChildrenPushNames(item.children, this.openNames[key]);
                    }
                }
            });
        },
        itemChildrenPushNames(children, openNames) {
            children.forEach(item => {
                if (item.selected) {
                    openNames.push(item.key);

                    if (item.children) {
                        this.itemChildrenPushNames(item.children, openNames);
                    }
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
</style>
