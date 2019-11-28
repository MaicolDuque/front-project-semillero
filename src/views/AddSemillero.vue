<template>
  <div>
    <nav class="nav grey lighten-4 py-4"></nav>
    <section v-if="errored">
      <p>Lo sentimos, no es posible Guardar el registro en este momento</p>
    </section>
    <section class="content">
      <div style="width: 80%; margin: 0 auto;">
        <div class="card card-success">
          <form @submit.prevent="handleSubmit">
            <div class="card-body">
              <nav>
                <router-link to="/semilleros" class="nav-item nav-link">Semilleros</router-link>
              </nav>
              <h3 class="text-center">Agregar semillero</h3>
              <div class="form-group">
                <label for="semillero">Nombre</label>
                <input
                  type="text"
                  pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
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
                </div>
              </div>
              <div class="form-group">
                <label for="siglas">Siglas</label>
                <input
                  type="text"
                  pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
                  title=" Solo Letras y números. Tamaño máximo: 10"
                  v-model.trim="semillero.siglas"
                  id="siglas"
                  name="siglas"
                  placeholder="Siglas"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.semillero.siglas.$error }"
                />
                <div v-if="submitted && $v.semillero.siglas.$error" class="invalid-feedback">
                  <span v-if="!$v.semillero.siglas.required">El campo es requerido</span>
                  <span
                    v-if="!$v.semillero.siglas.maxLength"
                  >El campo no debe superar los 10 caracteres</span>
                </div>
              </div>
              <div class="form-group">
                <label for="objetivo">Objetivo</label>
                <input
                  type="text"
                  pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
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
                  pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
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
                    v-for="item in showGruposInvestigacion"
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
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";

export default {
  data() {
    return {
      errored: false,
      //Almacena grupos
      grupos_investigación: [],
      //Almacena los datos del semillero a crear
      semillero: {
        semillero: "",
        siglas: "",
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
    },

    showGruposInvestigacion() {
      let rol = this.$store.state.user.id_rol;
      let grupo = this.$store.state.user.id_grupo;
      if (rol > 1) {
        return this.grupos_investigación.filter(semi => semi.id_grupo == grupo);
      }
      return this.grupos_investigación;
    }
  },

  //Reglas de validacion para VueValidate
  validations: {
    semillero: {
      semillero: {
        required,
        maxLength: maxLength(100)
      },
      objetivo: { required, maxLength: maxLength(255) },
      descripcion: { required, maxLength: maxLength(255) },
      id_grupo: { required },
      siglas: { required, maxLength: maxLength(10) }
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
            this.$router.push({ name: "semilleros" });
          } else if (response.status == 221) {
            this.showAlertSemilleroExistente();
          }
        })
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
    }
  }
};
</script>