import { createVue, destroyVM, createTest } from '../util';
import NvForm from '../../../src/components/nv-form';
const items = [
    {
        name: 'username',
        title: '用户名',
        type: 'input',
        placeholder: '输入用户名',
        width: '400px',
        required: true
    },
    {
        name: 'phone',
        title: '电话号码',
        type: 'input',
        value: '010-58002312',
        width: '400px',
        required: true
    },
    {
        name: 'married',
        title: '婚否',
        label: '已婚',
        type: 'checkBox',
        required: true
    },
    {
        name: 'age',
        title: '年龄',
        type: 'inputnumber',
        required: true
    },
    {
        name: 'hobby',
        title: '爱好',
        type: 'checkBoxGroup',
        option: [
            {
                name: '篮球'
            },
            {
                name: '音乐'
            },
            {
                name: '跑步'
            },
            {
                name: '电影'
            }
        ]
    },
    {
        name: 'addres',
        title: '籍贯',
        type: 'search',
        required: true
    }
];

describe('form.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a form component rightly', done => {
        
        vm = createTest(NvForm, {
            items: items
        }, true);
        vm.$nextTick(() => {
            const vm404 = vm.$el;
            expect(vm404).is.be.to.exist;
            expect(vm.items.length).to.be.equal(items.length);
            expect(vm.formtpl.username).to.be.equal('');
            expect(vm.formtpl.married).to.be.equal(false);
            expect(vm.formtpl.age).to.be.equal(0);
            expect(vm.formtpl.hobby).to.eql([]);
            expect(vm.formtpl.addres).to.eql({});
            expect(vm.formtpl.phone).to.eql('010-58002312');
            expect(vm.action).to.eql([]);
            expect(vm.action).to.eql([]);
            done();
        });
    });
    it('should have correct default data', done => {
        const items = [];
        vm = createTest(NvForm, {
            items: items
        }, true);
        vm.$nextTick(() => {
            expect(vm.items).to.eql([]);
            expect(vm.action).to.eql([]);
            expect(vm.showLoading).to.be.equal(true);
            expect(vm.ref).to.be.equal('formtpl');
            expect(vm.inline).to.be.equal(false);
            expect(vm.labelPosition).to.be.equal('right');
            expect(vm.labelWidth).to.be.equal(80);
            done();
        });
    });
    it('watch props', done => {
        vm = createTest(NvForm, {
            items: []
        }, true);
        vm.items = [
            {
                name: 'age',
                title: '年龄',
                type: 'inputnumber',
                value: 12,
                required: true
            }
        ];

        vm.$nextTick(() => {
            expect(vm.formtpl.age).to.be.equal(12);
            done();
        });
    });
    it('test validateForm', done => {
        vm = createTest(NvForm, {
            items: items
        }, true);
        vm.$nextTick(() => {
            expect(vm.validateForm()).to.be.equal(false);
            done();
        });
        vm.items = [
            {
                name: 'username',
                title: '用户名',
                type: 'input',
                placeholder: '输入用户名',
                width: '400px',
                required: false
            }
        ];
        vm.$nextTick(() => {
            expect(vm.validateForm()).to.be.equal(true);
            done();
        });
    });
    it('test fireSubmitEvent', done => {
        const submitItems = [
            {
                name: 'username',
                title: '用户名',
                type: 'input',
                placeholder: '输入用户名',
                width: '400px',
                value: '1321313',
                required: true  
            }
        ];
        let submitValue;
        vm = createTest(NvForm, {
            items: submitItems,
            action: [{
                name: 'submit',
                callback: (value) => {
                    submitValue = value;
                }
            }],
            params: {
                sexy: 'male'
            }
        }, true);
        vm.$nextTick(() => {
            vm.fireSubmitEvent();
            expect(submitValue).to.be.eql({
                username: '1321313',
                sexy: 'male'
            });
            done();
        });
        vm.$nextTick(() => {
            vm.fireSubmitEvent({age: 10});
            expect(submitValue).to.be.eql({
                username: '1321313',
                sexy: 'male',
                age: 10
            });
            done();
        });
    });
    it('test action', done => {
        vm = createTest(NvForm, {
            items: []
        }, true);
        vm.$nextTick(() => {
            expect(vm.findSubmitItem()).to.be.eql(null);
            done();
        });
    });
    it('test setFormValue', done => {
        vm = createTest(NvForm, {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: '输入用户名',
                    width: '400px',
                    required: true
                }
            ]
        }, true);
        vm.$nextTick(() => {
            vm.setFormValue({
                username: 'noahv'
            });
            expect(vm.formTemp.username).to.be.eql('noahv');
            done();
        });
    });
});