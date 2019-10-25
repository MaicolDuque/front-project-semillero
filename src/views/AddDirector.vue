<template>
  <div>
    <h3 class="text-center">Agregar Director</h3>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <router-link to="/Directores" class="nav-item nav-link">Directores</router-link>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="addUsuario">
          <div class="form-group">
            <label>Documento</label>
            <input
              type="text"
              placeholder=" Documento "
              class="form-control"
              v-model="usuario.documento"
            />
          </div>
          <div class="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              class="form-control"
              v-model="usuario.nombre_usuario"
            />
          </div>
          <div class="form-group">
            <label>Apellido</label>
            <input
              type="text"
              placeholder="Apellidos"
              class="form-control"
              v-model="usuario.apellido_usuario"
            />
          </div>

          <div class="form-group">
            <label>Correo</label>
            <input
              type="text"
              placeholder="Correo electonico"
              class="form-control"
              v-model="usuario.email"
            />
          </div>
          <div class="form-group">
            <label>Telefono</label>
            <input
              type="text"
              placeholder="Telefono"
              class="form-control"
              v-model="usuario.telefono"
            />
          </div>
          <div class="form-group">
            <label>Estado</label>
            <br />
            <select @change="onChange($event)">
              <option disabled value>Please select one</option>
              <option v-for="option in options" v-bind:key="option.value">{{ option.text }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>tipo</label>
            <br />
            <select @change="selectChange">
              <option disabled value>Please select one</option>
              <option v-for="item in Tipos_Usuarios" v-bind:key="item.value">{{ item.tipo_usuario }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Rol</label>
            <input type="text" class="form-control" v-model="usuario.id_rol" />
          </div>
          <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
      </div>
    </div>
    <pre>{{$data}}</pre>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
export default {
  data() {
    return {
      options: [
        { text: "Activo", value: "1" },
        { text: "Inactivo", value: "0" }
      ],
      Tipos_Usuarios: {},
      usuario: {}
    };
  },
  mounted() {
    this.getTipos_Usuarios();
  },
  computed: {
    formatearTipos_Usuarios() {
      return Object.values(this.Tipos_Usuarios);
    }
  },
  methods: {
    addUsuario() {
      ApiService.post("/usuario", this.usuario)
        .then(
          response => this.$router.push({ name: "directores" })
          // console.log(response.data)
        )
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
    },
    getTipos_Usuarios() {
      ApiService.get("/tipousuario").then(response => {
        this.Tipos_Usuarios = response.data;
      });
    },
    onChange($event) {
      if (event.target.value == "Activo") {
        this.usuario.estado = 1;
      } else {
        this.usuario.estado = 0;
      }
    },
    selectChange(event) {
      var i;
      this.Tipos_Usuarios.forEach(function(element) {
        if (element.tipo_usuario == event.target.value) {
          i = element.id_tipo_usuario;
        }
      });
      this.usuario.id_tipo_usuario = i;
    }
  }
};
</script>