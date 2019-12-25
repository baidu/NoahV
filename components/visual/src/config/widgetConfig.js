/**
 * @file echartsTheme
 * Include theme's colors config
 * @author wangjing(wang_jing13@163.com)
 *         darren(darrenywyu@gmail.com)
 */

export const eConfig = {
    extraComponent: {
        trend: {
            dataZoom: {
                show: false
            },
            colors: [
                '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
                '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'
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
            colors: [
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
            colors: [
                '#108CEE', '#3A62CA', '#F18823', '#EA2E2E',
                '#8A58BC', '#5FB333', '#BC5858', '#04C1BA',
                '#F5CB59', '#9AA1B3'
            ]
        },
        themeColor: {
            warningColor: 'red'
        }
    },
    nodata: '无数据'
};
