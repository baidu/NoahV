import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import noahvRequest from 'noahv-request';
import iView from 'iview';
import VueClipboard from 'vue-clipboard2';
import 'iview/dist/styles/iview.css';
import NoahV from '../src/index';
import routerConfig from './router';
import '../src/assets/css/index.less';

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueClipboard);
Vue.use(noahvRequest);
Vue.use(NoahV);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    routes: routerConfig
});

/* eslint-disable*/
let app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
