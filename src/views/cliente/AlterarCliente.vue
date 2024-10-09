<template>
  <div class="row">
    <div class="col input-group">
      <label for="name" class="input-group-text">Nome do cliente</label>
      <input type="text" class="form-control" v-model="name" id="name" />
      <label for="referal" class="input-group-text">seu referal code</label>
      <input type="text" class="form-control" v-model="referal" id="referal" />
      <button class="btn btn-outline-primary" @click="alterar">alterar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ICliente } from "@/interfaces/IClientes";
import { useStore } from "@/store";
import actions from "@/store/clientes/actions";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AlterarCliente",
  props: {
    id: { type: String },
  },
  setup(props) {
    //console.log(props.id);
    const router = useRouter();
    const store = useStore();
    const name = ref("");
    const referal = ref("");
    let cliente: ICliente|undefined;
    if (props.id) {
      cliente = store.state.cliente.clientes.find((cli) => cli.id == props.id);
      name.value = cliente?.name || "";
      referal.value = cliente?.reference || "";
    }
    const alterar = () => {
      store.dispatch(actions.alterar, {
        id:props.id,
        name:name.value,
        reference:referal.value,
        code:cliente?.code
      });
      router.push('/')
    };
    
    return {name,referal,alterar};
  },
});
</script>
