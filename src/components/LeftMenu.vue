<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img
        src="/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: .8"
      />
      <span class="brand-text font-weight-light">Semilleros POLI</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            id="imageUser"
            src="img/user2-160x160.jpg"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          <a href="#" id="nameUser" class="d-block">Alexander Pierce</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/grupos" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              Grupos de investigación
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/directores" class="nav-link">
              <i class="nav-icon fas fa-user-tie"></i>
              Directores
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/coordinadores" class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              Coordinadores
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/semilleros" class="nav-link">
              <i class="nav-icon fas fa-layer-group"></i>
              Semilleros
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/grupos_visitante" class="nav-link">
              <i class="nav-icon far fa-image"></i>
              Visitante
            </router-link>
          </li>

          <!--  -->
          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-chart-pie"></i>
              <p>
                Semilleros
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link to="/semilleros" class="nav-link">
                  <i class="nav-icon fas fa-th"></i>
                  Semilleros investigación
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/coordinadores" class="nav-link">
                  <i class="nav-icon fas fa-th"></i>
                  Coordinadores
                </router-link>
              </li>
              <li class="nav-item">
                <a href="pages/charts/inline.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Inline</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
export default {
  mounted: () => {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      $("#nameUser").text(user.nombre_usuario);
      $("#imageUser").attr("src", user.imagen);
    }
  }
};
</script>