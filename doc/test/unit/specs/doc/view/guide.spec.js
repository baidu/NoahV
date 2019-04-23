import Vue from 'vue';
import { destroyVM } from '../util';
import docViewGuide from 'src/doc/view/guide'

describe('docViewGuide', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });

    // visit http://www.chaijs.com/api/ for more detail for insertion
    it('has a data hook', () => {
        expect(typeof docViewGuide.data).to.equal('function');
    });

    // it('must has a default data', () => {
    //     const defaultData = docViewGuide.data();
    //     expect(typeof defaultData.columns).to.equal('object');
    // });

    // it('defaultPageSize is 10', () => {
    //     const vm = new Vue(docViewGuide).$mount();
    //     expect(vm.pagination.defaultPageSize).to.equal(10);
    // });

    // it('renders the correct message', () => {
    //     const Constructor = Vue.extend(docViewGuide)
    //     const vm = new Constructor().$mount()
    //     expect(vm.$el.textContent).to.include('xxxx')
    // })
});