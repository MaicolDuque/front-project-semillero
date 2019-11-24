<template>
  <div>
    <div class="container">
      <br />
      <section class="content">
        <div style="width: 50%; margin: 0 auto;">
          <div class="card card-success">
            <nav class="nav grey lighten-4 py-4">
              <a @click="back" class="nav-item nav-link">Periodos</a>
            </nav>
            <h3 class="text-center">Editar Actividad</h3>
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="grupo">Nombre</label>
                  <input
                    type="text"
                    pattern="[A-Za-z0-9 ]+"
                    title=" Solo Letras y números. Tamaño máximo: 50"
                    v-model.trim="actividad.actividad"
                    id="actividad"
                    name="actividad"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.actividad.actividad.$error }"
                  />
                  <div v-if="submitted && $v.actividad.actividad.$error" class="invalid-feedback">
                    <span v-if="!$v.actividad.actividad.required">El campo requerido</span>
                    <span
                      v-if="!$v.actividad.actividad.maxLength"
                    >El nombre no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="grupo">Responsable</label>
                  <input
                    type="text"
                    pattern="[A-Za-z0-9 ]+"
                    title=" Solo Letras y números. Tamaño máximo: 50"
                    v-model.trim="actividad.responsable"
                    id="responsable"
                    name="actividad"
                    placeholder="responsable"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.actividad.responsable.$error }"
                  />
                  <div v-if="submitted && $v.actividad.responsable.$error" class="invalid-feedback">
                    <span v-if="!$v.actividad.responsable.required">El campo es requerido</span>
                    <span
                      v-if="!$v.actividad.responsable.maxLength"
                    >El nombre no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="grupo">Recursos</label>
                  <input
                    type="text"
                    pattern="[A-Za-z0-9 ]+"
                    title=" Solo Letras y números. Tamaño máximo: 50"
                    v-model.trim="actividad.recursos"
                    id="actividad"
                    name="actividad"
                    placeholder="responsable"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.actividad.recursos.$error }"
                  />
                  <div v-if="submitted && $v.actividad.recursos.$error" class="invalid-feedback">
                    <span v-if="!$v.actividad.recursos.required">El campo requerido</span>
                    <span
                      v-if="!$v.actividad.recursos.maxLength"
                    >El nombre no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="grupo">Registro</label>
                  <input
                    type="text"
                    pattern="[A-Za-z0-9 ]+"
                    title=" Solo Letras y números. Tamaño máximo: 50"
                    v-model.trim="actividad.registro"
                    id="actividad"
                    name="actividad"
                    placeholder="responsable"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.actividad.registro.$error }"
                  />
                  <div v-if="submitted && $v.actividad.registro.$error" class="invalid-feedback">
                    <span v-if="!$v.actividad.registro.required">El campo requerido</span>
                    <span
                      v-if="!$v.actividad.registro.maxLength"
                    >El nombre no debe superar los 50 caracteres</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="Meses">Meses</label>
                  <div v-for="mes in mesesPeriodo" :key="mes.value">
                    <div class="custom-control custom-checkbox">
                      <input
                        class="custom-control-input"
                        type="checkbox"
                        :id="mes.name"
                        name="meses"
                        :value="mes.value"
                        v-model="mesesSelected"
                      />
                      <label :for="mes.name" class="custom-control-label">{{mes.name}}</label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="estado">Estado</label>
                  <br />
                  <select
                    class="custom-select browser-default"
                    @change="onChange($event)"
                    v-model="actividad.estado"
                    required
                  >
                    <option value>Por favor seleccione un estado</option>
                    <option
                      v-for="option in options"
                      v-bind:key="option.value"
                      class="form-control"
                    >{{ option.text }}</option>
                  </select>
                </div>
                <br />
                <div class="form-group">
                  <button class="btn btn-outline-success">Actualizar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

export default {
  data() {
    return {
      submitted: false,
      actividad: {
        actividad: "",
        responsable: "",
        recursos: "",
        registro: "",
        estado: "",
        id_periodo: this.$route.params.periodo
      },
      infoActividad: {},
      id_actividad: 0,
      mesesSelected: [],
      value: "",
      periodo: "",
      options: [
        /*  { text: " ", value: "0" }, */
        { text: "Se realizó", value: "1" },
        { text: "Se aplazó", value: "2" },
        { text: "No se realizó", value: "3" }
      ],
      /* options: [
        { text: "Activo", value: "1" },
        { text: "Inactivo", value: "0" }
      ], */
      meses1: [
        { name: "Febrero", value: 2 },
        { name: "Marzo", value: 3 },
        { name: "Abril", value: 4 },
        { name: "Mayo", value: 5 },
        { name: "Junio", value: 6 }
      ],
      meses2: [
        { name: "Agosto", value: 8 },
        { name: "Septiembre", value: 9 },
        { name: "Octubre", value: 10 },
        { name: "Noviembre", value: 11 },
        { name: "Diciembre", value: 12 }
      ]
    };
  },
  created() {
    ApiService.get(`/actividad/${this.$route.params.id}`).then(response => {
      this.actividad = {
        actividad: response.data.actividad[0].actividad,
        responsable: response.data.actividad[0].responsable,
        recursos: response.data.actividad[0].recursos,
        registro: response.data.actividad[0].registro,
        estado: response.data.actividad[0].estado,
        id_periodo: response.data.actividad[0].id_periodo
      };

      this.periodo = response.data.actividad[0].periodo;
      this.mesesSelected = response.data.meses;
    });
  },
  //Obtiene las tipos de usuarios una vez se llama al componente
  mounted() {},
  //comvierte el objeto->en un arreglo
  computed: {},
  computed: {
    mesesPeriodo() {
      if (this.periodo) {
        let idPeriodo = this.periodo.split("-")[1];
        if (idPeriodo == "1") {
          return this.meses1;
        }
        return this.meses2;
      }
    },

    objectMesesSelected() {
      return this.mesesSelected.map(mes => {
        return {
          id_actividad: this.$route.params.id,
          id_mes: mes
        };
      });
    }
  },

  //Reglas de validacion para VueValidate
  validations: {
    actividad: {
      actividad: {
        required,
        maxLength: maxLength(50)
      },
      responsable: { required },
      recursos: { required, maxLength: maxLength(10) },
      registro: { required }
    }
  },

  methods: {
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
    back() {
      this.$router.go(-1);
    },
    updateActividad() {
      ApiService.put(`/actividad/${this.$route.params.id}`, this.actividad)
        .then(id => {
          this.id_actividad = id.data;
          ApiService.put(
            `/actividadmes/${this.$route.params.id}`,
            this.objectMesesSelected
          );
        })
        .then(res => {
          this.showAlert();
          this.$router.go(-1);
        })
        .catch(function(response) {
          this.$swal({
            type: "warning",
            text: "No se pudo actualizar el registro",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
        });
    },
    handleSubmit(e) {
      this.submitted = true;

      // Se detiene aqui si es invalido, de lo contrario ejecuta el submit()
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.updateActividad();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.grupo)); */
    },
    onChange(e) {}
  }
};
</script>