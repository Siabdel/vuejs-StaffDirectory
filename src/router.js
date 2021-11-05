import Vue from "vue";
import Router from "vue-router";
import Home from "./home";

Vue.use(Router);

export default Router({
  routes : [
    {
      name : 'home',
      path : '/home',
      component : Home,
    }
  ]
})
