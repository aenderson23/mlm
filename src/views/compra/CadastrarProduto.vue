<template>
  <div class="row">
    <div class="col input-group">
      <label for="name" class="input-group-text">Nome do produto</label>
      <input type="text" class="form-control" v-model="name" id="name" />
      <label for="valor" class="input-group-text">Valor do produto</label>
      <span class="input-group-text">$</span>
      <input
        type="number"
        class="form-control"
        aria-label="Dollar amount (with dot and two decimal places)"
        id="valor"
        v-model="valor"
      />
      <select name="cliente" id="cliente" class="form-select" v-model="clienteID">
        <option value="" selected>selecione o cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.name }}</option>
      </select>
      <button class="btn btn-outline-primary" @click="cadastrar">
        Cadastrar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import actions from "@/store/produtos/actions";
import clienteAction from "@/store/clientes/actions"
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Cadastrarproduto",
  setup() {
    const router = useRouter();
    const store = useStore();
    const name = ref("");
    const valor = ref("");
    const clienteID = ref("");
    store.dispatch(clienteAction.leitura)
    const clientes = computed(()=>store.state.cliente.clientes)
    const cadastrar = (): void => {
      store.dispatch(actions.cadastro, {
        nome: name.value,
        valor: valor.value,
        "cliente vendedor":clientes.value.find(cli=>cli.id = clienteID.value),
        imagem:"logo.png"
      });
      router.push("/compra");
    };
    return { name, valor, cadastrar, clientes, clienteID };
  },
});
</script>
