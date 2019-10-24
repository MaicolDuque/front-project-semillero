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
            <!-- <input type="text" class="form-control" v-model="grupo.categoria" /> -->
            <br />
            <select @change="onChange($event)">
              <option disabled value>Please select one</option>
              <option v-for="option in options" v-bind:key="option.value">{{ option.text }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>cod_colciencias</label>
            <input type="text" class="form-control" v-model="grupo.cod_colciencias" />
          </div>
          <div class="form-group">
            <label>Facultad</label>
            <br />
            <select @change="selectChange">
              <option disabled value>Por favor,Seleccione uno</option>
              <option v-for="item in facultades" v-bind:key="item.value">{{ item.facultad }}</option>
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
  created() {
    this.axios
      .get(`http://127.0.0.1:8000/api/grupo/${this.$route.params.id}/edit`)
      .then(response => {
        this.grupo = response.data;
        console.log(this.grupo);
      });
  },
  methods: {
    getFacultades() {
      this.axios.get("/facultad").then(response => {
        this.facultades = response.data;
      });
    },
    updateGrupo() {
      //event.preventDefault();
      this.axios
        .patch(
          `http://127.0.0.1:8000/api/grupo/${this.$route.params.id}`,
          this.grupo
        )
        .then(response => {
          this.appear();
          this.$router.push({ name: "grupos" });
        })
        .catch(function(response) {
          alert("No se pudo crear el grupo");
        });
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