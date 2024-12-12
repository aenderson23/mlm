import { Module } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import http from "@/http";
import { Estado } from "..";
import { IProdutos } from "@/interfaces/IProdutos";
import { Structure } from "@/Structure";

const structure = new Structure()
interface EstadoProduto {
  produtos: IProdutos[]
}

const produto: Module<EstadoProduto, Estado> = {
  state: {
    produtos: [],
  },
  mutations: {
    [mutations.leitura](state, produtos: IProdutos[]) {
      state.produtos = produtos;
    },
    [mutations.cadastro](state, produto: IProdutos) {
      state.produtos.push(produto);
    },
    [mutations.alterar](state, produto: IProdutos) {
      const index = state.produtos.findIndex((comp) => comp == produto);
      state.produtos[index] = produto;
    },
    [mutations.deletar](state, id: string) {
      state.produtos = state.produtos.filter((comp) => comp.id != id);
    },
  },
  actions: {
    [actions.leitura]({ commit }) {
      const pacotes = structure.pacotes
      const produtos = [] as IProdutos[]
      pacotes.forEach((pcte,index)=>produtos.push({
        id:index.toString(),
        nome: pcte.nome,
        valor:pcte.valor,
      } as IProdutos))
      commit(mutations.leitura,produtos)
      //http.get("/produtos").then((response) => commit(mutations.leitura,response.data as IProdutos[]));
    },
    [actions.cadastro]({ commit }, produto: IProdutos) {
      http
        .post("/produtos", produto)
        .then(() => commit(mutations.cadastro, produto));
    },
    [actions.alterar]({ commit }, produto: IProdutos) {
      http
        .put("/produtos/" + produto.id, produto)
        .then(() => commit(mutations.alterar, produto));
    },
    [actions.deletar]({ commit }, id: string) {
      http.delete("/produtos/" + id).then(() => commit(mutations.deletar, id));
    },
  },
};
export { produto, EstadoProduto };
