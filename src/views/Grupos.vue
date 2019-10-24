<template>
  <div>
    <h3 class="text-center">Grupo de investigación</h3>
    <br />
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/addGrupos" class="nav-item nav-link">Agregar</router-link>
        </div>
      </div>
    </nav>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Codigo Colciencias</th>
          <th>Facultad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in grupos" :key="item.id_grupo">
          <td>{{ item.grupo }}</td>
          <td>{{ item.categoria }}</td>
          <td>{{ item.cod_colciencias }}</td>
          <td>{{ item.facultad }}</td>
          <td>
            <div class="btn-group" role="group">
              <router-link
                :to="{name: 'editgrupo', params: { id: item.id_grupo}}"
                class="btn btn-primary"
              >Editar</router-link>
              <button class="btn btn-danger" @click="deleteGrupo(item.id_grupo)">Eliminar</button>
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
      grupos: []
    };
  },
  created() {
    ApiService.get("/grupo").then(response => {
      this.grupos = response.data;
    });
  },
  methods: {
    deleteGrupo(id) {
      ApiService.delete(`/grupo/${id}`).then(response => {
        let i = this.grupos.map(item => item.id_grupo).indexOf(id); // find index of your object
        this.grupos.splice(i, 1);
        this.appear();
      });
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
};
</script>