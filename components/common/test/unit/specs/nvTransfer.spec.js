import { createVue, destroyVM } from '../util';

describe('pipline.vue', () => {
    let vm;
    afterEach(() => {
    destroyVM(vm);
    });
    it('should create a transfer component rightly', done => {
        vm = createVue({
            template: '<NvTransfer leftTitle="源列表" rightTitle="目标列表" :options="options1" :leftSearch="true"'
            + ':rightSearch="true" :leftDisabled="false" :rightDisabled="false" @on-change="change"></NvTransfer>',
            data() {
                return {
                    options1: [],
                }
            },
            created() {
                let group = [];
                for (let j = 1; j< 10; j++) {
                    let node = {};
                    node.name = j;
                    node.title = j + '.app1.bidtest.com';
                    node.checkbox = true;
                    group.push(node);
                }
                this.options1 = group;
            }
        });
        vm.$nextTick(() => {
            const transfer = vm.$children[0];
            expect(transfer.leftOptions.length).to.be.equal(9);

            const transferBtn = vm.$el.querySelectorAll('.arrow-btn');
            const firstCheckbox = vm.$el.querySelector('.left').querySelector('.noahv-tree').querySelector('.node-checkbox').querySelector('label');
            firstCheckbox.click();

            vm.$nextTick(() => {
                transferBtn[0].click();
                vm.$nextTick(() => {
                    expect(transfer.rightOptions.length).to.be.equal(1);
                    done();
                })
            });
        });
    });
    
});