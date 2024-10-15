<template>
  <div class="input-group">
    <label for="id" class="input-group-text">Escolha um produto</label>
    <select name="produto" id="produto" class="form-select" v-model="id">
      <option value="" selected>escolha um</option>
      <option v-for="produto in produtos" :key="produto.id" :value="produto.id">{{ produto.nome }}</option>
    </select>
    <button class="btn btn-outline-danger" @click="deletar">excluir</button>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { useStore } from "@/store";
import actions from "@/store/produtos/actions";
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  name: "DeletarProduto",
  setup() {
    const store = useStore();
    store.dispatch(actions.leitura);
    const produtos = computed(() => store.state.produto.produtos);
    const id = ref("");
    const deletar = () => {
      store.dispatch(actions.deletar, id.value);
      router.push('/compra')
    };
    return { produtos, deletar, id };
  },
});
</script>
