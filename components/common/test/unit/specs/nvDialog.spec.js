import { createVue, destroyVM, createTest } from '../util';
import NvDialog from '../../../src/components/nv-dialog';

describe('button.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should have correct default data', done => {
        vm = createTest(NvDialog, {
            dialog: {}
        }, true);
        vm.$nextTick(() => {
            expect(vm.dialogWidth).to.eql(520);
            done();
        });
    });
    it('test getAjaxConfig', done => {
        vm = createTest(NvDialog, {
            dialog: {
                ok: {}
            }
        }, true);
        vm.$nextTick(() => {
            expect(vm.getAjaxConfig().url).to.eql('');
            expect(vm.getAjaxConfig().method).to.eql('get');
            done();
        });
    });
});