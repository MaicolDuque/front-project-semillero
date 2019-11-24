<template>
  <div style="padding:25px">
    <!-- <h3 class="text-center">INICIO</h3> -->
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <!-- /.card-header -->
            <div class="card-body">

              <div style="text-align: center; font-size: 3em">
                {{mensaje}}
              </div>

            </div>
            
            <!-- <!-- /.card-body -->
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
    },
    mensaje(){
      if(this.$store.state.user != undefined){
        let rol = this.$store.state.user.id_rol
        if(rol == 1){
          return "Bienvenido Administrador"
        }
        if(rol == 2){
          return "Bienvenido Director"
        }
        if(rol == 1){
          return "Bienvenido Coordinador"
        }
      }else{
        return "BIENVENIDO!"
      }
    }
  }
};
</script>