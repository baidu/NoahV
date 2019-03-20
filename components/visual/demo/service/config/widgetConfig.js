/**
 * @file echartsTheme
 * Include theme's colors config
 * @author wangjing(wang_jing13@163.com)
 *         darren(darrenywyu@gmail.com)
 */
export const WidgetConfig = {
    extraComponent: {
        trend: {
            dataZoom: {
                // show: false
            },
            colors: [
                '#108cee', '#ef8700', '#5fb333', '#5050f0', '#e92296', '#ffd700', '#00d7e7', '#f76a6a', '#50d6b8'
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
        themeColor: {
            warningColor: 'red'
        }
    },
    nodata: '无数据'
};

