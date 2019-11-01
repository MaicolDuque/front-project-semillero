<template>
  <div class="container">
    <h3 class="text-center">Agregar Grupo</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/grupos" class="nav-item nav-link">Grupos</router-link>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div>
          <!-- <h2>Nuevo Grupo de Investigación</h2> -->
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="grupo">Grupo</label>
              <input
                type="text"
                v-model="grupo.grupo"
                id="grupo"
                name="grupo"
                placeholder="Nombre"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.grupo.grupo.$error }"
              />
              <div
                v-if="submitted && !$v.grupo.grupo.required"
                class="invalid-feedback"
              >El campo grupo es requerido</div>
            </div>
            <div class="form-group">
              <label for="facultad">Categoria</label>
              <br />
              <select
                class="custom-select browser-default"
                @change="selectChangeCategoria"
                required
              >
                <option value>Por favor seleccione un Elemento</option>
                <option
                  v-for="item in categorias"
                  v-bind:key="item.value"
                  id="id_categoria"
                  name="id_categoria"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.grupo.id_categoria.$error }"
                >{{ item.categoria }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cod_colciencias">Codigo cod_colciencias</label>
              <input
                type="text"
                v-model="grupo.cod_colciencias"
                id="cod_colciencias"
                name="cod_colciencias"
                class="form-control"
                placeholder="Codigo Colciencias"
                :class="{ 'is-invalid': submitted && $v.grupo.cod_colciencias.$error }"
              />
              <div
                v-if="submitted && !$v.grupo.cod_colciencias.required"
                class="invalid-feedback"
              >El campo Codigo de cod_colciencias es requerido</div>
            </div>
            <div class="form-group">
              <label for="facultad">Facultad</label>
              <br />
              <select class="custom-select browser-default" @change="selectChangeFacultad" required>
                <option value>Por favor seleccione un Elemento</option>
                <option
                  v-for="item in facultades"
                  v-bind:key="item.value"
                  id="id_facultad"
                  name="id_facultad"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.grupo.id_facultad.$error }"
                >{{ item.facultad }}</option>
              </select>
              <!-- <div
                  class="invalid-feedback"
                  v-if="submitted && !$v.grupo.facultad.required "
              >la seleccion facultad es requerido</div>-->
            </div>
            <br />
            <div class="form-group">
              <button class="btn btn-primary">Guardar</button>
            </div>
          </form>
          <!-- <pre>{{$data}}</pre> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";

export default {
  data() {
    return {
      //Almacena como respuesta las facultadas enviadas por el Api
      facultades: {},
      //Almacena como respuesta las categorias enviadas por el Api
      categorias: {},
      //Almacena los datos del grupo a crear
      grupo: {
        grupo: "",
        id_categoria: "",
        cod_colciencias: "",
        id_facultad: ""
      },
      submitted: false
    };
  },
  //Obtiene las falcultades una vez se llama al componente
  mounted() {
    this.getFacultades();
    this.getCategorias();
  },
  //comvierte el objeto->en un arreglo
  computed: {
    formatearCategorias() {
      return Object.values(this.facultades, this.getCategorias);
    }
  },

  //Reglas de validacion para VueValidate
  validations: {
    grupo: {
      grupo: { required },
      id_categoria: { required },
      cod_colciencias: { required },
      id_facultad: { required }
    }
  },
  methods: {
    getCategorias() {
      ApiService.get("/categoria").then(response => {
        this.categorias = response.data;
      });
    },
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
    /*
    Cuendo se seleciona una opción del elemento <select></select>
    recore el arreglo facultades para obtener el id de cada una de ellas
    */
    selectChangeFacultad(event) {
      var i;
      this.facultades.forEach(function(element) {
        if (element.facultad == event.target.value) {
          i = element.id_facultad;
        }
      });
      //asigna el el id segun facultad selecionada
      this.grupo.id_facultad = i;
    },

    selectChangeCategoria(event) {
      var i;
      this.categorias.forEach(function(element) {
        if (element.categoria == event.target.value) {
          i = element.id_categoria;
        }
      });
      //asigna el el id segun facultad selecionada
      this.grupo.id_categoria = i;
    },
    //Valida el formulario
    handleSubmit(e) {
      this.submitted = true;

      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.addGrupo();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.grupo)); */
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