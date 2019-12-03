<template>
  <div style="padding:25px">
    <!-- <h3 class="text-center">INICIO</h3> -->
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <!-- /.card-header -->
            <div class="card-body">
              <div style="text-align: center; font-size: 3em">Bienvenido</div>
              <br />

              <div>
                <p style="text-align: center">
                  Aquí puedes encontrar información sobre cada uno de los semilleros de investigación
                  <br />
                </p>

                <p></p>
              </div>
            </div>
            <br />

            <!-- /.card-body -->
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div class="box">
              <router-link
                to="/visitante/semilleros"
                class="btn btn-white btn-animation-1 btn-lg"
              >Ver semilleros</router-link>
            </div>
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
    var bytes = CryptoJS.AES.decrypt(this.$store.state.prueba, "Key");
    var originalText = bytes.toString(CryptoJS.enc.Utf8);  
    bytes = CryptoJS.AES.decrypt(localStorage.user, "Key");
    originalText = bytes.toString(CryptoJS.enc.Utf8);
    let user = JSON.parse(originalText);
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
      return this.$store.state.user.id_rol;
    }

    /*  mensaje(){
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
    } */
  }
};
</script>


<style>
.box {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn:visited {
  text-decoration: none;
  text-transform: uppercase;
  position: relative;
  top: 0;
  left: 0;
  padding: 20px 40px;
  border-radius: 100px;
  display: inline-block;
  transition: all 0.5s;
}

.btn-white {
  background: rgb(25, 104, 68);
  color: #fff;
}

.btn:hover {
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

.btn:active {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.btn-bottom-animation-1 {
  animation: comeFromBottom 1s ease-out 0.8s;
}

.btn::after {
  content: "";
  text-decoration: none;
  text-transform: uppercase;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 100px;
  display: inline-block;
  z-index: -1;
  transition: all 0.5s;
}

.btn-white::after {
  background: rgb(25, 104, 68);
}

.btn-animation-1:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}
@keyframes comeFromBottom {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>