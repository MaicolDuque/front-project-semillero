<template>
  <div>

    <h3 class="text-center">Editar director</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/directores" class="nav-item nav-link">Directores</router-link>
        </div>
      </div>
    </nav>
    <section class="content" >
      <div style="width: 50%; margin: 0 auto;">        
        <div class="card card-success">    
            <form @submit.prevent="updateGrupo">
              <div class="card-body">  
                <div class="form-group">
                  <label>Documento</label>
                  <input type="text" class="form-control" v-model="director.documento" />
                </div>
                <div class="form-group">
                  <label>Nombre</label>
                  <input type="text" class="form-control" v-model="director.nombre_usuario" />
                </div>
                <div class="form-group">
                  <label>Apellidos</label>
                  <input type="text" class="form-control" v-model="director.apellido_usuario" />
                </div>
                <div class="form-group">
                  <label>Correo</label>
                  <input type="text" class="form-control" v-model="director.email" />
                </div>
                <div class="form-group">
                  <label>Telefono</label>
                  <input type="text" class="form-control" v-model="director.telefono" />
                </div>
                <div class="form-group">
                  <label>Tipo usuario:</label>
                  <select class="form-control " style="width: 100%;" v-model="director.id_tipo_usuario">                
                    <option v-for="tipo in tipoUsuarios" :key="tipo.id_tipo_usuario" :value="tipo.id_tipo_usuario">
                      {{ tipo.tipo_usuario }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Rol:</label>
                  <select class="form-control " style="width: 100%;" v-model="director.id_rol">                
                    <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">
                      {{ rol.rol }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Grupo</label>
                  <select class="form-control " style="width: 100%;" v-model="director.id_grupo">                
                    <option v-for="grupo in grupos" v-bind:key="grupo.id_grupo" :value="grupo.id_grupo">
                      {{ grupo.grupo }}
                    </option>
                  </select>
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
      director: [],
      grupos: [],
      tipoUsuarios: [],
      roles: []

    };
  },
  created() {
    ApiService.get("/usuario/director")
      .then(response => {
        this.director = response.data.filter(res => res.id_usuario == this.$route.params.id)[0];        
      });
    
    ApiService.get("/grupo/disponible")
    .then(response => {
      this.grupos = response.data;  
      this.grupos.push({grupo: this.director.grupo, id_grupo: this.director.id_grupo})
    })

    ApiService.get("/tipousuario")
      .then(response => {
        this.tipoUsuarios = response.data       
    });

    ApiService.get("/rol")
      .then(response => {
        this.roles = response.data       
    });
  },
  methods: {
    updateGrupo() {
      //event.preventDefault();
      console.log(this.director)
      ApiService.put(`usuario/${this.$route.params.id}`, this.objectDirector)        
        .catch(function(response) {          
          alert("No se pudo crear el grupo");
        });

      ApiService.put(`director/${this.$route.params.id}`, {id_grupo: this.director.id_grupo})
        .then(response => {
          this.$router.push({ name: "directores" });
        })
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