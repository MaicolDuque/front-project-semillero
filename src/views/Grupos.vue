<template>
  <div style="padding:25px">
    <h3 class="text-center">Grupos de investigación</h3>
    <div style="text-align: right; padding: 14px 1px;">
      <router-link to="/addGrupos" tag="button" class="btn btn-outline-success">Agregar</router-link>
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
                    <th>Categoria</th>
                    <th>Codigo Colciencias</th>
                    <th>Facultad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in grupos" :key="item.id_grupo">
                    <td>{{ item.grupo }}</td>
                    <td>{{ item.categoria }}</td>
                    <td>{{ item.cod_colciencias }}</td>
                    <td>{{ item.facultad }}</td>
                    <td style="text-align: center">
                      <div class="btn-group" role="group">
                        <router-link
                          :to="{name: 'editgrupo', params: { id: item.id_grupo}}"
                          class="btn btn-outline-primary"
                          style="margin: 2px"
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
      grupos: []
    };
  },
  created() {
    ApiService.get("/grupo")
      .then(response => {
        if (response.status === 204) {
          alert("Not grupos ");
          this.grupos = response.data;
        } else {
          this.grupos = response.data;
        }
      })
      .then(res => {
        $("#tblGrupos").DataTable({
          language: {},
          responsive: true
        });
      });
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
          ApiService.delete(`/grupo/${id}`).then(response => {
            let i = this.grupos.map(item => item.id_grupo).indexOf(id); // find index of your object
            this.grupos.splice(i, 1);
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