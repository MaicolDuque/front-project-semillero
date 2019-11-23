<template>
  <div>
    <div class="container">
      <h3 class="text-center">Añadir Soporte</h3>
      <nav class="nav grey lighten-4 py-4">
        <a @click="back" class="nav-item nav-link">Periodos</a>
      </nav>

      <section class="content">
        <div style="width: 50%; margin: 0 auto;">
          <div class="card card-success">
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="Nombre">Nombre </label>
                  <input
                    type="text"
                    v-model="soporte.soporte"
                    id="Soporte"
                    name="Soporte"
                    placeholder="Nombre"
                    class="form-control"
                  />
                  <label for="Nombre">Vinculo</label>
                  <input
                    type="text"
                    v-model="soporte.vinculo"
                    id="Vinculo"
                    name="Vinculo"
                    placeholder="Vinculo"
                    class="form-control"
                  />
                  <br>
                  <div class="form-group">
                    <button class="btn btn-outline-success">Guardar</button>
                  </div>
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
import { required, email, minLength } from "vuelidate/lib/validators";
import ApiService from "../services/api.service";

export default {
  data() {
    return {
      soporte: {
        soporte: "",
        vinculo:"",
        /*  responsable: "",
        recursos: "",
        registro: "",
        estado: "", */
        id_producto: this.$route.params.id
      },
      /* id_actividad: 0, */
      /* mesesSelected: [],
      periodo: {}, */

    };
  },
  created() {
    ApiService.get(`/producto/${this.$route.params.id}`).then(response => {
      this.producto = response.data[0];
    });
    console.log(this.$route.params.id)
  },
  //Obtiene las tipos de usuarios una vez se llama al componente
  mounted() {},
  //comvierte el objeto->en un arreglo
  computed: {},
  computed: {
    /*  mesesPeriodo() {
      if (this.periodo.periodo) {
        let idPeriodo = this.periodo.periodo.split("-")[1];
        if (idPeriodo == "1") {
          return this.meses1;
        }
        return this.meses2;
      }
    },

    objectMesesSelected() {
      return this.mesesSelected.map(mes => {
        return {
          id_actividad: this.id_actividad,
          id_mes: mes
        };
      });
    } */
  },

  //Reglas de validacion para VueValidate

  methods: {
    back() {
      this.$router.go(-1);
    },
    handleSubmit(e) {
      console.log(this.soporte.id_producto);
      ApiService.post("/soporte", this.soporte)
        .then(id => {
          alert("Soporte creado");
          this.back();
        })
        .catch(function(response) {
          alert("No se pudo crear el soporte");
        });
    },
    onChange(e) {}

    /* logica de enviar api de creacion de usuario y asignacion de grupo */

    //this.addUsuario();
    /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.usuario)); */
  }
};
</script>