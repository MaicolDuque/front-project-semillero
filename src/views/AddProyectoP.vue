<template>
  <div>
    <div class="container">
      <h3 class="text-center">Agregar Proyecto</h3>
      <nav class="nav grey lighten-4 py-4">
        <a @click="back" class="nav-item nav-link">Periodos</a>
      </nav>

      <section class="content">
        <div style="width: 50%; margin: 0 auto;">
          <div class="card card-success">
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="Nombre">Proyecto</label>
                  <input
                    type="text"
                    v-model="proyecto.proyecto"
                    id="Proyecto"
                    name="Proyecto"
                    placeholder="Proyecto"
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
      proyecto: {
        proyecto: "",
        /*  responsable: "",
        recursos: "",
        registro: "",
        estado: "", */
        id_periodo: this.$route.params.periodo
      },
      /* id_actividad: 0, */
      /* mesesSelected: [],
      periodo: {}, */
      value: ""
    };
  },
  created() {
    ApiService.get(`/periodo/${this.$route.params.periodo}`).then(response => {
      this.periodo = response.data[0];
    });
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
      console.log("uno ");
      ApiService.post("/proyecto", this.proyecto)
        .then(id => {
          alert("Proyecto creado");
          this.back();
        })
        .catch(function(response) {
          alert("No se pudo crear el Usuario");
        });
    },
    onChange(e) {}

    /* logica de enviar api de creacion de usuario y asignacion de grupo */

    //this.addUsuario();
    /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.usuario)); */
  }
};
</script>