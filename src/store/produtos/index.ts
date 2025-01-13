import { Module } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
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
  },
};
export { produto, EstadoProduto };
