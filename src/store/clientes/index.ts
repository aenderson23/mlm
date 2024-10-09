import { Module } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import { ICliente } from "@/interfaces/IClientes";
import http from "@/http";
import { Estado } from "..";
interface EstadoCliente {
  clientes: ICliente[];
}

const cliente: Module<EstadoCliente, Estado> = {
  state: {
    clientes: [],
  },
  mutations: {
    [mutations.leitura](state, clientes: ICliente[]) {
      state.clientes = clientes;
    },
    [mutations.cadastro](state, cliente: ICliente) {
      state.clientes.push(cliente);
    },
    [mutations.alterar](state, cliente: ICliente) {
      const index = state.clientes.findIndex((cli) => cli == cliente);
      state.clientes[index] = cliente;
    },
    [mutations.deletar](state, id: string) {
      state.clientes = state.clientes.filter((cli) => cli.id != id);
    },
  },
  actions: {
    [actions.leitura]({ commit }) {
      http.get("/clientes").then((response) => commit(mutations.leitura,response.data as ICliente[]));
    },
    [actions.cadastro]({ commit }, cliente: ICliente) {
      http
        .post("/clientes", cliente)
        .then(() => commit(mutations.cadastro, cliente));
    },
    [actions.alterar]({ commit }, cliente: ICliente) {
      http
        .put("/clientes/" + cliente.id, cliente)
        .then(() => commit(mutations.alterar, cliente));
    },
    [actions.deletar]({ commit }, id: string) {
      http.delete("/clientes/" + id).then(() => commit(mutations.deletar, id));
    },
  },
};
export { cliente, EstadoCliente };
