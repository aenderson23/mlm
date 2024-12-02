import { ICliente } from "@/interfaces/IClientes";
import { Estado } from "@/store";
import actions from "@/store/clientes/actions";
import { computed } from "vue";
import { Store } from "vuex";

function puxarRepresentante(
  level: number,
  user: ICliente,
  store: Store<Estado>
): ICliente[] {
  const listaUsuario = [];
  const listaClientes = computed(() => store.state.cliente.clientes);
  let usuario = user
  for (let i = 0; i < level; i++) {
    const filter = listaClientes.value.find(
      (cliente) => usuario.code == cliente.reference
    );
    if (!filter) {
      break;
    } else {
      listaUsuario.push(filter);
      usuario = filter
    }
  }
  return listaUsuario;
}

function carregarCarteira(
  value: number,
  user: ICliente,
  store: Store<Estado>
): void {
  store.dispatch(actions.alterar, {
    id: user.id,
    name: user.name,
    reference: user.reference,
    code: user.code,
    chave: user.chave,
    carteira: value,
  });
}

export { puxarRepresentante, carregarCarteira };
