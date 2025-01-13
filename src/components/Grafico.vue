<template>
  <div class="chart-container p-3">
    <Line :data="chartData" :options="chartOptions" ref="lineChart" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useStore } from "@/store";
import { IVendas } from "@/interfaces/IVendas"; // Importando a interface IVendas

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "Grafico",
  components: {
    Line,
  },
  setup() {
    const store = useStore();
    const vendas = computed<IVendas[]>(() => store.state.venda.vendas);

    const chartData = computed(()=>{
        const labels = vendas.value.map((venda) => {
        const date = new Date(venda.data);
        return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
      });
      const data = vendas.value.map((venda) => venda.valor);
        return {
        
      labels,
      datasets: [
        {
          label: "Vendas",
          backgroundColor: "rgba(155, 211, 44, 0.2)", // Verde claro com transparência
          borderColor: "#9BD32C", // Verde claro
          data,
          fill: true,
        },
      ],
    }});

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return { chartData, chartOptions, /*lineChart*/ };
  },
});
</script>

<style scoped>
.chart-container {
  height: 444px; /* Definindo a altura fixa */
}
</style>
