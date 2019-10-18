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

export default {
  components: {SPheader, SPleftMenu, SPfooter},
}
</script>
<style>

</style>
