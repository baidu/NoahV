import Vue from 'vue';
import { createTest, createVue, destroyVM} from '../util';
describe('nvCircle', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a NvCircle component with circleConf rightly', done => {
        vm = createVue({
            template: '<NvMDCircle :conf="circleConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    circleConf: {
                        title: '只展示数据的仪表图', // 可选字段
                        display: 40
                    }
                };
            }
        });
        vm.$nextTick(() => {
            const chartTitle = vm.$el.querySelector('.multiple-chart-header');
            const chartPanel = vm.$el.querySelector('.multiple-chart-body');
            expect(chartTitle).is.be.to.exist;
            expect(chartPanel).is.be.to.exist;
            done();
        });
    });
    it('create a NvCircle component with conf', done => {
    	let wRequest = sinon.stub(Vue.prototype, '$wRequest');
        let data = {
            data: {
                success: true,
                data: 80
            }
        };
        wRequest.returns(
            new Promise((resolve, reject) => {
                resolve(data);
            })
        );
        vm = createVue({
            template: '<NvMDCircle ref="nvcircle" :conf="circleConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    circleConf: {
                        "title": "仪表图标题",
                        "style": {
                            "decimals": 4,
                            "unit": "%",
                            "max": 100,
                            "min": 0,
                            "threshold": [[
                                90,
                                99,
                                "yellow"
                            ],
                            [
                                0,
                                90,
                                "red"
                            ],
                            [
                                99,
                                100,
                                "green"
                            ]]
                        },
                        "link": "http://sia.baidu.com",
                        "timeType": "fixed",
                        "time": "before(2h)"
                    }
                };
            }
        });
        let nvcircle = vm.$refs.nvcircle;
        nvcircle.freshData();
        vm.$nextTick(() => {
            expect(wRequest.callCount).equal(1);
            expect(nvcircle.title).equal('仪表图标题');
            done();
        });
        wRequest.restore();
    });
    it('create a NvCircle component with errorMsg', done => {
    	let wRequest = sinon.stub(Vue.prototype, '$wRequest');
        let data = {
            data: {
                success: false,
                message: '数据获取失败'
            }
        };
        wRequest.returns(
            new Promise((resolve, reject) => {
                resolve(data);
            })
        );
        vm = createVue({
            template: '<NvMDCircle ref="nvcircle" :conf="circleConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    circleConf: {
                        "title": "仪表图标题",
                        "style": {
                            "decimals": 4,
                            "unit": "%",
                            "max": 100,
                            "min": 0,
                            "threshold": [[
                                90,
                                99,
                                "yellow"
                            ],
                            [
                                0,
                                90,
                                "red"
                            ],
                            [
                                99,
                                100,
                                "green"
                            ]]
                        },
                        "link": "http://sia.baidu.com",
                        "timeType": "fixed",
                        "time": "before(2h)"
                    }
                };
            }
        });
        let nvcircle = vm.$refs.nvcircle;
        nvcircle.freshData();
        nvcircle.$nextTick(() => {
            nvcircle.$nextTick(() => {
                expect(wRequest.callCount).equal(1);
                expect(nvcircle.errTip).equal('数据获取失败');
                nvcircle.$nextTick(() => {
                    const chartPanel = nvcircle.$el.querySelector('.circle-error-holder');
                    expect(chartPanel).is.be.to.exist;
                });
                done();
            });
        });
        wRequest.restore();
    });
});