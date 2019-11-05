<template>
  <div>
    <h3 class="text-center">Editar Grupo</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/grupos" class="nav-item nav-link">Grupos</router-link>
        </div>
      </div>
    </nav>
    <section class="content" >
      <div style="width: 80%; margin: 0 auto;">
        <form role="form">
          <div class="card-body">
            <div class="form-group">
              <label for="exampleInputEmail1">Nombre</label>              
              <input type="text" class="form-control" v-model="grupo.grupo" placeholder="Nombre grupo" />
            </div>
            <div class="form-group">
              <label>Código colciencias</label>
              <input type="text" class="form-control" v-model="grupo.cod_colciencias" />
            </div>
            <div class="form-group">
              <label>Vínculo</label>
              <input type="text" class="form-control" v-model="grupo.vinculo" />
            </div>
            <div class="form-group">
              <label>Categoria</label>
              <select class="form-control " required="required" style="width: 100%;" v-model="grupo.id_categoria">                
                <option v-for="option in categorias" v-bind:key="option.id_categoria" :value="option.id_categoria">
                  {{ option.categoria }}
                </option>
              </select>
            </div>
             <div class="form-group">
              <label>Facultad</label>
              <select class="form-control " style="width: 100%;" v-model="grupo.id_facultad">                
                <option v-for="facultad in facultades" v-bind:key="facultad.id_facultad" :value="facultad.id_facultad">
                  {{ facultad.facultad }}
                </option>
              </select>
            </div>
           
          </div>
          <!-- /.card-body -->

          <div class="card-footer">
            <button type="submit" @click="updateGrupo" class="btn btn-primary">Actualizar</button>
          </div>
        </form>       
      </div>
    </section>
    <!-- <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="updateGrupo">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" class="form-control" v-model="grupo.grupo" />
          </div>
          <div class="form-group">
            <label>categoria</label>
            <br />
            <select @change="onChange($event)">
              <option disabled value>Please select one</option>
              <option v-for="option in options" v-bind:key="option.value">{{ option.text }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>cod_colciencias</label>
            <input type="text" class="form-control" v-model="grupo.cod_colciencias" />
          </div>
          <div class="form-group">
            <label>Facultad</label>
            <br />
            <select @change="selectChange">
              <option disabled value>Por favor,Seleccione uno</option>
              <option v-for="item in facultades" v-bind:key="item.value">{{ item.facultad }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>
        <pre>{{$data}}</pre>
      </div>
    </div> -->
  </div>
</template>

<script>
import ApiService from "../services/api.service";

export default {
  data() {
    return {  
      categorias: [],
      facultades: [],
      grupo: {}
    };
  },

  created() {
    console.log(this.$route.params.id)
    ApiService.get(`/grupo/${this.$route.params.id}/edit`)
      .then(response => {
        this.grupo = response.data;        
      });

    ApiService.get("/categoria")
    .then(res => this.categorias = res.data)
    // .then(res2 => $('.select2').select2())

    ApiService.get("/facultad").then(response => {
      this.facultades = response.data;
    });
  },
  mounted() {
    
  },
  computed: {
   
  },
 
  methods: {    
    updateGrupo(event) {
      event.preventDefault();      
      ApiService
        .put(
          `/grupo/${this.$route.params.id}`,
          this.grupo
        )
        .then(response => {          
          this.$router.push({ name: "grupos" });
        })
        .catch(function(response) {
          alert("No se pudo crear el grupo");
        });
    },
   
  }
};
</script>