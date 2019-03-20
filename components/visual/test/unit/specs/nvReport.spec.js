import Vue from 'vue';
import { createTest, createVue, destroyVM} from '../util';
const ReportData  = [{
    "name":"noah_namespace",
    "value":"2.case-astream-basic.servicization",
    "alias":null,
    "metrics":{"alias3":90,"alias2":95, "alias1": null}
}, {
    "name":"noah_namespace",
    "value":"1.case-astream-basic.servicization",
    "alias":null,
    "metrics":{"alias3":100,"alias2": 80, "alias1": null}
}];
const ReportConf = {
    "title": "多数据源获取报表数据",
    "data": {
        "caption": "多数据源列标题",
        "namespace": [
            "forDemoNamespace"
        ],
        "comments": "说明",
        "columns": [{
            "source": "origin",
            "metric": "#{metric1}-#{metric2}",
            "statistics": "sum",
            "group": "",
            "header": "列名1",
            "alias": "alias3", 
            "unit": "%",
            "decimals": 3,
            "threshold": [
              [
                0,
                90,
                "#ff0000"
              ],
              [
                90,
                95,
                "#0000ff"
              ],
              [
                99,
                100,
                "green"
              ]
            ],
            "timeType":"relative",
            "time":"before(2h)",
            "total": 'sum',
            "use":true,
            "offset":"-1d"
        }]
    }
}
describe('nvReport', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a NvReport component with dataConf rightly', done => {
        let displayConf = Object.assign({}, ReportConf, {display: ReportData});
        vm = createVue({
            template: '<NvMDReport ref="nvreport" :conf="reportConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    reportConf: displayConf
                };
            },
            mounted() {
                let self = this;
                let nvreport = this.$refs.nvreport;
                this.$nextTick(() => {
                    const chartTitle = self.$el.querySelector('.ui-mdreport-container');
                    const chartPanel = self.$el.querySelector('.ui-mdreport-body');
                    expect(chartTitle).is.be.to.exist;
                    expect(chartPanel).is.be.to.exist;
                    expect(nvreport.title).equal('多数据源获取报表数据');
                    done();
                });
            }
        });
    });
    it('should create a NvReport component with reportConf rightly', done => {
        let wRequest = sinon.stub(Vue.prototype, '$wRequest');
        let data = {
            data: {
                success: true,
                data: ReportData
            }
        };
        wRequest.returns(
            new Promise((resolve, reject) => {
                resolve(data);
            })
        );
        vm = createVue({
            template: '<NvMDReport ref="nvreport" :conf="reportConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    reportConf: ReportConf
                };
            },
            mounted() {
            	let self = this;
            	let nvreport = this.$refs.nvreport;
		        this.$nextTick(() => {
		            expect(wRequest.callCount).equal(1);
		            expect(nvreport.title).equal('多数据源获取报表数据');
		            done();
		        });
            }
        });
        wRequest.restore();
    });
    it('valid function render', done => {
        let wRequest = sinon.stub(Vue.prototype, '$wRequest');
        let data = {
            data: {
                success: true,
                data: ReportData
            }
        };
        wRequest.returns(
            new Promise((resolve, reject) => {
                resolve(data);
            })
        );
        vm = createVue({
            template: '<NvMDReport ref="nvreport" :conf="reportConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    reportConf: ReportConf
                };
            }
        });
        let nvreport = vm.$refs.nvreport;
        let renderSpy = sinon.spy(nvreport, 'render');
        nvreport.render(ReportData);
        vm.$nextTick(() => {
            renderSpy.restore();
            sinon.assert.calledOnce(renderSpy);
            done();
        });
        wRequest.restore();
    });
    it('valid error message', done => {
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
            template: '<NvMDReport ref="nvreport" :conf="reportConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    reportConf: ReportConf
                };
            },
            mounted() {
                let self = this;
                let nvreport = this.$refs.nvreport;
                this.$nextTick(() => {
                    expect(wRequest.callCount).equal(1);
                    expect(nvreport.errTip).equal('数据获取失败');
                    done();
                });
            }
        });
        wRequest.restore();
    });
});