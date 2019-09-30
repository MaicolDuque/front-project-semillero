import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import VueSocialauth from 'vue-social-auth'
import axios from 'axios';
Vue.use(VueAxios, axios)
Vue.use(VueSocialauth, {
  providers: {
    google: {
      clientId: '632225845458-r9s1qfn6ta7e26gi6h00kh25qi0uk2f6.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/about' // Your client app URL
    }
  }
})
//https://mail.google.com

// Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
