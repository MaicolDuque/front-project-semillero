<template>
  <section class="content">
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
            <br />
            <select @change="onChange($event)">
              <option disabled value>Please select one</option>
              <option v-for="option in options" v-bind:key="option.value">{{ option.text }}</option>
            </select>
            <!-- <span>Selected: {{ selected }}</span> -->
            <!-- <label>Categoria</label>
            <input type="text" class="form-control" v-model="grupo.categoria" />-->
          </div>
          <div class="form-group">
            <label>colciencias</label>
            <input type="text" class="form-control" v-model="grupo.cod_colciencias" />
          </div>
          <div class="form-group">
            <label>facultad</label>
            <br />
            <select @change="selectChange">
              <option disabled value>Por favor,Seleccione uno</option>
              <option v-for="item in facultades" v-bind:key="item.value">{{ item.facultad }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Agregar Grupo</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import ApiService from "../services/api.service";
export default {
  data() {
    return {
      selected: "",
      options: [
        { text: "A1", value: "1" },
        { text: "A", value: "2" },
        { text: "B", value: "3" },
        { text: "C", value: "4" },
        { text: "D", value: "5" }
      ],
      facultades: {},
      grupo: {}
    };
  },
  mounted() {
    this.getFacultades();
  },
  computed: {
    formatearFaccultades() {
      return Object.values(this.facultades);
    }
  },
  methods: {
    getFacultades() {
      ApiService.get("/facultad").then(response => {
        this.facultades = response.data;
      });
    },

    addGrupo() {
      ApiService.post("/grupo", this.grupo)
        .then(response => this.$router.push({ name: "grupos" }))
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
      this.appear();
    },
    onChange($event) {
      this.grupo.categoria = event.target.value;
    },
    selectChange(event) {
      var i;
      this.facultades.forEach(function(element) {
        if (element.facultad == event.target.value) {
          i = element.id_facultad;
        }
      });
      this.grupo.id_facultad = i;
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