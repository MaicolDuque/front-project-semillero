<template>
  <div style="padding:25px" class="container">
    <nav class="nav grey lighten-4 py-4">
      <a @click="back" class="nav-item nav-link">Atras</a>
    </nav>
    <div style="text-align: right; padding: 14px 1px;">
      <a @click="addSoporte" tag="button" class="btn btn-outline-success">Agregar</a>
    </div>
    <section class="card card-success card-outline">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <h3 class="text-center">Soportes</h3>
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
                <div class="table-responsive">
                  <table
                    id="tblSoportes"
                    class="table table-bordered table-hover"
                    style="width: 100%"
                  >
                    <thead>
                      <tr>
                        <th data-priority="1">Soporte</th>
                        <th data-priority="3">Vinculo</th>
                        <th data-priority="2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in soportes" :key="item.id_soporte">
                        <td>{{ item.soporte }}</td>
                        <td>
                          <a :href="item.vinculo" target="_blank">Ruta</a>
                        </td>
                        <td>
                          <div class="btn-group" role="group">
                            <router-link
                              :to="{name: 'editar-soporte', params: {id: item.id_soporte}}"
                              class="btn btn-outline-primary"
                              style="margin: 2px"
                            >Editar</router-link>
                            <button
                              style="margin: 2px"
                              class="btn btn-outline-danger"
                              @click="deleteSoporte(item.id_soporte)"
                            >Eliminar</button>
                            <!-- <button
                            class="btn btn-warning"
                            @click="verSoportes(item.id_soporte)"
                            >Ver soportes</button>-->
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
export default {
  data() {
    return {
      loading: true,
      errored: false,
      soportes: []
    };
  },
  created() {
    console.log(this.$route.params.id);
    ApiService.get(`/soporte/${this.$route.params.id}`)
      .then(response => {
        if (response.status === 204) {
          this.$swal({
            type: "info",
            text: "No hay soportes para mostrar",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
          this.soportes = response.data;
        } else {
          this.soportes = response.data;
        }
      })
      .then(res => {
        $("#tblSoportes").DataTable({
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
    back() {
      this.$router.go(-1);
    },
    addSoporte() {
      console.log(this.$route.params.id);
      this.$router.push({
        name: "agregar-soporte",
        id: this.$route.params.id
      });
    },
    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro creado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    deleteSoporte(id) {
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
          ApiService.delete(`/soporte/${id}`)
            .then(response => {
              if (response.status === 200) {
                let i = this.soportes.map(item => item.id_soporte).indexOf(id); // find index of your object
                this.soportes.splice(i, 1);
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
    }
  }
  /* computed:{
    verSoportes(id) {
      this.$router.push({
        name: "soportesP",
        params: { id: id }
      });
    }
  } */
};
</script>