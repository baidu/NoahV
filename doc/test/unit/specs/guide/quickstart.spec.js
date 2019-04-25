import Vue from 'vue';
import { destroyVM } from '../util';
import guideQuickstart from 'src/guide/quickstart'

describe('guideQuickstart', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });

    // visit http://www.chaijs.com/api/ for more detail for insertion
    it('has a data hook', () => {
        expect(typeof guideQuickstart.data).to.equal('function');
    });

    // it('must has a default data', () => {
    //     const defaultData = guideQuickstart.data();
    //     expect(typeof defaultData.columns).to.equal('object');
    // });

    // it('defaultPageSize is 10', () => {
    //     const vm = new Vue(guideQuickstart).$mount();
    //     expect(vm.pagination.defaultPageSize).to.equal(10);
    // });

    // it('renders the correct message', () => {
    //     const Constructor = Vue.extend(guideQuickstart)
    //     const vm = new Constructor().$mount()
    //     expect(vm.$el.textContent).to.include('xxxx')
    // })
});