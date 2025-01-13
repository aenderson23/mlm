//imports
import Dashboard from "@/views/Dashboard.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Products from "@/views/Products.vue";
import OrderLists from "@/views/OrderLists.vue";
//import Settings from "@/views/Settings.vue";
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
    path: "/login",
    name: "login",
    component: Login,
  },
  //apresentar o dashboard, apenas se o usuario estiver logado
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  //interface de produtos
  {
    path: "/products",
    name: "products",
    component: Products,
  },
  //interface de listas de pedidos
  {
    path: "/order-lists",
    name: "order-lists",
    component: OrderLists,
  },
  //interface de configurações
  /*{
    path: "/settings",
    name: "settings",
    component: Settings,
  },*/
  // Adicione mais rotas conforme necessário
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;