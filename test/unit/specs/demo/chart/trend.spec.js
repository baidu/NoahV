import Vue from 'vue';
import { destroyVM } from '../../../util';
import demoChartTrend from 'src/demo/chart/trend';

/* eslint-disable no-undef */
describe('demoChartTrend', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });

    // visit http://www.chaijs.com/api/ for more detail for insertion
    it('has a data hook', () => {
        expect(typeof demoChartTrend.data).to.equal('function');
    });

    // it('must has a default data', () => {
    //     const defaultData = demoChartTrend.data();
    //     expect(typeof defaultData.columns).to.equal('object');
    // });

    it('mount', () => {
        const vm = new Vue(demoChartTrend).$mount();
        expect(vm.name).to.equal('NvTrend');
    });

    // it('renders the correct message', () => {
    //     const Constructor = Vue.extend(demoChartTrend)
    //     const vm = new Constructor().$mount()
    //     expect(vm.$el.textContent).to.include('xxxx')
    // })
});
/* eslint-enable */
