import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import ScheduleManagement from "@/views/pages/ScheduleManagement.vue";
import LearnVue from "@/views/pages/LearnVue.vue";
import LearnCanvas from "@/views/pages/LearnCanvas.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/manage",
    name: "ScheduleManagement",
    component: ScheduleManagement
  },
  {
    path: "/learn-vue",
    name: "LearnVue",
    component: LearnVue
  },
  {
    path: "/learn-canvas",
    name: "LearnCanvas",
    component: LearnCanvas
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
