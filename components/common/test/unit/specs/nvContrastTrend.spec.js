import { createVue, destroyVM, createTest } from '../util';
import nvContrastTrend from '../../../src/components/nv-chart/';

describe('contrastTrend.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a form component rightly', done => {
        
        vm = createTest(nvContrastTrend, {
            url: '/api/chart/column',
            title: 'chart'
        }, true);
        vm.$nextTick(() => {
            const vm404 = vm.$el;
            expect(vm404).is.be.to.exist;
            expect(vm.title).to.be.equal('chart');
            expect(vm.trendItems).to.eql([]);
            expect(vm.nameList).to.eql([]);
            done();
        });
    });
});