/**
 * @file hichartsTheme
 * Include theme's colors config
 * @author wangjing(wang_jing13@163.com)
 */
export const highchartsConfig = {
    credits: false,
    extraComponent: {
        trend: {
            colors: [
                '#7cb5ec', '#434348', '#8bbc21', '#910000', '#1aadce',
                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'
            ],
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
    nodata: '无数据'
};
