<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav"></div>
      </div>
    </nav>
    <section v-if="errored">
      <p>Lo sentimos, no es posible Actualizar el registro en este momento</p>
    </section>
    <section v-else>
      <div v-if="loading">
        cargando..
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else></div>
      <section class="content">
        <div style="width: 50%; margin: 0 auto;">
          <div class="card card-success">
            <router-link to="/coordinadores" class="nav-item nav-link">Coordinadores</router-link>
            <br />
            <h3 class="text-center">Editar coordinador</h3>
            <form @submit.prevent="handleSubmit" role="form">
              <div class="card-body">
                <div class="form-group">
                  <label for="documento">Documento</label>
                  <input
                    type="text"
                    pattern="[0-9]+"
                    title=" Solo números. Tamaño máximo: 12"
                    v-model.trim="coordinador.documento"
                    id="documento"
                    name="documento"
                    placeholder="Documento"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.coordinador.documento.$error }"
                  />
                  <div v-if="submitted && $v.coordinador.documento.$error" class="invalid-feedback">
                    <span v-if="!$v.coordinador.documento.required">El campo es requerido</span>
                    <span
                      v-if="!$v.coordinador.documento.maxLength"
                    >El nombre no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="nombre_usuario">Nombre</label>
                  <input
                    type="text"
                    pattern="[A-Za-z ]+"
                    title=" Solo Letras. Tamaño máximo: 50"
                    v-model.trim="coordinador.nombre_usuario"
                    id="nombre_usuario"
                    name="nombre_usuario"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.coordinador.nombre_usuario.$error }"
                  />
                  <div
                    v-if="submitted && $v.coordinador.nombre_usuario.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.coordinador.nombre_usuario.required">El campo es requerido</span>
                    <span
                      v-if="!$v.coordinador.nombre_usuario.maxLength"
                    >El campo no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="apellido_usuario">Apellido</label>
                  <input
                    type="text"
                    pattern="[A-Za-z ]+"
                    title=" Solo Letras. Tamaño máximo: 50"
                    v-model.trim="coordinador.apellido_usuario"
                    id="apellido_usuario"
                    name="apellido_usuario"
                    placeholder="Apellido"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.coordinador.apellido_usuario.$error }"
                  />
                  <div
                    v-if="submitted && $v.coordinador.apellido_usuario.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.coordinador.apellido_usuario.required">El campo es requerido</span>
                    <span
                      v-if="!$v.coordinador.apellido_usuario.maxLength"
                    >El campo no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="correo">correo</label>
                  <input
                    type="text"
                    v-model.trim="coordinador.email"
                    id="email"
                    name="email"
                    placeholder="Correo"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.coordinador.email.$error }"
                  />
                  <div v-if="submitted && $v.coordinador.email.$error" class="invalid-feedback">
                    <span v-if="!$v.coordinador.email.required">El campo correo es requerido</span>
                    <span v-if="!$v.coordinador.email">Email no Valido</span>
                    <span
                      v-if="!$v.coordinador.email.maxLength"
                    >El campo no debe superar los 100 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="telefono">Telefono</label>
                  <input
                    type="text"
                    pattern="[0-9]+"
                    title=" Solo Numeros. Tamaño máximo: 10"
                    v-model.trim="coordinador.telefono"
                    id="telefono"
                    name="telefono"
                    placeholder="telefono"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.coordinador.telefono.$error }"
                  />
                  <div v-if="submitted && $v.coordinador.telefono.$error" class="invalid-feedback">
                    <span v-if="!$v.coordinador.telefono.required">El campo es requerido</span>
                    <span
                      v-if="!$v.coordinador.telefono.maxLength"
                    >El campo no debe superar los 10 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Tipo usuario:</label>
                  <select
                    class="form-control"
                    style="width: 100%;"
                    v-model="coordinador.id_tipo_usuario"
                  >
                    <option
                      v-for="tipo in tipoUsuarios"
                      :key="tipo.id_tipo_usuario"
                      :value="tipo.id_tipo_usuario"
                    >{{ tipo.tipo_usuario }}</option>
                  </select>
                </div>
                <h6>
                  semillero:
                  <span class="badge badge-light">{{coordinador.semillero}}</span>
                </h6>
                <template v-if="!this.semilleros ==''">
                  <div class="form-group">
                    <label for="grupo">Semillero</label>
                    <br />
                    <select
                      class="custom-select browser-default"
                      @change=" selectChangeSemillero"
                      required
                    >
                      <option value>Por favor seleccione un Elemento</option>
                      <option
                        v-for="semillero in showSemilleros"
                        v-bind:key="semillero.id_semillero"
                        id="id_semillero"
                        name="id_semillero"
                        class="form-control"
                      >{{ semillero.semillero }}</option>
                    </select>
                  </div>
                </template>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Actualizar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loading: true,
      errored: false,
      semilleroSeleccionado: {
        id_semillero: ""
      },
      coordinador: {
        documento: "",
        nombre_usuario: "",
        apellido_usuario: "",
        email: "",
        telefono: "",
        estado: "",
        id_tipo_usuario: "",
        id_rol: ""
      },
      submitted: false,

      semilleros: [],
      tipoUsuarios: [],
      roles: []
    };
  },
  created() {
    ApiService.get(`/usuario/coordinador/${this.$route.params.id}/edit`)
      .then(response => {
        if (response.status === 204) {
          alert("No se encontro un grupo  ");
        } else if (response.status === 200) {
          this.coordinador = response.data.filter(
            res => res.id_usuario == this.$route.params.id
          )[0];
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));

    ApiService.get("/semillero/disponible").then(response => {
      this.semilleros = response.data;
      /*  this.semilleros.push({
        semillero: this.coordinador.semillero,
        id_semillero: this.coordinador.id_semillero
      }); */
    });

    ApiService.get("/tipousuario").then(response => {
      this.tipoUsuarios = response.data;
    });

    /* ApiService.get("/rol").then(response => {
      this.roles = response.data;
    }); */
  },
  //Reglas de validacion para VueValidate
  validations: {
    coordinador: {
      documento: { required, maxLength: maxLength(12) },
      nombre_usuario: { required, maxLength: maxLength(50) },
      apellido_usuario: { required, maxLength: maxLength(50) },
      email: { required, email, maxLength: maxLength(100) },
      telefono: { required, maxLength: maxLength(10) },
      estado: { required },
      id_tipo_usuario: { required }
    }
  },
  methods: {
    selectChangeSemillero(event) {
      var i;
      this.semilleros.forEach(function(element) {
        if (element.semillero == event.target.value) {
          i = element.id_semillero;
        }
      });

      this.semilleroSeleccionado.id_semillero = i;
      this.coordinador.id_semillero = i;
      alert(this.semilleroSeleccionado.id_grupo);
    },
    handleSubmit(e) {
      this.submitted = true;

      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.updateCoordinador();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.grupo)); */
    },
    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro Actualizado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    updateCoordinador() {
      //event.preventDefault();
      console.log(this.coordinador);
      ApiService.put(
        `usuario/${this.$route.params.id}`,
        this.objectcoordinador
      ).catch(function(response) {
        alert("No se pudo actualizar el usuario");
      });
      /* console.log(this.$route.params.id);
      console.log("id grupo" + this.grupoSeleccionado.id_grupo); */
      if (this.coordinador.semillero == null) {
        ApiService.post("/coordinador", {
          //si es nulo lo crea como coordinador
          id_usuario: this.$route.params.id,
          id_semillero: this.semilleroSeleccionado.id_semillero
        })
          .then(response => {
            this.showAlert();
            this.$router.push({ name: "coordinadores" });
          })
          .catch(function(response) {
            alert("No se pudo actualizar el coordinador que no tenia grupo");
          });
      } else if (this.coordinador.semillero != null) {
        //si  existe en la tabla directores lo actualizo
        console.log(this.$route.params.id);
        console.log(this.semilleroSeleccionado.id_semillero);
        ApiService.put(`coordinador/${this.$route.params.id}`, {
          id_semillero: this.coordinador.id_semillero
        })
          .then(response => {
            this.showAlert();
            this.$router.push({ name: "coordinadores" });
          })
          .catch(function(response) {
            alert(
              "No se pudo actualizar el coordinador que ya tenia semillero"
            );
          });
      }

      /* ApiService.put(`director/${this.$route.params.id}`, {
        id_grupo: this.grupoSeleccionado.id_grupo
      })
        .then(response => {
          this.showAlert();
          this.$router.push({ name: "directores" });
        })
        .catch(function(response) {
          alert("No se pudo actualizar el director");
        }); */
      /*  //event.preventDefault();
      console.log(this.coordinador);
      ApiService.put(
        `usuario/${this.$route.params.id}`,
        this.objectcoordinador
      ).catch(function(response) {
        alert("No se pudo crear el semillero");
      });
      console.log(this.$route.params.id);
      ApiService.put(`coordinador/${this.$route.params.id}`, {
        id_semillero: this.coordinador.id_semillero
      }).then(response => {
        this.$router.push({ name: "coordinadores" });
      }); */
    }
  },

  computed: {
    objectcoordinador() {
      return JSON.parse(`{
          "documento":        "${this.coordinador.documento}",
          "nombre_usuario":   "${this.coordinador.nombre_usuario}",
          "estado":           ${this.coordinador.estado},
          "apellido_usuario": "${this.coordinador.apellido_usuario}",
          "telefono":         "${this.coordinador.telefono}",
          "email":            "${this.coordinador.email}",
          "id_rol":           ${this.coordinador.id_rol},
          "id_tipo_usuario":  ${this.coordinador.id_tipo_usuario}
        }`);
    },

    showSemilleros() {
      let rol = this.$store.state.user.id_rol;
      let semillero = this.$store.state.user.id_semillero;
      if (rol > 1) {
        return this.semilleros.filter(semi => semi.id_semillero == semillero);
      }
      return this.semilleros;
    }
  }
};
</script>