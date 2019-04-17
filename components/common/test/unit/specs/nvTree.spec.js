// import { createVue, destroyVM } from '../util';

// describe('tree.vue', () => {
//     let vm;
//     afterEach(() => {
//         destroyVM(vm);
//     });
//     it('should create a tree component', done => {
//         vm = createVue({
//             template: '<NvTree :items="data.items" :editable="data.editable" :appendIcon="data.appendIcon"'
//                 + ':removeIcon="data.removeIcon" :editIcon="data.editIcon"></NvTree>',
//             data() {
//                 return {
//                     data: {
//                         editable: true,
//                         appendIcon: 'plus-small-square-o',
//                         removeIcon: 'minus-small-square-o',
//                         editIcon: 'edit-o',
//                         items: [
//                             {
//                                 title: 'node1',
//                                 name: 'node1'
//                             },
//                             {
//                                 title: 'node2',
//                                 name: 'node2'
//                             },
//                             {
//                                 title: 'node3',
//                                 name: 'node3'
//                             }
//                         ]
//                     }
//                 }
//             }
//         });
//         vm.$nextTick(() => {
//             const nodeWrapper = vm.$el.querySelector('.noahv-tree-node-wrapper');
//             const editPanel = vm.$el.querySelector('.noahv-tree-edit-panel');
//             expect(nodeWrapper).is.be.to.exist;
//             expect(editPanel).is.be.to.exist;
//             done();
//         });
//     });
//     it('should create a tree component and select and check function run right', done => {
//         vm = createVue({
//             template: '<NvTree :items="items"></NvTree>',
//             data() {
//                 return {
//                     items: [
//                         {
//                             title: 'node1',
//                             name: 'node1',
//                             children: [{
//                                 title: 'node1-1',
//                                 name: 'node1-1'
//                             }]
//                         },
//                         {
//                             title: 'node2',
//                             name: 'node2'
//                         },
//                         {
//                             title: 'node3',
//                             name: 'node3'
//                         }
//                     ]
//                 }
//             }
//         });
//         vm.$nextTick(() => {
//             const firstNode = vm.$el.querySelector('.noahv-tree-node-wrapper').querySelector('.noahv-tree-node');
//             const firstExpandIcon = firstNode.querySelectorAll('div')[0];
//             firstExpandIcon.click();
//             const childeNode = firstNode.querySelector('span').querySelectorAll('.noahv-tree-arrow-expand');
//             firstExpandIcon.click();
//             const childeNodeOfFirstNode = firstNode.querySelector('span').querySelectorAll('.noahv-tree-arrow-expand')[0];
//             expect(childeNode).is.be.to.exist;
//             expect(childeNodeOfFirstNode).to.be.undefined;
//             done();
//         });
//     });
//     it('should create a tree component and append and remove function run right', done => {
//         vm = createVue({
//             template: '<NvTree :items="items" :editable="editable" :appendLabel="appendLabel"'
//                 + ':removeLabel="removeLabel" :editLabel="editLabel"></NvTree>',
//             data() {
//                 return {
//                     editable: true,
//                     appendLabel: 'Append',
//                     removeLabel: 'Delete',
//                     editLabel: 'Edit',
//                     items: [
//                         {
//                             title: 'node1',
//                             name: 'node1'
//                         },
//                         {
//                             title: 'node2',
//                             name: 'node2'
//                         },
//                         {
//                             title: 'node3',
//                             name: 'node3'
//                         }
//                     ]
//                 }
//             }
//         });
//         vm.$nextTick(() => {
//             const firstNode = vm.$el.querySelector('.noahv-tree-node-wrapper').querySelector('.noahv-tree-node');
//             const editPanel = vm.$el.querySelector('.noahv-tree-edit-panel').querySelectorAll('span');
//             const appendIcon = editPanel[1];
//             const removeIcon = editPanel[2];
//             appendIcon.click();
//             const firstExpandIcon = firstNode.querySelectorAll('div')[0];
//             firstExpandIcon.click();
//             const childeNode = firstNode.querySelector('span').querySelectorAll('.noahv-tree-arrow-expand');
//             removeIcon.click();
//             vm.$nextTick(() => {
//                 const allRootNode = vm.$el.querySelector('.noahv-tree-node-wrapper').querySelectorAll('.noahv-tree-node');
//                 expect(allRootNode).to.have.lengthOf(2);
//             });
//             expect(childeNode).is.be.to.exist;
//             done();
//         });
//     });
//     it('should create a tree component and check and partCheck run right', done => {
//         vm = createVue({
//             template: '<NvTree :items="items" :checkbox="checkbox"></NvTree>',
//             data() {
//                 return {
//                     checkbox: true,
//                     items: [{
//                             title: 'node1',
//                             name: 'node1',
//                             expand: true,
//                             children: [{
//                                     title: 'node1-1',
//                                     name: 'node1-1'
//                                 },
//                                 {
//                                     title: 'node1-2',
//                                     name: 'node1-2'
//                                 }
//                             ]
//                         },
//                         {
//                             title: 'node2',
//                             name: 'node2'
//                         },
//                         {
//                             title: 'node3',
//                             name: 'node3'
//                         }
//                     ]
//                 }
//             }
//         });
//         vm.$nextTick(() => {
//             const node1 = vm.$el.querySelector('.noahv-tree-node-wrapper').querySelector('ul');
//             const node1_1 = node1.querySelectorAll('ul')[0];
//             const checkbox = node1_1.querySelector('.noahv-tree-checkbox-input');
//             checkbox.click();
//             const newNode1 = vm.$el.querySelector('.noahv-tree-node-wrapper').querySelector('ul');
//             const newNode1_1 = newNode1.querySelectorAll('ul')[0];
//             const isChecked = newNode1_1.querySelectorAll('.noahv-tree-checked');
//             //const isPartChecked = newNode1.querySelector('.noahv-tree-part-checked');
//             expect(isChecked).is.be.to.exist;
//             //expect(isPartChecked).equal(newNode1);
//             done();
//         });
//     });
// });
