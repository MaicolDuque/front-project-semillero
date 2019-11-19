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
      semilleros: []
    };
  },
  created() {
    ApiService.get("/semillero")
      .then(response => {
        this.semilleros = response.data;
      })
      .then(ress =>
        $("#semilleros").DataTable({
          responsive: true
        })
      );
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