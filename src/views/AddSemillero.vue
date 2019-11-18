<template>
  <div class="container">
    <h3 class="text-center">Agregar Semillero</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/semilleros" class="nav-item nav-link">semilleros</router-link>
        </div>
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
                v-model="semillero.semillero"
                id="semillero"
                name="semillero"
                placeholder="Nombre"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.semillero.semillero.$error }"
              />
              <div
                v-if="submitted && !$v.semillero.semillero.required"
                class="invalid-feedback"
              >El campo nombre es requerido</div>
            </div>
            <div class="form-group">
              <label for="objetivo">Objetivo</label>
              <input
                type="text"
                v-model="semillero.objetivo"
                id="objetivo"
                name="objetivo"
                placeholder="objetivo"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.semillero.objetivo.$error }"
              />
              <div
                v-if="submitted && !$v.semillero.objetivo.required"
                class="invalid-feedback"
              >El campo Objetivo es requerido</div>
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción</label>
              <input
                type="text"
                v-model="semillero.descripcion"
                id="descripcion"
                name="descripcion"
                placeholder="descripcion"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.semillero.descripcion.$error }"
              />
              <div
                v-if="submitted && !$v.semillero.descripcion.required"
                class="invalid-feedback"
              >El campo descripcion es requerido</div>
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
      semillero: { required },
      objetivo: { required },
      descripcion: { required },
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