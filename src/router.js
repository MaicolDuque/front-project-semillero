import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
//
import Grupos from './views/Grupos.vue'
import AddGrupo from './views/AddGrupo.vue'
import EditGrupo from './views/EditGrupo.vue'
//
import Directores from './views/Directores.vue'
import AddDirector from './views/AddDirector.vue'
import EditDirector from './views/EditDirector.vue'
//
import Semilleros from './views/Semilleros.vue'
import AddSemillero from './views/AddSemillero.vue'
import EditSemillero from './views/EditSemillero.vue'
//
import Coordinadores from './views/Coordinadores.vue'
import AddCoordinador from './views/AddCoordinador.vue'
import EditCoordinador from './views/EditCoordinador.vue'
//
import AsignarGrupo from './views/AsignarGrupo.vue'
//
import vistaDirectores from './views/vistaDirectores.vue'
//
import AsignarSemillero from './views/AsignarSemillero.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/grupos',
      name: 'grupos',
      component: Grupos
    },
    {
      path: '/addGrupos',
      name: 'addgrupos',
      component: AddGrupo
    },
    {
      path: '/editGrupo',
      name: 'editgrupo',
      component: EditGrupo
    },
    {
      path: '/directores',
      name: 'directores',
      component: Directores
    },
    {
      path: '/addDirector',
      name: 'addDirector',
      component: AddDirector
    },
    {
      path: '/editdirector',
      name: 'editdirector',
      component: EditDirector
    },
    {
      path: '/semilleros',
      name: 'semilleros',
      component: Semilleros
    },
    {
      path: '/addsemillero',
      name: 'addsemillero',
      component: AddSemillero
    },
    {
      path: '/editsemillero',
      name: 'editsemillero',
      component: EditSemillero
    },
    {
      path: '/coordinadores',
      name: 'coordinadores',
      component: Coordinadores
    },
    {
      path: '/addcoordinador',
      name: 'addcoordinador',
      component: AddCoordinador
    },
    {
      path: '/editcoordiandor',
      name: 'editcoordinador',
      component: EditCoordinador
    },
    {
      path: '/asignargrupo',
      name: 'asignargrupo',
      component: AsignarGrupo
    },
    {
      path: '/vistaDirectores',
      name: 'vistaDirectores',
      component: vistaDirectores
    },
    {
      path: '/asignarsemillero',
      name: 'asignarsemillero',
      component: AsignarSemillero
    },

  ]
})
