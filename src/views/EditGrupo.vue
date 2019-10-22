<template>
  <div>
    <h3 class="text-center">Editar Grupo</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/grupos" class="nav-item nav-link">Grupos</router-link>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="updateGrupo">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" v-model="grupo.grupo" />
          </div>
          <div class="form-group">
            <label>categoria</label>
            <input type="text" class="form-control" v-model="grupo.categoria" />
          </div>
          <div class="form-group">
            <label>cod_colciencias</label>
            <input type="text" class="form-control" v-model="grupo.cod_colciencias" />
          </div>
          <div class="form-group">
            <label>id_facultad</label>
            <input type="text" class="form-control" v-model="grupo.id_facultad" />
          </div>

          <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>
        <h1>{{$data}}</h1>
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
  created() {
    this.axios
      .get(`http://127.0.0.1:8000/api/grupo/${this.$route.params.id}/edit`)
      .then(response => {
        this.grupo = response.data;
        console.log(this.grupo);
      });
  },
  methods: {
    updateGrupo() {
      //event.preventDefault();
      this.axios
        .patch(
          `http://127.0.0.1:8000/api/grupo/${this.$route.params.id}`,
          this.grupo
        )
        .then(response => {
          this.$router.push({ name: "home" });
        })
        .catch(function(response) {
          alert("No se pudo crear el grupo");
        });
    }
  }
};
</script>