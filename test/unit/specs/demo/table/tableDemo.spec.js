import Vue from 'vue';
import {destroyVM } from '../../../util';
import tableDemo from 'src/demo/table/tableDemo';

/* eslint-disable no-undef */
describe('tableTpl', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // visit http://www.chaijs.com/api/ for more detail

    it('has a data hook', () => {
        expect(typeof tableDemo.data).to.equal('function');
    });

    it('must has a default data', () => {
        const defaultData = tableDemo.data();
        expect(typeof defaultData.columns).to.equal('object');
    });

    it('defaultPageSize is 10', () => {
        vm = new Vue(tableDemo).$mount();
        expect(vm.pagination.defaultPageSize).to.equal(10);
    });

    it('renders the correct message', () => {
        const Constructor = Vue.extend(tableDemo);
        vm = new Constructor().$mount();
        expect(vm.$el.textContent).to.include('表格示例');
    });
});
/* eslint-enable */
