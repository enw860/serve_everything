import Vue from 'vue'
import Vuex from 'vuex'
import * as uiDemo from './modules/uiDemo.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    uiDemo,
  },
  state: {}
})
