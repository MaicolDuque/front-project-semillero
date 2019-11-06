<template>
  <div style="padding:25px">

    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Directores</h1>
          </div>         
        </div>
      </div>
    </section>
    <h3 class="text-center">Semilleros de Investigación</h3>
    <br />
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/addsemillero" class="nav-item nav-link">Agregar</router-link>
        </div>
      </div>
    </nav>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            
            <!-- /.card-header -->
            <div class="card-body">
              <table id="semilleros" class="table table-bordered table-hover dt-responsive nowrap" style="width: 100%">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Objetivo</th>
                    <th>descripcion</th>
                    <th>grupo</th>                    
                    <th>Acciones</th>
                  </tr>
                </thead>                
                 <tbody>
                  <tr v-for="item in semilleros" :key="item.id_semillero">
                    <td>{{ item.semillero }}</td>
                    <td>{{ item.objetivo }}</td>
                    <td>{{ item.descripcion }}</td>
                    <td>{{ item.grupo }}</td>                    
                    <td>
                      <div class="btn-group" role="group">
                        <router-link
                          :to="{name: 'editsemillero', params: { id: item.id_semillero}}"
                          class="btn btn-primary">
                          Editar
                          </router-link>
                        <button class="btn btn-danger" @click="deleteSemillero(item.id_semillero)">Eliminar</button>                      
                        <router-link
                        :to="{name: 'periodos', params: { id: item.id_semillero}}"
                        class="btn btn-warning">
                        Periodos
                        </router-link>                        
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
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
      semilleros: []
    };
  },
  created() {
    ApiService.get("/semillero").then(response => {
      this.semilleros = response.data;
    })
    .then(ress => $("#semilleros").DataTable({
      responsive: true
    }))
  },
  methods: {
    deleteSemillero(id) {
      ApiService.delete(`/semillero/${id}`).then(response => {
        let i = this.semilleros.map(item => item.id_semillero).indexOf(id); // find index of your object
        this.semilleros.splice(i, 1);
      });
    }
  }
};
</script>