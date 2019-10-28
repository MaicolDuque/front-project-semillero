<template>
<div>
  <div id="app" v-if="auth">
    <SPheader></SPheader>
    <SPleftMenu />
    <div class="content-wrapper">
      <router-view />
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
import ApiService from "./services/api.service";
import Login from "./views/Login";

ApiService.init("http://127.0.0.1:8000/api");

export default {
  components: { SPheader, SPleftMenu, SPfooter, Login },
  data () {
    return {
      auth: true
    }
  },
};
</script>
<style>
</style>
