<template>
  <div>
    <nav class="nav grey lighten-4 py-4"></nav>
    <section v-if="errored">
      <p>Lo sentimos, no es posible Guardar el registro en este momento</p>
    </section>
    <section class="content">
      <div style="width: 50%; margin: 0 auto;">
        <div class="card card-success">
          <form @submit.prevent="handleSubmit">
            <div class="card-body">
              <nav>
                <router-link to="/grupos" class="nav-item nav-link">Grupos</router-link>
              </nav>
              <h3 class="text-center">Agregar Grupo</h3>
              <div class="form-group">
                <label for="grupo">Grupo</label>
                <input
                  type="text"
                  pattern="[A-Za-z0-9_-:' á é í ú ´ ó ]+"
                  title=" Solo Letras y números. Tamaño máximo: 50"
                  v-model.trim="grupo.grupo"
                  id="grupo"
                  name="grupo"
                  placeholder="Nombre"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.grupo.grupo.$error }"
                />
                <div v-if="submitted && $v.grupo.grupo.$error" class="invalid-feedback">
                  <span v-if="!$v.grupo.grupo.required">El campo requerido</span>
                  <span v-if="!$v.grupo.grupo.maxLength">El nombre no debe superar los 50 caracteres</span>
                </div>
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
                <label for="cod_colciencias">Código Colciencias</label>
                <input
                  type="text"
                  pattern="[A-Za-z0-9 ]+"
                  title=" Solo Letras y números. Tamaño máximo: 10 caracteres"
                  v-model.trim="grupo.cod_colciencias"
                  id="cod_colciencias"
                  name="cod_colciencias"
                  class="form-control"
                  placeholder="Código Colciencias"
                  :class="{ 'is-invalid': submitted && $v.grupo.cod_colciencias.$error }"
                />
                <div v-if="submitted && $v.grupo.cod_colciencias.$error" class="invalid-feedback">
                  <span v-if="!$v.grupo.cod_colciencias.required">El campo es requerido</span>
                  <span
                    v-if="!$v.grupo.cod_colciencias.maxLength"
                  >El campo no debe superar los 10 caracteres</span>
                </div>
              </div>
              <div class="form-group">
                <label for="cod_colciencias">Vinculo Colciencias</label>
                <input
                  type="text"
                  pattern="[A-Za-z0-9:_'?./ ]+"
                  title=" Solo Letras, números,punto, '/' Tamaño máximo: 150 caracteres"
                  v-model.trim="grupo.vinculo"
                  id="vinculo"
                  name="vinculo"
                  class="form-control"
                  placeholder="Vinculo Colciencias"
                  :class="{ 'is-invalid': submitted && $v.grupo.vinculo.$error }"
                />
                <div v-if="submitted && $v.grupo.vinculo.$error" class="invalid-feedback">
                  <span v-if="!$v.grupo.vinculo.required">El campo es requerido</span>
                  <span
                    v-if="!$v.grupo.vinculo.maxLength"
                  >El nombre no debe superar los 50 caracteres</span>
                </div>
              </div>
              <div class="form-group">
                <label for="facultad">Facultad</label>
                <br />
                <select
                  class="custom-select browser-default"
                  @change="selectChangeFacultad"
                  required
                >
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
              </div>
              <br />
              <div class="form-group">
                <button class="btn btn-outline-success">Guardar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
$(function() {
  $("#datepicker").datepicker({
    dateFormat: "yy",
    changeYear: true,
    changeMonth: false
  });
});
export default {
  data() {
    return {
      errored: false,
      //Almacena como respuesta las facultadas enviadas por el Api
      facultades: {},
      //Almacena como respuesta las categorias enviadas por el Api
      categorias: {},
      //Almacena los datos del grupo a crear
      grupo: {
        grupo: "",
        id_categoria: "",
        cod_colciencias: "",
        id_facultad: "",
        vinculo: ""
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
      grupo: {
        required,
        maxLength: maxLength(50)
      },
      id_categoria: { required },
      cod_colciencias: { required, maxLength: maxLength(10) },
      id_facultad: { required },
      vinculo: { required, maxLength: maxLength(150) }
    }
  },
  methods: {
    showAlertGrupoExistente() {
      this.$swal({
        type: "error",
        title: "Oops",
        text: "El grupo ya existe",

        showCancelButton: false,
        showConfirmButton: true
      });
    },
    /* Despliega mensaje de exito al guardar un registro */
    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro creado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    },

    /* Obtiene las categorias que se cargan en un <select> */
    getCategorias() {
      ApiService.get("/categoria")
        .then(response => {
          this.categorias = response.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },
    /* Obtiene las Facultades que se cargan en un <select> */
    getFacultades() {
      ApiService.get("/facultad")
        .then(response => {
          this.facultades = response.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },
    addGrupo() {
      ApiService.post("/grupo", this.grupo)
        .then(response => {
          if (response.status == 200) {
            this.showAlert();
            this.$router.push({ name: "grupos" });
          } else if (response.status == 221) {
            this.showAlertGrupoExistente();
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
      //
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
    }
  }
};
</script>