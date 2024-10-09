<template>
  <div class="row">
    <div class="col input-group">
      <label for="name" class="input-group-text">Nome do cliente</label>
      <input type="text" class="form-control" v-model="name" id="name" />
      <label for="referal" class="input-group-text">seu referal code</label>
      <input type="text" class="form-control" v-model="referal" id="referal" />
      <button class="btn btn-outline-primary" @click="cadastrar">
        Cadastrar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import actions from "@/store/clientes/actions";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CadastrarCliente",
  setup() {
    const router = useRouter();
    const store = useStore();
    const name = ref("");
    const referal = ref("");
    const cadastrar = (): void => {
      store.dispatch(actions.cadastro, {
        name: name.value,
        code: Math.random().toString(36).substring(2, 12),
        reference: referal.value,
      });
      router.push("/");
    };
    return { name, referal, cadastrar };
  },
});
</script>
