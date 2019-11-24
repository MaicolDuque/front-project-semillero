<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <h5 align="center">
            <center>
              <img
                src="https://pbs.twimg.com/profile_images/1128335908913258496/hHZklt21_400x400.png"
              />
            </center>
          </h5>
          <div class="card-body">
            <h5 class="text-center">Ingresa con email del poli:</h5>
            <hr class="my-4" />
            <button
              style="background-color: #196844"
              class="btn btn-lg btn-google btn-block text-uppercase"
              @click="AuthProvider('google')"
            >
              <i class="fab fa-google mr-2"></i> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      type="button"
      style="display:none"
      class="btn btn-danger toastrDefaultError"
      ref="modalDanger"
    >Launch Error Toast</button>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
import { TokenService } from "../services/storage.service";
export default {
  mounted: () => {
    $(".toastrDefaultError").click(function() {
      toastr.error("Email no se encuentra registrado!");
    });
  },
  methods: {
    login() {},

    AuthProvider(provider) {
      // console.log(provider)
      var self = this;

      this.$auth
        .authenticate(provider)
        .then(response => {
          self.SocialLogin(provider, response);
        })
        .catch(err => {
          console.log({ err: err });
        });
    },

    SocialLogin(provider, response) {
      ApiService.post("/sociallogin/" + provider, response)
        .then(response => {
          const infoUser = response.data.user;
          if (infoUser.infoToken) {
            return this.loginSuccessful(response.data.user);
          }
          this.loginFailed();
        })
        .catch(err => {
          console.log({ err: err });
        });
    },

    loginFailed() {
      this.$refs.modalDanger.click();
    },

    loginSuccessful(data) {
      TokenService.saveToken(data.infoToken.token);
      TokenService.saveRefreshToken(data.infoToken.token);
      ApiService.setHeader();

      ApiService.mount401Interceptor();
      localStorage.user = JSON.stringify(data.infoToken.user);
      
      let user =   JSON.parse(localStorage.user)     
      let rol  = user.id_rol
      console.log("Mi rol,",rol)
      if(rol == 2){
        this.$store.dispatch('infoUserDirector',user.id_usuario)
      }else if(rol == 3){
        this.$store.dispatch('infoUserCoordinador',user.id_usuario)
      }else{
        this.$store.dispatch('infoUser',user.id_usuario)
      }


      this.$store.commit("setLogin", true);
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

body {
  background: #007bff;
  background: linear-gradient(to right, #0062e6, #33aeff);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>