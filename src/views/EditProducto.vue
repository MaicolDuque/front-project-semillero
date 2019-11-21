<template>
  <div>
    <h3 class="text-center">Editar Producto</h3>
    <nav class="nav grey lighten-4 py-4">
      <a @click="back" class="nav-item nav-link">Atras</a>
    </nav>
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
        <div style="width: 50%; margin: 0 auto;">
          <div class="card card-success">
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="semillero">Nombre</label>
                  <input
                    type="text"
                    pattern="[A-Za-z0-9 ]+"
                    title=" Solo Letras y números. Tamaño máximo: 50"
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
                    >El campo no debe superar los 50 caracteres</span>
                    <span v-if="!$v.producto.producto === ''">El campo</span>
                  </div>
                </div>
                
                <div class="form-group">
                  <label>Tipo Producto</label>
                  <select class="form-control" style="width: 100%;" v-model="producto.id_tipo_producto">
                    <option
                      v-for="producto in tipoProductos"
                      v-bind:key="producto.id_tipo_producto"
                      :value="producto.id_tipo_producto"
                    >{{ producto.tipo_producto }}</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-outline-success">Actualizar</button>
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
      semillero: {
        semillero: "",
        objetivo: "",
        descripcion: "",
        id_grupo: ""
      },
      submitted: false,
      producto: {}
    };
  },

  created() {
    ApiService.get(`/producto/${this.$route.params.id}`)
      .then(response => {
        if (response.status === 204) {
          alert("No se encontro un semillero  ");
        } else if (response.status === 200) {
          this.producto = response.data[0];
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    //
    ApiService.get("/tipoproducto")
      .then(response => {
        this.tipoProductos = response.data;
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
        maxLength: maxLength(50)
      },
      id_tipo_producto: { required, maxLength: maxLength(200) }
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
      this.updateProducto();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.grupo)); */
    },
    
    back() {
      this.$router.go(-1);
    },

    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro Actualizado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    },

    updateProducto(event) {
      ApiService.put(`/producto/${this.$route.params.id}`, 
      {producto: this.producto.producto, id_tipo_producto: this.producto.id_tipo_producto})
        .then(response => {
          if (response.status === 200) {
            this.showAlert();
            this.back()
          } else if (response.status === 204) {
            alert("este semillero no existe");
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