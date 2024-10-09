import Cliente from "@/views/Cliente.vue";
import AlterarCliente from "@/views/cliente/AlterarCliente.vue";
import CadastrarCliente from "@/views/cliente/CadastrarCliente.vue";
import Home from "@/views/Home.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/cliente",
    name: "interface de clientes",
    component: Cliente,
    children: [
      {
        path: "",
        name: "interface de clientes",
        component: CadastrarCliente,
      },
      {
        path: ":id",
        name: "editor de clientes",
        component: AlterarCliente,
        props:true
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
