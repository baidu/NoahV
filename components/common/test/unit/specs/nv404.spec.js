import { createVue, destroyVM } from '../util';

describe('404.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a 404 component rightly with default data', done => {
        vm = createVue({
            template: '<Nv404></Nv404>'
        });
        vm.$nextTick(() => {
            const vm404 = vm.$el;
            const title = vm404.querySelector('.title').innerHTML;
            const tip = vm404.querySelector('.text').innerHTML;
            const href = vm404.querySelector('.back-to').innerHTML;
            expect(vm404).is.be.to.exist;
            expect(title).to.be.equal('404');
            expect(tip).to.be.equal('抱歉，找不到路了~');
            expect(href).to.be.equal('<a href="/">返回首页</a>');
            done();
        });
    });
    it('should create a 404 component rightly', done => {
        vm = createVue({
            template: '<Nv404 :title="title" :tips="tips" :href="href"></Nv404>',
            data() {
                return {
                    title: 'ERROR',
                    tips: '404 NOT FOUND',
                    href: 'https://www.baidu.com'
                }
            }
        });
        vm.$nextTick(() => {
            const vm404 = vm.$el;
            expect(vm404).is.be.to.exist;
            expect(vm.title).to.be.equal('ERROR');
            expect(vm.tips).to.be.equal('404 NOT FOUND');
            expect(vm.href).to.be.equal('https://www.baidu.com');
            done();
        });
    });
});