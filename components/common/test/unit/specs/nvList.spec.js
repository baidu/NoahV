import { createVue, destroyVM, createTest } from '../util';
import NvList from '../../../src/components/nv-list';

describe('list.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should have correct default data', done => {
        vm = createTest(NvList, {
            action: {},
            data: []
        }, true);
        vm.$nextTick(() => {
            expect(vm.list).to.eql([]);
            done();
        });
    });
    it('test setList', done => {
        vm = createTest(NvList, {
            action: {},
            data: [],
            templates: {}
        }, true);
        vm.$nextTick(() => {
            vm.setList('test', true)
            expect(vm.list).to.eql([{}]);
            vm.setList('test', false)
            // expect(vm.list).to.eql(['test']);
            done();
        });
    });
});