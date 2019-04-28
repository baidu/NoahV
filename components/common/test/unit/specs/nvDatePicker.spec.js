import { createVue, destroyVM } from '../util';

describe('DatePicker.vue', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a DatePicker component and open the calendar with the current month', done => {
        vm = createVue(`
            <NvDatePicker type="daterange"></NvDatePicker>
        `);
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const wrapper = vm.$el.querySelector('.noahv-date-picker-console-wrapper');
            const innerPanel = vm.$el.querySelector('.inner-panel-wrapper');
            const calendarCells = [...innerPanel.querySelectorAll('.cell')].filter(el => {
                const prevMonth = el.classList.contains('last-month');
                const nextMonth = el.classList.contains('next-month');
                return !prevMonth && !nextMonth;
            });
            const today = new Date();
            const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            const daysInNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate();
            expect(daysInCurrentMonth + daysInNextMonth).to.equal(calendarCells.length);
            done();
        });
    });
    it('should create a DatePicker component and footer btns fire event rightly', done => {
        vm = createVue({
            template: '<NvDatePicker type="daterangetime" :value="value"></NvDatePicker>',
            data() {
                return {
                    value: ['2018.09.11 12:12:12', '2018.10.12 13:13:13']
                }
            }
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const timePanelBtns = vm.$el.querySelector('.date-picker-footer').querySelector('.btn-panel').querySelectorAll('button');
            timePanelBtns[0].click();
            picker.openPicker();

            vm.$nextTick(() => {
                timePanelBtns[1].click();
                vm.$nextTick(() => {
                    const input = vm.$el.querySelector('.input-wrapper').querySelector('input');
                    const text = input.innerText;
                    expect(text).to.be.equal('');
                    done();
                }); 
            });
        });
    });
    it('should create a DatePicker component and month change rightly', done => {
        vm = createVue({
            template: '<NvDatePicker type="daterangetime" :value="value"></NvDatePicker>',
            data() {
                return {
                    value: ['2018.09.11 12:12:12', '2018.10.12 13:13:13']
                }
            }
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const leftBtns = vm.$el.querySelector('.left-panel').querySelectorAll('.btn-wrapper');
            const rightBtns = vm.$el.querySelector('.right-panel').querySelectorAll('.btn-wrapper');
            const lastBtnInLeft = leftBtns[0];
            const nextBtnInLeft = leftBtns[1];
            const lastBtnInRight = rightBtns[0];
            const nextBtnInRight = rightBtns[1];

            lastBtnInLeft.click();
            nextBtnInLeft.click();
            lastBtnInRight.click();
            nextBtnInRight.click();

            vm.$nextTick(() => {
                // click update need more nextTick, so just check the value
                // and if leftBtn click is right, the other btn click event will be right, too
                const leftMonth = vm.$children[0].$data['dateValue'].startMonth;
                expect(leftMonth).to.be.equal(7);
                done();
            });
        });
    });
    it('should create a DatePicker component and deal cell click event rightly with type=daterangetime', done => {
        vm = createVue({
            template: '<NvDatePicker type="daterangetime"></NvDatePicker>',
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const cell = vm.$el.querySelector('.left-panel').querySelector('.date-picker-cells').querySelector('.current-month');
            cell.click();
            vm.$nextTick(() => {
                const selectedCell = vm.$el.querySelector('.left-panel').querySelector('.date-picker-cells').querySelector('.date-picker-selected');
                expect(selectedCell).not.to.be.equal(null);
                done();
            });
        });
    });
    it('should create a DatePicker component and deal cell click event rightly with type=datetime', done => {
        vm = createVue({
            template: '<NvDatePicker type="datetime" :autoClose="true"></NvDatePicker>',
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const cell = vm.$el.querySelector('.left-panel').querySelector('.date-picker-cells').querySelector('.current-month');
            cell.click();
            vm.$nextTick(() => {
                const selectedCell = vm.$el.querySelector('.left-panel').querySelector('.date-picker-cells').querySelector('.date-picker-selected');
                expect(selectedCell).not.to.be.equal(null);
                done();
            });
        });
    });
    it('should create a DatePicker component and deal cell click event rightly with select a range', done => {
        vm = createVue({
            template: '<NvDatePicker type="daterangetime"></NvDatePicker>',
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const cell = vm.$el.querySelector('.left-panel').querySelector('.date-picker-cells').querySelectorAll('.current-month');
            cell[6].click();
            cell[5].click();
            vm.$nextTick(() => {
                const selectedCell = vm.$el.querySelector('.left-panel').querySelector('.date-picker-cells').querySelector('.date-picker-selected');
                expect(selectedCell).not.to.be.equal(null);

                cell[10].click();
                vm.$nextTick(() => {
                    vm.$nextTick(() => {
                        const selectedCells = vm.$el.querySelector('.left-panel').querySelectorAll('.date-picker-selected');
                        const rangeSelectedCells = vm.$el.querySelector('.left-panel').querySelectorAll('.date-picker-range-selected');
                        expect(selectedCells.length).to.be.equal(2);
                        expect(rangeSelectedCells.length).to.be.equal(4);

                        cell[9].click();
                        done();
                    });
                });
            });
        });
    });
    it('should create a DatePicker component with console timePanel', done => {
        vm = createVue({
            template: '<NvDatePicker type="daterangetime" :value="value"></NvDatePicker>',
            data() {
                return {
                    value: ['2018.09.11 12:12:12', '2018.10.12 13:13:13']
                }
            }
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const timePanel = vm.$children[0].$children[3].$children[0];
            vm.$set(timePanel.dateValue, 'startHour', 15);
            timePanel.timeChange('left');

            vm.$set(timePanel.dateValue, 'endHour', 17);
            timePanel.timeChange('right');

            done();
        });
    });
    it('should create a DatePicker component with console timePanel', done => {
        vm = createVue({
            template: '<NvDatePicker type="datetime" :value="value"></NvDatePicker>',
            data() {
                return {
                    value: '2018.09.11 12:12:12'
                }
            }
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const timePanel = vm.$children[0].$children[3].$children[0];
            vm.$set(timePanel.dateValue, 'startHour', 15);
            timePanel.timeChange('left');

            done();
        });
    });
    it('should create a DatePicker component with common timePanel', done => {
        vm = createVue({
            template: '<NvDatePicker type="daterangetime" theme="common" :value="value"></NvDatePicker>',
            data() {
                return {
                    value: ['2018.09.11 12:12:12', '2018.10.12 13:13:13']
                }
            }
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const timePanel = vm.$children[0].$children[3].$children[0];
            vm.$set(timePanel.dateValue, 'startHour', 15);
            timePanel.timeChange('left');

            vm.$set(timePanel.dateValue, 'endHour', 17);
            timePanel.timeChange('right');

            done();
        });
    });
    it('should create a DatePicker component with common timePanel', done => {
        vm = createVue({
            template: '<NvDatePicker type="datetime" theme="common" :value="value"></NvDatePicker>',
            data() {
                return {
                    value: '2018.09.11 12:12:12'
                }
            }
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const timePanel = vm.$children[0].$children[3].$children[0];
            vm.$set(timePanel.dateValue, 'startHour', 15);
            timePanel.timeChange('left');

            done();
        });
    });
    it('should create a daterangetime type DatePicker component and pick 2 dates in the current month', done => {
        vm = createVue(`
            <NvDatePicker type="daterangetime"></NvDatePicker>
        `);
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const displayField = vm.$el.querySelector('.input');
            const clickableCells = vm.$el.querySelectorAll('.cell');
            const lastMonthClass = 'last-month';
            const firstDayInMonthIndex = [...clickableCells].findIndex(cell => !cell.classList.contains(lastMonthClass));
            clickableCells[firstDayInMonthIndex].firstElementChild.click();
            vm.$nextTick(() => {
                clickableCells[firstDayInMonthIndex + 4].firstElementChild.click();
                vm.$nextTick(() => {
                    const dayOne = new Date();
                    dayOne.setDate(1);
                    dayOne.setHours(0, 0, 0, 0);
                    const dayFive = new Date(dayOne.getTime());
                    dayFive.setDate(5);
                    dayFive.setHours(0, 0, 0, 0);
                    // check pickers internal value
                    const selectDates = picker.getDate(); // Date Objects
                    let startInternalValue = selectDates.selectDate[0];
                    let endInternalValue = selectDates.selectDate[1];
                    expect(Math.abs(dayOne - startInternalValue)).to.equal(0);
                    expect(Math.abs(dayFive - endInternalValue)).to.equal(0);
                    // check pickers display value
                    const displayDates = displayField.value.split(' - '); // Date Objects
                    let startDisplayValue = new Date(displayDates[0]);
                    let endDisplayValue = new Date(displayDates[1]);
                    expect(dayOne.getTime()).to.equal(startDisplayValue.getTime());
                    expect(dayFive.getTime()).to.equal(endDisplayValue.getTime());
                    done();
                });
            });
        });
    });
    it('should create a datetime type DatePicker component and setDate function run rightly', done => {
        vm = createVue(`
            <NvDatePicker type="datetime"></NvDatePicker>
        `);
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const displayField = vm.$el.querySelector('.input');
            const date1 = new Date(2018, 1, 7);
            picker.setDate(date1);
            vm.$nextTick(() => {
                // check pickers display value
                const displayDates = displayField.value; // Date Objects
                let startDisplayValue = new Date(displayDates);
                expect(date1.getTime()).to.equal(startDisplayValue.getTime());
                done();
            });
        });
    });
    it('should create a daterangetime type DatePicker component and setDate function run rightly', done => {
        vm = createVue(`
            <NvDatePicker type="daterangetime"></NvDatePicker>
        `);
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const displayField = vm.$el.querySelector('.input');
            const date1 = new Date(2018, 1, 7);
            const date2 = new Date(2018, 1, 12);
            picker.setDate(date1, date2);
            vm.$nextTick(() => {
                // check pickers display value
                const displayDates = displayField.value.split(' - '); // Date Objects
                let startDisplayValue = new Date(displayDates[0]);
                let endDisplayValue = new Date(displayDates[1]);
                expect(date1.getTime()).to.equal(startDisplayValue.getTime());
                expect(date2.getTime()).to.equal(endDisplayValue.getTime());
                done();
            });
        });
    });
    it('should create a datetime type DatePicker component and getDate function run rightly', done => {
        vm = createVue(`
            <NvDatePicker type="datetime"></NvDatePicker>
        `);
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const date1 = new Date(2018, 1, 7);
            picker.setDate(date1);
            vm.$nextTick(() => {
                // check pickers display value
                const selectedDates = picker.getDate()['selectDate']; // Date Objects
                let startSelectedValue = new Date(selectedDates);
                expect(date1.getTime()).to.equal(startSelectedValue.getTime());
                done();
            });
        });
    });
    it('should create a daterangetime type DatePicker component and getDate function run rightly', done => {
        vm = createVue(`
            <NvDatePicker type="daterangetime"></NvDatePicker>
        `);
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const date1 = new Date(2018, 1, 7);
            const date2 = new Date(2018, 1, 12);
            picker.setDate(date1, date2);
            vm.$nextTick(() => {
                // check pickers display value
                const selectedDates = picker.getDate()['selectDate']; // Date Objects
                let startSelectedValue = new Date(selectedDates[0]);
                let endSelectedValue = new Date(selectedDates[1]);
                expect(date1.getTime()).to.equal(startSelectedValue.getTime());
                expect(date2.getTime()).to.equal(endSelectedValue.getTime());
                done();
            });
        });
    });
    it('should create a daterangetime type DatePicker component which with sidebar and click hotkey get right selected date', done => {
        vm = createVue({
            template: '<NvDatePicker type="daterangetime" theme="common" :options="options" ref="nvDatePicker"></NvDatePicker>',
            data() {
                const self = this;
                return {
                    click: false,
                    options: {
                        position: 'inner',
                        shortcuts: [{
                                text: '7天',
                                defaultSelected: true,
                                value() {
                                    return [
                                        new Date(2018, 0, 23),
                                        new Date(2018, 0, 29)
                                    ];
                                }
                            },
                            {
                                text: '15天',
                                value() {
                                    return [
                                        new Date(2018, 0, 15),
                                        new Date(2018, 0, 29)
                                    ];
                                },
                                onClick: function() {
                                    self.click = true;
                                }
                            },
                            {
                                text: '30天',
                                value() {
                                    return [
                                        new Date(2018, 1, 15),
                                        new Date(2018, 2, 14)
                                    ];
                                }
                            }
                        ]
                    }
                }
            },
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const displayField = vm.$el.querySelector('.input');
            const date1 = new Date(2018, 0, 23);
            const date2 = new Date(2018, 0, 29);
            // check pickers display value
            const displayDates = displayField.value.split(' - '); // Date Objects
            let startDisplayValue = new Date(displayDates[0]);
            let endDisplayValue = new Date(displayDates[1]);
            expect(date1.getTime()).to.equal(startDisplayValue.getTime());
            expect(date2.getTime()).to.equal(endDisplayValue.getTime());

            // open panel
            displayField.click();
            const secondeKey = vm.$el.querySelectorAll('.sidebar-hotkey')[1];
            secondeKey.click();
            vm.$nextTick(() => {
                const text = vm.$el.querySelector('.date-picker-selected').innerText;
                expect(text).contains('15天');
                expect(vm.$data.click).to.be.equal(true);
                const hotkey = vm.$children[0].$children[1];
                hotkey.resetSidebar();
                vm.$nextTick(() => {
                    const selectedHotKey = vm.$el.querySelector('.sidebar-hotkey').querySelector('.date-picker-selected');
                    expect(selectedHotKey).to.be.equal(null);

                    done();
                });
            });
        });
    });
    it('should create a daterangetime type DatePicker component which with hotkey and click hotkey get right selected date', done => {
        vm = createVue({
            template: '<NvDatePicker type="daterangetime" theme="common" :options="options" ref="nvDatePicker"></NvDatePicker>',
            data() {
                const self = this;
                return {
                    click: false,
                    options: {
                        position: 'outer',
                        shortcuts: [{
                                text: '7天',
                                defaultSelected: true,
                                value() {
                                    return [
                                        new Date(2018, 0, 23),
                                        new Date(2018, 0, 29)
                                    ];
                                }
                            },
                            {
                                text: '15天',
                                value() {
                                    return [
                                        new Date(2018, 0, 15),
                                        new Date(2018, 0, 29)
                                    ];
                                },
                                onClick: function() {
                                    self.click = true;
                                }
                            },
                            {
                                text: '30天',
                                value() {
                                    return [
                                        new Date(2018, 1, 15),
                                        new Date(2018, 2, 14)
                                    ];
                                }
                            }
                        ]
                    }
                }
            }
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const displayField = vm.$el.querySelector('.input');
            const date1 = new Date(2018, 0, 23);
            const date2 = new Date(2018, 0, 29);
            // check pickers display value
            const displayDates = displayField.value.split(' - '); // Date Objects
            let startDisplayValue = new Date(displayDates[0]);
            let endDisplayValue = new Date(displayDates[1]);
            expect(date1.getTime()).to.equal(startDisplayValue.getTime());
            expect(date2.getTime()).to.equal(endDisplayValue.getTime());

            const secondeKey = vm.$el.querySelectorAll('.hot-key')[1];
            secondeKey.click();
            vm.$nextTick(() => {
                const text = vm.$el.querySelector('.date-picker-selected').innerText;
                expect(text).contains('15天');
                expect(vm.$data.click).to.be.equal(true);

                const hotkey = vm.$children[0].$children[1];
                hotkey.resetHotKeys();
                vm.$nextTick(() => {
                    const selectedHotKey = vm.$el.querySelector('.hot-keys-wrapper').querySelector('.date-picker-selected');
                    expect(selectedHotKey).to.be.equal(null);

                    done();
                });
            });
        });
    });
    it('should create a daterangetime type DatePicker component which with topbar and click hotkey get right selected date', done => {
        vm = createVue({
            template: '<NvDatePicker type="daterangetime" :options="options" ref="saDatePicker"></NvDatePicker>',
            data() {
                const self = this;
                return {
                    click: false,
                    options: {
                        position: 'top',
                        shortcuts: [{
                                text: '7天',
                                defaultSelected: true,
                                value() {
                                    return [
                                        new Date(2018, 0, 23, 1, 2, 3),
                                        new Date(2018, 0, 29, 4, 5, 6)
                                    ];
                                }
                            },
                            {
                                text: '15天',
                                value() {
                                    return [
                                        new Date(2018, 0, 15),
                                        new Date(2018, 0, 29)
                                    ];
                                },
                                onClick: function() {
                                    self.click = true;
                                }
                            },
                            {
                                text: '30天',
                                value() {
                                    return [
                                        new Date(2018, 1, 15),
                                        new Date(2018, 2, 14)
                                    ];
                                }
                            }
                        ]
                    }
                }
            }
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const displayField = vm.$el.querySelector('.input');
            const date1 = new Date(2018, 0, 23, 1, 2, 3);
            const date2 = new Date(2018, 0, 29, 4, 5, 6);
            // check pickers display value
            const displayDates = displayField.value.split(' - '); // Date Objects
            let startDisplayValue = new Date(displayDates[0]);
            let endDisplayValue = new Date(displayDates[1]);
            expect(date1.getTime()).to.equal(startDisplayValue.getTime());
            expect(date2.getTime()).to.equal(endDisplayValue.getTime());


            // open panel
            displayField.click();
            const secondeKey = vm.$el.querySelectorAll('.top-hotkey')[1];
            secondeKey.click();
            vm.$nextTick(() => {
                const text = vm.$el.querySelector('.date-picker-selected').innerText;
                expect(text).contains('15天');
                expect(vm.$data.click).to.be.equal(true);
                const hotkey = vm.$children[0].$children[2];
                hotkey.resetTopBar();
                vm.$nextTick(() => {
                    const selectedHotKey = vm.$el.querySelector('.date-picker-top-bar').querySelector('.date-picker-selected');
                    expect(selectedHotKey).to.be.equal(null);

                    done();
                });
            });
        });
    });
    it('should create a daterangetime type DatePicker component whth disabledhandler run rightly', done => {
        vm = createVue({
            template: '<NvDatePicker type="daterangetime" :options="options" ref="saDatePicker"></NvDatePicker>',
            data() {
                return {
                    options: {
                        disabledHandler: function(date) {
                            if (date.getDate() === 18) {
                                return true;
                            }
                        }
                    }
                }
            }
        });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const disabled = vm.$el.querySelector('.cell-disabled');
            const text = disabled.childNodes[0].innerHTML;
            // check pickers display value
            expect(text).to.equal('18');
            done();
        });
    });
    it('should create a daterangetime type DatePicker component whth console style', done => {
        vm = createVue({
            template:'<NvDatePicker type="daterangetime" :options="options" :theme="theme" ref="saDatePicker"></NvDatePicker>',
            data(){
                return {
                    theme: 'console',
                    options: {
                        position: 'top'
                    }
                }
            }
            });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const footer = vm.$el.querySelector('.left-time-panel');
            const inputNumber = footer.querySelector('.ivu-input-number');
            // check pickers display value
            expect(inputNumber).not.to.equal(null);
            done();
        });
    });
    it('should create a datetime type DatePicker component with setShownTxt run rightly', done => {
        vm = createVue({
            template:'<NvDatePicker type="datetime" :value="value" :setShownTxt="setShownTxt"></NvDatePicker>',
            data(){
                return {
                    value: '2018-07-11 12:13:14'
                }
            },
            methods: {
                setShownTxt: function (val) {
                    return '#' + val;
                }
            }
        });
        vm.$nextTick(() => {
            const display = vm.$el.querySelector('.input');
            const index = display.value.indexOf('#');
            // check pickers display value
            expect(index).to.equal(0);
            done();
        });
    });
    it('should create a daterangetime type DatePicker component with highLightShortCut run rightly', done => {
        vm = createVue({
            template:'<NvDatePicker type="daterangetime" :options="options" ref="datepicker"></NvDatePicker>',
            data(){
                return {
                    options: {
                        position: 'outer',
                        shortcuts: [
                            {
                                id: '11',
                                text: '7天',
                                value () {
                                    return [
                                        new Date(2018, 0, 23, 1, 2, 3),
                                        new Date(2018, 0, 29, 4, 5, 6)
                                    ];
                                }
                            },
                            {
                                id: '22',
                                text: '15天',
                                value () {
                                    return [
                                        new Date(2018, 0, 15),
                                        new Date(2018, 0, 29)
                                    ];
                                }
                            },
                            {
                                id: '33',
                                text: '30天',
                                value () {
                                    return [
                                        new Date(2018, 1, 15),
                                        new Date(2018, 2, 14)
                                    ];
                                }
                            }
                        ]
                    }
                }
            }
            });
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            vm.$refs['datepicker'].highLightShortCut('22');
            vm.$nextTick(() => {
                vm.$nextTick(() => {
                    // check pickers display value
                    const selected = vm.$el.querySelector('.date-picker-selected');
                    const text = selected.innerHTML;
                    expect(text).to.include('15天');
                    done();
                });
            });
        });
    });
    it('should create a daterangetime type DatePicker component and iconClickHandler function run rightly', done => {
        vm = createVue(`
            <NvDatePicker type="daterangetime"></NvDatePicker>
        `);
        const picker = vm.$children[0];
        picker.openPicker();
        vm.$nextTick(() => {
            const date1  = new Date(2018, 1, 7);
            const date2 = new Date(2018, 1, 12);
            picker.setDate(date1, date2);
            vm.$nextTick(() => {
                picker.iconMouseOver();
                const iconBtn = vm.$el.querySelector('.noahv-icon');
                iconBtn.click();
                vm.$nextTick(() => {
                    const displayField = vm.$el.querySelector('.input');
                    expect(displayField.value).to.equal('');
                    done();
                });
            });
        });
    });
});
