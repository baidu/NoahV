/* eslint-disable */
import { createVue, destroyVM } from '../util';

describe('tree.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a basic tree component', done => {
        vm = createVue({
            template: '<NvTree :items="items"></NvTree>',
            data() {
                return {
                    items: [
                        {
                            title: 'node1',
                            name: 'node1'
                        },
                        {
                            title: 'node2',
                            name: 'node2'
                        },
                        {
                            title: 'node3',
                            name: 'node3'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const nodeWrapper = vm.$el.querySelector('.node-wrapper');
            expect(nodeWrapper).is.be.to.exist;

            const nodeList = nodeWrapper.querySelectorAll('ul');
            expect(nodeList.length).to.equal(3);
            done();
        });
    });
    
    it('should create a basic tree component with search function excute rightly', done => {
        vm = createVue({
            template: '<NvTree :items="items" :search="true" :accordion="true"></NvTree>',
            data() {
                return {
                    items: [
                        {
                            title: 'node1',
                            name: 'node1'
                        },
                        {
                            title: 'node2',
                            name: 'node2'
                        },
                        {
                            title: 'node3',
                            name: 'node3',
                            children: [
                                {
                                    title: 'node3-1',
                                    name: 'node3-1',
                                },
                                {
                                    title: 'node3-2',
                                    name: 'node3-2',
                                }
                            ]
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            vm.$children[0].$data.searchValue = '3-2';
            const searchInput = vm.$el.querySelector('.search-input');
            var enterKey = new KeyboardEvent('keyup', {
                keyCode: 13
            });
            searchInput.dispatchEvent(enterKey);
            done();
        });
    });

    it('tree component should expand node rightly', done => {
        vm = createVue({
            template: '<NvTree :items="items" :accordion="true"></NvTree>',
            data() {
                return {
                    items: [
                        {
                            title: 'node1',
                            name: 'node1',
                            children: [
                                {
                                    title: 'node1-1',
                                    name: 'node1-1'
                                }
                            ]
                        },
                        {
                            title: 'node2',
                            name: 'node2'
                        },
                        {
                            title: 'node3',
                            name: 'node3'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const nodeWrapper = vm.$el.querySelector('.node-wrapper');
            const firstNode = nodeWrapper.querySelector('ul').querySelector('li');
            const expandBtn = firstNode.querySelector('.arrow-normal');
            expandBtn.click();

            vm.$nextTick(() => {
                const children = firstNode.querySelectorAll('ul');
                expect(children.length).to.equal(1);

                done();
            });
        });
    });

    it('tree component should support node selected rightly', done => {
        vm = createVue({
            template: '<NvTree :items="items"></NvTree>',
            data() {
                return {
                    items: [
                        {
                            title: 'node1',
                            name: 'node1'
                        },
                        {
                            title: 'node2',
                            name: 'node2'
                        },
                        {
                            title: 'node3',
                            name: 'node3'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const nodeWrapper = vm.$el.querySelector('.node-wrapper');
            const firstNode = nodeWrapper.querySelector('ul').querySelector('li');
            const title = firstNode.querySelector('.node-title');
            title.click();

            vm.$nextTick(() => {
                const selected = title.className.indexOf('node-selected') > -1 ? true : false;
                expect(selected).to.equal(true);
                done();
            });
        });
    });

    it('should create a basic tree component with multi selected function excute rightly', done => {
        vm = createVue({
            template: '<NvTree :items="items" :multiple="true"></NvTree>',
            data() {
                return {
                    items: [
                        {
                            title: 'node1',
                            name: 'node1'
                        },
                        {
                            title: 'node2',
                            name: 'node2'
                        },
                        {
                            title: 'node3',
                            name: 'node3'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const nodeList = vm.$el.querySelectorAll('.node-title');
            const node1 = nodeList[0];
            const node2 = nodeList[1];
            node1.click();
            node2.click();

            vm.$nextTick(() => {
                let selected = vm.$el.querySelectorAll('.node-selected');
                expect(selected.length).to.be.equal(2);

                node1.click();
                vm.$nextTick(() => {
                    selected = vm.$el.querySelectorAll('.node-selected');
                    expect(selected.length).to.be.equal(1);
                    done();
                });
            });            
        });
    });

    it('tree component should support multi node selected rightly', done => {
        vm = createVue({
            template: '<NvTree :items="items" :multiple="true"></NvTree>',
            data() {
                return {
                    items: [
                        {
                            title: 'node1',
                            name: 'node1'
                        },
                        {
                            title: 'node2',
                            name: 'node2'
                        },
                        {
                            title: 'node3',
                            name: 'node3'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const nodeWrapper = vm.$el.querySelector('.node-wrapper');
            const nodeList = nodeWrapper.querySelectorAll('ul');
            const firstNode = nodeList[0].querySelector('li');
            const secondeNode = nodeList[1].querySelector('li');
            const firstNodeTitle = firstNode.querySelector('.node-title');
            const secondeNodeTitle = secondeNode.querySelector('.node-title');
            firstNodeTitle.click();
            secondeNodeTitle.click();

            vm.$nextTick(() => {
                const firstNodeSelected = firstNodeTitle.className.indexOf('node-selected') > -1 ? true : false;
                const secondeNodeSelected = secondeNodeTitle.className.indexOf('node-selected') > -1 ? true : false;
                expect(firstNodeSelected).to.equal(true);
                expect(secondeNodeSelected).to.equal(true);
                done();
            });
        });
    });

    it('tree component should check checkbox rightly', done => {
        vm = createVue({
            template: '<NvTree :items="data.items" :checkbox="data.checkbox"></NvTree>',
            data() {
                return {
                    data: {
                        checkbox: true,
                        items: [
                            {
                                title: 'node1',
                                name: 'node1',
                                spread: true,
                                children: [
                                    {
                                        title: 'node1-1',
                                        name: 'node1-1'
                                    }
                                ]
                            },
                            {
                                title: 'node2',
                                name: 'node2'
                            },
                            {
                                title: 'node3',
                                name: 'node3'
                            }
                        ]
                    }
                }
            }
        });
        vm.$nextTick(() => {
            const nodeWrapper = vm.$el.querySelector('.node-wrapper');
            const firstNode = nodeWrapper.querySelector('ul').querySelector('li');
            
            const checkbox = firstNode.querySelector('.node-checkbox').querySelector('label');
            checkbox.click();
            vm.$nextTick(() => {
                const label = firstNode.querySelectorAll('.node-checked');
                expect(label.length).to.be.equal(2);


                const node1_1 = firstNode.querySelector('ul').querySelector('.node-checked');
                node1_1.click();
                vm.$nextTick(() => {
                    const checked = firstNode.querySelector('ul').querySelectorAll('.node-checked');
                    expect(checked.length).to.be.equal(0);
                    done();
                });
            });
        });
    });
  
    it('should create a tree component and append and remove function run right', done => {
        vm = createVue({
            template: '<NvTree :items="items" :editMode="editable" :appendLabel="appendLabel"'
                + ':removeLabel="removeLabel" :editLabel="editLabel"></NvTree>',
            data() {
                return {
                    editable: true,
                    appendLabel: 'Append',
                    removeLabel: 'Delete',
                    editLabel: 'Edit',
                    items: [
                        {
                            title: 'node1',
                            name: 'node1'
                        },
                        {
                            title: 'node2',
                            name: 'node2'
                        },
                        {
                            title: 'node3',
                            name: 'node3'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const firstNode = vm.$el.querySelector('.node-wrapper').querySelector('.tree-node');
            const editPanel = vm.$el.querySelector('.edit-panel').querySelectorAll('span');
            const appendIcon = editPanel[1];
            const removeIcon = editPanel[2];
            appendIcon.click();
            const firstExpandIcon = firstNode.querySelectorAll('div')[0];
            firstExpandIcon.click();
            const childeNode = firstNode.querySelector('span').querySelectorAll('.arrow-expand');
            removeIcon.click();
            vm.$nextTick(() => {
                const allRootNode = vm.$el.querySelector('.node-wrapper').querySelectorAll('.tree-node');
                expect(allRootNode).to.have.lengthOf(2);
            });
            expect(childeNode).is.be.to.exist;
            done();
        });
    });

    it('should create a tree component and check and partCheck run right', done => {
        vm = createVue({
            template: '<NvTree tip="未获取到数据" :checkbox="checkbox" :search="true" :items="items"'
            + ':editMode="true" :lazyLoad="lazyLoad" :loadData="loadData"'
            + ':draggable="true" appendIcon="plus-small-square-o" removeIcon="minus-small-square-o"'
            + 'editIcon="edit-o"></NvTree>',
            data() {
                return {
                    checkbox: true,
                    lazyLoad: true,
                    items: [
                        {
                            title: 'node1',
                            name: 'node1',
                            spread: true,
                            children: [
                                {
                                    title: 'node1-1',
                                    name: 'node1-1'
                                },
                                {
                                    title: 'node1-2',
                                    name: 'node1-2'
                                }
                            ]
                        },
                        {
                            title: 'node2',
                            name: 'node2'
                        },
                        {
                            title: 'node3',
                            name: 'node3'
                        }
                    ]
                }
            },
            methods: {
                loadData(item, callback) {
                    setTimeout(() => {
                        const data = [
                            {
                                title: 'children1',
                                name: 'children1',
                                children: []
                            },
                            {
                                title: 'children2',
                                name: 'children2',
                                children: []
                            }
                        ];
                        callback(data);
                    }, 10);
                }
            }
        });
        vm.$nextTick(() => {
            const node1 = vm.$el.querySelector('.node-wrapper').querySelector('ul');
            const node1_1 = node1.querySelectorAll('ul')[0];
            
            const checkbox = node1_1.querySelector('.node-checkbox').querySelector('label');
            checkbox.click();
            const newNode1 = vm.$el.querySelector('.node-wrapper').querySelector('ul');
            const newNode1_1 = newNode1.querySelectorAll('ul')[0];
            const isChecked = newNode1_1.querySelectorAll('.node-checked');
            expect(isChecked).is.be.to.exist;

            const searchWrapper = vm.$el.querySelector('.search-wrapper');
            const input = searchWrapper.querySelector('.search-input');
            const btn = searchWrapper.querySelector('.search-btn');
            input.value = 'node2';
            btn.click();

            expect(searchWrapper).is.be.to.exist;
            done();
        });
    });

    it('should create a basic tree component with lazyLoad function excute rightly', done => {
        vm = createVue({
            template: '<NvTree :items="items" :lazyLoad="true" :loadData="loadData" :editMode="true"></NvTree>',
            data() {
                return {
                    items: [
                        {
                            title: 'node1',
                            name: 'node1',
                            lazyable: true
                        },
                        {
                            title: 'node2',
                            name: 'node2'
                        },
                        {
                            title: 'node3',
                            name: 'node3'
                        }
                    ]
                }
            },
            methods: {
                loadData(item, callback) {
                    const data = [
                        {
                            title: 'children1',
                            children: []
                        },
                        {
                            title: 'children2',
                            children: []
                        }
                    ];
                    callback(data);
                }
            }
        });
        vm.$nextTick(() => {
            const arrow = vm.$el.querySelector('.node-arrow').querySelector('span');
            arrow.click();

            vm.$nextTick(() => {
                // ui update will delay than data
                // so just check data change
                const children = vm.$data.items[0].children;
                expect(children.length).to.be.equal(2);

                const editBtn = vm.$el.querySelector('.edit-panel').querySelector('span');
                editBtn.click();
                done();
            });
        });
    });

    it('should create a basic tree component with drag function excute rightly', done => {
        vm = createVue({
            template: '<NvTree :items="items" :draggable="true"></NvTree>',
            data() {
                return {
                    items: [
                        {
                            title: 'node1',
                            name: 'node1'
                        },
                        {
                            title: 'node2',
                            name: 'node2'
                        },
                        {
                            title: 'node3',
                            name: 'node3'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const nodeList = vm.$el.querySelectorAll('ul');

            var dragStart = new MouseEvent('dragstart', {});
            var dragOver = new MouseEvent('dragover', {});
            var dragend = new MouseEvent('dragend', {});
            var drop = new MouseEvent('drop', {});
            nodeList[0].dispatchEvent(dragStart);
            setTimeout(() => {
                nodeList[1].dispatchEvent(dragOver);
                nodeList[2].dispatchEvent(dragend);
                nodeList[0].dispatchEvent(drop);
                expect(vm.$data.items.length).to.be.equal(3);
                done();
            }, 200);
        });
    });
});
