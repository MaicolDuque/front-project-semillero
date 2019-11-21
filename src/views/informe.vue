<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <button type="submit" class="btn btn-outline-success">Actualizar</button>
      </div>
    </form>
    <a href="http://localhost:8000/api/exportar/pdf/2"></a>
  </div>
</template>

<script>
import ApiService from "../services/api.service";
export default {
  data() {
    return {};
  },
  methods: {
    handleSubmit(e) {
      console.log(this.$route.params.id);
      /* ApiService.get(`exportar/pdf/${this.$route.params.id}`) */
      ApiService.get("exportar/pdf/2")

        .then(response => {
          alert();
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    }
  }
};
</script>