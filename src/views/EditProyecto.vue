<template>
  <div>
    <h3 class="text-center">Editar Proyecto</h3>
    <nav class="nav grey lighten-4 py-4">
      <a @click="back" class="nav-item nav-link">Proyectos</a>
    </nav>
    <section class="content">
      <div style="width: 50%; margin: 0 auto;">
        <div class="card card-success">
          <form @submit.prevent="handleSubmit">
            <div class="card-body">
              <div class="form-group">
                <label for="grupo">Proyecto</label>
                <input
                  type="text"
                  v-model="proyecto.proyecto"
                  id="proyecto"
                  name="proyecto"
                  placeholder="proyecto"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.proyecto.proyecto.$error }"
                />

                <div v-if="submitted && $v.proyecto.proyecto.$error" class="invalid-feedback">
                  <span v-if="!$v.proyecto.proyecto.required">El campo nombre es requerido</span>
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
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";
// eslint-disable-line no-use-before-define
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

export default {
  data() {
    return {
      periodo: {},
      proyecto: {
        proyecto: "",
        id_periodo: ""
      },
      submitted: false
    };
  },
  created() {
    console.log(this.$route.params.id);
    ApiService.get(`/proyecto/${this.$route.params.id}/edit`).then(response => {
      this.proyecto = response.data;
    });
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
    updateGrupo(event) {
      ApiService.put(`/proyecto/${this.$route.params.id}`, {
        proyecto: this.proyecto.proyecto
      })
        .then(response => {
          this.showAlert();
          this.$router.push({ name: "" });
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

      this.updateGrupo();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.proyecto)); */
    }
  }
};
</script>