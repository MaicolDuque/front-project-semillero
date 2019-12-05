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
                    <a @click="back" class="nav-item nav-link">Atrás</a>
                  </div>
                  <div class="form-group">
                    <label for="periodo">Periodo académico</label>
                    <br />
                    <select
                      v-model="numero.dos"
                      class="custom-select browser-default"
                      @change="onChange($event)"
                      required
                    >
                      <option value>Por favor seleccione un Elemento</option>
                      <option
                        v-for="option in options"
                        v-bind:key="option.value"
                        class="form-control"
                      >{{ option.text }}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="estado">Año</label>
                    <br />
                    <select class="form-control" style="width: 100%;" required v-model="numero.uno">
                      <option value>Por favor seleccione un Elemento</option>
                      <option
                        v-for="ano in anos"
                        v-bind:key="ano.value"
                        class="form-control"
                      >{{ ano.text }}</option>
                    </select>
                  </div>
                  <!-- <label for="grupo">Periodo</label>
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
                  >El campo periodo es requerido</div>-->
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
      numero: {
        uno: "",
        dos: ""
      },
      year: "",
      period: "",
      options: [{ text: "1", value: "1" }, { text: " 2", value: "2" }],
      anos: [
        { text: "2019", value: "2019" },
        { text: "2020", value: "2020" },
        { text: "2021", value: "2021" },
        { text: "2022", value: "2022" },
        { text: "2023", value: "2023" },
        { text: "2024", value: "2024" },
        { text: "2025", value: "2025" },
        { text: "2026", value: "2026" },
        { text: "2027", value: "2027" },
        { text: "2028", value: "2028" },
        { text: "2029", value: "2029" },
        { text: "2030", value: "2030" },
        { text: "2031", value: "2031" }
      ],
      part: [],
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
          this.year = response.data.periodo;
          console.log(this.year);
          var dos = this.year.split("-");
          var def = dos[0];
          var def2 = dos[1];
          console.log(def);
          console.log(def2);
          this.numero.uno = def;
          this.numero.dos = def2;
          console.log("aca " + this.numero.uno);
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
      /* periodo: { required }, */
      fecha_inicio: { required },
      fecha_fin: { required }
    }
  },

  methods: {
    separar() {
      /* alert(this.periodo.periodo);
      var primero = this.periodo.periodo;

      var dos = primero.split("-"); */

      /* var uno = part.split(" "); */
      /*  var def = dos[0]; */
      console.log(this.year);
    },

    onChange($event) {
      if (event.target.value == "periodo 1") {
        this.period = 1;
      } else {
        this.period = 2;
      }
    },
    onChange2($event) {
      if (event.target.value == "2019") {
        this.year = 2019;
      } else if (event.target.value == "2020") {
        this.year = 2020;
      } else if (event.target.value == "2021") {
        this.year = 2021;
      } else if (event.target.value == "2022") {
        this.year = 2022;
      } else if (event.target.value == "2023") {
        this.year = 20230;
      } else if (event.target.value == "2024") {
        this.year = 2024;
      } else if (event.target.value == "2025") {
        this.year = 2025;
      } else if (event.target.value == "2026") {
        this.year = 2026;
      } else if (event.target.value == "2027") {
        this.year = 2027;
      } else if (event.target.value == "2028") {
        this.year = 2028;
      } else if (event.target.value == "2029") {
        this.year = 2029;
      } else if (event.target.value == "2030") {
        this.year = 2030;
      } else if (event.target.value == "2031") {
        this.year = 2031;
      }
    },
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
      this.periodo.periodo = this.numero.uno + "-" + this.numero.dos;
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