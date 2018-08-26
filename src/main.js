// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
// import  Template from './components/Template'
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
import iView from 'iview' // 导入组件库
import 'iview/dist/styles/iview.css' // 导入样式
import store from './store'
import VueBus from 'vue-bus';
import mocks from './mock'
// /* eslint-disable no-new */
mocks.init();
Vue.use(iView)
Vue.use(Vuex)
Vue.use(VueBus);
// Vue.use(Template)
// Vue.use(mock);
  new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});


