import Vue from 'vue'
import Vuex from 'vuex'
import form from './modules/form'
import values from './modules/values'
import status from './modules/status'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    form,
    values,
    status
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
