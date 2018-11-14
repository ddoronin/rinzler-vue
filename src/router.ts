import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
    path: "/",
    name: "dashboard",
    component: () => import(/* webpackChunkName: "about" */ "./views/Dashboard.vue")
  }, {
    path: "/:db",
    name: "collections",
    component: () => import(/* webpackChunkName: "about" */ "./views/Collections.vue")
  }, {
    path: "/:db/:collection",
    name: "terminal",
    component: () => import(/* webpackChunkName: "about" */ "./views/Terminal.vue")
  }]
});
