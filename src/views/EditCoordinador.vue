<template>
  <div>
    <h3 class="text-center">Editar coordinador</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/coordinadores" class="nav-item nav-link">coordinadores</router-link>
        </div>
      </div>
    </nav>
    <section class="content">
      <div style="width: 50%; margin: 0 auto;">
        <div class="card card-success">
          <form @submit.prevent="updatesemillero">
            <div class="card-body">
              <div class="form-group">
                <label>Documento</label>
                <input type="text" class="form-control" v-model="coordinador.documento" />
              </div>
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control" v-model="coordinador.nombre_usuario" />
              </div>
              <div class="form-group">
                <label>Apellidos</label>
                <input type="text" class="form-control" v-model="coordinador.apellido_usuario" />
              </div>
              <div class="form-group">
                <label>Correo</label>
                <input type="text" class="form-control" v-model="coordinador.email" />
              </div>
              <div class="form-group">
                <label>Telefono</label>
                <input type="text" class="form-control" v-model="coordinador.telefono" />
              </div>
              <div class="form-group">
                <label>Tipo usuario:</label>
                <select
                  class="form-control"
                  style="width: 100%;"
                  v-model="coordinador.id_tipo_usuario"
                >
                  <option
                    v-for="tipo in tipoUsuarios"
                    :key="tipo.id_tipo_usuario"
                    :value="tipo.id_tipo_usuario"
                  >{{ tipo.tipo_usuario }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Rol:</label>
                <select class="form-control" style="width: 100%;" v-model="coordinador.id_rol">
                  <option v-for="rol in roles" :key="rol.id_rol" :value="rol.id_rol">{{ rol.rol }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>semillero</label>
                <select
                  class="form-control"
                  style="width: 100%;"
                  v-model="coordinador.id_semillero"
                >
                  <option
                    v-for="semillero in semilleros"
                    v-bind:key="semillero.id_semillero"
                    :value="semillero.id_semillero"
                  >{{ semillero.semillero }}</option>
                </select>
              </div>
              <div class="card-footer">
                <button type="submit" class="btn btn-primary">Actualizar</button>
              </div>
            </div>
          </form>
        </div>
        <pre>
            {{$data}}
        </pre>
      </div>
    </section>
  </div>
</template>

<script>
import ApiService from "../services/api.service";

export default {
  data() {
    return {
      coordinador: [],
      semilleros: [],
      tipoUsuarios: [],
      roles: []
    };
  },
  created() {
    ApiService.get("/usuario/coordinador").then(response => {
      this.coordinador = response.data.filter(
        res => res.id_usuario == this.$route.params.id
      )[0];
    });

    ApiService.get("/semillero/disponible").then(response => {
      this.semilleros = response.data;
      this.semilleros.push({
        semillero: this.coordinador.semillero,
        id_semillero: this.coordinador.id_semillero
      });
    });

    ApiService.get("/tipousuario").then(response => {
      this.tipoUsuarios = response.data;
    });

    ApiService.get("/rol").then(response => {
      this.roles = response.data;
    });
  },
  methods: {
    updatesemillero() {
      //event.preventDefault();
      console.log(this.coordinador);
      ApiService.put(
        `usuario/${this.$route.params.id}`,
        this.objectcoordinador
      ).catch(function(response) {
        alert("No se pudo crear el semillero");
      });
      console.log(this.$route.params.id);
      ApiService.put(`coordinador/${this.$route.params.id}`, {
        id_semillero: this.coordinador.id_semillero
      }).then(response => {
        this.$router.push({ name: "coordinadores" });
      });
    }
  },

  computed: {
    objectcoordinador() {
      return JSON.parse(`{
          "documento":        "${this.coordinador.documento}",
          "nombre_usuario":   "${this.coordinador.nombre_usuario}",
          "estado":           ${this.coordinador.estado},
          "apellido_usuario": "${this.coordinador.apellido_usuario}",
          "telefono":         "${this.coordinador.telefono}",
          "email":            "${this.coordinador.email}",
          "id_rol":           ${this.coordinador.id_rol},
          "id_tipo_usuario":  ${this.coordinador.id_tipo_usuario}
        }`);
    }
  }
};
</script>