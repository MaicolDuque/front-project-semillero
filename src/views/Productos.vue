<template>
  <div style="padding:25px" class="container">
    <h3 class="text-center">Productos</h3>
    <div style="text-align: right; padding: 14px 1px;">
      <a @click="addProducto" tag="button" class="btn btn-outline-success">Agregar</a>
    </div>
    <section class="card card-primary card-outline">
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
                  id="tblexample2"
                  class="table table-bordered table-hover"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Tipo</th>                                                       
                      <th data-priority="2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in productos" :key="item.id_producto">
                      <td>{{ item.id_producto }}</td>
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
export default {
  data() {
    return {
      loading: true,
      errored: false,
      productos: []
    };
  },
  created() {
    ApiService.get(`/producto/actividad/${this.$route.params.id}`)
      .then(response => {
        if (response.status === 204) {
          alert("No existen productos para mostrar ");
          this.productos = response.data;
        } else {
          this.productos = response.data;
        }
      })
      .then(res => {
        $("#tblexample2").DataTable({
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
    addProducto(){
      this.$router.push({ name: "agregar-producto", id: this.$route.params.id });
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
      ApiService.delete(`/producto/${id}`).then(response => {
        let i = this.productos.map(item => item.id_usuario).indexOf(id); // find index of your object
        this.productos.splice(i, 1);
        alert("Producto eliminado correctamente!")      
      });
    }
  }
};
</script>