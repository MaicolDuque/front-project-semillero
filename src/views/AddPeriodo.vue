<template>
  <div>
    <h3 class="text-center">Editar Periodo</h3>
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
        <pre>{{$data}}</pre>
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
  created() {
    ApiService.get(`/periodo/${this.$route.params.id}`).then(response => {
      this.periodo = response.data[0];
    });
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
    handleSubmit(e) {
      this.submitted = true;

      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.updatePeriodo();
      /*  alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.objectPeriodo)); */
    },
    back() {
      this.$router.go(-1);
    },

    updatePeriodo() {
      ApiService.put(`periodo/${this.$route.params.id}`, this.objectPeriodo)
        .then(response => {
          this.$router.push({
            name: "periodos",
            params: { id: this.$route.params.id }
          });
        })
        .catch(function(response) {
          alert(this.periodo.id_semillero);
        });
    }
  }
};
</script>