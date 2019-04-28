import { createVue, destroyVM } from '../util';

describe('tag.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a tag component rightly', done => {
        vm = createVue({
            template: '<NvTag></NvTag>',
            data() {
                return {
                }
            }
        });
        vm.$nextTick(() => {
            const panel = vm.$el.querySelector('.noahv-tag-panel');
            const tips = vm.$el.querySelector('.noahv-tag-tips');
            const panelWidth = panel.style.width;
            const text = tips.innerHTML;
            expect(panel).not.to.be.equal(null);
            expect(tips).not.to.be.equal(null);
            expect(panelWidth).to.be.equal('600px');
            expect(text).to.be.equal('还可以添加5个');
            done();
        });
    });
    it('should create a tag component rightly with color and width<300 and wrong type', done => {
        vm = createVue({
            template: '<NvTag :data="datas" :width="250" color="grey" :closeable="true"></NvTag>',
            data() {
                return {
                    focus: false,
                    blur: false,
                    datas: [
                        {
                            name: '000101',
                            label: 'AAA'
                        },
                        {
                            name: '000102',
                            label: 'BBB'
                        },
                        {
                            name: '000103',
                            label: 'CCC'
                        },
                        {
                            name: '000104',
                            label: 'DDD'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const panel = vm.$el.querySelector('.noahv-tag-panel');
            const input = vm.$el.querySelector('.noahv-tag-input');
            const panelWidth = panel.style.width;
            const placeholder = input.placeholder;
            expect(panelWidth).to.be.equal('300px');
            expect(placeholder).to.be.equal('输入文本，点击回车或空格添加标签');

            const removeBtn = vm.$el.querySelector('.noahv-tag-tag-remove-btn');
            removeBtn.click();

            vm.$nextTick(() => {
                const tags = vm.$el.querySelectorAll('.noahv-tag-tag');
                expect(tags.length).to.be.equal(3);
                done();
            });
        });
    });
    it('should remove tage rightly with border type', done => {
        vm = createVue({
            template: '<NvTag :data="datas" type="border" color="#515a6e" ref="removeTag"></NvTag>',
            data() {
                return {
                    datas: [
                        {
                            name: '000101',
                            label: 'AAA'
                        },
                        {
                            name: '000102',
                            label: 'BBB'
                        },
                        {
                            name: '000103',
                            label: 'CCC'
                        },
                        {
                            name: '000104',
                            label: 'DDD'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const tag = {
                name: '000103',
                label: 'CCC'
            };
            vm.$refs['removeTag'].removeTag(tag);
            vm.$nextTick(() => {
                const panel = vm.$el.querySelector('.noahv-tag-panel');
                const tags = panel.querySelectorAll('.noahv-tag-tag');
                const tagCount = tags.length;
                expect(tagCount).to.be.equal(3);
                done();
            });
        });
    });
    it('should fire enterKey and spaceKey event rightly', done => {
        vm = createVue({
            template: '<NvTag :data="datas" @on-focus="focusHandler" @on-blur="blurHandler"></NvTag>',
            data() {
                return {
                    focus: false,
                    blur: false,
                    datas: [
                        {
                            name: '000101',
                            label: 'AAA'
                        },
                        {
                            name: '000102',
                            label: 'BBB'
                        },
                        {
                            name: '000103',
                            label: 'CCC'
                        }
                    ]
                }
            },
            methods: {
                focusHandler() {
                    this.focus = true;
                },
                blurHandler() {
                    this.blur = true;
                }
            }
        });
        vm.$nextTick(() => {
            const input = vm.$el.querySelector('.noahv-tag-input');
            var enterKey = new KeyboardEvent('keydown', {
                keyCode: 13
            });
            var spaceKey = new KeyboardEvent('keydown', {
                keyCode: 32
            });

            // null input
            input.dispatchEvent(enterKey);
            input.dispatchEvent(spaceKey);
            
            // valid input
            vm.$children[0].$data['inputValue'] = 'newtag1';
            input.dispatchEvent(enterKey);

            vm.$nextTick(() => {
                const tags = vm.$el.querySelectorAll('.noahv-tag-tag');
                expect(tags.length).to.be.equal(4);

                vm.$children[0].$data['inputValue'] = 'newtag2';
                // add one
                input.dispatchEvent(spaceKey);
                vm.$nextTick(() => {
                    const tags2 = vm.$el.querySelectorAll('.noahv-tag-tag');
                    expect(tags2.length).to.be.equal(5);
                    done();
                });
            });
        });
    });
    it('should fire keyboard event rightly', done => {
        vm = createVue({
            template: '<NvTag :data="datas" @on-focus="focusHandler" @on-blur="blurHandler"></NvTag>',
            data() {
                return {
                    focus: false,
                    blur: false,
                    datas: [
                        {
                            name: '000101',
                            label: 'AAA'
                        },
                        {
                            name: '000102',
                            label: 'BBB'
                        },
                        {
                            name: '000103',
                            label: 'CCC'
                        }
                    ]
                }
            },
            methods: {
                focusHandler() {
                    this.focus = true;
                },
                blurHandler() {
                    this.blur = true;
                }
            }
        });
        vm.$nextTick(() => {
            const input = vm.$el.querySelector('.noahv-tag-input');
            var backSpaceKey = new KeyboardEvent('keydown', {
                keyCode: 8
            });

            input.dispatchEvent(backSpaceKey);

            vm.$nextTick(() => {
                const tags = vm.$el.querySelectorAll('.noahv-tag-tag');
                expect(tags.length).to.be.equal(2);
                done();
            });
        });
    });
    it('should create a tag component rightly with datas and width=350 and maxNum=4', done => {
        vm = createVue({
            template: '<NvTag :datas="datas" :maxNum="max" :width="width" :placeholder="placeholder"></NvTag>',
            data() {
                return {
                    max: 4,
                    width: 350,
                    placeholder: '输入文本，点击回车或空格添加标签',
                    datas: [
                        {
                            name: '000101',
                            label: 'AAA'
                        },
                        {
                            name: '000102',
                            label: 'BBB'
                        },
                        {
                            name: '000103',
                            label: 'CCC'
                        },
                        {
                            name: '000104',
                            label: 'DDD'
                        }
                    ]
                }
            }
        });
        vm.$nextTick(() => {
            const tags = vm.$el.querySelectorAll('.noahv-tag-tag');
            const panel = vm.$el.querySelector('.noahv-tag-panel');
            const tips = vm.$el.querySelector('.noahv-tag-tips');
            const input = vm.$el.querySelector('.noahv-tag-input');
            const panelWidth = panel.style.width;
            const placeholder = input.placeholder;
            expect(panel).not.to.be.equal(null);
            expect(tips).not.to.be.equal(null);
            expect(panelWidth).to.be.equal('350px');
            expect(placeholder).to.be.equal('输入文本，点击回车或空格添加标签');
            done();
        });
    });
    it('should create a tag component with on-change/setTags/getTags run rightly', done => {
        vm = createVue({
            template: '<NvTag @on-change="changHandler" ref="satag"></NvTag>',
            data() {
                return {
                    tags: [],
                    change: false
                }
            },
            methods: {
                changHandler() {
                    this.change = true;
                },
                setTags() {
                    let tags = [
                        {
                            name: '101',
                            label: '001'
                        },
                        {
                            name: '102',
                            label: '002'
                        }
                    ];
                    this.$refs['satag'].setTags(tags);
                },
                getDatas: function () {
                    this.tags = this.$refs['satag'].getTags();
                }
            }
        });
        vm.$nextTick(() => {
            const panel = vm.$el.querySelector('.noahv-tag-panel');
            const tips = vm.$el.querySelector('.noahv-tag-tips');
            vm.setTags();
            vm.$nextTick(() => {
                vm.getDatas();
                expect(panel).not.to.be.equal(null);
                expect(tips).not.to.be.equal(null);
                expect(vm.tags.length).to.be.equal(2);
                done();
            });
        });
    });
    it('should create a tag component with addTag/removeTag run rightly', done => {
        vm = createVue({
            template: '<NvTag ref="satag"></NvTag>',
            data() {
                return {
                    tags: []
                }
            },
            methods: {
                addTag() {
                    let tag = {
                            name: '101',
                            label: '001'
                        };
                    this.$refs['satag'].addTag(tag);
                },
                removeTag: function () {
                    let tag = {
                            name: '101',
                            label: '001'
                        };
                    this.tags = this.$refs['satag'].removeTag(tag);
                },
                getDatas: function () {
                    this.tags = this.$refs['satag'].getTags();
                }
            }
        });
        vm.$nextTick(() => {
            vm.addTag();
            vm.$nextTick(() => {
                vm.getDatas();
                expect(vm.tags.length).to.be.equal(1);
                vm.removeTag();
                vm.$nextTick(() => {
                    vm.getDatas();
                    expect(vm.tags.length).to.be.equal(0);
                    done();
                });
            });
        });
    });
    it('should create a tag component with clear run rightly', done => {
        vm = createVue({
            template: '<NvTag :datas="datas" ref="satag"></NvTag>',
            data() {
                return {
                    tags: [],
                    datas: [
                        {
                            name: '000101',
                            label: 'AAA'
                        },
                        {
                            name: '000102',
                            label: 'BBB'
                        },
                        {
                            name: '000103',
                            label: 'CCC'
                        },
                        {
                            name: '000104',
                            label: 'DDD'
                        }
                    ]
                }
            },
            methods: {
                clear() {
                    this.$refs['satag'].clear();
                },
                getDatas: function () {
                    this.tags = this.$refs['satag'].getTags();
                }
            }
        });
        vm.$nextTick(() => {
            vm.clear();
            vm.$nextTick(() => {
                vm.getDatas();
                expect(vm.tags.length).to.be.equal(0);
                done();
            });
        });
    });
});