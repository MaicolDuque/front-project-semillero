<template>
  <div>
    <h3 class="text-center">Editar Grupo</h3>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="updateGrupo">
          <div class="form-group">
            <label>Documento</label>
            <input type="text" class="form-control" v-model="director.documento" />
          </div>
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" v-model="director.nombre_usuario" />
          </div>
          <div class="form-group">
            <label>Apellidos</label>
            <input type="text" class="form-control" v-model="director.apellido_usuario" />
          </div>
          <div class="form-group">
            <label>Correo</label>
            <input type="text" class="form-control" v-model="director.telefono" />
          </div>
          <div class="form-group">
            <label>Telefono</label>
            <input type="text" class="form-control" v-model="director.email" />
          </div>
          <div class="form-group">
            <label>Usuario</label>
            <input type="text" class="form-control" v-model="director.id_tipo_usuario" />
          </div>
          <div class="form-group">
            <label>Rol</label>
            <input type="text" class="form-control" v-model="director.id_rol" />
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
      director: {}
    };
  },
  /*  created() {
    this.axios
      .get(`http://127.0.0.1:8000/api/usuario/${this.$route.params.id}/edit`)
      .then(response => {
        this.grupo = response.data;
        console.log(this.grupo);
      });
  }, */
  methods: {
    updateGrupo() {
      //event.preventDefault();
      this.axios
        .patch(
          `http://127.0.0.1:8000/api/usuario/${this.$route.params.id}`,
          this.director
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