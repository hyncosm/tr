import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index.js'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);
const qs = require("qs");
const routes = [
  {
    path:'/admin/',
    component: () => import('../layouts/Admin.vue'),
    children: [
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("../views/admin/dashboard"),
        beforeEnter: checkRouteAdminPermission
      },
      {
        path: "commandes",
        name: "admin-commandes",
        component: () => import("../views/admin/commands"),
        beforeEnter: checkRouteAdminPermission
      },
      {
        path: "produits",
        name: "admin-produits",
        component: () => import("../views/admin/products"),
        beforeEnter: checkRouteAdminPermission
      },
      {
        path: "settings",
        name: "admin-settings",
        component: () => import("../views/admin/settings/index.vue"),
        beforeEnter: checkRouteAdminPermission

      },
    ]
  },


  //-----------------Client---------------------------
  {
    path: "",
    component: () => import("../layouts/Fullscreen"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/client/home"),
      },

      {
        path: "/produits/:category",
        name: "produits",
        component: () => import("../views/client/products"),
      },
      {
        path: "/produit/:id",
        name: "produits-detail",
        component: () => import("../views/client/productsDetails"),
      },
      {
        path: "/produits/:id/commander",
        name: "commander-produit",
        component: () => import("../views/client/commanderProduct"),
      }
    ],
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("../views/admin/login"),
    beforeEnter:checkLoginRoutePermission
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/client/login"),
    beforeEnter:checkLoginRoutePermission
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/client/register"),
    beforeEnter:checkLoginRoutePermission
  },

];

function checkRouteAdminPermission(to, from, next){  
  if(store.state.user.role === 'ADMIN') next()
  else {
     next({name: 'home'})
  }
}

function checkLoginRoutePermission(to, from, next){  
  if(!store.state.user.role) next()
  else {
    if(store.state.user.role === 'ADMIN')  next({name: 'admin-dashboard'})
    else if(store.state.user.role === 'CLIENT')  next({name: 'home'})
  }
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  parseQuery(query) {
    return qs.parse(query);
  },
  stringifyQuery(query) {
    let result = qs.stringify(query);
    return result ? "?" + result : "";
  },
});



export default router;


