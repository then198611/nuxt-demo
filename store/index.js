import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import user from './modules/user'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state,
  modules: {
    user
  }
})

export default store
