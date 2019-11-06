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
    <section class="content">
      <div style="width: 50%; margin: 0 auto;">
        <div class="card card-success">
          <form role="form">
            <div class="card-body">
              <div class="card-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Nombre</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="grupo.grupo"
                    placeholder="Nombre grupo"
                  />
                </div>
                <div class="form-group">
                  <label>Código colciencias</label>
                  <input type="text" class="form-control" v-model="grupo.cod_colciencias" />
                </div>
                <div class="form-group">
                  <label>Vínculo</label>
                  <input type="text" class="form-control" v-model="grupo.vinculo" />
                </div>
                <div class="form-group">
                  <label>Categoria</label>
                  <select
                    class="form-control"
                    required="required"
                    style="width: 100%;"
                    v-model="grupo.id_categoria"
                  >
                    <option
                      v-for="option in categorias"
                      v-bind:key="option.id_categoria"
                      :value="option.id_categoria"
                    >{{ option.categoria }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Facultad</label>
                  <select class="form-control" style="width: 100%;" v-model="grupo.id_facultad">
                    <option
                      v-for="facultad in facultades"
                      v-bind:key="facultad.id_facultad"
                      :value="facultad.id_facultad"
                    >{{ facultad.facultad }}</option>
                  </select>
                </div>
              </div>
              <div class="card-footer">
                <button type="submit" @click="updateGrupo" class="btn btn-primary">Actualizar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ApiService from "../services/api.service";

export default {
  data() {
    return {
      categorias: [],
      facultades: [],
      grupo: {}
    };
  },

  created() {
    console.log(this.$route.params.id);
    ApiService.get(`/grupo/${this.$route.params.id}/edit`).then(response => {
      this.grupo = response.data;
    });

    ApiService.get("/categoria").then(res => (this.categorias = res.data));
    // .then(res2 => $('.select2').select2())

    ApiService.get("/facultad").then(response => {
      this.facultades = response.data;
    });
  },
  mounted() {},
  computed: {},

  methods: {
    /* Despliega mensaje de exito al guardar un registro */
    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro Actuakizado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    updateGrupo(event) {
      event.preventDefault();
      ApiService.put(`/grupo/${this.$route.params.id}`, this.grupo)
        .then(response => {
          this.showAlert();
          this.$router.push({ name: "grupos" });
        })
        .catch(function(response) {
          alert("No se pudo crear el grupo");
        });
    }
  }
};
</script>