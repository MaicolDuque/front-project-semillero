<template>
  <div style="padding:25px">
    <!-- <h3 class="text-center">INICIO</h3> -->
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <!-- /.card-header -->
            <div class="card-body">
              <div style="text-align: center; font-size: 3em">{{mensaje}}</div>
            </div>

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

  created() {

  },
  mounted: () => {
    if (localStorage.user) {
      var bytes = CryptoJS.AES.decrypt(localStorage.user, "Key");
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      /* console.log(originalText + "text"); */
      let user = JSON.parse(originalText);
      /*  let user = JSON.parse(localStorage.user); */
      $("#nameUser").text(user.nombre_usuario);

      $("#imageUser").attr("src", user.imagen);
    }
  },
  computed: {
    idRol() {
      return this.$store.state.user.id_rol;
    },
    mensaje() {
      var bytes = CryptoJS.AES.decrypt(localStorage.user, "Key");
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      let user = JSON.parse(originalText);
      if (user.id_rol != undefined) {
        /* let rol = this.$store.state.user.id_rol; */
        if (user.id_rol == 1) {
          return "Bienvenido Administrador";
        }
        if (user.id_rol == 2) {
          return "Bienvenido Director";
        }
        if (user.id_rol == 3) {
          return "Bienvenido Coordinador";
        }
      } else {
        return "BIENVENIDO!";
      }
    }
  }
};
</script>