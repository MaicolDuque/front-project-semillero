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
              <table
                id="periodos"
                class="table table-bordered table-hover dt-responsive nowrap"
                style="width: 100%; text-align: center;max-width: 100%"
              >
                <thead>
                  <tr>
                    <th>Periodos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="periodo in periodos" :key="'periodo-'+periodo.id_periodo">
                    <td style="width: 70%">
                      <div style="cursor:pointer">
                        <a @click="showInfoPeriodo(periodo.id_periodo)">{{periodo.periodo}}</a>
                      </div>
                    </td>
                    <td style="width: 30%">
                      <div class="btn-group" role="group">
                        <router-link
                          :to="{name: 'edit-periodo', params: { id: periodo.id_periodo}}"
                          class="btn btn-outline-primary"
                          style="margin: 2px"
                        >Editar</router-link>
                        <button
                          style="margin: 2px"
                          class="btn btn-outline-danger"
                          @click="deleteperiodo(periodo.id_periodo)"
                        >Eliminar</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
        </div>

        <div class="col-lg-7 col-sm-6">
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
                    <button class="btn btn-success" @click="addIntegrante()">Agregar</button>
                  </div>
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
                              class="btn btn-primary"
                            >Editar</router-link>
                            <button
                              class="btn btn-danger"
                              @click="deleteIntegrante(item.id_usuario)"
                            >Eliminar</button>
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
                  <div style="text-align: right; padding: 14px 1px;">
                    <button class="btn btn-success" @click="addActividad()">Agregar</button>
                  </div>
                  <table
                    id="actividades"
                    class="table table-bordered table-hover"
                    style="width: 100%"
                  >
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Responsable</th>
                        <th>Recursos</th>
                        <th>Registro</th>
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
                              class="btn btn-primary"
                            >Editar</button>
                            <button
                              class="btn btn-danger"
                              @click="deleteActividad(actividad.id_actividad)"
                            >Eliminar</button>

                            <button
                              class="btn btn-warning"
                              @click="verProductos(actividad.id_actividad)"
                            >Ver Productos</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  class="tab-pane fade"
                  id="custom-tabs-two-messages"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-two-messages-tab"
                >
                  <div style="text-align: right; padding: 14px 1px;">
                    <button class="btn btn-success" @click="addProyecto()">Agregar</button>
                  </div>
                  <section class="content">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <!-- /.card-header -->
                          <div class="card-body">
                            <table
                              id="tblGrupos"
                              class="table table-striped table-bordered dt-responsive nowrap"
                              style="width:100%"
                            >
                              <thead>
                                <tr>
                                  <th>Nombre</th>
                                  <th>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="item in proyectos" :key="item.id_proyecto">
                                  <td>{{ item.proyecto }}</td>

                                  <td style="text-align: center">
                                    <div class="btn-group" role="group">
                                      <router-link
                                        :to="{name: 'editproyecto', params: { id: item.id_proyecto}}"
                                        class="btn btn-outline-primary"
                                        style="margin: 2px"
                                      >Editar</router-link>

                                      <button
                                        style="margin: 2px"
                                        class="btn btn-outline-danger"
                                        @click="deleteProyecto(item.id_proyecto)"
                                      >Eliminar</button>
                                      <router-link
                                        :to="{name: 'agregar-proyecto-producto', params: { id: item.id_proyecto}}"
                                        class="btn btn-outline-primary"
                                        style="margin: 2px"
                                      >Productos</router-link>
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
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            .
            <div style="width: 50%; margin: 0 auto;">
              <div class="card card-success">
                <form @submit.prevent="handleSubmit">
                  <div class="card-body">
                    <div class="form-group">
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
                    </div>
                    <div class="form-group">
                      <label for="grupo">Fecha Inicio</label>
                      <input
                        type="date"
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
                        <button type="submit" class="btn btn-outline-success">Guardar</button>
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
      proyectos: [],
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
      submitted: false
    };
  },

  created() {
    ApiService.get("/periodo")
      .then(response => {
        this.periodos = response.data;
      })
      .then(ress =>
        $("#periodos").DataTable({
          responsive: true
        })
      );
    ApiService.get(`/proyecto/periodo/semillero/${this.$route.params.id}`)
      .then(response => {
        this.proyectos = response.data;
      })
      .then(ress =>
        $("#proyectos").DataTable({
          responsive: true
        })
      );

    ApiService.get(`/semillero/${this.$route.params.id}`).then(response => {
      this.semillero = response.data[0];
    });
  },
  mounted: function() {
    // $("#integrantes").DataTable({
    //       responsive: true
    // })
  },
  //Reglas de validacion para VueValidate
  validations: {
    periodo: {
      periodo: { required },
      fecha_inicio: { required },
      fecha_fin: { required }
    }
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;

      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      /* this.updatePeriodo(); */
      this.periodo.id_semillero = this.semillero.id_semillero;
      this.addPeriodo();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.periodo)); */
    },
    deleteProyecto(id) {
      this.$swal({
        title: "Estas seguro de eliminar el registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
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
        title: "Estas seguro de eliminar el registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
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
      alert(id);
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
              responsive: true,
              searching: false
            });
          }
        });

      ApiService.get(`/actividad/periodo/semillero/${id}`)
        .then(response => {
          this.actividades = response.data;
        })
        .then(res => {
          $("#actividades").DataTable({
            responsive: true,
            searching: false,
            retrieve: true
          });
        });
    },

    addProyecto() {
      if (this.idPeriodo) {
        return this.$router.push({
          name: "agregar-proyecto",
          params: { id: this.$route.params.id }
        });
      }
      alert("Debe seleccionar un periodo..");
    },

    addIntegrante() {
      if (this.idPeriodo) {
        return this.$router.push({
          name: "agregar-integrante",
          params: { id: this.$route.params.id }
        });
      }
      alert("Debe seleccionar un periodo..");
    },

    addActividad() {
      if (this.idPeriodo) {
        return this.$router.push({
          name: "agregar-actividad",
          params: { id: this.$route.params.id, periodo: this.idPeriodo }
        });
      }
      alert("Debe seleccionar un periodo..");
    },

    editActividad(id) {
      if (this.idPeriodo) {
        return this.$router.push({
          name: "editar-actividad",
          params: { id: id, periodo: this.idPeriodo }
        });
      }
      alert("Debe seleccionar un periodo..");
    },
    addPeriodo() {
      ApiService.post("/periodo", this.periodo)
        .then(newPeriodo => {
          this.periodos.push(newPeriodo.data);
        })
        .catch(function(response) {});
    },

    deleteActividad(id) {
      alert();
      // ApiService.delete(`/actividadmes/${id}`)
      // .then(r => {
      //   ApiService.delete(`/producto/${id}`)
      // })
      // .then(r2 => {
      //   ApiService.delete(`/actividad/${id}`)
      // })
    },

    verProductos(id) {
      alert(id);
    }
  }
};
</script>