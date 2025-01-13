<template>
  <div class="order-list-container">
    <h1>Lista de Compras</h1>
    <div class="table-responsive">
      <input
        type="text"
        class="form-control mb-3"
        placeholder="Filter by product, buyer or reference"
        v-model="filtro"
      />
      <div class="table-container bg-white">
        <table class="table table-striped table-hover m-0">
          <thead class="table-dark">
            <tr>
              <th>Product</th>
              <th>Buyer</th>
              <th>Reference</th>
              <th>Date</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(order, index) in filteredOrders"
              :key="order.id"
              :class="{
                'bg-gray-40': index % 2 === 0,
                'bg-gray-20': index % 2 !== 0,
              }"
            >
              <td>{{ order.produto }}</td>
              <td>{{ order["usuario comprador"] }}</td>
              <td>{{ order.referencia }}</td>
              <td>{{ new Date(order.data).toLocaleDateString() }}</td>
              <td>{{ order.valor }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store";
import acaoOrders from "@/store/Compra/actions";
import { IVendas } from "@/interfaces/IVendas";

export default defineComponent({
  name: "OrderLists",
  setup() {
    const store = useStore();
    store.dispatch(acaoOrders.leitura);
    const orders = computed<IVendas[]>(() => store.state.venda.vendas);
    const filtro = ref("");

    const filteredOrders = computed(() => {
      if (!filtro.value) {
        return orders.value;
      }
      return orders.value.filter(
        (order) =>
          order.produto.toLowerCase().includes(filtro.value.toLowerCase()) ||
          order["usuario comprador"]
            .toLowerCase()
            .includes(filtro.value.toLowerCase()) ||
          order.referencia.toLowerCase().includes(filtro.value.toLowerCase())
      );
    });

    return {
      orders,
      filtro,
      filteredOrders,
    };
  },
});
</script>

<style scoped>
.order-list-container {
  min-height: 100vh; /* Ocupa a altura total da tela */
  background-color: #f8f9fa; /* Cor de fundo levemente diferente do branco padrão */
  padding: 20px;
}

.table {
  width: 100%;
  margin-top: 20px;
}

.table th,
.table td {
  text-align: left;
  padding: 10px;
}

.bg-gray-20 {
  background-color: rgba(128, 128, 128, 0.2); /* Cinza 20% */
}

.bg-gray-40 {
  background-color: rgba(128, 128, 128, 0.4); /* Cinza 40% */
}
</style>
