<template>
  <div style="padding:25px">
    <div style="text-align: right; padding: 14px 1px;">
      <router-link to="/addsemillero" tag="button" class="btn btn-outline-success">Agregar</router-link>
    </div>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <!-- /.card-header -->
            <div class="card-body">
              <br />
              <h3 class="text-center">Semilleros de Investigación</h3>
              <section v-if="errored">
                <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
              </section>
              <section v-else>
                <div v-if="loading">
                  Cargando..
                  <div class="spinner-border text-success" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div v-else></div>
                <div class="table-responsive">
                  <table
                    id="tblSemilleros"
                    class="table table-striped table-bordered dt-responsive nowrap"
                    style="width:100%"
                  >
                    <thead>
                      <tr>
                        <th data-priority="1">Siglas</th>
                        <th data-priority="2">Nombre</th>
                        <!--  <th data-priority="3">Objetivo</th>
                        <th data-priority="4">Descripción</th>-->
                        <th data-priority="5">Grupo</th>
                        <th data-priority="2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in showSemilleros" :key="item.id_semillero">
                        <td>{{ item.siglas_semillero }}</td>
                        <td>{{ item.semillero }}</td>
                        <!--    <td>{{ item.objetivo }}</td>
                        <td>{{ item.descripcion }}</td>-->
                        <td>{{ item.siglas }}</td>
                        <td>
                          <div class="btn-group" role="group">
                            <div v-if="rol < 3">
                              <router-link
                                :to="{name: 'editsemillero', params: { id: item.id_semillero}}"
                                class="btn btn-outline-primary"
                                style="margin: 2px"
                              >Editar</router-link>
                              <button
                                style="margin: 2px"
                                class="btn btn-outline-danger"
                                @click="deleteSemillero(item.id_semillero)"
                              >Eliminar</button>
                            </div>
                            <router-link
                              :to="{name: 'periodos', params: { id: item.id_semillero}}"
                              style="margin: 2px"
                              class="btn btn-outline-warning"
                              v-if="rol != 2"
                            >Periodos</router-link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            <!-- /.card-body -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
export default {
  data() {
    return {
      loading: true,
      errored: false,
      semilleros: []
    };
  },
  created() {
    console.log(this.$store.state.user);
    /* console.log("rol: "+this.$store.state.rol) */
    ApiService.get("/semillero")
      .then(response => {
        if (response.status === 204) {
          this.$swal({
            type: "info",
            text: "No hay semilleros para mostrar",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
          this.semilleros = response.data;
        } else {
          this.semilleros = response.data;
        }
      })
      .then(res => {
        $("#tblSemilleros").DataTable({
          language: {
            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
          },
          responsive: false
        });
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    deleteSemillero(id) {
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
          ApiService.delete(`/semillero/${id}`)
            .then(response => {
              if (response.status === 200) {
                let i = this.semilleros
                  .map(item => item.id_semillero)
                  .indexOf(id); // find index of your object
                this.semilleros.splice(i, 1);
                this.$swal.fire({
                  type: "success",
                  title: "Eliminado con exito",
                  showConfirmButton: false,
                  timer: 1500
                });
              } else if (response.status === 222) {
                alert("no se puedo borrar el registro");
              }
            })
            .catch(error => {
              console.log(error);
              this.errored = true;
            });
          /* this.$swal("Registro Eliminado"); */
        } else {
          this.$swal(" Accion Cancelada");
        }
      });
    }
  },

  computed: {
    showSemilleros() {
      let rol = this.$store.state.user.id_rol;
      let grupo = this.$store.state.user.id_grupo;
      if (rol == 2) {
        return this.semilleros.filter(semi => semi.id_grupo == grupo);
      }
      if (rol == 3) {
        let semillero = this.$store.state.user.id_semillero;
        return this.semilleros.filter(semi => semi.id_semillero == semillero);
      }
      return this.semilleros;
    },
    rol() {
      return this.$store.state.user.id_rol;
    }
  }
};
</script>