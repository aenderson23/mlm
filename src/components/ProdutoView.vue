<template>
  <div class="border border-1 rounded-2">
    <img
      class="mb-3"
      src="../assets/tct.png"
      alt="foto do produto"
      width="100"
      height="120"
    />
    <h5>{{ Produto.nome }}</h5>
    <p>
      Value:
      {{
        Produto.valor.toLocaleString("en", {
          style: "currency",
          currency: "USD",
        })
      }}
    </p>
    <button class="btn btn-outline-primary">buy item</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IProdutos } from "@/interfaces/IProdutos";

export default defineComponent({
  name: "ProdutoView",
  props: {
    Produto: {
      type: Object as PropType<IProdutos>,
      required: true,
    },
  },
});
</script>
