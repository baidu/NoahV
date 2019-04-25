import { createVue, destroyVM, createTest } from '../util';
import { NvTrend } from '../../../src/components/nv-chart/';

describe('trend.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a form component rightly', done => {
        
        vm = createTest(NvTrend, {
            url: '/api/chart/column',
            title: 'chart'
        }, true);
        vm.$nextTick(() => {
            const vm404 = vm.$el;
            expect(vm404).is.be.to.exist;
            expect(vm.title).to.be.equal('chart');
            done();
        });
    });
    it('should have instance name', done => {
        vm = createTest(NvTrend, {
            url: '/api/chart/column',
            title: 'chart'
        }, true);
        vm.$nextTick(() => {
            expect(vm.getInstance()).is.be.to.exist;
            done();
        });
    });
});