<template>
  <div>
    <div class="container">
      <h3 class="text-center">Agregar Usuario Director</h3>
      <nav class="nav grey lighten-4 py-4">
        <router-link to="/directores" class="nav-item nav-link">Directores</router-link>
      </nav>
      <section class="content">
        <div style="width: 50%; margin: 0 auto;">
          <div class="card card-success">
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="documento">Documento</label>
                  <input
                    type="text"
                    v-model="usuario.documento"
                    id="documento"
                    name="documento"
                    placeholder="Documento"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.documento.$error }"
                  />
                  <div
                    v-if="submitted && !$v.usuario.documento.required"
                    class="invalid-feedback"
                  >El campo Documento es requerido</div>
                </div>
                <div class="form-group">
                  <label for="nombre_usuario">Nombre</label>
                  <input
                    type="text"
                    v-model="usuario.nombre_usuario"
                    id="nombre_usuario"
                    name="nombre_usuario"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.nombre_usuario.$error }"
                  />
                  <div
                    v-if="submitted && !$v.usuario.nombre_usuario.required"
                    class="invalid-feedback"
                  >El campo Nombre es requerido</div>
                </div>
                <div class="form-group">
                  <label for="apellido_usuario">Apellido</label>
                  <input
                    type="text"
                    v-model="usuario.apellido_usuario"
                    id="apellido_usuario"
                    name="apellido_usuario"
                    placeholder="Apellido"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.apellido_usuario.$error }"
                  />
                  <div
                    v-if="submitted && !$v.usuario.apellido_usuario.required"
                    class="invalid-feedback"
                  >El campo apellido es requerido</div>
                </div>
                <div class="form-group">
                  <label for="correo">correo</label>
                  <input
                    type="text"
                    v-model="usuario.email"
                    id="email"
                    name="email"
                    placeholder="Correo"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.email.$error }"
                  />
                  <div
                    v-if="submitted && !$v.usuario.email.required"
                    class="invalid-feedback"
                  >El campo correo es requerido</div>
                </div>
                <div class="form-group">
                  <label for="telefono">Telefono</label>
                  <input
                    type="text"
                    v-model="usuario.telefono"
                    id="telefono"
                    name="telefono"
                    placeholder="telefono"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.usuario.telefono.$error }"
                  />
                  <div
                    v-if="submitted && !$v.usuario.telefono.required"
                    class="invalid-feedback"
                  >El campo telefono es requerido</div>
                </div>
                <div class="form-group">
                  <label for="estado">Estado</label>
                  <br />
                  <select class="custom-select browser-default" @change="onChange($event)" required>
                    <option value>Por favor seleccione un Elemento</option>
                    <option
                      v-for="option in options"
                      v-bind:key="option.value"
                      class="form-control"
                      :class="{ 'is-invalid': submitted && $v.usuario.estado.$error }"
                    >{{ option.text }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="tipo">Tipo</label>
                  <br />
                  <select
                    class="custom-select browser-default"
                    @change="selectChangeTipoUsuario"
                    required
                  >
                    <option value>Por favor seleccione un Elemento</option>
                    <option
                      v-for="item in Tipos_Usuarios"
                      v-bind:key="item.value"
                      id="id_tipo_usuario"
                      name="id_tipo_usuario"
                      class="form-control"
                      :class="{ 'is-invalid': submitted && $v.usuario.id_tipo_usuario.$error }"
                    >{{ item.tipo_usuario }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Grupo</label>
                  <select class="form-control" style="width: 100%;" v-model="usuario.id_grupo">
                    <option
                      v-for="grupo in grupos"
                      v-bind:key="grupo.id_grupo"
                      :value="grupo.id_grupo"
                    >{{ grupo.grupo }}</option>
                  </select>
                </div>
                <!-- <div class="form-group">
              <label for="facultad">Rol</label>
              <br />
              <select class="custom-select browser-default" @change="selectChangeFacultad" required>
                <option value>Por favor seleccione un Elemento</option>
                <option
                  v-for="item in facultades"
                  v-bind:key="item.value"
                  id="id_rol"
                  name="id_rol"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.grupo.id_facultad.$error }"
                >{{ item.facultad }}</option>
              </select>
                </div>-->
                <br />
                <div class="form-group">
                  <button class="btn btn-primary">Guardar</button>
                </div>
              </div>
            </form>
          </div>
          <pre>{{$data}}</pre>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";

export default {
  data() {
    return {
      direct: {
        id_usuario: "",
        id_grupo: ""
      },
      director: {},
      grupos: [],
      value: "",
      options: [
        { text: "Activo", value: "1" },
        { text: "Inactivo", value: "0" }
      ],
      Tipos_Usuarios: {},

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
      submitted: false
    };
  },
  created() {
    ApiService.get("/grupo/disponible").then(response => {
      this.grupos = response.data;
      this.grupos.push({
        grupo: this.usuario.grupo,
        id_grupo: this.usuario.id_grupo
      });
    });
  },
  //Obtiene las tipos de usuarios una vez se llama al componente
  mounted() {
    this.getTipos_Usuarios();
  },
  //comvierte el objeto->en un arreglo
  computed: {
    formatearTipos_Usuarios() {
      return Object.values(this.Tipos_Usuarios);
    }
  },
  computed: {
    objectUsuario() {
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
  },

  //Reglas de validacion para VueValidate
  validations: {
    usuario: {
      documento: { required },
      nombre_usuario: { required },
      apellido_usuario: { required },
      email: { required },
      telefono: { required },
      estado: { required },
      id_tipo_usuario: { required }
    }
  },
  methods: {
    addUsuario() {
      ApiService.post("/usuario", this.objectUsuario).catch(function(response) {
        alert("No se pudo crear el Usuario");
      });
    },
    getTipos_Usuarios() {
      ApiService.get("/tipousuario").then(response => {
        this.Tipos_Usuarios = response.data;
      });
    },
    onChange($event) {
      if (event.target.value == "Activo") {
        this.usuario.estado = 1;
      } else {
        this.usuario.estado = 0;
      }
    },
    /*
    Cuendo se seleciona una opción del elemento <select></select>
    recore el arreglo tipo_usuarios para obtener el id de cada uno
    */
    selectChangeTipoUsuario(event) {
      var i;
      this.Tipos_Usuarios.forEach(function(element) {
        if (element.tipo_usuario == event.target.value) {
          i = element.id_tipo_usuario;
        }
      });
      this.usuario.id_tipo_usuario = i;
    },
    //Valida el formulario
    handleSubmit(e) {
      this.submitted = true;
      var retornado = "";
      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      //asigna como usuario un Director
      this.usuario.id_rol = 2;
      /* Almacenar el usuario */
      var id_gr = this.usuario.id_grupo;
      ApiService.post("/usuario", this.usuario).then(function(value) {
        /*  console.log(value); */
        retornado = value.data;
        console.log(retornado);

        console.log(id_gr);
        ApiService.post("/director", {
          id_usuario: value.data,
          id_grupo: id_gr
        }).then(function(value) {
          console.log(value);
        });
      });

      /* logica de enviar api de creacion de usuario y asignacion de grupo */

      //this.addUsuario();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.usuario)); */
    }
  }
};
</script>