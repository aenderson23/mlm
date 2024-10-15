import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { cliente, EstadoCliente } from "./clientes";
import { compra, EstadoCompra } from "./compras";
import { EstadoProduto, produto } from "./produtos";
interface Estado {
  cliente: EstadoCliente;
  compra: EstadoCompra;
  produto:EstadoProduto
}

const store = createStore<Estado>({
  state: {
    cliente: {
      clientes: [],
    },
    compra: {
      compras: [],
    },
    produto:{
      produtos:[]
    }
  },
  mutations: {},
  actions: {},
  modules: { cliente, compra, produto },
});
const key: InjectionKey<Store<Estado>> = Symbol();
function useStore(): Store<Estado> {
  return vuexUseStore(key);
}

export { store, Estado, useStore, key };
