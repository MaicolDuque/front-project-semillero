<template>
  <div>
    <h3 class="text-center">
      Agregar
      Periodo
    </h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <a @click="back" class="nav-item nav-link">Periodos</a>
        </div>
      </div>
    </nav>
    <section class="content">
      <div style="width: 50%; margin: 0 auto;">
        <div class="card card-success">
          <form @submit.prevent="handleSubmit">
            <div class="card-body">
              <div class="form-group">
                <label for="grupo">Periodo</label>
                <input
                  type="text"
                  v-model="periodo.periodo"
                  id="periodo"
                  name="periodo"
                  placeholder="Periodo"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.periodo.periodo.$error }"
                />
                <div
                  v-if="submitted && !$v.periodo.periodo.required"
                  class="invalid-feedback"
                >El campo periodo es requerido</div>
              </div>
              <div class="form-group">
                <label for="grupo">Fecha Inicio</label>
                <input
                  type="date"
                  v-model="periodo.fecha_inicio"
                  id="fecha_inicio"
                  name="fecha_inicio"
                  placeholder="fecha inicio"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.periodo.fecha_inicio.$error }"
                />
                <div
                  v-if="submitted && !$v.periodo.fecha_inicio.required"
                  class="invalid-feedback"
                >El campo fecha inicio es requerido</div>
              </div>
              <div class="form-group">
                <label for="grupo">Fecha Fin</label>
                <input
                  type="date"
                  v-model="periodo.fecha_fin"
                  id="fecha_fin"
                  name="fecha_fin"
                  placeholder="fecha_fin"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.periodo.fecha_fin.$error }"
                />
                <div
                  v-if="submitted && !$v.periodo.fecha_fin.required"
                  class="invalid-feedback"
                >El campo fecha fin es requerido</div>
              </div>
              <div class="card-footer">
                <div class="modal-footer">
                  <button id="btn_modal" type="submit" class="btn btn-outline-success">Guardar</button>
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
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      periodo: {
        periodo: "",
        fecha_inicio: "",
        fecha_fin: "",
        id_semillero: ""
      },
      submitted: false
    };
  },

  //Reglas de validacion para VueValidate
  validations: {
    periodo: {
      periodo: { required },
      fecha_inicio: { required },
      fecha_fin: { required }
    }
  },
  computed: {
    objectPeriodo() {
      return JSON.parse(`{
         
          "id_semillero": ${this.periodo.id_semillero},
          
        }`);
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
    handleSubmit(e) {
      this.submitted = true;

      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.periodo.id_semillero = this.$route.params.id;
      this.addPeriodo();
      /*  alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.objectPeriodo)); */
    },
    back() {
      this.$router.go(-1);
    },

    addPeriodo() {
      ApiService.post("/periodo", this.periodo)
        .then(response => {
          if (response.status == 200) {
            this.showAlert();
            this.back();
          } else if (response.status == 221) {
            alert("aca");
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>