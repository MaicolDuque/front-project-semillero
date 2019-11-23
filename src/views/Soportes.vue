<template>
  <div style="padding:25px" class="container">
  
    <div style="text-align: right; padding: 14px 1px;">
      <a @click="addSoporte" tag="button" class="btn btn-outline-success">Agregar</a>
    </div>
    <section class="card card-primary card-outline">
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
                <table
                  id="tblexample2"
                  class="table table-bordered table-hover"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Soporte</th>
                      <th>Vinculo</th>
                      <th data-priority="2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in soportes" :key="item.id_soporte">
                      <td>{{ item.id_soporte }}</td>
                      <td>{{ item.soporte }}</td>
                      <td>
                        <a :href="item.vinculo">Ruta</a>
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
                            @click="deleteProducto(item.id_soporte)"
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
          alert("No existen soportes para mostrar ");
          this.soportes = response.data;
        } else {
          console.log(response.status);
          console.log(response.data);
          this.soportes = response.data;
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
    deleteProducto(id) {
      ApiService.delete(`/soporte/${id}`).then(response => {
        let i = this.soportes.map(item => item.id_usuario).indexOf(id); // find index of your object
        this.soportes.splice(i, 1);
        alert("Soporte eliminado correctamente!");
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