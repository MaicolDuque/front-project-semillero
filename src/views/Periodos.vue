<template>
  <div style="padding:25px">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Periodos académicos - {{semillero.semillero}}</h1>
          </div>
        </div>
      </div>
      <button
        class="btn btn-outline-success"
        data-toggle="modal"
        data-target="#exampleModal"
      >Agregar</button>
      <!--  <button class="btn btn-outline-success" @click="AddPeriodo()">Agregar</button> -->
    </section>
    <section class="content">
      <div class="row">
        <div class="col-lg-5 col-sm-6">
          <div class="card">
            <!-- /.card-header -->
            <div class="card-body">
              <div class="table-responsive">
                <table
                  id="periodos"
                  class="table table-striped table-hover dt-responsive display nowrap"
                  cellspacing="0"
                  style=" text-align: center"
                >
                  <thead>
                    <tr>
                      <th data-priority="1">Periodos</th>
                      <th data-priority="1">Acciones</th>
                      <th data-priority="2">Exportar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="periodo in periodos" :key="'periodo-'+periodo.id_periodo">
                      <td>
                        <div
                          class="btn btn-xs btn-info"
                          style="cursor:pointer"
                          @click="showInfoPeriodo(periodo.id_periodo)"
                        >
                          <a>{{periodo.periodo}}</a>
                        </div>
                      </td>
                      <td>
                        <div class="btn-group" role="group">
                          <router-link
                            :to="{name: 'edit-periodo', params: { id: periodo.id_periodo}}"
                            class="btn btn-outline-success btn-xs"
                            style="margin: 2px"
                          >Editar</router-link>
                          <!-- <button
                            class="btn btn-outline-danger btn-xs"
                            style="margin: 2px"
                            @click="exportar(periodo.id_periodo, 3)"
                          >Reporte</button>-->
                          <button
                            style="margin: 2px"
                            class="btn btn-outline-danger btn-xs"
                            @click="deleteperiodo(periodo.id_periodo)"
                          >Eliminar</button>
                        </div>
                      </td>
                      <td>
                        <div class="btn-group" role="group">
                          <!--  <button
                            class="btn btn-outline-danger btn-xs"
                            style="margin: 2px"
                            @click="exportar(periodo.id_periodo, 3)"
                          >Reporte</button>-->
                          <!--  <span
                            class="btn btn-outline-success btn-xs"
                            style="margin: 2px"
                            @click="exportar(periodo.id_periodo, 1)"
                          >FIN13-I</span>-->
                          <a
                            style="margin: 2px"
                            class="btn btn-outline-primary btn-xs"
                            :href=" url + '/exportar/inicial/' + periodo.id_periodo"
                          >FIN13-I</a>
                          <a
                            style="margin: 2px"
                            class="btn btn-outline-success btn-xs"
                            :href=" url + '/exportar/final/' + periodo.id_periodo"
                          >FIN13-F</a>
                          <a
                            style="margin: 2px"
                            class="btn btn-outline-danger btn-xs"
                            :href=" url + '/exportar/pdf/' + periodo.id_periodo"
                          >Reporte</a>
                          <!--  <router-link
                            :to="{name: 'edit-periodo', params: { id: periodo.id_periodo}}"
                            class="btn btn-outline-success btn-xs"
                            style="margin: 2px"
                          >Editar</router-link>-->
                          <!--  <button
                            class="btn btn-outline-danger btn-xs"
                            style="margin: 2px"
                            @click="exportar(periodo.id_periodo, 3)"
                          >Reporte</button>-->
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- /.card-body -->
          </div>
        </div>

        <div class="col-lg-7 col-sm-6">
          <div class="card card-success card-outline">
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
                  >Integrantes</a>
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
                  >Actividades</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="custom-tabs-two-messages-tab"
                    data-toggle="pill"
                    href="#custom-tabs-two-messages"
                    role="tab"
                    aria-controls="custom-tabs-two-messages"
                    aria-selected="false"
                  >Proyectos</a>
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
                  <div style="text-align: right; padding: 14px 1px;">
                    <button class="btn btn-outline-success" @click="addIntegrante()">Agregar</button>
                  </div>
                  <div class="table-responsive">
                    <table
                      id="integrantes"
                      class="table table-bordered table-hover"
                      style="width: 100%"
                    >
                      <thead>
                        <tr>
                          <th data-priority="1">Documento</th>
                          <th data-priority="3">Nombre</th>
                          <th data-priority="4">Apellido</th>
                          <th data-priority="5">Email</th>
                          <th data-priority="6">Tipo usuario</th>
                          <th data-priority="2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="integrantes.length == 0">
                          <td
                            colspan="6"
                            style="text-align: center; font-size: 1.6em;"
                          >Seleccione un periodo...</td>
                        </tr>
                        <tr v-for="item in integrantes" :key="'integrantes'+item.id_usuario">
                          <td>{{ item.documento }}</td>
                          <td>{{ item.nombre_usuario }}</td>
                          <td>{{ item.apellido_usuario }}</td>
                          <td>{{ item.email }}</td>
                          <td>{{ item.tipo_usuario }}</td>

                          <td>
                            <div class="btn-group" role="group">
                              <router-link
                                :to="{name: 'editar-integrante', params: { id: item.id_usuario}}"
                                class="btn btn-outline-primary"
                                style="margin: 2px"
                              >Editar</router-link>
                              <button
                                class="btn btn-outline-danger"
                                style="margin: 2px"
                                @click="deleteIntegrante(item.id_usuario)"
                              >Eliminar</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="custom-tabs-two-profile"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-two-profile-tab"
                >
                  <div style="text-align: right; padding: 14px 1px;">
                    <button class="btn btn-outline-success" @click="addActividad()">Agregar</button>
                  </div>
                  <div class="table-responsive">
                    <table
                      id="actividades"
                      class="table table-bordered table-hover"
                      style="width: 100%"
                    >
                      <thead>
                        <tr>
                          <th data-priority="2">Nombre</th>
                          <th data-priority="3">Responsable</th>
                          <th data-priority="4">Recursos</th>
                          <th data-priority="5">Registro</th>
                          <th data-priority="1">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="actividades.length == 0">
                          <td
                            colspan="6"
                            style="text-align: center; font-size: 1.6em;"
                          >Seleccione un periodo...</td>
                        </tr>
                        <tr
                          v-for="actividad in actividades"
                          :key="'actividades'+actividad.id_actividad"
                        >
                          <td>{{actividad.actividad}}</td>
                          <td>{{actividad.responsable}}</td>
                          <td>{{actividad.recursos}}</td>
                          <td>{{actividad.registro}}</td>
                          <td>
                            <div class="btn-group" role="group">
                              <button
                                @click="editActividad(actividad.id_actividad)"
                                class="btn btn-outline-primary"
                                style="margin: 2px"
                              >Editar</button>
                              <button
                                class="btn btn-outline-danger"
                                style="margin: 2px"
                                @click="deleteActividad(actividad.id_actividad)"
                              >Eliminar</button>

                              <button
                                class="btn btn-outline-warning"
                                style="margin: 2px"
                                @click="verProductos(actividad.id_actividad)"
                              >Ver Productos</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!-- panel proyectos -->
                <div
                  class="tab-pane fade"
                  id="custom-tabs-two-messages"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-two-messages-tab"
                >
                  <div style="text-align: right; padding: 14px 1px;">
                    <button class="btn btn-outline-success" @click="addProyecto()">Agregar</button>
                  </div>
                  <section class="content">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <!-- /.card-header -->
                          <div class="table-responsive">
                            <table
                              id="tblProyectos"
                              class="table table-bordered table-hover"
                              style="width: 100%"
                            >
                              <thead>
                                <tr>
                                  <th data-priority="1">Nombre</th>
                                  <th data-priority="2">Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-if="proyectos.length == 0">
                                  <td
                                    colspan="6"
                                    style="text-align: center; font-size: 1.6em;"
                                  >Seleccione un periodo...</td>
                                </tr>
                                <tr v-for="item in proyectos" :key="'proyectos'+item.id_proyecto">
                                  <td>{{ item.proyecto }}</td>

                                  <td>
                                    <div class="btn-group" style="margin: 2px" role="group">
                                      <router-link
                                        :to="{name: 'editar-proyecto', params: { id: item.id_proyecto}}"
                                        class="btn btn-outline-primary"
                                        style="margin: 2px"
                                      >Editar</router-link>
                                      <button
                                        class="btn btn-outline-danger"
                                        style="margin: 2px"
                                        @click="deleteProyecto(item.id_proyecto)"
                                      >Eliminar</button>
                                      <button
                                        class="btn btn-outline-warning"
                                        style="margin: 2px"
                                        @click="verProductosP(item.id_proyecto)"
                                      >Ver Productos</button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!-- /.card-body -->
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <!-- panel proyectos -->
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>
      </div>
    </section>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nuevo periodo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            .
            <div style="width: 100%; margin: 0 auto;">
              <div class="card card-success">
                <form @submit.prevent="handleSubmit">
                  <div class="card-body">
                    <div class="form-group">
                      <label for="estado">Año</label>
                      <br />
                      <select
                        class="custom-select browser-default"
                        @change="onChange2($event)"
                        required
                      >
                        <option value>Por favor seleccione un Elemento</option>
                        <option
                          v-for="ano in anos"
                          v-bind:key="ano.value"
                          class="form-control"
                        >{{ ano.text }}</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="periodo">Periodo académico</label>
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
                        >{{ option.text }}</option>
                      </select>
                    </div>

                    <!-- <div class="form-group">
                      <label for="grupo">Periodo</label>
                      <input
                        type="text"
                        v-model="periodo.periodo"
                        id="periodo"
                        name="periodo"
                        placeholder="Periodo"
                        class="form-control"
                        :class="{ 'is-invalid': submitted && $v.periodo.periodo.$error }"
                      />
                      <div
                        v-if="submitted && !$v.periodo.periodo.required"
                        class="invalid-feedback"
                      >El campo periodo es requerido</div>
                    </div>-->
                    <div class="form-group">
                      <label for="grupo">Fecha Inicio</label>
                      <input
                        type="date"
                        min="2019-01-01"
                        v-model="periodo.fecha_inicio"
                        id="fecha_inicio"
                        name="fecha_inicio"
                        placeholder="fecha inicio"
                        class="form-control"
                        :class="{ 'is-invalid': submitted && $v.periodo.fecha_inicio.$error }"
                      />
                      <div
                        v-if="submitted && !$v.periodo.fecha_inicio.required"
                        class="invalid-feedback"
                      >El campo fecha inicio es requerido</div>
                    </div>

                    <div class="form-group">
                      <label for="grupo">Fecha Fin</label>
                      <input
                        type="date"
                        min="2019-01-01"
                        v-model="periodo.fecha_fin"
                        id="fecha_fin"
                        name="fecha_fin"
                        placeholder="fecha_fin"
                        class="form-control"
                        :class="{ 'is-invalid': submitted && $v.periodo.fecha_fin.$error }"
                      />
                      <div
                        v-if="submitted && !$v.periodo.fecha_fin.required"
                        class="invalid-feedback"
                      >El campo fecha fin es requerido</div>
                    </div>
                    <div class="card-footer">
                      <div class="modal-footer">
                        <button id="btn_modal" type="submit" class="btn btn-outline-success">Guardar</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <!--  <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      url: process.env.VUE_APP_URL_API,
      proyectos: [],
      loadingProyecto: true,
      erroredProyecto: false,
      date: new Date(),
      nombre: "Semillero 1",
      periodos: [],
      semillero: {},
      integrantes: [],
      actividades: [],
      controlIntegrantes: 1,
      idPeriodo: 0,
      periodo: {
        periodo: "",
        fecha_inicio: "",
        fecha_fin: "",
        id_semillero: ""
      },
      year: "",
      period: "",
      options: [{ text: "1", value: "1" }, { text: "2", value: "2" }],
      anos: [
        { text: "2019", value: "2019" },
        { text: "2020", value: "2020" },
        { text: "2021", value: "2021" },
        { text: "2022", value: "2022" },
        { text: "2023", value: "2023" },
        { text: "2024", value: "2024" },
        { text: "2025", value: "2025" },
        { text: "2026", value: "2026" },
        { text: "2027", value: "2027" },
        { text: "2028", value: "2028" },
        { text: "2029", value: "2029" },
        { text: "2030", value: "2030" },
        { text: "2031", value: "2031" }
      ],
      submitted: false,
      coordinador: {},
      años: []
    };
  },

  created() {
    /* let coordinacion = this.$router.state.user.id_usuario; */
    var bytes = CryptoJS.AES.decrypt(localStorage.user, "Key");
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    let user = JSON.parse(originalText);
    /* console.log(user) */

    ApiService.get(`/semillero/${this.$route.params.id}`)
      .then(response => {
        this.semillero = response.data[0];
        /* console.log(this.semillero) */
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });

    ApiService.get(`/coordinador/${user.id_usuario}`).then(response => {
      this.coordinador = response.data[0];

      /**
       *
       * Validación Permiso
       */
      let rol = this.$store.state.user.id_rol;

      if (
        this.semillero.id_semillero != this.coordinador.id_semillero &&
        rol > 1
      ) {
        this.$router.push({ name: "homeLogged" });
      }
    });

    ApiService.get(`/periodo/${this.$route.params.id}`)
      .then(response => {
        this.periodos = response.data;
      })
      .then(ress =>
        $("#periodos")
          .DataTable({
            language: {
              /* url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json" */
            },
            responsive: true,
            retrieve: true
          })
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
      );
  },

  //Reglas de validacion para VueValidate
  validations: {
    periodo: {
      /*  periodo: { required }, */
      fecha_inicio: { required },
      fecha_fin: { required }
    }
  },
  methods: {
    onChange($event) {
      if (event.target.value == "1") {
        this.period = 1;
      } else {
        this.period = 2;
      }
    },
    onChange2($event) {
      if (event.target.value == "2019") {
        this.year = 2019;
      } else if (event.target.value == "2020") {
        this.year = 2020;
      } else if (event.target.value == "2021") {
        this.year = 2021;
      } else if (event.target.value == "2022") {
        this.year = 2022;
      } else if (event.target.value == "2023") {
        this.year = 20230;
      } else if (event.target.value == "2024") {
        this.year = 2024;
      } else if (event.target.value == "2025") {
        this.year = 2025;
      } else if (event.target.value == "2026") {
        this.year = 2026;
      } else if (event.target.value == "2027") {
        this.year = 2027;
      } else if (event.target.value == "2028") {
        this.year = 2028;
      } else if (event.target.value == "2029") {
        this.year = 2029;
      } else if (event.target.value == "2030") {
        this.year = 2030;
      } else if (event.target.value == "2031") {
        this.year = 2031;
      }
    },
    showAlertInicioDescarga() {
      this.$swal({
        type: "info",
        title: "Procesando",
        text: "el archivo empezara a descargarse en poco tiempo",

        showCancelButton: false,
        showConfirmButton: true
      });
    },
    exportar(id, tipo) {
      if (tipo == 1) {
        return (location.href =
          process.env.VUE_APP_URL_API + "/exportar/inicial/" + id);
      }
      if (tipo == 2) {
        return (location.href =
          process.env.VUE_APP_URL_API + "/exportar/final/" + id);
      }
      return (location.href =
        process.env.VUE_APP_URL_API + "/exportar/pdf/" + id);
    },

    handleSubmit(e) {
      this.submitted = true;

      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.periodo.id_semillero = this.semillero.id_semillero;
      this.addPeriodo();
    },
    deleteProyecto(id) {
      this.$swal({
        title: "¿Estás seguro de eliminar?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          ApiService.delete(`/proyecto/${id}`).then(response => {
            let i = this.proyectos.map(item => item.id_poyectoo).indexOf(id); // find index of your object
            this.proyectos.splice(i, 1);
          });
          this.$swal("Registro Eliminado");
        } else {
          this.$swal(" Accion Cancelada");
        }
      });
    },
    deleteperiodo(id) {
      this.$swal({
        title: "¿Estás seguro de eliminar?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          ApiService.delete(`/periodo/${id}`).then(response => {
            let i = this.periodos.map(item => item.id_periodo).indexOf(id); // find index of your object
            this.periodos.splice(i, 1);
          });
          this.$swal("Registro Eliminado");
        } else {
          this.$swal(" Accion Cancelada");
        }
      });
    },

    deleteIntegrante(id) {
      this.$swal({
        title: "¿Estás seguro de eliminar?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          var datos = {
            id_periodo: this.periodos,
            id_usuario: id
          };

          ApiService.delete(`integrante/periodo/${$id}`, datos).then(
            response => {
              let i = this.integrantes
                .map(item => item.id_integrante)
                .indexOf(id); // find index of your object
              this.integrantes.splice(i, 1);
            }
          );
          this.$swal("Registro Eliminado");
        } else {
          this.$swal(" Accion Cancelada");
        }
      });
    },

    showInfoPeriodo(id) {
      this.idPeriodo = id;
      ApiService.get(`/integrante/semillero/periodo/${id}`)
        .then(response => {
          this.integrantes = response.data;
        })
        .then(res => {
          if (this.controlIntegrantes) {
            this.controlIntegrantes = 0;
            $("#integrantes").DataTable({
              language: {
                url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
              },
              responsive: false,
              searching: false,
              retrieve: true
            });
          }
        });

      ApiService.get(`/proyecto/periodo/semillero/${id}`)
        .then(response => {
          if (response.status === 204) {
            /* this.$swal({
              type: "info",
              text: "No hay proyectos en este periodo para mostrar",
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false
            }); */
            this.proyectos = response.data;
          } else {
            this.proyectos = response.data;
          }
        })
        .then(res => {
          $("#tblProyectos").DataTable({
            language: {
              url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            },
            responsive: false,
            searching: false,
            retrieve: true
          });
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));

      /* ApiService.get(`/proyecto/periodo/semillero/${id}`)
        .then(response => {
          this.proyectos = response.data;
          console.log(this.proyectos);
        })
        .then(res => {
          $("#tblProyectos").DataTable({
            responsive: true,
            searching: false,
            retrieve: true
          });
        }); */

      ApiService.get(`/actividad/periodo/semillero/${id}`)
        .then(response => {
          this.actividades = response.data;
        })
        .then(res => {
          $("#actividades").DataTable({
            language: {
              url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            },
            buttons: ["copy", "excel", "pdf"],
            responsive: false,
            searching: false,
            retrieve: true
          });
        });
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
    addProyecto() {
      if (this.idPeriodo) {
        return this.$router.push({
          name: "agregar-proyecto",
          params: { id: this.$route.params.id, periodo: this.idPeriodo }
        });
      }
      this.$swal({
        type: "info",
        text: "Debe seleccionar un periodo",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: true
      });
    },

    addIntegrante() {
      if (this.idPeriodo) {
        return this.$router.push({
          name: "agregar-integrante",
          params: { id: this.idPeriodo }
        });
      }
      this.$swal({
        type: "info",
        text: "Debe seleccionar un periodo",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: true
      });
    },

    addActividad() {
      if (this.idPeriodo) {
        return this.$router.push({
          name: "agregar-actividad",
          params: { id: this.$route.params.id, periodo: this.idPeriodo }
        });
      }
      this.$swal({
        type: "info",
        text: "Debe seleccionar un periodo",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: true
      });
    },

    editActividad(id) {
      if (this.idPeriodo) {
        return this.$router.push({
          name: "editar-actividad",
          params: { id: id, periodo: this.idPeriodo }
        });
      }
      this.$swal({
        type: "info",
        text: "Debe seleccionar un periodo",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: true
      });
    },
    addPeriodo() {
      this.periodo.periodo = this.year + "-" + this.period;
      ApiService.post("/periodo", this.periodo)
        .then(newPeriodo => {
          this.periodos.push(newPeriodo.data);
          $("#exampleModal").modal("hide");
          this.showAlert();
          (this.period = ""), (this.year = "");
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },

    deleteActividad(id) {
      this.$swal({
        title: "¿Estás seguro de eliminar?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          ApiService.delete(`/actividad/${id}`)
            .then(response => {
              if (response.status === 200) {
                let i = this.actividades
                  .map(item => item.id_actividad)
                  .indexOf(id); // find index of your object
                this.actividades.splice(i, 1);
                this.$swal.fire({
                  type: "success",
                  title: "Eliminado con exito",
                  showConfirmButton: false,
                  timer: 1500
                });
              } else if (response.status === 222) {
                this.$swal({
                  type: "warning",
                  text: "fallo, no se ha podido eliminar el registro",
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
          this.$swal("Registro Eliminado");
        } else {
          this.$swal(" Accion Cancelada");
        }
      });
    },

    verProductos(id) {
      this.$router.push({
        name: "productos",
        params: { id: id }
      });
    },

    verProductosP(id) {
      this.$router.push({
        name: "productosP",
        params: { id: id }
      });
    }
  }
};
</script>