import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import VueSocialauth from 'vue-social-auth'
import axios from 'axios';
//Dependencia mensajes de confirmación de acciones
import Toasted from 'vue-toasted'
//Dependencia ventanas emergentes notificaciones
import VueSweetalert2 from 'vue-sweetalert2';


import VuePaginate from 'vue-paginate';


// Importa VeeValidate y el Validator
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';


// Indicar uso de idioma español
extend('required', {
  ...required,
  message: 'The {_field_} field is required'
});



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
