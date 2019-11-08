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
            <h5 class="mb-0">
              Facultad de Administración
              <i class="fas fa-angle-down rotate-icon"></i>
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
            ADMINITRACI
            <!-- Table responsive wrapper -->
            <div class="table-responsive mx-3">
              <!--Table-->
              <div>
                <!-- <input type="text" placeholder="buscar" class="form-control" v-model="name" /> -->
              </div>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Codigo Colciencias</th>
                    <th>Vinculo</th>
                    <th>Facultad</th>
                    <th>Director</th>
                    <th>Correo</th>
                    <!-- <th>Acciones</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in grupos" :key="item.id_grupo">
                    <td>{{item.grupo }}</td>
                    <td>{{ item.categoria }}</td>
                    <td>{{ item.cod_colciencias }}</td>

                    <a :href="item.vinculo">{{item.vinculo}}</a>

                    <td>{{ item.facultad }}</td>
                    <td>{{ item.nombre_usuario }}</td>
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
            <h5 class="mb-0">
              Facultad de Ciencias Agrarias
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
              <!-- Social shares button -->
              <a class="activator waves-effect mr-4">
                <i class="fas fa-share-alt white-text"></i>
              </a>
              <!-- Title -->
              <h4 class="card-title">Card title</h4>
              <hr class="hr-light" />
              <!-- Text -->
              <p
                class="card-text white-text mb-4"
              >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <!-- Link -->
              <a href="#!" class="white-text d-flex justify-content-end">
                <h5>
                  Read more
                  <i class="fas fa-angle-double-right"></i>
                </h5>
              </a>
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
            <h5 class="mb-0">
              Facultad de Ciencias Básicas, Sociales y Humanas
              <i
                class="fas fa-angle-down rotate-icon"
              ></i>
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
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
            wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
            nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
            farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
            labore sustainable VHS.
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
            <h5 class="mb-0">
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
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
            wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
            nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
            farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
            labore sustainable VHS.
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
            <h5 class="mb-0">
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
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
            wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
            nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
            farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
            labore sustainable VHS.
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
            <h5 class="mb-0">
              Facultad Ingenieria
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
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
            wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
            assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
            nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
            farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
            labore sustainable VHS.
          </div>
        </div>
      </div>
    </div>
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
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      items: [
        { text: "Learn JavaScript" },
        { text: "Learn Vue" },
        { text: "Play around in JSFiddle" },
        { text: "Build something awesome" }
      ],
      isActive: null
    };
  },
  created() {
    ApiService.get("/grupo/informacion").then(response => {
      this.grupos = response.data;
    });
  },
  computed: {
    searchGrupo: function() {
      /* return this.grupos.filter(item => item.grupo.includes(this.name)); */

      return this.grupos.filter(function(item) {
        if (item.id_facultad == 2) {
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