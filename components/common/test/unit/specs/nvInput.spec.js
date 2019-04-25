import { createVue, destroyVM, createTest } from '../util';
import NvInput from '../../../src/components/nv-input';

describe('input.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should have correct default data', done => {
        const items = [];
        vm = createTest(NvInput, {
        }, true);
        vm.$nextTick(() => {
            expect(vm.autocomplete).to.eql('off');
            expect(vm.type).to.eql('text');
            expect(vm.disabled).to.eql(false);
            expect(vm.readonly).to.eql(false);
            expect(vm.inputValue).to.eql('');
            expect(vm.suggestData).to.eql([]);
            done();
        });
    });
    it('should have suggest style', done => {
        const items = [];
        vm = createTest(NvInput, {
            width: 90
        }, true);
        vm.$nextTick(() => {
            expect(vm.suggestStyle).to.eql('width: 90px;')
            done();
        });
    });
    it('test setSuggestItem', done => {
        const items = [];
        vm = createTest(NvInput, {
        }, true);
        vm.$nextTick(() => {
            vm.setSuggestItem('test')
            expect(vm.inputValue).to.eql('test')
            done();
        });
    });
    it('test keyupHandler', done => {
        const items = [];
        vm = createTest(NvInput, {
        }, true);
        vm.$nextTick(() => {
            vm.keyupHandler()
            expect(vm.keyupHandler()).to.eql(undefined)
            done();
        });
    });
});