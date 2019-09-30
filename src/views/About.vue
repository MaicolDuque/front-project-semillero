<template>
  <div class="about">
    <button @click="AuthProvider('google')">auth Google</button>
    <h1>This is an about page</h1>
    <h3>{{titulo}}</h3>
    <table>
      <tr>
        <td>id</td>
        <td>titulo</td>
      </tr>
      <tr v-for="cancion in listaCanciones" :key="cancion.id" >        
          <td>{{cancion.id}}</td>   
          <td>{{cancion.title}}</td>        
      </tr>
    </table>
  </div>
</template>


<script>

import axios from "axios"

export default {
  data() {
    return {
      titulo: "Mi primera página en VUE JS",
      listaCanciones: [
        {id: 1, title: "Primera cancion"},
        {id: 2, title: "Segunda cancion"},
        {id: 3, title: "Cancion cancion"}
      ],
    }
  },
  created() {   
    axios.get('https://jsonplaceholder.typicode.com/todos') 
          .then(res => {
             this.listaCanciones = res.data
            }) 
          .catch(error => this.errors.push(error));
  },
  mounted() {

  },

  methods: {
    AuthProvider(provider) {    
     // console.log(provider)        
     var self = this;
      
      this.$auth.authenticate(provider)
        .then(response => {
          console.log(response);
          // self.SocialLogin(provider,response)
        })
        .catch(err => {
            console.log({err:err})
        })
    },

    SocialLogin(provider,response){
        this.$http.post('/sociallogin/'+provider,response).then(response => {
            console.log(response.data)
        }).catch(err => {
            console.log({err:err})
        })
    },
  }


}
</script>



<style>

</style>
