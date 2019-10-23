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

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in directores" :key="item.id_usuario">
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
                :to="{name: 'editdirector', params: { id: item.id_usuario}}"
                class="btn btn-primary"
              >Editar</router-link>
              <button class="btn btn-danger" @click="deleteDirector(item.id_usuario)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      directores: []
    };
  },
  created() {
    this.axios.get("http://127.0.0.1:8000/api/usuario").then(response => {
      this.directores = response.data;
    });
  },
  methods: {
    deleteDirector(id) {
      this.axios
        .delete(`http://127.0.0.1:8000/api/usuario/${id}`)
        .then(response => {
          let i = this.directores.map(item => item.id_usuario).indexOf(id); // find index of your object
          this.directores.splice(i, 1);
        });
    }
  }
};
</script>