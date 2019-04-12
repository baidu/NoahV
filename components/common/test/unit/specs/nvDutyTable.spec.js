import { createVue, destroyVM } from '../util';

describe('dutyTable.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a dutyTable component and have correct default parameters', done => {
       vm = createVue(`
            <NvDutyTable></NvDutyTable>
       `);
       const props = vm.$children[0].$props;
       let today = new Date();
       today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
       expect(props.defaultSelectedYear).to.equal(today.getFullYear());
       expect(props.defaultSelectedMonth).to.equal(today.getMonth() + 1);
       done();
    });
    it('should have right time if use "changeTime" function', done => {
        vm = createVue(`
            <NvDutyTable></NvDutyTable>
       `);
        const dutyTable = vm.$children[0];
        let selectYear = dutyTable.$data.selectedYear;
        dutyTable.$data.selectedMonth = 12;
        dutyTable.changeTime(null, 'next');
        expect(dutyTable.$data.selectedMonth).to.equal(1);
        expect(dutyTable.$data.selectedYear).to.equal(selectYear + 1);

        dutyTable.$data.selectedMonth = 1;
        selectYear = dutyTable.$data.selectedYear;
        dutyTable.changeTime(null, 'pre');
        expect(dutyTable.$data.selectedMonth).to.equal(12);
        expect(dutyTable.$data.selectedYear).to.equal(selectYear - 1);
        done();
    });
    it('should have right status in month selection and Btn', done => {
        vm = createVue(`
            <NvDutyTable
                defaultMinDate="2019, 2, 1"
                defaultMaxDate="2019, 4, 10"
            ></NvDutyTable>
       `);
        const dutyTable = vm.$children[0];
        dutyTable.$data.selectedYear = 2019;
        dutyTable.$data.selectedMonth = 3;
        expect(dutyTable.minYear).to.equal(2019);
        expect(dutyTable.minMonth).to.equal(2);
        expect(dutyTable.maxYear).to.equal(2019);
        expect(dutyTable.maxMonth).to.equal(4);
        expect(dutyTable.monthDisabled(1)).to.equal(true);
        expect(dutyTable.monthDisabled(2)).to.equal(false);
        expect(dutyTable.monthDisabled(3)).to.equal(false);
        expect(dutyTable.monthDisabled(4)).to.equal(false);
        expect(dutyTable.monthDisabled(5)).to.equal(true);
        expect(dutyTable.nextBtnDisabled).to.equal(false);
        expect(dutyTable.preBtnDisabled).to.equal(false);
        done();
    });
});
