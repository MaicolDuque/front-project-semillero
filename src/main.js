import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios';
import VueAxios from 'vue-axios'
import VueSocialauth from 'vue-social-auth'
//Dependencia mensajes de confirmación de acciones
import Toasted from 'vue-toasted'
//Dependencia ventanas emergentes notificaciones
import VueSweetalert2 from 'vue-sweetalert2';
//
import Vuelidate from 'vuelidate'
import VuePaginate from 'vue-paginate';
// Importa VeeValidate y el Validator
import { ValidationProvider, extend } from 'vee-validate';
import { required, is } from 'vee-validate/dist/rules';
// Import Vue and vue2-collapse
import VueCollapse from 'vue2-collapse'
import Multiselect from 'vue-multiselect'  //Select with search

//Import API for setter anf getter localstorage
import ApiService from './services/api.service';
import { TokenService } from './services/storage.service';
//Import cifrado de js
import VueCryptojs from 'vue-cryptojs'

Vue.component('multiselect', Multiselect)
Vue.use(Vuelidate)
// Loading the plugin into the Vue.
Vue.use(VueCollapse);
Vue.use(VueCryptojs)

// Indicar uso de idioma español
extend('required', {
  ...required,
  message: 'El campo es requerido'
});



ApiService.init(process.env.VUE_APP_URL_API); // Config URL for services


// If token exists set header
if (!TokenService.getToken()) {
  TokenService.saveToken('');
}

//If user no exist in localStorage
if(!localStorage.user){
  
  let info = JSON.stringify({"id_rol":0})
  let encriptado = CryptoJS.AES.encrypt(info,'Key').toString()
  TokenService.saveTokenCustom('user', encriptado)
  /* let user = JSON.parse(localStorage.user) */
  /* console.log("USER=>>",user)
  console.log("USER=>>",user.id_rol) */
}

ApiService.setHeader();
// }
// if (TokenService.getToken()) {
//   ApiService.setHeader();
// }

if (!TokenService.getItemCustom('visitante')) {
  TokenService.saveTokenCustom('visitante', "si")
}


Vue.component('ValidationProvider', ValidationProvider);
Vue.use(VueSweetalert2);
Vue.use(VuePaginate)
Vue.use(Toasted)
Vue.use(VuePaginate)
Vue.use(VueAxios, axios)
Vue.use(VueSocialauth, {
  providers: {
    google: {
      clientId: process.env.VUE_APP_GOOGLE_ID,
      redirectUri: process.env.VUE_APP_GOOGLE_URL // Your client app URL
    }
  }
})
//https://mail.google.com

// Vue.config.productionTip = false


new Vue({
  router,
  ValidationProvider,
  store,
  render: h => h(App)
}).$mount('#app')
