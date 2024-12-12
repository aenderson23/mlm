<template>
  <Carrousel name="produtos">
    <div
      class="carousel-item"
      :class="{ active: index == 0 }"
      v-for="(produto, index) in produtos"
      :key="produto.id"
    >
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">{{ produto.nome }}</h3>
        </div>
        <div class="card-body">
          <h3>Valor: {{ produto.valor.toLocaleString('en',{style:'currency', currency:'USD'}) }}</h3>
        </div>
        <div class="card-footer d-flex justify-content-around">
          <button
            class="btn btn-outline-secondary"
            @click="comprarProduto(produto.id)"
          >
            comprar
          </button>
          <button
            class="btn btn-outline-danger"
            @click="deletarProduto(produto.id)"
          >
            deletar
          </button>
          <button
            class="btn btn-outline-warning"
            @click="editarProduto(produto.id)"
          >
            editar
          </button>
        </div>
      </div>
    </div>
  </Carrousel>
</template>

<script lang="ts">
import Carrousel from "@/components/Carrousel.vue";
import router from "@/router";
import { useStore } from "@/store";
import actions from "@/store/produtos/actions";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Vitrine",
  components: { Carrousel },
  setup() {
    const store = useStore();
    store.dispatch(actions.leitura);
    const produtos = computed(() => store.state.produto.produtos);
    const deletarProduto = (id: string) => {
      store.dispatch(actions.deletar, id);
      window.location.reload();
    };
    const editarProduto = (id: string) => {
      router.push("/compra/alterar/" + id);
    };
    const comprarProduto = (id: string) => {
      router.push("/compra/checkout/" + id);
    };
    return {
      produtos,
      deletarProduto,
      editarProduto,
      comprarProduto,
    };
  },
});
</script>
