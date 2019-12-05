<template>
  <div style="padding:25px">
    <div style="text-align: right; padding: 14px 1px;">
      <router-link to="/addcoordinador" tag="button" class="btn btn-outline-success">Agregar</router-link>
    </div>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <br />
            <h3 class="text-center">Coordinadores</h3>
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
                    id="coordinadores"
                    class="table table-bordered table-hover"
                    style="width: 100%"
                  >
                    <thead>
                      <tr>
                        <th data-priority="1">Documento</th>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        <th>Tipo usuario</th>
                        <th>Semillero</th>
                        <th data-priority="2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in usuarios" :key="item.id_usuario">
                        <td>{{ item.documento }}</td>
                        <td>{{ item.nombre_usuario }} {{ item.apellido_usuario }}</td>
                        <td>{{ item.telefono }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.tipo_usuario }}</td>
                        <td>{{ item.semillero }}</td>
                        <td>
                          <div class="btn-group" role="group">
                            <router-link
                              :to="{name: 'editcoordinador', params: { id: item.id_usuario}}"
                              class="btn btn-outline-primary"
                              style="margin: 2px"
                            >Editar</router-link>
                            <br />
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
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
export default {
  data() {
    return {
      loading: true,
      errored: false,
      usuarios: []
    };
  },
  created() {
    var bytes = CryptoJS.AES.decrypt(localStorage.user, "Key");
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    /* console.log(originalText+ "text") */
    let user = JSON.parse(originalText);
    ApiService.get(`/usuario/coordinador/${user.id_usuario}`)
      .then(response => {
        if (response.status === 204) {
          this.$swal({
            type: "info",
            text: "No hay coordinadores para mostrar",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
          this.usuarios = response.data;
        } else {
          this.usuarios = response.data;
        }
      })
      .then(res => {
        $("#coordinadores").DataTable({
          language: {
            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
          },
          responsive: false,
          retrieve: true
        });
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    deleteDirector(id) {
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
          ApiService.delete(`/coordinador/${id}`)
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
                alert("no se puedo borrar el registro");
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
};
</script>