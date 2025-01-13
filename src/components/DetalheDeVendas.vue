<template>
  <div class="py-2">
    <h3 class="my-4">Sales Details</h3>
    <div class="container-fluid rounded-2">
      <div class="row bg-dark">
        <h6 class="text-white col">Product</h6>
        <h6 class="text-white col">Value</h6>
        <h6 class="text-white col">Date</h6>
      </div>
      <div
        v-for="(venda, index) in sales"
        :key="venda.id"
        :class="{
          'bg-gray-20': index % 2 === 0,
          'bg-gray-40': index % 2 !== 0,
        }"
        class="row"
      >
        <p class="col">{{ venda.produto }}</p>
        <p class="col">
          {{
            venda.valor.toLocaleString("en", {
              currency: "USD",
              style: "currency",
            })
          }}
        </p>
        <p class="col">{{ venda.data.toLocaleDateString() }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { IVendas } from "@/interfaces/IVendas"; // Importando a interface IVendas

export default defineComponent({
  name: "DetalheDeVendas",
  setup() {
    const store = useStore();
    const sales = computed<IVendas[]>(() => store.state.venda.vendas);

    return { sales };
  },
});
</script>

<style scoped>
.bg-gray-20 {
  background-color: rgba(128, 128, 128, 0.2); /* Cinza 20% */
}
.bg-gray-40 {
  background-color: rgba(128, 128, 128, 0.4); /* Cinza 40% */
}
</style>
