import { createStore, Store, useStore as vuexUseStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import { ICliente } from "@/interfaces/IClientes";
import { InjectionKey } from "vue";
import http from "@/http";
interface Estado {
  clientes: ICliente[];
}

const store = createStore<Estado>({
  state: {
    clientes: [],
  },
  mutations: {
    [mutations.leitura](state, clientes: ICliente[]) {
      state.clientes = clientes;
    },
  },
  actions: {
    [actions.leitura]({ commit }) {
      http
        .get("/clientes")
        .then((response) =>
          commit(mutations.leitura, response.data as ICliente[])
        );
    },
  },
  modules: {},
});
const key: InjectionKey<Store<Estado>> = Symbol();
function useStore(): Store<Estado> {
  return vuexUseStore(key);
}

export { store, Estado, useStore, key };
