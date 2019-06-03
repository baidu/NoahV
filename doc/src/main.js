/**
 * @file main entry for project
 *
 */
import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import noahv from 'noahv-core';
import noahvRequest from 'noahv-request';
import noahvComponent from 'noahv-component';
import visualComponent from 'noahv-visual-components';
import store from './store/';
import {highchartsConfig} from './doc/visualComponent/config/widgetConfig';
import routerConfig from './common/router';
import headerConfig from './common/header';
import footerApp from './common/layout/footer';
import codeCom from './common/component/code';
import './tools/mock';
import 'iview/dist/styles/iview.css';
import 'noahv-component/src/assets/css/index.less';
import 'noahv-visual-components/src/assets/css/index.less';
import './common/assets/css/main.less';
import 'highlight.js/styles/github.css';
// If wanted diy layout, please import this file
// import layoutApp from './common/layout/layout';

Vue.component('sa-code', codeCom);
Vue.component('nv-code', codeCom);


// keep this
Vue.use(VueRouter);


// import iview & noahvComponent
Vue.use(iView);

Vue.use(noahvRequest);

Vue.use(noahvComponent);
Vue.use(visualComponent);
visualComponent.setOptions(Vue, Object.assign({}, highchartsConfig));

// use default layout with header config
noahv.layout(headerConfig, footerApp);

// If wanted diy layout, please use this line
// noahv.useLayout(layoutApp);

// keep this
noahv.router(routerConfig);

// if you want use baidu tongji, add this line
// for detail info, you can visit this page: http://tongji.baidu.com/web/help/article?id=174&type=0
noahv.useBaiduTrack('0c5bbc0355ed6e991518ff8c26d71dda')

// init project
noahv.start('#app', store);

