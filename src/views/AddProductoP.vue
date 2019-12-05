<template>
  <div>
    <br />
    <section v-if="errored">
      <p>Lo sentimos, no es posible Actualizar el registro en este momento</p>
    </section>
    <section v-else>
      <div v-if="loading">
        Cargando..
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else></div>
      <section class="content">
        <div style="width: 80%; margin: 0 auto;">
          <div class="card card-success">
            <nav class="nav grey lighten-4 py-4">
              <a @click="back" class="nav-item nav-link">Atrás</a>
            </nav>
            <h3 class="text-center">Agregar Producto Proyecto</h3>
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="semillero">Nombre</label>
                  <input
                    type="text"
                    pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
                    title=" Solo Letras y números. Tamaño máximo: 255"
                    v-model.trim="producto.producto"
                    id="producto"
                    name="producto"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.producto.producto.$error }"
                  />
                  <div v-if="submitted && $v.producto.producto.$error" class="invalid-feedback">
                    <span v-if="!$v.producto.producto.required">El campo es requerido</span>
                    <span
                      v-if="!$v.producto.producto.maxLength"
                    >El campo no debe superar los 255 caracteres</span>
                  </div>
                </div>

                <div class="form-group">
                  <label>Tipo Producto</label>
                  <select
                    class="form-control"
                    style="width: 100%;"
                    required
                    v-model="producto.id_tipo_producto"
                  >
                    <option value>Por favor seleccione un Elemento</option>
                    <option
                      v-for="producto in tipoProductos"
                      v-bind:key="producto.id_tipo_producto"
                      :value="producto.id_tipo_producto"
                    >{{ producto.tipo_producto }}</option>
                  </select>
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
      loading: true,
      errored: false,
      tipoProductos: {},
      submitted: false,
      producto: {
        producto: "",
        id_tipo_producto: 0,
        id_proyecto: this.$route.params.id
      }
    };
  },

  created() {
    //
    ApiService.get("/tipoproducto")
      .then(response => {
        this.tipoProductos = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  },

  //Reglas de validacion para VueValidate
  validations: {
    producto: {
      producto: {
        required,
        maxLength: maxLength(255)
      },
      id_tipo_producto: { required }
    }
  },

  methods: {
    handleSubmit(e) {
      this.submitted = true;
      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.addProductoP();
    },

    back() {
      this.$router.go(-1);
    },

    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro agregado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    },

    addProductoP(event) {
      ApiService.post(`/producto/proyecto`, this.producto)
        .then(response => {
          if (response.status == 200) {
            this.showAlert();
            this.back();
          } else if (response.status == 221) {
            this.showAlertGrupoExistente();
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    }
  }
};
</script>