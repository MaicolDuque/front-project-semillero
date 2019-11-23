<template>
  <div>
    <div class="container">      
      <nav class="nav grey lighten-4 py-4">
        <a @click="back" class="nav-item nav-link">Soportes</a>
      </nav>

      <section class="content">
        <div style="width: 70%; margin: 0 auto;">
          <div class="card card-success">
            <form @submit.prevent="handleSubmit">
              <div class="card-body"> 
                <br>
                <h3 class="text-center">Editar Soporte</h3>
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
        vinculo: "",
        /*  responsable: "",
        recursos: "",
        registro: "",
        estado: "", */
        //id_producto: this.$route.params.id
      },
      /* id_actividad: 0, */
      /* mesesSelected: [],
      periodo: {}, */

    };
  },
  created() {
    ApiService.get(`/soporte/${this.$route.params.id}/edit`).then(response => {
      this.soporte = response.data[0];
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
      console.log(this.soporte.soporte)
       ApiService.put(`/soporte/${this.$route.params.id}`, 
      {soporte: this.soporte.soporte, vinculo: this.soporte.vinculo})
        .then(response => {
          if (response.status === 200) {
           alert("Soporte actualizado correctamente");
            this.back()
          } else if (response.status === 204) {
            alert("No hay soportes");
          }
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });

      /* console.log(this.soporte.id_producto);
      ApiService.post("/soporte", this.soporte)
        .then(id => {
          alert("Soporte creado");
          this.back();
        })
        .catch(function(response) {
          alert("No se pudo crear el soporte");
        }); */
    },
    onChange(e) {}

    /* logica de enviar api de creacion de usuario y asignacion de grupo */

    //this.addUsuario();
    /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.usuario)); */
  }
};
</script>