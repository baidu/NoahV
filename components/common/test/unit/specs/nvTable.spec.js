import Vue from 'vue';
import NvTable from '../../../src/components/nv-table';
import { createTest, createVue, destroyVM } from '../util';

describe('NvTable.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });

    describe('create', () => {
        it('title && tips', () => {
            vm = createTest(NvTable, {
                title: 'testTitle',
                tips: 'testTips'
            }, true);
            expect(vm.$el.querySelector('.tabletpl-header').textContent).to.contain('testTitle');
            expect(vm.$el.querySelector('.tabletpl-footer').textContent).to.contain('testTips');
        });
        it('default data [tableData、selection、loadingConf、tableDatasource、extraParams、showPager、paginationData]', () => {
            const defaultData = NvTable.data();
            expect(defaultData.tableData).to.eql([]);
            expect(typeof NvTable.data).to.equal('function');
            expect(defaultData.loadingConf).to.equal(false);
            expect(defaultData.extraParams).to.eql({});
            expect(defaultData.showPager).to.equal(true);
            expect(defaultData.paginationData.pageNo).to.equal(1);
            expect(defaultData.selection).to.eql([]);
            expect(defaultData.tableDatasource).to.eql([]);
            expect(defaultData.extraParams).to.eql({});
        });

        it('watch props', done => {
            expect(typeof NvTable.watch).to.equal('object');
            vm = createVue(NvTable, true);
            vm.tdata = [{a: 1, b: 2}];
            vm.page = {
                pageNo: 10,
                totalCount: 200
            };
            var cb = sinon.spy(vm, 'reload');

            vm.params = {
                test: true
            };

            vm.loading = true
            

            Vue.nextTick(() => {
                expect(vm.tableDatasource).to.eql([{a: 1, b: 2}]);
                expect(vm.paginationData.pageNo).to.equal(10);
                expect(vm.paginationData.totalCount).to.equal(200);
                expect(vm.loadingConf).to.equal(true);
                vm.reload.should.have.callCount(1);
                vm.showLoading = false;
                vm.loading = false
                Vue.nextTick(() => {
                    expect(vm.loadingConf).to.equal(false);
                    done();
                });
                done();
            });
        });

        it('computed props', done => {
            expect(typeof NvTable.computed).to.equal('object');
            vm = createVue(NvTable, true);
            vm.action = {
                title: 'test'
            };
            vm.pagination = {
                remote: true
            };
            Vue.nextTick(() => {
                expect(vm.columnsData.length).to.equal(1);
                expect(vm.remotePage).to.equal(true);
                done();
            });  
        });

        it('created', () => {
            expect(typeof NvTable.created).to.equal('function');
            vm = createTest(NvTable, {
                pagination: {
                    remote: true
                },
                tdata: [{
                    a: 1,
                    b: 2
                }]
            }, true);
            
            expect(vm.tableData).to.eql([{
                a: 1,
                b: 2
            }]);

            destroyVM(vm);

            vm = createTest(NvTable, {
                pagination: false,
                tdata: [{
                    a: 1,
                    b: 2
                }]
            }, true);
            expect(vm.tableData).to.eql([{
                a: 1,
                b: 2
            }]);

        });
    });
    describe('function', () => {
        it('dataFilter', () => {
            vm = createTest(NvTable, {
                pagination: {
                    remote: true
                },
                dataFilter(data) {
                    data[0].a = 3;
                    return data;
                },
                tdata: [{
                    a: 1,
                    b: 2
                }]
            }, true);
            expect(vm.tableData[0].a).to.equal(3);
        });

        it('handlerPagination', () => {
            vm = createTest(NvTable, {
                pagination: {
                    remote: true,
                    currentPage: 2,
                    defaultPageSize: 20,
                    pageSizeOptions: [10, 20, 30, 40]
                }
            }, true);
            vm.handlerPagination();
            expect(vm.extraParams).to.deep.eql({ pageNo: 2, pageSize: 20 });
        });

        it('getAjaxConfig', () => {
            vm = createTest(NvTable, {
                method: 'get'
            }, true);
            const ReturnDataOne = vm.getAjaxConfig();
            expect(ReturnDataOne.method).to.equal('get');

            vm = createTest(NvTable, {
                params: {
                    test: true
                }
            }, true);
            const ReturnDataTwo = vm.getAjaxConfig();
            expect(ReturnDataTwo.data).to.deep.equal({ test: true });
        });
    });
    describe('columns', () => {
        it('custom action', () => {
             vm = createTest(NvTable, {
                action: {
                    title: '操作',
                    width: 200,
                    list: []
                },
                columns: [{title: 'id', key: 'id'}],
                tdata: [{id: 1}]
            }, true);
            expect(vm.columnsData[1].title).to.equal('操作');
        });
        it('custom rowSelect', () => {
             vm = createTest(NvTable, {
                rowSelect: true,
                columns: [{title: 'id', key: 'id'}],
                tdata: [{id: 1}]
            }, true);
            expect(vm.columnsData[0].type).to.equal('selection');
        });
        it('custom link', () => {
            vm = createTest(NvTable, {
                columns: [{
                    title: 'id',
                    link: 'https://www.baidu.com?id={id}',
                    key: 'id'
                }],
                tdata: [{
                    id: 1
                }]
            }, true);
            expect(vm.$el.querySelector('.ivu-table-cell a').href).to.contain('id=1');
        })
        it('custom label showError', () => {
            vm = createTest(NvTable, {
                columns: [{
                    title: 'test',
                    label: 'test',
                    showError: true,
                    key: 'id'
                }],
                tdata: [{
                    id: ['test', false]
                }]
            }, true);
            expect(vm.$el.querySelector('.ivu-table-cell .highlight-error').textContent).to.equal('test');
        })
    });
});