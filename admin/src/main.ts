import Vue from 'vue';
import App from './App.vue';
import './plugins/element';
import router from './router';
import EleForm from 'vue-ele-form';
import axios from 'axios';

Vue.config.productionTip = false;

// 注册 vue-ele-form
Vue.use(EleForm);

Vue.prototype.$http = axios.create({
  // 指向服务端的接口根地址
  baseURL: 'http://localhost:3000',
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
