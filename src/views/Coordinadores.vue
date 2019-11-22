<template>
  <div style="padding:25px">
    <h3 class="text-center">Coordinadores</h3>
    <div style="text-align: right; padding: 14px 1px;">
      <router-link to="/addcoordinador" tag="button" class="btn btn-outline-success">Agregar</router-link>
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
                  id="coordinadores"
                  class="table table-bordered table-hover"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Telefono</th>
                      <th>Estado</th>
                      <th>Email</th>
                      <th>Tipo usuario</th>
                      <!-- <th>Rol</th> -->
                      <th>Semillero</th>
                      <th data-priority="2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in usuarios" :key="item.id_usuario">
                      <td>{{ item.documento }}</td>
                      <td>{{ item.nombre_usuario }}</td>
                      <td>{{ item.apellido_usuario }}</td>
                      <td>{{ item.telefono }}</td>
                      <td>{{ item.estado }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.tipo_usuario }}</td>
                      <!--  <td>{{ item.rol }}</td> -->
                      <td>{{ item.semillero }}</td>
                      <td>
                        <div class="btn-group" role="group">
                          <router-link
                            :to="{name: 'editcoordinador', params: { id: item.id_usuario}}"
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
    let user = JSON.parse(localStorage.user)
    console.log(user.id_usuario)
    ApiService.get(`/usuario/coordinador/${user.id_usuario}`)
      .then(response => {
        console.log(response.status)
        console.log(response.data)
        if (response.status === 204) {
          alert("No existen Coordinadores para mostrar para mostrar");
          this.usuarios = response.data;
        } else {
          this.usuarios = response.data;
        }
      })
      .then(res => {
        $("#coordinadores").DataTable({
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
    deleteDirector(id) {
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
    /* deleteDirector(id) {
      ApiService.delete(`/usuario/${id}`).then(response => {
        let i = this.usuarios.map(item => item.id_usuario).indexOf(id); // find index of your object
        this.usuarios.splice(i, 1);
      });
    } */
  }
};
</script>