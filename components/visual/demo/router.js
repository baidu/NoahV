/* eslint-disable no-undef */
export default [
    {
        path: '/nvbillboard',
        component: r => require.ensure([], () => r(require('./components/billboard.vue')), 'billboard')
    },
    {
        path: '/nvcircle',
        component: r => require.ensure([], () => r(require('./components/circle.vue')), 'circle')
    },
    {
        path: '/nvtrend',
        component: r => require.ensure([], () => r(require('./components/trend.vue')), 'trend')
    },
    {
        path: '/nvreport',
        component: r => require.ensure([], () => r(require('./components/report.vue')), 'report')
    },
    {
        path: '/nveventriver',
        component: r => require.ensure([], () => r(require('./components/eventRiver.vue')), 'eventriver')
    },
    {
        path: '/nvbubble',
        component: r => require.ensure([], () => r(require('./components/bubble')), 'bubble')
    }
];
