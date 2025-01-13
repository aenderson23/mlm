import { IVendas } from "../../interfaces/IVendas";
import { Module } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import { apiWF } from "@/http/clientehttp";
import { Estado } from "..";
import aesDefinition from "@/Logic/aesEncription";
interface EstadoVendas {
  vendas: IVendas[];
}

const venda: Module<EstadoVendas, Estado> = {
  state: {
    vendas: [],
  },
  mutations: {
    [mutations.leitura](state, vendas: IVendas[]) {
      console.log(vendas)
      state.vendas = vendas;
    },
    [mutations.cadastro](state, venda: IVendas) {
      state.vendas.push(venda);
    },
    [mutations.alterar](state, venda: IVendas) {
      const index = state.vendas.findIndex((vend) => vend == venda);
      state.vendas[index] = venda;
    },
    [mutations.deletar](state, id: string) {
      state.vendas = state.vendas.filter((vend) => vend.id != id);
    },
  },
  actions: {
    [actions.leitura]({ commit }) {
      apiWF.get("/all_vendas").then((response) => {
        const vendas = [] as IVendas[];
        const retorno = response.data.response.vendas as retorno[];
        retorno.forEach((venda) => {
          vendas.push({
            id: venda._id,
            produto: venda.produto,
            "usuario comprador": venda["usuario comprador"],
            referencia: venda.referencia,
            data: new Date(venda["Created Date"]), // Usando a data correta
            valor: venda.valor,
          });
        });
        commit(mutations.leitura, vendas);
      });
    },
    /*[actions.alterar]({ commit }, {cliente, auth}:formatingAlterar) {
      apiWF
        .post(
          '/change_user_mlm/',
          { 
            cliente, 
            payload: JSON.stringify(cliente),
            Signature: cifrarEntrada(cliente)
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((resp) => {
          const user = resp.data.response.cliente as retorno
          const cliente = {
            id: user._id,
            name: user.name,
            code: user.code,
            reference: user.reference || "empty",
            chave: user.chave,
            carteira: user.carteira,
            mensagens:user.mesages
          } as ICliente
          commit(mutations.alterar,cliente)
        });
    },
    [actions.deletar]({ commit }, id: string) {
      http.delete("/clientes/" + id).then(() => commit(mutations.deletar, id));
    },*/
  },
};
export { venda, EstadoVendas };

interface retorno {
  "Created By": string;
  "Created Date": number;
  "Modified Date": number;
  produto: string;
  referencia: string;
  "usuario comprador": string;
  _id: string;
  valor: number;
}
// eslint-disable-next-line
function cifrarEntrada(object: object): string {
  const saida = aesDefinition(JSON.stringify(object));
  console.log(saida);
  return saida;
}
