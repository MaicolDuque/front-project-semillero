<template>
  <div style="padding:25px">
    <h3 class="text-center">Grupos de investigación</h3>
    <br />
    <nav class="nav justify-content-end grey lighten-4 py-4">
      <router-link style="color: #008000" to="/addGrupos" tag="button">Agregar</router-link>
    </nav>
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
                          class="btn btn-primary"
                        >Editar</router-link>

                        <button class="btn btn-danger" @click="deleteGrupo(item.id_grupo)">Eliminar</button>
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
        this.grupos = response.data;
      })
      .then(res => {
        $("#tblGrupos").DataTable({
          responsive: true
        });
      });
  },
  mounted: function() {},
  methods: {
    deleteGrupo(id) {
      this.$swal({
        title: "Estas seguro de eliminar el registro?",
        text: "You won't be able to revert this!",
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