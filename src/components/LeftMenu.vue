<template>
  <div>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="/home" class="brand-link">
        <span class="brand-text font-weight-light">SIPS</span>
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
            <a href="/home" id="nameUser" class="d-block"></a>
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
              <router-link to="/home" class="nav-link">
                <i class="nav-icon fa fa-fw fa-home"></i>
                Home
              </router-link>
            </li>
            <li class="nav-item" v-if="idRol == 1">
              <router-link to="/grupos" class="nav-link">
                <i class="nav-icon fas fa-users"></i>
                Grupos de investigación
              </router-link>
            </li>

            <li class="nav-item" v-if="idRol == 1">
              <router-link to="/directores" class="nav-link">
                <i class="nav-icon fas fa-user-tie"></i>
                Directores
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/semilleros" class="nav-link">
                <i class="nav-icon fas fa-layer-group"></i>
                Semilleros
              </router-link>
            </li>
            <li class="nav-item" v-if="idRol == 2 || idRol == 1">
              <router-link to="/coordinadores" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                Coordinadores
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                to="#basicExampleModal"
                data-toggle="modal"
                data-target="#basicExampleModal"
              >
                <i class="fa fa-fw fa-envelope"></i>
                Acerca de
              </router-link>
            </li>

            <li class="nav-item">
              <a class="nav-link" :href=" url + '/exportar/manual/'">
                <i class="fa fa-download"></i>
                 Manual
              </a>
            </li>
            <!--  <li class="nav-item">
              <router-link
              
                class="nav-link"
                data-toggle="modal"
                data-target="#basicExampleModal"
                
              >Acerca de</router-link>
            </li>-->
            <!--  -->
            <!-- <li class="nav-item has-treeview">
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
            </li>-->
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
    <div>
      <div
        class="modal fade"
        id="basicExampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Sistema de Información Politécnico de Semilleros</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                <strong>Realizado por:</strong>
                <br />José alejandro Cortés Taborda
                <br />Brayan Legarda villegas
                <strong>
                  <br />Asesor:
                </strong>
                Jorge Eliecer Giraldo
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: process.env.VUE_APP_URL_API
    };
  },
  mounted: () => {
    if (localStorage.user) {
      var bytes = CryptoJS.AES.decrypt(localStorage.user, "Key");
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      let user = JSON.parse(originalText);
      $("#nameUser").text(user.nombre_usuario);
      $("#imageUser").attr("src", user.imagen);
    }
  },
  computed: {
    idRol() {
      if (localStorage.user) {
        var bytes = CryptoJS.AES.decrypt(localStorage.user, "Key");
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        let user = JSON.parse(originalText);
        /* console.log("Rioll", this.$store.state.user.id_rol); */
        return user.id_rol;
      }
      return 1;
    }
  }
};
</script>