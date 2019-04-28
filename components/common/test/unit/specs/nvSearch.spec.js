import { createVue, destroyVM } from '../util';

describe('search.vue', () => {
    let vm;
    afterEach(() => {
    destroyVM(vm);
    });
    it('should create a steps component rightly whthout any init data', done => {
        vm = createVue({
            template: '<NvSearch></NvSearch>',
            data() {
                return {
                    value: {
                        searchName: 'products',
                        searchValue: 'noah监控'
                    },
                    options: [
                        {
                            label: '产品线',
                            value: 'products'
                        }, 
                        {
                            label: '应用名称',
                            value: 'taskName'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const placehodler = vm.$el.querySelector('.ivu-select-placeholder');
            const input = vm.$el.querySelector('.noahv-search-value').querySelector('input');
            expect(placehodler.innerText).contains('请选择');
            expect(input.innerText).to.be.equal('');
            done();
        });
    });
    it('should create a steps component rightly with init value', done => {
        vm = createVue({
            template: '<NvSearch :data="options"  v-model="value"></NvSearch>',
            data() {
                return {
                    value: {
                        searchName: 'products',
                        searchValue: 'noah监控'
                    },
                    options: [
                        {
                            label: '产品线',
                            value: 'products'
                        }, 
                        {
                            label: '应用名称',
                            value: 'taskName'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const key = vm.$el.querySelector('.ivu-select-selected-value');
            const input = vm.$el.querySelector('.noahv-search-value').querySelector('input');
            expect(key.innerText).contains('产品线');
            expect(input.value).contains('noah监控');
            done();
        });
    });
    it('should create a steps component rightly after change vlaue', done => {
        vm = createVue({
            template: '<NvSearch :data="options"  v-model="value"></NvSearch>',
            data() {
                return {
                    value: {
                        searchName: 'products',
                        searchValue: 'noah监控'
                    },
                    options: [
                        {
                            label: '产品线',
                            value: 'products'
                        }, 
                        {
                            label: '应用名称',
                            value: 'taskName'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            vm.$data.value.searchName = 'taskName';
            vm.$data.value.searchValue = 'argus';

            vm.$nextTick(() => {
                vm.$nextTick(() => {
                    vm.$nextTick(() => {
                        const key = vm.$el.querySelector('.ivu-select-selected-value');
                        const input = vm.$el.querySelector('.noahv-search-value').querySelector('input');
                        expect(key.innerText).contains('应用名称');
                        expect(input.value).contains('argus');

                        vm.$children[0].enter();

                        done();
                    });
                });
            });
        });
    });
});