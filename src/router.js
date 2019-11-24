import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import store from './store'

//
import Grupos from './views/Grupos.vue'
import AddGrupo from './views/AddGrupo.vue'
import EditGrupo from './views/EditGrupo.vue'

//
import Directores from './views/Directores.vue'
import AddUserDirector from './views/AddUserDirector.vue'
import EditDirector from './views/EditDirector.vue'
//
import Semilleros from './views/Semilleros.vue'
import AddSemillero from './views/AddSemillero.vue'
import EditSemillero from './views/EditSemillero.vue'
import EditPeriodo from './views/EditPeriodo'
//

//Integrantes
import EditIntegrante from './views/EditIntegrante.vue'
import AddIntegrante from './views/AddIntegrante.vue'

import AddProyecto from './views/AddProyecto.vue'
//ACtividades
import AddActividad from './views/AddActividad.vue'
import EditActividad from './views/EditActividad.vue'

//Productos
import Productos from './views/Productos.vue'
import EditProducto from './views/EditProducto.vue'
import AddProducto from './views/AddProducto.vue'


import Coordinadores from './views/Coordinadores.vue'

import EditCoordinador from './views/EditCoordinador.vue'
//
import AddCoordinador from './views/AddCoordinador.vue'
//

import AsignarGrupo from './views/AsignarGrupo.vue'
//
import vistaDirectores from './views/vistaDirectores.vue'
//
import AsignarSemillero from './views/AsignarSemillero.vue'
//
import VistaGruposVisitante from './views/VistaGruposVisitante.vue'

import AddPeriodo from './views/AddPeriodo.vue'
//Periodos
import Periodos from './views/Periodos.vue'

import EditProyecto from './views/EditProyecto.vue'

import AddProductosProyectos from './views/AddProductosProyectos.vue'

import Login from './views/Login.vue'

import ProductosP from './views/ProductosP'

import AddProyectoP from './views/AddProyectoP';

import AddProductoP from './views/AddProductoP';

import Soportes from './views/Soportes';
import AddSoporte from './views/AddSoporte';
import EditSoporte from './views/EditSoporte';
import semillerosVisitante from './views/semillerosVisitante.vue';
import semilleroEspecifico from './views/semilleroEspecifico.vue'


///


//



Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: "active",
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/grupos', name: 'grupos', component: Grupos },
    { path: '/addGrupos', name: 'addgrupos', component: AddGrupo },
    { path: '/editGrupo/:id', name: 'editgrupo', component: EditGrupo },
    { path: '/directores', name: 'directores', component: Directores },
    { path: '/adduserdirector', name: 'adduserDirector', component: AddUserDirector },
    { path: '/editdirector/:id', name: 'editdirector', component: EditDirector },
    { path: '/semilleros', name: 'semilleros', component: Semilleros },
    { path: '/addsemillero', name: 'addsemillero', component: AddSemillero },
    { path: '/editsemillero/:id', name: 'editsemillero', component: EditSemillero },
    { path: '/coordinadores', name: 'coordinadores', component: Coordinadores },
    { path: '/addcoordinador', name: 'addcoordinador', component: AddCoordinador },
    { path: '/editcoordinador/:id', name: 'editcoordinador', component: EditCoordinador },
    { path: '/asignargrupo', name: 'asignargrupo', component: AsignarGrupo },
    { path: '/vistaDirectores', name: 'vistaDirectores', component: vistaDirectores },
    { path: '/asignarsemillero', name: 'asignarsemillero', component: AsignarSemillero },
    { path: '/periodos/:id', name: 'periodos', component: Periodos },
    { path: '/periodos/edit/:id', name: 'edit-periodo', component: EditPeriodo },
    { path: '/grupos_visitante', name: 'grupos_visitante', component: VistaGruposVisitante, meta: { isPublic: true } },
    { path: '/editar-integrante/:id', name: 'editar-integrante', component: EditIntegrante },
    { path: '/periodo/:id/agregar-integrante', name: 'agregar-integrante', component: AddIntegrante },
    /* { path: '/periodo/:id/agregar-proyecto', name: 'agregar-proyecto', component: AddProyecto }, */
    { path: '/periodo/:id/addperiodo', name: 'addperiodo', component: AddPeriodo },
    { path: '/editproyecto/:id', name: 'editar-proyecto', component: EditProyecto },
    { path: '/proyecto/:id/agregar-proyecto-producto', name: 'agregar-proyecto-producto', component: AddProductoP },
    { path: '/periodo/:id/agregar-actividad/:periodo', name: 'agregar-actividad', component: AddActividad },
    { path: '/periodo/:id/agregar-proyecto/:periodo', name: 'agregar-proyecto', component: AddProyectoP },
    { path: '/periodo/:periodo/editar-actividad/:id', name: 'editar-actividad', component: EditActividad },
    { path: '/actividad/:id/productos', name: 'productos', component: Productos },
    { path: '/proyectos/:id/productos', name: 'productosP', component: ProductosP },
    { path: '/actividad/:id/productos/editar', name: 'editar-producto', component: EditProducto },
    { path: '/actividad/:id/productos/agregar', name: 'agregar-producto', component: AddProducto },
    { path: '/soportes/:id/', name: 'soportes', component: Soportes },
    { path: '/agregarsoporte/:id', name: 'agregar-soporte', component: AddSoporte },
    { path: '/editar-soporte/:id', name: 'editar-soporte', component: EditSoporte },
    { path: '/semilleros-visitante/:id', name: 'semilleros-visitante', component: semillerosVisitante },
    { path: '/semillero-especifico/:id', name: 'semillero-especifico', component: semilleroEspecifico },

  ]
})


const isAuthenticated = () => {
  return localStorage.access_token
}

router.beforeEach((to, from, next) => {
  // if (!to.meta.isPublic && !loggedIn) {
  //   return next({ name: 'login' })
  // }

  // if (to.name === 'login' && loggedIn) {
  //   return next({ name: 'home' })
  // }
  // const loggedIn = !!TokenService.getToken();

  // if (to.meta.isPublic && !isAuthenticated()) {
  //   return next();
  // }

  // Do not allow user to visit login page or register page if they are logged in
  if (to.name === 'login' && isAuthenticated()) {
    return next({ name: 'home' })
  }
  /* let user = router.app.$store.state.user */
  let user = JSON.parse(localStorage.user)
  console.log(user.id_rol)

  if (user.id_rol > 1) {
    let rutasNoPermitidas = {
      2: [
        "directores", "grupos", "addgrupos"
        , "editgrupo", "adduserDirector", "editdirector",
        "periodos", "asignargrupo", "vistaDirectores",
        "edit-periodo", "editar-integrante", "agregar-integrante",
        'agregar-integrante', 'addperiodo', 'editar-proyecto',
        'agregar-proyecto-producto', 'agregar-actividad',
        'agregar-proyecto', 'editar-actividad', 'productos',
        'productosP', 'editar-producto', 'agregar-producto',
        'agregar-soporte', 'editar-soporte', 'soportes',




      ],
      3: ["directores", "grupos", "coordinadores",
        "addgrupos", "editgrupo", "adduserDirector", "editdirector",
        'adduserDirector', 'editdirector', 'coordinadores',
        'addcoordinador', 'editcoordinador', 'asignargrupo',
        'vistaDirectores', 'asignarsemillero',


      ]
    }
    let rutasNoAccesoRol = rutasNoPermitidas[user.id_rol]
    if (rutasNoAccesoRol.indexOf(to.name) > -1) {
      return next({ name: 'home' })
    }
  }


  next();
})

export default router;