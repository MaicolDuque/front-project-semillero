<template>
  <div style="padding:25px">
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <h3 class="text-center">semilleros de Investigación</h3>

            <!-- /.card-header -->
            <div class="card-body">
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
                <table
                  id="tblsemilleros"
                  class="table table-striped table-bordered dt-responsive nowrap"
                  style="width:100%"
                >
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>objetivo</th>
                      <th>descripcion</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in semilleros" :key="item.id_semillero">
                      <td>{{ item.semillero }}</td>
                      <td>{{ item.objetivo }}</td>
                      <td>{{ item.descripcion }}</td>
                      <td style="text-align: center">
                        <div class="btn-group" role="group">
                          <router-link
                            :to="{name: 'semillero-especifico', params: { id: item.id_semillero}}"
                            class="btn btn-outline-primary"
                            style="margin: 2px"
                          >ver mas..</router-link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
    /* alert(this.$route.params.id); */
    ApiService.get(`/semillero/grupo/${this.$route.params.id}`)
      .then(response => {
        if (response.status === 204) {
          alert("No existen grupos para mostrar ");
          this.semilleros = response.data;
        } else {
          this.semilleros = response.data;
        }
      })
      .then(res => {
        $("#tblsemilleros").DataTable({
          responsive: true
        });
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  mounted: function() {},
  methods: {}
};
</script>