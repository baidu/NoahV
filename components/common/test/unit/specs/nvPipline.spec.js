import { createVue, destroyVM } from '../util';

describe('pipline.vue', () => {
    let vm;
    afterEach(() => {
    destroyVM(vm);
    });
    it('should create a pipline component rightly', done => {
        vm = createVue({
            template: '<NvPipline ref="piplineNodeRef" :data="pipLineNodes" :nodeTitle="nodeTitle"'
             + ':nodeTemplate="nodeTemplate" :cardTemplate="cardTemplate" :cardTitle="cardTitle"></NvPipline>',
            data() {
                return {
                    pipLineNodes: [
                        {
                            cardSet: [
                                {
                                    account: 'work',
                                    timeout: '600',
                                    name: '升级基础环境',
                                    description: '用于升级机器基础环境'
                                }
                            ]
                        }
                    ],
                    nodeTitle: '步骤',
                    cardTitle: '并行脚本',
                    nodeTemplate: {
                        cardSet: [
                            {
                                account: '',
                                timeout: '',
                                name: '',
                                description: ''
                            }
                        ]
                    },
                    cardTemplate: {
                        account: '',
                        timeout: '',
                        name: '',
                        description: ''
                    }
                }
            }
        });
        vm.$nextTick(() => {
            const pipline = vm.$el;
            const node = pipline.querySelector('.node');
            const indexName = node.querySelector('.index-name');
            const btnGroup = node.querySelector('.index-btn-group').querySelectorAll('.noahv-icon');

            expect(indexName.innerText).contains('步骤1');
            expect(btnGroup.length).to.be.equal(3);

            const addCard = node.querySelector('.add-card').querySelector('p');
            addCard.click();
            vm.$nextTick(() => {
                expect(vm.$children[0].nodes[0].cardSet.length).to.be.equal(2);
                done();
            });
        });
    });
    
});