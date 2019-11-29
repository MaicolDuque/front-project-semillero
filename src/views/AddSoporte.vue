
<template>
  <div>
    <br />
    <section v-if="errored">
      <p>Lo sentimos, no es posible Actualizar el registro en este momento</p>
    </section>
    <section v-else>
      <section class="content">
        <div style="width: 80%; margin: 0 auto;">
          <div class="card card-success">
            <nav class="nav grey lighten-4 py-4">
              <a @click="back" class="nav-item nav-link">Atras</a>
            </nav>
            <h3 class="text-center">Agregar Soporte</h3>
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="semillero">Nombre</label>
                  <input
                    type="text"
                    pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
                    title=" Solo Letras y números. Tamaño máximo: 255"
                    v-model.trim="soporte.soporte"
                    id="soporte"
                    name="soporte"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.soporte.soporte.$error }"
                  />
                  <div v-if="submitted && $v.soporte.soporte.$error" class="invalid-feedback">
                    <span v-if="!$v.soporte.soporte.required">El campo es requerido</span>
                    <span
                      v-if="!$v.soporte.soporte.maxLength"
                    >El campo no debe superar los 255 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="semillero">Vinculo</label>
                  <input
                    type="text"
                    pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
                    title=" Solo Letras y números. Tamaño máximo: 255"
                    v-model.trim="soporte.vinculo"
                    id="Vinculo"
                    name="Vinculo"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.soporte.vinculo.$error }"
                  />
                  <div v-if="submitted && $v.soporte.vinculo.$error" class="invalid-feedback">
                    <span v-if="!$v.soporte.vinculo.required">El campo es requerido</span>
                    <span
                      v-if="!$v.soporte.vinculo.maxLength"
                    >El campo no debe superar los 255 caracteres</span>
                  </div>
                </div>
                <button type="submit" class="btn btn-outline-success">Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      errored: false,
      submitted: false,
      soporte: {
        soporte: "",
        vinculo: "",
        id_producto: this.$route.params.id
      }
    };
  },

  //Reglas de validacion para VueValidate
  validations: {
    soporte: {
      soporte: {
        required,
        maxLength: maxLength(255)
      },
      vinculo: { required, maxLength: maxLength(255) }
    }
  },

  methods: {
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
    addSoporte() {
      ApiService.post("/soporte", this.soporte)
        .then(response => {
          console.log(response.data);
          this.showAlert();
          this.back();
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
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

      this.addSoporte();
    },

    onChange(e) {}
  }
};
</script>