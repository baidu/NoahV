<template>
    <ul class="noahv-layout-login" v-if="login.hasLogin">
        <li>
            <div class="menu-div" :class="{hover: isShow}" @mouseover="mouseover($event)" @mouseout="mouseout($event)">
                <a href="javascript:;" :title="username"><Icon type="person"></Icon>{{username}}</a>
                <ul class="menu-list" v-show="isShow">
                    <template v-for="(item, index) in login.subnav">
                        <template v-if="item.linkTarget">
                            <li><a :title="item.label" :href="item.linkTarget" target="_blank">{{item.label}}</a></li>
                        </template>
                        <template v-else>
                            <li><router-link :to="'/' + item.link" :title="item.label">{{item.label}}</router-link></li>
                        </template>
                    </template>
                    <li><a :href="login.logout">退出</a></li>
                </ul>
            </div>
        </li>
    </ul>
</template>
<script>
import {mapState} from 'vuex';

export default {
    name: 'Login',
    props: ['login'],
    data() {
        return {
            isShow: false
        };
    },
    created() {
        this.$store.dispatch('getUserName');
    },
    computed: {
        ...mapState(['username'])
    },
    methods: {
        mouseover() {
            this.isShow = true;
        },
        mouseout() {
            this.isShow = false;
        }
    }
};
</script>
