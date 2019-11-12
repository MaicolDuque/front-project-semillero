<template>
  <div>
    <h3 class="text-center">Editar Semillero</h3>
    <nav class="nav grey lighten-4 py-4">
      <router-link to="/semilleros" class="nav-item nav-link">Semilleros</router-link>
    </nav>
    <section class="content">
      <div style="width: 50%; margin: 0 auto;">
        <div class="card card-success">
          <form @submit.prevent="handleSubmit">
            <div class="card-body">
              <div class="form-group">
                <label for="semillero">Nombre</label>
                <input
                  type="text"
                  v-model="semillero.semillero"
                  id="semillero"
                  name="semillero"
                  placeholder="Nombre"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.semillero.semillero.$error }"
                />
                <div
                  v-if="submitted && !$v.semillero.semillero.required"
                  class="invalid-feedback"
                >El campo Nombre es requerido</div>
              </div>
              <div class="form-group">
                <label for="semillero">Objetivo</label>
                <input
                  type="text"
                  v-model="semillero.objetivo"
                  id="objetivo"
                  name="objetivo"
                  placeholder="objetivo"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.semillero.objetivo.$error }"
                />
                <div
                  v-if="submitted && !$v.semillero.objetivo.required"
                  class="invalid-feedback"
                >El campo Objetivo es requerido</div>
              </div>
              <div class="form-group">
                <label for="semillero">Descripción</label>
                <input
                  type="text"
                  v-model="semillero.descripcion"
                  id="descripcion"
                  name="descripcion"
                  placeholder="descripcion"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.semillero.descripcion.$error }"
                />
                <div
                  v-if="submitted && !$v.semillero.descripcion.required"
                  class="invalid-feedback"
                >El campo descripcion es requerido</div>
              </div>
              <div class="form-group">
                <label>Grupo</label>
                <select class="form-control" style="width: 100%;" v-model="semillero.id_grupo">
                  <option
                    v-for="grupo in grupos_investigacion"
                    v-bind:key="grupo.id_grupo"
                    :value="grupo.id_grupo"
                  >{{ grupo.grupo }}</option>
                </select>
              </div>
              <button type="submit" class="btn btn-outline-success">Actualizar</button>
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
      grupos_investigacion: {},
      semillero: {
        semillero: "",
        objetivo: "",
        descripcion: "",
        id_grupo: ""
      },
      submitted: false
    };
  },

  created() {
    ApiService.get(`/semillero/${this.$route.params.id}/edit`).then(
      response => {
        this.semillero = response.data;
      }
    );
    ApiService.get("/grupo").then(response => {
      this.grupos_investigacion = response.data;
    });
  },

  //Reglas de validacion para VueValidate
  validations: {
    semillero: {
      semillero: { required },
      objetivo: { required },
      descripcion: { required },
      id_grupo: { required }
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
      this.updateSemillero();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.grupo)); */
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

    updateSemillero(event) {
      ApiService.put(`/semillero/${this.$route.params.id}`, this.semillero)
        .then(response => {
          this.showAlert();
          this.$router.push({ name: "semilleros" });
        })
        .catch(function(response) {
          alert("No se pudo crear el semillero");
        });
    }
  }
};
</script>