import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import {cliente, EstadoCliente} from "./clientes"
interface Estado {
  cliente: EstadoCliente;
}

const store = createStore<Estado>({
  state: {
    cliente: {
      clientes:[]
    }
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {cliente},
});
const key: InjectionKey<Store<Estado>> = Symbol();
function useStore(): Store<Estado> {
  return vuexUseStore(key);
}

export { store, Estado, useStore, key };
