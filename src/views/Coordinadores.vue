<template>

  <div style="padding:25px">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Coordinadores</h1>
          </div>         
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            
            <!-- /.card-header -->
            <div class="card-body">
              <table id="coordinadores" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Documento</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Telefono</th>
                  <th>Estado</th>
                  <th>Email</th>
                  <th>Tipo usuario</th>
                  <th>Rol</th>
                  <th>Semillero</th>
                  <th>Acciones</th>
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
                    <td>{{ item.rol }}</td>
                    <td>{{ item.semillero }}</td>
                    <td>
                      <div class="btn-group" role="group">
                        <router-link
                          :to="{name: 'editdirector', params: { id: item.id_usuario}}"
                          class="btn btn-primary"
                        >Editar</router-link>
                        <button class="btn btn-danger" @click="deleteDirector(item.id_usuario)">Eliminar</button>
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
    ApiService.get("/usuario/coordinador")
    .then(response => {
      this.usuarios = response.data
    })
    .then(ress => $("#coordinadores").DataTable())
  },
  methods: {
    deleteDirector(id) {
      ApiService.delete(`/usuario/${id}`).then(response => {
        let i = this.usuarios.map(item => item.id_usuario).indexOf(id); // find index of your object
        this.usuarios.splice(i, 1);
        this.appear();
      });
    }
  },

  computed: {
    
  },
  appear() {
    this.$toasted.show("Eliminado correctamente", {
      //theme of the toast you prefer
      theme: "bubble",
      //position of the toast container
      position: "top-right",
      //display time of the toast
      duration: 2000
    });
  }
}
</script>