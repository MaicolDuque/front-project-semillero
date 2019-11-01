<template>
  <div class="container">
    <h3 class="text-center">Agregar Usuario</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/directores" class="nav-item nav-link">Grupos</router-link>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div>
          <!-- <h2>Nuevo Grupo de Investigación</h2> -->
          <form @submit.prevent="handleSubmit">
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
          </form>
          <pre>{{$data}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";

export default {
  data() {
    return {
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
      ApiService.post("/usuario", this.usuario)
        .then(
          response => this.$router.push({ name: "directores" })
          // console.log(response.data)
        )
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
      this.appear();
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

      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      //asigna como usuario un Director
      this.usuario.id_rol = 2;
      this.addUsuario();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.usuario)); */
    },
    appear() {
      this.$toasted.show("Agregado correctamente", {
        //theme of the toast you prefer
        theme: "bubble",
        //position of the toast container
        position: "top-right",
        //display time of the toast
        duration: 2000
      });
    }
  }
};
</script>