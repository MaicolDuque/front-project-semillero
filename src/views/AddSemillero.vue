<template>
  <div class="container">
    <h3 class="text-center">Agregar Semillero</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <nav class="nav grey lighten-4 py-4">
          <router-link to="/semilleros" class="nav-item nav-link">Semilleros</router-link>
        </nav>
      </div>
    </nav>
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div>
          <!-- <h2>Nuevo Grupo de Investigación</h2> -->
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="semillero">Nombre</label>
              <input
                type="text"
                pattern="[A-Za-z0-9 ]+"
                title=" Solo Letras y números. Tamaño máximo: 50"
                v-model.trim="semillero.semillero"
                id="semillero"
                name="semillero"
                placeholder="Nombre"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.semillero.semillero.$error }"
              />
              <div v-if="submitted && $v.semillero.semillero.$error" class="invalid-feedback">
                <span v-if="!$v.semillero.semillero.required">El campo es requerido</span>
                <span
                  v-if="!$v.semillero.semillero.maxLength"
                >El campo no debe superar los 50 caracteres</span>
                <span v-if="!$v.semillero.semillero === ''">El campo</span>
              </div>
            </div>
            <div class="form-group">
              <label for="objetivo">Objetivo</label>
              <input
                type="text"
                pattern="[A-Za-z0-9 ]+"
                title=" Solo Letras y números. Tamaño máximo: 200"
                v-model.trim="semillero.objetivo"
                id="objetivo"
                name="objetivo"
                placeholder="objetivo"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.semillero.objetivo.$error }"
              />
              <div v-if="submitted && $v.semillero.objetivo.$error" class="invalid-feedback">
                <span v-if="!$v.semillero.objetivo.required">El campo es requerido</span>
                <span
                  v-if="!$v.semillero.objetivo.maxLength"
                >El campo no debe superar los 200 caracteres</span>
              </div>
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción</label>
              <input
                type="text"
                pattern="[A-Za-z0-9 ]+"
                title=" Solo Letras y números. Tamaño máximo: 200"
                v-model.trim="semillero.descripcion"
                id="descripcion"
                name="descripcion"
                placeholder="descripcion"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.semillero.descripcion.$error }"
              />
              <div v-if="submitted && $v.semillero.descripcion.$error" class="invalid-feedback">
                <span v-if="!$v.semillero.descripcion.required">El campo es requerido</span>
                <span
                  v-if="!$v.semillero.descripcion.maxLength"
                >El campo no debe superar los 200 caracteres</span>
              </div>
            </div>
            <div class="form-group">
              <label for="id_grupo">Grupo Investigación</label>
              <br />
              <select class="custom-select browser-default" @change="selectChangeGrupo" required>
                <option value>Por favor seleccione un Elemento</option>
                <option
                  v-for="item in grupos_investigación"
                  v-bind:key="item.value"
                  id="id_grupo"
                  name="id_grupo"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.semillero.id_grupo.$error }"
                >{{ item.grupo }}</option>
              </select>
            </div>
            <br />
            <div class="form-group">
              <button class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";

export default {
  data() {
    return {
      //Almacena grupos
      grupos_investigación: {},
      //Almacena los datos del semillero a crear
      semillero: {
        semillero: "",
        objetivo: "",
        descripcion: "",
        id_grupo: ""
      },
      submitted: false
    };
  },
  //Obtiene las falcultades una vez se llama al componente
  mounted() {
    this.getGrupos();
  },
  //comvierte el objeto->en un arreglo
  computed: {
    formateargrupos_investigación() {
      return Object.values(this.grupos_investigación);
    }
  },

  //Reglas de validacion para VueValidate
  validations: {
    semillero: {
      semillero: {
        required,
        maxLength: maxLength(50)
      },
      objetivo: { required, maxLength: maxLength(200) },
      descripcion: { required, maxLength: maxLength(200) },
      id_grupo: { required }
    }
  },

  methods: {
    showAlertSemilleroExistente() {
      this.$swal({
        type: "warning",
        text: "El semillero ya existe",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
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
    getGrupos() {
      ApiService.get("/grupo").then(response => {
        this.grupos_investigación = response.data;
      });
    },

    addSemillero() {
      ApiService.post("/semillero", this.semillero)
        .then(response => {
          if (response.status == 200) {
            this.showAlert();
          } else if (response.status == 221) {
            this.showAlertSemilleroExistente();
          }
        })
        .then(response => this.$router.push({ name: "semilleros" }))
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
    },
    /*
    Cuendo se seleciona una opción del elemento <select></select>
    recore el arreglo grupos_investigacion para obtener el id de cada uno
    */
    selectChangeGrupo(event) {
      var i;
      this.grupos_investigación.forEach(function(element) {
        if (element.grupo == event.target.value) {
          i = element.id_grupo;
        }
      });
      this.semillero.id_grupo = i;
    },

    onChange($event) {
      //this.grupo.categoria = event.target.value;
    },
    //Valida el formulario
    handleSubmit(e) {
      this.submitted = true;
      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.addSemillero();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.semillero)); */
    }
  }
};
</script>