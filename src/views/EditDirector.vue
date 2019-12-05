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
        Cargando..
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else></div>
      <section class="content">
        <div style="width: 80%; margin: 0 auto;">
          <div class="card card-success">
            <router-link to="/directores" class="nav-item nav-link">Atrás</router-link>
            <br />
            <h3 class="text-center">Editar Director</h3>
            <form @submit.prevent="handleSubmit" role="form">
              <div class="card-body">
                <div class="form-group">
                  <label for="documento">Documento</label>
                  <input
                    type="text"
                    pattern="[0-9]+"
                    title=" Solo números. Tamaño máximo: 12"
                    v-model.trim="director.documento"
                    id="documento"
                    name="documento"
                    placeholder="Documento"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.director.documento.$error }"
                  />
                  <div v-if="submitted && $v.director.documento.$error" class="invalid-feedback">
                    <span v-if="!$v.director.documento.required">El campo es requerido</span>
                    <span
                      v-if="!$v.director.documento.maxLength"
                    >El campo no debe superar los 12 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="nombre_usuario">Nombre</label>
                  <input
                    type="text"
                    pattern="[-a-zA-Z¨áéíóúÁÉÍÓÚ&amp;' ]+"
                    title=" Solo Letras. Tamaño máximo: 50"
                    v-model.trim="director.nombre_usuario"
                    id="nombre_usuario"
                    name="nombre_usuario"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.director.nombre_usuario.$error }"
                  />
                  <div
                    v-if="submitted && $v.director.nombre_usuario.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.director.nombre_usuario.required">El campo es requerido</span>
                    <span
                      v-if="!$v.director.nombre_usuario.maxLength"
                    >El campo no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="apellido_usuario">Apellido</label>
                  <input
                    type="text"
                    pattern="[-a-zA-Z¨áéíóúÁÉÍÓÚ&amp;' ]+"
                    title=" Solo Letras. Tamaño máximo: 50"
                    v-model.trim="director.apellido_usuario"
                    id="apellido_usuario"
                    name="apellido_usuario"
                    placeholder="Apellido"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.director.apellido_usuario.$error }"
                  />
                  <div
                    v-if="submitted && $v.director.apellido_usuario.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.director.apellido_usuario.required">El campo es requerido</span>
                    <span
                      v-if="!$v.director.apellido_usuario.maxLength"
                    >El campo no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="correo">Correo</label>
                  <input
                    type="text"
                    v-model.trim="director.email"
                    id="email"
                    name="email"
                    placeholder="Correo"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.director.email.$error }"
                  />
                  <div v-if="submitted && $v.director.email.$error" class="invalid-feedback">
                    <span v-if="!$v.director.email.required">El campo es requerido</span>
                    <span v-if="!$v.director.email">Email no Valido</span>
                    <span
                      v-if="!$v.director.email.maxLength"
                    >El campo no debe superar los 100 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="telefono">Telefono</label>
                  <input
                    type="text"
                    pattern="[0-9]+"
                    title=" Solo Numeros. Tamaño máximo: 10"
                    v-model.trim="director.telefono"
                    id="telefono"
                    name="telefono"
                    placeholder="telefono"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.director.telefono.$error }"
                  />
                  <div v-if="submitted && $v.director.telefono.$error" class="invalid-feedback">
                    <span v-if="!$v.director.telefono.required">El campo es requerido</span>
                    <span
                      v-if="!$v.director.telefono.maxLength"
                    >El campo no debe superar los 10 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Tipo usuario:</label>
                  <select
                    class="form-control"
                    style="width: 100%;"
                    v-model="director.id_tipo_usuario"
                  >
                    <option
                      v-for="tipo in tipoUsuarios"
                      :key="tipo.id_tipo_usuario"
                      :value="tipo.id_tipo_usuario"
                    >{{ tipo.tipo_usuario }}</option>
                  </select>
                </div>
                <h6>
                  Grupo:
                  <span class="badge badge-light">{{director.grupo}}</span>
                </h6>

                <template v-if="!this.grupos==''">
                  <div class="form-group">
                    <label for="grupo">Grupo</label>
                    <br />
                    <select class="custom-select browser-default" @change=" selectChangeGrupo">
                      <option value>Por favor seleccione un Elemento</option>
                      <option
                        v-for="grupo in grupos"
                        v-bind:key="grupo.id_grupo"
                        id="id_grupo"
                        name="id_grupo"
                        class="form-control"
                      >{{ grupo.grupo }}</option>
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
      grupoSeleccionado: {
        id_grupo: ""
      },
      director: {
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
      grupos: [],
      tipoUsuarios: [],
      roles: []
    };
  },
  created() {
    ApiService.get("/usuario/director")
      .then(response => {
        if (response.status === 204) {
          this.$swal({
            type: "warning",
            text: "no se encontro datos del usuario director",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
        } else if (response.status === 200) {
          this.director = response.data.filter(
            res => res.id_usuario == this.$route.params.id
          )[0];
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));

    ApiService.get("/grupo/disponible")
      .then(response => {
        this.grupos = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });

    ApiService.get("/tipousuario")
      .then(response => {
        this.tipoUsuarios = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  },
  //Reglas de validacion para VueValidate
  validations: {
    director: {
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
    selectChangeGrupo(event) {
      var i;
      this.grupos.forEach(function(element) {
        if (element.grupo == event.target.value) {
          i = element.id_grupo;
        }
      });
      this.grupoSeleccionado.id_grupo = i;
      this.director.id_grupo = i;
    },
    handleSubmit(e) {
      this.submitted = true;
      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.updateDirector();
    },
    /* Despliega mensaje de exito al guardar un registro */
    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro Actualizado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    updateDirector() {
      ApiService.put(
        `usuario/${this.$route.params.id}`,
        this.objectDirector
      ).catch(function(response) {
        this.$swal({
          type: "warning",
          text: "No se pudo actualizar el usuario",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false
        });
      });

      if (this.director.grupo == null) {
        ApiService.post("/director", {
          //si es nulo lo crea como director
          id_usuario: this.$route.params.id,
          id_grupo: this.grupoSeleccionado.id_grupo
        })
          .then(response => {
            this.showAlert();
            this.$router.push({ name: "directores" });
          })
          .catch(function(response) {
            this.$swal({
              type: "warning",
              text: "No se pudo actualizar el director",
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false
            });
          });
      } else if (this.director.grupo != null) {
        //si  existe en la tabla directores lo actualizo
        ApiService.put(`director/${this.$route.params.id}`, {
          id_grupo: this.director.id_grupo
        })
          .then(response => {
            this.showAlert();
            this.$router.push({ name: "directores" });
          })
          .catch(function(response) {
            this.$swal({
              type: "warning",
              text: "no fue posible actualizar el registro",
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false
            });
          });
      }
    }
  },

  computed: {
    objectDirector() {
      return JSON.parse(`{
          "documento":        "${this.director.documento}",
          "nombre_usuario":   "${this.director.nombre_usuario}",
          "estado":           ${this.director.estado},
          "apellido_usuario": "${this.director.apellido_usuario}",
          "telefono":         "${this.director.telefono}",
          "email":            "${this.director.email}",
          "id_rol":           ${this.director.id_rol},
          "id_tipo_usuario":  ${this.director.id_tipo_usuario}
        }`);
    }
  }
};
</script>