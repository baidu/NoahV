import { createVue, destroyVM, createTest } from '../util';
import NvButton from '../../../src/components/nv-button';

describe('button.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should have correct default data', done => {
        vm = createTest(NvButton, {
        }, true);
        vm.$nextTick(() => {
            expect(vm.content).to.eql('button');
            expect(vm.type).to.eql('ghost');
            expect(vm.disabled).to.eql(false);
            done();
        });
    });
    it('test getConfig', done => {
        vm = createTest(NvButton, {
            action: {}
        }, true);
        vm.$nextTick(() => {
            expect(vm.getConfig().url).to.eql('');
            expect(vm.getConfig().method).to.eql('get');
            done();
        });
    });
});