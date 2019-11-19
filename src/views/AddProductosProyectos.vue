<template>
  <div>
    <div class="container">
      <h3 class="text-center">Agregar Producto</h3>
      <nav class="nav grey lighten-4 py-4">
        <router-link to="/grupos" class="nav-item nav-link">Grupos</router-link>
      </nav>

      <section class="content">
        <div style="width: 50%; margin: 0 auto;">
          <div class="card card-success">
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="producto">producto</label>
                  <input
                    type="producto"
                    v-model="producto.producto"
                    id="producto"
                    name="producto"
                    placeholder="producto"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.producto.producto.$error }"
                  />

                  <div v-if="submitted && $v.producto.producto.$error" class="invalid-feedback">
                    <span v-if="!$v.producto.producto.required">El campo nombre es requerido</span>
                    <span
                      v-if="!$v.producto.producto.maxLength"
                    >El nombre no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="facultad">Tipo Producto</label>
                  <br />
                  <select class="custom-select browser-default" @change="selectChangeTipoProducto">
                    <option value>Por favor seleccione un Elemento</option>
                    <option
                      v-for="item in tipoProducto"
                      v-bind:key="item.value"
                      id="id_facultad"
                      name="id_facultad"
                      class="form-control"
                    >{{ item.tipo_producto }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="producto">Soporte</label>
                  <input
                    type="soporte"
                    v-model="producto.producto"
                    id="soporte"
                    name="soporte"
                    placeholder="soporte"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.producto.soporte.$error }"
                  />

                  <div v-if="submitted && $v.producto.producto.$error" class="invalid-feedback">
                    <span v-if="!$v.producto.producto.required">El campo nombre es requerido</span>
                    <span
                      v-if="!$v.producto.producto.maxLength"
                    >El nombre no debe superar los 50 caracteres</span>
                  </div>
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
      <section class="content">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <!-- /.card-header -->
              <div class="card-body">
                <table
                  id="tblproductosTabal"
                  class="table table-striped table-bordered dt-responsive nowrap"
                  style="width:100%"
                >
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Tipo</th>
                      <th>vinculo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in productosTabal" :key="item.id_producto">
                      <td>{{ item.producto }}</td>
                      <td>{{ item.tipo_producto }}</td>
                      <td>{{ item.vinculo }}</td>
                      <td style="text-align: center">
                        <div class="btn-group" role="group">
                          <router-link
                            :to="{name: 'editgrupo', params: { id: item.id_grupo}}"
                            class="btn btn-outline-primary"
                            style="margin: 2px"
                          >Editar</router-link>

                          <button
                            style="margin: 2px"
                            class="btn btn-outline-danger"
                            @click="deleteGrupo(item.id_grupo)"
                          >Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
          </div>
        </div>
      </section>
    </div>

    <pre>{{$data}}</pre>
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
      productosTabal: {},
      //Almacena como respuesta las categorias enviadas por el Api
      tipoProducto: {},
      //Almacena los datos del producto a crear
      producto: {
        producto: "",
        id_tipo_producto: ""
      },
      submitted: false
    };
  },
  created() {
    console.log(this.$route.params.id);
    ApiService.get(`/producto/proyecto/${this.$route.params.id}`)
      .then(response => {
        this.productosTabal = response.data;
      })
      .then(ress =>
        $("#tblproductosTabal").DataTable({
          responsive: true
        })
      );
  },
  //Obtiene las falcultades una vez se llama al componente
  mounted() {
    this.getTipoProducto();
  },
  //comvierte el objeto->en un arreglo
  computed: {
    formatearTipoProducto() {
      return Object.values(this.tipoProducto);
    }
  },
  //Reglas de validacion para VueValidate
  validations: {
    producto: {
      producto: {
        required,
        maxLength: maxLength(50)
      }
    }
  },
  methods: {
    showAlertGrupoExistente() {
      this.$swal({
        type: "warning",
        text: "El grupo ya existe",
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

    /* Obtiene los tipoproductos que se cargan en un <select> */
    getTipoProducto() {
      ApiService.get("/tipoproducto").then(response => {
        this.tipoProducto = response.data;
      });
    },

    addGrupo() {
      ApiService.post("/grupo", this.grupo)
        .then(response => {
          if (response.status == 200) {
            this.showAlert();
          } else if (response.status == 400) {
            this.showAlertGrupoExistente();
          }
        })
        .then(response => this.$router.push({ name: "grupos" }))
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
      //
    },

    selectChangeTipoProducto(event) {
      var i;
      this.tipoProducto.forEach(function(element) {
        if (element.tipo_producto == event.target.value) {
          i = element.id_tipo_producto;
        }
      });
      //asigna el el id segun facultad selecionada
      this.producto.id_tipo_producto = i;
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
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.producto)); */
    }
  }
};
</script>