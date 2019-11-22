<template>
  <div>
    <h3 class="text-center">Editar Semillero</h3>
    <nav class="nav grey lighten-4 py-4">
      <router-link to="/semilleros" class="nav-item nav-link">Semilleros</router-link>
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
                    v-model.trim="semillero.semillero"
                    id="semillero"
                    name="semillero"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.semillero.semillero.$error }"
                  />
                  <div v-if="submitted && $v.semillero.semillero.$error" class="invalid-feedback">
                    <span v-if="!$v.semillero.semillero.required">El campo es requerido</span>
                    <span
                      v-if="!$v.semillero.semillero.maxLength"
                    >El campo no debe superar los 50 caracteres</span>
                    <span v-if="!$v.semillero.semillero === ''">El campo</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="semillero">Objetivo</label>
                  <input
                    type="text"
                    pattern="[A-Za-z0-9 ]+"
                    title=" Solo Letras y números. Tamaño máximo: 200"
                    v-model.trim="semillero.objetivo"
                    id="objetivo"
                    name="objetivo"
                    placeholder="objetivo"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.semillero.objetivo.$error }"
                  />
                  <div v-if="submitted && $v.semillero.objetivo.$error" class="invalid-feedback">
                    <span v-if="!$v.semillero.objetivo.required">El campo es requerido</span>
                    <span
                      v-if="!$v.semillero.objetivo.maxLength"
                    >El campo no debe superar los 200 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="semillero">Descripción</label>
                  <input
                    type="text"
                    pattern="[A-Za-z0-9 ]+"
                    title=" Solo Letras y números. Tamaño máximo: 200"
                    v-model.trim="semillero.descripcion"
                    id="descripcion"
                    name="descripcion"
                    placeholder="descripcion"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.semillero.descripcion.$error }"
                  />
                  <div v-if="submitted && $v.semillero.descripcion.$error" class="invalid-feedback">
                    <span v-if="!$v.semillero.descripcion.required">El campo es requerido</span>
                    <span
                      v-if="!$v.semillero.descripcion.maxLength"
                    >El campo no debe superar los 200 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Grupo</label>
                  <select class="form-control" style="width: 100%;" v-model="semillero.id_grupo">
                    <option
                      v-for="grupo in showGruposInvestigacion"
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
      grupos_investigacion: [],
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
    ApiService.get(`/semillero/${this.$route.params.id}/edit`)
      .then(response => {
        if (response.status === 204) {
          alert("No se encontro un semillero  ");
        } else if (response.status === 200) {
          this.semillero = response.data;
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    //
    ApiService.get("/grupo")
      .then(response => {
        this.grupos_investigacion = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  },

  //Reglas de validacion para VueValidate
  validations: {
    semillero: {
      semillero: {
        required,
        maxLength: maxLength(50)
      },
      objetivo: { required, maxLength: maxLength(200) },
      descripcion: { required, maxLength: maxLength(200) }
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
          if (response.status === 200) {
            this.showAlert();
            this.$router.push({ name: "semilleros" });
          } else if (response.status === 204) {
            alert("este semillero no existe");
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    }
  },

  computed: {
    showGruposInvestigacion(){
      if(this.grupos_investigacion){
        let rol     = this.$store.state.user.id_rol
        let grupo   = this.$store.state.user.id_grupo
        if(rol > 1){
          return  this.grupos_investigacion.filter(semi => semi.id_grupo == grupo);
        }
        return  this.grupos_investigacion
      }
    }
  }
};
</script>