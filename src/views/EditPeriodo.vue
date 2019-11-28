<template>
  <div>
    <br />
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
        <div style="width: 80%; margin: 0 auto;">
          <div class="card card-success">
            <h3 class="text-center">Editar Periodo</h3>
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <div class="active">
                    <a @click="back" class="nav-item nav-link">Periodos</a>
                  </div>
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
                  <button type="submit" class="btn btn-outline-success">Actualizar</button>
                </div>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      loading: true,
      errored: false,
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
    ApiService.get(`/periodo/${this.$route.params.id}/edit`)
      .then(response => {
        if (response.status === 204) {
          this.$swal({
            type: "info",
            text: "fallo al cargar datos del periodo",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
        } else if (response.status === 200) {
          this.periodo = response.data;
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  //Reglas de validacion para VueValidate
  validations: {
    periodo: {
      periodo: { required },
      fecha_inicio: { required },
      fecha_fin: { required }
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
    },
    back() {
      this.$router.go(-1);
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
    updatePeriodo() {
      ApiService.put(`periodo/${this.$route.params.id}`, this.periodo)
        .then(response => {
          if (response.status === 200) {
            this.showAlert();
            this.back();
          } else if (response.status === 204) {
            this.$swal({
              type: "warning",
              text: "el periodo no existe",
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false
            });
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