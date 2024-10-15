import { Module } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import { ICompra } from "@/interfaces/ICompras";
import http from "@/http";
import { Estado } from "..";
interface EstadoCompra {
  compras: ICompra[]
}

const compra: Module<EstadoCompra, Estado> = {
  state: {
    compras: [],
  },
  mutations: {
    [mutations.leitura](state, compras: ICompra[]) {
      state.compras = compras;
    },
    [mutations.cadastro](state, compra: ICompra) {
      state.compras.push(compra);
    },
    [mutations.alterar](state, compra: ICompra) {
      const index = state.compras.findIndex((comp) => comp == compra);
      state.compras[index] = compra;
    },
    [mutations.deletar](state, id: string) {
      state.compras = state.compras.filter((comp) => comp.id != id);
    },
  },
  actions: {
    [actions.leitura]({ commit }) {
      http.get("/compras").then((response) => commit(mutations.leitura,response.data as ICompra[]));
    },
    [actions.cadastro]({ commit }, compra: ICompra) {
      http
        .post("/compras", compra)
        .then(() => commit(mutations.cadastro, compra));
    },
    [actions.alterar]({ commit }, compra: ICompra) {
      http
        .put("/compras/" + compra.id, compra)
        .then(() => commit(mutations.alterar, compra));
    },
    [actions.deletar]({ commit }, id: string) {
      http.delete("/compras/" + id).then(() => commit(mutations.deletar, id));
    },
  },
};
export { compra, EstadoCompra };
