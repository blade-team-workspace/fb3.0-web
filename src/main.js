// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import mock from './mock/index'
import Vuex from 'vuex'
// import  Template from './components/Template'
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
mock.init();
import iView from 'iview' // 导入组件库
import 'iview/dist/styles/iview.css' // 导入样式
// /* eslint-disable no-new */
Vue.use(iView)
Vue.use(Vuex)
// Vue.use(Template)
// Vue.use(mock);
var a =  new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

export default a
