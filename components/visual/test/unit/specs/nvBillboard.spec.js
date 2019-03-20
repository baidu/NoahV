import Vue from 'vue';
import { createTest, createVue, destroyVM} from '../util';
const BillboardData  = [{
    name: 'title1',
    value: '88%'
}];
describe('nvBillboard', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a NvBillboard component with billboarConf rightly', done => {
        vm = createVue({
            template: '<NvMDBillboard :conf="billboarConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    billboarConf: {
                        display: BillboardData
                    }
                };
            }
        });
        vm.$nextTick(() => {
            const chartTitle = vm.$el.querySelector('.hd');
            const chartPanel = vm.$el.querySelector('.bd');
            expect(chartTitle).is.be.to.exist;
            expect(chartPanel).is.be.to.exist;
            done();
        });
    });

    it('create a NvBillboard component with conf', done => {
        vm = createVue({
            template: '<NvMDBillboard ref="nvbillboard" :conf="billboarConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    billboarConf: {
                        "title": "面板标题Conf",
                        "data": [{
                            "namespace": [
                                "forDemoNamespace1"
                            ],
                             "metric": "#{metric1}/#{metric2}",
                            "statistics": "avg",
                            "name": "name1",
                            "unit": "%",
                            "decimals": 4
                        },
                        {
                            "namespace": [
                                "forDemoNamespace2"
                            ],
                            "metric": "#{metric3}",
                            "statistics": "avg",
                            "name": "name2",
                            "unit": "%",
                            "decimals": 4
                        }],
                        "link": "http://sia.baidu.com",
                        "timeType": "relative",
                        "time": "before(2h)"
                    }
                };
            }
        });
        let nvbillboard = vm.$refs.nvbillboard;
        let post = sinon.stub(nvbillboard, 'getData');

        vm.$nextTick(() => {
            nvbillboard.freshData();
            vm.$nextTick(() => {
                expect(nvbillboard.title).equal('面板标题Conf');
                expect(nvbillboard.link).equal('http://sia.baidu.com');
                done();
            });
            sinon.assert.calledOnce(post);
            post.restore();
        });
    });
    it('vertify the method getData', done => {
        vm = createVue({
            template: '<NvMDBillboard ref="nvbillboard" :conf="billboarConf" :params="params"/>',
            data() {
                return {
                    params: {
                        start: '2018-01-30 17:26:00',
                        end: '2018-01-30 18:26:00'
                    },
                    billboarConf: {
                        "title": "面板标题Conf",
                        "data": [],
                        "link": "http://sia.baidu.com",
                        "timeType": "relative",
                        "time": "before(2h)"
                    }
                };
            }
        });
        let nvbillboard = vm.$refs.nvbillboard;
        let wRequest = sinon.stub(nvbillboard, '$wRequest');
        let data = {
            data: {
                success: true,
                data: BillboardData
            }
        };
        wRequest.returns(
            new Promise((resolve, reject) => {
                resolve(data);
            })
        );
        vm.$nextTick(() => {
            nvbillboard.getData({}, (cbData) => {
                expect(cbData.length).equal(1);
                expect(cbData[0].name).equal('title1');
                done();
            });
            sinon.assert.calledOnce(wRequest);
            wRequest.restore();
        });
    });
});