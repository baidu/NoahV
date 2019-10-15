<template>
    <div :class="prefixCls">
        <div class="node" v-for="(node, i) in nodes" :key="node.inx">
            <p class="header-index">
                <span class="index-number">{{i + 1}}</span>
                <span class="index-name">{{nodeTitle}}{{i + 1}}</span>
                <span class="index-btn-group">
                    <Icon :class="{'disabled': i === 0}" type="ios-arrow-thin-up" @click="arrowUp(i)"/>
                    <Icon :class="{'disabled': i === nodes.length - 1}" type="ios-arrow-thin-down" @click="arrowDown(i)"/>
                    <Icon :class="{'disabled': i === 0 && nodes.length === 1}" type="ios-trash" @click="goRemoveNode(i)"/>
                </span>
            </p>
            <p class="header-description">
                <span class="description" :title="node.description || '空'">{{node.description || '空'}}</span>
                <span class="expand-btn" @click="expand(node)">
                    {{node.expandText}}
                    <Icon v-if="!node.expand" type="ios-arrow-down" />
                    <Icon v-else type="ios-arrow-up" />
                </span>
            </p>
            <div class="node-content" v-if="node.expand">
                <div class="card" v-for="(card, j) in node.cardSet" :key="i + '-' + j">
                    <p class="header">
                        <span>{{cardTitle}}{{j + 1}}</span>
                        <Icon v-if="node.cardSet.length > 1" type="ios-trash" @click="removeCard(node, j)"/>
                    </p>
                    <slot name="cardContent" v-bind:card="card"></slot>
                </div>
                <div class="add-card" v-if="node.cardSet && node.cardSet.length < max">
                    <Icon type="ios-plus-empty" @click.native="addCard(node)"></Icon>
                    <p @click="addCard(node)">点击新建{{cardTitle}}</p>
                </div>
            </div>
        </div>
        <Modal
            class="pipline-node-remove-modal"
            v-model="removeModalShow"
            title="删除提示"
            ok-text="确定"
            @on-ok="removeNode"
            @on-cancel="removeCancel">
            <p class="tips">
                <span>{{nodeTitle}}删除后，所包含的{{cardTitle}}将全部被删除，是否确认删除？</span>
            </p>
        </Modal>
    </div>
</template>

<script type="text/javascript">
import m from 'moment';
import lodash from 'lodash';

const prefixCls = "noahv-pipline";
    export default {
        name: 'piplineNode',
        props: {
            data: Array,
            disabled: {
                type: Boolean,
                default: false
            },
            nodeTitle: {
                type: String,
                default: '节点'
            },
            cardTitle: {
                type: String,
                default: '卡片'
            },
            nodeTemplate: {
                type: Object,
                default() {
                    return {};
                }
            },
            cardTemplate: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                prefixCls: prefixCls,
                max: 7,
                nodes: [],
                removeNodeIndex: '',
                removeModalShow: false
            }
        },
        watch: {
            data: {
                deep: true,
                immediate: true,
                handler(val) {
                    let nodeData = lodash.cloneDeep(val);
                    this.nodes = this.init(nodeData);
                }
            },
            nodes: {
                deep: true,
                immediate: true,
                handler(val) {
                    val.forEach(node => {
                        if (node.cardSet) {
                            node.cardSet.forEach((card, index) => {
                                node['cardNameMap'][index] = card.name || '空';
                            });
                            node.description = Object.values(node['cardNameMap']).join('、');
                        }
                    });
                }
            }
        },
        methods: {
            init(list) {
                for (let i = 0, len = list.length; i < len; i++) {
                    let node = list[i];
                    this.formatNode(node);
                }
                return list;
            },
            formatNode(node) {
                node['inx'] = new Date().getTime() + Math.random().toString().replace(/\0./, '');
                node['expand'] = node.hasOwnProperty('expand') ? node['expand'] : true;
                node['expandText'] = node['expand'] ? '收起' : '展开';
                node['description'] = '';
                node['cardNameMap'] = {};
                if (node.cardSet) {
                    node.cardSet.forEach((card, index) => {
                        node['cardNameMap'][index] = card.name;
                    });
                    node.description = Object.values(node['cardNameMap']).join('、');
                }
            },
            arrowUp(index) {
                // disabled
                if (index <= 0) {
                    return;
                }
                let tempNode = this.nodes[index - 1];
                this.$set(this.nodes, index - 1, this.nodes[index]);
                this.$set(this.nodes, index, tempNode);

                // last one completedPause must be false
                this.nodes[this.nodes.length - 1]['completedPause'] = false;
            },
            arrowDown(index) {
                // disabled
                if (index >= this.nodes.length - 1) {
                    return;
                }
                let tempNode = this.nodes[index + 1];
                this.$set(this.nodes, index + 1, this.nodes[index]);
                this.$set(this.nodes, index, tempNode);

                // last one completedPause must be false
                this.nodes[this.nodes.length - 1]['completedPause'] = false;
            },
            addNode() {
                if (this.nodes.length >= this.max) {
                    this.$Message.warning('最多可以添加' + this.max + '个' + this.nodeTitle);
                    return;
                }

                let newNode = lodash.cloneDeep(this.nodeTemplate);
                this.formatNode(newNode);
                this.nodes.push(newNode);
            },
            goRemoveNode(index) {
                // disabled
                if (index === 0 && this.nodes.length === 1) {
                    return;
                }
                this.removeNodeIndex = index;
                this.removeModalShow = true;
            },
            removeNode() {
                this.nodes.splice(this.removeNodeIndex, 1);
                this.$Message.success('删除成功');
            },
            removeCancel() {
                this.removeModalShow = false;
            },
            expand(node) {
                this.$set(node, 'expand', !node.expand);
                this.$set(node, 'expandText', node.expand ? '收起' : '详情');
            },
            addCard(node) {
                if (node.cardSet && node.cardSet.length >= this.max) {
                    return;
                }
                let cardSet = node.cardSet || [];
                let newCard = lodash.cloneDeep(this.cardTemplate);
                cardSet.push(newCard);
                this.$set(node, 'cardSet', cardSet);

                // update description
                let index = node.cardSet.length - 1;
                let cardNameMap = node.cardNameMap || [];
                this.$set(cardNameMap, index, '空');
                this.$set(node, 'cardNameMap', cardNameMap);
                this.$set(node, 'description', Object.values(cardNameMap).join('、'));
                console.log('add-card')
            },
            removeCard(node, index) {
                if (node.cardSet && node.cardSet.length <= 1) {
                    return;
                }
                let cardSet = node.cardSet || [];
                cardSet.splice(index, 1);
                this.$set(node, 'cardSet', cardSet);

                // update description
                let cardNameMap = node.cardNameMap || [];
                delete cardNameMap[index];
                let newnameList = Object.values(cardNameMap);
                // reorder cardNameMap
                cardNameMap = {};
                for (let i = 0, len = newnameList.length; i < len; i++) {
                    cardNameMap[i] = newnameList[i];
                }
                this.$set(node, 'cardNameMap', cardNameMap);
                this.$set(node, 'description', newnameList.join('、'));
            },
            /**
             * 对外暴露的接口，供父组件调用
             *
             * @return {Object} nodes 所有数据
             */
            getNodeData() {
                return this.nodes;
            }
        }
    }
</script>