import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import SAVisualComponents from '../src/index';
import '../src/assets/css/index.less';
import routerConfig from './router';
import {WidgetConfig} from './service/config/widgetConfig';

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(SAVisualComponents, WidgetConfig);

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
