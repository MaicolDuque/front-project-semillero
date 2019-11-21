import Vue from 'vue'
import Vuex from 'vuex'
import userService from './services/user.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {}
  },
  getters: {
    getUser: (state) => {
      return state.user
    }
  },
  mutations: {
    setLogin(state, val){
      state.isLogin = val
    },
    MUTATION_info_user(state, info){
      state.user = info
    }
  },
  actions: {
    infoUserDirector(context, id){
      return userService.infoUserDirector(id)
        .then(res => {
            context.commit('MUTATION_info_user', res[0])
            return res
        })
    },

    infoUserCoordinador(context, id){
      return userService.infoUserCoordinador(id)
        .then(res => {
            context.commit('MUTATION_info_user', res)
            return res
        })
    }
  }
})
