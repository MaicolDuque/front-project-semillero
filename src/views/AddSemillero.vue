<template>
  <section class="content">
    <h3 class="text-center">Agregar Semillero</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/semilleros" class="nav-item nav-link">Semilleros</router-link>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="addSemillero">
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
            <label>Grupo de investigación</label>
            <br />
            <select @change="selectChange">
              <option disabled value>Por favor,Seleccione uno</option>
              <option v-for="item in grupos_investigación" v-bind:key="item.value">{{ item.grupo }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Agregar Semillero</button>
        </form>
      </div>
    </div>
    <pre>{{$data}}</pre>
  </section>
</template>

<script>
import ApiService from "../services/api.service";

export default {
  data() {
    return {
      semillero: {},
      grupos_investigación: {}
    };
  },
  mounted() {
    this.getGrupos();
  },
  computed: {
    formateargrupos_investigación() {
      return Object.values(this.grupos_investigación);
    }
  },
  methods: {
    getGrupos() {
      ApiService.get("/grupo").then(response => {
        this.grupos_investigación = response.data;
      });
    },
    addSemillero() {
      ApiService.post("/semillero", this.semillero)
        .then(response => this.$router.push({ name: "semilleros" }))
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
      this.appear();
    },
    onChange($event) {
      //this.grupo.categoria = event.target.value;
    },
    selectChange(event) {
      var i;
      this.grupos_investigación.forEach(function(element) {
        if (element.grupo == event.target.value) {
          i = element.id_grupo;
          alert(i);
        }
      });
      this.semillero.id_grupo = i;
    },
    appear() {
      this.$toasted.show("Agregado correctamente", {
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