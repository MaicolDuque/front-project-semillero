import Vue from 'vue'
import Vuex from 'vuex'
import userService from './services/user.service'
import createPersistedState from "vuex-persistedstate";
import VueCryptojs from 'vue-cryptojs'
Vue.use(VueCryptojs)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isVisitante: "si",
    user: {},
    rol : 0,
    prueba: Vue.CryptoJS.AES.encrypt('Vamos a ver que sale','Key').toString()
  },
  /* plugins: [createPersistedState()], */
  getters: {
    getUser: (state) => {
      return state.user
    },
    getIsLogin: (state) => {
      return state.isLogin
    },
    getRol: (state) => {
      return state.rol
    }
  },
  mutations: {
    setLogin(state, val) {
      state.isLogin = val
    },
    MUTATION_info_user(state, info) {
      state.user = info
    },
    setVisitante(state, val) {
      state.isVisitante = val
    },

    MUTATION_setRol(state, data) {
      state.rol = data;
    }
  },
  actions: {
    infoUserDirector(context, id) {
      return userService.infoUserDirector(id)
        .then(res => {
          context.commit('MUTATION_info_user', res[0])
          return res
        })
    },

    infoUserCoordinador(context, id) {
      return userService.infoUserCoordinador(id)
        .then(res => {
          context.commit('MUTATION_info_user', res[0])
          return res
        })
    },


    infoUser(context, id) {
      return userService.infoUser(id)
        .then(res => {
          context.commit('MUTATION_info_user', res[0])
          return res
        })
    },

    obtenerRol(context, res) {
      context.commit('MUTATION_setRol', res)
    }
 


  }
})
