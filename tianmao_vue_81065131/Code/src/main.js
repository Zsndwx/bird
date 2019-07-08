import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
// import fastclick from 'fastclick';
import Vuelazyload from 'vue-lazyload';
import store from './store';

import 'assets/scss/index.scss';
import 'swiper/dist/css/swiper.css';

// fastclick.attach(document.body);
Vue.config.productionTip = false;
// 懒加载
Vue.use(Vuelazyload, {
  preLoad: 1,
  error: require('assets/img/error.png'),
  loading: require('assets/img/loading.gif'),
  attempt: 1
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
});
