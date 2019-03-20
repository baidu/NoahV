<template>
    <Menu mode="horizontal" theme="dark" class="noahv-layout-nav" >
        <MenuItem :name="item.key ? item.key : '|'" :key="index"  v-for="(item, index) in curHeader">
            <div class="menu-div">
                <template v-if="item.link">
                    <router-link
                        :to="'/' + item.link"
                        :class="{active : item.selected}"
                        @click.native="headerClick(item)"
                    >
                        <i
                            :class="['noahv-icon', 'noahv-icon-' + item.type]"
                            v-if="item.type ? true : false"
                        >
                        </i>
                        {{item.label}}
                    </router-link>
                </template>
                <template v-else-if="item.linkTarget" >
                    <a
                        :href="item.linkTarget"
                        target="_blank"
                    >
                        <i
                            :class="['noahv-icon', 'noahv-icon-' + item.type]"
                            v-if="item.type ? true : false"
                        >
                        </i>
                        {{item.label}}
                    </a>
                </template>
                <template v-else-if="item.linkTargetSelf">
                    <a :href="item.linkTargetSelf">
                        <i
                            :class="['noahv-icon', 'noahv-icon-' + item.type]"
                            v-if="item.type ? true : false"
                        >
                        </i>
                        {{item.label}}
                    </a>
                </template>
                <template v-else>
                    <span v-if="!item.key" class="likeA">
                        <i
                            :class="['noahv-icon', 'noahv-icon-' + item.type]"
                            v-if="item.type ? true : false"
                        >
                        </i>
                        {{item.label}}
                    </span>
                    <a v-else href="javascript:;" :class="{active : item.selected}"  @click="headerClick(item)">
                        <i
                            :class="['noahv-icon', 'noahv-icon-' + item.type]"
                            v-if="item.type ? true : false"
                        >
                        </i>
                        {{item.label}}
                    </a>
                </template>
            </div>
        </MenuItem>
    </Menu>
</template>
<script>
export default {
    name: 'headerLink',
    props: ['header'],
    data() {
        return {
            curHeader: {}
        };
    },
    mounted() {
        this.curHeader = this.header;
    },
    watch: {
        header: {
            handler() {
                this.curHeader = this.header;
            },
            deep: true
        }
    },
    methods: {
        headerClick(item) {
            if (typeof item.linkTarget === 'undefined') {
                // header click change the header item
                this.$emit('header-item-event', item);

                if (item.children) {
                    // if has children, the page content width change
                    this.$emit('has-children-event', true);
                }
                else {
                    this.$emit('has-children-event', false);
                }
            }
        }
    }
};
</script>

<style scoped lang="less">
</style>
