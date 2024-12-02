//imports
import Cliente from "@/views/Cliente.vue";
import AlterarCliente from "@/views/cliente/AlterarCliente.vue";
import CadastrarCliente from "@/views/cliente/CadastrarCliente.vue";
import Compra from "@/views/Compra.vue";
import CadastrarProduto from "@/views/compra/CadastrarProduto.vue";
import ComprarProduto from "@/views/compra/ComprarProduto.vue";
import DeletarProduto from "@/views/compra/DeletarProduto.vue";
import EditarProduto from "@/views/compra/EditarProduto.vue";
import Vitrine from "@/views/compra/Vitrine.vue";
import Home from "@/views/Home.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

//construtor das rotas
const routes: Array<RouteRecordRaw> = [
  //interface inicial
  {
    path: "/",
    name: "home",
    component: Home,
  },
  //interface dos clientes, referenciado no store clientes
  {
    path: "/cliente",
    name: "interface de clientes",
    component: Cliente,
    children: [
      {
        path: "",
        name: "interface de cadastro de clientes",
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
  //interface de compra, referenciado no store de compra
  {
    path: "/compra",
    name: "interface de produtos",
    component: Compra,
    children: [
      {
        path: "",
        name: "interface de vitrine de produtos",
        component: Vitrine,
      },
      {
        path: "adicionar",
        name: "interface de cadastro de produtos",
        component: CadastrarProduto,
      },
      {
        path: "deletar",
        name: "interface de deleção de produtos",
        component: DeletarProduto,
      },
      {
        path: "alterar/:id",
        name: "interface de alteração de produtos",
        component: EditarProduto,
        props:true
      },
      {
        path:"checkout/:id",
        name: "interface de compra de produtos",
        component: ComprarProduto,
        props: true
      }
    ],
  },
];

//inicialização
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//export
export default router;
