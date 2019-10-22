<template>
  <div>
    <h3 class="text-center">Agregar Grupo</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/grupos" class="nav-item nav-link">Grupos</router-link>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="addGrupo">
          <div class="form-group">
            <label>grupo</label>
            <input type="text" class="form-control" v-model="grupo.grupo" />
          </div>
          <div class="form-group">
            <label>Categoria</label>
            <input type="text" class="form-control" v-model="grupo.categoria" />
          </div>
          <div class="form-group">
            <label>colciencias</label>
            <input type="text" class="form-control" v-model="grupo.cod_colciencias" />
          </div>
          <div class="form-group">
            <label>facultad</label>
            <input type="text" class="form-control" v-model="grupo.id_facultad" />
          </div>
          <button type="submit" class="btn btn-primary">Agregar Grupo</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grupo: {}
    };
  },
  methods: {
    addGrupo() {
      this.axios
        .post("http://127.0.0.1:8000/api/grupo", this.grupo)
        .then(
          response => this.$router.push({ name: "home" })
          // console.log(response.data)
        )
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
    }
  }
};
</script>