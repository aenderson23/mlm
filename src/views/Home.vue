<template>
  <div class="row">
    <div class="col col-3" v-for="cliente in clientes" :key="cliente.id">
      <Cliente :cliente="cliente" />
    </div>
  </div>
  <div class="row mt-3">
    <button class="btn btn-success col-3">Cadastrar um novo cliente</button>
  </div>
</template>

<script lang="ts">
import Cliente from "@/components/Cliente.vue";
import { useStore } from "@/store";
import actions from "@/store/actions";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  components: {
    Cliente,
  },
  setup() {
    const store = useStore();
    store.dispatch(actions.leitura);
    const clientes = computed(() => store.state.clientes);
    return { store, clientes };
  },
});
</script>
