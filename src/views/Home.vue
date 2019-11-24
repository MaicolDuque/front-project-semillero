<template>
  <div style="padding:25px">
    <h3 class="text-center">Grupos de investigación</h3>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <!-- /.card-header -->
            <div class="card-body"></div>
            <div class="container" v-if="this.$store.state.user.id_rol ==1">Bienvenido Administrador</div>
            <div v-if="this.$store.state.user.id_rol ==2">Bienvenido Director</div>
            <div v-if="this.$store.state.user.id_rol ==3">Bienvenido Coordinador</div>
            <!-- /.card-body -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usuario: {
        idRol: ""
      }
    };
  },
  mounted: () => {
    if (localStorage.user) {
      let user = JSON.parse(localStorage.user);
      $("#nameUser").text(user.nombre_usuario);

      $("#imageUser").attr("src", user.imagen);
    }
  },
  computed: {
    idRol() {
      return this.$store.state.user.id_rol;
    }
  }
};
</script>