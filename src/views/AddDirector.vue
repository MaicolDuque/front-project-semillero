<template>
  <div>
    <h3 class="text-center">Agregar Director</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/Directores" class="nav-item nav-link">Directores</router-link>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="addDirector">
          <div class="form-group">
            <label>Documento</label>
            <input type="text" class="form-control" v-model="director.documento" />
          </div>
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" v-model="director.nombre_usuario" />
          </div>
          <div class="form-group">
            <label>Apellido</label>
            <input type="text" class="form-control" v-model="director.apellido_usuario" />
          </div>

          <div class="form-group">
            <label>Correo</label>
            <input type="text" class="form-control" v-model="director.email" />
          </div>
          <div class="form-group">
            <label>Telefono</label>
            <input type="text" class="form-control" v-model="director.telefono" />
          </div>

          <div class="form-group">
            <label>tipo</label>
            <input type="text" class="form-control" v-model="director.id_tipo_usuario" />
          </div>
          <div class="form-group">
            <label>Rol</label>
            <input type="text" class="form-control" v-model="director.id_rol" />
          </div>
          <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
      </div>
    </div>
    {{$data}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      director: {}
    };
  },
  methods: {
    addDirector() {
      this.axios
        .post("http://127.0.0.1:8000/api/usuario", this.director)
        .then(
          response => this.$router.push({ name: "directores" })
          // console.log(response.data)
        )
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
    }
  }
};
</script>