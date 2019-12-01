<template>
  <div style="padding:25px">
    <div style="text-align: right; padding: 14px 1px;">
      <router-link to="/addGrupos" tag="button" class="btn btn-outline-success">Agregar</router-link>
    </div>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <br />
            <h3 class="text-center">Grupos de investigación</h3>
            <!-- /.card-header -->
            <div class="card-body">
              <section v-if="errored">
                <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
              </section>
              <section v-else>
                <div v-if="loading">
                  cargando..
                  <div class="spinner-border text-success" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div v-else></div>
                <div class="table-responsive">
                  <table
                    id="tblGrupos"
                    class="table table-striped table-bordered dt-responsive"
                    style="width:100%"
                  >
                    <thead>
                      <tr>
                        <th data-priority="1">Siglas</th>
                        <th data-priority="3">Nombre</th>
                        <th data-priority="7">Categoria</th>
                        <th data-priority="6">Código Colciencias</th>
                        <!-- <th data-priority="5">Vinculo Colciencias</th> -->
                        <th data-priority="4">Facultad</th>
                        <th data-priority="2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in grupos" :key="item.id_grupo">
                        <td>{{ item.siglas }}</td>
                        <td>{{ item.grupo }}</td>
                        <td>{{ item.categoria }}</td>
                        <td>{{ item.cod_colciencias }}</td>
                        <!-- <td>{{ item.vinculo }}</td> -->
                        <td>{{ item.facultad }}</td>
                        <td>
                          <div>
                            <router-link
                              style="margin: 2px"
                              :to="{name: 'editgrupo', params: { id: item.id_grupo}}"
                              class="btn btn-outline-primary"
                            >Editar</router-link>

                            <button
                              style="margin: 2px"
                              class="btn btn-outline-danger"
                              @click="deleteGrupo(item.id_grupo)"
                            >Eliminar</button>
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
      grupos: []
    };
  },
  created() {
    ApiService.get("/grupo")
      .then(response => {
        if (response.status === 204) {
          this.$swal({
            type: "info",
            text: "No hay grupos para mostrar",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
          this.grupos = response.data;
        } else {
          this.grupos = response.data;
        }
      })
      .then(res => {
        $("#tblGrupos").DataTable({
          responsive: false,
          scrollX: true

          /* columnDefs: [{ width: "1%" }] */
        });
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  mounted: function() {},
  methods: {
    deleteGrupo(id) {
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
          ApiService.delete(`/grupo/${id}`)
            .then(response => {
              if (response.status === 200) {
                let i = this.grupos.map(item => item.id_grupo).indexOf(id); // find index of your object
                this.grupos.splice(i, 1);
                this.$swal.fire({
                  type: "success",
                  title: "Eliminado con exito",
                  showConfirmButton: false,
                  timer: 1500
                });
              } else if (response.status === 222) {
                this.$swal({
                  type: "warning",
                  text:
                    "fallo, no se ha podido eliminar el registro, Registros asociados",
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
    }
  }
};
</script>