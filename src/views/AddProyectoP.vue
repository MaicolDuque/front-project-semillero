<template>
  <div>
    <nav class="nav grey lighten-4 py-4"></nav>
    <section v-if="errored">
      <p>Lo sentimos, no es posible Guardar el registro en este momento</p>
    </section>
    <section class="content">
      <div style="width: 80%; margin: 0 auto;">
        <div class="card card-success">
          <a @click="back" class="nav-item nav-link">Atrás</a>
          <h3 class="text-center">Agregar Proyecto</h3>
          <form @submit.prevent="handleSubmit">
            <div class="card-body">
              <div class="form-group">
                <div class="form-group">
                  <label for="grupo">Proyecto</label>
                  <input
                    type="text"
                    pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
                    title=" Solo Letras y números. Tamaño máximo: 100"
                    v-model.trim="proyecto.proyecto"
                    id="proyecto"
                    name="proyecto"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.proyecto.proyecto.$error }"
                  />
                  <div v-if="submitted && $v.proyecto.proyecto.$error" class="invalid-feedback">
                    <span v-if="!$v.proyecto.proyecto.required">El campo requerido</span>
                    <span
                      v-if="!$v.proyecto.proyecto.maxLength"
                    >El campo no debe superar los 100 caracteres</span>
                  </div>
                </div>
                <br />
                <div class="form-group">
                  <button class="btn btn-outline-success">Guardar</button>
                </div>
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

export default {
  data() {
    return {
      submitted: false,
      errored: false,
      proyecto: {
        proyecto: "",
        id_periodo: this.$route.params.periodo
      },
      value: ""
    };
  },
  created() {
    ApiService.get(`/periodo/${this.$route.params.periodo}`).then(response => {
      this.periodo = response.data[0];
    });
  },

  //Reglas de validacion para VueValidate
  validations: {
    proyecto: {
      proyecto: {
        required,
        maxLength: maxLength(100)
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleSubmit(e) {
      this.submitted = true;
      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.addProyecto();
    },
    addProyecto() {
      ApiService.post("/proyecto", this.proyecto)
        .then(id => {
          this.$swal({
            type: "success",
            text: "Registro creado con exito",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
          this.back();
        })
        .catch(function(response) {
          this.$swal({
            type: "warning",
            text: "No se pudo crear el registro",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
        });
    },

    onChange(e) {}
  }
};
</script>