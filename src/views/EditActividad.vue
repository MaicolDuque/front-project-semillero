<template>
  <div>
    <div class="container">
      <h3 class="text-center">Editar Actividad</h3>
      <nav class="nav grey lighten-4 py-4">
        <a @click="back" class="nav-item nav-link">Periodos</a>
      </nav>
      

      <section class="content">
        <div style="width: 50%; margin: 0 auto;">
          <div class="card card-success">
            <form @submit.prevent="handleSubmit">
              <div class="card-body">
                <div class="form-group">
                  <label for="Nombre">Nombre</label>
                  <input
                    type="text"
                    v-model="actividad.actividad"
                    id="Nombre"
                    name="Nombre"
                    placeholder="Nombre"
                    class="form-control"
                  
                  />
                  
                </div>
                <div class="form-group">
                  <label for="responsable">Responsable</label>
                  <input
                    type="text"
                    v-model="actividad.responsable"
                    id="responsable"
                    name="responsable"
                    placeholder="responsable"
                    class="form-control"
                    
                   
                  />
                  
                </div>
                <div class="form-group">
                  <label for="recursos">Recursos</label>
                  <input
                    type="text"
                    v-model="actividad.recursos"
                    id="recursos"
                    name="recursos"
                    placeholder="recursos"
                    class="form-control"
                   
                  />
                  
                </div>

                <div class="form-group">
                  <label for="registro">Registro</label>
                  <input
                    type="text"
                    v-model="actividad.registro"
                    id="registro"
                    name="registro"
                    placeholder="registro"
                    class="form-control"
                    
                  />
                  
                </div>


                <div class="form-group">
                  <label for="Meses">Meses</label>
                  <div v-for="mes in mesesPeriodo" :key="mes.value">
                    <div class="custom-control custom-checkbox">
                      <input class="custom-control-input" type="checkbox" :id="mes.name" name="meses" :value="mes.value" v-model="mesesSelected">
                      <label :for="mes.name" class="custom-control-label">{{mes.name}}</label>
                    </div>
                  </div>                  
                                
                 
                </div>
                  
                <div class="form-group">
                  <label for="estado">Estado</label>
                  <br />
                  <select class="custom-select browser-default" @change="onChange($event)" v-model="actividad.estado" required>
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
                  <button class="btn btn-primary">Guardar</button>
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
        { text: "Activo", value: "1" },
        { text: "Inactivo", value: "0" }
      ],
      meses1: [
        {name: "Febrero", value: 2},
        {name: "Marzo", value: 3},     
        {name: "Abril", value: 4},
        {name: "Mayo", value: 5},
        {name: "Junio", value: 6}
      ],
       meses2: [
        {name: "Agosto", value: 8},
        {name: "Septiembre", value: 9},     
        {name: "Octubre", value: 10},
        {name: "Noviembre", value: 11},
        {name: "Diciembre", value: 12}
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
      }
    
      this.periodo =  response.data.actividad[0].periodo
      this.mesesSelected = response.data.meses
    });
  },
  //Obtiene las tipos de usuarios una vez se llama al componente
  mounted() {
   
  },
  //comvierte el objeto->en un arreglo
  computed: {
    
  },
  computed: {    
    mesesPeriodo(){
      if(this.periodo){
        let idPeriodo = this.periodo.split('-')[1]
        if(idPeriodo == "1"){
          return this.meses1
        }
        return this.meses2
      }
    },

    objectMesesSelected(){
      return this.mesesSelected.map(mes => {
        return {
          id_actividad: this.$route.params.id,
          id_mes: mes
        }        
      })
    }
    
  },

  //Reglas de validacion para VueValidate
 
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleSubmit(e) {      
      ApiService.put(`/actividad/${this.$route.params.id}`, this.actividad)
      .then(id => {
        this.id_actividad = id.data
        ApiService.put(`/actividadmes/${this.$route.params.id}`, this.objectMesesSelected)
      })
      .then(res =>{
        this.$router.go(-1);
      })
      .catch(function(response) {
        alert("No se pudo crear el Usuario");
      });

    },
    onChange(e){

    }

      /* logica de enviar api de creacion de usuario y asignacion de grupo */

      //this.addUsuario();
      /* alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.usuario)); */
    }
  }
</script>