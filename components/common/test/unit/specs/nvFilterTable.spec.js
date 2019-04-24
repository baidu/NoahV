import { createVue, destroyVM, createTest } from '../util';
import NvFilterTable from '../../../src/components/nv-filtertable';

describe('filtrtable.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a form component rightly', done => {
        
        vm = createTest(NvFilterTable, {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: '输入用户名',
                    width: '400px',
                    value: '111',
                    required: true
                }
            ],
            columns: [{
                title: 'username',
                link: 'https://www.baidu.com?id={id}',
                key: 'username'
            }]
        }, true);
        vm.$nextTick(() => {
            const vm404 = vm.$el;
            expect(vm404).is.be.to.exist;
            expect(vm.rowSelect).to.be.equal(false);
            expect(vm.border).to.be.equal(false);
            expect(vm.showLoading).to.be.equal(true);
            expect(vm.stripe).to.be.equal(false);
            expect(vm.showsizer).to.be.equal(true);
            expect(vm.autoLoadData).to.be.equal(true);
            expect(vm.showelevator).to.be.equal(false);
            done();
        });
    });
    it('should have correct pagination', done => {
        vm = createTest(NvFilterTable, {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: '输入用户名',
                    width: '400px',
                    value: '111',
                    required: true
                }
            ],
            columns: [{
                title: 'username',
                link: 'https://www.baidu.com?id={id}',
                key: 'username'
            }],
            pagination: {
                defaultPageSize: 100,
                currentPage: 10
            }
        }, true);
        vm.$nextTick(() => {
            expect(vm.extraParams).to.eql({
                pageSize: 100,
                pageNo: 10
            });
            done();
        });
    });
    it('test getSelectItem', done => {
        vm = createTest(NvFilterTable, {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: '输入用户名',
                    width: '400px',
                    value: '111',
                    required: true
                }
            ],
            columns: [{
                title: 'username',
                link: 'https://www.baidu.com?id={id}',
                key: 'username'
            }],
            pagination: {
                defaultPageSize: 100,
                currentPage: 10
            },
            rowSelect: true
        }, true);
        vm.$nextTick(() => {
            expect(vm.getSelectItem()).to.eql([]);
            done();
        });
    });
});