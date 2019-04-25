import { createVue, destroyVM, createTest } from '../util';
import NvSwitch from '../../../src/components/nv-switch';

describe('switch.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should have correct default data', done => {
        vm = createTest(NvSwitch, {
            open: {}
        }, true);
        vm.$nextTick(() => {
            expect(vm.value).to.eql(false);
            expect(vm.size).to.eql('default');
            expect(vm.disabled).to.eql(false);
            expect(vm.switchValue).to.eql(false);
            expect(vm.openText).to.eql('');
            expect(vm.closeText).to.eql('');
            done();
        });
    });
    it('test changeSwitch', done => {
        vm = createTest(NvSwitch, {
            open: {}
        }, true);
        vm.$nextTick(() => {
            vm.changeSwitch('test')
            expect(vm.switchValue).to.eql('test');
            done();
        });
    });
});