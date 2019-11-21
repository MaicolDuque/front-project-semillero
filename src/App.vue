<template>
<div>
  <div id="app" v-if="isAuth">
    <SPheader></SPheader>
    <SPleftMenu />
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <SPfooter />
  </div>

  <Login v-else />
</div>

</template>

<script>
import SPheader from "./components/Header";
import SPleftMenu from "./components/LeftMenu";
import SPfooter from "./components/Footer";
import Login from "./views/Login";
import { TokenService } from "./services/storage.service"


export default {
  components: { SPheader, SPleftMenu, SPfooter, Login },
  data () {
    return {
      // auth: false
    }
  },
  created () {
    if(localStorage.access_token) {
      this.$store.commit('setLogin', true)          
      // this.$store.commit('addUser', JSON.parse(localStorage.user))
    }

    if(localStorage.user){
      let user =   JSON.parse(localStorage.user)     
      let rol = user.id_rol
      console.log("ccccccccccccccccccccc"+rol)
      if(rol == 2){
        this.$store.dispatch('infoUserDirector',user.id_usuario)
      }else if(rol == 3){
        this.$store.dispatch('infoUserCoordinador',user.id_usuario)
      }
    }

    
  },
  computed: {
    isAuth() {
      return this.$store.state.isLogin
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>
