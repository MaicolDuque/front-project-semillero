<template>
  <div>
    <div class="container">
      <nav class="nav grey lighten-4 py-4">
        <a @click="back" class="nav-item nav-link">Periodos</a>
      </nav>

      <div class="card card-primary card-outline">
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
                    <th>Tipo usuario</th>
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
                    <td>{{ item.tipo_usuario }}</td>

                    <td>
                      <div class="btn-group" role="group">
                        <button class="btn btn-primary">Agregar</button>
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
                          <select
                            class="custom-select browser-default"
                            @change="onChange($event)"
                            required
                          >
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
        </div>
        <!-- /.card -->
      </div>
      <pre>{{$data}}</pre>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
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
        estado: "",
        id_tipo_usuario: "",
        id_rol: 4
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
    /* addUsuario() {
      ApiService.post("/usuario", this.objectUsuario).catch(function(response) {
        alert("No se pudo crear el Usuario");
      });
    }, */

    back() {
      this.$router.go(-1);
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
      alert("aca");
    }
  }
};
</script>