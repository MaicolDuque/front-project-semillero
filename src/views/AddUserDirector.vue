<template>
  <div>
    <div class="container">
      <h3 class="text-center">Agregar Usuario Director</h3>
      <nav class="nav grey lighten-4 py-4">
        <router-link to="/directores" class="nav-item nav-link">Directores</router-link>
      </nav>
      <section v-if="errored">
        <p>Lo sentimos, no es posible Guardar el registro en este momento</p>
      </section>
      <section class="content">
        <div style="width: 50%; margin: 0 auto;">
          <div class="card card-success">
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
                  <label for="grupo">Grupo</label>
                  <br />
                  <select
                    class="custom-select browser-default"
                    @change=" selectChangeGrupo"
                    required
                  >
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
      /* director: {}, */
      grupos: [],
      grupoSeleccionado: {
        id_grupo: ""
      },
      /* value: "", */
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
    ApiService.get("/grupo/disponible")
      .then(response => {
        this.grupos = response.data;
        /* this.grupos.push({
          grupo: this.usuario.grupo,
          id_grupo: this.usuario.id_grupo
        }); */
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
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
      documento: { required, maxLength: maxLength(12) },
      nombre_usuario: { required, maxLength: maxLength(50) },
      apellido_usuario: { required, maxLength: maxLength(50) },
      email: { required, email, maxLength: maxLength(100) },
      telefono: { required, maxLength: maxLength(10) },
      estado: { required },
      id_tipo_usuario: { required }
    }
    /* grupo: {
      id_grupo: { required }
    } */
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
    selectChangeGrupo(event) {
      var i;
      this.grupos.forEach(function(element) {
        if (element.grupo == event.target.value) {
          i = element.id_grupo;
        }
      });

      this.grupoSeleccionado.id_grupo = i;
      /* alert(this.grupoSeleccionado.id_grupo); */
    },
    //Valida el formulario
    handleSubmit(e) {
      console.log("aca1");
      this.submitted = true;
      var retornado = "";
      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      console.log("aca2");
      //asigna como usuario un Director
      this.usuario.id_rol = 2;
      /*  */
      var id_gr = this.grupoSeleccionado.id_grupo;
      ApiService.post("/usuario", this.usuario).then(response => {
        if (response.status == 200) {
          console.log("response =", response);
          /* si fue 200 se creo el usario con exito,
            se llama al endpoint que lo asigna como un director de grupo */
          ApiService.post("/director", {
            //contine el id_usuario que me retorna el endpoint de agregar uauario
            id_usuario: response.data,
            id_grupo: id_gr
          })
            .then(response => {
              console.log("response =", response);
              if (response.status == 200) {
                console.log("asignado");
                this.$router.push({ name: "directores" });
              } else if (response.status == 221) {
                alert("El usuario ya es director de otro grupo");
              }
            })
            .catch(function(err) {
              console.error(err);
            });
        } else if (response.status == 221) {
          alert("ya existe");
        }
        //return response.json();
      });
      /* .catch(function(err) {
          console.error(err);
        }); */

      /* .then(response value => {
          if (response.status == 200) {
            console.log(value.data);
          } else if (response.status == 221) {
            alert("ya existe");
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        }); */
      /* Almacenar el usuario */
      /* logica de enviar api de creacion de usuario y asignacion de grupo */

      //this.addUsuario();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.usuario)); */
    }
  }
};
</script>