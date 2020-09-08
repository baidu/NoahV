<template>
    <div class="search-input-holder">
        <div class="search-input">
            <Input v-model="group"
                placeholder="列分组"
                :style="{width: width + 'px'}"
                @on-blur="blurInput"
                @on-keyup="searchGroup"
                @on-focus="focusInput"></Input>
            <i class="ivu-icon ivu-icon-arrow-down-b"></i>
            <ul class="search-holder" v-if="showSearch" @mouseover="hoverGroup" :style="{width: width + 'px'}">
                <li v-for="item in groupList" @click="chooseGroup(item)">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        // 分组列表
        groups: Array,
        // 选中分组
        defaultGroup: String,
        // 组件宽度
        width: String
    },
    data() {
        return {
            groupList: [],
            timeoutId: 0,
            showSearch: false,
            setTimeId: 0,
            group: this.defaultGroup
        };
    },
    watch: {
        defaultGroup(val) {
            this.group = val;
        }
    },
    methods: {
        searchGroup(e) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                let searchKey = e.target.value;
                this.groupList = [];
                this.groups.forEach(item => {
                    if (item && item.indexOf(searchKey) > -1) {
                        this.groupList.push(item);
                        this.showSearch = true;
                    }
                });
            }, 400);
        },
        chooseGroup(item) {
            this.group = item;
            this.showSearch = false;

        },

        /**
         * 输入框失去焦点时隐藏搜索面板
         */
        blurInput() {
            this.setTimeId = setTimeout(() => {
                this.showSearch = false;
            }, 200);
        },

        /**
         * 鼠标进入搜索面板时，清空失去焦点计时器
         */
        hoverGroup() {
            clearTimeout(this.setTimeId);
        },

        /**
         * 输入框获取焦点时的操作
         */
        focusInput() {
            let searchKey = this.group;
            this.groupList = [];
            this.groups.forEach(item => {
                if (item && item.indexOf(searchKey) > -1) {
                    this.groupList.push(item);
                    this.showSearch = true;
                }
            });
        },
        getGroup() {
            return this.group;
        }
    }
};
</script>
<style lang="less">
    .search-input-holder {
        margin-top: 7px;
        .search-input {
            position: relative;
            .ivu-input {
                height: 26px;
                .ivu-input-icon {
                    height: 26px;
                }
            }
            .ivu-icon {
                position: absolute;
                top: 13px;
                right: 16px;
                color: #55abf9;
            }
        }
        .search-holder {
            position: absolute;
            background: #fff;
            padding: 5px;
            box-shadow: 0 0 3px 1px #e4e8f1;
            border-radius: 2px;
            z-index: 10;
            li {
                line-height: 18px;
                cursor: pointer;
            }
        }
    }
</style>
