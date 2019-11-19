<template>
  <div style="padding:25px">
    <h3 class="text-center">Semilleros de Investigación</h3>
    <div style="text-align: right; padding: 14px 1px;">
      <router-link to="/addsemillero" tag="button" class="btn btn-outline-success">Agregar</router-link>
    </div>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
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
                <table
                  id="tblsemilleros"
                  class="table table-striped table-bordered dt-responsive nowrap"
                  style="width:100%"
                >
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Objetivo</th>
                      <th>Descripción</th>
                      <th>Grupo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in semilleros" :key="item.id_semillero">
                      <td>{{ item.semillero }}</td>
                      <td>{{ item.objetivo }}</td>
                      <td>{{ item.descripcion }}</td>
                      <td>{{ item.grupo }}</td>
                      <td>
                        <div class="btn-group" role="group">
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
                          <router-link
                            :to="{name: 'periodos', params: { id: item.id_semillero}}"
                            style="margin: 2px"
                            class="btn btn-outline-warning"
                          >Periodos</router-link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <table
                id="tblGrupos"
                class="table table-striped table-bordered dt-responsive nowrap"
                style="width:100%"
              >
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Objetivo</th>
                    <th>Descripción</th>
                    <th>Grupo</th>
                    <th data-priority="2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in semilleros" :key="item.id_semillero">
                    <td>{{ item.semillero }}</td>
                    <td>{{ item.objetivo }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>{{ item.grupo }}</td>
                    <td>
                      <div class="btn-group" role="group">
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
                        <router-link
                          :to="{name: 'periodos', params: { id: item.id_semillero}}"
                          style="margin: 2px"
                          class="btn btn-outline-warning"
                        >Periodos</router-link>
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
    ApiService.get("/semillero")
      .then(response => {
        if (response.status === 204) {
          alert("No existen semilleros para mostrar ");
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
  methods: {
    deleteSemillero(id) {
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
          ApiService.delete(`/semillero/${id}`).then(response => {
            let i = this.semilleros.map(item => item.id_semillero).indexOf(id); // find index of your object
            this.semilleros.splice(i, 1);
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