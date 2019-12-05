<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>DataTables</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">DataTables</li>
            </ol>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">DataTable with minimal features & hover style</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>CORREO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in listaUsuarios" :key="user.id">
                    <td>{{user.id_usuario}}</td>
                    <td>{{user.nombre_usuario}}</td>
                    <td>{{user.email}}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>CORREO</th>
                  </tr>
                </tfoot>
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
import axios from "axios";
import ApiService from "../services/api.service";
export default {
  data() {
    return {
      titulo: "Mi primera página en VUE JS",
      listaUsuarios: []
    };
  },
  created() {
    ApiService.get("http://localhost:8000/api/usuario")
      .then(res => {
        this.listaUsuarios = res.data;
      })
      .catch(error => this.errors.push(error));
  },
  mounted() {}
};
</script>

<style>
</style>