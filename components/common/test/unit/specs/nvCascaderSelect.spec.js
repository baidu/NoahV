import { createVue, destroyVM } from '../util';

describe('cascaderSelect.vue', () => {
    let vm;
    afterEach(() => {
    destroyVM(vm);
    });
    it('should create a cascaderSelect component rightly', done => {
        vm = createVue({
            template: '<NvCascaderSelect :data="data"></NvCascaderSelect>',
            data() {
                return {
                    data: [
                        {
                            label: '美食',
                            value: 'meishi'
                        },
                        {
                            label: '酒水',
                            value: 'jiushui'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const cascaderSelect = vm.$el.querySelector('.input-wrapper');
            cascaderSelect.click();
            vm.$nextTick(() => {
                const drop = vm.$children[0].drop;
                expect(drop).to.be.equal(true);
                done();
            });
        });
    });

    it('should create a cascaderSelect component and select rightly', done => {
        vm = createVue({
            template: '<NvCascaderSelect :data="data" @on-change="changeHandler"></NvCascaderSelect>',
            data() {
                return {
                    data: [
                        {
                            label: '美食',
                            value: 'meishi'
                        },
                        {
                            label: '酒水',
                            value: 'jiushui'
                        },
                        {
                            label: '干果',
                            value: 'ganguo',
                            children: [
                                {
                                    label: '核桃',
                                    value: 'hetao'
                                },
                                {
                                    label: '花生',
                                    value: 'huasheng'
                                },
                                {
                                    label: '瓜子',
                                    value: 'guazi'
                                }
                            ]
                        }
                    ],
                    selectedValues: []
                }
            },
            methods: {
                changeHandler(selectedValues) {
                    this.selectedValues = selectedValues;
                }
            }
        });
        vm.$nextTick(() => {
            const cascaderSelect = vm.$el.querySelector('.input-wrapper');
            cascaderSelect.click();
            vm.$nextTick(() => {
                const menuItem = vm.$el.querySelector('.menu-item');
                menuItem.click();
                vm.$nextTick(() => {
                    expect(vm.selectedValues[0]).to.be.equal('meishi');
                    done();
                });
            });
        });
    });

    it('should create a cascaderSelect component and select sub menu rightly', done => {
        vm = createVue({
            template: '<NvCascaderSelect :data="data" @on-change="changeHandler"></NvCascaderSelect>',
            data() {
                return {
                    data: [
                        {
                            label: '美食',
                            value: 'meishi'
                        },
                        {
                            label: '酒水',
                            value: 'jiushui'
                        },
                        {
                            label: '干果',
                            value: 'ganguo',
                            children: [
                                {
                                    label: '核桃',
                                    value: 'hetao'
                                },
                                {
                                    label: '花生',
                                    value: 'huasheng'
                                },
                                {
                                    label: '瓜子',
                                    value: 'guazi'
                                }
                            ]
                        }
                    ],
                    selectedValues: []
                }
            },
            methods: {
                changeHandler(selectedValues) {
                    this.selectedValues = selectedValues;
                }
            }
        });
        vm.$nextTick(() => {
            const cascaderSelect = vm.$el.querySelector('.input-wrapper');
            cascaderSelect.click();
            vm.$nextTick(() => {
                const menuItem = vm.$el.querySelectorAll('.menu-item');
                menuItem[2].click();
                vm.$nextTick(() => {
                    vm.data[2].children[0].active = true;
                    vm.$children[0].subMenuClick(vm.data[2].children[0]);
                    vm.$children[0].close();
                    vm.$nextTick(() => {
                        expect(vm.selectedValues[0]).to.be.equal('hetao');
                        done();
                    });
                });
            });
        });
    });
    
});