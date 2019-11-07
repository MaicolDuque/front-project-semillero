<template>
  <div>

    <h3 class="text-center">Editar Periodo</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <a @click="back" class="nav-item nav-link">Periodos</a>
        </div>
      </div>
    </nav>
    <section class="content" >
      <div style="width: 50%; margin: 0 auto;">        
        <div class="card card-success">    
            <form @submit.prevent="updatePeriodo">
              <div class="card-body">  
                <div class="form-group">
                  <label>Periodo</label>
                  <input type="text" class="form-control" v-model="periodo.periodo" />
                </div>
                <div class="form-group">
                  <label>Fecha Inicio</label>
                  <input type="date" class="form-control" v-model="periodo.fecha_inicio" />
                </div>
                <div class="form-group">
                  <label>Fecha Fin</label>
                  <input type="date" class="form-control" v-model="periodo.fecha_fin" />
                </div>                
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Actualizar</button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ApiService from "../services/api.service";


export default {
  data() {
    return {
      periodo: {},    
    };
  },
  created() {
     ApiService.get(`/periodo/${this.$route.params.id}`)
      .then(response => {
        this.periodo = response.data[0];
      })
    
  },
  methods: {
    back(){
      this.$router.go(-1)
    },

    updatePeriodo(){
      
      ApiService.put(`periodo/${this.$route.params.id}`, this.periodo)
        .then(response => {
          this.$router.push({name: 'periodos', params: { id: this.$route.params.id}})
        })
        .catch(function(response) {          
          alert("No se pudo actualizar el periodo");
        });
    }
  },

  computed: {
    objectDirector(){      
        return  JSON.parse(`{
          "documento":        "${this.director.documento}",
          "nombre_usuario":   "${this.director.nombre_usuario}",
          "estado":           ${this.director.estado},
          "apellido_usuario": "${this.director.apellido_usuario}",
          "telefono":         "${this.director.telefono}",
          "email":            "${this.director.email}",
          "id_rol":           ${this.director.id_rol},
          "id_tipo_usuario":  ${this.director.id_tipo_usuario}
        }`)
    }
  }
};
</script>