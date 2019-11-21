<template>
  <div>
    <div class="container">
      <h3 class="text-center">Agregar Proyecto - {{this.periodo.periodo}}</h3>
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
                  <button class="btn btn-outline-success">Guardar</button>
                </div>
              </div>
            </form>
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
      periodo: {},
      proyecto: {
        proyecto: "",
        id_periodo: ""
      },
      submitted: false
    };
  },
  created() {
    /*  ApiService.get(`/periodo/${this.$route.params.id}`).then(response => {
      this.periodo = response.data[0];
    }); */
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
    addProyecto() {
      this.proyecto.id_periodo = this.$route.params.id;
      ApiService.post("/proyecto", this.proyecto)
        .then(response => {
          if (response.status == 200) {
            this.showAlert();
            this.back();
          } else if (response.status == 400) {
            this.showAlertGrupoExistente();
          }
        })

        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
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

      this.addProyecto();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.proyecto)); */
    }
  }
};
</script>