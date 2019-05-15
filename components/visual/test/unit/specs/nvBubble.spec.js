import Vue from 'vue';
import { createTest, createVue, destroyVM} from '../util';

const axis = {
    '华南': [
        'GZA',
        'GZB',
        'GZC',
        'GZD',
        'GZE',
        'GZF'
    ],
    '华北': [
        'HBA',
        'HBB',
        'HBC',
        'HBD',
        'HBE',
        'HBF',
        'HBG',
        'HBH',
        'HBI',
        'HBJ',
        'HBK',
        'HBL',
        'HBM',
        'HBN',
        'HBO',
        'HBP',
        'HBQ',
        'HBR'
    ],
    '华东': [
        'HDA',
        'HDB',
        'HDC',
        'HDD',
        'HDE',
        'HDF',
        'HDG',
        'HDH',
        'HDI',
        'HDJ',
        'HDK',
        'HDL'
    ],
    'C区': [
        'BDC1',
        'BDC2'
    ]
};
const axisStatus = {
    'GZB': {
        'sourceIdc': 'GZB',
        'status': {
            'HBN': 'warning',
            'GZC': 'special'
        }
    },
    'HBF': {
        'sourceIdc': 'HBF',
        'status': {
            'GZF': 'warning'
        }
    },
    'HBD': {
        'sourceIdc': 'HBD',
        'status': {
            'GZF': 'error'
        }
    },
    'HBE': {
        'sourceIdc': 'HBE',
        'status': {
            'HBL': 'error',
            'GZA': 'error',
            'HBO': 'error',
            'GZC': 'error',
            'HBR': 'error',
            'HDJ': 'error',
            'HBJ': 'error'
        }
    },
    'HBH': {
        'sourceIdc': 'HBH',
        'status': {
            'HBH': 'error'
        },
        'drillDownLists': ['HBHa', 'HBHb']
    },
    'GZF': {
        'sourceIdc': 'GZF',
        'status': {
            'HBL': 'error'
        }
    },
    'HDH': {
        'sourceIdc': 'HDH',
        'status': {
            'HBA': 'error'
        }
    },
    'HBA': {
        'sourceIdc': 'HBA',
        'status': {
            'HBE': 'error',
            'HDK': 'error'
        }
    },
    'HDG': {
        'sourceIdc': 'HDG',
        'status': {
            'HDC': 'warning',
            'HBN': 'warning',
            'HBD': 'normal',
            'GZC': 'warning'
        }
    },
    'HBQ': {
        'sourceIdc': 'HBQ',
        'status': {
            'GZF': 'warning'
        }
    },
    'HDK': {
        'sourceIdc': 'HDK',
        'status': {
            'HDA': 'warning',
            'HDF': 'warning'
        }
    },
    'HBC': {
        'sourceIdc': 'HBC',
        'status': {
            'HBA': 'normal',
            'HBF': 'warning'
        }
    },
    'GZD': {
        'sourceIdc': 'GZD',
        'status': {
            'HBE': 'error'
        }
    },
    'HBO': {
        'sourceIdc': 'HBO',
        'status': {
            'HBP': 'error'
        }
    },
    'HBL': {
        'sourceIdc': 'HBL',
        'status': {
            'HBL': 'normal'
        }
    },
    'BDC1': {
        'sourceIdc': 'BDC1',
        'status': {
            'HBL': 'error',
            'BDC1': 'normal'
        }
    },
    'BDC2': {
        'sourceIdc': 'BDC2',
        'status': {
            'YQ02': 'normal',
            'BDC1': 'error'
        }
    }
};
const legendStatus = [
    {
        name: '正常辐射区域',
        color: '#3a62ca',
        icon: 'search',
        type: 'normal',
        typeName: '正常辐射工作区',
        typeSymbol: 'triangle', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none', image://url (database64) path://
        typeSymbolSize: 10
    },
    {
        name: '轻微辐射区域',
        color: '#ef8700',
        type: 'warning'
    },
    {
        name: '严重辐射区域',
        color: '#f62626',
        type: 'error'
    },
    {
        name: '无人区',
        color: 'black',
        type: 'special'
    }
];
describe('nvBubble', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('should create a NvBubble component with conf rightly', done => {
        vm = createVue({
            template: '<NvMDBubble :axis="axis"'
                + ' :axisStatus="axisStatus"'
                + ' :legendStatus="legendStatus"'
                + ' :showLegend="true"'
                + ' :showTooltips="true" />',
            data() {
                return {
                    axis,
                    axisStatus,
                    legendStatus,
                    showLegend: true,
                    showTooltips: false
                };
            }
        });
        vm.$nextTick(() => {
            const mdbubble = vm.$el.querySelector('.mdbubble');
            expect(mdbubble).is.be.to.exist;
            done();
        });
    });
});
