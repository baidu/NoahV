import Vue from 'vue';
import { createTest, createVue, destroyVM} from '../util';
import api from '../../../demo/service/api/index';
const DemoData = [{
    name: 'serie1', 
    data: [[1501220160000, 30], [1501220600000, 100], [1501220680000, 300]]
}, 
{
    name: 'serie2', 
    data: [[1501220160000, 70], [1501220600000, 150], [1501220680000, 200]]
}];
describe('nvTrend', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a NvMDTrend component with trendConf rightly', done => {
        vm = createVue({
            template: '<NvMDTrend :conf="trendConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    trendConf: {
                        display: DemoData
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

    it('create a NvMDTrend component with conf', done => {
        vm = createVue({
            template: '<NvMDTrend ref="nvtrend" :conf="trendConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    trendConf: {
                        "title": "配置标题的趋势图",
                        "data": {},
                        "style": {
                            displayType: 'line',
                            nullPointMode: 'zero'
                        },
                        "link": 'http://www.baidu.com'
                    }
                };
            }
        });
        let nvtrend = vm.$refs.nvtrend;
        // let post = sinon.stub(nvtrend, 'freshData');
        vm.$nextTick(() => {
            // post();
            vm.$nextTick(() => {
                expect(nvtrend.title).equal('配置标题的趋势图');
                expect(nvtrend.changeType).equal('line');
                expect(nvtrend.linkUrl).equal('http://www.baidu.com');
                done();
            });
        //     sinon.assert.calledOnce(post);
        //     post.restore();
        });
    });

    it('should create a NvMDTrend component with multi datasource', done => {
        vm = createVue({
            template: '<NvMDTrend ref="nvtrend" :conf="trendConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    trendConf: {
                        "title": "多数据源获取趋势图数据",
                        "data": {},
                        // 多数据源配置
                        "datasource": {
                            "api": api.trend.data,
                            "method": 'post'
                        }
                    }
                };
            }
        });
        let nvtrend = vm.$refs.nvtrend;
        let wRequest = sinon.stub(nvtrend, '$wRequest');
        let data = {
            data: {
                success: true,
                data: DemoData
            }
        };
        let myspy = sinon.spy(nvtrend, 'renderChart');
        myspy(data.data.data);
        vm.$nextTick(() => {
            wRequest.returns(
                new Promise((resolve, reject) => {
                    resolve(data);
                })
            );
            nvtrend.freshData();
            sinon.assert.calledOnce(wRequest);
            wRequest.restore();
            vm.$nextTick(() => {
                let conf = nvtrend.conf;
                expect(nvtrend.renderChart.firstCall.returnValue.series.length).to.be.equal(2);
                expect(nvtrend.renderChart.callCount).to.be.equal(1);
                expect(nvtrend.title).equal('多数据源获取趋势图数据');
                expect(conf.datasource.api).equal(api.trend.data);
                expect(conf.datasource.method).equal('post');
                done();
            });
        });
    });
});