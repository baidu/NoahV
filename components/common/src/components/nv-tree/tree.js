/**
 * @file javascript tree
 * @author nimingdexiaohai(nimingdexiaohai@163.com)
 */

export default {
    methods: {
        /**
         * 树的事件派发
         *
         * @param {string} comName 组件名称
         * @param {string} eventName 事件名称
         * @param {Array} params 参数集合
         */
        dispatch(comName, eventName, params) {
            let parent = this.$parent || this.$root;
            let comTag = parent.$options._componentTag;
            while (parent && (!comTag || comTag !== comName)) {
                parent = parent.$parent;
                if (parent) {
                    comTag = parent.$options._componentTag;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        /**
         * 更新子节点的勾选逻辑
         *
         * @param {Array} item 节点对象
         */
        updateSubNodeCheckedHandler(item) {
            if (item.children && item.children.length) {
                item.children.forEach(node => {
                    this.$set(node, 'checked', item.checked);
                    this.$set(node, 'partChecked', false);
                    this.updateSubNodeCheckedHandler(node);
                });
            }
        },
        /**
         * 更新父级节点的勾选逻辑
         *
         * @param {Array} item 节点对象
         */
        updateAncestorNodeCheckedHandler(item) {
            let parent = item.parent;
            if (parent) {
                if (!item.checked && item.partChecked) {
                    this.updateAncestorNodePartCheckedHandler(item);
                }
                else {
                    let status = this.getSubNodeCheckedStatus(parent.children);
                    if (status === 'partChecked') {
                        this.updateAncestorNodePartCheckedHandler(item);
                    }
                    else if (status === 'allChecked') {
                        this.$set(parent, 'checked', true);
                        this.$set(parent, 'partChecked', false);
                        this.updateAncestorNodeCheckedHandler(parent);
                    }
                    else {
                        this.$set(parent, 'checked', false);
                        this.$set(parent, 'partChecked', false);
                        this.updateAncestorNodeCheckedHandler(parent);
                    }
                }
            }
        },
        /**
         * 更新父级节点到半勾选状态
         *
         * @param {Array} item 节点对象
         */
        updateAncestorNodePartCheckedHandler(item) {
            let parent = item.parent;
            if (parent) {
                this.$set(parent, 'checked', false);
                this.$set(parent, 'partChecked', true);
                this.updateAncestorNodePartCheckedHandler(parent);
            }
        },
        /**
         * 获取一级子节点的勾选状态
         *
         * @param {Array} items 节点对象集合
         * @return {string} 子节点的勾选状态
         */
        getSubNodeCheckedStatus(items) {
            let status = 'notPartChecked';
            if (items && items.length) {
                let firstItemStatus = items[0].checked || false;
                for (let i = 0, len = items.length; i < len; i++) {
                    let checked = items[i].checked || false;
                    if ((checked && items[i].partChecked) || (checked !== firstItemStatus)) {
                        status = 'partChecked';
                        break;
                    }
                }
                status = status === 'partChecked' ? status
                    : firstItemStatus ? 'allChecked' : 'allUnChecked';
            }
            return status;
        },
        /**
         * 拖动功能状态归位处理逻辑
         *
         * @param {Array} items 待修改的对象集合
         */
        setDragStatusHandler(items) {
            items.forEach(node => {
                this.$set(node, 'status', 'static');
                if (node.children && node.children.length) {
                    this.setDragStatusHandler(node.children);
                }
            });
        },
        /**
         * 判断当前动作是否为把祖先节点放到子节点上
         *
         * @param {Object} srcItem 要移动的节点
         * @param {Object} dirItem 要放置的位置节点
         * @return {boolean} 返回判断结果
         */
        isAncestorNode(srcItem, dirItem) {
            let isAncestorNode = false;
            let parent = dirItem.parent;
            while (parent) {
                if (parent === srcItem) {
                    isAncestorNode = true;
                    break;
                }
                parent = parent.parent;
            }
            return isAncestorNode;
        }
    }
};

