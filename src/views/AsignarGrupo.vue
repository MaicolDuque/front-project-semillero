<template>
  <div>
    <h3 class="text-center">Directores de investigación</h3>
    <br />
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/addDirector" class="nav-item nav-link">Agregar</router-link>
        </div>
        <li class="list-group-item">
          <input type="text" placeholder="Buscar" class="form-control" v-model="name" />
        </li>
      </div>
    </nav>
    <div class="row">
      <div class="col-sm-4">
        <button v-on:click="getUsers" class="btn btn-primary">Listar</button>
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="item in searchUser"
            :key="item.id_usuario"
          >{{ item.nombre_usuario }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
export default {
  data() {
    return {
      directores: []
    };
  },
  /* created() {
    ApiService.get("/usuario").then(response => {
      this.directores = response.data;
    });
  }, */
  methods: {
    deleteDirector(id) {
      ApiService.delete(`/usuario/${id}`).then(response => {
        let i = this.directores.map(item => item.id_usuario).indexOf(id); // find index of your object
        this.directores.splice(i, 1);
        this.appear();
      });
    },
    getUsers: function() {
      ApiService.get("/usuario").then(response => {
        this.directores = response.data;
      });
    }
  },
  computed: {
    searchUser: function() {
      return this.directores.filter(item =>
        item.nombre_usuario.includes(this.name)
      );
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