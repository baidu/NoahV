import { createVue, destroyVM } from '../util';

describe('steps.vue', () => {
    let vm;
    afterEach(() => {
    destroyVM(vm);
    });
    it('should create a steps component rightly', done => {
        vm = createVue({
            template: '<NvSteps :datas="datas"></NvSteps>',
            data() {
                return {
                    datas: [
                        {
                            name: '阶段1',
                            status: 'finished'
                        },
                        {
                            name: '阶段2',
                            status: 'running'
                        },
                        {
                            name: '阶段3',
                            status: 'ready'
                        },
                        {
                            name: '阶段4',
                            status: 'ready'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const steps = vm.$el.querySelectorAll('.step-wrapper');
            const lastStep = vm.$el.querySelectorAll('.step-last-shown');
            const finishedSteps = vm.$el.querySelector('.text-finished');
            const runningSteps = vm.$el.querySelector('.text-running');
            const readySteps = vm.$el.querySelectorAll('.text-unfinished');
            expect(steps.length).to.be.equal(3);
            expect(lastStep).not.to.be.equal(null);
            expect(finishedSteps).not.to.be.equal(null);
            expect(runningSteps).not.to.be.equal(null);
            expect(readySteps).not.to.be.equal(null);
            done();
        });
    });
    it('should change stage and deal window resize event rightly', done => {
        vm = createVue({
            template: '<NvSteps :datas="datas" @on-click="clickHandler"></NvSteps>',
            data() {
                return {
                    click: false,
                    datas: [
                        {
                            name: '阶段1',
                            status: 'finished'
                        },
                        {
                            name: '阶段2',
                            status: 'running'
                        },
                        {
                            name: '阶段3',
                            status: 'ready'
                        },
                        {
                            name: '阶段4',
                            status: 'ready'
                        }
                    ]
                }
            },
            methods: {
                clickHandler() {
                    this.click = true;
                }
            }
        });
        vm.$nextTick(() => {
            let resizeEv = new Event('resize');
            window.dispatchEvent(resizeEv);

            const span = vm.$el.querySelector('.step-text');
            span.click();

            vm.$nextTick(() => {
                expect(vm.$data.click).to.be.equal(true);
                done();
            });        
        });
    });
    it('should create a steps component with stage detail panel show rightly', done => {
        vm = createVue({
            template: '<NvSteps :datas="datas" :panelShow="show"><div slot="detail"><h1>hello</h1></div></NvSteps>',
            data() {
                return {
                    show: true,
                    datas: [
                        {
                            name: '阶段1',
                            status: 'finished'
                        },
                        {
                            name: '阶段2',
                            status: 'running'
                        },
                        {
                            name: '阶段3',
                            status: 'ready'
                        },
                        {
                            name: '阶段4',
                            status: 'ready'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const steps = vm.$el.querySelector('.detail-wrapper');
            const h1 = steps.querySelector('h1');
            expect(steps).not.to.be.equal(null);
            expect(h1).not.to.be.equal(null);
            done();
        });
    });
    it('should create a steps component with turn btn run rightly', done => {
        vm = createVue({
            template: '<NvSteps :datas="datas" :step="step" :distance="distance"></NvSteps>',
            data() {
                return {
                    step: 7,
                    distance: 7,
                    datas: [
                        {
                            name: '阶段1',
                            status: 'finished'
                        },
                        {
                            name: '阶段2',
                            status: 'running'
                        },
                        {
                            name: '阶段3',
                            status: 'ready'
                        },
                        {
                            name: '阶段4',
                            status: 'ready'
                        },
                        {
                            name: '阶段5',
                            status: 'ready'
                        },
                        {
                            name: '阶段6',
                            status: 'ready'
                        },
                        {
                            name: '阶段7',
                            status: 'ready'
                        },
                        {
                            name: '阶段8',
                            status: 'ready'
                        },
                        {
                            name: '阶段9',
                            status: 'ready'
                        },
                        {
                            name: '阶段10',
                            status: 'ready'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const prevBtn = vm.$el.querySelector('.noahv-steps-prev-btn');
            prevBtn.click();
            vm.$nextTick(() => {
                const backBtn = vm.$el.querySelector('.noahv-steps-back-btn');
                const firstStep = vm.$el.querySelector('.noahv-steps-steps-wrapper').querySelector('.step-wrapper');
                const text = firstStep.querySelector('.step-text').innerHTML;
                expect(prevBtn).not.to.be.equal(null);
                expect(backBtn).not.to.be.equal(null);
                expect(text).to.be.include('阶段8');

                backBtn.click();
                vm.$nextTick(() => {
                    const firstStepNow = vm.$el.querySelector('.noahv-steps-steps-wrapper').querySelector('.step-wrapper');
                    const textNow = firstStepNow.querySelector('.step-text').innerHTML;
                    expect(textNow).to.be.include('阶段1');
                    done();
                });
            });
        });
    });
    it('should create a steps component with change event emit rightly', done => {
        vm = createVue({
            template: '<NvSteps :datas="datas" :panelShow="show" @on-change="changeHandler"><div slot="detail"><h1 class="step-content">{{content}}</h1></div></NvSteps>',
            data() {
                return {
                    show: true,
                    content: 'hello',
                    datas: [
                        {
                            name: '阶段1',
                            status: 'finished'
                        },
                        {
                            name: '阶段2',
                            status: 'running'
                        },
                        {
                            name: '阶段3',
                            status: 'ready'
                        },
                        {
                            name: '阶段4',
                            status: 'ready'
                        }
                    ]
                }
            },
            methods: {
                /**
                 * 步骤变化监听事件
                 *
                 * @param {Object} item 变化后的指向阶段
                 */
                changeHandler: function (item) {
                    this.content = 'world';
                }
            }
        });
        vm.$nextTick(() => {
            vm.datas[2]['status'] = 'finished';
            vm.datas[3]['status'] = 'running';
            vm.$nextTick(() => {
                const h1 = vm.$el.querySelector('.step-content');
                const text = h1.innerHTML;
                expect(text).to.be.equal('world');
                done();
            });
        });
    });
});