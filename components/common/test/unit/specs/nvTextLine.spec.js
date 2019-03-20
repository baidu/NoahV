import { createVue, destroyVM } from '../util';

describe('textLine.vue', () => {
    let vm;
    afterEach(() => {
    destroyVM(vm);
    });
    it('should create a textLine component rightly', done => {
        vm = createVue({
            template: '<NvTextLine :options="cmOptions" :width="width" :height="height"></NvTextLine>',
            data() {
                return {
                    width: 600,
                    height: 300,
                    cmOptions: {
                        lineWrapping: 'wrap'
                    }
                }
            }
        });
        vm.$nextTick(() => {
            const textWrapper = vm.$el;
            const width = textWrapper.style.width;
            const height = textWrapper.style.height;
            expect(textWrapper).is.be.to.exist;
            expect(textWrapper.className).to.be.include('noahv-text-line-wrapper');
            expect(width).to.be.equal('600px');
            expect(height).to.be.equal('300px');
            done();
        });
    });
    it('should create a textLine component with right value', done => {
        vm = createVue({
            template: '<NvTextLine :value="value" :options="cmOptions" :width="width" :height="height" ref="SaTextLine"></NvTextLine>',
            data() {
                return {
                    width: 600,
                    height: 300,
                    value: '测试数据',
                    cmOptions: {
                        lineWrapping: 'wrap'
                    }
                }
            }
        });
        vm.$nextTick(() => {
            const text = vm.$refs['SaTextLine'].getText();
            expect(text).to.be.equal('测试数据');
            done();
        });
    });
    it('should create a textLine component with setText run rightly', done => {
        vm = createVue({
            template: '<NvTextLine :value="value" :options="cmOptions" :width="width" :height="height" ref="SaTextLine"></NvTextLine>',
            data() {
                return {
                    width: 600,
                    height: 300,
                    value: '测试数据',
                    cmOptions: {
                        lineWrapping: 'wrap'
                    }
                }
            }
        });
        vm.$nextTick(() => {
            vm.$refs['SaTextLine'].setText('datatest');
            vm.$nextTick(() => {
                const text = vm.$refs['SaTextLine'].getText();
                expect(text).to.be.equal('datatest');
                done();
            });
        });
    });
    it('should create a textLine component with getLineCount run rightly', done => {
        vm = createVue({
            template: '<NvTextLine :value="value" :options="cmOptions" :width="width" :height="height" ref="SaTextLine"></NvTextLine>',
            data() {
                return {
                    width: 600,
                    height: 300,
                    value: '测试数据',
                    cmOptions: {
                        lineWrapping: 'wrap'
                    }
                }
            }
        });
        vm.$nextTick(() => {
            vm.$refs['SaTextLine'].setText('first\nsecond\nthird');
            vm.$nextTick(() => {
                const text = vm.$refs['SaTextLine'].getText();
                const count = vm.$refs['SaTextLine'].getLineCount();
                expect(count).to.be.equal(3);
                done();
            });
        });
    });
    it('should create a textLine component with onchange run rightly', done => {
        vm = createVue({
            template: '<NvTextLine :value="value" :options="cmOptions" :width="width" :height="height" @on-change="value = $event" ref="SaTextLine"></NvTextLine>',
            data() {
                return {
                    width: 600,
                    height: 300,
                    value: '测试数据',
                    cmOptions: {
                        lineWrapping: 'wrap'
                    }
                }
            }
        });
        vm.$nextTick(() => {
            vm.$refs['SaTextLine'].setText('changed');
            vm.$nextTick(() => {
                expect(vm.value).to.be.equal('changed');
                done();
            });
        });
    });
    it('should create a textLine component with right placeholder', done => {
        vm = createVue({
            template: '<NvTextLine :options="cmOptions" :width="width" :height="height" ref="SaTextLine"></NvTextLine>',
            data() {
                return {
                    width: 600,
                    height: 300,
                    cmOptions: {
                        lineWrapping: 'wrap',
                        placeholder: 'placeholder'
                    }
                }
            }
        });
        vm.$nextTick(() => {
            const text = vm.$el.querySelector('.CodeMirror-placeholder').innerHTML;
            vm.$nextTick(() => {
                expect(text).to.be.equal('placeholder');
                done();
            });
        });
    });
    it('should create a textLine component with lineNumbers', done => {
        vm = createVue({
            template: '<NvTextLine :value="value" :options="cmOptions" :width="width" :height="height" ref="SaTextLine"></NvTextLine>',
            data() {
                return {
                    width: 600,
                    height: 300,
                    value: 'testtext',
                    cmOptions: {
                        lineNumbers: true,
                        lineWrapping: 'wrap'
                    }
                }
            }
        });
        vm.$nextTick(() => {
            const number = vm.$el.querySelector('.CodeMirror-linenumbers');
            expect(number).not.to.be.equal(null);
            expect(number).not.to.be.equal(undefined);
            done();
        });
    });
});