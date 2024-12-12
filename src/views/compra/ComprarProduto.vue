<template>
  <p class="fw-bold">
    nome do produto:
    <span class="fw-normal">{{ produto.nome }}</span>
  </p>
  <p class="fw-bold">
    valor do produto:
    <span class="fw-normal">{{ produto.valor }}</span>
  </p>
  <div class="alert alert-danger" role="alert" v-if="msg != ''">
    {{ msg }}
  </div>
  <!--div class="input-group">
    <label for="range" class="input-group-text">{{ max }}</label>
    <div class="form-control">
        <input type="range" step="1" max="5" min="1" v-model="max" class="form-range" id="range">
    </div>
  </div-->
  <div class="input-group">
    <label for="nome" class="input-group-text">usuário comprador</label>
    <select name="nome" class="form-select" id="nome" v-model="user">
      <option value="" selected>Selecione um usuário</option>
      <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
        {{ cliente.name }}
      </option>
    </select>
    <button class="btn btn-outline-primary" @click="encontrar(user)">
      comprar
    </button>
  </div>
  <div class="input-group">
    <label for="valor" class="input-group-text">valor $</label>
    <input
      type="number"
      name="valor"
      id="valor"
      class="form-control"
      v-model="valor"
      step="1"
      min="0"
      max="1000"
    />
    <button class="btn btn-secondary" @click="charge(valor, user)">
      Charge user
    </button>
  </div>
  <Modal btn="btn btn-danger" name="lista">
    <template v-slot:botao>Ver dependentes</template>
    <template v-slot:header>Dependentes</template>
    <template v-slot:footer>
      <button class="btn btn-secondary" data-bs-dismiss="modal">close</button>
    </template>
    <template v-slot:body>
      <div class="alert alert-warning" v-if="representantes.length == 0">
        whoops, lista vazia
      </div>
      <p>Your Referal: {{ clientes.find((cli) => cli.id == user)?.reference }}</p>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="cliente in representantes"
          :key="cliente.id"
        >
          <div class="card shadow-sm">
            <div class="card-header component">
              {{ cliente.name }}
            </div>
            <div class="card-body">
              <p>His code: {{ cliente.code }}</p>
              <p>His referal: {{ cliente.reference }}</p>
            </div>
            <div class="card-footer">OK</div>
          </div>
        </li>
      </ul>
    </template>
  </Modal>
</template>

<script lang="ts">
import { IProdutos } from "@/interfaces/IProdutos";
import { useStore } from "@/store";
import actions from "@/store/produtos/actions";
import clientesActions from "@/store/clientes/actions";
import { computed, defineComponent, ref } from "vue";
import { carregarCarteira, puxarRepresentante } from "@/Logic/padrão";
import { ICliente } from "@/interfaces/IClientes";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "ComprarProdutos",
  components: { Modal },
  props: {
    id: { type: String, required: true },
  },
  setup(props) {
    const store = useStore();
    const user = ref("");
    const valor = ref("");
    const msg = ref("");
    const max = ref(3);
    const representantes = ref([] as ICliente[]);
    store.dispatch(actions.leitura);
    store.dispatch(clientesActions.leitura);
    const clientes = computed(() => store.state.cliente.clientes);
    const charge = (val: string, user1: string) => {
      const usuario = clientes.value.find((cli) => cli.id == user1);
      const value = parseFloat(val);
      if (usuario && value) {
        console.log("condição atendida");
        msg.value = "";
        carregarCarteira(value, usuario, store);
      } else {
        msg.value = "o usuário não foi encontardo ou o valor esta errado";
      }
    };
    const encontrar = (user1: string) => {
      const usuario = clientes.value.find((cli) => cli.id == user1);
      if (usuario) {
        if (usuario.carteira && usuario.carteira < produto.value.valor) {
          msg.value = "valor insulficiente para a transação";
        } else {
          msg.value = "";
          representantes.value = puxarRepresentante(6, usuario, store);
        }
      } else {
        msg.value =
          "usuario não encontrado, por favor verifique as opções disponiveis";
      }
    };
    const produto = computed(
      () =>
        store.state.produto.produtos.find((prod) => prod.id == props.id) ||
        ({
          nome: "",
          valor: 0,
        } as IProdutos)
    );
    return {
      produto,
      clientes,
      user,
      valor,
      charge,
      encontrar,
      msg,
      representantes,
      max
    };
  },
});
</script>
