<template>
<div>
    <!--Accordion wrapper-->
<div class="accordion md-accordion accordion-blocks" id="accordionEx78" role="tablist"
  aria-multiselectable="true">

  <!-- Accordion card -->
  <div class="card">

    <!-- Card header -->
    <div class="card-header" role="tab" id="headingUnfiled">

      <!--Options-->
      <!-- <div class="dropdown float-left">
        <button class="btn btn-info btn-sm m-0 mr-3 p-2 dropdown-toggle" type="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false"><i class="fas fa-pencil-alt"></i>
        </button>
        <div class="dropdown-menu dropdown-info">
          <a class="dropdown-item" href="#">Add new condition</a>
          <a class="dropdown-item" href="#">Rename folder</a>
          <a class="dropdown-item" href="#">Delete folder</a>
        </div>
      </div> -->

      <!-- Heading -->
      <a data-toggle="collapse" data-parent="#accordionEx78" href="#collapseUnfiled" aria-expanded="true"
        aria-controls="collapseUnfiled">
        <h5 class="mt-1 mb-0">
          <span>Administración</span>
          <i class="fas fa-angle-down rotate-icon"></i>
        </h5>
      </a>

    </div>

    <!-- Card body -->
    <div id="collapseUnfiled" class="collapse" role="tabpanel" aria-labelledby="headingUnfiled"
      data-parent="#accordionEx78">
      <div class="card-body">

        <!--Top Table UI-->
        <div class="table-ui p-2 mb-3 mx-3 mb-4">

          <!--Grid row-->
          <div class="row">

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-12">

              <!--Name-->
              <!-- <select class="mdb-select colorful-select dropdown-info mx-2">
                <option value="" disabled selected>Bulk actions</option>
                <option value="1">Delete</option>
                <option value="2">Change folder</option>
              </select> -->

            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-6">

              <!--Blue select-->
              <!-- <select class="mdb-select colorful-select dropdown-info mx-2">
                <option value="" disabled>Show only</option>
                <option value="1" selected>All <span> (2000)</span></option>
                <option value="2">Clicks <span> (200)</span></option>
                <option value="3">Page <span> (1800)</span></option>
                <option value="4">Scroll <span> (200)</span></option>
                <option value="5">Forms <span> (50)</span></option>
                <option value="6">Time <span> (50)</span></option>
                <option value="7">UTM <span> (50)</span></option>
              </select> -->
              <!--/Blue select-->

            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-6">

              <!--Blue select-->
              <!-- <select class="mdb-select colorful-select dropdown-info mx-2">
                <option value="" disabled selected>Filter</option>
                <option value="1">All <span> (100)</span></option>
                <option value="1">Active <span> (2000)</span></option>
                <option value="2">Inactive <span> (1000)</span></option>
              </select> -->
              <!--/Blue select-->

            </div>
            <!--Grid column-->

          </div>
          <!--Grid row-->

        </div>
        <!--Top Table UI-->

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
          <th>Facultad</th>
          <!-- <th>Acciones</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in searchGrupo" :key="item.id_grupo" >
          
              <td>{{item.grupo }}</td>
              <td>{{ item.categoria }}</td>
              <td>{{ item.cod_colciencias }}</td>
              <td>{{ item.facultad }}</td>
          
          
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
    <div class="card-header" role="tab" id="heading79">

      <!--Options-->
      <div class="dropdown float-left">
        <button class="btn btn-info btn-sm m-0 mr-3 p-2 dropdown-toggle" type="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false"><i class="fas fa-pencil-alt"></i>
        </button>
        <div class="dropdown-menu dropdown-info">
          <a class="dropdown-item" href="#">Add new condition</a>
          <a class="dropdown-item" href="#">Rename folder</a>
          <a class="dropdown-item" href="#">Delete folder</a>
        </div>
      </div>

      <!-- Heading -->
      <a data-toggle="collapse" data-parent="#accordionEx78" href="#collapse79" aria-expanded="true"
        aria-controls="collapse79">
        <h5 class="mt-1 mb-0">
          <span>Folder 1</span>
          <i class="fas fa-angle-down rotate-icon"></i>
        </h5>
      </a>

    </div>

    <!-- Card body -->
    <div id="collapse79" class="collapse show" role="tabpanel" aria-labelledby="heading79"
      data-parent="#accordionEx78">
      <div class="card-body">

        <!--Top Table UI-->
        <div class="table-ui p-2 mb-3 mx-3 mb-4">

          <!--Grid row-->
          <div class="row">

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-12">

              <!--Name-->
              <select class="mdb-select colorful-select dropdown-info mx-2">
                <option value="" disabled selected>Bulk actions</option>
                <option value="1">Delete</option>
                <option value="2">Change folder</option>
              </select>

            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-6">

              

            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-6">

              

            </div>
            <!--Grid column-->

          </div>
          <!--Grid row-->

        </div>
        <!--Top Table UI-->

        <!-- Table responsive wrapper -->
        <div class="table-responsive mx-3">
          <!--Table-->
          <table class="table table-hover mb-0">

            <!--Table head-->
            
            <!--Table head-->

            <!--Table body-->
            
            <!--Table body-->
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
    <div class="card-header" role="tab" id="heading80">
      <!--Options-->
      <div class="dropdown float-left">
        <button class="btn btn-info btn-sm m-0 mr-3 p-2 dropdown-toggle" type="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false"><i class="fas fa-pencil-alt"></i>
        </button>
        <div class="dropdown-menu dropdown-info">
          <a class="dropdown-item" href="#">Add new condition</a>
          <a class="dropdown-item" href="#">Rename folder</a>
          <a class="dropdown-item" href="#">Delete folder</a>
        </div>
      </div>

      <!-- Heading -->
      <a data-toggle="collapse" data-parent="#accordionEx78" href="#collapse80" aria-expanded="true"
        aria-controls="collapse80">
        <h5 class="mt-1 mb-0">
          <span>Folder 2</span>
          <i class="fas fa-angle-down rotate-icon"></i>
        </h5>
      </a>
    </div>

    <!-- Card body -->
    <div id="collapse80" class="collapse" role="tabpanel" aria-labelledby="heading80"
      data-parent="#accordionEx78">
      <div class="card-body">

        <!--Top Table UI-->
        <div class="table-ui p-2 mb-3 mx-3 mb-4">

          <!--Grid row-->
          <div class="row">

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-12">

              <!--Name-->
              <select class="mdb-select colorful-select dropdown-info mx-2">
                <option value="" disabled selected>Bulk actions</option>
                <option value="1">Delete</option>
                <option value="2">Change folder</option>
              </select>

            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-6">

              <!--Blue select-->
              <select class="mdb-select colorful-select dropdown-info mx-2">
                <option value="" disabled>Show only</option>
                <option value="1" selected>All <span> (2000)</span></option>
                <option value="2">Clicks <span> (200)</span></option>
                <option value="3">Page <span> (1800)</span></option>
                <option value="4">Scroll <span> (200)</span></option>
                <option value="5">Forms <span> (50)</span></option>
                <option value="6">Time <span> (50)</span></option>
                <option value="7">UTM <span> (50)</span></option>
              </select>
              <!--/Blue select-->

            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-6">

              <!--Blue select-->
              <select class="mdb-select colorful-select dropdown-info mx-2">
                <option value="" disabled selected>Filter</option>
                <option value="1">All <span> (100)</span></option>
                <option value="1">Active <span> (2000)</span></option>
                <option value="2">Inactive <span> (1000)</span></option>
              </select>
              <!--/Blue select-->

            </div>
            <!--Grid column-->

          </div>
          <!--Grid row-->

        </div>
        <!--Top Table UI-->

        <!-- Table responsive wrapper -->
        <div class="table-responsive mx-3">
          <!--Table-->
          <table class="table table-hover mb-0">

            <!--Table head-->
            <thead>
              <tr>
                <th>
                  <input class="form-check-input" type="checkbox" id="checkbox7">
                  <label for="checkbox7" class="mr-2 label-table"></label>
                </th>
                <th class="th-lg"><a>Name <i class="fas fa-sort ml-1"></i></a></th>
                <th class="th-lg"><a>Condition<i class="fas fa-sort ml-1"></i></a></th>
                <th class="th-lg"><a>Last edited<i class="fas fa-sort ml-1"></i></a></th>
                <th></th>
              </tr>
            </thead>
            <!--Table head-->

            <!--Table body-->
            <tbody>
              <tr>
                <th scope="row">
                  <input class="form-check-input" type="checkbox" id="checkbox8">
                  <label for="checkbox8" class="label-table"></label>
                </th>
                <td>Test subscription</td>
                <td>Scroll % is equal or greater than <strong>80</strong></td>
                <td>12.06.2017</td>
                <td>
                  <a><i class="fas fa-info mx-1" data-toggle="tooltip" data-placement="top"
                      title="Tooltip on top"></i></a>
                  <a><i class="fas fa-pen-square mx-1"></i></a>
                  <a><i class="fas fa-times mx-1"></i></a>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <input class="form-check-input" type="checkbox" id="checkbox9">
                  <label for="checkbox9" class="label-table"></label>
                </th>
                <td>Product Hunt Visitor</td>
                <td>Scroll % is equal or greater than <strong>80</strong></td>
                <td>13.06.2017</td>
                <td>
                  <a><i class="fas fa-info mx-1" data-toggle="tooltip" data-placement="top"
                      title="Tooltip on top"></i></a>
                  <a><i class="fas fa-pen-square mx-1"></i></a>
                  <a><i class="fas fa-times mx-1"></i></a>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <input class="form-check-input" type="checkbox" id="checkbox10">
                  <label for="checkbox10" class="label-table"></label>
                </th>
                <td>Test subscription</td>
                <td>Scroll % is equal or greater than <strong>80</strong></td>
                <td>12.06.2017</td>
                <td>
                  <a><i class="fas fa-info mx-1" data-toggle="tooltip" data-placement="top"
                      title="Tooltip on top"></i></a>
                  <a><i class="fas fa-pen-square mx-1"></i></a>
                  <a><i class="fas fa-times mx-1"></i></a>
                </td>
              </tr>
            </tbody>
            <!--Table body-->
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
    <div class="card-header" role="tab" id="heading">
      <!--Options-->
      <div class="dropdown float-left">
        <button class="btn btn-info btn-sm m-0 mr-3 p-2 dropdown-toggle" type="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false"><i class="fas fa-pencil-alt"></i>
        </button>
        <div class="dropdown-menu dropdown-info">
          <a class="dropdown-item" href="#">Add new condition</a>
          <a class="dropdown-item" href="#">Rename folder</a>
          <a class="dropdown-item" href="#">Delete folder</a>
        </div>
      </div>

      <!-- Heading -->
      <a data-toggle="collapse" data-parent="#accordionEx78" href="#collapse81" aria-expanded="true"
        aria-controls="collapse81">
        <h5 class="mt-1 mb-0">
          <span>Folder 3</span>
          <i class="fas fa-angle-down rotate-icon"></i>
        </h5>
      </a>
    </div>

    <!-- Card body -->
    <div id="collapse81" class="collapse" role="tabpanel" aria-labelledby="heading"
      data-parent="#accordionEx78">
      <div class="card-body">

        <!--Top Table UI-->
        <div class="table-ui p-2 mb-3 mx-3 mb-4">

          <!--Grid row-->
          <div class="row">

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-12">

              <!--Name-->
              <select class="mdb-select colorful-select dropdown-info mx-2">
                <option value="" disabled selected>Bulk actions</option>
                <option value="1">Delete</option>
                <option value="2">Change folder</option>
              </select>

            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-6">

              <!--Blue select-->
              <select class="mdb-select colorful-select dropdown-info mx-2">
                <option value="" disabled>Show only</option>
                <option value="1" selected>All <span> (2000)</span></option>
                <option value="2">Clicks <span> (200)</span></option>
                <option value="3">Page <span> (1800)</span></option>
                <option value="4">Scroll <span> (200)</span></option>
                <option value="5">Forms <span> (50)</span></option>
                <option value="6">Time <span> (50)</span></option>
                <option value="7">UTM <span> (50)</span></option>
              </select>
              <!--/Blue select-->

            </div>
            <!--Grid column-->

            <!--Grid column-->
            <div class="col-xl-4 col-lg-6 col-md-6">

              <!--Blue select-->
              <select class="mdb-select colorful-select dropdown-info mx-2">
                <option value="" disabled selected>Filter</option>
                <option value="1">All <span> (100)</span></option>
                <option value="1">Active <span> (2000)</span></option>
                <option value="2">Inactive <span> (1000)</span></option>
              </select>
              <!--/Blue select-->

            </div>
            <!--Grid column-->

          </div>
          <!--Grid row-->

        </div>
        <!--Top Table UI-->

        <!-- Table responsive wrapper -->
        <div class="table-responsive mx-3">
          <!--Table-->
          <table class="table table-hover mb-0">

            <!--Table head-->
            <thead>
              <tr>
                <th>
                  <input class="form-check-input" type="checkbox" id="checkbox15">
                  <label for="checkbox15" class="mr-2 label-table"></label>
                </th>
                <th class="th-lg"><a>Name <i class="fas fa-sort ml-1"></i></a></th>
                <th class="th-lg"><a>Condition<i class="fas fa-sort ml-1"></i></a></th>
                <th class="th-lg"><a>Last edited<i class="fas fa-sort ml-1"></i></a></th>
                <th></th>
              </tr>
            </thead>
            <!--Table head-->

            <!--Table body-->
            <tbody>
              <tr>
                <th scope="row">
                  <input class="form-check-input" type="checkbox" id="checkbox11">
                  <label for="checkbox11" class="label-table"></label>
                </th>
                <td>Test subscription</td>
                <td>Scroll % is equal or greater than <strong>80</strong></td>
                <td>12.06.2017</td>
                <td>
                  <a><i class="fas fa-info mx-1" data-toggle="tooltip" data-placement="top"
                      title="Tooltip on top"></i></a>
                  <a><i class="fas fa-pen-square mx-1"></i></a>
                  <a><i class="fas fa-times mx-1"></i></a>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <input class="form-check-input" type="checkbox" id="checkbox12">
                  <label for="checkbox12" class="label-table"></label>
                </th>
                <td>Product Hunt Visitor</td>
                <td>Scroll % is equal or greater than <strong>80</strong></td>
                <td>13.06.2017</td>
                <td>
                  <a><i class="fas fa-info mx-1" data-toggle="tooltip" data-placement="top"
                      title="Tooltip on top"></i></a>
                  <a><i class="fas fa-pen-square mx-1"></i></a>
                  <a><i class="fas fa-times mx-1"></i></a>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <input class="form-check-input" type="checkbox" id="checkbox13">
                  <label for="checkbox13" class="label-table"></label>
                </th>
                <td>Test subscription</td>
                <td>Scroll % is equal or greater than <strong>80</strong></td>
                <td>12.06.2017</td>
                <td>
                  <a><i class="fas fa-info mx-1" data-toggle="tooltip" data-placement="top"
                      title="Tooltip on top"></i></a>
                  <a><i class="fas fa-pen-square mx-1"></i></a>
                  <a><i class="fas fa-times mx-1"></i></a>
                </td>
              </tr>
            </tbody>
            <!--Table body-->
          </table>
          <!--Table-->
        </div>
        <!-- Table responsive wrapper -->

      </div>
    </div>
  </div>
  <!-- Accordion card -->
</div>
<!--/.Accordion wrapper-->
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
    ApiService.get("/grupo").then(response => {
      this.grupos = response.data;
    });
  },
  computed: {
    searchGrupo: function() {
      
      /* return this.grupos.filter(item => item.grupo.includes(this.name)); */ 
      return this.grupos.filter(function (item){
        if(item.id_facultad == 2){
          return item
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
/* body {
  background: #20262e;
  padding: 20px;
  font-family: Helvetica;
} */

/* #app {
  background: #fff;
  padding: 20px;
} */
.item-active p {
  color: green;
}
</style>