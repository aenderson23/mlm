<template>
  <div class="products-container">
    <h1>Lista de Produtos</h1>
    <section class="container-lg">
      <div class="row">
        <div class="col-3 p-1" v-for="produto in produtos" :key="produto.nome">
          <ProdutoView class="py-3" v-bind:-produto="produto" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import acaoProdutos from "@/store/produtos/actions";
import ProdutoView from "@/components/ProdutoView.vue"; // Importando o componente existente

export default defineComponent({
  name: "Products",
  components: {
    ProdutoView,
  },
  setup() {
    const store = useStore();
    store.dispatch(acaoProdutos.leitura);
    const produtos = computed(() => store.state.produto.produtos);
    console.log(produtos.value);
    return {
      produtos,
    };
  },
});
</script>

<style scoped>
.products-container {
  min-height: 100vh; /* Ocupa a altura total da tela */
  padding: 20px;
}
</style>