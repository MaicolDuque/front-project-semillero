<template>
  <div style="padding:25px">
    <h3 class="text-center">Directores</h3>
    <div style="text-align: right; padding: 14px 1px;">
      <router-link to="/adduserdirector" tag="button" class="btn btn-outline-success">Agregar</router-link>
    </div>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover" style="width: 100%">
                <thead>
                  <tr>
                    <th>Documento</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Telefono</th>
                    <th>Estado</th>
                    <th>Email</th>
                    <th>Tipo usuario</th>

                    <th>Grupo</th>
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
      usuarios: []
    };
  },
  created() {
    ApiService.get("/usuario/director")
      .then(response => {
        this.usuarios = response.data;
      })
      .then(ress =>
        $("#example2").DataTable({
          responsive: true
        })
      );
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
      alert("aca");
      ApiService.delete(`/usuario/${id}`).then(response => {
        let i = this.usuarios.map(item => item.id_usuario).indexOf(id); // find index of your object
        this.usuarios.splice(i, 1);
      });
    }
  }
};
</script>