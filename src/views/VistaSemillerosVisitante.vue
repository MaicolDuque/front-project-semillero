<template>
  <div>
    <!--Accordion wrapper-->
    <div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
      <!-- Accordion card -->
      <div class="card">
        <!-- Card header -->
        <div class="card-header" role="tab" id="headingOne1">
          <a
            data-toggle="collapse"
            data-parent="#accordionEx"
            href="#collapseOne1"
            aria-expanded="false"
            aria-controls="collapseOne1"
          >
            <h5 class="mb-0 text-success">
              Facultad Administración
              <i class="fas fa-angle-down rotate-icon text-success"></i>
            </h5>
          </a>
        </div>

        <!-- Card body -->
        <div
          id="collapseOne1"
          class="collapse show"
          role="tabpanel"
          aria-labelledby="headingOne1"
          data-parent="#accordionEx"
        >
          <div class="card-body">
            <!-- Table responsive wrapper -->
            <div class="table-responsive mx-3">
              <!--Table-->
              <div>
                <!-- <input type="text" placeholder="buscar" class="form-control" v-model="name" /> -->
              </div>
              <table
                id="tblSemilleros"
                class="table table-striped table-bordered dt-responsive nowrap"
                style="width:100%"
              >
                <thead>
                  <tr>
                    <th>Siglas</th>
                    <th>Nombre</th>
                    <th>Grupo de investigación</th>
                    <th>Coordinador</th>
                    <th>Correo</th>
                    <!-- <th>Telefono</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in searchSemillerosAdministracion" :key="item.id_grupo">
                    <!-- <td>{{ item.id_grupo }}</td> -->

                    <!--  <td>
                      <a :href="item.vinculo" target="_blank">{{item.cod_colciencias}}</a>
                    </td>-->
                    <td>
                      <router-link
                        :to="{name: 'semillero-especifico', params: { id: item.id_semillero}}"
                        style="margin: 2px"
                      >{{ item.semillero_sigla }}</router-link>
                    </td>
                    <td>{{ item.grupo_sigla }}</td>
                    <td>{{ item.nombre_usuario }} {{ item.apellido_usuario }}</td>
                    <td>{{ item.email }}</td>
                  </tr>
                </tbody>
              </table>
              <!--Table-->
            </div>
            <!-- Table responsive wrapper -->
          </div>
        </div>
      </div>
      <!-- Accordion card -->

      <!-- Accordion card -->
      <div class="card">
        <!-- Card header -->
        <div class="card-header" role="tab" id="headingTwo2">
          <a
            class="collapsed"
            data-toggle="collapse"
            data-parent="#accordionEx"
            href="#collapseTwo2"
            aria-expanded="false"
            aria-controls="collapseTwo2"
          >
            <h5 class="mb-0 text-success">
              Facultad Ciencias Agrarias
              <i class="fas fa-angle-down rotate-icon"></i>
            </h5>
          </a>
        </div>

        <!-- Card body -->
        <div
          id="collapseTwo2"
          class="collapse"
          role="tabpanel"
          aria-labelledby="headingTwo2"
          data-parent="#accordionEx"
        >
          <div class="card">
            <div class="card-body elegant-color white-text rounded-bottom">
              <div class="card-body">
                <!-- Table responsive wrapper -->
                <div class="table-responsive mx-3">
                  <!--Table-->
                  <div>
                    <!-- <input type="text" placeholder="buscar" class="form-control" v-model="name" /> -->
                  </div>
                  <table
                    class="table table-striped table-bordered dt-responsive nowrap"
                    style="width:100%"
                    id="tblSemilleros2"
                  >
                    <thead>
                      <tr>
                        <th>Siglas</th>
                        <th>Nombre</th>
                        <th>Grupo de investigación</th>
                        <th>Coordinador</th>
                        <th>Correo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in searchSemillerosAgrarias" :key="item.id_grupo">
                        <td>
                        <router-link
                          :to="{name: 'semillero-especifico', params: { id: item.id_semillero}}"
                          style="margin: 2px"
                        >{{ item.semillero_sigla }}</router-link>
                      </td>
                        
                        <td>{{ item.semillero }}</td>
                        <td>{{ item.grupo_sigla }}</td>
                        <td>{{ item.nombre_usuario }} {{ item.apellido_usuario }}</td>
                        <td>{{ item.email }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <!--Table-->
                </div>
                <!-- Table responsive wrapper -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Accordion card -->

      <!-- Accordion card -->
      <div class="card">
        <!-- Card header -->
        <div class="card-header" role="tab" id="headingThree3">
          <a
            class="collapsed"
            data-toggle="collapse"
            data-parent="#accordionEx"
            href="#collapseThree3"
            aria-expanded="false"
            aria-controls="collapseThree3"
          >
            <h5 class="mb-0 text-success">
              Facultad Ciencias Básicas, Sociales y Humanas
              <i class="fas fa-angle-down rotate-icon"></i>
            </h5>
          </a>
        </div>

        <!-- Card body -->
        <div
          id="collapseThree3"
          class="collapse"
          role="tabpanel"
          aria-labelledby="headingThree3"
          data-parent="#accordionEx"
        >
          <div class="card-body">
            <div class="card-body">
              <!-- Table responsive wrapper -->
              <div class="table-responsive mx-3">
                <!--Table-->
                <div>
                  <!-- <input type="text" placeholder="buscar" class="form-control" v-model="name" /> -->
                </div>
                <table
                  class="table table-striped table-bordered dt-responsive nowrap"
                  style="width:100%"
                  id="tblSemilleros3"
                >
                  <thead>
                    <tr>
                      <th>Siglas</th>
                      <th>Nombre</th>
                      <th>Grupo de investigación</th>
                      <th>Coordinador</th>
                      <th>Correo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in searchSemillerosBasicas" :key="item.id_grupo">
                      <td>
                        <router-link
                          :to="{name: 'semillero-especifico', params: { id: item.id_semillero}}"
                          style="margin: 2px"
                        >{{ item.semillero_sigla }}</router-link>
                      </td>
                      
                      <td>{{ item.semillero }}</td>
                      <td>{{ item.grupo_sigla }}</td>
                      <td>{{ item.nombre_usuario }} {{ item.apellido_usuario }}</td>
                      <td>{{ item.email }}</td>
                    </tr>
                  </tbody>
                </table>
                <!--Table-->
              </div>
              <!-- Table responsive wrapper -->
            </div>
          </div>
        </div>
      </div>
      <!-- Accordion card -->
      <!-- Accordion card -->
      <div class="card">
        <!-- Card header -->
        <div class="card-header" role="tab" id="headingThree4">
          <a
            class="collapsed"
            data-toggle="collapse"
            data-parent="#accordionEx"
            href="#collapseThree4"
            aria-expanded="false"
            aria-controls="collapseThree4"
          >
            <h5 class="mb-0 text-success">
              Facultad Comunicación Audiovisual
              <i class="fas fa-angle-down rotate-icon"></i>
            </h5>
          </a>
        </div>

        <!-- Card body -->
        <div
          id="collapseThree4"
          class="collapse"
          role="tabpanel"
          aria-labelledby="headingThree4"
          data-parent="#accordionEx"
        >
          <div class="card-body">
            <div class="card-body">
              <!-- Table responsive wrapper -->
              <div class="table-responsive mx-3">
                <!--Table-->
                <div>
                  <!-- <input type="text" placeholder="buscar" class="form-control" v-model="name" /> -->
                </div>
                <table
                  class="table table-striped table-bordered dt-responsive nowrap"
                  style="width:100%"
                  id="tblSemilleros4"
                >
                  <thead>
                    <tr>
                      <th>Siglas</th>
                      <th>Nombre</th>
                      <th>Grupo de investigación</th>
                      <th>Coordinador</th>
                      <th>Correo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in searchSemillerosVisuales" :key="item.id_grupo">
                       <td>
                        <router-link
                          :to="{name: 'semillero-especifico', params: { id: item.id_semillero}}"
                          style="margin: 2px"
                        >{{ item.semillero_sigla }}</router-link>
                      </td>
                     
                      <td>{{ item.semillero }}</td>
                      <td>{{ item.grupo_sigla }}</td>
                      <td>{{ item.nombre_usuario }} {{ item.apellido_usuario }}</td>
                      <td>{{ item.email }}</td>
                    </tr>
                  </tbody>
                </table>
                <!--Table-->
              </div>
              <!-- Table responsive wrapper -->
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <!-- Card header -->
        <div class="card-header" role="tab" id="headingThree5">
          <a
            class="collapsed"
            data-toggle="collapse"
            data-parent="#accordionEx"
            href="#collapseThree5"
            aria-expanded="false"
            aria-controls="collapseThree5"
          >
            <h5 class="mb-0 text-success">
              Facultad Educación Física Recreación y Deporte
              <i
                class="fas fa-angle-down rotate-icon"
              ></i>
            </h5>
          </a>
        </div>

        <!-- Card body -->
        <div
          id="collapseThree5"
          class="collapse"
          role="tabpanel"
          aria-labelledby="headingThree5"
          data-parent="#accordionEx"
        >
          <div class="card-body">
            <div class="card-body">
              <!-- Table responsive wrapper -->
              <div class="table-responsive mx-3">
                <!--Table-->
                <div>
                  <!-- <input type="text" placeholder="buscar" class="form-control" v-model="name" /> -->
                </div>
                <table
                  class="table table-striped table-bordered dt-responsive nowrap"
                  style="width:100%"
                  id="tblSemilleros5"
                >
                  <thead>
                    <tr>
                      <th>Siglas</th>
                      <th>Nombre</th>
                      <th>Grupo de investigación</th>
                      <th>Coordinador</th>
                      <th>Correo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in searchSemillerosDeportes" :key="item.id_grupo">
                       <td>
                        <router-link
                          :to="{name: 'semillero-especifico', params: { id: item.id_semillero}}"
                          style="margin: 2px"
                        >{{ item.semillero_sigla }}</router-link>
                      </td>
                      
                      <td>{{ item.semillero }}</td>
                      <td>{{ item.grupo_sigla }}</td>
                      <td>{{ item.nombre_usuario }} {{ item.apellido_usuario }}</td>
                      <td>{{ item.email }}</td>
                    </tr>
                  </tbody>
                </table>
                <!--Table-->
              </div>
              <!-- Table responsive wrapper -->
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <!-- Card header -->
        <div class="card-header" role="tab" id="headingThree6">
          <a
            class="collapsed"
            data-toggle="collapse"
            data-parent="#accordionEx"
            href="#collapseThree6"
            aria-expanded="false"
            aria-controls="collapseThree6"
          >
            <h5 class="mb-0 text-success">
              Facultad Ingenierias
              <i class="fas fa-angle-down rotate-icon"></i>
            </h5>
          </a>
        </div>

        <!-- Card body -->
        <div
          id="collapseThree6"
          class="collapse"
          role="tabpanel"
          aria-labelledby="headingThree6"
          data-parent="#accordionEx"
        >
          <div class="card-body">
            <div class="card-body">
              <!-- Table responsive wrapper -->
              <div class="table-responsive mx-3">
                <!--Table-->
                <div>
                  <!-- <input type="text" placeholder="buscar" class="form-control" v-model="name" /> -->
                </div>
                <table
                  class="table table-striped table-bordered dt-responsive nowrap"
                  style="width:100%"
                  id="tblSemilleros6"
                >
                  <thead>
                    <tr>
                      <!-- <th>id grupo</th> -->
                      <th>Siglas</th>
                      <th>Nombre</th>
                      <th>Grupo de investigación</th>
                      <th>Coordinador</th>
                      <th>Correo</th>
                      <!--  <th>Telefono</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in searchSemillerosIngenieria" :key="item.id_grupo">
                      <!-- <td>{{ item.id_grupo }}</td> -->

                      <!-- <td>
                        <a :href="item.vinculo" target="_blank">{{item.cod_colciencias}}</a>
                      </td>-->
                      <td>
                        <router-link
                          :to="{name: 'semillero-especifico', params: { id: item.id_semillero}}"
                          style="margin: 2px"
                        >{{ item.semillero_sigla }}</router-link>
                      </td>
                      
                      <td>{{ item.semillero }}</td>
                      <td>{{ item.grupo_sigla }}</td>
                      <td>{{ item.nombre_usuario }} {{ item.apellido_usuario }}</td>
                      <td>{{ item.email }}</td>
                    </tr>
                  </tbody>
                </table>
                <!--Table-->
              </div>
              <!-- Table responsive wrapper -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Semilleros de investigacion -->
    <!-- <template>
      <h1>Semilleros de investigación</h1>
      <table
        id="tblSemilleros"
        class="table table-striped table-bordered dt-responsive nowrap"
        style="width:100%"
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Código Colciencias</th>
            <th>Vinculo Colciencias</th>
            <th>Facultad</th>
            <th data-priority="2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Semilleros" :key="item.id_grupo">
            <td>{{ item.grupo }}</td>
            <td>{{ item.categoria }}</td>
            <td>{{ item.cod_colciencias }}</td>
            <td>{{ item.vinculo }}</td>
            <td>{{ item.facultad }}</td>
            <td style="text-align: center">
              <div class="btn-group" role="group">
                <router-link
                  :to="{name: 'editgrupo', params: { id: item.id_grupo}}"
                  class="btn btn-outline-primary"
                  style="margin: 2px"
                >Editar</router-link>

                <button
                  style="margin: 2px"
                  class="btn btn-outline-danger"
                  @click="deleteGrupo(item.id_grupo)"
                >Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>-->

    <!-- Accordion wrapper -->
  </div>
</template>

<script>
import ApiService from "../services/api.service";

export default {
  /* name: "App", */
  data() {
    return {
      semilleros: [],
      name: "",
      isActive: null
    };
  },
  /* created() {
    ApiService.get("/grupo/información").then(response => {
      this.Semilleros = response.data.filter(
        res => res.facultad == "Administración"
      );
    });
  }, */
  created() {
    // let url = `${process.env.VUE_APP_URL_API}/grupo/informacion`
    ApiService.get("/semillero/informacion")
      .then(response => {
        if (response.status === 200) {
          console.log(response.status);
          this.semilleros = response.data;
        }
      })
      .then(res => {
        $("#tblSemilleros").DataTable({
          language: {},
          responsive: true
        });
      })
      .then(res => {
        $("#tblSemilleros2").DataTable({
          language: {},
          responsive: true
        });
      })
      .then(res => {
        $("#tblSemilleros3").DataTable({
          language: {},
          responsive: true
        });
      })
      .then(res => {
        $("#tblSemilleros4").DataTable({
          language: {},
          responsive: true
        });
      })
      .then(res => {
        $("#tblSemilleros5").DataTable({
          language: {},
          responsive: true
        });
      })
      .then(res => {
        $("#tblSemilleros6").DataTable({
          language: {},
          responsive: true,
         
          /* loadingRecords: "Cargando...",
          processing: "Procesando...",
          zeroRecords: "No se ha encontrado nada  atraves de ese filtrado.",
          paginate: {
            first: "Primera",
            last: "Última",
            next: "Siguiente",
            previous: "Anterior"
          }, */
        
            /*  { "width": "80%", "targets": 1 },
           { "width": "90%", "targets": 2 },
          { "width": "80%", "targets": 1 } */
          
        });
      });
  },
  computed: {
    searchSemillerosAdministracion: function() {
      /* return this.Semilleros.filter(item => item.grupo.includes(this.name)); */

      return this.semilleros.filter(function(item) {
        if (item.facultad == "Administración") {
          return item;
        }
      });
    },
    searchSemillerosAgrarias: function() {
      /* return this.Semilleros.filter(item => item.grupo.includes(this.name)); */

      return this.semilleros.filter(function(item) {
        if (item.facultad == "Ciencias Agrarias") {
          return item;
        }
      });
    },
    searchSemillerosBasicas: function() {
      /* return this.Semilleros.filter(item => item.grupo.includes(this.name)); */

      return this.semilleros.filter(function(item) {
        if (item.facultad == "Ciencias Básicas, Sociales y Humanas") {
          return item;
        }
      });
    },
    searchSemillerosVisuales: function() {
      /* return this.Semilleros.filter(item => item.grupo.includes(this.name)); */

      return this.semilleros.filter(function(item) {
        if (item.facultad == "Comunicación Audiovisual") {
          return item;
        }
      });
    },
    searchSemillerosDeportes: function() {
      /* return this.Semilleros.filter(item => item.grupo.includes(this.name)); */

      return this.semilleros.filter(function(item) {
        if (item.facultad == "Educación Física Recreación y Deporte") {
          return item;
        }
      });
    },
    searchSemillerosIngenieria: function() {
      /* return this.Semilleros.filter(item => item.grupo.includes(this.name)); */

      return this.semilleros.filter(function(item) {
        if (item.facultad == "Ingeniería") {
          return item;
        }
      });
    }
  },
  methods: {
    toggleItem(index) {
      this.isActive = index;
    }
  }
};
</script>

<style>
.item-active p {
  color: green;
}
</style>