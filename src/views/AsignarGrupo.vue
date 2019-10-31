<template>
  <div>
    <h3 class="text-center">Directores de investigación</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/Directores" class="nav-item nav-link">Directores</router-link>
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
          <td>{{ item.documento }}}</td>
          <td>{{ item.nombre_usuario }}</td>
          <td>{{ item.apellido_usuario }}</td>
          <td>{{ item.telefono }}</td>
          <td>{{ item.estado }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.tipo_usuario }}</td>
          <td>{{ item.rol }}</td>
          <td>
            <div class="btn-group" role="group">
              <!-- <router-link
                :to="{name: 'asignargrupo', params: { id: item.id_usuario}}"
                class="btn btn-primary"
              >Editar</router-link>-->
              <button class="btn btn-danger" @click="seleccionarDirector(item)">Seleccionar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pre>{{$data}}</pre>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
export default {
  data() {
    return {
      director: {},
      usuarios: []
    };
  },
  created() {
    ApiService.get("/usuario").then(response => {
      this.usuarios = response.data;
    });
  },
  methods: {
    seleccionarDirector: function(item) {
      this.director.id_grupo = this.$route.params.id_grupo;
      alert("id_grupo:" + this.director.id_grupo);

      //let i = this.usuarios.map(item => item.id_usuario).indexOf(id);
      this.director.id_usuario = item.id_usuario;
      alert("id_usuario:" + this.director.id_usuario);
      /* if (i == 0) {
        //i++;
        alert("id_usuario:" + i);
        this.director.id_usuario = i;
        i = 0;
      } else {
        alert("id_usuario:" + i);
        this.director.id_usuario = i;
        //i = 0;
      } */

      ApiService.post("/director", this.director)
        .then(
          response => this.$router.push({ name: "vistaDirectores" })
          // console.log(response.data)
        )
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
      /* ApiService.delete(`/grupo/${id}`).then(response => {
        let i = this.grupos.map(item => item.id_grupo).indexOf(id); // find index of your object
        this.grupos.splice(i, 1);
        this.appear();
      }); */
    },
    addUsuario() {
      this.usuario.id_rol = 2;
      ApiService.post("/director", this.director)
        .then(
          response => this.$router.push({ name: "directores" })
          // console.log(response.data)
        )
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
    }
  },
  /* computed: {
    searchUser: function() {
      return this.directores.filter(item =>
        item.nombre_usuario.includes(this.name)
      );
    }
  }, */
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