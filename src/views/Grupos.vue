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
          <th>Grupo</th>
          <th>Categoria</th>
          <th>Cod_col</th>

          <th>facultad</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in grupos" :key="item.id_grupo">
          <!-- <td>{{ item.id_grupo }}</td> -->
          <td>{{ item.grupo }}</td>
          <td>{{ item.categoria }}</td>
          <td>{{ item.cod_colciencias }}</td>
          <!-- <td>{{ item.id_facultad }}</td> -->
          <td>{{ item.facultad }}</td>
          <!--  <td>{{ item.updated_at }}</td>
          <td>{{ item.created_at }}</td>-->
          <td>
            <div class="btn-group" role="group">
              <router-link
                :to="{name: 'editgrupo', params: { id: item.id_grupo}}"
                class="btn btn-primary"
              >Edit</router-link>
              <button class="btn btn-danger" @click="deleteGrupo(item.id_grupo)">Delete</button>
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
      grupos: []
    };
  },
  created() {
    this.axios.get("http://127.0.0.1:8000/api/grupo").then(response => {
      this.grupos = response.data;
    });
  },
  methods: {
    deleteGrupo(id) {
      this.axios
        .delete(`http://127.0.0.1:8000/api/grupo/${id}`)
        .then(response => {
          let i = this.grupos.map(item => item.id_grupo).indexOf(id); // find index of your object
          this.grupos.splice(i, 1);
        });
    }
  }
};
</script>