<template>
  <div id="app">
    <SPheader></SPheader>
    <SPleftMenu />
    <div class="content-wrapper">
      <router-view/>
    </div>
    <SPfooter />
    
  </div>
</template>

<script>

import SPheader from "./components/Header"
import SPleftMenu from "./components/LeftMenu"
import SPfooter from "./components/Footer"
import ApiService from "./services/api.service"

ApiService.init("http://127.0.0.1:8000/api");
export default {
  components: {SPheader, SPleftMenu, SPfooter},
}
</script>
<style>

</style>
