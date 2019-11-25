<template>
  <div>
    <div class="container">
      <nav class="nav grey lighten-4 py-4"></nav>

      <div class="card card-primary card-outline">
        <h3 class="text-center">Agregar Integrante - {{this.periodo.periodo}}</h3>
        <a @click="back" class="nav-item nav-link">Periodos</a>
        <div class="card-header p-0 pt-1 border-bottom-0">
          <ul class="nav nav-tabs" id="custom-tabs-two-tab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="custom-tabs-two-home-tab"
                data-toggle="pill"
                href="#custom-tabs-two-home"
                role="tab"
                aria-controls="custom-tabs-two-home"
                aria-selected="true"
              >Integrante periodo anterior</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="custom-tabs-two-profile-tab"
                data-toggle="pill"
                href="#custom-tabs-two-profile"
                role="tab"
                aria-controls="custom-tabs-two-profile"
                aria-selected="false"
              >Integrante nuevo</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content" id="custom-tabs-two-tabContent">
            <div
              class="tab-pane fade show active"
              id="custom-tabs-two-home"
              role="tabpanel"
              aria-labelledby="custom-tabs-two-home-tab"
            >
              <table
                id="add-integrantes"
                class="table table-bordered table-hover"
                style="width: 100%"
              >
                <thead>
                  <tr>
                    <th>Documento</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <!-- <th>Tipo usuario</th> -->
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="integrantes.length == 0">
                    <td
                      colspan="6"
                      style="text-align: center; font-size: 1.6em;"
                    >No hay integrantes de periodos anteriores...</td>
                  </tr>
                  <tr v-for="item in integrantes" :key="item.id_usuario">
                    <td>{{ item.documento }}</td>
                    <td>{{ item.nombre_usuario }}</td>
                    <td>{{ item.apellido_usuario }}</td>
                    <td>{{ item.email }}</td>
                    <!-- <td>{{ item.tipo_usuario }}</td> -->

                    <td>
                      <div class="btn-group" role="group">
                        <button
                          class="btn btn-primary"
                          @click="añadirUsuario(item.id_usuario)"
                        >Agregar</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              class="tab-pane fade"
              id="custom-tabs-two-profile"
              role="tabpanel"
              aria-labelledby="custom-tabs-two-profile-tab"
            >
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
                          <div
                            v-if="submitted && $v.usuario.documento.$error"
                            class="invalid-feedback"
                          >
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
                          <div v-if="submitted && $v.usuario.email.$error" class="invalid-feedback">
                            <span v-if="!$v.usuario.email.required">El campo correo es requerido</span>
                            <span v-if="!$v.usuario.email">Email no Valido</span>
                            <span
                              v-if="!$v.usuario.email.maxLength"
                            >El campo no debe superar los 100 caracteres</span>
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

                        <br />
                        <div class="form-group">
                          <button class="btn btn-outline-success">Guardar</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <!-- /.card -->
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, maxLength } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";

export default {
  data() {
    return {
      periodo: {},
      integrantes: [],
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
        estado: 1,
        id_tipo_usuario: "",
        id_rol: ""
      },
      submitted: false
    };
  },
  created() {
    ApiService.get(`/integrante/semillero/noperiodo/${this.$route.params.id}`)
      .then(response => {
        this.integrantes = response.data;
      })
      .then(res => {
        $("#add-integrantes").DataTable({
          responsive: true
        });
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });

    ApiService.get(`/periodo/${this.$route.params.id}`).then(response => {
      this.periodo = response.data[0];
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
          "estado":           1,
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
  },
  methods: {
    añadirUsuario(id_usuario) {
      var id_gr = this.$route.params.id;
      console.log(id_gr);
      console.log(id_usuario);
      ApiService.post("integrante", {
        id_usuario: id_usuario,
        id_periodo: id_gr
      })
        .then(response => {
          if (response.status === 200) {
            console.log('ingresado')
            this.$swal({
              type: "success",
              text: "Registro creado con exito",
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false
            });
          }else{
            this.$swal({
              type: "warning",
              text: "Registro ya ha sido realizado ",
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },
    addUsuario() {
      this.usuario.id_rol = 4;
      ApiService.post("integrante", this.objectUsuario)
        .catch(function(response) {
          if (response.status == 200) {
            this.$swal({
              type: "success",
              text: "Registro creado con exito",
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false
            });
            this.back();
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });

      /*  ApiService.post("/director" id_grupo: this.director.id_grupo}).then(response => {
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

    back() {
      this.$router.go(-1);
    },
    getTipos_Usuarios() {
      ApiService.get("/tipousuario")
        .then(response => {
          this.Tipos_Usuarios = response.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
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
    back() {
      this.$router.go(-1);
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
      this.usuario.id_rol = 4;
      var id_gr = this.periodo.id_periodo;
      ApiService.post("/usuario/integrante", this.usuario)
        .then(response => {
          if (response.status == 200) {
            ApiService.post("/integrante", {
              id_usuario: response.data,
              id_periodo: id_gr
            })
              .then(response => {
                if (response.status == 200) {
                  this.$swal({
                    type: "success",
                    text: "Registro creado con exito",
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false
                  });
                  this.back();
                } else if (response.status == 221) {
                  alert("El usuario ya es director de otro grupo");
                }
                //return response.json();
              })
              .catch(function(err) {
                console.error(err);
              });
          } else if (response.status == 221) {
            this.$swal({
              type: "warning",
              text: "ya existe el usuario",
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false
            });
          }
          //return response.json();
        })
        .catch(function(err) {
          console.error(err);
        });
    }
  }
};
</script>