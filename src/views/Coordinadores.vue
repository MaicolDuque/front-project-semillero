<template>
  <div>
    <h3 class="text-center">Coordinadores</h3>
    <br />
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/addcoordinador" class="nav-item nav-link">Agregar</router-link>
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
          <th>Email</th>
          <th>Tipo usuario</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Coordinador" :key="item.id_usuario">
          <td>{{ item.documento }}</td>
          <td>{{ item.nombre_usuario }}</td>
          <td>{{ item.apellido_usuario }}</td>
          <td>{{ item.telefono }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.tipo_usuario }}</td>
          <td>{{ item.rol }}</td>
          <td>
            <div class="btn-group" role="group">
              <router-link
                :to="{name: 'editcoordinador', params: { id: item.id_usuario}}"
                class="btn btn-primary"
              >Editar</router-link>
              <button class="btn btn-danger" @click="deleteCoordinador(item.id_usuario)">Eliminar</button>
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
      Coordinador: []
    };
  },
  created() {
    ApiService.get("/usuario").then(response => {
      this.Coordinador = response.data;
    });
  },
  methods: {
    deleteCoordinador(id) {
      ApiService.delete(`/usuario/${id}`).then(response => {
        let i = this.Coordinador.map(item => item.id_usuario).indexOf(id); // find index of your object
        this.Coordinador.splice(i, 1);
      });
    }
  }
};
</script>