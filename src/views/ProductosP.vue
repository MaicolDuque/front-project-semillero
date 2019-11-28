<template>
  <div style="padding:25px" class="container">
    <nav class="nav grey lighten-4 py-4">
      <a @click="back" class="nav-item nav-link">Atras</a>
    </nav>
    <div style="text-align: right; padding: 14px 1px;">
      <a @click="addProducto" tag="button" class="btn btn-outline-success">Agregar</a>
    </div>
    <section class="card card-success card-outline">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <h3 class="text-center">Productos proyectos</h3>
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
                    id="tblProductoProyecto"
                    class="table table-bordered table-hover"
                    style="width: 100%"
                  >
                    <thead>
                      <tr>
                        <th data-priority="1">Nombre</th>
                        <th data-priority="3">Tipo</th>
                        <th data-priority="2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in productos" :key="item.id_producto">
                        <td>{{ item.producto }}</td>
                        <td>{{ item.tipo_producto }}</td>

                        <td>
                          <div class="btn-group" role="group">
                            <router-link
                              :to="{name: 'editar-producto', params: { id: item.id_producto}}"
                              class="btn btn-outline-primary"
                              style="margin: 2px"
                            >Editar</router-link>
                            <button
                              style="margin: 2px"
                              class="btn btn-outline-danger"
                              @click="deleteProducto(item.id_producto)"
                            >Eliminar</button>
                            <button
                              class="btn btn-outline-warning"
                              style="margin: 2px"
                              @click="verSoportes(item.id_producto)"
                            >Ver Soportes</button>
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
      productos: []
    };
  },
  created() {
    ApiService.get(`/producto/proyecto/${this.$route.params.id}`)
      .then(response => {
        if (response.status === 204) {
          this.$swal({
            type: "info",
            text: "No hay grupos para mostrar",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
          this.productos = response.data;
        } else {
          this.productos = response.data;
        }
      })
      .then(res => {
        $("#tblProductoProyecto").DataTable({
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
    back() {
      this.$router.go(-1);
    },
    addProducto() {
      console.log(this.$route.params.id);
      this.$router.push({
        name: "agregar-proyecto-producto",
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
    deleteProducto(id) {
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
          ApiService.delete(`/producto/${id}`)
            .then(response => {
              if (response.status === 200) {
                let i = this.productos
                  .map(item => item.id_producto)
                  .indexOf(id); // find index of your object
                this.productos.splice(i, 1);
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
    },
    verSoportes(id) {
      this.$router.push({
        name: "soportes",
        params: { id: id }
      });
    }
  }
};
</script>