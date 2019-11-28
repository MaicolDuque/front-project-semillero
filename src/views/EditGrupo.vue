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
            <router-link to="/grupos" class="nav-item nav-link">Grupos</router-link>
            <h3 class="text-center">Editar Grupo</h3>
            <form @submit.prevent="handleSubmit" role="form">
              <div class="card-body">
                <div class="form-group">
                  <label for="grupo">Grupo</label>
                  <input
                    type="text"
                    pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
                    title=" Solo Letras y números. Tamaño máximo: 50"
                    v-model.trim="grupo.grupo"
                    id="grupo"
                    name="grupo"
                    placeholder="Nombre"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.grupo.grupo.$error }"
                  />
                  <div v-if="submitted && $v.grupo.grupo.$error" class="invalid-feedback">
                    <span v-if="!$v.grupo.grupo.required">El campo es requerido</span>
                    <span
                      v-if="!$v.grupo.grupo.maxLength"
                    >El campo no debe superar los 50 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="siglas">Siglas</label>
                  <input
                    type="text"
                    pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
                    title=" Solo Letras y números. Tamaño máximo: 10"
                    v-model.trim="grupo.siglas"
                    id="siglas"
                    name="siglas"
                    placeholder="Siglas"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.grupo.siglas.$error }"
                  />
                  <div v-if="submitted && $v.grupo.siglas.$error" class="invalid-feedback">
                    <span v-if="!$v.grupo.siglas.required">El campo es requerido</span>
                    <span
                      v-if="!$v.grupo.siglas.maxLength"
                    >El campo no debe superar los 10 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="cod_colciencias">Código Colciencias</label>
                  <input
                    type="text"
                    pattern="[-a-zA-Z0-9~:,¨áéíóúÁÉÍÓÚ&amp;*_=+' ]+"
                    title=" Solo Letras y números. Tamaño máximo: 10 caracteres"
                    v-model.trim="grupo.cod_colciencias"
                    id="cod_colciencias"
                    name="cod_colciencias"
                    class="form-control"
                    placeholder="Código Colciencias"
                    :class="{ 'is-invalid': submitted && $v.grupo.cod_colciencias.$error }"
                  />
                  <div v-if="submitted && $v.grupo.cod_colciencias.$error" class="invalid-feedback">
                    <span v-if="!$v.grupo.cod_colciencias.required">El campo es requerido</span>
                    <span
                      v-if="!$v.grupo.cod_colciencias.maxLength"
                    >El campo no debe superar los 10 caracteres</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="vinculo">Vinculo Codigo Colciencias</label>
                  <input
                    type="text"
                    pattern="[A-Za-z0-9 ./ ? = @  :]+"
                    title=" Solo Letras, números,punto, '/' Tamaño máximo: 150 caracteres"
                    v-model.trim="grupo.vinculo"
                    id="vinculo"
                    name="vinculo"
                    class="form-control"
                    placeholder="Vinculo Colciencias"
                    :class="{ 'is-invalid': submitted && $v.grupo.vinculo.$error }"
                  />
                  <div v-if="submitted && $v.grupo.vinculo.$error" class="invalid-feedback">
                    <span v-if="!$v.grupo.vinculo.required">El campo es requerido</span>
                    <span
                      v-if="!$v.grupo.vinculo.maxLength"
                    >El campo no debe superar los 150 caracteres</span>
                  </div>
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
                  <div>
                    <select class="form-control" style="width: 100%;" v-model="grupo.id_facultad">
                      <option
                        v-for="facultad in facultades"
                        v-bind:key="facultad.id_facultad"
                        :value="facultad.id_facultad"
                      >{{ facultad.facultad }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-outline-success">Actualizar</button>
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
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      loading: true,
      errored: false,
      categorias: [],
      facultades: [],
      grupo: {
        grupo: "",
        siglas: "",
        id_categoria: "",
        cod_colciencias: "",
        id_facultad: "",
        vinculo: ""
      },
      submitted: false
    };
  },

  created() {
    ApiService.get(`/grupo/${this.$route.params.id}/edit`)
      .then(response => {
        if (response.status === 204) {
          this.$swal({
            type: "info",
            text: "fallo al cargar datos del grupo",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          });
        } else if (response.status === 200) {
          this.grupo = response.data;
        }
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));

    ApiService.get("/categoria")
      .then(res => (this.categorias = res.data))
      .catch(error => {
        console.log(error);
        this.errored = true;
      });

    ApiService.get("/facultad")
      .then(response => {
        this.facultades = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  },

  //Reglas de validacion para VueValidate
  validations: {
    grupo: {
      grupo: {
        required,
        maxLength: maxLength(50)
      },
      id_categoria: { required },
      cod_colciencias: { required, maxLength: maxLength(10) },
      id_facultad: { required },
      vinculo: { required, maxLength: maxLength(150) },
      siglas: { required, maxLength: maxLength(10) }
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
          if (response.status === 200) {
            this.showAlert();
            this.$router.push({ name: "grupos" });
          } else if (response.status === 204) {
            this.$swal({
              type: "warning",
              text: "el grupo no existe",
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