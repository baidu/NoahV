<template>
    <div :class="prefixCls">
        <div class="node" v-for="(node, i) in nodes" :key="node.inx">
            <p class="header-index">
                <span class="index-number">{{i + 1}}</span>
                <span class="index-name">{{nodeTitle}}{{i + 1}}</span>
                <span class="index-btn-group">
                    <NvIcon :class="{'disabled': i === 0}" type="arrow-up-line" @click.native="arrowUp(i)"></NvIcon>
                    <NvIcon :class="{'disabled': i === nodes.length - 1}" type="arrow-down-line" @click.native="arrowDown(i)"></NvIcon>
                    <NvIcon :class="{'disabled': i === 0 && nodes.length === 1}" type="trash" @click.native="goRemoveNode(i)"></NvIcon>
                </span>
            </p>
            <p class="header-description">
                <span class="description" :title="node.description || t('pipline.empty')">{{node.description || t('pipline.empty')}}</span>
                <span class="expand-btn" @click="expand(node)">
                    {{node.expandText}}
                    <NvIcon v-if="!node.expand" type="angle-down"></NvIcon>
                    <NvIcon v-else type="angle-up"></NvIcon>
                </span>
            </p>
            <div class="node-content" v-if="node.expand">
                <div class="card" v-for="(card, j) in node.cardSet" :key="i + '-' + j">
                    <p class="header">
                        <span>{{cardTitle}}{{j + 1}}</span>
                        <NvIcon v-if="node.cardSet.length > 1" type="trash" @click.native="removeCard(node, j)"></NvIcon>
                    </p>
                    <slot name="cardContent" v-bind:card="card"></slot>
                </div>
                <div class="add-card" v-if="node.cardSet && node.cardSet.length < cardMax">
                    <NvIcon type="plus-small" @click.native="addCard(node)"></NvIcon>
                    <p @click="addCard(node)">{{t('pipline.clickAndNew')}}{{cardTitle}}</p>
                </div>
            </div>
        </div>
        <Modal
            class="pipline-node-remove-modal"
            v-model="removeModalShow"
            :title="t('pipline.deleteTip')"
            :ok-text="t('pipline.ok')"
            @on-ok="removeNode"
            @on-cancel="removeCancel">
            <p class="tips">
                <span>{{t('pipline.deleteInfo', {nodeTitle: nodeTitle, cardTitle: cardTitle})}}</span>
            </p>
        </Modal>
    </div>
</template>

<script type="text/javascript">
import m from 'moment';
import lodash from 'lodash';

import {t} from '../../locale';
import mixin from '../../mixins';

const prefixCls = "noahv-pipline";
    export default {
        mixins: [mixin],
        name: 'piplineNode',
        props: {
            data: Array,
            cardMax: {
                type: Number,
                default: 5,
                validator: (val) => {
                    return val >= 1;
                }
            },
            nodeMax: {
                type: Number,
                default: 3,
                validator: (val) => {
                    return val >= 1;
                }
            },
            nodeTitle: {
                type: String,
                default() {
                    return t('pipline.node')
                }
            },
            cardTitle: {
                type: String,
                default() {
                    return t('pipline.card')
                }
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
                                node['cardNameMap'][index] = card.name || this.t('pipline.empty');
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
                node['expandText'] = node['expand'] ? this.t('pipline.collapse') : this.t('pipline.expandText');
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
                if (this.nodes.length >= this.nodeMax) {
                    this.$Message.warning(this.t('pipline.overWarning', {nodeMax: this.nodeMax, nodeTitle: this.nodeTitle}));
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
                this.$Message.success(this.t('pipline.deleteSuccess'));
            },
            removeCancel() {
                this.removeModalShow = false;
            },
            expand(node) {
                this.$set(node, 'expand', !node.expand);
                this.$set(node, 'expandText', node.expand ? this.t('pipline.collapse') : this.t('pipline.detail'));
            },
            addCard(node) {
                if (node.cardSet && node.cardSet.length >= this.cardMax) {
                    return;
                }
                let cardSet = node.cardSet || [];
                let newCard = lodash.cloneDeep(this.cardTemplate);
                cardSet.push(newCard);
                this.$set(node, 'cardSet', cardSet);

                // update description
                let index = node.cardSet.length - 1;
                let cardNameMap = node.cardNameMap || [];
                this.$set(cardNameMap, index, this.t('pipline.empty'));
                this.$set(node, 'cardNameMap', cardNameMap);
                this.$set(node, 'description', Object.values(cardNameMap).join('、'));
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
