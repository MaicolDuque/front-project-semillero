<template>
  <div>
    <h3 class="text-center">usuarios de investigación</h3>
    <br />
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/AddUsuarioCoordinador" class="nav-item nav-link">Agregar</router-link>
        </div>
      </div>
    </nav>
    <table class="table table-bordered">
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
    ApiService.get("/usuario").then(response => {
      this.usuarios = response.data;
    });
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
};
</script>