<template>
  <div>
    <nav class="nav grey lighten-4 py-4"></nav>
    <section v-if="errored">
      <p>Lo sentimos, no es posible Actualizar el registro en este momento</p>
    </section>
    <section v-else>
      <div v-if="loading">
        cargando..
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else></div>
      <section class="content">
        <div style="width: 80%; margin: 0 auto;">
          <div class="card card-success">
            <nav class="nav grey lighten-4 py-4">
              <a @click="back" class="nav-item nav-link">Proyectos</a>
            </nav>
            <h3 class="text-center">Editar Proyecto</h3>
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="grupo">Proyecto</label>
                  <input
                    type="text"
                    pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
                    v-model="proyecto.proyecto"
                    id="proyecto"
                    name="proyecto"
                    placeholder="proyecto"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.proyecto.proyecto.$error }"
                  />

                  <div v-if="submitted && $v.proyecto.proyecto.$error" class="invalid-feedback">
                    <span v-if="!$v.proyecto.proyecto.required">El campo es requerido</span>
                    <span
                      v-if="!$v.proyecto.proyecto.maxLength"
                    >El campo no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <br />
                <div class="form-group">
                  <button class="btn btn-outline-success">Actualizar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

export default {
  data() {
    return {
      loading: true,
      errored: false,
      periodo: {},
      proyecto: {
        proyecto: "",
        id_periodo: ""
      },
      submitted: false
    };
  },

  created() {
    ApiService.get(`/proyecto/${this.$route.params.id}/edit`)
      .then(response => {
        if (response.status === 204) {
          this.$swal({
            type: "info",
            text: "fallo al cargar datos del grupo",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
        } else if (response.status === 200) {
          this.proyecto = response.data;
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },

  //Reglas de validacion para VueValidate
  validations: {
    proyecto: {
      proyecto: { required }
    }
  },
  methods: {
    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro creado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    updateProyecto(event) {
      ApiService.put(`/proyecto/${this.$route.params.id}`, {
        proyecto: this.proyecto.proyecto
      })
        .then(response => {
          this.showAlert();
          this.back();
        })
        .catch(function(response) {
          alert("No se pudo crear el proyecto");
        });
    },
    back() {
      this.$router.go(-1);
    },

    //Valida el formulario
    handleSubmit(e) {
      this.submitted = true;
      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.updateProyecto();
    }
  }
};
</script>