/**
 * NoahV
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file NvCascaderSelect Component ClickOutSide Directive File
 * @author nimingdexiaohai(nimingdexiaohai@163.com)
 */
export default {
    bind (el, binding, vnode) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind (el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
};