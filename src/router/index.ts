//imports
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

//construtor das rotas
const routes: Array<RouteRecordRaw> = [
  //interface inicial
  {
    path: "/",
    name: "home",
    component: Home,
  },
  //interface de login e conexão com o bubble
  {
    path:"/login",
    name:"login",
    component:Login
  }
];

//inicialização
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//export
export default router;
