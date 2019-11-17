<template>
  <div>
    <h3 class="text-center">Editar Integrante</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/integrantes" class="nav-item nav-link">usuarios</router-link>
        </div>
      </div>
    </nav>
    <section class="content">
      <div style="width: 50%; margin: 0 auto;">
        <div class="card card-success">
          <form @submit.prevent="handleSubmit">
            <div class="card-body">
              <div class="form-group">
                <label>Documento</label>
                <input type="text" class="form-control" v-model="usuario.documento" />
              </div>
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control" v-model="usuario.nombre_usuario" />
              </div>
              <div class="form-group">
                <label>Apellidos</label>
                <input type="text" class="form-control" v-model="usuario.apellido_usuario" />
              </div>
              <div class="form-group">
                <label>Correo</label>
                <input type="text" class="form-control" v-model="usuario.email" />
              </div>
              <div class="form-group">
                <label>Telefono</label>
                <input type="text" class="form-control" v-model="usuario.telefono" />
              </div>
              <div class="form-group">
                <label>Tipo usuario:</label>
                <select class="form-control" style="width: 100%;" v-model="usuario.id_tipo_usuario">
                  <option
                    v-for="tipo in tipoUsuarios"
                    :key="tipo.id_tipo_usuario"
                    :value="tipo.id_tipo_usuario"
                  >{{ tipo.tipo_usuario }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="estado">Estado</label>
                <br />
                <select class="form-control" style="width: 100%;" @change="onChange($event)">
                  >
                  <option
                    v-for="option in options"
                    v-bind:key="option.value"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.estado.$error }"
                  >{{ option.text }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Rol:</label>
                <select class="form-control" style="width: 100%;" v-model="usuario.id_rol">
                  <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">{{ rol.rol }}</option>
                </select>
              </div>

              <div class="card-footer">
                <button type="submit" class="btn btn-primary">Actualizar</button>
              </div>
            </div>
          </form>
        </div>
        <pre>{{$data}}</pre>
      </div>
    </section>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
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
    ApiService.get(`/usuario/${this.$route.params.id}/edit`).then(response => {
      this.usuario = response.data;
    });

    ApiService.get("/tipousuario").then(response => {
      this.tipoUsuarios = response.data;
    });

    ApiService.get("/rol").then(response => {
      this.roles = response.data;
    });
  },

  //Reglas de validacion para VueValidate
  validations: {
    usuario: {
      documento: { required },
      nombre_usuario: { required },
      apellido_usuario: { required },
      email: { required, email },
      telefono: { required },
      estado: { required },
      id_tipo_usuario: { required }
    }
  },
  methods: {
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
      console.log(this.$route.params.id);
      ApiService.put(`/usuario/${this.$route.params.id}`, this.usuario).then(
        response => {
          this.$router.push({ name: "grupos" });
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