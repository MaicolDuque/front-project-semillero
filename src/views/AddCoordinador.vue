<template>
  <div>
    <div class="container">
      <nav class="nav grey lighten-4 py-4">
        
      </nav>
      <section v-if="errored">
        <p>Lo sentimos, no es posible Guardar el registro en este momento</p>
      </section>
      <section class="content">
        <div style="width: 50%; margin: 0 auto;">
          <div class="card card-success">
            <router-link to="/coordinadores" class="nav-item nav-link">Coordinadores</router-link>
            <br />
            <h3 class="text-center">Agregar coordinador</h3>
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
                    pattern="[A-Za-z á é í ó ú ]+"
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
                    pattern="[A-Za-z á é í ó ú ]+"
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
                  <label for="Email">Email</label>
                  <input
                    type="text"
                    v-model.trim="usuario.email"
                    id="Email"
                    name="Email"
                    placeholder="Email"
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
                  <label for="grupo">Semillero</label>
                  <br />
                  <select
                    class="custom-select browser-default"
                    @change=" selectChangeSemillero"
                    required
                  >
                    <option value>Por favor seleccione un Elemento</option>
                    <option
                      v-for="semillero in semilleros"
                      v-bind:key="semillero.id_semillero"
                      id="id_semillero"
                      name="id_semillero"
                      class="form-control"
                    >{{ semillero.semillero }}</option>
                  </select>
                </div>
                <!-- <div class="form-group">
                  <label>Grupo</label>
                  <select class="form-control" style="width: 100%;" v-model="usuario.id_grupo">
                    <option value>Por favor seleccione un Elemento</option>
                    <option
                      v-for="grupo in grupos"
                      v-bind:key="grupo.id_grupo"
                      :value="grupo.id_grupo"
                    >{{ grupo.grupo }}</option>
                  </select>
                </div>-->
                <br />
                <div class="form-group">
                  <button class="btn btn-primary">Guardar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { required, maxLength, email } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

export default {
  data() {
    return {
      errored: false,
      semilleros: [],
      options: [
        { text: "Activo", value: "1" },
        { text: "Inactivo", value: "0" }
      ],
      semilleroSeleccionado: {
        id_semillero: ""
      },
      Tipos_Usuarios: {},
      usuario: {
        documento: "",
        nombre_usuario: "",
        apellido_usuario: "",
        email: "",
        telefono: "",
        estado: 1,
        id_tipo_usuario: "",
        id_rol: ""
      },
      submitted: false
    };
  },
  created() {
    ApiService.get("/semillero/disponible").then(response => {
      this.semilleros = response.data;
      /*  this.semilleros.push({
        semillero: this.usuario.semillero,
        id_semillero: this.usuario.id_semillero
      }); */
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
          "id_tipo_usuario":  1
        }`);
    }
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
    addUsuario() {
      ApiService.post("/usuario", this.objectUsuario).catch(function(response) {
        alert("No se pudo crear el Usuario");
      });

      /*  ApiService.post("/coordinador" id_semillero: this.director.id_semillero}).then(response => {
        this.$router.push({ name: "directores" });
      }); */
      /* ApiService.post("/usuario", this.usuario)
        .then(
          response => this.$router.push({ name: "directores" })
          // console.log(response.data)
        )
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
      this.appear(); */
    },
    /* Despliega mensaje de exito al guardar un registro */
    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro creado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
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
    selectChangeSemillero(event) {
      var i;
      this.semilleros.forEach(function(element) {
        if (element.semillero == event.target.value) {
          i = element.id_semillero;
        }
      });

      this.semilleroSeleccionado.id_semillero = i;
      /* alert(this.grupoSeleccionado.id_grupo); */
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
      console.log("aca2");
      //asigna como usuario un coordinador
      this.usuario.id_rol = 3;
      /*  */
      var id_sem = this.semilleroSeleccionado.id_semillero;
      ApiService.post("/usuario", this.usuario).then(response => {
        if (response.status == 200) {
          console.log("response =", response);
          /* si fue 200 se creo el usario con exito,
            se llama al endpoint que lo asigna como un director de grupo */
          ApiService.post("/coordinador", {
            //contine el id_usuario que me retorna el endpoint de agregar usuario
            id_usuario: response.data,
            id_semillero: id_sem
          })
            .then(response => {
              console.log("response =", response);
              if (response.status == 200) {
                this.showAlert();
                console.log("asignado");
                this.$router.push({ name: "coordinadores" });
              } else if (response.status == 221) {
                alert("El usuario ya es coordinador de otro semillero");
              }
            })
            .catch(function(err) {
              console.error(err);
            });
        } else if (response.status == 221) {
          alert("ya existe");
        }
      });
    }
  }
};
</script>