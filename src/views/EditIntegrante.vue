<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse"></div>
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
            <div class="navbar-nav">
              <router-link to="/integrantes" class="nav-item nav-link">integrantes</router-link>
            </div>
            <h3 class="text-center">Editar Integrante</h3>
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="documento">Documento</label>
                  <input
                    type="text"
                    pattern="[0-9]+"
                    title=" Solo números. Tamaño máximo: 12"
                    v-model.trim="usuario.documento"
                    id="documento"
                    name="documento"
                    placeholder="Documento"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.documento.$error }"
                  />
                  <div v-if="submitted && $v.usuario.documento.$error" class="invalid-feedback">
                    <span v-if="!$v.usuario.documento.required">El campo nombre es requerido</span>
                    <span
                      v-if="!$v.usuario.documento.maxLength"
                    >El nombre no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="nombre_usuario">Nombre</label>
                  <input
                    type="text"
                    pattern="[A-Za-z ]+"
                    title=" Solo Letras. Tamaño máximo: 50"
                    v-model.trim="usuario.nombre_usuario"
                    id="nombre_usuario"
                    name="nombre_usuario"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.nombre_usuario.$error }"
                  />
                  <div
                    v-if="submitted && $v.usuario.nombre_usuario.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.usuario.nombre_usuario.required">El campo es requerido</span>
                    <span
                      v-if="!$v.usuario.nombre_usuario.maxLength"
                    >El campo no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="apellido_usuario">Apellido</label>
                  <input
                    type="text"
                    pattern="[A-Za-z ]+"
                    title=" Solo Letras. Tamaño máximo: 50"
                    v-model.trim="usuario.apellido_usuario"
                    id="apellido_usuario"
                    name="apellido_usuario"
                    placeholder="Apellido"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.apellido_usuario.$error }"
                  />
                  <div
                    v-if="submitted && $v.usuario.apellido_usuario.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.usuario.apellido_usuario.required">El campo es requerido</span>
                    <span
                      v-if="!$v.usuario.apellido_usuario.maxLength"
                    >El campo no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="correo">correo</label>
                  <input
                    type="text"
                    v-model.trim="usuario.email"
                    id="email"
                    name="email"
                    placeholder="Correo"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.email.$error }"
                  />
                  <div v-if="submitted && $v.usuario.email.$error" class="invalid-feedback">
                    <span v-if="!$v.usuario.email.required">El campo correo es requerido</span>
                    <span v-if="!$v.usuario.email">Email no Valido</span>
                    <span
                      v-if="!$v.usuario.email.maxLength"
                    >El campo no debe superar los 100 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="telefono">Telefono</label>
                  <input
                    type="text"
                    pattern="[0-9]+"
                    title=" Solo Numeros. Tamaño máximo: 10"
                    v-model.trim="usuario.telefono"
                    id="telefono"
                    name="telefono"
                    placeholder="telefono"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.telefono.$error }"
                  />
                  <div v-if="submitted && $v.usuario.telefono.$error" class="invalid-feedback">
                    <span v-if="!$v.usuario.telefono.required">El campo es requerido</span>
                    <span
                      v-if="!$v.usuario.telefono.maxLength"
                    >El campo no debe superar los 10 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Tipo usuario:</label>
                  <select
                    class="form-control"
                    style="width: 100%;"
                    v-model="usuario.id_tipo_usuario"
                  >
                    <option
                      v-for="tipo in tipoUsuarios"
                      :key="tipo.id_tipo_usuario"
                      :value="tipo.id_tipo_usuario"
                    >{{ tipo.tipo_usuario }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Estado:</label>
                  <select
                    class="form-control"
                    style="width: 100%;"
                    v-model="usuario.estado"
                    @change="onChange($event)"
                  >
                    <option
                      v-for="option in options"
                      :key="option.estado"
                      :value="option.value"
                      class="form-control"
                      :class="{ 'is-invalid': submitted && $v.usuario.estado.$error }"
                    >{{ option.text }}</option>
                  </select>
                </div>
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
import { required, email, maxLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      loading: true,
      errored: false,
      usuario: {
        documento: "",
        nombre_usuario: "",
        apellido_usuario: "",
        email: "",
        telefono: "",
        estado: "",
        id_tipo_usuario: "",
        id_rol: ""
      },
      value: "",
      options: [
        { text: "Activo", value: "1" },
        { text: "Inactivo", value: "0" }
      ],
      submitted: false,

      tipoUsuarios: [],
      roles: []
    };
  },
  created() {
    ApiService.get(`/usuario/${this.$route.params.id}/edit`)
      .then(response => {
        if (response.status === 204) {
          alert("No se encontro un integrante  ");
        } else if (response.status === 200) {
          this.usuario = response.data;
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));

    ApiService.get("/tipousuario").then(response => {
      this.tipoUsuarios = response.data;
    });

    /*  ApiService.get("/rol").then(response => {
      this.roles = response.data;
    }); */
  },

  //Reglas de validacion para VueValidate
  validations: {
    usuario: {
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
    back() {
      this.$router.go(-1);
    },
    onChange($event) {
      if (event.target.value == "Activo") {
        this.usuario.estado = 1;
      } else {
        this.usuario.estado = 0;
      }
    },
    handleSubmit(e) {
      this.submitted = true;

      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.updateusuario();
      /* alert(this.objectusuario);
      alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.usuario)); */
    },
    updateusuario(event) {
      ApiService.put(`/usuario/${this.$route.params.id}`, this.usuario).then(
        response => {
          this.back();
        }
      );
    }
  },

  computed: {
    objectusuario() {
      return JSON.parse(`{
          "documento":        "${this.usuario.documento}",
          "nombre_usuario":   "${this.usuario.nombre_usuario}",
          "estado":           ${this.usuario.estado},
          "apellido_usuario": "${this.usuario.apellido_usuario}",
          "telefono":         "${this.usuario.telefono}",
          "email":            "${this.usuario.email}",
          "id_rol":           ${this.usuario.id_rol},
          "id_tipo_usuario":  ${this.usuario.id_tipo_usuario}
        }`);
    }
  }
};
</script>