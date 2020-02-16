import { t } from '../locale';
import getClassName from '../util';

export default {
  methods: {
    t(...args) {
    	return t.apply(this, args);
    },
    /**
     * 获取类名
     *
     * @param {String} postfix 后缀名称
     * @return {Object} 样式集合
     */
    getCls(path) {
    	return getClassName.getComponentWrapperCls(path);
    }
  }
};