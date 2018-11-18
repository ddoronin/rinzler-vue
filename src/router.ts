import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/views/Dashboard.vue"
import Collections from "@/views/Collections.vue"
import Terminal from "@/views/Terminal.vue"

Vue.use(Router);

export default new Router({
  routes: [{
    path: "/:db?/:collection?",
    name: "dashboard",
    component: Dashboard,
    props: (route) => {
      console.log(route.params);
      return ({ db: route.params.db, collection: route.params.collection });
    }
  }]
});
