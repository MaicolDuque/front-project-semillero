<template>
  <!-- Navbar -->
  <nav
    style="background-color: #196844"
    class="main-header navbar navbar-expand navbar-white navbar-light"
  >
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#">
          <i class="fas fa-bars"></i>
        </a>
      </li>
      <header class="header" role="banner">
        <div class="header-inner clearfix">
          <h5>
            <a class="brand pull-left" href="/">
              <img
                src="https://www.politecnicojic.edu.co/images/logo/logo.png"
                alt="Politécnico Colombiano Jaime Isaza Cadavid"
                class="img-responsive logo"
              />
            </a>
          </h5>
          <div class="header-search pull-right"></div>
        </div>
      </header>

      <!-- <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li>-->
    </ul>

    <!-- SEARCH FORM -->
    <!-- <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>-->

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->

      <!-- Notifications Dropdown Menu -->

      <li class="nav-item d-none d-sm-inline-block">
        <a @click="logout" style="cursor: pointer; color: red" class="nav-link">Cerrar sesión</a>
      </li>
    </ul>
  </nav>

  <!-- /.navbar -->
</template>

<script>
import ApiService from "../services/api.service";
import { TokenService } from "../services/storage.service";
export default {
  methods: {
    logout() {
      this.$store.commit("setLogin", false);
      TokenService.removeToken();
      TokenService.removeTokenCustom("user");
      TokenService.removeRefreshToken();
      ApiService.unmount401Interceptor();
      this.$router.push("login");
    }
  }
};
</script>

<style>
</style>