<template>
  <div>
    <h3 class="text-center">Editar Grupo</h3>
    <nav class="nav grey lighten-4 py-4">
      <router-link to="/grupos" class="nav-item nav-link">Grupos</router-link>
    </nav>
    <section class="content">
      <div style="width: 50%; margin: 0 auto;">
        <div class="card card-success">
          <form @submit.prevent="handleSubmit" role="form">
            <div class="card-body">
              <div class="form-group">
                <label for="grupo">Grupo</label>
                <input
                  type="text"
                  v-model="grupo.grupo"
                  id="grupo"
                  name="grupo"
                  placeholder="Nombre"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.grupo.grupo.$error }"
                />
                <div
                  v-if="submitted && !$v.grupo.grupo.required"
                  class="invalid-feedback"
                >El campo grupo es requerido</div>
              </div>
              <div class="form-group">
                <label for="cod_colciencias">Codigo cod_colciencias</label>
                <input
                  type="text"
                  v-model="grupo.cod_colciencias"
                  id="cod_colciencias"
                  name="cod_colciencias"
                  class="form-control"
                  placeholder="Codigo Colciencias"
                  :class="{ 'is-invalid': submitted && $v.grupo.cod_colciencias.$error }"
                />
                <div
                  v-if="submitted && !$v.grupo.cod_colciencias.required"
                  class="invalid-feedback"
                >El campo Codigo de cod_colciencias es requerido</div>
              </div>
              <div class="form-group">
                <label for="cod_colciencias">Codigo cod_colciencias</label>
                <input
                  type="text"
                  v-model="grupo.vinculo"
                  id="vinculo"
                  name="vinculo"
                  class="form-control"
                  placeholder="Vinculo Colciencias"
                  :class="{ 'is-invalid': submitted && $v.grupo.vinculo.$error }"
                />
                <div
                  v-if="submitted && !$v.grupo.vinculo.required"
                  class="invalid-feedback"
                >El campo vinculo cod_colciencias es requerido</div>
              </div>
              <div class="form-group">
                <label>Categoria</label>
                <select
                  class="form-control"
                  required="required"
                  style="width: 100%;"
                  v-model="grupo.id_categoria"
                >
                  <option
                    v-for="option in categorias"
                    v-bind:key="option.id_categoria"
                    :value="option.id_categoria"
                  >{{ option.categoria }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Facultad</label>
                <select class="form-control" style="width: 100%;" v-model="grupo.id_facultad">
                  <option
                    v-for="facultad in facultades"
                    v-bind:key="facultad.id_facultad"
                    :value="facultad.id_facultad"
                  >{{ facultad.facultad }}</option>
                </select>
              </div>
              <div class="form-group">
                <button class="btn btn-outline-success">Actualizar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <pre>{{$data}}</pre>
    </section>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      categorias: [],
      facultades: [],
      grupo: {
        grupo: "",
        id_categoria: "",
        cod_colciencias: "",
        id_facultad: "",
        vinculo: ""
      },
      submitted: false
    };
  },

  created() {
    console.log(this.$route.params.id);
    ApiService.get(`/grupo/${this.$route.params.id}/edit`).then(response => {
      this.grupo = response.data;
    });

    ApiService.get("/categoria").then(res => (this.categorias = res.data));
    // .then(res2 => $('.select2').select2())

    ApiService.get("/facultad").then(response => {
      this.facultades = response.data;
    });
  },
  mounted() {},
  computed: {},
  //Reglas de validacion para VueValidate
  validations: {
    grupo: {
      grupo: { required },
      id_categoria: { required },
      cod_colciencias: { required },
      id_facultad: { required },
      vinculo: { required }
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
      this.updateGrupo();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.grupo)); */
    },
    /* Despliega mensaje de exito al guardar un registro */
    showAlert() {
      this.$swal({
        type: "success",
        text: "Registro Actualizado con exito",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    updateGrupo(event) {
      ApiService.put(`/grupo/${this.$route.params.id}`, this.grupo)
        .then(response => {
          this.showAlert();
          this.$router.push({ name: "grupos" });
        })
        .catch(function(response) {
          alert("No se pudo crear el grupo");
        });
    }
  }
};
</script>