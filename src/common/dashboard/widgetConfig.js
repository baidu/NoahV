/**
 * @file hichartsTheme
 * Include theme's colors config
 * @author wangjing(wang_jing13@163.com)
 */
export default {
    credits: false,
    extraComponent: {
        trend: {
            dataZoom: {
                show: false
            },
            colors: [
                '#7cb5ec', '#80699B', '#007BDC', '#C5081F', '#f34937', '#FF7329', '#F79C3C', '#FFCC52',
                '#B6BB03', '#87E118', '#53A837', '#2BBBB7',
                '#58D5E5', '#4CA0E2', '#635EE6',
                '#AB68E3', '#E158CE', '#E91077'
            ],
            chartTypeImgUrl: {
                area: '../css/img/chartarea.png',
                line: '../css/img/chartline.png',
                column: '../css/img/chartcolumn.png',
                stack: '../css/img/chartstack.png',
                normal: '../css/img/chartnormal.png'
            },
            eventColor: ['#36BA33', '#00D7DE', '#EADE16', '#A800FF', '#C69C06']
        },
        circle: {
            colors: {
                red: '#ff0000',
                yellow: '#FFD769',
                blue: '#4a90ea',
                orange: '#ea8010',
                default: '#4a90ea'
            }
        },
        eventRiver: {
            color: [
                '#9276D2', '#6656C3', '#347DDD', '#31B7DF',
                '#4DC8D7', '#75D4BB', '#1FC699', '#8FD18B',
                '#C9E17F', '#FFD769', '#FFB685', '#FCA15C',
                '#F88452', '#F5A59F', '#FF7C83', '#0066CC'
            ],
            themeColor: {
                warningColor: '#f00',
                normalColor: '#008000',
                activeColor: '#0000ff'
            }
        },
        pie: {
            tooltip(points, conf) {
                let htm = '<div><p>自定义名称：' + points.key + '</p>'
                        + '<p>数值：' + points.y + ', 占比：' + points.percentage.toFixed(conf.qfw || 4) + '%</p>';
                return htm;
            }
        },
        themeColor: {
            warningColor: 'red'
        }
    },
    nodata: '无数据',
    mons: {
        confApi: {
            nvMdCircle: '/api/conf/get',
            nvMdBillboard: '/api/conf/get',
            nvMdTrend: '/api/conf/get',
            nvMdReport: '/api/conf/get',
            nvMdEventRiver: '/api/conf/get'
        }
    }
};
