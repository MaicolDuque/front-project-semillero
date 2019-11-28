<template>
  <div style="padding:25px">
    <div style="text-align: right; padding: 14px 1px;">
      <router-link to="/adduserdirector" tag="button" class="btn btn-outline-success">Agregar</router-link>
    </div>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <br />
            <h3 class="text-center">Directores</h3>
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
                  id="tblDirectores"
                  class="table table-bordered table-hover"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th data-priority="1">Nombre</th>
                      <th data-priority="7">Documento</th>
                      <th data-priority="5">Apellido</th>
                      <th data-priority="6">Telefono</th>
                      <th data-priority="4">Email</th>
                      <th data-priority="8">Tipo usuario</th>
                      <th data-priority="3">Grupo</th>
                      <th data-priority="2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in usuarios" :key="item.id_usuario">
                      <td>{{ item.nombre_usuario }}</td>
                      <td>{{ item.documento }}</td>
                      <td>{{ item.apellido_usuario }}</td>
                      <td>{{ item.telefono }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.tipo_usuario }}</td>
                      <td>{{ item.grupo }}</td>
                      <td>
                        <div class="btn-group" role="group">
                          <router-link
                            :to="{name: 'editdirector', params: { id: item.id_usuario}}"
                            class="btn btn-outline-primary"
                            style="margin: 2px"
                          >Editar</router-link>
                          <button
                            style="margin: 2px"
                            class="btn btn-outline-danger"
                            @click="deleteDirector(item.id_usuario)"
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
      usuarios: []
    };
  },
  created() {
    ApiService.get("/usuario/director")
      .then(response => {
        if (response.status === 204) {
          alert("No existen usuarios para mostrar ");
          this.usuarios = response.data;
        } else {
          this.usuarios = response.data;
        }
      })
      .then(res => {
        $("#tblDirectores").DataTable({
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
    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro creado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    deleteDirector(id) {
      this.$swal({
        title: "Estas seguro de eliminar el registro director?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar!",
        cancelButtonText: "Cancelar",
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(result => {
        if (result.value) {
          ApiService.delete(`/director/${id}`)
            .then(response => {
              if (response.status === 200) {
                let i = this.usuarios.map(item => item.id_usuario).indexOf(id); // find index of your object
                this.usuarios.splice(i, 1);
                this.$swal.fire({
                  type: "success",
                  title: "Eliminado con exito",
                  showConfirmButton: false,
                  timer: 1500
                });
              } else if (response.status === 222) {
                alert("No se pudo borrar el registro");
              }
            })
            .catch(error => {
              console.log(error);
              this.errored = true;
            });

          this.$swal("Registro Eliminado");
        } else {
          this.$swal("Accion Cancelada");
        }
      });
    }
  }
};
</script>