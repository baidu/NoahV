<template>
    <div class="menu-div">
        <template v-if="curItem.link">
            <router-link
                :to="'/' + curItem.link"
                :class="{active: curItem.selected}"
                @click.native="headerClick(curItem, parent)"
            >
                <i
                    :class="['noahv-icon', 'noahv-icon-' + curItem.type]"
                    v-if="curItem.type ? true : false"
                >
                </i>
                {{curItem.label}}
            </router-link>
        </template>
        <template v-else-if="curItem.linkTarget">
            <a :href="curItem.linkTarget" target="_blank">
                <i
                    :class="['noahv-icon', 'noahv-icon-' + curItem.type]"
                    v-if="curItem.type ? true : false"
                >
                </i>
                {{curItem.label}}
            </a>
        </template>
        <template v-else-if="curItem.linkTargetSelf">
            <a :href="curItem.linkTargetSelf">
                <i
                    :class="['noahv-icon', 'noahv-icon-' + curItem.type]"
                    v-if="curItem.type ? true : false"
                >
                </i>
                {{curItem.label}}
            </a>
        </template>
        <template v-else>
            <!-- if has the item key -->
            <span v-if="!curItem.key" class="likeA">
                <i
                    :class="['noahv-icon', 'noahv-icon-' + curItem.type]"
                    v-if="curItem.type ? true : false"
                >
                </i>
                {{curItem.label}}
            </span>
            <!-- else if if has the item key -->
            <a v-else
                href="javascript:;"
                :class="{hover: isShow, active: curItem.selected}"
                @mouseover="mouseover($event)"
                @mouseout="mouseout($event)"
            >
                <i
                    :class="['noahv-icon', 'noahv-icon-' + curItem.type]"
                    v-if="curItem.type ? true : false"
                >
                </i>
                {{curItem.label}}
            </a>
            <template v-if="curItem.children">
                <span class="triangle triangle-right"></span>
                <ul
                    class="menu-list"
                    v-show="isShow"
                    @mouseover="mouseover($event)"
                    @mouseout="mouseout($event)"
                    @touchend="touchend()"
                >
                    <li
                        :name="subItem.key"
                        v-for="(subItem, subIndex) in curItem.children"
                    >
                        <headerLink
                            :item="subItem"
                            :parent="curItem.key"
                        >
                        </headerLink>
                    </li>
                </ul>
            </template>
        </template>
    </div>
</template>

<script>
import headerLink from './headerLink';
import {eventBus} from '../../util/eventBus';

export default {
    name: 'headerLink',
    props: ['item', 'parent'],
    components: {
        headerLink
    },
    data() {
        return {
            isShow: false,
            curItem: {}
        };
    },
    mounted() {
        this.curItem = this.item;
    },
    watch: {
        item: {
            handler() {
                this.curItem = this.item;
            },
            deep: true
        }
    },
    methods: {
        mouseover() {
            this.isShow = true;
        },
        mouseout() {
            this.isShow = false;
        },
        touchend() {
            // compatiable mobile effect
            let timer = setTimeout(() => {
                this.isShow = false;
                clearTimeout(timer);
            }, 350);
        },
        headerClick(item, parent) {
            eventBus.$emit('header-item-event', item, parent);
        }
    }
};
</script>

<style scoped lang="less">
</style>
