<template>
  <div>
    <h3 class="text-center">Editar Semillero</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/semilleros" class="nav-item nav-link">Semilleros</router-link>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="updateSemillero">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" v-model="semillero.semillero" />
          </div>
          <div class="form-group">
            <label>Objetivo</label>
            <input type="text" class="form-control" v-model="semillero.objetivo" />
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <input type="text" class="form-control" v-model="semillero.descripcion" />
          </div>
          <div class="form-group">
            <label>Facultad</label>
            <br />
            <select @change="selectChange">
              <option disabled value>Por favor,Seleccione uno</option>
              <option v-for="item in grupos_investigacion" v-bind:key="item.value">{{ item.grupo }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>
        <pre>{{$data}}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grupos_investigacion: {},
      semillero: {}
    };
  },
  mounted() {
    this.getgrupos_investigacion();
  },
  computed: {
    formateargrupos() {
      return Object.values(this.grupos_investigacion);
    }
  },
  created() {
    this.axios
      .get(`http://127.0.0.1:8000/api/semillero/${this.$route.params.id}/edit`)
      .then(response => {
        this.semillero = response.data;
        //console.log(this.grupo);
      });
  },
  methods: {
    getgrupos_investigacion() {
      this.axios.get("/grupo").then(response => {
        this.grupos_investigacion = response.data;
      });
    },
    updateSemillero() {
      //event.preventDefault();
      this.axios
        .patch(
          `http://127.0.0.1:8000/api/semillero/${this.$route.params.id}`,
          this.semillero
        )
        .then(response => {
          this.appear();
          this.$router.push({ name: "semilleros" });
        })
        .catch(function(response) {
          alert("No se pudo crear el semillero");
        });
    },
    onChange($event) {
      //this.grupo.categoria = event.target.value;
    },
    selectChange(event) {
      /* var i;
      this.grupos_investigación.forEach(function(element) {
        if (element.grupo == event.target.value) {
          i = element.id_grupo;
          alert(i);
        }
      });
      this.semillero.id_grupo = i; */
    },
    appear() {
      this.$toasted.show("Editado correctamente", {
        //theme of the toast you prefer
        theme: "bubble",
        //position of the toast container
        position: "top-right",
        //display time of the toast
        duration: 2000
      });
    }
  }
};
</script>