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
                id="tblGrupos"
                class="table table-striped table-bordered dt-responsive nowrap"
                style="width:100%"
              >
                <thead>
                  <tr>
                    <th>Codigo Colciencias</th>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Director</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in searchGruposAdministracion" :key="item.id_grupo">
                    <td>{{ item.cod_colciencias }}</td>
                    <td>
                      <a :href="item.vinculo">{{item.grupo }}</a>
                    </td>
                    <td>{{ item.categoria }}</td>
                    <td>{{ item.nombre_usuario }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.telefono }}</td>
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
                    id="tblGrupos2"
                  >
                    <thead>
                      <tr>
                        <th>id grupo</th>
                        <th>Codigo Colciencias</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Director</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in searchGruposAgrarias" :key="item.id_grupo">
                        <td>{{ item.id_grupo }}</td>
                        <td>{{ item.cod_colciencias }}</td>
                        <td>
                          <a :href="item.vinculo">{{item.grupo}}</a>
                        </td>
                        <td>{{ item.categoria }}</td>
                        <td>{{ item.nombre_usuario }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.telefono }}</td>
                        <td style="text-align: center">
                          <div class="btn-group" role="group">
                            <router-link
                              :to="{name: 'semilleros-visitante', params: { id: item.id_grupo}}"
                              class="btn btn-outline-primary"
                              style="margin: 2px"
                            >Semilleros</router-link>
                          </div>
                        </td>
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
                  id="tblGrupos3"
                >
                  <thead>
                    <tr>
                      <th>Codigo Colciencias</th>
                      <th>Nombre</th>
                      <th>Categoria</th>
                      <th>Director</th>
                      <th>Correo</th>
                      <th>Telefono</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in searchGruposBasicas" :key="item.id_grupo">
                      <td>{{ item.cod_colciencias }}</td>
                      <td>
                        <a :href="item.vinculo">{{item.grupo}}</a>
                      </td>
                      <td>{{ item.categoria }}</td>
                      <td>{{ item.nombre_usuario }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.telefono }}</td>
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
                  id="tblGrupos4"
                >
                  <thead>
                    <tr>
                      <th>Codigo Colciencias</th>
                      <th>Nombre</th>
                      <th>Categoria</th>
                      <th>Director</th>
                      <th>Correo</th>
                      <th>Telefono</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in searchGruposVisuales" :key="item.id_grupo">
                      <td>{{ item.cod_colciencias }}</td>
                      <td>
                        <a :href="item.vinculo">{{item.grupo }}</a>
                      </td>
                      <td>{{ item.categoria }}</td>
                      <td>{{ item.nombre_usuario }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.telefono }}</td>
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
                  id="tblGrupos5"
                >
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Categoria</th>
                      <th>Codigo Colciencias</th>
                      <th>Director</th>
                      <th>Correo</th>
                      <th>Telefono</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in searchGruposDeportes" :key="item.id_grupo">
                      <td>{{ item.cod_colciencias }}</td>
                      <td>
                        <a :href="item.vinculo">{{item.grupo }}</a>
                      </td>
                      <td>{{ item.categoria }}</td>
                      <td>{{ item.nombre_usuario }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.telefono }}</td>
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
                  id="tblGrupos6"
                >
                  <thead>
                    <tr>
                      <!-- <th>id grupo</th> -->
                      <th>Codigo Colciencias</th>
                      <th>Nombre</th>
                      <th>Categoria</th>
                      <th>Director</th>
                      <th>Correo</th>
                      <!--  <th>Telefono</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in searchGruposIngenieria" :key="item.id_grupo">
                      <!-- <td>{{ item.id_grupo }}</td> -->

                      <td>
                        <a :href="'http://'+item.vinculo">{{item.cod_colciencias}}</a>
                      </td>
                      <td>
                        <router-link
                          :to="{name: 'semilleros-visitante', params: { id: item.id_grupo}}"
                          class="btn btn-outline-primary"
                          style="margin: 2px"
                        >{{ item.grupo }}</router-link>
                      </td>
                      <td>{{ item.categoria }}</td>
                      <td>{{ item.nombre_usuario }}</td>

                      <td>{{ item.email }}</td>
                      <!--  <td>{{ item.telefono }}</td> -->
                      <!-- <td style="text-align: center">
                         <div class="btn-group" role="group">
                          <router-link
                            :to="{name: 'semilleros-visitante', params: { id: item.id_grupo}}"
                            class="btn btn-outline-primary"
                            style="margin: 2px"
                          >{{ item.categoria }}</router-link>
                        </div>
                      </td>-->
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
        id="tblGrupos"
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
          <tr v-for="item in grupos" :key="item.id_grupo">
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
      grupos: [],
      name: "",
      isActive: null
    };
  },
  /* created() {
    ApiService.get("/grupo/información").then(response => {
      this.grupos = response.data.filter(
        res => res.facultad == "Administración"
      );
    });
  }, */
  created() {
    ApiService.get("/grupo/informacion")
      .then(response => {
        if (response.status === 200) {
          console.log(response.status);
          this.grupos = response.data;
        }
      })
      .then(res => {
        $("#tblGrupos").DataTable({
          language: {},
          responsive: true
        });
      })
      .then(res => {
        $("#tblGrupos2").DataTable({
          language: {},
          responsive: true
        });
      })
      .then(res => {
        $("#tblGrupos3").DataTable({
          language: {},
          responsive: true
        });
      })
      .then(res => {
        $("#tblGrupos4").DataTable({
          language: {},
          responsive: true
        });
      })
      .then(res => {
        $("#tblGrupos5").DataTable({
          language: {},
          responsive: true
        });
      })
      .then(res => {
        $("#tblGrupos6").DataTable({
          language: {},
          responsive: true
        });
      });
  },
  computed: {
    searchGruposAdministracion: function() {
      /* return this.grupos.filter(item => item.grupo.includes(this.name)); */

      return this.grupos.filter(function(item) {
        if (item.facultad == "Administración") {
          return item;
        }
      });
    },
    searchGruposAgrarias: function() {
      /* return this.grupos.filter(item => item.grupo.includes(this.name)); */

      return this.grupos.filter(function(item) {
        if (item.facultad == "Ciencias Agrarias") {
          return item;
        }
      });
    },
    searchGruposBasicas: function() {
      /* return this.grupos.filter(item => item.grupo.includes(this.name)); */

      return this.grupos.filter(function(item) {
        if (item.facultad == "Ciencias Básicas, Sociales y Humanas") {
          return item;
        }
      });
    },
    searchGruposVisuales: function() {
      /* return this.grupos.filter(item => item.grupo.includes(this.name)); */

      return this.grupos.filter(function(item) {
        if (item.facultad == "Comunicación Audiovisual") {
          return item;
        }
      });
    },
    searchGruposDeportes: function() {
      /* return this.grupos.filter(item => item.grupo.includes(this.name)); */

      return this.grupos.filter(function(item) {
        if (item.facultad == "Educación Física Recreación y Deporte") {
          return item;
        }
      });
    },
    searchGruposIngenieria: function() {
      /* return this.grupos.filter(item => item.grupo.includes(this.name)); */

      return this.grupos.filter(function(item) {
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