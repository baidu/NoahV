<template>
    <div ref="eventMain" class="ui-eventriver-holder"></div>
</template>
<script>
import u from 'underscore';
import $ from 'jquery';
import * as d3 from 'd3';
import moment from 'moment';

export default {
    props: {
        config: Object,
        layoutType: String,
        serieLists: Object
    },
    data() {
        this.defaultConfig = {
            height: 283
        };
        return {
            list: []
        };
    },
    watch: {
        serieLists: {
            handler(val) {
                this.renderRiver(val);
            },
            deep: false
        }
    },
    methods: {
        renderRiver(serieLists) {
            let series = serieLists;

            // preserve original data to render the event blocks
            this.origin = series;
            this.series = series.series;
            this.layoutSeries();
            this.redraw();
        },
        redraw() {
            let data = this.origin;
            if (!data) {
                return;
            }
            let events = [];
            u.each(this.series, series => {
                if (series.enabled) {
                    [].push.apply(events, series.eventList);
                }
            });

            let drawData = {
                start: moment(data.start).unix() * 1000,
                end: moment(data.end).unix() * 1000,
                events: events,
                legend: data.legend || 'bottom',
                axis: data.axis || 'bottom'
            };
            this.$nextTick(() => {
                this.draw(drawData);
            });
        },
        draw(data) {
            let eventMain = this.$refs.eventMain;
            eventMain.innerHTML = '';
            let width = $(eventMain).width();
            let height = this.defaultConfig.height;
            let top = 0;
            let bottom = 40;
            if (data.legend === 'top') {
                top += 20;
                bottom -= 20;
            }
            else if (data.legend === 'none') {
                bottom -= 20;
            }
            if (data.axis === 'top') {
                top += 20;
                bottom -= 20;
            }
            else if (data.axis === 'none') {
                bottom -= 20;
            }
            let svg = d3.select(eventMain).append('svg')
                .attr('width', width)
                .attr('height', height);

            this.svg = svg;

            // render tooltip
            this.renderTooltipTpl();

            let timetipY = data.axis === 'top' ? top - 20 : height - bottom;

            // show a timeTip when mouse hover it on
            this.timetip = d3.select(eventMain)
                .append('div')
                .attr('class', 'timetip')
                .style('left', '-9999999em')
                .style('top', timetipY + 'px');

            // show a timeLine when mouse hover it on
            this.crosshair = svg.append('line')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', data.axis === 'top' ? top - 4 : top)
                .attr('y2', height - bottom)
                .attr('stroke', 'gray')
                .attr('stroke-width', 1)
                .attr('opacity', 0);
            let linear = d3.scaleLinear()
                .domain([data.start, data.end])
                .range([0, width]);
            this.linear = linear;

            // EventRiver's container holder
            svg.on('mouseenter', () => {
                this.crosshair.attr('opacity', 1);
            }).on('mousemove', () => {
                if (d3.event.layerY < (height - bottom)) {
                    this.crosshair.attr('opacity', 1);
                    let x = d3.event.layerX;

                    // eventLine to show current time
                    this.crosshair.attr('x1', x).attr('x2', x);
                    let time = linear.invert(x);
                    this.timetip.html(moment(time).format('YYYY-MM-DD HH:mm:ss'));
                    let node = this.timetip.node();
                    let dwidth = $(node).width();
                    let left = x - dwidth / 2;
                    if (left + dwidth > width) {
                        left = width - dwidth - 1;
                    }
                    else if (left < 0) {
                        left = 0;
                    }
                    this.timetip.style('left', left + 'px');
                }
                else {
                    this.crosshair.attr('opacity', 0);
                    this.timetip.style('left', '-9999999em');
                }

            }).on('mouseleave', () => {
                this.crosshair.attr('opacity', 0);
                this.timetip.style('left', '-9999999em');
            });

            // render eventlist blocks
            this.renderEventList(data, {
                top: top,
                height: height,
                bottom: bottom
            });

            if (data.axis !== 'none') {
                let xAxisY = data.axis === 'top' ? (top - 4) : (height - bottom);

                let axis = d3.axisBottom()
                    .scale(linear)
                    .ticks(Math.ceil(width / 150))
                    .tickSize(0, 0)
                    .tickPadding(5)
                    .tickFormat(d => {
                        return moment(d).format('MM-DD HH:mm:ss');
                    });

                let xAxis = svg.append('g')
                    .attr('transform', 'translate(0,' + xAxisY + ')')
                    .call(axis);
                xAxis.selectAll('line')
                    .attr('x1', 0)
                    .attr('x2', 0)
                    .attr('y1', 0)
                    .attr('y2', data.axis === 'top' ? -3 : 3)
                    .attr('stroke', 'gray');
                xAxis.selectAll('text')
                    .style('font-size', 10)
                    .attr('fill', 'gray');
                xAxis.select('.domain')
                    .attr('stroke-width', 1)
                    .attr('stroke', 'gray');
            }
        },
        renderTooltipTpl() {
            if (!this.tooltip) {
                this.tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'ui-eventriver-tooltip')
                    .style('left', '-9999999em')
                    .style('opacity', 1)
                    .on('mouseenter', () => {
                        if (this.tooltiptimer) {
                            clearTimeout(this.tooltiptimer);
                            this.tooltiptimer = null;
                        }
                    })
                    .on('mouseleave', () => {
                        this.tooltip.style('left', '-99999999em');
                    });
                this.tooltip.append('div')
                    .attr('class', 'timebar');
                this.tooltip.append('div')
                    .attr('class', 'content');
            }
        },

        /**
         * render the events on the container
         *
         * @param  {[type]} data   [description]
         * @param  {[type]} mainOpts [description]
         */
        renderEventList(data, mainOpts) {
            const self = this;
            let eventMain = this.$refs.eventMain;
            let linear = this.linear;
            let drawData;
            let top = mainOpts.top;
            let height = mainOpts.height;
            let bottom = mainOpts.bottom;
            let mainPostion = $(eventMain).offset();
            if (this.layoutType === 'alone') {
                drawData = this.transferDataset2(data.events, height - bottom - top);
            }
            else {
                drawData = this.transferDataset(data.events, height - bottom - top);
            }
            let eventView = this.svg.selectAll('svg')
                .data(drawData)
                .enter()
                .append('svg')
                .attr('type', d => {
                    return d.type;
                })
                .attr('width', d => {
                    let width = linear(Math.min(d.end, data.end)) - linear(Math.max(d.start, data.start));
                    width = Math.max(width, 5);
                    return width;
                })
                .attr('height', 16)

                .attr('x', d => {
                    return linear(Math.max(d.start, data.start));
                })
                .attr('y', d => {
                    return d.y + top;
                })
                /* eslint-disable */
                .on('mouseenter', function (d) {
                    let target = d3.select(this).node();
                    self.tooltip.select('.timebar').html('time');
                    self.tooltip.select('.content').html(self.renderTooltip(d));
                    let gWidth = $(document).width() + $(document).scrollLeft();
                    let dom = self.tooltip.node();
                    let domTop =  parseInt(d3.select(target).attr('height'), 10);
                    let targetOffset = $(target).offset();
                    let tooltipWidth = $(dom).width();
                    let tooltipHeight = $(dom).height();
                    let left = d3.event.pageX - tooltipWidth / 2;
                    let top = targetOffset.top + domTop;
                    if (left + tooltipWidth > gWidth) {
                        left = gWidth - tooltipWidth - 10;
                    }
                    self.tooltip.style('left', left + 'px');
                    if (top < $(document).scrollTop()) {
                        top = targetOffset.top + domTop;
                    }
                    else if (top + tooltipHeight > mainPostion.top + height - bottom) {
                        top = targetOffset.top - tooltipHeight - domTop;
                    }
                    self.tooltip.style('top', top + 'px');
                    d3.select(this).attr('opacity', 0.7);
                })
                /* eslint-enable */
                .on('mousemove', () => {
                    let gWidth = $(document).width() + $(document).scrollLeft();
                    let dom = this.tooltip.node();
                    let width = $(dom).width();
                    let x = this.getOffsetX(d3.event);
                    let left = d3.event.pageX;
                    if (left + width > gWidth) {
                        left = left - width;
                    }
                    else if (left < 0) {
                        left = 0;
                    }
                    this.tooltip.style('left', left + 'px');
                    let time = linear.invert(x);
                    this.tooltip.select('.timebar').html(moment(time).format('YYYY-MM-DD HH:mm:ss'));
                })
                /* eslint-disable */
                .on('mouseleave', function (d) {
                    d3.select(this).attr('opacity', 1);
                    self.tooltiptimer = setTimeout(function () {
                        self.tooltip.style('left', '-9999999em');
                    }, 100);
                /* eslint-enable */
                }).on('click', d => {
                    let x = this.getOffsetX(d3.event);
                    let time = linear.invert(x);
                    this.opts.clickEventHandler(d, x, time);
                });

            eventView.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', d => {
                    let width = linear(Math.min(d.end, data.end)) - linear(Math.max(d.start, data.start));
                    width = Math.max(width, 5);
                    return width;
                })
                .attr('height', 16)
                .attr('opacity', 0.8)
                .attr('fill', d => {
                    return d.color || 'rgba(100, 0, 0, 0.5)';
                });

            eventView.append('text')
                .attr('x', 0)
                .attr('y', '50%')
                .attr('dx', 0)
                .attr('dy', 0)
                .style('font-size', 10)
                .attr('fill', () => {
                    return '#333';
                })
                .attr('text-anchor', 'start')
                .attr('dominant-baseline', 'middle')
                .text(d => {
                    let width = linear(Math.min(d.end, data.end)) - linear(Math.max(d.start, data.start));
                    if (d.height > 12 && width > 40) {
                        return d.name;
                    }
                    return '';
                });
            this.eventView = eventView;
        },

        /**
         * Sort EventBlocks
         * put all the eventblocks in the Sorting pool togethor
         *
         * @param  {[type]} data   [description]
         * @param  {[type]} height [description]
         * @return {[type]}        [description]
         */
        transferDataset(data, height) {
            let rows = [
                {
                    end: 0,
                    queue: []
                }
            ];
            data = u.sortBy(data, item => {
                return item.start;
            });
            u.each(data, item => {
                let nrow;
                rows = u.sortBy(rows, row => {
                    return row.end;
                });
                u.find(rows, row => {
                    if (item.start >= row.end) {
                        nrow = row;
                        return true;
                    }
                });
                if (nrow) {
                    nrow.end = item.end;
                    nrow.queue.push(item);
                }
                else {
                    nrow = {
                        end: item.end,
                        queue: [item]
                    };
                    rows.push(nrow);
                }
            });
            let h = height / rows.length;
            let ret = [];
            u.each(rows, (row, i) => {
                u.each(row.queue, item => {
                    item.height = Math.min(h, 50);
                    item.y = h * (i - 1);
                    ret.push(item);
                });
            });
            return ret;
        },

        /**
         * Sort EventBlocks
         * each of the series order by start each line
         *
         * @param  {[type]} data   [description]
         * @param  {[type]} height [description]
         * @return {[type]}        [description]
         */
        transferDataset2(data, height) {
            let rows = [];
            u.each(this.series, series => {
                if (series.enabled) {
                    let row = this.calcRows(series.eventList);
                    u.each(row, r => {
                        if (r.queue.length > 0) {
                            rows.push(r);
                        }
                    });
                }
            });
            let h = height / rows.length;
            let ret = [];
            u.each(rows, (row, i) => {
                u.each(row.queue, item => {
                    item.height = Math.min(h, 50);
                    item.y = h * i;
                    ret.push(item);
                });
            });

            return ret;
        },
        calcRows(data) {
            let rows = [
                {
                    end: 0,
                    queue: []
                }
            ];
            data = u.sortBy(data, item => {
                return item.start;
            });
            u.each(data, item => {
                let nrow;
                rows = u.sortBy(rows, row => {
                    return row.end;
                });
                u.each(rows, row => {
                    if (item.start >= row.end) {
                        nrow = row;
                        return true;
                    }
                });
                if (nrow) {
                    nrow.end = item.end;
                    nrow.queue.push(item);
                }
                else {
                    nrow = {
                        end: item.end,
                        queue: [item]
                    };
                    rows.push(nrow);
                }
            });
            return rows;
        },
        layoutSeries() {
            let bx = 0;
            u.each(this.series, series => {
                let width = this.textWidth(series.name, 12);
                series.y = 0;
                series.x = bx;
                series.enabled = true;
                bx = bx + width + 12 + 8;
            });
        },
        textWidth(text, size) {
            let span = document.createElement('span');
            span.style.fontSize = size + 'px';
            span.innerHTML = text;
            span.style.position = 'absolute';
            span.style.left = '-9999999999em';
            document.body.appendChild(span);
            let width = span.offsetWidth;
            document.body.removeChild(span);
            return width;
        },

        /**
         * render the event description
         *
         * 1.render base on eventDetailMap,when the config has eventDetailMap.
         * 2.render base on event,if config of event is 'String'
         * 3.render base on event, if the config of event is Object.
         * It will traversing each field of an object to render the information
         *
         * @param  {[type]} d   [event]
         * @return {[type]}     [the html of information]
         */
        renderTooltip(d) {
            const event = d.event.display;
            let detailMapArr = d.eventDetailMap ? d.eventDetailMap : false;
            let htm = [];
            htm.push('<dl>');
            if (typeof event !== 'object') {
                htm.push('<dt>', event, '</dt>');
            }

            // if conf have detail info map, show real info
            else if (detailMapArr) {
                detailMapArr.map(item => {
                    let info = this.getInfoVal(item.key, event);
                    if (item.type === 'link' && info) {
                        htm.push('<dt>', item.name, '： <a href="', info, '" target="_blank">查看详情</a></dt>');
                    }
                    else if (item.type === 'arr' && info) {
                        if (typeof info === 'object') {
                            htm.push('<dt>', item.name, '：', info.join(','), '</dt>');
                        }
                        else {
                            htm.push('<dt>', item.name, '：', info, '</dt>');
                        }
                    }
                    else if (info) {
                        htm.push('<dt>', item.name, '：', info, '</dt>');
                    }
                    return item;
                });
            }

            // if conf don't have detailMap, show display instead
            else {
                for (let key in event) {
                    htm.push('<dt>', key, '：', event[key], '</dt>');
                }
            }
            htm.push('</dl>');
            return htm.join('');
        },
        getOffsetY(event) {
            return event.layerY || event.offsetY;
        },
        getOffsetX(event) {
            return event.layerX || event.offsetX;
        },

        /**
         * Search the real Content by the Key
         * Deep traversal object to get real content
         *
         * @param  {[type]} key       [Keyword]
         * @param  {[type]} detailObj [Map object]
         * @return {[type]}           [Real Content]
         */
        getInfoVal(key, detailObj) {
            let index = key.indexOf('.');
            let mainKey = key.substring(0, index);
            let leftKey = key.substring(index + 1, key.length);
            if (index === -1) {
                mainKey = key;
                leftKey = false;
            }
            let realVal = detailObj[mainKey];
            if (!leftKey) {
                return realVal;
            }
            if (realVal) {
                realVal = this.getInfoVal(leftKey, realVal);
            }
            else {
                return false;
            }
            return realVal;
        },
        focusSerie(serie, isFocus) {
            const self = this;
            /* eslint-disable */
            self.eventView.each(function () {
                let type = d3.select(this).attr('type');
                if (serie.type === type && isFocus) {
                    d3.select(this).attr('opacity', 0.6);
                }
                else if (serie.type === type) {
                    d3.select(this).attr('opacity', 1);
                }
            });
            /* eslint-enable */
        }
    }
};
</script>
