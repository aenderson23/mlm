import { Module } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import { ICliente } from "@/interfaces/IClientes";
import {apiWF} from "@/http/clientehttp";
import { Estado } from "..";
import aesDefinition from "@/Logic/aesEncription";
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
      apiWF.get("/all_user_MLM").then(
        (response) => {
          const cliente = [] as ICliente[];
          const retorno = response.data.response.user as retorno[];
          retorno.forEach((user) => {
            cliente.push({
              id: user._id,
              name: user.name,
              code: user.code,
              reference: user.reference || "empty",
              chave: user.chave,
              carteira: user.carteira,
            });
          });
          commit(mutations.leitura, cliente);
        }

        //
      );
    },
    [actions.alterar]({ commit }, {cliente, auth}:formatingAlterar) {
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
          } as ICliente
          commit(mutations.alterar,cliente)
        });
    },
    /*[actions.deletar]({ commit }, id: string) {
      http.delete("/clientes/" + id).then(() => commit(mutations.deletar, id));
    },*/
  },
};
export { cliente, EstadoCliente };

interface retorno {
  "Created By": string;
  "Created Date": Date;
  "Modified Date": Date;
  carteira: number;
  chave: string;
  code: string;
  _id: string;
  name: string;
  reference: string;
}

function cifrarEntrada(object: object): string {
  const saida = aesDefinition(JSON.stringify(object))
  console.log(saida)
  return saida
}

interface formatingAlterar {
  cliente: ICliente;
  auth: string;
}
