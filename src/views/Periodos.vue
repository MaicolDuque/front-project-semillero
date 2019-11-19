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
                  <tr v-for="periodo in periodos"  :key="'periodo-'+periodo.id_periodo">
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
                        <th>Inicio / fin</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="integrantes.length == 0">
                        <td
                          colspan="6"
                          style="text-align: center; font-size: 1.6em;"
                        >Seleccione un periodo...</td>
                      </tr>
                      <tr v-for="actividad in actividades" :key="'actividades'+actividad.id_actividad">
                        <td>{{actividad.actividad}}</td>
                        <td>{{actividad.responsable}}</td>
                        <td>{{actividad.recursos}}</td>
                        <td>{{actividad.registro}}</td>
                        <td>meses</td>
                        <td>
                          <div class="btn-group" role="group">
                            <router-link
                              :to="{name: 'editar-actividad', params: { id: actividad.id_actividad}}"
                              class="btn btn-primary"
                            >Editar</router-link>
                            <button
                              class="btn btn-danger"
                              @click="deleteIntegrante(actividad.id_actividad)"
                            >Eliminar</button>
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
                >Morbi turpis dolor, vulputate vitae felis non, tincidunt congue mauris. Phasellus volutpat augue id mi placerat mollis. Vivamus faucibus eu massa eget condimentum. Fusce nec hendrerit sem, ac tristique nulla. Integer vestibulum orci odio. Cras nec augue ipsum. Suspendisse ut velit condimentum, mattis urna a, malesuada nunc. Curabitur eleifend facilisis velit finibus tristique. Nam vulputate, eros non luctus efficitur, ipsum odio volutpat massa, sit amet sollicitudin est libero sed ipsum. Nulla lacinia, ex vitae gravida fermentum, lectus ipsum gravida arcu, id fermentum metus arcu vel metus. Curabitur eget sem eu risus tincidunt eleifend ac ornare magna.</div>
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
            <button type="button" class="close"  data-dismiss="modal" aria-label="Close">
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
        return  this.$router.push({
          name: "agregar-actividad",
          params: { id: this.$route.params.id, periodo: this.idPeriodo }
        });
      }
      alert("Debe seleccionar un periodo..");
    },
    addPeriodo() {

      ApiService.post("/periodo", this.periodo)
      .then( newPeriodo => {
        this.periodos.push(newPeriodo.data)
      })
      .catch(function(response) {});
    }
  }
};
</script>