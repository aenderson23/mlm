<template>
  <div class="row">
    <div class="col col-3" v-for="cliente in clientes" :key="cliente.id">
      <ClienteView :cliente="cliente" />
    </div>
  </div>
  <div class="row mt-3">
    <RouterLink to="/cliente" class="btn btn-success col-3">Cadastrar um novo cliente</RouterLink>
  </div>
</template>

<script lang="ts">
import ClienteView from "@/components/ClienteView.vue";
import { useStore } from "@/store";
import actions from "@/store/clientes/actions";
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  components: {
    ClienteView,
  },
  setup() {
    const store = useStore();
    store.dispatch(actions.leitura);
    
    const clientes = computed(() => store.state.cliente.clientes);
    return { store, clientes };
  },
});
</script>
