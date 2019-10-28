<template>
  <div>
    <h3 class="text-center">coordinadores de semilleros</h3>
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
          <td>{{ item.documento }}: {{index}}</td>
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
      coordinador: {},
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
      this.coordinador.id_semillero = this.$route.params.id_semillero;
      alert("id_grupo:" + this.coordinador.id_semillero);

      //let i = this.usuarios.map(item => item.id_usuario).indexOf(id);
      this.coordinador.id_usuario = item.id_usuario;
      alert("id_usuario:" + this.coordinador.id_usuario);

      ApiService.post("/director", this.coordinador)
        .then(
          response => this.$router.push({ name: "" })
          // console.log(response.data)
        )
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
    },
    addUsuario() {
      this.usuario.id_rol = 2;
      ApiService.post("/coordinador", this.coordianador)
        .then(
          response => this.$router.push({ name: "coordinadores" })
          // console.log(response.data)
        )
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
    }
  },
  appear() {
    this.$toasted.show("asiganado correctamente", {
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